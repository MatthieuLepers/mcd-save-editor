export interface IMenuSlotProps {
  visible: boolean;
  close: () => void;
}

export interface ISlots {
  [key: string]: (props: IMenuSlotProps) => void;
}

export interface IProps {
  menuList?: Array<string>;
}

export interface IState {
  activeMenu?: string;
}
