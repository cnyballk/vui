import React from 'react';
import Loading from '../Loading';
import { debounce } from '../utils';
import './index.less';

export interface IListProps<T> {
  /**
   * 用于生成的列表子项的源数据
   */
  dataSource?: T[];
  /**渲染子项的函数*/
  renderItem?: (item: T, index: number) => React.ReactNode;
  /**子项的key*/
  rowKey?: string | ((item: T, index: number) => string);
  /**list高度*/
  height?: number;
  /**子项高度*/
  rowHeight?: number;
  /**list的类名*/
  className?: string;
  /**list的style*/
  style?: React.CSSProperties;
  /**子元素，放在dataSource生成的子项后面*/
  children?: React.ReactNode;
  /**加载效果*/
  loading?: boolean | React.ReactNode;
  /**加载更多*/
  loadMore?: boolean | React.ReactNode;
  /**是否是长列表*/
  hasLongList?: boolean;
  /**自适应高度*/
  autoHeight?: boolean;
  /**空文本*/
  emptyText?: string;
  /**content的样式*/
  listContentStyle?: React.CSSProperties;
}
interface ListState {
  scrollHeight: number;
  scrollCurrent: number;
  scrollSize: number;
  listContentStyle: React.CSSProperties;
}

class List<T> extends React.Component<IListProps<T>, ListState> {
  static defaultProps = {
    className: '',
    dataSource: [],
    bordered: false,
    split: true,
    loading: false,
    loadMore: false,
    hasLongList: true,
    autoHeight: false,
    height: 400,
    rowHeight: 40,
    emptyText: '暂无数据',
  };
  private keys: { [key: string]: string } = {};

  constructor(props: IListProps<T>) {
    super(props);

    this.state = {
      scrollSize: Math.ceil(props.height! / props.rowHeight!),
      scrollCurrent: 0,
      scrollHeight: props.dataSource!.length * props.rowHeight!,
      listContentStyle: {},
    };
  }
  renderItem = (item: any, index: number) => {
    const { renderItem, rowKey } = this.props;
    if (!renderItem) return null;
    let key;
    if (typeof rowKey === 'function') {
      key = rowKey(item, index);
    } else if (typeof rowKey === 'string') {
      key = item[rowKey];
    } else {
      key = item.key;
    }
    if (!key) {
      key = `list-item-${index}`;
    }
    this.keys[index] = key;

    return renderItem(item, index);
  };
  //恢复触发hover事件
  listContentStylePointerEvents2none = debounce(() => {
    this.setState({
      listContentStyle: {
        ...this.state.listContentStyle,
        pointerEvents: 'auto',
      },
    });
  }, 200);
  onScroll = (e: any) => {
    const { listContentStyle } = this.state;
    const { rowHeight, hasLongList } = this.props;
    const scrollTop = e.target.scrollTop;

    //避免滚动过程中触发hover等事件
    this.setState({
      listContentStyle: {
        ...listContentStyle,
        pointerEvents: 'none',
      },
    });
    ///长列表则计算长度;
    if (hasLongList) {
      this.setState(({ listContentStyle }) => ({
        scrollCurrent: Math.floor(scrollTop / rowHeight!),
        listContentStyle: {
          ...listContentStyle,
          transform: `translate3d(0, ${
            scrollTop - (scrollTop % rowHeight!)
          }px, 0)`,
        },
      }));
    }
    ///是否到底部

    this.listContentStylePointerEvents2none();
  };
  render() {
    const {
      dataSource = [],
      className,
      style,
      children,
      height,
      autoHeight,
      loading,
      loadMore,
      emptyText,
      hasLongList,
      listContentStyle: listContentStyleProps,
    } = this.props;
    const { scrollHeight, scrollSize, scrollCurrent, listContentStyle } =
      this.state;
    let splitDataSource = [...dataSource];
    if (hasLongList) {
      splitDataSource = splitDataSource.slice(
        scrollCurrent,
        scrollCurrent + scrollSize,
      );
    }

    const items = splitDataSource.map((item: any, index: number) =>
      this.renderItem(item, index),
    );
    const childrenList: Array<React.ReactNode> = [];
    React.Children.forEach(items, (child: any, index) => {
      childrenList.push(
        React.cloneElement(child, {
          key: this.keys[index],
        }),
      );
    });
    let _listContentStyle = listContentStyle;
    //长列表 listContentStyle
    if (!hasLongList) {
      _listContentStyle = {
        ...listContentStyle,
        // position: "absolute",
        transform: `translate3d(0, 0, 0)`,
      };
    }
    // //如果是自适应高度则不需要 listContentStyle
    // if (autoHeight) {
    //   _listContentStyle = {};
    // }
    return (
      <div
        className={`vui-list ${className}`}
        style={{ ...style, height: autoHeight ? 'auto' : height }}
        onScroll={this.onScroll}
      >
        <div
          className="list-content"
          style={{ ..._listContentStyle, ...listContentStyleProps }}
        >
          {childrenList}
          {children}
          {!!loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Loading></Loading>
            </div>
          ) : (
            loading
          )}
          {loadMore}
          {!loading && !loadMore && !children && childrenList.length === 0 && (
            <div className="vui-empty-text">{emptyText}</div>
          )}
        </div>
        <div style={{ height: autoHeight ? 'auto' : scrollHeight }} />
      </div>
    );
  }
}
export default List;
