//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import "./index.less";

function textClass(number) {
  return "number" + number;
}
function Flipper(props: any) {
  const [isFlipping, setIsFilpping] = useState(false);
  const [flipType, setFlipType] = useState("down");
  const [text, setText] = useState([props.frontText, props.backText]);

  const [frontTextFromData, backTextFromData] = text;

  const flip = useCallback(
    (front, back, type = "down") => {
      // 如果处于翻转中，则不执行
      if (isFlipping) {
        return false;
      }
      setIsFilpping(true);
      setFlipType(type);
      setText([front, back]);
      setTimeout(() => {
        setText([back, back]);
        setIsFilpping(false);
      }, props.duration);
    },
    [props.duration]
  );

  useEffect(() => {
    if (props.backText !== frontTextFromData) {
      flip(frontTextFromData, props.backText);
    }
  }, [props.backText]);
  return (
    <div
      className={["M-Flipper", flipType, isFlipping ? "go" : null].join(" ")}
      style={props.style}
      onClick={() => {
        flip(frontTextFromData, props.backText);
      }}
    >
      <div className={"digital front " + textClass(frontTextFromData)}></div>
      <div className={"digital back " + textClass(backTextFromData)}></div>
    </div>
  );
}
// props默认值
Flipper.defaultProps = {
  // front paper text
  // 前牌文字
  frontText: 0,
  // back paper text
  // 后牌文字
  backText: 1,
  // flipping duration, please be consistent with the CSS animation-duration value.
  // 翻牌动画时间，与CSS中设置的animation-duration保持一致
  duration: 600,
};

export default Flipper;
