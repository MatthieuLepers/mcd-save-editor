export type TValue = string | number | boolean | null | undefined;

export interface IClickEmitDetails {
  value: TValue;
  checked: boolean;
}

export interface IEmits extends Record<string, any> {
  click: [e: MouseEvent, details: IClickEmitDetails ];
}

export interface IProps {
  id?: string;
  value: TValue;
  name?: string;
  label: string;
  disabled?: boolean;
  variant?: 'default' | 'small';
}

export interface IState {
  focused: boolean;
}
