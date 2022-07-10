export interface FontFamily {
  serif: string[];
  sans: string[];
  mono: string[];
  [key: string]: string[];
}

export interface FontSize {
  [key: string]: (string | { lineHeight: string })[];
}

export interface FontWeight {
  [key: string]: string;
}

export interface Font_ {
  family: string;
  style: string[];
}
