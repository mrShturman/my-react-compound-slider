import * as React from 'react';

import { SliderItem, GetEventData, EmitMouse, EmitTouch } from '../types';
import { LinearScale } from '../scales/LinearScale';

export interface TicksObject {
  activeHandleID: string;
  getEventData: GetEventData;
  ticks: Array<SliderItem>;
}

export interface TicksProps {
  /** @ignore */
  scale?: LinearScale;
  /**
   * Approximate number of ticks you want to render.
   * If you supply your own ticks using the values prop this prop has no effect.
   */
  count?: number;
  /**
   * The values prop should be an array of unique numbers.
   * Use this prop if you want to specify your own tick values instead of ticks generated by the slider.
   * The numbers should be valid numbers in the domain and correspond to the step value.
   * Invalid values will be coerced to the closet matching value in the domain.
   */
  values?: ReadonlyArray<number>;
  minValue?: number;
  /** @ignore */
  getEventData?: GetEventData;
  /** @ignore */
  activeHandleID?: string;
  /** @ignore */
  emitMouse?: EmitMouse;
  /** @ignore */
  emitTouch?: EmitTouch;
  /**
   * A function to render the ticks.
   * The function receives an object with an array of ticks. Note: `getEventData` can be called with an event and get the value and percent at that location (used for tooltips etc). `activeHandleID` will be a string or null.  Function signature:
   * `({ getEventData, activeHandleID, ticks  }): element`
   */
  children: (ticksObject: TicksObject) => React.ReactElement;
}
