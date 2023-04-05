import classNames from 'classnames';
import React from 'react';
export interface IGridProps {
  className?: string;
  style?: React.CSSProperties;
  //行数
  column: number | string;
  columnGap?: number;
  rowGap?: number;
  marginBottom?: string | number;
  children: React.ReactNode;
  [key: string]: any;
}
const Grid: React.FC<IGridProps> = ({
  column,
  columnGap,
  marginBottom,
  rowGap,
  style,
  children,
  ...otherProps
}) => {
  if (typeof column === 'number') {
    column = classNames({}, new Array(column).fill('1fr') as any);
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: column,
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
