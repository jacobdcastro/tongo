import React, { useEffect, useState } from 'react';
import { useWindowWidth } from 'window-dimensions-hooks';

export type XanoImgSizeApi =
  | 'tiny'
  | 'small'
  | 'med'
  | 'big'
  | 'large'
  | 'xlarge';

type HookReturnFn = (level: 1 | 2 | 3) => string;

const useXanoImageByWindowSize = (): HookReturnFn => {
  const [level, setLevel] = useState<number>();
  const [size, setSize] = useState<XanoImgSizeApi>();
  const width = useWindowWidth();

  useEffect(() => {
    if (level === 1) {
      if (width <= 768) setSize('med');
      else if (width <= 1024) setSize('big');
      else setSize('large');
    }

    if (level === 2) {
      if (width <= 768) setSize('big');
      else if (width <= 1024) setSize('large');
      else if (width <= 1280) setSize('xlarge');
      else setSize('xlarge');
    }
  }, [level, width]);

  return l => {
    setLevel(l);
    return size;
  };
};

export default useXanoImageByWindowSize;
