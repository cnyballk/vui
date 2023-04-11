import classnames from 'classnames';
import React from 'react';
import './index.less';
import { IMenu } from './types';
import { emitMsgs } from './utils';

interface IMenuProps {
  //控制菜单的数据源
  data: IMenu[];
  //顶级类名 控制样式
  className?: string;
  //是否多选
  multiSelect?: boolean;
  //默认选择
  defaultSelectIndex?: number[];
  //是否可以取消
  unselect?: boolean;
  //初始层级
  level?: number;
  //前置类名 默认等于className
  prefixClassName?: string;
  onRef?: any;
  onChange?: (selectIndex: number[][]) => void;
  socket: any;
  isLink?: boolean;
  history?: any;
  childShowType?: 'select';
  renderItem?: (
    menu: IMenu,
    index: number,
    isSelect: boolean,
  ) => React.ReactNode;
}

interface IMenuState {
  //选择中的菜单按钮下标集合
  selectIndex: number[];
}

class Menu extends React.Component<IMenuProps, IMenuState> {
  static defaultProps = {
    defaultSelectIndex: [],
    multiSelect: false,
    unselect: false,
    level: 0,
  };
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      selectIndex: props.defaultSelectIndex!,
    };
    this.changeDefaultIndex();
  }
  allSelectIndexs: number[][] = [];
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    this.state.selectIndex.forEach((index) => {
      emitMsgs(this.props.socket, this.props.data?.[index]?.msgs);
    });
  }

  changeDefaultIndex() {
    this.allSelectIndexs = [this.state.selectIndex];
    this.props.onChange?.(this.allSelectIndexs);
  }
  setDefaultSelectIndex() {
    this.setState({ selectIndex: [] });
  }
  setSelectIndex(selectIndex: number[]) {
    this.allSelectIndexs = [selectIndex];
    this.props.onChange?.(this.allSelectIndexs);
    this.setState({ selectIndex });
  }
  setTabIndex = (menuItem: IMenu, index: number) => {
    if (this.props.multiSelect) {
      this.multiSelect(menuItem, index);
    } else {
      this.singleSelect(menuItem, index);
    }
  };
  singleSelect = (menuItem: IMenu, index: number) => {
    let { unselect, data, socket } = this.props;
    let selectIndex = this.state.selectIndex[0];
    let isSelect = selectIndex === index;
    if (isSelect) {
      if (unselect) {
        this.setSelectIndex([]);
        emitMsgs(socket, menuItem.unselectMsgs);
      }
      emitMsgs(socket, menuItem.msgs);
    } else {
      if (selectIndex !== undefined) {
        emitMsgs(socket, data[selectIndex].unselectMsgs);
      }
      this.setSelectIndex([index]);
      emitMsgs(socket, menuItem.msgs);
    }
  };
  multiSelect = (menuItem: IMenu, index: number) => {
    const { unselect, socket } = this.props;
    let selectIndex = this.state.selectIndex.concat([]);
    let _index = selectIndex.indexOf(index);
    let isSelect = _index !== -1;
    if (isSelect) {
      if (unselect) {
        selectIndex.splice(_index, 1);
        emitMsgs(socket, menuItem.unselectMsgs);
      }
    } else {
      selectIndex.push(index);
      emitMsgs(socket, menuItem.msgs);
    }
    this.setSelectIndex(selectIndex);
  };
  emptySelect() {
    const { data, socket } = this.props;
    this.state.selectIndex.forEach((e) => {
      emitMsgs(socket, data[e].unselectMsgs);
    });
  }
  componentWillUnmount() {
    this.emptySelect();
  }
  render() {
    const {
      data,
      className = '',
      prefixClassName = className,
      level = 0,
      socket,
      isLink,
      history,
      renderItem,
      childShowType,
    } = this.props;
    const { selectIndex } = this.state;
    return (
      <div
        className={classnames([
          'vui-menu-wrap',
          className,
          prefixClassName + '-level-' + level,
        ])}
      >
        <div className="menu-content">
          {data.map((menuItem, menuIndex) => {
            let isSelect = false;
            if (isLink) {
              const key = menuItem.key || menuItem.url;
              if (key === '/') {
                isSelect = history.location.pathname === key;
              } else {
                isSelect = history.location.pathname.indexOf(key) !== -1;
              }
            } else {
              isSelect = selectIndex.indexOf(menuIndex) !== -1;
            }

            return (
              <React.Fragment key={menuItem.label}>
                <div
                  className={classnames({
                    'menu-item': true,
                    select: isSelect,
                    disable: !!menuItem.isDisable,
                    'vui-disable': !!menuItem.isDisable,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!menuItem.isDisable) {
                      this.setTabIndex(menuItem, menuIndex);
                      if (isLink) {
                        menuItem.url && history.push(menuItem.url);
                      }
                    }
                  }}
                >
                  {renderItem ? (
                    renderItem(menuItem, menuIndex, isSelect)
                  ) : (
                    <>
                      {menuItem.icon}
                      <span>{menuItem.label}</span>
                    </>
                  )}
                  {(childShowType === 'select' ? isSelect : true) &&
                    menuItem.children!?.length > 0 && (
                      <Menu
                        isLink={isLink}
                        data={menuItem.children || []}
                        socket={socket}
                        level={level + 1}
                        prefixClassName={prefixClassName}
                        defaultSelectIndex={menuItem.defaultSelectIndex}
                        unselect={menuItem.unselect}
                        multiSelect={menuItem.multiSelect}
                        history={history}
                        renderItem={renderItem}
                        onChange={(selectIndexs) => {
                          this.allSelectIndexs = [
                            this.allSelectIndexs[0],
                            ...selectIndexs,
                          ];
                          this.props.onChange?.(this.allSelectIndexs);
                        }}
                      />
                    )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Menu;
