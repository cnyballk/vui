import React, { type FC } from 'react';
import ReactCountUp from 'react-countup';
import { CountUpProps } from 'react-countup/build/CountUp';

const CountUp: FC<CountUpProps> = (props) => (
  <ReactCountUp duration={2.75} {...props}></ReactCountUp>
);

export default CountUp;
