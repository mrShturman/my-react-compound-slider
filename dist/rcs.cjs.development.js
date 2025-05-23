'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var warning = require('warning');
var React = require('react');
var d3Array = require('d3-array');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var warning__default = /*#__PURE__*/_interopDefaultLegacy(warning);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var prfx = 'my-react-compound-slider:';
function getSortByVal() {
  var reversed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function sortByVal(a, b) {
    if (a.val > b.val) {
      return reversed ? -1 : 1;
    }

    if (b.val > a.val) {
      return reversed ? 1 : -1;
    }

    return 0;
  };
}
function getUpdatedHandles(handles, updateKey, updateValue) {
  var reversed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var index = handles.findIndex(v => v.key === updateKey);

  if (index !== -1) {
    var _handles$index = handles[index],
        key = _handles$index.key,
        val = _handles$index.val;

    if (val === updateValue) {
      return handles;
    }

    return [...handles.slice(0, index), {
      key,
      val: updateValue
    }, ...handles.slice(index + 1)].sort(getSortByVal(reversed));
  }

  return handles;
}
function getSliderDomain(slider, vertical) {
  if (!slider) {
    return [0, 0];
  }

  var s = slider.getBoundingClientRect();
  var d0 = vertical ? s.top : s.left;
  var d1 = vertical ? s.bottom : s.right;
  return [d0, d1];
}
function isNotValidTouch(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? '' : _ref$type,
      touches = _ref.touches;
  return !touches || touches.length > 1 || type.toLowerCase() === 'touchend' && touches.length > 0;
}
function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}
function getHandles() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var reversed = arguments.length > 1 ? arguments[1] : undefined;
  var valueToStep = arguments.length > 2 ? arguments[2] : undefined;
  var warn = arguments.length > 3 ? arguments[3] : undefined;
  var changes = 0;
  var handles = values.map(x => {
    var val = valueToStep.getValue(x);

    if (x !== val) {
      changes += 1;
      warning__default['default'](!warn, "".concat(prfx, " Invalid value encountered. Changing ").concat(x, " to ").concat(val, "."));
    }

    return val;
  }).map((val, i) => ({
    key: "$$-".concat(i),
    val
  })).sort(getSortByVal(reversed));
  return {
    handles,
    changes
  };
}

// default mode
function mode1(_, next) {
  return next;
} // prevent duplicate values and crossing

function mode2(curr, next) {
  for (var i = 0; i < curr.length; i++) {
    if (curr[i].key !== next[i].key) {
      return curr;
    }

    if (next[i + 1] && next[i].val === next[i + 1].val) {
      return curr;
    }
  }

  return next;
} // pushable mode

function mode3(curr, next, step, reversed, getValue) {
  var indexForMovingHandle = -1;
  var handleMoveIsPositive = true;

  for (var i = 0; i < curr.length; i++) {
    var c = curr[i];
    var n = next[i]; // make sure keys are in same order if not return curr

    if (!n || n.key !== c.key) {
      return curr;
    } else if (n.val !== c.val) {
      indexForMovingHandle = i;
      handleMoveIsPositive = n.val - c.val > 0;
    }
  } // nothing has changed (shouldn't happen but just in case).


  if (indexForMovingHandle === -1) {
    return curr;
  } else {
    var increment = handleMoveIsPositive ? step : -step;

    for (var _i = 0; _i < next.length; _i++) {
      var n0 = next[_i];
      var n1 = next[_i + 1];

      if (n1 && n0.val === n1.val) {
        if (_i === indexForMovingHandle) {
          var newStep = n1.val + increment;

          if (getValue(newStep) === newStep) {
            var clone = getUpdatedHandles(next, n1.key, n1.val + increment, reversed);
            var check = mode3(next, clone, step, reversed, getValue);

            if (check === next) {
              return curr;
            } else {
              return check;
            }
          } else {
            return curr;
          }
        } else {
          var _newStep = n0.val + increment;

          if (getValue(_newStep) === _newStep) {
            var _clone = getUpdatedHandles(next, n0.key, n0.val + increment, reversed);

            var _check = mode3(next, _clone, step, reversed, getValue);

            if (_check === next) {
              return curr;
            } else {
              return _check;
            }
          } else {
            return curr;
          }
        }
      }
    }
  }

  return next;
}

function callAll() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return e => {
    return fns.forEach(fn => fn && fn(e));
  };
}

var NOOP = () => ({
  value: 0,
  percent: 0
});

class Rail extends React.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    this.getRailProps = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props = _this.props,
          emitMouse = _this$props.emitMouse,
          emitTouch = _this$props.emitTouch;
      return _objectSpread2(_objectSpread2({}, props), {}, {
        onMouseDown: callAll(props && props.onMouseDown, emitMouse),
        onTouchStart: callAll(props && props.onTouchStart, emitTouch)
      });
    };
  }

  render() {
    var getRailProps = this.getRailProps,
        _this$props2 = this.props,
        getEventData = _this$props2.getEventData,
        _this$props2$activeHa = _this$props2.activeHandleID,
        activeHandleID = _this$props2$activeHa === void 0 ? '' : _this$props2$activeHa,
        children = _this$props2.children;
    var renderedChildren = children({
      getEventData: getEventData || NOOP,
      activeHandleID,
      getRailProps
    });
    return renderedChildren && React__default['default'].Children.only(renderedChildren);
  }

}

class Handles extends React.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    this.autofocus = e => {
      if (e.target instanceof HTMLElement) {
        e.target.focus();
      }
    };

    this.getHandleProps = function (id) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$props = _this.props,
          emitKeyboard = _this$props.emitKeyboard,
          emitMouse = _this$props.emitMouse,
          emitTouch = _this$props.emitTouch;
      return _objectSpread2(_objectSpread2({}, props), {}, {
        onKeyDown: callAll(props && props.onKeyDown, e => emitKeyboard && emitKeyboard(e, id)),
        onMouseDown: callAll(props && props.onMouseDown, _this.autofocus, e => emitMouse && emitMouse(e, id)),
        onTouchStart: callAll(props && props.onTouchStart, e => emitTouch && emitTouch(e, id))
      });
    };
  }

  render() {
    var getHandleProps = this.getHandleProps,
        _this$props2 = this.props,
        _this$props2$activeHa = _this$props2.activeHandleID,
        activeHandleID = _this$props2$activeHa === void 0 ? '' : _this$props2$activeHa,
        children = _this$props2.children,
        _this$props2$handles = _this$props2.handles,
        handles = _this$props2$handles === void 0 ? [] : _this$props2$handles;
    var renderedChildren = children({
      handles,
      activeHandleID,
      getHandleProps
    });
    return renderedChildren && React__default['default'].Children.only(renderedChildren);
  }

}

class LinearScale {
  constructor() {
    this.interpolator = void 0;
    this.domain = [0, 1];
    this.range = [0, 1];
    this.domain = [0, 1];
    this.range = [0, 1];
    this.interpolator = null;
  }

  createInterpolator(domain, range) {
    var d0 = domain[0];
    var d1 = domain[1];
    var r0 = range[0];
    var r1 = range[1];

    if (d1 < d0) {
      return x => this.interpolateValue(r1, r0)(this.deinterpolateValue(d1, d0)(x));
    } else {
      return x => this.interpolateValue(r0, r1)(this.deinterpolateValue(d0, d1)(x));
    }
  }

  interpolateValue(a, b) {
    return a = +a, b -= a, function i(t) {
      return a + b * t;
    };
  }

  deinterpolateValue(a, b) {
    return (b -= a = +a) ? x => (x - a) / b : () => b;
  }

  rescale() {
    this.interpolator = null;
    return this;
  }

  getValue(x) {
    var domain = this.domain,
        range = this.range;
    return (this.interpolator || (this.interpolator = this.createInterpolator(domain, range)))(+x);
  }

  setDomain(val) {
    this.domain = [val[0], val[1]];
    this.rescale();
    return this;
  }

  getDomain() {
    return this.domain;
  }

  setRange(val) {
    this.range = [val[0], val[1]];
    return this;
  }

  getRange() {
    return this.range;
  }

  getTicks(count) {
    var d = this.domain;
    return d3Array.ticks(d[0], d[d.length - 1], count ? count : 10);
  }

}

var defaultGetEventData = () => ({
  value: 0,
  percent: 0
});

class Ticks extends React.Component {
  render() {
    var _this$props = this.props,
        children = _this$props.children,
        values = _this$props.values,
        _this$props$minValue = _this$props.minValue,
        minValue = _this$props$minValue === void 0 ? 0 : _this$props$minValue,
        _this$props$scale = _this$props.scale,
        scale = _this$props$scale === void 0 ? new LinearScale() : _this$props$scale,
        _this$props$count = _this$props.count,
        count = _this$props$count === void 0 ? 10 : _this$props$count,
        _this$props$getEventD = _this$props.getEventData,
        getEventData = _this$props$getEventD === void 0 ? defaultGetEventData : _this$props$getEventD,
        _this$props$activeHan = _this$props.activeHandleID,
        activeHandleID = _this$props$activeHan === void 0 ? '' : _this$props$activeHan;
    var ticks = (values ? values : scale.getTicks(count)).map(value => ({
      id: "$$-".concat(value),
      value: value <= minValue ? minValue : value,
      percent: scale.getValue(value)
    }));
    var renderedChildren = children({
      getEventData,
      activeHandleID,
      ticks
    });
    return renderedChildren && React__default['default'].Children.only(renderedChildren);
  }

}

var defaultGetEventData$1 = () => ({
  value: 0,
  percent: 0
});

class Tracks extends React.Component {
  constructor() {
    super(...arguments);

    this.getTrackProps = props => {
      var _this$props = this.props,
          emitMouse = _this$props.emitMouse,
          emitTouch = _this$props.emitTouch;
      return _objectSpread2(_objectSpread2({}, props || {}), {}, {
        onMouseDown: callAll(props && props.onMouseDown, emitMouse),
        onTouchStart: callAll(props && props.onTouchStart, emitTouch)
      });
    };
  }

  render() {
    var getTrackProps = this.getTrackProps,
        _this$props2 = this.props,
        children = _this$props2.children,
        _this$props2$left = _this$props2.left,
        left = _this$props2$left === void 0 ? true : _this$props2$left,
        _this$props2$right = _this$props2.right,
        right = _this$props2$right === void 0 ? true : _this$props2$right,
        _this$props2$scale = _this$props2.scale,
        scale = _this$props2$scale === void 0 ? new LinearScale() : _this$props2$scale,
        _this$props2$handles = _this$props2.handles,
        handles = _this$props2$handles === void 0 ? [] : _this$props2$handles,
        _this$props2$getEvent = _this$props2.getEventData,
        getEventData = _this$props2$getEvent === void 0 ? defaultGetEventData$1 : _this$props2$getEvent,
        _this$props2$activeHa = _this$props2.activeHandleID,
        activeHandleID = _this$props2$activeHa === void 0 ? '' : _this$props2$activeHa;
    var domain = scale.getDomain();
    var tracks = [];

    for (var i = 0; i < handles.length + 1; i++) {
      var source = handles[i - 1];
      var target = handles[i];

      if (i === 0 && left === true) {
        source = {
          id: '$',
          value: domain[0],
          percent: 0
        };
      } else if (i === handles.length && right === true) {
        target = {
          id: '$',
          value: domain[1],
          percent: 100
        };
      }

      if (source && target) {
        tracks.push({
          id: "".concat(source.id, "-").concat(target.id),
          source,
          target
        });
      }
    }

    var renderedChildren = children({
      getEventData,
      activeHandleID,
      tracks,
      getTrackProps
    });
    return renderedChildren && React__default['default'].Children.only(renderedChildren);
  }

}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

class DiscreteScale {
  constructor() {
    this.step = 1;
    this.domain = [0, 1];
    this.range = [0, 1];

    this.setDomain = val => {
      this.domain = [val[0], val[1]];
      return this;
    };

    this.setRange = val => {
      this.range = [val[0], val[1]];
      return this;
    };

    this.setStep = val => {
      this.step = val;
      return this;
    };

    this.getValue = x => {
      var _this$domain = _slicedToArray(this.domain, 2),
          d0 = _this$domain[0],
          d1 = _this$domain[1],
          _this$range = _slicedToArray(this.range, 2),
          r0 = _this$range[0],
          r1 = _this$range[1],
          step = this.step;

      var slideLength = r1 - r0;
      var fullSteps = Math.floor(slideLength / step) * step;
      var rest = slideLength - fullSteps;
      if ((r1 - r0) * (x - d0) / (d1 - d0) > fullSteps + Math.round(0.5 * rest)) return r1;
      var p = (clamp(x, d0, d1) - d0) / (d1 - d0);
      var b = step * Math.round(p * (r1 - r0) / step) + r0;
      return clamp(b, r0 < r1 ? r0 : r1, r1 > r0 ? r1 : r0);
    };
  }

}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var noop = () => {};

var compare = b => (m, d, i) => m && b[i] === d;

var equal = (a, b) => {
  return a === b || a.length === b.length && a.reduce(compare(b), true);
};

var isRCSComponent = item => {
  if (! /*#__PURE__*/React.isValidElement(item)) {
    return false;
  }

  var type = item.type;
  var name = type ? type.name : '';
  return name === Handles.name || name === Rail.name || name === Ticks.name || name === Tracks.name;
};

var getNextValue = (curr, step, domain, reversed) => {
  var newVal = reversed ? curr - step : curr + step;
  return reversed ? Math.max(domain[0], newVal) : Math.min(domain[1], newVal);
};

var getPrevValue = (curr, step, domain, reversed) => {
  var newVal = reversed ? curr + step : curr - step;
  return reversed ? Math.min(domain[1], newVal) : Math.max(domain[0], newVal);
};

var defaultDomain = [0, 100];
class Slider extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      step: 0.1,
      values: [],
      domain: defaultDomain,
      handles: [],
      reversed: false,
      activeHandleID: '',
      valueToPerc: null,
      valueToStep: null,
      pixelToStep: null
    };
    this.slider = /*#__PURE__*/React__default['default'].createRef();

    this.onKeyDown = (e, handleID) => {
      var validUpKeys = ['ArrowRight', 'ArrowUp'];
      var validDownKeys = ['ArrowDown', 'ArrowLeft'];
      var handles = this.state.handles,
          _this$props = this.props,
          _this$props$step = _this$props.step,
          step = _this$props$step === void 0 ? 0.1 : _this$props$step,
          _this$props$reversed = _this$props.reversed,
          reversed = _this$props$reversed === void 0 ? false : _this$props$reversed,
          _this$props$vertical = _this$props.vertical,
          vertical = _this$props$vertical === void 0 ? false : _this$props$vertical,
          _this$props$domain = _this$props.domain,
          domain = _this$props$domain === void 0 ? [0, 100] : _this$props$domain;
      var key = e.key || "".concat(e.keyCode);

      if (!validUpKeys.concat(validDownKeys).includes(key)) {
        return;
      }

      if (vertical) {
        var _ref = [validDownKeys, validUpKeys];
        validUpKeys = _ref[0];
        validDownKeys = _ref[1];
      }

      e.stopPropagation && e.stopPropagation();
      e.preventDefault && e.preventDefault();
      var found = handles.find(value => {
        return value.key === handleID;
      });

      if (!found) {
        return;
      }

      var currVal = found.val;
      var newVal = currVal;

      if (validUpKeys.includes(key)) {
        newVal = getNextValue(currVal, step, domain, reversed);
      } else if (validDownKeys.includes(key)) {
        newVal = getPrevValue(currVal, step, domain, reversed);
      }

      var nextHandles = handles.map(v => v.key === handleID ? {
        key: v.key,
        val: newVal
      } : v);
      this.submitUpdate(nextHandles, true);
    };

    this.onMouseDown = (e, handleID) => {
      this.onStart(e, handleID, false);
    };

    this.onTouchStart = (e, handleID) => {
      if (isNotValidTouch(e)) {
        return;
      }

      this.onStart(e, handleID, true);
    };

    this.getEventData = (e, isTouch) => {
      var _this$state = this.state,
          pixelToStep = _this$state.pixelToStep,
          valueToPerc = _this$state.valueToPerc,
          vertical = this.props.vertical; // double check the dimensions of the slider
      // @ts-ignore

      pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical));
      var value;

      if (isTouch && e instanceof TouchEvent) {
        // @ts-ignore
        value = pixelToStep.getValue(getTouchPosition(vertical, e));
      } else if (e instanceof MouseEvent) {
        // @ts-ignore
        value = pixelToStep.getValue(vertical ? e.clientY : e.pageX);
      }

      return {
        value,
        // @ts-ignore
        percent: valueToPerc.getValue(value)
      };
    };

    this.onMouseMove = e => {
      var _this$state2 = this.state,
          curr = _this$state2.handles,
          pixelToStep = _this$state2.pixelToStep,
          _this$state2$activeHa = _this$state2.activeHandleID,
          activeHandleID = _this$state2$activeHa === void 0 ? '' : _this$state2$activeHa,
          _this$props2 = this.props,
          vertical = _this$props2.vertical,
          _this$props2$reversed = _this$props2.reversed,
          reversed = _this$props2$reversed === void 0 ? false : _this$props2$reversed; // double check the dimensions of the slider
      // @ts-ignore

      pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical)); // find the closest value (aka step) to the event location
      // @ts-ignore

      var updateValue = pixelToStep.getValue(vertical ? e.clientY : e.pageX); // generate a "candidate" set of values - a suggestion of what to do

      var nextHandles = getUpdatedHandles(curr, activeHandleID, updateValue, reversed); // submit the candidate values

      this.submitUpdate(nextHandles);
    };

    this.onTouchMove = e => {
      var _this$state3 = this.state,
          curr = _this$state3.handles,
          pixelToStep = _this$state3.pixelToStep,
          activeHandleID = _this$state3.activeHandleID,
          _this$props3 = this.props,
          vertical = _this$props3.vertical,
          reversed = _this$props3.reversed;

      if (pixelToStep === null || isNotValidTouch(e)) {
        return;
      } // double check the dimensions of the slider
      // @ts-ignore


      pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical)); // find the closest value (aka step) to the event location
      // @ts-ignore

      var updateValue = pixelToStep.getValue(getTouchPosition(vertical, e)); // generate a "candidate" set of values - a suggestion of what to do

      var nextHandles = getUpdatedHandles(curr, activeHandleID, updateValue, reversed); // submit the candidate values

      this.submitUpdate(nextHandles);
    };

    this.onMouseUp = () => {
      var _this$state4 = this.state,
          _this$state4$handles = _this$state4.handles,
          handles = _this$state4$handles === void 0 ? [] : _this$state4$handles,
          activeHandleID = _this$state4.activeHandleID,
          _this$props4 = this.props,
          _this$props4$onChange = _this$props4.onChange,
          onChange = _this$props4$onChange === void 0 ? noop : _this$props4$onChange,
          _this$props4$onSlideE = _this$props4.onSlideEnd,
          onSlideEnd = _this$props4$onSlideE === void 0 ? noop : _this$props4$onSlideE;
      onChange(handles.map(d => d.val));
      onSlideEnd(handles.map(d => d.val), {
        activeHandleID
      });
      this.setState({
        activeHandleID: ''
      });

      if (isBrowser) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
      }
    };

    this.onTouchEnd = () => {
      var _this$state5 = this.state,
          handles = _this$state5.handles,
          activeHandleID = _this$state5.activeHandleID,
          _this$props5 = this.props,
          _this$props5$onChange = _this$props5.onChange,
          onChange = _this$props5$onChange === void 0 ? noop : _this$props5$onChange,
          _this$props5$onSlideE = _this$props5.onSlideEnd,
          onSlideEnd = _this$props5$onSlideE === void 0 ? noop : _this$props5$onSlideE;
      onChange(handles.map(d => d.val));
      onSlideEnd(handles.map(d => d.val), {
        activeHandleID
      });
      this.setState({
        activeHandleID: ''
      });

      if (isBrowser) {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var _nextProps$step = nextProps.step,
        step = _nextProps$step === void 0 ? 0.1 : _nextProps$step,
        values = nextProps.values,
        _nextProps$domain = nextProps.domain,
        domain = _nextProps$domain === void 0 ? defaultDomain : _nextProps$domain,
        _nextProps$reversed = nextProps.reversed,
        reversed = _nextProps$reversed === void 0 ? false : _nextProps$reversed,
        _nextProps$onUpdate = nextProps.onUpdate,
        onUpdate = _nextProps$onUpdate === void 0 ? noop : _nextProps$onUpdate,
        _nextProps$onChange = nextProps.onChange,
        onChange = _nextProps$onChange === void 0 ? noop : _nextProps$onChange,
        _nextProps$warnOnChan = nextProps.warnOnChanges,
        warnOnChanges = _nextProps$warnOnChan === void 0 ? false : _nextProps$warnOnChan;
    var valueToPerc = prevState.valueToPerc;
    var valueToStep = prevState.valueToStep;
    var pixelToStep = prevState.pixelToStep;
    var nextState = {};

    if (!valueToPerc || !valueToStep || !pixelToStep) {
      valueToPerc = new LinearScale();
      valueToStep = new DiscreteScale();
      pixelToStep = new DiscreteScale();
      nextState.valueToPerc = valueToPerc;
      nextState.valueToStep = valueToStep;
      nextState.pixelToStep = pixelToStep;
    }

    if (prevState.domain === defaultDomain || prevState.step === null || prevState.domain === null || prevState.reversed === null || step !== prevState.step || domain[0] !== prevState.domain[0] || domain[1] !== prevState.domain[1] || reversed !== prevState.reversed) {
      var _domain = _slicedToArray(domain, 2),
          min = _domain[0],
          max = _domain[1];

      valueToStep.setStep(step).setRange([min, max]).setDomain([min, max]);

      if (reversed === true) {
        valueToPerc.setDomain([min, max]).setRange([100, 0]);
        pixelToStep.setStep(step).setRange([max, min]);
      } else {
        valueToPerc.setDomain([min, max]).setRange([0, 100]);
        pixelToStep.setStep(step).setRange([min, max]);
      }

      warning__default['default'](max > min, "".concat(prfx, " Max must be greater than min (even if reversed). Max is ").concat(max, ". Min is ").concat(min, "."));

      var _getHandles = getHandles(values || prevState.values, reversed, valueToStep, warnOnChanges),
          handles = _getHandles.handles,
          changes = _getHandles.changes;

      if (changes || values === undefined || values === prevState.values) {
        onUpdate(handles.map(d => d.val));
        onChange(handles.map(d => d.val));
      }

      nextState.step = step;
      nextState.values = values;
      nextState.domain = domain === defaultDomain ? [...domain] : domain;
      nextState.handles = handles;
      nextState.reversed = reversed;
    } else if (!equal(values, prevState.values)) {
      var _getHandles2 = getHandles(values, reversed, valueToStep, warnOnChanges),
          _handles = _getHandles2.handles,
          _changes = _getHandles2.changes;

      if (_changes) {
        onUpdate(_handles.map(d => d.val));
        onChange(_handles.map(d => d.val));
      }

      nextState.values = values;
      nextState.handles = _handles;
    }

    if (Object.keys(nextState).length) {
      return nextState;
    }

    return null;
  }

  componentDidMount() {
    var pixelToStep = this.state.pixelToStep;
    var vertical = this.props.vertical; // @ts-ignore

    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical));
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners() {
    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    }
  }

  onStart(e, handleID, isTouch) {
    var handles = this.state.handles,
        _this$props$onSlideSt = this.props.onSlideStart,
        onSlideStart = _this$props$onSlideSt === void 0 ? noop : _this$props$onSlideSt;

    if (!isTouch) {
      e.preventDefault && e.preventDefault();
    }

    e.stopPropagation && e.stopPropagation();
    var found = handles.find(value => {
      return value.key === handleID;
    });

    if (found) {
      this.setState({
        activeHandleID: handleID
      });
      onSlideStart(handles.map(d => d.val), {
        activeHandleID: handleID
      });
      isTouch ? this.addTouchEvents() : this.addMouseEvents();
    } else {
      this.setState({
        activeHandleID: ''
      });
      this.handleRailAndTrackClicks(e, isTouch);
    }
  }

  handleRailAndTrackClicks(e, isTouch) {
    var _this$state6 = this.state,
        curr = _this$state6.handles,
        pixelToStep = _this$state6.pixelToStep,
        _this$props6 = this.props,
        vertical = _this$props6.vertical,
        _this$props6$reversed = _this$props6.reversed,
        reversed = _this$props6$reversed === void 0 ? false : _this$props6$reversed;
    var slider = this.slider; // double check the dimensions of the slider
    // @ts-ignore

    pixelToStep.setDomain(getSliderDomain(slider.current, vertical)); // find the closest value (aka step) to the event location

    var updateValue;

    if (isTouch) {
      // @ts-ignore
      updateValue = pixelToStep.getValue(getTouchPosition(vertical, e));
    } else {
      // @ts-ignore
      updateValue = pixelToStep.getValue(vertical ? e.clientY : e.pageX);
    } // find the closest handle key


    var updateKey = '';
    var minDiff = Infinity;

    for (var i = 0; i < curr.length; i++) {
      var _curr$i = curr[i],
          key = _curr$i.key,
          val = _curr$i.val;
      var diff = Math.abs(val - updateValue);

      if (diff < minDiff) {
        updateKey = key;
        minDiff = diff;
      }
    } // generate a "candidate" set of values - a suggestion of what to do


    var nextHandles = getUpdatedHandles(curr, updateKey, updateValue, reversed); // submit the candidate values

    this.setState({
      activeHandleID: updateKey
    }, () => {
      this.submitUpdate(nextHandles, true);
      isTouch ? this.addTouchEvents() : this.addMouseEvents();
    });
  }

  addMouseEvents() {
    if (isBrowser) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  addTouchEvents() {
    if (isBrowser) {
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
    }
  }

  submitUpdate(next) {
    var callOnChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var _this$props7 = this.props,
        _this$props7$mode = _this$props7.mode,
        mode = _this$props7$mode === void 0 ? 1 : _this$props7$mode,
        _this$props7$step = _this$props7.step,
        step = _this$props7$step === void 0 ? 0.1 : _this$props7$step,
        _this$props7$onUpdate = _this$props7.onUpdate,
        onUpdate = _this$props7$onUpdate === void 0 ? noop : _this$props7$onUpdate,
        _this$props7$onChange = _this$props7.onChange,
        onChange = _this$props7$onChange === void 0 ? noop : _this$props7$onChange,
        _this$props7$reversed = _this$props7.reversed,
        reversed = _this$props7$reversed === void 0 ? false : _this$props7$reversed; //@ts-ignore

    var getValue = this.state.valueToStep.getValue;
    this.setState((_ref2) => {
      var curr = _ref2.handles;
      var handles = []; // given the current handles and a candidate set, decide what to do

      if (typeof mode === 'function') {
        handles = mode(curr, next, step, reversed, getValue);
        warning__default['default'](Array.isArray(handles), 'Custom mode function did not return an array.');
      } else {
        switch (mode) {
          case 1:
            handles = mode1(curr, next);
            break;

          case 2:
            handles = mode2(curr, next);
            break;

          case 3:
            handles = mode3(curr, next, step, reversed, getValue);
            break;

          default:
            handles = next;
            warning__default['default'](false, "".concat(prfx, " Invalid mode value."));
        }
      }

      onUpdate(handles.map(d => d.val));

      if (callOnChange) {
        onChange(handles.map(d => d.val));
      }

      return {
        handles
      };
    });
  }

  render() {
    var _this$state7 = this.state,
        handles = _this$state7.handles,
        valueToPerc = _this$state7.valueToPerc,
        activeHandleID = _this$state7.activeHandleID,
        _this$props8 = this.props,
        className = _this$props8.className,
        _this$props8$rootStyl = _this$props8.rootStyle,
        rootStyle = _this$props8$rootStyl === void 0 ? {} : _this$props8$rootStyl,
        _this$props8$rootProp = _this$props8.rootProps,
        rootProps = _this$props8$rootProp === void 0 ? {} : _this$props8$rootProp,
        _this$props8$componen = _this$props8.component,
        Comp = _this$props8$componen === void 0 ? 'div' : _this$props8$componen,
        _this$props8$disabled = _this$props8.disabled,
        disabled = _this$props8$disabled === void 0 ? false : _this$props8$disabled,
        _this$props8$flatten = _this$props8.flatten,
        flatten = _this$props8$flatten === void 0 ? false : _this$props8$flatten;
    var mappedHandles = handles.map((_ref3) => {
      var key = _ref3.key,
          val = _ref3.val;
      // @ts-ignore
      return {
        id: key,
        value: val,
        percent: valueToPerc.getValue(val)
      };
    });
    var children = React__default['default'].Children.map(this.props.children, child => {
      if (isRCSComponent(child) === true) {
        return /*#__PURE__*/React__default['default'].cloneElement(child, {
          scale: valueToPerc,
          handles: mappedHandles,
          activeHandleID,
          getEventData: this.getEventData,
          emitKeyboard: disabled ? noop : this.onKeyDown,
          emitMouse: disabled ? noop : this.onMouseDown,
          emitTouch: disabled ? noop : this.onTouchStart
        });
      } else {
        return child;
      }
    });
    return flatten ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(Comp, _objectSpread2(_objectSpread2({}, rootProps), {}, {
      style: rootStyle,
      className: className,
      ref: this.slider
    })), children) : /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(Comp, _objectSpread2(_objectSpread2({}, rootProps), {}, {
      style: rootStyle,
      className: className,
      ref: this.slider
    }), children));
  }

}

exports.Handles = Handles;
exports.Rail = Rail;
exports.Slider = Slider;
exports.Ticks = Ticks;
exports.Tracks = Tracks;
exports.mode1 = mode1;
exports.mode2 = mode2;
exports.mode3 = mode3;
//# sourceMappingURL=rcs.cjs.development.js.map
