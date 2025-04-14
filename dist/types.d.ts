export interface Location {
    name: string;
    cou_name_en: string;
    coordinates: {
        lat: number;
        lon: number;
    };
}
export type LocationInputProps = {
    onSelect?: (location: Location) => void;
    debounce?: number;
    classNames?: {
        input?: string;
        container?: string;
        suggestions?: string;
        item?: string;
    };
    styles?: {
        input?: React.CSSProperties;
        container?: React.CSSProperties;
        suggestions?: React.CSSProperties;
        item?: React.CSSProperties;
    };
    placeholder?: string;
};
