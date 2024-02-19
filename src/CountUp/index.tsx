import React, { useImperativeHandle, useState, type FC } from 'react';
import ReactCountUp from 'react-countup';
import { CountUpProps } from 'react-countup/build/CountUp';

const CountUp: FC<CountUpProps> = (props, ref) => {
  const { end, ...otherProps } = props;
  const [currentEnd, setEnd] = useState(end);
  useImperativeHandle(ref, () => {
    return {
      setEnd: function (end: number) {
        setEnd(end);
      },
    };
  });
  return (
    <ReactCountUp
      duration={2.75}
      end={currentEnd}
      {...otherProps}
    ></ReactCountUp>
  );
};

export default CountUp;
