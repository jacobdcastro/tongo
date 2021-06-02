import { useState, useContext } from 'react';
import { useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { DisableScrollContext } from '../components/layout/components/Context/DisableScrollContext';

const useCarouselTest = (arrayLength: number) => {
  const { setScrollIsDisabled } = useContext(DisableScrollContext);
  const [pos, setPos] = useState(0);
  const [gesture, setGesture] = useState({
    isMoving: false,
    lastMx: 0,
  });
  const { isMoving, lastMx } = gesture;

  const [{ x }, set] = useSpring(() => ({ x: pos * 245, immediate: true }));

  const bind = useDrag(({ down, movement: [mx], velocity, direction }) => {
    // console.log(
    //   'Is using carousel',
    //   Math.abs(direction[0]) > Math.abs(direction[1])
    // );

    if (down && !isMoving) {
      // console.log(`i'm down`);
      setGesture({ isMoving: true, lastMx: mx });
    }
    // console.log({ velocity });

    if (!down && isMoving) {
      // console.log(`i've finished moving`);
      setGesture({ isMoving: false, lastMx });

      // console.log('New pos', pos + Math.round(lastMx / 245));

      // if (velocity >= 1) {
      //   setPos(pos - 1);
      //   set({ x: pos - 1 * 245, immediate: false });
      // } else if (velocity <= -1) {
      //   setPos(pos + 1);
      //   set({ x: pos + 1 * 245, immediate: false });
      // } else {
      setPos(pos + Math.round(lastMx / 245));
      set({ x: (pos + Math.round(lastMx / 245)) * 245, immediate: false });
      // }

      setGesture({ isMoving: false, lastMx: 0 });
      // console.log(`state reset`);
    }

    if (down && isMoving) {
      setGesture({ isMoving: true, lastMx: mx });
    }

    if (down) set({ x: pos * 245 + mx, immediate: down });
  });

  return { bind, x };
};

export default useCarouselTest;
