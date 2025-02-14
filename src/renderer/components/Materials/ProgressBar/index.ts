export interface ISlots {
  label?: () => void;
  track?: () => void;
}

export interface IProps {
  label?: string;
  ariaLabel?: string;
  percent?: number;
  modifiers?: Record<string, boolean>;
}
