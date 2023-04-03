import classnames from 'classnames';
import React from 'react';
import Grid from '../Grid';
import List, { IListProps } from '../List';
import './index.less';

export interface IColumn<T> {
  key: string;
  title: string;
  render?: (
    item: T,
    key: string,
    renderRowIndex: number,
    column: IColumn<T>,
    actualRowIndex: number,
  ) => React.ReactNode;
}
export interface ITableProps<T> {
  /**用于生成的列表子项的源数据*/
  dataSource?: T[];
  /**渲染子项的元数据*/
  columns?: IColumn<T>[];
  /**子项的key*/
  rowKey?: IListProps<T>['rowKey'];
  /** 详见 http://202.104.149.204:4872/detail?name=@vui/list */
  listProps?: IListProps<T>;

  /** grid 的配置*/
  /**列间距 */
  columnGap?: number;
  /**行间距 */
  rowGap?: number;
  /** 列数 默认等于 columns 的个数  */
  templateColumns?: number | string;

  /** header容器的样式 */
  headerStyle?: React.CSSProperties;
  /** header每列容器的样式 */
  headerItemStyle?: React.CSSProperties;
  /** body的样式 */
  bodyStyle?: React.CSSProperties;
  /** 每行的容器的样式 */
  bodyItemStyle?: React.CSSProperties;

  /** 每列的样式 */
  columnItemStyle?: React.CSSProperties;
  /**奇数行类名 */
  oddClassName?: string;
  /**偶数行类名 */
  evenClassName?: string;

  /**是否需要自动滚动 */
  scrollBody?: {
    /**一次展示多少个 */
    showSize: number;
    /**多少时间滚动一次 */
    time?: number;
    /**一次滚动多少数量 */
    skipSize?: number;
  };
}

interface ITableState<T> {
  //滚动时的渲染数据
  renderData: T[];
  //是否在动画中
  animationIng: boolean;
  //累计滚动的数量
  skipAllNum: number;
}
class Table<T> extends React.Component<ITableProps<T>, ITableState<T>> {
  static defaultProps = {
    dataSource: [],
    columns: [],
    columnGap: 0,
    rowGap: 0,
    listProps: {},
  };
  constructor(props: ITableProps<T>) {
    super(props);
    this.state = {
      renderData: props.dataSource!.concat([]),
      animationIng: false,
      skipAllNum: 0,
    };
  }
  componentDidMount() {
    // if()
    if (this.props.scrollBody) {
      this.startScroll();
    }
  }
  componentDidUpdate(prevProps: ITableProps<T>) {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.setState({
        renderData: this.props.dataSource!.concat([]),
        skipAllNum: 0,
      });
      if (this.props.scrollBody) {
        this.startScroll();
      } else {
        this.stopScroll();
      }
    }
  }

  componentWillUnmount() {
    this.stopScroll();
  }
  timer: any = null;
  startScroll = () => {
    this.stopScroll();
    this.timer = setInterval(
      this.scrollUp,
      this.props.scrollBody?.time || 5000,
    );
  };
  stopScroll = () => {
    clearInterval(this.timer);
  };
  scrollUp = () => {
    const { scrollBody: { skipSize = 1 } = {} } = this.props;
    const { renderData, skipAllNum } = this.state;
    this.setState(
      {
        renderData: renderData.concat(renderData.slice(0, skipSize)),
        animationIng: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            renderData: this.state.renderData.slice(skipSize),
            skipAllNum: skipAllNum + 1,
            animationIng: false,
          });
        }, 1000);
      },
    );
  };
  render() {
    const {
      columns,
      dataSource,
      rowKey,
      listProps,
      columnGap,
      rowGap = 0,
      headerStyle,
      headerItemStyle,
      bodyStyle,
      bodyItemStyle,
      columnItemStyle,
      templateColumns = columns!.length,
      oddClassName,
      evenClassName,
      scrollBody,
    } = this.props;
    const { renderData, animationIng, skipAllNum } = this.state;
    let marginTop = 0;
    if (scrollBody) {
      const { showSize, skipSize = 1 } = scrollBody;
      listProps!.autoHeight = false;
      listProps!.height = (listProps!.rowHeight! + rowGap) * showSize;
      marginTop = -(listProps!.rowHeight! + rowGap) * skipSize;
    }
    return (
      <div className={'vui-table'}>
        <Grid
          className={'vui-table-header'}
          style={headerStyle}
          colunm={templateColumns}
          columnGap={columnGap}
          //@ts-ignore
          marginBottom={headerStyle?.marginBottom}
        >
          {columns!.map((column) => (
            <div
              className={'vui-table-header-item'}
              key={column.key}
              style={headerItemStyle}
            >
              {column.title}
            </div>
          ))}
        </Grid>

        <div className={'vui-table-body'} style={bodyStyle}>
          <List
            {...listProps}
            rowKey={rowKey}
            dataSource={renderData}
            style={{ pointerEvents: scrollBody ? 'none' : 'auto' }}
            listContentStyle={{
              marginTop: animationIng ? marginTop : 0,
              transition: `all ${animationIng ? 0.8 : 0}s`,
            }}
            renderItem={(data, dataIndex) => {
              const actualRowIndex =
                (dataIndex + skipAllNum * (scrollBody?.skipSize || 1)) %
                dataSource!.length;
              return (
                <Grid
                  className={classnames({
                    ['vui-table-body-item']: true,
                    [oddClassName || 'odd']: actualRowIndex % 2 == 1,
                    [evenClassName || 'even']: actualRowIndex % 2 == 0,
                  })}
                  style={{ ...bodyItemStyle }}
                  marginBottom={rowGap}
                  colunm={templateColumns}
                  columnGap={columnGap}
                >
                  {columns!.map((column, columnIndex) => (
                    <div
                      className={'vui-table-body-item-column-item'}
                      key={data[column.key]}
                      style={columnItemStyle}
                    >
                      <div className={'column-item-text'}>
                        {typeof column.render === 'function'
                          ? column.render(
                              data,
                              column.key,
                              dataIndex,
                              column,
                              actualRowIndex,
                            )
                          : data[column.key]}
                      </div>
                    </div>
                  ))}
                </Grid>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default Table;
