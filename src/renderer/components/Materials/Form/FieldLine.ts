export interface ISlots {
  default(): void;
  [key: string]: () => void;
}

export interface IProps {
  size?: number;
  modifiers?: Record<string, boolean>;
}
