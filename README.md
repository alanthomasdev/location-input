# 📦 location-input

A tiny, customizable React component for location autocomplete using public geodata (cities with population > 1000). Perfect for apps that require minimal dependencies and snappy performance.

---

## 🚀 Features

- Ultra-small package size (~3KB gzipped)
- No external component libraries
- Zero API keys – powered by public data
- Fully styleable with `classNames` or `styles` props
- Supports debouncing and outside click detection
- Written in TypeScript

---

## 📦 Installation

```bash
npm i location-input
```

---

## 🧪 Usage

```tsx
import LocationInput from 'tiny-location-input';

function App() {
  const handleLocationChange = (location) => {
    console.log('Selected location:', location);
  };

  return (
    <div>
      <h2>Pick a city</h2>
      <LocationInput
        onSelect={handleLocationChange}
        placeholder="Search city..."
        styles={{
          input: { borderColor: 'blue' },
        }}
      />
    </div>
  );
}
```

---

## 🔧 Props

| Prop            | Type                   | Default              | Description                           |
| --------------- | ---------------------- | -------------------- | ------------------------------------- |
| `onSelect`    | `(location) => void` | –                   | Called when a location is selected    |
| `debounce`    | `number`             | `300`              | Delay before search after typing      |
| `classNames`  | `object`             | –                   | Custom class names for each element   |
| `styles`      | `object`             | –                   | Inline styles override default styles |
| `placeholder` | `string`             | `"Search city..."` | Placeholder for the input field       |

---

## 💡 Styling

Use either `classNames` or `styles` props to fully customize the look.

Example:

```tsx
<LocationInput
  styles={{
    container: { width: '100%' },
    input: { backgroundColor: '#f0f0f0' },
    suggestions: { border: '1px solid #000' },
    item: { padding: '10px', color: 'red' },
  }}
/>
```

---

## 🗂️ Folder Structure

```
tiny-location-input/
├── package.json
├── tsconfig.json
├── rollup.config.mjs
├── LICENSE
├── README.md
└── src/
    ├── index.tsx
    └── types.ts
```

---

## 🔨 Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📄 License

MIT © 2024 Alan Thomas
