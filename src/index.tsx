import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Location, LocationInputProps } from './types';

const CACHE = new Map<string, Location[]>();

const defaultStyles = {
  container: {
    position: 'relative',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  suggestions: {
    position: 'absolute',
    width: '100%',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '1px solid #eee',
    marginTop: '4px',
    zIndex: 1000,
  },
  item: {
    width: '100%',
    padding: '8px 12px',
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
} satisfies Record<string, React.CSSProperties>;

export default function LocationInput({
  onSelect,
  debounce = 300,
  classNames = {},
  styles = {},
  placeholder = 'Search city...',
}: LocationInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController>();

  const search = useCallback(async (q: string) => {
    try {
      controller.current?.abort();
      controller.current = new AbortController();

      if (CACHE.has(q)) {
        setResults(CACHE.get(q)!);
        return;
      }

      const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name,cou_name_en,coordinates&where=search(name,"${encodeURIComponent(q)}")&limit=5`;
      
      const res = await fetch(url, { 
        signal: controller.current.signal 
      });
      
      const { results: data = [] } = await res.json();
      CACHE.set(q, data);
      setResults(data);
      setIsOpen(true);
    } catch (e) {
      if (!(e instanceof DOMException)) console.error(e);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 1) search(query);
    }, debounce);
    
    return () => clearTimeout(handler);
  }, [query, debounce, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={ref} 
      className={classNames.container}
      style={{ ...defaultStyles.container, ...styles.container }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classNames.input}
        placeholder={placeholder}
        style={{ ...defaultStyles.input, ...styles.input }}
      />
      
      {isOpen && results.length > 0 && (
        <div 
          className={classNames.suggestions}
          style={{ ...defaultStyles.suggestions, ...styles.suggestions }}
        >
          {results.map((location) => (
            <button
              type="button"
              key={`${location.coordinates.lat}-${location.coordinates.lon}`}
              className={classNames.item}
              style={{ ...defaultStyles.item, ...styles.item }}
              onClick={() => {
                onSelect?.(location);
                setQuery(`${location.name}, ${location.cou_name_en}`);
                setIsOpen(false);
              }}
            >
              {location.name}, {location.cou_name_en}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}