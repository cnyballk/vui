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
  [key: string]: any;
}
const Grid: React.FC<IGridProps> = ({
  colunm,
  columnGap,
  marginBottom,
  rowGap,
  style,
  children,
  ...otherProps
}) => {
  if (typeof colunm === 'number') {
    colunm = classNames({}, new Array(colunm).fill('1fr') as any);
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: colunm,
        columnGap: columnGap,
        rowGap: rowGap,
        marginBottom: marginBottom,
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};
export default Grid;
