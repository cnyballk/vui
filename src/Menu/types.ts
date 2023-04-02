export type IMsgItem = any;
export interface IMenuItem {
  //展示的名称
  label: string;
  msgs?: IMsgItem[];
  unselectMsgs?: IMsgItem[];
  [key: string]: any;
}
export interface IMenu extends IMenuItem {
  //是否多选
  multiSelect?: boolean;
  //默认选择
  defaultSelectIndex?: number[];
  //是否可以取消
  unselect?: boolean;
  //是否是link
  url?: string;
  //子菜单
  children?: IMenu[];
}
