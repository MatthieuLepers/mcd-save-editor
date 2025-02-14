import type {
  IColumnSlotProps,
  IColumn,
  IActionColumnInnerSlotProps,
  IActionColumnSlotProps,
} from '.';

export type ISlots<T1, T2> = {
  actionColumnInner(props: IActionColumnInnerSlotProps<T1>): void;
  actionColumn(props: IActionColumnSlotProps<T1>): void;
  afterRow(props: IActionColumnSlotProps<T1>): void;
} & {
  [key: string]: (props: IColumnSlotProps<T1, T2>) => void;
};

export interface IProps<T> {
  columns: Record<string, IColumn<T>>;
  obj: T & { selected?: boolean };
  showActionRow?: boolean;
  showSelectionRow?: boolean;
}

export interface IState {
  open: boolean;
}
