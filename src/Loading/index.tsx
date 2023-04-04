import React from 'react';
import './index.less';
function Loading({ color }: { color?: string }) {
  return (
    <div className="rectangle-bounce">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
}
export default Loading;
