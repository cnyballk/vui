import { useUpdateEffect } from 'ahooks';
import { motion } from 'framer-motion';
import React, { Children, useEffect, useRef, useState } from 'react';
const variants = {
  open: {
    opacity: 1,
    // transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    width: 0,
    // transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function Panel({
  isShow,
  children,
  left = 'unset',
  right = 'unset',
  top = 'unset',
  bottom = 'unset',
  closedX = -50,
  closedY = 0,
  destroyOnClose = false,
}: any) {
  const itemVariants = {
    open: { opacity: 1, x: 0, y: 0 },
    closed: { opacity: 0, x: 0, y: 0 },
  };
  itemVariants.closed.x = closedX;
  itemVariants.closed.y = closedY;
  const isFirst = useRef(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isShow) {
      if (isFirst.current === true) {
        setTimeout(() => {
          setIsOpen(true);
        }, 100);
        isFirst.current = false;
      } else {
        setTimeout(() => {
          setIsOpen(true);
        }, 600);
      }
    } else {
      setIsOpen(false);
    }
  }, [isShow]);
  const [panelkey, setPanelkey] = useState('Panel-' + Math.random());

  useUpdateEffect(() => {
    if (destroyOnClose && isOpen) {
      setPanelkey('Panel-' + Math.random());
    }
  }, [isOpen]);
  return (
    <motion.div
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
      style={{
        opacity: isOpen ? '1' : '0',
        position: 'absolute',
        left,
        right,
        top,
        bottom,
        overflow: isOpen ? 'auto' : 'hidden',
      }}
    >
      <div className="panel-content" key={panelkey}>
        {Children.map(children, (Item) => (
          <motion.div variants={itemVariants}>{Item}</motion.div>
        ))}
      </div>
    </motion.div>
  );
}
