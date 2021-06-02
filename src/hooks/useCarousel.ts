import { useReducer } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';

// TODO prevent scroll past beginning/end of carousel

interface CarouselState {
  currentTranslateVal: number;
  changeVal: number;
  maxArray: number;
  currentIndex: number;
}

interface useCarouselAction {
  type: string;
}

interface UseCarouselReturnTypes {
  state: CarouselState;
  handlers: SwipeableHandlers;
  reactDispatch: React.Dispatch<useCarouselAction>;
}

const setInitialCarouselState = (
  changeVal: number,
  numOfEvents: number
): CarouselState => {
  return {
    currentTranslateVal: 0,
    changeVal: changeVal,
    maxArray: numOfEvents,
    currentIndex: 0,
  };
};

function carouselReducer(state: CarouselState, action: useCarouselAction) {
  const { currentTranslateVal, changeVal } = state;
  switch (action.type) {
    case 'NEXT':
      if (state.currentIndex === state.maxArray) return { ...state };
      return {
        ...state,
        currentTranslateVal: currentTranslateVal - changeVal,
        currentIndex: state.currentIndex + 1,
      };
    case 'PREV':
      if (state.currentIndex === 0) return { ...state };
      return {
        ...state,
        currentTranslateVal: currentTranslateVal + changeVal,
        currentIndex: state.currentIndex - 1,
      };
    default:
      return state;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCarousel = (
  changeVal: number,
  numOfEvents: number
): UseCarouselReturnTypes => {
  const [state, dispatch] = useReducer(
    carouselReducer,
    setInitialCarouselState(changeVal, numOfEvents)
  );

  // calls reducer for state change
  const initSwipe = (type: string) => dispatch({ type });

  // detects swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => initSwipe('NEXT'),
    onSwipedRight: () => initSwipe('PREV'),
  });

  return { state, handlers, reactDispatch: dispatch };
};

export default useCarousel;
