import classNames from 'classnames';
import React from 'react';
export interface IGridProps {
  className?: string;
  style?: React.CSSProperties;
  //行数
  colunm: number | string;
  columnGap?: number;
  rowGap?: number;
  marginBottom?: string | number;
  children: React.ReactNode;
}
const Grid: React.FC<IGridProps> = (props) => {
  let colunm = props.colunm;
  if (typeof props.colunm === 'number') {
    colunm = classNames({}, new Array(colunm).fill('1fr') as any);
  }
  return (
    <div
      className={props.className}
      style={{
        ...props.style,
        display: 'grid',
        gridTemplateColumns: colunm,
        columnGap: props.columnGap,
        rowGap: props.rowGap,
        marginBottom: props.marginBottom,
      }}
    >
      {props.children}
    </div>
  );
};
export default Grid;
