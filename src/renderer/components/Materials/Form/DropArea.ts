export interface IEmits extends Record<string, any> {
  fileUpload: [files: FileList];
}

export interface IProps {
  modifiers?: Record<string, boolean>;
}

export interface IState {
  hover: boolean;
}
