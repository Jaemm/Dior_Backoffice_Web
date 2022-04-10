'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = require('prop-types');
var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var clsx = _interopDefault(require('clsx'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var styles$1 = require('@material-ui/core/styles');
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var Toolbar = _interopDefault(require('@material-ui/core/Toolbar'));
var utils = require('@material-ui/core/utils');
var getThemeProps = _interopDefault(require('@material-ui/styles/getThemeProps'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var useMediaQuery = _interopDefault(require('@material-ui/core/useMediaQuery'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var InputAdornment = _interopDefault(require('@material-ui/core/InputAdornment'));
var rifm = require('rifm');
var Grow = _interopDefault(require('@material-ui/core/Grow'));
var Paper = _interopDefault(require('@material-ui/core/Paper'));
var Popper = _interopDefault(require('@material-ui/core/Popper'));
var TrapFocus = _interopDefault(require('@material-ui/core/Unstable_TrapFocus'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var ButtonBase = _interopDefault(require('@material-ui/core/ButtonBase'));
var reactTransitionGroup = require('react-transition-group');
var Fade = _interopDefault(require('@material-ui/core/Fade'));
var Tab = _interopDefault(require('@material-ui/core/Tab'));
var Tabs = _interopDefault(require('@material-ui/core/Tabs'));

var MuiPickersAdapterContext = React.createContext(null);

var LocalizationProvider = function LocalizationProvider(props) {
  var children = props.children,
      Utils = props.dateAdapter,
      dateFormats = props.dateFormats,
      dateLibInstance = props.dateLibInstance,
      locale = props.locale;
  var utils = React.useMemo(function () {
    return new Utils({
      locale: locale,
      formats: dateFormats,
      instance: dateLibInstance
    });
  }, [Utils, locale, dateFormats, dateLibInstance]);
  return /*#__PURE__*/React.createElement(MuiPickersAdapterContext.Provider, {
    value: utils
  }, children);
};

process.env.NODE_ENV !== "production" ? LocalizationProvider.propTypes = {
  dateAdapter: PropTypes.func.isRequired,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  /**
   * Your component tree.
   */
  children: PropTypes.node
} : void 0;

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils)
/* :asserts utils is MuiPickersAdapter */
{
  if (!utils) {
    throw new Error('Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.');
  }
}

function useUtils() {
  var utils = React.useContext(MuiPickersAdapterContext);
  checkUtils(utils);
  return utils;
}
function useNow() {
  var utils = useUtils();
  var now = React.useRef(utils.date());
  return now.current;
}

/**
 * @ignore - internal component.
 */

var PenIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), 'Pen');

/**
 * @ignore - internal component.
 */

var CalendarIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
}), 'Calendar');

var useStyles = styles$1.makeStyles(function (theme) {
  var toolbarBackground = theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background["default"];
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: toolbarBackground,
      color: theme.palette.getContrastText(toolbarBackground)
    },
    toolbarLandscape: {
      height: 'auto',
      maxWidth: 160,
      padding: 16,
      justifyContent: 'flex-start',
      flexWrap: 'wrap'
    },
    dateTitleContainer: {
      flex: 1
    }
  };
}, {
  name: 'MuiPickersToolbar'
});

function defaultGetKeyboardInputSwitchingButtonText(isKeyboardInputOpen) {
  return isKeyboardInputOpen ? 'text input view is open, go to calendar view' : 'calendar view is open, go to text input view';
}

var PickerToolbar = function PickerToolbar(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$getMobileKeyboar = _ref.getMobileKeyboardInputViewButtonText,
      getMobileKeyboardInputViewButtonText = _ref$getMobileKeyboar === void 0 ? defaultGetKeyboardInputSwitchingButtonText : _ref$getMobileKeyboar,
      isLandscape = _ref.isLandscape,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      _ref$landscapeDirecti = _ref.landscapeDirection,
      landscapeDirection = _ref$landscapeDirecti === void 0 ? 'column' : _ref$landscapeDirecti,
      penIconClassName = _ref.penIconClassName,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      toolbarTitle = _ref.toolbarTitle;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(Toolbar, {
    "data-mui-test": "picker-toolbar",
    className: clsx(classes.root, className, isLandscape && classes.toolbarLandscape)
  }, /*#__PURE__*/React.createElement(Typography, {
    "data-mui-test": "picker-toolbar-title",
    color: "inherit",
    variant: "overline"
  }, toolbarTitle), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    justifyContent: "space-between",
    className: classes.dateTitleContainer,
    direction: isLandscape ? landscapeDirection : 'row',
    alignItems: isLandscape ? 'flex-start' : 'flex-end'
  }, children, /*#__PURE__*/React.createElement(IconButton, {
    onClick: toggleMobileKeyboardView,
    className: penIconClassName,
    color: "inherit",
    "data-mui-test": "toggle-mobile-keyboard-view",
    "aria-label": getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen)
  }, isMobileKeyboardViewOpen ? /*#__PURE__*/React.createElement(CalendarIcon, {
    color: "inherit"
  }) : /*#__PURE__*/React.createElement(PenIcon, {
    color: "inherit"
  }))));
};

function useDefaultProps(props, _ref) {
  var name = _ref.name;
  var theme = styles$1.useTheme();
  return getThemeProps({
    props: props,
    theme: theme,
    name: name
  });
}
function withDefaultProps(componentConfig, Component) {
  var componentName = componentConfig.name.replace('Mui', '');

  var WithDefaultProps = function WithDefaultProps(props) {
    Component.displayName = componentName;
    var propsWithDefault = useDefaultProps(props, componentConfig);
    return /*#__PURE__*/React.createElement(Component, propsWithDefault);
  };

  WithDefaultProps.displayName = "WithDefaultProps(".concat(componentName, ")");
  return WithDefaultProps;
}

/* Use it instead of .includes method for IE support */
function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(function (item) {
      return array.indexOf(item) !== -1;
    });
  }

  return array.indexOf(itemOrItems) !== -1;
}
var onSpaceOrEnter = function onSpaceOrEnter(innerFn, onFocus) {
  return function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      innerFn(); // prevent any side effects

      event.preventDefault();
      event.stopPropagation();
    }

    if (onFocus) {
      onFocus(event);
    }
  };
};
/* Quick untyped helper to improve function composition readability */

var pipe = function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduceRight(function (prevFn, nextFn) {
    return function () {
      return nextFn(prevFn.apply(void 0, arguments));
    };
  }, function (value) {
    return value;
  });
};
var executeInTheNextEventLoopTick = function executeInTheNextEventLoopTick(fn) {
  setTimeout(fn, 0);
};
function createDelegatedEventHandler(fn, onEvent) {
  return function (event) {
    fn(event);

    if (onEvent) {
      onEvent(event);
    }
  };
}
function mergeRefs(refs) {
  return function (value) {
    refs.forEach(function (ref) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (_typeof(ref) === 'object' && ref != null) {
        // @ts-ignore .current is not a readonly, hold on ts
        ref.current = value;
      }
    });
  };
}

var findClosestEnabledDate = function findClosestEnabledDate(_ref) {
  var date = _ref.date,
      utils = _ref.utils,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      shouldDisableDate = _ref.shouldDisableDate;
  var today = utils.startOfDay(utils.date());

  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  var forward = date;
  var backward = date;

  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }

    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }

      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }

      backward = utils.addDays(backward, -1);
    }
  } // fallback to today if no enabled days


  return utils.date();
};
var isYearOnlyView = function isYearOnlyView(views) {
  return views.length === 1 && views[0] === 'year';
};
var isYearAndMonthViews = function isYearAndMonthViews(views) {
  return views.length === 2 && arrayIncludes(views, 'month') && arrayIncludes(views, 'year');
};
var getFormatAndMaskByViews = function getFormatAndMaskByViews(views, utils) {
  if (isYearOnlyView(views)) {
    return {
      mask: '____',
      inputFormat: utils.formats.year
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear
    };
  }

  return {
    mask: '__/__/____',
    inputFormat: utils.formats.keyboardDate
  };
};
function parsePickerInputValue(utils, _ref2) {
  var value = _ref2.value;
  var parsedValue = utils.date(value);
  return utils.isValid(parsedValue) ? parsedValue : null;
}
function parseRangeInputValue(utils, _ref3) {
  var _ref3$value = _ref3.value,
      value = _ref3$value === void 0 ? [null, null] : _ref3$value;
  return value.map(function (date) {
    return !utils.isValid(date) || date === null ? null : utils.startOfDay(utils.date(date));
  });
}
var isRangeValid = function isRangeValid(utils, range) {
  return Boolean(range && range[0] && range[1] && utils.isBefore(range[0], range[1]));
};
var isWithinRange = function isWithinRange(utils, day, range) {
  return isRangeValid(utils, range) && utils.isWithinRange(day, range);
};
var isStartOfRange = function isStartOfRange(utils, day, range) {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[0]);
};
var isEndOfRange = function isEndOfRange(utils, day, range) {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[1]);
};
var validateDate = function validateDate(utils, value, _ref4) {
  var minDate = _ref4.minDate,
      maxDate = _ref4.maxDate,
      disableFuture = _ref4.disableFuture,
      shouldDisableDate = _ref4.shouldDisableDate,
      disablePast = _ref4.disablePast;
  var now = utils.date();
  var date = utils.date(value);

  if (value === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(shouldDisableDate && shouldDisableDate(date)):
      return 'shouldDisableDate';

    case Boolean(disableFuture && utils.isAfterDay(date, now)):
      return 'disableFuture';

    case Boolean(disablePast && utils.isBeforeDay(date, now)):
      return 'disablePast';

    case Boolean(minDate && utils.isBeforeDay(date, minDate)):
      return 'minDate';

    case Boolean(maxDate && utils.isAfterDay(date, maxDate)):
      return 'maxDate';

    default:
      return null;
  }
};
var validateDateRange = function validateDateRange(utils, value, dateValidationProps) {
  var _value = _slicedToArray(value, 2),
      start = _value[0],
      end = _value[1]; // for partial input


  if (start === null || end === null) {
    return [null, null];
  }

  var dateValidations = [validateDate(utils, start, dateValidationProps), validateDate(utils, end, dateValidationProps)];

  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
  }

  if (!isRangeValid(utils, [utils.date(start), utils.date(end)])) {
    return ['invalidRange', 'invalidRange'];
  }

  return [null, null];
};

var muiPickersComponentConfig = {
  name: 'MuiPickersDatePickerToolbar'
};
var useStyles$1 = styles$1.makeStyles({
  root: {},
  dateTitleLandscape: {
    margin: 'auto 16px auto auto'
  },
  penIcon: {
    position: 'relative',
    top: 4
  }
}, muiPickersComponentConfig);
var DatePickerToolbar = withDefaultProps(muiPickersComponentConfig, function (_ref) {
  var date = _ref.date,
      views = _ref.views,
      isLandscape = _ref.isLandscape,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      toolbarFormat = _ref.toolbarFormat,
      onChange = _ref.onChange,
      _ref$toolbarPlacehold = _ref.toolbarPlaceholder,
      toolbarPlaceholder = _ref$toolbarPlacehold === void 0 ? '––' : _ref$toolbarPlacehold,
      _ref$toolbarTitle = _ref.toolbarTitle,
      toolbarTitle = _ref$toolbarTitle === void 0 ? 'SELECT DATE' : _ref$toolbarTitle,
      other = _objectWithoutProperties(_ref, ["date", "views", "isLandscape", "isMobileKeyboardViewOpen", "toggleMobileKeyboardView", "toolbarFormat", "onChange", "toolbarPlaceholder", "toolbarTitle"]);

  var utils = useUtils();
  var classes = useStyles$1();
  var dateText = React.useMemo(function () {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    if (isYearOnlyView(views)) {
      return utils.format(date, 'year');
    }

    if (isYearAndMonthViews(views)) {
      return utils.format(date, 'month');
    } // Little localization hack (Google is doing the same for android native pickers):
    // For english localization it is convenient to include weekday into the date "Mon, Jun 1"
    // For other locales using strings like "June 1", without weekday


    return /en/.test(utils.getCurrentLocaleCode()) ? utils.format(date, 'normalDateWithWeekday') : utils.format(date, 'normalDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils, views]);
  return /*#__PURE__*/React.createElement(PickerToolbar, _extends({
    className: classes.root,
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: isLandscape,
    penIconClassName: classes.penIcon
  }, other), /*#__PURE__*/React.createElement(Typography, {
    variant: "h4",
    "data-mui-test": "datepicker-toolbar-date",
    align: isLandscape ? 'left' : 'center',
    className: clsx(isLandscape && classes.dateTitleLandscape)
  }, dateText));
});

var DIALOG_WIDTH = 320;
var DIALOG_WIDTH_WIDER = 325;
var VIEW_HEIGHT = 358;
var DAY_SIZE = 36;
var DAY_MARGIN = 2;
var IS_TOUCH_DEVICE_MEDIA = '@media (pointer: fine)';

function getTextFieldAriaText(rawValue, utils) {
  return rawValue && utils.isValid(utils.date(rawValue)) ? "Choose date, selected date is ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Choose date';
}
var getDisplayDate = function getDisplayDate(utils, value, inputFormat) {
  var date = utils.date(value);
  var isEmpty = value === null;

  if (isEmpty) {
    return '';
  }

  return utils.isValid(date) ? utils.formatByString(date, inputFormat) : '';
};
function pick12hOr24hFormat(userFormat, ampm, formats) {
  if (userFormat) {
    return userFormat;
  }

  if (typeof ampm === 'undefined') {
    return formats.localized;
  }

  return ampm ? formats['12h'] : formats['24h'];
}
var MASK_USER_INPUT_SYMBOL = '_';
var staticDateWith2DigitTokens = new Date('2019-11-21T22:30:00.000');
var staticDateWith1DigitTokens = new Date('2019-01-01T09:00:00.000');
function checkMaskIsValidForCurrentFormat(mask, format, acceptRegex, utils) {
  var formattedDateWith1Digit = utils.formatByString(utils.date(staticDateWith1DigitTokens), format);
  var inferredFormatPatternWith1Digits = formattedDateWith1Digit.replace(acceptRegex, MASK_USER_INPUT_SYMBOL);
  var inferredFormatPatternWith2Digits = utils.formatByString(utils.date(staticDateWith2DigitTokens), format).replace(acceptRegex, '_');
  var isMaskValid = inferredFormatPatternWith2Digits === mask && inferredFormatPatternWith1Digits === mask; // @ts-ignore Ignore this warning for luxon because it is appearing mostly always (related to the formats structure of luxon itself)

  if (!isMaskValid && utils.lib !== 'luxon' && process.env.NODE_ENV !== 'production') {
    console.warn("The mask \"".concat(mask, "\" you passed is not valid for the format used ").concat(format, ". Falling down to uncontrolled not-masked input."));
  }

  return isMaskValid;
}
var maskedDateFormatter = function maskedDateFormatter(mask, acceptRegexp) {
  return function (value) {
    return value.split('').map(function (_char, i) {
      acceptRegexp.lastIndex = 0;

      if (i > mask.length - 1) {
        return '';
      }

      var maskChar = mask[i];
      var nextMaskChar = mask[i + 1];
      var acceptedChar = acceptRegexp.test(_char) ? _char : '';
      var formattedChar = maskChar === MASK_USER_INPUT_SYMBOL ? acceptedChar : maskChar + acceptedChar;

      if (i === value.length - 1 && nextMaskChar && nextMaskChar !== MASK_USER_INPUT_SYMBOL) {
        // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
        return formattedChar ? formattedChar + nextMaskChar : '';
      }

      return formattedChar;
    }).join('');
  };
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var PureDateInput = function PureDateInput(_ref) {
  var containerRef = _ref.containerRef,
      disabled = _ref.disabled,
      forwardedRef = _ref.forwardedRef,
      _ref$getOpenDialogAri = _ref.getOpenDialogAriaText,
      getOpenDialogAriaText = _ref$getOpenDialogAri === void 0 ? getTextFieldAriaText : _ref$getOpenDialogAri,
      inputFormat = _ref.inputFormat,
      InputProps = _ref.InputProps,
      label = _ref.label,
      onOpen = _ref.openPicker,
      rawValue = _ref.rawValue,
      renderInput = _ref.renderInput,
      _ref$TextFieldProps = _ref.TextFieldProps,
      TextFieldProps = _ref$TextFieldProps === void 0 ? {} : _ref$TextFieldProps,
      validationError = _ref.validationError;
  var utils = useUtils();
  var PureDateInputProps = React.useMemo(function () {
    return _objectSpread(_objectSpread({}, InputProps), {}, {
      readOnly: true
    });
  }, [InputProps]);
  var inputValue = getDisplayDate(utils, rawValue, inputFormat);
  return renderInput(_objectSpread({
    label: label,
    disabled: disabled,
    ref: containerRef,
    inputRef: forwardedRef,
    error: validationError,
    InputProps: PureDateInputProps,
    inputProps: {
      disabled: disabled,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: onSpaceOrEnter(onOpen)
    }
  }, TextFieldProps));
};
process.env.NODE_ENV !== "production" ? PureDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func
} : void 0;

// consider getting rid from wrapper variant
var WrapperVariantContext = React.createContext(null);
var IsStaticVariantContext = React.createContext(false);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var useStyles$2 = styles$1.makeStyles({
  dialogRoot: {
    minWidth: DIALOG_WIDTH
  },
  dialogRootWider: {
    minWidth: DIALOG_WIDTH_WIDER
  },
  dialogContainer: {
    '&:focus > $dialogRoot': {
      outline: 'auto',
      '@media (pointer:coarse)': {
        outline: 0
      }
    }
  },
  dialog: {
    '&:first-child': {
      padding: 0
    }
  },
  dialogAction: {// requested for overrides
  },
  withAdditionalAction: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/mui-org/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
    '& > *:first-child': {
      marginRight: 'auto'
    }
  }
}, {
  name: 'MuiPickersModalDialog'
});

var PickersModalDialog = function PickersModalDialog(props) {
  var _props$cancelText = props.cancelText,
      cancelText = _props$cancelText === void 0 ? 'Cancel' : _props$cancelText,
      children = props.children,
      MuiDialogClasses = props.classes,
      _props$clearable = props.clearable,
      clearable = _props$clearable === void 0 ? false : _props$clearable,
      _props$clearText = props.clearText,
      clearText = _props$clearText === void 0 ? 'Clear' : _props$clearText,
      _props$okText = props.okText,
      okText = _props$okText === void 0 ? 'OK' : _props$okText,
      onAccept = props.onAccept,
      onClear = props.onClear,
      onDismiss = props.onDismiss,
      onSetToday = props.onSetToday,
      showTabs = props.showTabs,
      _props$showTodayButto = props.showTodayButton,
      showTodayButton = _props$showTodayButto === void 0 ? false : _props$showTodayButto,
      _props$todayText = props.todayText,
      todayText = _props$todayText === void 0 ? 'Today' : _props$todayText,
      wider = props.wider,
      other = _objectWithoutProperties(props, ["cancelText", "children", "classes", "clearable", "clearText", "okText", "onAccept", "onClear", "onDismiss", "onSetToday", "showTabs", "showTodayButton", "todayText", "wider"]);

  var classes = useStyles$2();
  return /*#__PURE__*/React.createElement(Dialog, _extends({
    onClose: onDismiss,
    classes: _objectSpread$1({
      container: classes.dialogContainer,
      paper: clsx(classes.dialogRoot, wider && classes.dialogRootWider)
    }, MuiDialogClasses)
  }, other), /*#__PURE__*/React.createElement(DialogContent, {
    className: classes.dialog
  }, children), /*#__PURE__*/React.createElement(DialogActions, {
    className: clsx(classes.dialogAction, (clearable || showTodayButton) && classes.withAdditionalAction)
  }, clearable && /*#__PURE__*/React.createElement(Button, {
    "data-mui-test": "clear-action-button",
    color: "primary",
    onClick: onClear
  }, clearText), showTodayButton && /*#__PURE__*/React.createElement(Button, {
    "data-mui-test": "today-action-button",
    color: "primary",
    onClick: onSetToday
  }, todayText), cancelText && /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: onDismiss
  }, cancelText), okText && /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: onAccept
  }, okText)));
};

var MobileWrapper = function MobileWrapper(props) {
  var cancelText = props.cancelText,
      children = props.children,
      clearable = props.clearable,
      clearText = props.clearText,
      DateInputProps = props.DateInputProps,
      DialogProps = props.DialogProps,
      displayStaticWrapperAs = props.displayStaticWrapperAs,
      KeyboardDateInputComponent = props.KeyboardDateInputComponent,
      okText = props.okText,
      onAccept = props.onAccept,
      onClear = props.onClear,
      onDismiss = props.onDismiss,
      onSetToday = props.onSetToday,
      open = props.open,
      PopperProps = props.PopperProps,
      _props$PureDateInputC = props.PureDateInputComponent,
      PureDateInputComponent = _props$PureDateInputC === void 0 ? PureDateInput : _props$PureDateInputC,
      showTabs = props.showTabs,
      showTodayButton = props.showTodayButton,
      todayText = props.todayText,
      wider = props.wider,
      other = _objectWithoutProperties(props, ["cancelText", "children", "clearable", "clearText", "DateInputProps", "DialogProps", "displayStaticWrapperAs", "KeyboardDateInputComponent", "okText", "onAccept", "onClear", "onDismiss", "onSetToday", "open", "PopperProps", "PureDateInputComponent", "showTabs", "showTodayButton", "todayText", "wider"]);

  return /*#__PURE__*/React.createElement(WrapperVariantContext.Provider, {
    value: "mobile"
  }, /*#__PURE__*/React.createElement(PureDateInputComponent, _extends({}, other, DateInputProps)), /*#__PURE__*/React.createElement(PickersModalDialog, _extends({
    wider: wider,
    showTabs: showTabs,
    open: open,
    onClear: onClear,
    onAccept: onAccept,
    onDismiss: onDismiss,
    onSetToday: onSetToday,
    clearText: clearText,
    todayText: todayText,
    okText: okText,
    cancelText: cancelText,
    clearable: clearable,
    showTodayButton: showTodayButton,
    "data-mui-test": "mobile-wrapper-dialog"
  }, DialogProps), children));
};
process.env.NODE_ENV !== "production" ? MobileWrapper.propTypes = {
  cancelText: PropTypes.node,
  clearable: PropTypes.bool,
  clearText: PropTypes.node,
  DialogProps: PropTypes.object,
  okText: PropTypes.node,
  showTodayButton: PropTypes.bool,
  todayText: PropTypes.node
} : void 0;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useMaskedInput(_ref) {
  var _ref$acceptRegex = _ref.acceptRegex,
      acceptRegex = _ref$acceptRegex === void 0 ? /[\d]/gi : _ref$acceptRegex,
      disabled = _ref.disabled,
      disableMaskedInput = _ref.disableMaskedInput,
      ignoreInvalidInputs = _ref.ignoreInvalidInputs,
      inputFormat = _ref.inputFormat,
      inputProps = _ref.inputProps,
      label = _ref.label,
      mask = _ref.mask,
      onChange = _ref.onChange,
      rawValue = _ref.rawValue,
      readOnly = _ref.readOnly,
      rifmFormatter = _ref.rifmFormatter,
      TextFieldProps = _ref.TextFieldProps,
      validationError = _ref.validationError;
  var utils = useUtils();
  var isFocusedRef = React.useRef(false);
  var getInputValue = React.useCallback(function () {
    return getDisplayDate(utils, rawValue, inputFormat);
  }, [inputFormat, rawValue, utils]);
  var formatHelperText = utils.getFormatHelperText(inputFormat);

  var _React$useState = React.useState(getInputValue()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      innerInputValue = _React$useState2[0],
      setInnerInputValue = _React$useState2[1];

  var shouldUseMaskedInput = React.useMemo(function () {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  var formatter = React.useMemo(function () {
    return shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : function (st) {
      return st;
    };
  }, [acceptRegex, mask, shouldUseMaskedInput]);
  React.useEffect(function () {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [utils, getInputValue, rawValue]);

  var handleChange = function handleChange(text) {
    var finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);
    var date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  var rifmProps = rifm.useRifm({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  var inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerInputValue,
    onChange: function onChange(event) {
      handleChange(event.currentTarget.value);
    }
  };
  return _objectSpread$2({
    label: label,
    disabled: disabled,
    error: validationError,
    helperText: formatHelperText,
    inputProps: _objectSpread$2(_objectSpread$2(_objectSpread$2({}, inputStateArgs), {}, {
      disabled: disabled,
      // make spreading in custom input easier
      placeholder: formatHelperText,
      readOnly: readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps), {}, {
      onFocus: createDelegatedEventHandler(function () {
        isFocusedRef.current = true;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onFocus),
      onBlur: createDelegatedEventHandler(function () {
        isFocusedRef.current = false;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onBlur)
    })
  }, TextFieldProps);
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var KeyboardDateInput = function KeyboardDateInput(_ref) {
  var containerRef = _ref.containerRef,
      _ref$inputRef = _ref.inputRef,
      inputRef = _ref$inputRef === void 0 ? null : _ref$inputRef,
      _ref$forwardedRef = _ref.forwardedRef,
      forwardedRef = _ref$forwardedRef === void 0 ? null : _ref$forwardedRef,
      hideOpenPickerButton = _ref.disableOpenPicker,
      _ref$getOpenDialogAri = _ref.getOpenDialogAriaText,
      getOpenDialogAriaText = _ref$getOpenDialogAri === void 0 ? getTextFieldAriaText : _ref$getOpenDialogAri,
      InputAdornmentProps = _ref.InputAdornmentProps,
      InputProps = _ref.InputProps,
      onOpen = _ref.openPicker,
      OpenPickerButtonProps = _ref.OpenPickerButtonProps,
      _ref$openPickerIcon = _ref.openPickerIcon,
      openPickerIcon = _ref$openPickerIcon === void 0 ? /*#__PURE__*/React.createElement(CalendarIcon, null) : _ref$openPickerIcon,
      renderInput = _ref.renderInput,
      other = _objectWithoutProperties(_ref, ["containerRef", "inputRef", "forwardedRef", "disableOpenPicker", "getOpenDialogAriaText", "InputAdornmentProps", "InputProps", "openPicker", "OpenPickerButtonProps", "openPickerIcon", "renderInput"]);

  var utils$1 = useUtils();
  var inputRefHandle = utils.useForkRef(inputRef, forwardedRef);
  var textFieldProps = useMaskedInput(other);
  var adornmentPosition = (InputAdornmentProps === null || InputAdornmentProps === void 0 ? void 0 : InputAdornmentProps.position) || 'end';
  return renderInput(_objectSpread$3(_objectSpread$3({
    ref: containerRef,
    inputRef: inputRefHandle
  }, textFieldProps), {}, {
    InputProps: _objectSpread$3(_objectSpread$3({}, InputProps), {}, _defineProperty({}, "".concat(adornmentPosition, "Adornment"), hideOpenPickerButton ? undefined : /*#__PURE__*/React.createElement(InputAdornment, _extends({
      position: adornmentPosition
    }, InputAdornmentProps), /*#__PURE__*/React.createElement(IconButton, _extends({
      edge: adornmentPosition,
      "data-mui-test": "open-picker-from-keyboard",
      disabled: other.disabled,
      "aria-label": getOpenDialogAriaText(other.rawValue, utils$1)
    }, OpenPickerButtonProps, {
      onClick: onOpen
    }), openPickerIcon))))
  }));
};
process.env.NODE_ENV !== "production" ? KeyboardDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func
} : void 0;

var useIsomorphicEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
function runKeyHandler(event, keyHandlers) {
  var handler = keyHandlers[event.keyCode];

  if (handler) {
    handler(); // if event was handled prevent other side effects (e.g. page scroll)

    event.preventDefault();
  }
}
function useGlobalKeyDown(active, keyHandlers) {
  var keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  useIsomorphicEffect(function () {
    if (active) {
      var handleKeyDown = function handleKeyDown(event) {
        runKeyHandler(event, keyHandlersRef.current);
      };

      window.addEventListener('keydown', handleKeyDown);
      return function () {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }

    return undefined;
  }, [active]);
}
var keycode = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Enter: 13,
  Home: 36,
  End: 35,
  PageUp: 33,
  PageDown: 34,
  Esc: 27
};

var useStyles$3 = styles$1.makeStyles(function (theme) {
  return {
    root: {
      zIndex: theme.zIndex.modal
    },
    paper: {
      transformOrigin: 'top center',
      '&:focus': _defineProperty({}, IS_TOUCH_DEVICE_MEDIA, {
        outline: 0
      })
    },
    topTransition: {
      transformOrigin: 'bottom center'
    }
  };
}, {
  name: 'MuiPickersPopper'
});
var PickersPopper = function PickersPopper(props) {
  var anchorEl = props.anchorEl,
      children = props.children,
      _props$innerRef = props.innerRef,
      innerRef = _props$innerRef === void 0 ? null : _props$innerRef,
      onClose = props.onClose,
      onOpen = props.onOpen,
      open = props.open,
      PopperProps = props.PopperProps,
      role = props.role,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TrapFocusProps = props.TrapFocusProps;
  var classes = useStyles$3();
  var paperRef = React.useRef(null);
  var handlePopperRef = utils.useForkRef(paperRef, innerRef);
  var lastFocusedElementRef = React.useRef(null);
  var popperOptions = React.useMemo(function () {
    return {
      onCreate: onOpen
    };
  }, [onOpen]);
  useGlobalKeyDown(open, _defineProperty({}, keycode.Esc, onClose));
  React.useEffect(function () {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = document.activeElement;
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      lastFocusedElementRef.current.focus();
    }
  }, [open, role]);

  var handleBlur = function handleBlur() {
    if (!open) {
      return;
    } // document.activeElement is updating on the next tick after `blur` called


    executeInTheNextEventLoopTick(function () {
      var _paperRef$current;

      if ((_paperRef$current = paperRef.current) === null || _paperRef$current === void 0 ? void 0 : _paperRef$current.contains(document.activeElement)) {
        return;
      }

      onClose();
    });
  };

  return /*#__PURE__*/React.createElement(Popper, _extends({
    transition: true,
    role: role,
    open: open,
    anchorEl: anchorEl,
    className: clsx(classes.root, PopperProps === null || PopperProps === void 0 ? void 0 : PopperProps.className),
    popperOptions: popperOptions
  }, PopperProps), function (_ref) {
    var TransitionProps = _ref.TransitionProps,
        placement = _ref.placement;
    return /*#__PURE__*/React.createElement(TrapFocus, _extends({
      open: open,
      disableAutoFocus: true,
      disableEnforceFocus: role === 'tooltip',
      isEnabled: function isEnabled() {
        return true;
      },
      getDoc: function getDoc() {
        var _paperRef$current$own, _paperRef$current2;

        return (_paperRef$current$own = (_paperRef$current2 = paperRef.current) === null || _paperRef$current2 === void 0 ? void 0 : _paperRef$current2.ownerDocument) !== null && _paperRef$current$own !== void 0 ? _paperRef$current$own : document;
      }
    }, TrapFocusProps), /*#__PURE__*/React.createElement(TransitionComponent, TransitionProps, /*#__PURE__*/React.createElement(Paper, {
      tabIndex: -1,
      elevation: 8,
      ref: handlePopperRef,
      className: clsx(classes.paper, placement === 'top' && classes.topTransition),
      onBlur: handleBlur
    }, children)));
  });
};

var CanAutoFocusContext = React.createContext(true);
var useCanAutoFocus = function useCanAutoFocus() {
  return React.useContext(CanAutoFocusContext);
};
function useAutoFocusControl(open) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      canAutoFocus = _React$useState2[0],
      setCanAutoFocus = _React$useState2[1];

  React.useEffect(function () {
    if (!open) {
      setCanAutoFocus(false);
    }
  }, [open]);
  return {
    canAutoFocus: canAutoFocus,
    onOpen: React.useCallback(function () {
      return setCanAutoFocus(true);
    }, [])
  };
}

var DesktopWrapper = function DesktopWrapper(props) {
  var children = props.children,
      DateInputProps = props.DateInputProps,
      _props$KeyboardDateIn = props.KeyboardDateInputComponent,
      KeyboardDateInputComponent = _props$KeyboardDateIn === void 0 ? KeyboardDateInput : _props$KeyboardDateIn,
      onDismiss = props.onDismiss,
      open = props.open,
      PopperProps = props.PopperProps,
      TransitionComponent = props.TransitionComponent;
  var inputRef = React.useRef(null);

  var _useAutoFocusControl = useAutoFocusControl(open),
      canAutoFocus = _useAutoFocusControl.canAutoFocus,
      onOpen = _useAutoFocusControl.onOpen;

  return /*#__PURE__*/React.createElement(WrapperVariantContext.Provider, {
    value: "desktop"
  }, /*#__PURE__*/React.createElement(CanAutoFocusContext.Provider, {
    value: canAutoFocus
  }, /*#__PURE__*/React.createElement(KeyboardDateInputComponent, _extends({}, DateInputProps, {
    inputRef: inputRef
  })), /*#__PURE__*/React.createElement(PickersPopper, {
    role: "dialog",
    open: open,
    anchorEl: inputRef.current,
    TransitionComponent: TransitionComponent,
    PopperProps: PopperProps,
    onClose: onDismiss,
    onOpen: onOpen
  }, children)));
};
process.env.NODE_ENV !== "production" ? DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func
} : void 0;

var DesktopTooltipWrapper = function DesktopTooltipWrapper(props) {
  var open = props.open,
      children = props.children,
      PopperProps = props.PopperProps,
      onDismiss = props.onDismiss,
      DateInputProps = props.DateInputProps,
      TransitionComponent = props.TransitionComponent,
      _props$KeyboardDateIn = props.KeyboardDateInputComponent,
      KeyboardDateInputComponent = _props$KeyboardDateIn === void 0 ? KeyboardDateInput : _props$KeyboardDateIn;
  var inputRef = React.useRef(null);
  var popperRef = React.useRef(null);

  var _useAutoFocusControl = useAutoFocusControl(open),
      canAutoFocus = _useAutoFocusControl.canAutoFocus,
      onOpen = _useAutoFocusControl.onOpen;

  var handleBlur = function handleBlur() {
    executeInTheNextEventLoopTick(function () {
      var _inputRef$current, _popperRef$current;

      if (((_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.contains(document.activeElement)) || ((_popperRef$current = popperRef.current) === null || _popperRef$current === void 0 ? void 0 : _popperRef$current.contains(document.activeElement))) {
        return;
      }

      onDismiss();
    });
  };

  return /*#__PURE__*/React.createElement(WrapperVariantContext.Provider, {
    value: "desktop"
  }, /*#__PURE__*/React.createElement(CanAutoFocusContext.Provider, {
    value: canAutoFocus
  }, /*#__PURE__*/React.createElement(KeyboardDateInputComponent, _extends({}, DateInputProps, {
    containerRef: inputRef,
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement(PickersPopper, {
    role: "tooltip",
    open: open,
    innerRef: popperRef,
    anchorEl: inputRef.current,
    TransitionComponent: TransitionComponent,
    PopperProps: PopperProps,
    onBlur: handleBlur,
    onClose: onDismiss,
    onOpen: onOpen
  }, children)));
};

var makeResponsiveWrapper = function makeResponsiveWrapper(DesktopWrapperComponent, MobileWrapperComponent) {
  var ResponsiveWrapper = function ResponsiveWrapper(_ref) {
    var cancelText = _ref.cancelText,
        clearable = _ref.clearable,
        clearText = _ref.clearText,
        _ref$desktopModeMedia = _ref.desktopModeMediaQuery,
        desktopModeMediaQuery = _ref$desktopModeMedia === void 0 ? IS_TOUCH_DEVICE_MEDIA : _ref$desktopModeMedia,
        DialogProps = _ref.DialogProps,
        displayStaticWrapperAs = _ref.displayStaticWrapperAs,
        okText = _ref.okText,
        PopperProps = _ref.PopperProps,
        showTodayButton = _ref.showTodayButton,
        todayText = _ref.todayText,
        TransitionComponent = _ref.TransitionComponent,
        other = _objectWithoutProperties(_ref, ["cancelText", "clearable", "clearText", "desktopModeMediaQuery", "DialogProps", "displayStaticWrapperAs", "okText", "PopperProps", "showTodayButton", "todayText", "TransitionComponent"]);

    var isDesktop = useMediaQuery(desktopModeMediaQuery);
    return isDesktop ? /*#__PURE__*/React.createElement(DesktopWrapperComponent, _extends({
      PopperProps: PopperProps,
      TransitionComponent: TransitionComponent
    }, other)) : /*#__PURE__*/React.createElement(MobileWrapperComponent, _extends({
      okText: okText,
      cancelText: cancelText,
      clearText: clearText,
      todayText: todayText,
      showTodayButton: showTodayButton,
      clearable: clearable,
      DialogProps: DialogProps
    }, other));
  };

  return ResponsiveWrapper;
};
var ResponsiveWrapper = makeResponsiveWrapper(DesktopWrapper, MobileWrapper);
var ResponsiveTooltipWrapper = makeResponsiveWrapper(DesktopTooltipWrapper, MobileWrapper);

function useParsedDate(possiblyUnparsedValue) {
  var utils = useUtils();
  return React.useMemo(function () {
    return typeof possiblyUnparsedValue === 'undefined' ? undefined : utils.date(possiblyUnparsedValue);
  }, [possiblyUnparsedValue, utils]);
}
function useNextMonthDisabled(month, _ref) {
  var disableFuture = _ref.disableFuture,
      maxDate = _ref.maxDate;
  var utils = useUtils();
  return React.useMemo(function () {
    var now = utils.date();
    var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}
function usePreviousMonthDisabled(month, _ref2) {
  var disablePast = _ref2.disablePast,
      minDate = _ref2.minDate;
  var utils = useUtils();
  return React.useMemo(function () {
    var now = utils.date();
    var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}

var useStyles$4 = styles$1.makeStyles(function (theme) {
  return {
    root: {
      overflow: 'hidden',
      minWidth: DIALOG_WIDTH,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper
    }
  };
}, {
  name: 'MuiPickersStaticWrapper'
});
var StaticWrapper = function StaticWrapper(props) {
  var _props$displayStaticW = props.displayStaticWrapperAs,
      displayStaticWrapperAs = _props$displayStaticW === void 0 ? 'static' : _props$displayStaticW,
      children = props.children;
  var classes = useStyles$4();
  var isStatic = true;
  return /*#__PURE__*/React.createElement(IsStaticVariantContext.Provider, {
    value: isStatic
  }, /*#__PURE__*/React.createElement(WrapperVariantContext.Provider, {
    value: displayStaticWrapperAs
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, children)));
};

var defaultIsSameError = function defaultIsSameError(a, b) {
  return a === b;
};

function makeValidationHook(validateFn) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      defaultValidationError = _ref.defaultValidationError,
      _ref$isSameError = _ref.isSameError,
      isSameError = _ref$isSameError === void 0 ? defaultIsSameError : _ref$isSameError;

  return function (value, props) {
    var utils = useUtils();
    var previousValidationErrorRef = React.useRef(defaultValidationError || null);
    var validationError = validateFn(utils, value, props);
    React.useEffect(function () {
      if (props.onError && !isSameError(validationError, previousValidationErrorRef.current)) {
        props.onError(validationError, value);
      }

      previousValidationErrorRef.current = validationError;
    }, [previousValidationErrorRef, props, validationError, value]);
    return validationError;
  };
}

var date = PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]);
var datePickerView = PropTypes.oneOf(['year', 'month', 'day']);
var defaultMinDate = new Date('1900-01-01');
var defaultMaxDate = new Date('2099-12-31');

function useViews(_ref) {
  var views = _ref.views,
      openTo = _ref.openTo,
      onChange = _ref.onChange,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView;

  var _React$useState = React.useState(openTo && arrayIncludes(views, openTo) ? openTo : views[0]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      openView = _React$useState2[0],
      setOpenView = _React$useState2[1];

  var setOpenViewEnhanced = React.useCallback(function () {
    if (isMobileKeyboardViewOpen) {
      toggleMobileKeyboardView();
    }

    setOpenView.apply(void 0, arguments);
  }, [isMobileKeyboardViewOpen, toggleMobileKeyboardView]);
  var previousView = views[views.indexOf(openView) - 1];
  var nextView = views[views.indexOf(openView) + 1];
  var openNext = React.useCallback(function () {
    if (nextView) {
      setOpenViewEnhanced(nextView);
    }
  }, [nextView, setOpenViewEnhanced]);
  var handleChangeAndOpenNext = React.useCallback(function (date, currentViewSelectionState) {
    var isSelectionFinishedOnCurrentView = currentViewSelectionState === 'finish';
    var globalSelectionState = isSelectionFinishedOnCurrentView && Boolean(nextView) ? 'partial' : currentViewSelectionState;
    onChange(date, globalSelectionState);

    if (isSelectionFinishedOnCurrentView) {
      openNext();
    }
  }, [nextView, onChange, openNext]);
  return {
    nextView: nextView,
    previousView: previousView,
    openNext: openNext,
    handleChangeAndOpenNext: handleChangeAndOpenNext,
    openView: openView,
    setOpenView: setOpenViewEnhanced
  };
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var styles = function styles(theme) {
  return styles$1.createStyles({
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height'])
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: "14px solid ".concat(theme.palette.primary.main),
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  });
};

var ClockPointer = /*#__PURE__*/function (_React$Component) {
  _inherits(ClockPointer, _React$Component);

  var _super = _createSuper(ClockPointer);

  function ClockPointer() {
    var _this;

    _classCallCheck(this, ClockPointer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      toAnimateTransform: false,
      // eslint-disable-next-line react/no-unused-state
      previousType: undefined
    };

    _this.getAngleStyle = function () {
      var _this$props = _this.props,
          value = _this$props.value,
          isInner = _this$props.isInner,
          type = _this$props.type;
      var max = type === 'hours' ? 12 : 60;
      var angle = 360 / max * value;

      if (type === 'hours' && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: isInner ? '26%' : '40%',
        transform: "rotateZ(".concat(angle, "deg)")
      };
    };

    return _this;
  }

  _createClass(ClockPointer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          hasSelected = _this$props2.hasSelected,
          isInner = _this$props2.isInner,
          type = _this$props2.type,
          value = _this$props2.value,
          other = _objectWithoutProperties(_this$props2, ["classes", "hasSelected", "isInner", "type", "value"]);

      return /*#__PURE__*/React.createElement("div", _extends({}, other, {
        style: this.getAngleStyle(),
        className: clsx(classes.pointer, this.state.toAnimateTransform && classes.animateTransform)
      }), /*#__PURE__*/React.createElement("div", {
        className: clsx(classes.thumb, hasSelected && classes.noPoint)
      }));
    }
  }]);

  return ClockPointer;
}(React.Component);

ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
  if (nextProps.type !== state.previousType) {
    return {
      toAnimateTransform: true,
      previousType: nextProps.type
    };
  }

  return {
    toAnimateTransform: false,
    previousType: nextProps.type
  };
};

var ClockPointer$1 = styles$1.withStyles(styles, {
  name: 'MuiPickersClockPointer'
})(ClockPointer);

var getMeridiem = function getMeridiem(date, utils) {
  if (!date) {
    return null;
  }

  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};
var convertValueToMeridiem = function convertValueToMeridiem(value, meridiem, ampm) {
  if (ampm) {
    var currentMeridiem = value >= 12 ? 'pm' : 'am';

    if (currentMeridiem !== meridiem) {
      return meridiem === 'am' ? value - 12 : value + 12;
    }
  }

  return value;
};
var convertToMeridiem = function convertToMeridiem(time, meridiem, ampm, utils) {
  var newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};
var clockCenter = {
  x: 260 / 2,
  y: 260 / 2
};
var baseClockPoint = {
  x: clockCenter.x,
  y: 0
};
var cx = baseClockPoint.x - clockCenter.x;
var cy = baseClockPoint.y - clockCenter.y;

var rad2deg = function rad2deg(rad) {
  return rad * 57.29577951308232;
};

var getAngleValue = function getAngleValue(step, offsetX, offsetY) {
  var x = offsetX - clockCenter.x;
  var y = offsetY - clockCenter.y;
  var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
  var deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;
  var value = Math.floor(deg / step) || 0;
  var delta = Math.pow(x, 2) + Math.pow(y, 2);
  var distance = Math.sqrt(delta);
  return {
    value: value,
    distance: distance
  };
};

var getMinutes = function getMinutes(offsetX, offsetY) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var angleStep = step * 6;

  var _getAngleValue = getAngleValue(angleStep, offsetX, offsetY),
      value = _getAngleValue.value;

  value = value * step % 60;
  return value;
};
var getHours = function getHours(offsetX, offsetY, ampm) {
  var _getAngleValue2 = getAngleValue(30, offsetX, offsetY),
      value = _getAngleValue2.value,
      distance = _getAngleValue2.distance;

  var hour = value || 12;

  if (!ampm) {
    if (distance < 90) {
      hour += 12;
      hour %= 24;
    }
  } else {
    hour %= 12;
  }

  return hour;
};
function getSecondsInDay(date, utils) {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
}
var createIsAfterIgnoreDatePart = function createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, utils) {
  return function (dateLeft, dateRight) {
    if (disableIgnoringDatePartForTimeValidation) {
      return utils.isAfter(dateLeft, dateRight);
    }

    return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
  };
};
var validateTime = function validateTime(utils, value, _ref) {
  var minTime = _ref.minTime,
      maxTime = _ref.maxTime,
      shouldDisableTime = _ref.shouldDisableTime,
      disableIgnoringDatePartForTimeValidation = _ref.disableIgnoringDatePartForTimeValidation;
  var date = utils.date(value);
  var isAfterComparingFn = createIsAfterIgnoreDatePart(Boolean(disableIgnoringDatePartForTimeValidation), utils);

  if (value === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(minTime && isAfterComparingFn(minTime, date)):
      return 'minTime';

    case Boolean(maxTime && isAfterComparingFn(date, maxTime)):
      return 'maxTime';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getHours(date), 'hours')):
      return 'shouldDisableTime-hours';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getMinutes(date), 'minutes')):
      return 'shouldDisableTime-minutes';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getSeconds(date), 'seconds')):
      return 'shouldDisableTime-seconds';

    default:
      return null;
  }
};

var muiComponentConfig = {
  name: 'MuiPickersClock'
};
var useStyles$5 = styles$1.makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      minHeight: VIEW_HEIGHT,
      alignItems: 'center'
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none'
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move'
      }
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    amButton: {
      zIndex: 1,
      left: 8,
      position: 'absolute',
      bottom: 8
    },
    pmButton: {
      zIndex: 1,
      position: 'absolute',
      bottom: 8,
      right: 8
    },
    meridiemButtonSelected: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light
      }
    }
  };
}, muiComponentConfig);
function Clock(props) {
  var _useGlobalKeyDown;

  var _useDefaultProps = useDefaultProps(props, muiComponentConfig),
      allowKeyboardControl = _useDefaultProps.allowKeyboardControl,
      ampm = _useDefaultProps.ampm,
      _useDefaultProps$ampm = _useDefaultProps.ampmInClock,
      ampmInClock = _useDefaultProps$ampm === void 0 ? false : _useDefaultProps$ampm,
      numbersElementsArray = _useDefaultProps.children,
      date = _useDefaultProps.date,
      handleMeridiemChange = _useDefaultProps.handleMeridiemChange,
      isTimeDisabled = _useDefaultProps.isTimeDisabled,
      meridiemMode = _useDefaultProps.meridiemMode,
      _useDefaultProps$minu = _useDefaultProps.minutesStep,
      minutesStep = _useDefaultProps$minu === void 0 ? 1 : _useDefaultProps$minu,
      onChange = _useDefaultProps.onChange,
      type = _useDefaultProps.type,
      value = _useDefaultProps.value;

  var utils = useUtils();
  var classes = useStyles$5();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var isMoving = React.useRef(false);
  var isSelectedTimeDisabled = isTimeDisabled(value, type);
  var isPointerInner = !ampm && type === 'hours' && (value < 1 || value > 12);

  var handleValueChange = function handleValueChange(newValue, isFinish) {
    if (isTimeDisabled(newValue, type)) {
      return;
    }

    onChange(newValue, isFinish);
  };

  var setTime = function setTime(e, isFinish) {
    var offsetX = e.offsetX,
        offsetY = e.offsetY;

    if (typeof offsetX === 'undefined') {
      var rect = e.target.getBoundingClientRect();
      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    var value = type === 'seconds' || type === 'minutes' ? getMinutes(offsetX, offsetY, minutesStep) : getHours(offsetX, offsetY, Boolean(ampm));
    handleValueChange(value, isFinish);
  };

  var handleTouchMove = function handleTouchMove(e) {
    isMoving.current = true;
    setTime(e, 'shallow');
  };

  var handleTouchEnd = function handleTouchEnd(e) {
    if (isMoving.current) {
      setTime(e, 'finish');
      isMoving.current = false;
    }
  };

  var handleMouseMove = function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation(); // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari

    var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

    if (isButtonPressed) {
      setTime(e.nativeEvent, 'shallow');
    }
  };

  var handleMouseUp = function handleMouseUp(e) {
    if (isMoving.current) {
      isMoving.current = false;
    }

    setTime(e.nativeEvent, 'finish');
  };

  var hasSelected = React.useMemo(function () {
    if (type === 'hours') {
      return true;
    }

    return value % 5 === 0;
  }, [type, value]);
  var keyboardControlStep = type === 'minutes' ? minutesStep : 1;
  useGlobalKeyDown(Boolean(allowKeyboardControl !== null && allowKeyboardControl !== void 0 ? allowKeyboardControl : wrapperVariant !== 'static') && !isMoving.current, (_useGlobalKeyDown = {}, _defineProperty(_useGlobalKeyDown, keycode.Home, function () {
    return handleValueChange(0, 'partial');
  }), _defineProperty(_useGlobalKeyDown, keycode.End, function () {
    return handleValueChange(type === 'minutes' ? 59 : 23, 'partial');
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowUp, function () {
    return handleValueChange(value + keyboardControlStep, 'partial');
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowDown, function () {
    return handleValueChange(value - keyboardControlStep, 'partial');
  }), _useGlobalKeyDown));
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.clock
  }, /*#__PURE__*/React.createElement("div", {
    role: "menu",
    tabIndex: -1,
    className: classes.squareMask,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove
  }), !isSelectedTimeDisabled && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classes.pin
  }), date && /*#__PURE__*/React.createElement(ClockPointer$1, {
    type: type,
    value: value,
    isInner: isPointerInner,
    hasSelected: hasSelected,
    "aria-live": "polite",
    "aria-label": "Selected time ".concat(utils.format(date, 'fullTime'))
  })), numbersElementsArray), ampm && (wrapperVariant === 'desktop' || ampmInClock) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    "data-mui-test": "in-clock-am-btn",
    onClick: function onClick() {
      return handleMeridiemChange('am');
    },
    disabled: meridiemMode === null,
    className: clsx(classes.amButton, meridiemMode === 'am' && classes.meridiemButtonSelected)
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, "AM")), /*#__PURE__*/React.createElement(IconButton, {
    disabled: meridiemMode === null,
    "data-mui-test": "in-clock-pm-btn",
    onClick: function onClick() {
      return handleMeridiemChange('pm');
    },
    className: clsx(classes.pmButton, meridiemMode === 'pm' && classes.meridiemButtonSelected)
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, "PM"))));
}
process.env.NODE_ENV !== "production" ? Clock.propTypes = {
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number
} : void 0;
Clock.displayName = 'Clock';

var positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50]
};
var useStyles$6 = styles$1.makeStyles(function (theme) {
  var size = 32;
  var clockNumberColor = theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.secondary;
  return {
    root: {
      outline: 0,
      width: size,
      height: size,
      userSelect: 'none',
      position: 'absolute',
      left: "calc((100% - ".concat(size, "px) / 2)"),
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: clockNumberColor,
      '&:focused': {
        backgroundColor: theme.palette.background.paper
      }
    },
    clockNumberSelected: {
      color: theme.palette.primary.contrastText
    },
    clockNumberDisabled: {
      pointerEvents: 'none',
      color: styles$1.fade(clockNumberColor, 0.2)
    }
  };
}, {
  name: 'MuiPickersClockNumber'
});
var ClockNumber = function ClockNumber(props) {
  var disabled = props.disabled,
      getClockNumberText = props.getClockNumberText,
      index = props.index,
      isInner = props.isInner,
      label = props.label,
      onSelect = props.onSelect,
      selected = props.selected;
  var classes = useStyles$6();
  var canAutoFocus = useCanAutoFocus();
  var ref = React.useRef(null);
  var className = clsx(classes.root, selected && classes.clockNumberSelected, disabled && classes.clockNumberDisabled);
  var transformStyle = React.useMemo(function () {
    var position = positions[index];
    return {
      transform: "translate(".concat(position[0], "px, ").concat(position[1], "px")
    };
  }, [index]);
  React.useEffect(function () {
    if (canAutoFocus && selected && ref.current) {
      ref.current.focus();
    }
  }, [canAutoFocus, selected]);
  return /*#__PURE__*/React.createElement(ButtonBase, {
    focusRipple: true,
    centerRipple: true,
    ref: ref,
    "aria-disabled": disabled,
    tabIndex: disabled ? -1 : 0,
    component: "span",
    className: className,
    style: transformStyle,
    "aria-label": getClockNumberText(label),
    onKeyDown: onSpaceOrEnter(function () {
      return onSelect('finish');
    })
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: isInner ? 'body2' : 'body1'
  }, label));
};

var getHourNumbers = function getHourNumbers(_ref) {
  var ampm = _ref.ampm,
      date = _ref.date,
      getClockNumberText = _ref.getClockNumberText,
      isDisabled = _ref.isDisabled,
      onChange = _ref.onChange,
      utils = _ref.utils;
  var currentHours = date ? utils.getHours(date) : null;
  var hourNumbers = [];
  var startHour = ampm ? 1 : 0;
  var endHour = ampm ? 12 : 23;

  var isSelected = function isSelected(hour) {
    if (currentHours === null) {
      return false;
    }

    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  var _loop = function _loop(_hour) {
    var label = _hour.toString();

    if (_hour === 0) {
      label = '00';
    }

    var isInner = !ampm && (_hour === 0 || _hour > 12);
    hourNumbers.push( /*#__PURE__*/React.createElement(ClockNumber, {
      key: _hour,
      index: _hour,
      isInner: isInner,
      selected: isSelected(_hour),
      disabled: isDisabled(_hour),
      label: utils.formatNumber(label),
      onSelect: function onSelect() {
        return onChange(_hour, 'finish');
      },
      getClockNumberText: getClockNumberText
    }));
  };

  for (var _hour = startHour; _hour <= endHour; _hour += 1) {
    _loop(_hour);
  }

  return hourNumbers;
};
var getMinutesNumbers = function getMinutesNumbers(_ref2) {
  var utils = _ref2.utils,
      value = _ref2.value,
      onChange = _ref2.onChange,
      isDisabled = _ref2.isDisabled,
      getClockNumberText = _ref2.getClockNumberText;
  var f = utils.formatNumber;
  return [[5, f('05')], [10, f('10')], [15, f('15')], [20, f('20')], [25, f('25')], [30, f('30')], [35, f('35')], [40, f('40')], [45, f('45')], [50, f('50')], [55, f('55')], [0, f('00')]].map(function (_ref3, index) {
    var _ref4 = _slicedToArray(_ref3, 2),
        numberValue = _ref4[0],
        label = _ref4[1];

    return /*#__PURE__*/React.createElement(ClockNumber, {
      key: numberValue,
      label: label,
      index: index + 1,
      disabled: isDisabled(numberValue),
      selected: numberValue === value,
      onSelect: function onSelect(isFinish) {
        return onChange(numberValue, isFinish);
      },
      getClockNumberText: getClockNumberText
    });
  });
};

var useStyles$7 = styles$1.makeStyles(function (theme) {
  var textColor = theme.palette.type === 'light' ? theme.palette.primary.contrastText : theme.palette.getContrastText(theme.palette.background["default"]);
  return {
    root: {
      transition: theme.transitions.create('color'),
      color: styles$1.fade(textColor, 0.54),
      '&$selected': {
        color: textColor
      }
    },
    selected: {}
  };
}, {
  name: 'MuiPickersToolbarText'
});

var ToolbarText = function ToolbarText(props) {
  var className = props.className,
      selected = props.selected,
      value = props.value,
      other = _objectWithoutProperties(props, ["className", "selected", "value"]);

  var classes = useStyles$7();
  return /*#__PURE__*/React.createElement(Typography, _extends({
    className: clsx(classes.root, className, selected && classes.selected)
  }, other), value);
};

var useStyles$8 = styles$1.makeStyles({
  root: {
    padding: 0,
    minWidth: '16px',
    textTransform: 'none'
  }
}, {
  name: 'MuiPickersToolbarButton'
});
var ToolbarButton = function ToolbarButton(props) {
  var align = props.align,
      className = props.className,
      selected = props.selected,
      typographyClassName = props.typographyClassName,
      value = props.value,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["align", "className", "selected", "typographyClassName", "value", "variant"]);

  var classes = useStyles$8();
  return /*#__PURE__*/React.createElement(Button, _extends({
    "data-mui-test": "toolbar-button",
    variant: "text",
    className: clsx(classes.root, className)
  }, other), /*#__PURE__*/React.createElement(ToolbarText, {
    align: align,
    className: typographyClassName,
    variant: variant,
    value: value,
    selected: selected
  }));
};
ToolbarButton.displayName = 'ToolbarButton';

var muiComponentConfig$1 = {
  name: 'MuiPickersTimePickerToolbar'
};
var useStyles$9 = styles$1.makeStyles({
  separator: {
    outline: 0,
    margin: '0 4px 0 2px',
    cursor: 'default'
  },
  hourMinuteLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  hourMinuteLabelLandscape: {
    marginTop: 'auto'
  },
  hourMinuteLabelReverse: {
    flexDirection: 'row-reverse'
  },
  ampmSelection: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 12
  },
  ampmLandscape: {
    margin: '4px 0 auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexBasis: '100%'
  },
  ampmLabel: {
    fontSize: 17
  },
  penIconLandscape: {
    marginTop: 'auto'
  }
}, muiComponentConfig$1);
function useMeridiemMode(date, ampm, onChange) {
  var utils = useUtils();
  var meridiemMode = getMeridiem(date, utils);
  var handleMeridiemChange = React.useCallback(function (mode) {
    var timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, 'partial');
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode: meridiemMode,
    handleMeridiemChange: handleMeridiemChange
  };
}
var clockTypographyVariant = 'h3';
var TimePickerToolbar = withDefaultProps(muiComponentConfig$1, function (_ref) {
  var ampm = _ref.ampm,
      ampmInClock = _ref.ampmInClock,
      date = _ref.date,
      isLandscape = _ref.isLandscape,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      onChange = _ref.onChange,
      openView = _ref.openView,
      setOpenView = _ref.setOpenView,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      _ref$toolbarTitle = _ref.toolbarTitle,
      toolbarTitle = _ref$toolbarTitle === void 0 ? 'SELECT TIME' : _ref$toolbarTitle,
      views = _ref.views,
      other = _objectWithoutProperties(_ref, ["ampm", "ampmInClock", "date", "isLandscape", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "toggleMobileKeyboardView", "toolbarTitle", "views"]);

  var utils = useUtils();
  var theme = styles$1.useTheme();
  var classes = useStyles$9();
  var showAmPmControl = Boolean(ampm && !ampmInClock);

  var _useMeridiemMode = useMeridiemMode(date, ampm, onChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var formatHours = function formatHours(time) {
    return ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  };

  var separator = /*#__PURE__*/React.createElement(ToolbarText, {
    tabIndex: -1,
    value: ":",
    variant: clockTypographyVariant,
    selected: false,
    className: classes.separator
  });
  return /*#__PURE__*/React.createElement(PickerToolbar, _extends({
    landscapeDirection: "row",
    toolbarTitle: toolbarTitle,
    isLandscape: isLandscape,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    penIconClassName: clsx(isLandscape && classes.penIconLandscape)
  }, other), /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.hourMinuteLabel, isLandscape && classes.hourMinuteLabelLandscape, theme.direction === 'rtl' && classes.hourMinuteLabelReverse)
  }, arrayIncludes(views, 'hours') && /*#__PURE__*/React.createElement(ToolbarButton, {
    "data-mui-test": "hours",
    tabIndex: -1,
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView('hours');
    },
    selected: openView === 'hours',
    value: date ? formatHours(date) : '--'
  }), arrayIncludes(views, ['hours', 'minutes']) && separator, arrayIncludes(views, 'minutes') && /*#__PURE__*/React.createElement(ToolbarButton, {
    "data-mui-test": "minutes",
    tabIndex: -1,
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView('minutes');
    },
    selected: openView === 'minutes',
    value: date ? utils.format(date, 'minutes') : '--'
  }), arrayIncludes(views, ['minutes', 'seconds']) && separator, arrayIncludes(views, 'seconds') && /*#__PURE__*/React.createElement(ToolbarButton, {
    "data-mui-test": "seconds",
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView('seconds');
    },
    selected: openView === 'seconds',
    value: date ? utils.format(date, 'seconds') : '--'
  })), showAmPmControl && /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.ampmSelection, isLandscape && classes.ampmLandscape)
  }, /*#__PURE__*/React.createElement(ToolbarButton, {
    disableRipple: true,
    variant: "subtitle2",
    "data-mui-test": "toolbar-am-btn",
    selected: meridiemMode === 'am',
    typographyClassName: classes.ampmLabel,
    value: utils.getMeridiemText('am'),
    onClick: function onClick() {
      return handleMeridiemChange('am');
    }
  }), /*#__PURE__*/React.createElement(ToolbarButton, {
    disableRipple: true,
    variant: "subtitle2",
    "data-mui-test": "toolbar-pm-btn",
    selected: meridiemMode === 'pm',
    typographyClassName: classes.ampmLabel,
    value: utils.getMeridiemText('pm'),
    onClick: function onClick() {
      return handleMeridiemChange('pm');
    }
  })));
});

/**
 * @ignore - internal component.
 */

var ArrowLeftIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
}), 'ArrowLeft');

/**
 * @ignore - internal component.
 */

var ArrowRightIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
}), 'ArrowRight');

var useStyles$a = styles$1.makeStyles(function (theme) {
  return {
    root: {},
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper
    },
    previousMonthButtonMargin: {
      marginRight: 24
    },
    hidden: {
      visibility: 'hidden'
    }
  };
}, {
  name: 'MuiPickersArrowSwitcher'
});
var PureArrowSwitcher = React.forwardRef(function (props, ref) {
  var className = props.className,
      isLeftDisabled = props.isLeftDisabled,
      isLeftHidden = props.isLeftHidden,
      isRightDisabled = props.isRightDisabled,
      isRightHidden = props.isRightHidden,
      leftArrowButtonProps = props.leftArrowButtonProps,
      leftArrowButtonText = props.leftArrowButtonText,
      _props$leftArrowIcon = props.leftArrowIcon,
      leftArrowIcon = _props$leftArrowIcon === void 0 ? /*#__PURE__*/React.createElement(ArrowLeftIcon, null) : _props$leftArrowIcon,
      onLeftClick = props.onLeftClick,
      onRightClick = props.onRightClick,
      rightArrowButtonProps = props.rightArrowButtonProps,
      rightArrowButtonText = props.rightArrowButtonText,
      _props$rightArrowIcon = props.rightArrowIcon,
      rightArrowIcon = _props$rightArrowIcon === void 0 ? /*#__PURE__*/React.createElement(ArrowRightIcon, null) : _props$rightArrowIcon,
      text = props.text,
      other = _objectWithoutProperties(props, ["className", "isLeftDisabled", "isLeftHidden", "isRightDisabled", "isRightHidden", "leftArrowButtonProps", "leftArrowButtonText", "leftArrowIcon", "onLeftClick", "onRightClick", "rightArrowButtonProps", "rightArrowButtonText", "rightArrowIcon", "text"]);

  var classes = useStyles$a();
  var theme = styles$1.useTheme();
  var isRtl = theme.direction === 'rtl';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement(IconButton, _extends({
    "data-mui-test": "previous-arrow-button",
    size: "small",
    "aria-label": leftArrowButtonText
  }, leftArrowButtonProps, {
    disabled: isLeftDisabled,
    onClick: onLeftClick,
    className: clsx(classes.iconButton, leftArrowButtonProps === null || leftArrowButtonProps === void 0 ? void 0 : leftArrowButtonProps.className, isLeftHidden && classes.hidden, !text && classes.previousMonthButtonMargin)
  }), isRtl ? rightArrowIcon : leftArrowIcon), text && /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1",
    display: "inline"
  }, text), /*#__PURE__*/React.createElement(IconButton, _extends({
    "data-mui-test": "next-arrow-button",
    size: "small",
    "aria-label": rightArrowButtonText
  }, rightArrowButtonProps, {
    disabled: isRightDisabled,
    onClick: onRightClick,
    className: clsx(classes.iconButton, rightArrowButtonProps === null || rightArrowButtonProps === void 0 ? void 0 : rightArrowButtonProps.className, Boolean(isRightHidden) && classes.hidden)
  }), isRtl ? leftArrowIcon : rightArrowIcon));
});
PureArrowSwitcher.displayName = 'ArrowSwitcher';
var ArrowSwitcher = React.memo(PureArrowSwitcher);

var muiPickersComponentConfig$1 = {
  name: 'MuiPickersClockView'
};
var useStyles$b = styles$1.makeStyles(function () {
  return {
    arrowSwitcher: {
      position: 'absolute',
      right: 12,
      top: 15
    }
  };
}, muiPickersComponentConfig$1);

function getMinutesAriaText(minute) {
  return "".concat(minute, " minutes");
}

var getHoursAriaText = function getHoursAriaText(hour) {
  return "".concat(hour, " hours");
};

var getSecondsAriaText = function getSecondsAriaText(seconds) {
  return "".concat(seconds, " seconds");
};

function ClockView(props) {
  var _useDefaultProps = useDefaultProps(props, muiPickersComponentConfig$1),
      allowKeyboardControl = _useDefaultProps.allowKeyboardControl,
      ampm = _useDefaultProps.ampm,
      ampmInClock = _useDefaultProps.ampmInClock,
      date = _useDefaultProps.date,
      disableIgnoringDatePartForTimeValidation = _useDefaultProps.disableIgnoringDatePartForTimeValidation,
      _useDefaultProps$getH = _useDefaultProps.getHoursClockNumberText,
      getHoursClockNumberText = _useDefaultProps$getH === void 0 ? getHoursAriaText : _useDefaultProps$getH,
      _useDefaultProps$getM = _useDefaultProps.getMinutesClockNumberText,
      getMinutesClockNumberText = _useDefaultProps$getM === void 0 ? getMinutesAriaText : _useDefaultProps$getM,
      _useDefaultProps$getS = _useDefaultProps.getSecondsClockNumberText,
      getSecondsClockNumberText = _useDefaultProps$getS === void 0 ? getSecondsAriaText : _useDefaultProps$getS,
      leftArrowButtonProps = _useDefaultProps.leftArrowButtonProps,
      _useDefaultProps$left = _useDefaultProps.leftArrowButtonText,
      leftArrowButtonText = _useDefaultProps$left === void 0 ? 'open previous view' : _useDefaultProps$left,
      leftArrowIcon = _useDefaultProps.leftArrowIcon,
      maxTime = _useDefaultProps.maxTime,
      minTime = _useDefaultProps.minTime,
      _useDefaultProps$minu = _useDefaultProps.minutesStep,
      minutesStep = _useDefaultProps$minu === void 0 ? 1 : _useDefaultProps$minu,
      nextViewAvailable = _useDefaultProps.nextViewAvailable,
      onChange = _useDefaultProps.onChange,
      onDateChange = _useDefaultProps.onDateChange,
      openNextView = _useDefaultProps.openNextView,
      openPreviousView = _useDefaultProps.openPreviousView,
      previousViewAvailable = _useDefaultProps.previousViewAvailable,
      rightArrowButtonProps = _useDefaultProps.rightArrowButtonProps,
      _useDefaultProps$righ = _useDefaultProps.rightArrowButtonText,
      rightArrowButtonText = _useDefaultProps$righ === void 0 ? 'open next view' : _useDefaultProps$righ,
      rightArrowIcon = _useDefaultProps.rightArrowIcon,
      shouldDisableTime = _useDefaultProps.shouldDisableTime,
      showViewSwitcher = _useDefaultProps.showViewSwitcher,
      type = _useDefaultProps.type;

  var now = useNow();
  var utils = useUtils();
  var classes = useStyles$b();
  var dateOrNow = date || now;

  var _useMeridiemMode = useMeridiemMode(dateOrNow, ampm, onDateChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var isTimeDisabled = React.useCallback(function (rawValue, type) {
    if (date === null) {
      return false;
    }

    var validateTimeValue = function validateTimeValue(getRequestedTimePoint) {
      var isAfterComparingFn = createIsAfterIgnoreDatePart(Boolean(disableIgnoringDatePartForTimeValidation), utils);
      return Boolean(minTime && isAfterComparingFn(minTime, getRequestedTimePoint('end')) || maxTime && isAfterComparingFn(getRequestedTimePoint('start'), maxTime) || shouldDisableTime && shouldDisableTime(rawValue, type));
    };

    switch (type) {
      case 'hours':
        {
          var hoursWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, Boolean(ampm));
          return validateTimeValue(function (when) {
            return pipe(function (currentDate) {
              return utils.setHours(currentDate, hoursWithMeridiem);
            }, function (dateWithHours) {
              return utils.setMinutes(dateWithHours, when === 'start' ? 0 : 59);
            }, function (dateWithMinutes) {
              return utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59);
            })(date);
          });
        }

      case 'minutes':
        return validateTimeValue(function (when) {
          return pipe(function (currentDate) {
            return utils.setMinutes(currentDate, rawValue);
          }, function (dateWithMinutes) {
            return utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59);
          })(date);
        });

      case 'seconds':
        return validateTimeValue(function () {
          return utils.setSeconds(date, rawValue);
        });

      default:
        throw new Error('not supported');
    }
  }, [ampm, date, disableIgnoringDatePartForTimeValidation, maxTime, meridiemMode, minTime, shouldDisableTime, utils]);
  var viewProps = React.useMemo(function () {
    switch (type) {
      case 'hours':
        {
          var handleHoursChange = function handleHoursChange(value, isFinish) {
            var valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, Boolean(ampm));
            onChange(utils.setHours(dateOrNow, valueWithMeridiem), isFinish);
          };

          return {
            onChange: handleHoursChange,
            value: utils.getHours(dateOrNow),
            children: getHourNumbers({
              date: date,
              utils: utils,
              ampm: Boolean(ampm),
              onChange: handleHoursChange,
              getClockNumberText: getHoursClockNumberText,
              isDisabled: function isDisabled(value) {
                return isTimeDisabled(value, 'hours');
              }
            })
          };
        }

      case 'minutes':
        {
          var minutesValue = utils.getMinutes(dateOrNow);

          var handleMinutesChange = function handleMinutesChange(value, isFinish) {
            onChange(utils.setMinutes(dateOrNow, value), isFinish);
          };

          return {
            value: minutesValue,
            onChange: handleMinutesChange,
            children: getMinutesNumbers({
              utils: utils,
              value: minutesValue,
              onChange: handleMinutesChange,
              getClockNumberText: getMinutesClockNumberText,
              isDisabled: function isDisabled(value) {
                return isTimeDisabled(value, 'minutes');
              }
            })
          };
        }

      case 'seconds':
        {
          var secondsValue = utils.getSeconds(dateOrNow);

          var handleSecondsChange = function handleSecondsChange(value, isFinish) {
            onChange(utils.setSeconds(dateOrNow, value), isFinish);
          };

          return {
            value: secondsValue,
            onChange: handleSecondsChange,
            children: getMinutesNumbers({
              utils: utils,
              value: secondsValue,
              onChange: handleSecondsChange,
              getClockNumberText: getSecondsClockNumberText,
              isDisabled: function isDisabled(value) {
                return isTimeDisabled(value, 'seconds');
              }
            })
          };
        }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [type, utils, date, ampm, getHoursClockNumberText, getMinutesClockNumberText, getSecondsClockNumberText, meridiemMode, onChange, dateOrNow, isTimeDisabled]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showViewSwitcher && /*#__PURE__*/React.createElement(ArrowSwitcher, {
    className: classes.arrowSwitcher,
    leftArrowButtonProps: leftArrowButtonProps,
    rightArrowButtonProps: rightArrowButtonProps,
    leftArrowButtonText: leftArrowButtonText,
    rightArrowButtonText: rightArrowButtonText,
    leftArrowIcon: leftArrowIcon,
    rightArrowIcon: rightArrowIcon,
    onLeftClick: openPreviousView,
    onRightClick: openNextView,
    isLeftDisabled: previousViewAvailable,
    isRightDisabled: nextViewAvailable
  }), /*#__PURE__*/React.createElement(Clock, _extends({
    date: date,
    ampmInClock: ampmInClock // @ts-expect-error FIX ME
    ,
    onDateChange: onDateChange,
    type: type,
    ampm: ampm,
    minutesStep: minutesStep,
    allowKeyboardControl: allowKeyboardControl,
    isTimeDisabled: isTimeDisabled,
    meridiemMode: meridiemMode,
    handleMeridiemChange: handleMeridiemChange
  }, viewProps)));
}
process.env.NODE_ENV !== "production" ? ClockView.propTypes = {
  ampm: PropTypes.bool,
  date: PropTypes.object,
  minutesStep: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['minutes', 'hours', 'seconds']).isRequired
} : void 0;
ClockView.displayName = 'ClockView';

var useStyles$c = styles$1.makeStyles(function (theme) {
  return {
    root: {
      flex: '1 0 33.33%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      height: 64,
      transition: theme.transitions.create('font-size', {
        duration: '100ms'
      }),
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      },
      '&:disabled': {
        pointerEvents: 'none',
        color: theme.palette.text.secondary
      },
      '&$selected': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    selected: {}
  };
}, {
  name: 'MuiPickersMonth'
});
var Month = function Month(props) {
  var disabled = props.disabled,
      onSelect = props.onSelect,
      selected = props.selected,
      value = props.value,
      other = _objectWithoutProperties(props, ["disabled", "onSelect", "selected", "value"]);

  var classes = useStyles$c();

  var handleSelection = function handleSelection() {
    onSelect(value);
  };

  return /*#__PURE__*/React.createElement(Typography, _extends({
    "data-mui-test": "month",
    role: "button",
    component: "div",
    className: clsx(classes.root, selected && classes.selected),
    tabIndex: disabled ? -1 : 0,
    onClick: handleSelection,
    onKeyDown: onSpaceOrEnter(handleSelection),
    color: selected ? 'primary' : undefined,
    variant: selected ? 'h5' : 'subtitle1'
  }, other));
};
Month.displayName = 'Month';

var useStyles$d = styles$1.makeStyles({
  root: {
    width: 310,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'stretch'
  }
}, {
  name: 'MuiPickersMonthSelection'
});
function MonthSelection(_ref) {
  var date = _ref.date,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onChange = _ref.onChange,
      onMonthChange = _ref.onMonthChange;
  var utils = useUtils();
  var now = useNow();
  var classes = useStyles$d();
  var currentMonth = utils.getMonth(date || now);

  var shouldDisableMonth = function shouldDisableMonth(month) {
    var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    var isBeforeFirstEnabled = utils.isBefore(month, firstEnabledMonth);
    var isAfterLastEnabled = utils.isAfter(month, lastEnabledMonth);
    return isBeforeFirstEnabled || isAfterLastEnabled;
  };

  var onMonthSelect = React.useCallback(function (month) {
    var newDate = utils.setMonth(date || now, month);
    onChange(newDate, 'finish');

    if (onMonthChange) {
      onMonthChange(newDate);
    }
  }, [date, now, onChange, onMonthChange, utils]);
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, utils.getMonthArray(date || now).map(function (month) {
    var monthNumber = utils.getMonth(month);
    var monthText = utils.format(month, 'monthShort');
    return /*#__PURE__*/React.createElement(Month, {
      key: monthText,
      value: monthNumber,
      selected: monthNumber === currentMonth,
      onSelect: onMonthSelect,
      disabled: shouldDisableMonth(month)
    }, monthText);
  }));
}

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var createCalendarStateReducer = function createCalendarStateReducer(reduceAnimations, disableSwitchToMonthOnDayFocus, utils) {
  return function (state, action) {
    switch (action.type) {
      case 'changeMonth':
        return _objectSpread$4(_objectSpread$4({}, state), {}, {
          slideDirection: action.direction,
          currentMonth: action.newMonth,
          isMonthSwitchingAnimating: !reduceAnimations
        });

      case 'finishMonthSwitchingAnimation':
        return _objectSpread$4(_objectSpread$4({}, state), {}, {
          isMonthSwitchingAnimating: false
        });

      case 'changeFocusedDay':
        {
          var needMonthSwitch = Boolean(action.focusedDay) && !disableSwitchToMonthOnDayFocus && !utils.isSameMonth(state.currentMonth, action.focusedDay);
          return _objectSpread$4(_objectSpread$4({}, state), {}, {
            focusedDay: action.focusedDay,
            isMonthSwitchingAnimating: needMonthSwitch && !reduceAnimations,
            currentMonth: needMonthSwitch ? utils.startOfMonth(action.focusedDay) : state.currentMonth,
            slideDirection: utils.isAfterDay(action.focusedDay, state.currentMonth) ? 'left' : 'right'
          });
        }

      default:
        throw new Error('missing support');
    }
  };
};
function useCalendarState(_ref) {
  var date = _ref.date,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      _ref$disableSwitchToM = _ref.disableSwitchToMonthOnDayFocus,
      disableSwitchToMonthOnDayFocus = _ref$disableSwitchToM === void 0 ? false : _ref$disableSwitchToM,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onMonthChange = _ref.onMonthChange,
      reduceAnimations = _ref.reduceAnimations,
      shouldDisableDate = _ref.shouldDisableDate;
  var now = useNow();
  var utils = useUtils();
  var dateForMonth = date || now;
  var reducerFn = React.useRef(createCalendarStateReducer(Boolean(reduceAnimations), disableSwitchToMonthOnDayFocus, utils)).current;

  var _React$useReducer = React.useReducer(reducerFn, {
    isMonthSwitchingAnimating: false,
    focusedDay: date,
    currentMonth: utils.startOfMonth(dateForMonth),
    slideDirection: 'left'
  }),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      calendarState = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var handleChangeMonth = React.useCallback(function (payload) {
    dispatch(_objectSpread$4({
      type: 'changeMonth'
    }, payload));

    if (onMonthChange) {
      onMonthChange(payload.newMonth);
    }
  }, [onMonthChange]);
  var changeMonth = React.useCallback(function (newDate) {
    var newDateRequested = newDate !== null && newDate !== void 0 ? newDate : now;

    if (utils.isSameMonth(newDateRequested, calendarState.currentMonth)) {
      return;
    }

    handleChangeMonth({
      newMonth: utils.startOfMonth(newDateRequested),
      direction: utils.isAfterDay(newDateRequested, calendarState.currentMonth) ? 'left' : 'right'
    });
  }, [calendarState.currentMonth, handleChangeMonth, now, utils]);
  var isDateDisabled = React.useCallback(function (day) {
    return validateDate(utils, day, {
      disablePast: disablePast,
      disableFuture: disableFuture,
      minDate: minDate,
      maxDate: maxDate,
      shouldDisableDate: shouldDisableDate
    }) !== null;
  }, [disableFuture, disablePast, maxDate, minDate, shouldDisableDate, utils]);
  var onMonthSwitchingAnimationEnd = React.useCallback(function () {
    dispatch({
      type: 'finishMonthSwitchingAnimation'
    });
  }, []);
  var changeFocusedDay = React.useCallback(function (newFocusedDate) {
    if (!isDateDisabled(newFocusedDate)) {
      dispatch({
        type: 'changeFocusedDay',
        focusedDay: newFocusedDate
      });
    }
  }, [isDateDisabled]);
  return {
    calendarState: calendarState,
    changeMonth: changeMonth,
    changeFocusedDay: changeFocusedDay,
    isDateDisabled: isDateDisabled,
    onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
    handleChangeMonth: handleChangeMonth
  };
}

var animationDuration = 500;
var useStyles$e = styles$1.makeStyles(function (theme) {
  return {
    root: {
      display: 'block',
      position: 'relative'
    },
    fadeEnter: {
      willChange: 'transform',
      opacity: 0
    },
    fadeEnterActive: {
      opacity: 1,
      transition: theme.transitions.create('opacity', {
        duration: animationDuration
      })
    },
    fadeExit: {
      opacity: 1
    },
    fadeExitActive: {
      opacity: 0,
      transition: theme.transitions.create('opacity', {
        duration: animationDuration / 2
      })
    }
  };
}, {
  name: 'MuiPickersFadeTransition'
});
var FadeTransitionGroup = function FadeTransitionGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      reduceAnimations = _ref.reduceAnimations,
      transKey = _ref.transKey;
  var classes = useStyles$e();

  if (reduceAnimations) {
    return children;
  }

  var transitionClasses = {
    exit: classes.fadeExit,
    enterActive: classes.fadeEnterActive,
    enter: classes.fadeEnter,
    exitActive: classes.fadeExitActive
  };
  return /*#__PURE__*/React.createElement(reactTransitionGroup.TransitionGroup, {
    className: clsx(classes.root, className),
    childFactory: function childFactory(element) {
      return React.cloneElement(element, {
        classNames: transitionClasses
      });
    }
  }, /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
    mountOnEnter: true,
    unmountOnExit: true,
    key: transKey,
    timeout: {
      appear: animationDuration,
      enter: animationDuration / 2,
      exit: 0
    },
    classNames: transitionClasses
  }, children));
};

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var muiComponentConfig$2 = {
  name: 'MuiPickersDay'
};
var useStyles$f = styles$1.makeStyles(function (theme) {
  return {
    root: _objectSpread$5(_objectSpread$5({}, theme.typography.caption), {}, {
      width: DAY_SIZE,
      height: DAY_SIZE,
      borderRadius: '50%',
      padding: 0,
      // background required here to prevent collides with the other days when animating with transition group
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: styles$1.fade(theme.palette.action.active, theme.palette.action.hoverOpacity)
      },
      '&:focus': {
        backgroundColor: styles$1.fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
        '&$selected': {
          willChange: 'background-color',
          backgroundColor: theme.palette.primary.dark
        }
      },
      '&$selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration["short"]
        }),
        '&:hover': {
          willChange: 'background-color',
          backgroundColor: theme.palette.primary.dark
        }
      },
      '&$disabled': {
        color: theme.palette.text.secondary
      }
    }),
    dayWithMargin: {
      margin: "0 ".concat(DAY_MARGIN, "px")
    },
    dayOutsideMonth: {
      color: theme.palette.text.secondary
    },
    hiddenDaySpacingFiller: {
      visibility: 'hidden'
    },
    today: {
      '&:not($selected)': {
        border: "1px solid ".concat(theme.palette.text.secondary)
      }
    },
    dayLabel: {// need for overrides
    },
    selected: {},
    disabled: {}
  };
}, muiComponentConfig$2);

function PureDay(props) {
  var _useDefaultProps = useDefaultProps(props, muiComponentConfig$2),
      allowKeyboardControl = _useDefaultProps.allowKeyboardControl,
      _useDefaultProps$allo = _useDefaultProps.allowSameDateSelection,
      allowSameDateSelection = _useDefaultProps$allo === void 0 ? false : _useDefaultProps$allo,
      className = _useDefaultProps.className,
      day = _useDefaultProps.day,
      _useDefaultProps$disa = _useDefaultProps.disabled,
      disabled = _useDefaultProps$disa === void 0 ? false : _useDefaultProps$disa,
      _useDefaultProps$disa2 = _useDefaultProps.disableHighlightToday,
      disableHighlightToday = _useDefaultProps$disa2 === void 0 ? false : _useDefaultProps$disa2,
      _useDefaultProps$disa3 = _useDefaultProps.disableMargin,
      disableMargin = _useDefaultProps$disa3 === void 0 ? false : _useDefaultProps$disa3,
      _useDefaultProps$focu = _useDefaultProps.focusable,
      focusable = _useDefaultProps$focu === void 0 ? false : _useDefaultProps$focu,
      _useDefaultProps$focu2 = _useDefaultProps.focused,
      focused = _useDefaultProps$focu2 === void 0 ? false : _useDefaultProps$focu2,
      hidden = _useDefaultProps.hidden,
      isInCurrentMonth = _useDefaultProps.inCurrentMonth,
      isAnimating = _useDefaultProps.isAnimating,
      onClick = _useDefaultProps.onClick,
      onDayFocus = _useDefaultProps.onDayFocus,
      onDaySelect = _useDefaultProps.onDaySelect,
      onFocus = _useDefaultProps.onFocus,
      onKeyDown = _useDefaultProps.onKeyDown,
      _useDefaultProps$sele = _useDefaultProps.selected,
      selected = _useDefaultProps$sele === void 0 ? false : _useDefaultProps$sele,
      _useDefaultProps$show = _useDefaultProps.showDaysOutsideCurrentMonth,
      showDaysOutsideCurrentMonth = _useDefaultProps$show === void 0 ? false : _useDefaultProps$show,
      _useDefaultProps$toda = _useDefaultProps.today,
      isToday = _useDefaultProps$toda === void 0 ? false : _useDefaultProps$toda,
      other = _objectWithoutProperties(_useDefaultProps, ["allowKeyboardControl", "allowSameDateSelection", "className", "day", "disabled", "disableHighlightToday", "disableMargin", "focusable", "focused", "hidden", "inCurrentMonth", "isAnimating", "onClick", "onDayFocus", "onDaySelect", "onFocus", "onKeyDown", "selected", "showDaysOutsideCurrentMonth", "today"]);

  var utils = useUtils();
  var classes = useStyles$f();
  var canAutoFocus = useCanAutoFocus();
  var ref = React.useRef(null);
  React.useEffect(function () {
    if (focused && !disabled && !isAnimating && isInCurrentMonth && ref.current && allowKeyboardControl && canAutoFocus) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, canAutoFocus, disabled, focused, isAnimating, isInCurrentMonth]);

  var handleFocus = function handleFocus(event) {
    if (!focused && onDayFocus) {
      onDayFocus(day);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  var handleClick = function handleClick(event) {
    if (!allowSameDateSelection && selected) return;

    if (!disabled) {
      onDaySelect(day, 'finish');
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleKeyDown = onSpaceOrEnter(function () {
    if (!disabled) {
      onDaySelect(day, 'finish');
    }
  }, onKeyDown);
  var dayClassName = clsx(classes.root, className, selected && classes.selected, !disableMargin && classes.dayWithMargin, !disableHighlightToday && isToday && classes.today, !isInCurrentMonth && showDaysOutsideCurrentMonth && classes.dayOutsideMonth);

  if (!isInCurrentMonth && !showDaysOutsideCurrentMonth) {
    // Do not render button and not attach any listeners for empty days
    return /*#__PURE__*/React.createElement("div", {
      "aria-hidden": true,
      className: clsx(dayClassName, classes.hiddenDaySpacingFiller)
    });
  }

  return /*#__PURE__*/React.createElement(ButtonBase, _extends({
    ref: ref,
    centerRipple: true,
    "data-mui-test": "day",
    disabled: disabled,
    "aria-label": utils.format(day, 'fullDate'),
    tabIndex: focused || focusable ? 0 : -1,
    className: dayClassName
  }, other, {
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  }), /*#__PURE__*/React.createElement("span", {
    className: classes.dayLabel
  }, utils.format(day, 'dayOfMonth')));
}

var areDayPropsEqual = function areDayPropsEqual(prevProps, nextProps) {
  return prevProps.focused === nextProps.focused && prevProps.focusable === nextProps.focusable && prevProps.isAnimating === nextProps.isAnimating && prevProps.today === nextProps.today && prevProps.disabled === nextProps.disabled && prevProps.selected === nextProps.selected && prevProps.allowKeyboardControl === nextProps.allowKeyboardControl && prevProps.disableMargin === nextProps.disableMargin && prevProps.showDaysOutsideCurrentMonth === nextProps.showDaysOutsideCurrentMonth && prevProps.disableHighlightToday === nextProps.disableHighlightToday && prevProps.className === nextProps.className && prevProps.inCurrentMonth === nextProps.inCurrentMonth && prevProps.onDayFocus === nextProps.onDayFocus && prevProps.onDaySelect === nextProps.onDaySelect;
};
PureDay.displayName = 'PickersDay';
process.env.NODE_ENV !== "production" ? PureDay.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  today: PropTypes.bool
} : void 0; // keep typings of original component and not loose generic

var Day = React.memo(PureDay, areDayPropsEqual);

var slideAnimationDuration = 350;
var useStyles$g = styles$1.makeStyles(function (theme) {
  var slideTransition = theme.transitions.create('transform', {
    duration: slideAnimationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return {
    root: {
      display: 'block',
      position: 'relative',
      overflowX: 'hidden',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
      }
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)',
      zIndex: 1
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)',
      zIndex: 1
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    slideExit: {
      transform: 'translate(0%)'
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition,
      zIndex: 0
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition,
      zIndex: 0
    }
  };
}, {
  name: 'MuiPickersSlideTransition'
});
var SlideTransition = function SlideTransition(_ref) {
  var children = _ref.children,
      className = _ref.className,
      reduceAnimations = _ref.reduceAnimations,
      slideDirection = _ref.slideDirection,
      transKey = _ref.transKey,
      other = _objectWithoutProperties(_ref, ["children", "className", "reduceAnimations", "slideDirection", "transKey"]);

  var classes = useStyles$g();

  if (reduceAnimations) {
    return /*#__PURE__*/React.createElement("div", {
      className: clsx(classes.root, className)
    }, children);
  }

  var transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    // @ts-ignore
    enter: classes["slideEnter-".concat(slideDirection)],
    // @ts-ignore
    exitActive: classes["slideExitActiveLeft-".concat(slideDirection)]
  };
  return /*#__PURE__*/React.createElement(reactTransitionGroup.TransitionGroup, {
    className: clsx(classes.root, className),
    childFactory: function childFactory(element) {
      return React.cloneElement(element, {
        classNames: transitionClasses
      });
    }
  }, /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, _extends({
    mountOnEnter: true,
    unmountOnExit: true,
    key: transKey,
    timeout: slideAnimationDuration,
    classNames: transitionClasses
  }, other), children));
};

var muiComponentConfig$3 = {
  name: 'MuiPickersCalendar'
};
var useStyles$h = styles$1.makeStyles(function (theme) {
  var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
  return {
    root: {
      minHeight: weeksContainerHeight
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: weeksContainerHeight
    },
    weekContainer: {
      overflow: 'hidden'
    },
    week: {
      margin: "".concat(DAY_MARGIN, "px 0"),
      display: 'flex',
      justifyContent: 'center'
    },
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper
    },
    previousMonthButton: {
      marginRight: 12
    },
    daysHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    weekDayLabel: {
      width: 36,
      height: 40,
      margin: '0 2px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.text.secondary
    }
  };
}, muiComponentConfig$3);
function Calendar(props) {
  var _useGlobalKeyDown;

  var _useDefaultProps = useDefaultProps(props, muiComponentConfig$3),
      allowKeyboardControl = _useDefaultProps.allowKeyboardControl,
      allowSameDateSelection = _useDefaultProps.allowSameDateSelection,
      changeFocusedDay = _useDefaultProps.changeFocusedDay,
      className = _useDefaultProps.className,
      currentMonth = _useDefaultProps.currentMonth,
      date = _useDefaultProps.date,
      disableHighlightToday = _useDefaultProps.disableHighlightToday,
      focusedDay = _useDefaultProps.focusedDay,
      isDateDisabled = _useDefaultProps.isDateDisabled,
      isMonthSwitchingAnimating = _useDefaultProps.isMonthSwitchingAnimating,
      loading = _useDefaultProps.loading,
      onChange = _useDefaultProps.onChange,
      onMonthSwitchingAnimationEnd = _useDefaultProps.onMonthSwitchingAnimationEnd,
      reduceAnimations = _useDefaultProps.reduceAnimations,
      renderDay = _useDefaultProps.renderDay,
      _useDefaultProps$rend = _useDefaultProps.renderLoading,
      renderLoading = _useDefaultProps$rend === void 0 ? function () {
    return /*#__PURE__*/React.createElement("span", {
      "data-mui-test": "loading-progress"
    }, "...");
  } : _useDefaultProps$rend,
      showDaysOutsideCurrentMonth = _useDefaultProps.showDaysOutsideCurrentMonth,
      slideDirection = _useDefaultProps.slideDirection,
      TransitionProps = _useDefaultProps.TransitionProps;

  var now = useNow();
  var utils = useUtils();
  var theme = styles$1.useTheme();
  var classes = useStyles$h();
  var handleDaySelect = React.useCallback(function (day) {
    var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'finish';
    // TODO possibly buggy line figure out and add tests
    var finalDate = Array.isArray(date) ? day : utils.mergeDateAndTime(day, date || now);
    onChange(finalDate, isFinish);
  }, [date, now, onChange, utils]);
  var initialDate = Array.isArray(date) ? date[0] : date;
  var nowFocusedDay = focusedDay || initialDate || now;
  useGlobalKeyDown(Boolean(allowKeyboardControl), (_useGlobalKeyDown = {}, _defineProperty(_useGlobalKeyDown, keycode.ArrowUp, function () {
    return changeFocusedDay(utils.addDays(nowFocusedDay, -7));
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowDown, function () {
    return changeFocusedDay(utils.addDays(nowFocusedDay, 7));
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowLeft, function () {
    return changeFocusedDay(utils.addDays(nowFocusedDay, theme.direction === 'ltr' ? -1 : 1));
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowRight, function () {
    return changeFocusedDay(utils.addDays(nowFocusedDay, theme.direction === 'ltr' ? 1 : -1));
  }), _defineProperty(_useGlobalKeyDown, keycode.Home, function () {
    return changeFocusedDay(utils.startOfWeek(nowFocusedDay));
  }), _defineProperty(_useGlobalKeyDown, keycode.End, function () {
    return changeFocusedDay(utils.endOfWeek(nowFocusedDay));
  }), _defineProperty(_useGlobalKeyDown, keycode.PageUp, function () {
    return changeFocusedDay(utils.getNextMonth(nowFocusedDay));
  }), _defineProperty(_useGlobalKeyDown, keycode.PageDown, function () {
    return changeFocusedDay(utils.getPreviousMonth(nowFocusedDay));
  }), _useGlobalKeyDown));
  var currentMonthNumber = utils.getMonth(currentMonth);
  var selectedDates = (Array.isArray(date) ? date : [date]).filter(Boolean).map(function (selectedDateItem) {
    return selectedDateItem && utils.startOfDay(selectedDateItem);
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classes.daysHeader
  }, utils.getWeekdays().map(function (day, i) {
    return /*#__PURE__*/React.createElement(Typography, {
      "aria-hidden": true,
      key: day + i.toString(),
      variant: "caption",
      className: classes.weekDayLabel
    }, day.charAt(0).toUpperCase());
  })), loading ? /*#__PURE__*/React.createElement("div", {
    className: classes.loadingContainer
  }, renderLoading()) : /*#__PURE__*/React.createElement(SlideTransition, _extends({
    transKey: currentMonthNumber,
    onExited: onMonthSwitchingAnimationEnd,
    reduceAnimations: reduceAnimations,
    slideDirection: slideDirection,
    className: clsx(classes.root, className)
  }, TransitionProps), /*#__PURE__*/React.createElement("div", {
    role: "grid",
    className: classes.weekContainer
  }, utils.getWeekArray(currentMonth).map(function (week) {
    return /*#__PURE__*/React.createElement("div", {
      role: "row",
      key: "week-".concat(week[0]),
      className: classes.week
    }, week.map(function (day) {
      var _ref;

      var disabled = isDateDisabled(day);
      var isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;
      var dayProps = {
        key: (_ref = day) === null || _ref === void 0 ? void 0 : _ref.toString(),
        day: day,
        role: 'cell',
        isAnimating: isMonthSwitchingAnimating,
        disabled: disabled,
        allowKeyboardControl: allowKeyboardControl,
        allowSameDateSelection: allowSameDateSelection,
        focused: allowKeyboardControl && Boolean(focusedDay) && utils.isSameDay(day, nowFocusedDay),
        today: utils.isSameDay(day, now),
        inCurrentMonth: isDayInCurrentMonth,
        selected: selectedDates.some(function (selectedDate) {
          return selectedDate && utils.isSameDay(selectedDate, day);
        }),
        disableHighlightToday: disableHighlightToday,
        showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
        focusable: allowKeyboardControl && Boolean(nowFocusedDay) && utils.toJsDate(nowFocusedDay).getDate() === utils.toJsDate(day).getDate(),
        onDayFocus: changeFocusedDay,
        onDaySelect: handleDaySelect
      };
      return renderDay ? renderDay(day, selectedDates, dayProps) : /*#__PURE__*/React.createElement(Day, dayProps);
    }));
  }))));
}
Calendar.displayName = 'Calendar';

/**
 * @ignore - internal component.
 */

var ArrowDropDownIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M7 10l5 5 5-5z"
}), 'ArrowDropDown');

var useStyles$i = styles$1.makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      paddingLeft: 24,
      paddingRight: 12,
      // prevent jumping in safari
      maxHeight: 30,
      minHeight: 30
    },
    yearSelectionSwitcher: {
      marginRight: 'auto'
    },
    previousMonthButton: {
      marginRight: 24
    },
    switchViewDropdown: {
      willChange: 'transform',
      transition: theme.transitions.create('transform'),
      transform: 'rotate(0deg)'
    },
    switchViewDropdownDown: {
      transform: 'rotate(180deg)'
    },
    monthTitleContainer: {
      display: 'flex',
      maxHeight: 30,
      overflow: 'hidden',
      cursor: 'pointer',
      marginRight: 'auto'
    },
    monthText: {
      marginRight: 4
    }
  };
}, {
  name: 'MuiPickersCalendarHeader'
});

function getSwitchingViewAriaText(view) {
  return view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view';
}

function CalendarHeader(props) {
  var currentView = props.view,
      views = props.views,
      month = props.currentMonth,
      changeView = props.changeView,
      minDate = props.minDate,
      maxDate = props.maxDate,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      onMonthChange = props.onMonthChange,
      reduceAnimations = props.reduceAnimations,
      leftArrowButtonProps = props.leftArrowButtonProps,
      rightArrowButtonProps = props.rightArrowButtonProps,
      leftArrowIcon = props.leftArrowIcon,
      rightArrowIcon = props.rightArrowIcon,
      _props$leftArrowButto = props.leftArrowButtonText,
      leftArrowButtonText = _props$leftArrowButto === void 0 ? 'previous month' : _props$leftArrowButto,
      _props$rightArrowButt = props.rightArrowButtonText,
      rightArrowButtonText = _props$rightArrowButt === void 0 ? 'next month' : _props$rightArrowButt,
      _props$getViewSwitchi = props.getViewSwitchingButtonText,
      getViewSwitchingButtonText = _props$getViewSwitchi === void 0 ? getSwitchingViewAriaText : _props$getViewSwitchi;
  var utils = useUtils();
  var classes = useStyles$i();

  var selectNextMonth = function selectNextMonth() {
    return onMonthChange(utils.getNextMonth(month), 'left');
  };

  var selectPreviousMonth = function selectPreviousMonth() {
    return onMonthChange(utils.getPreviousMonth(month), 'right');
  };

  var isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture: disableFuture,
    maxDate: maxDate
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast: disablePast,
    minDate: minDate
  });

  var toggleView = function toggleView() {
    if (views.length === 1) {
      return;
    }

    if (views.length === 2) {
      changeView(views.find(function (view) {
        return view !== currentView;
      }) || views[0]);
    } else {
      // switching only between first 2
      var nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      changeView(views[nextIndexToOpen]);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.monthTitleContainer,
    onClick: toggleView
  }, /*#__PURE__*/React.createElement(FadeTransitionGroup, {
    reduceAnimations: reduceAnimations,
    transKey: utils.format(month, 'month')
  }, /*#__PURE__*/React.createElement(Typography, {
    "aria-live": "polite",
    "data-mui-test": "calendar-month-text",
    align: "center",
    variant: "subtitle1",
    className: classes.monthText
  }, utils.format(month, 'month'))), /*#__PURE__*/React.createElement(FadeTransitionGroup, {
    reduceAnimations: reduceAnimations,
    transKey: utils.format(month, 'year')
  }, /*#__PURE__*/React.createElement(Typography, {
    "aria-live": "polite",
    "data-mui-test": "calendar-year-text",
    align: "center",
    variant: "subtitle1"
  }, utils.format(month, 'year'))), views.length > 1 && /*#__PURE__*/React.createElement(IconButton, {
    size: "small",
    "data-mui-test": "calendar-view-switcher",
    onClick: toggleView,
    className: classes.yearSelectionSwitcher,
    "aria-label": getViewSwitchingButtonText(currentView)
  }, /*#__PURE__*/React.createElement(ArrowDropDownIcon, {
    className: clsx(classes.switchViewDropdown, currentView === 'year' && classes.switchViewDropdownDown)
  }))), /*#__PURE__*/React.createElement(Fade, {
    "in": currentView === 'date'
  }, /*#__PURE__*/React.createElement(ArrowSwitcher, {
    leftArrowButtonProps: leftArrowButtonProps,
    rightArrowButtonProps: rightArrowButtonProps,
    leftArrowButtonText: leftArrowButtonText,
    rightArrowButtonText: rightArrowButtonText,
    leftArrowIcon: leftArrowIcon,
    rightArrowIcon: rightArrowIcon,
    onLeftClick: selectPreviousMonth,
    onRightClick: selectNextMonth,
    isLeftDisabled: isPreviousMonthDisabled,
    isRightDisabled: isNextMonthDisabled
  }))));
}
CalendarHeader.displayName = 'PickersCalendarHeader';
process.env.NODE_ENV !== "production" ? CalendarHeader.propTypes = {
  leftArrowButtonText: PropTypes.string,
  leftArrowIcon: PropTypes.node,
  rightArrowButtonText: PropTypes.string,
  rightArrowIcon: PropTypes.node
} : void 0;

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var useStyles$j = styles$1.makeStyles(function (theme) {
  return {
    root: {
      flexBasis: '33.3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&$disabled': {
        color: theme.palette.text.secondary
      },
      '&$selected': {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:focus, &:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }
    },
    modeDesktop: {
      flexBasis: '25%'
    },
    yearButton: _objectSpread$6(_objectSpread$6({
      color: 'unset',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 0
    }, theme.typography.subtitle1), {}, {
      margin: '8px 0',
      height: 36,
      width: 72,
      borderRadius: 16,
      cursor: 'pointer',
      '&:focus, &:hover': {
        backgroundColor: styles$1.fade(theme.palette.action.active, theme.palette.action.hoverOpacity)
      }
    }),
    disabled: {},
    selected: {}
  };
}, {
  name: 'MuiPickersYear'
});
var Year = function Year(props) {
  var allowKeyboardControl = props.allowKeyboardControl,
      children = props.children,
      disabled = props.disabled,
      focused = props.focused,
      forwardedRef = props.forwardedRef,
      onSelect = props.onSelect,
      selected = props.selected,
      value = props.value;
  var classes = useStyles$j();
  var ref = React.useRef(null);
  var refHandle = utils.useForkRef(ref, forwardedRef);
  var canAutoFocus = useCanAutoFocus();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  React.useEffect(function () {
    if (canAutoFocus && focused && ref.current && !disabled && allowKeyboardControl) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, canAutoFocus, disabled, focused]);
  return /*#__PURE__*/React.createElement("div", {
    "data-mui-test": "year",
    className: clsx(classes.root, wrapperVariant === 'desktop' && classes.modeDesktop)
  }, /*#__PURE__*/React.createElement("button", {
    ref: refHandle,
    disabled: disabled,
    type: "button",
    "data-mui-test": "year-".concat(children),
    tabIndex: selected ? 0 : -1,
    onClick: function onClick() {
      return onSelect(value);
    },
    onKeyDown: onSpaceOrEnter(function () {
      return onSelect(value);
    }),
    className: clsx(classes.yearButton, disabled && classes.disabled, selected && classes.selected)
  }, children));
};
var Year$1 = React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(Year, _extends({}, props, {
    forwardedRef: ref
  }));
});

var useStyles$k = styles$1.makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowY: 'auto',
    height: '100%',
    margin: '0 4px'
  }
}, {
  name: 'MuiPickersYearSelection'
});
function YearSelection(_ref) {
  var _useGlobalKeyDown;

  var allowKeyboardControl = _ref.allowKeyboardControl,
      changeFocusedDay = _ref.changeFocusedDay,
      __dateOrNull = _ref.date,
      isDateDisabled = _ref.isDateDisabled,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      onChange = _ref.onChange,
      onYearChange = _ref.onYearChange,
      shouldDisableYear = _ref.shouldDisableYear;
  var now = useNow();
  var theme = styles$1.useTheme();
  var utils = useUtils();
  var classes = useStyles$k();
  var selectedDate = __dateOrNull || now;
  var currentYear = utils.getYear(selectedDate);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var selectedYearRef = React.useRef(null);

  var _React$useState = React.useState(currentYear),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedYear = _React$useState2[0],
      setFocusedYear = _React$useState2[1];

  var handleYearSelection = React.useCallback(function (year) {
    var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'finish';

    var submitDate = function submitDate(newDate) {
      onChange(newDate, isFinish);
      changeFocusedDay(newDate || now);

      if (onYearChange) {
        onYearChange(newDate);
      }
    };

    var newDate = utils.setYear(selectedDate, year);

    if (isDateDisabled(newDate)) {
      var closestEnabledDate = findClosestEnabledDate({
        utils: utils,
        date: newDate,
        minDate: minDate,
        maxDate: maxDate,
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled
      });
      submitDate(closestEnabledDate);
    } else {
      submitDate(newDate);
    }
  }, [utils, now, selectedDate, isDateDisabled, onChange, changeFocusedDay, onYearChange, minDate, maxDate, disablePast, disableFuture]);
  var focusYear = React.useCallback(function (year) {
    if (!isDateDisabled(utils.setYear(selectedDate, year))) {
      setFocusedYear(year);
    }
  }, [selectedDate, isDateDisabled, utils]);
  var yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;
  var nowFocusedYear = focusedYear || currentYear;
  useGlobalKeyDown(Boolean(allowKeyboardControl), (_useGlobalKeyDown = {}, _defineProperty(_useGlobalKeyDown, keycode.ArrowUp, function () {
    return focusYear(nowFocusedYear - yearsInRow);
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowDown, function () {
    return focusYear(nowFocusedYear + yearsInRow);
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowLeft, function () {
    return focusYear(nowFocusedYear + (theme.direction === 'ltr' ? -1 : 1));
  }), _defineProperty(_useGlobalKeyDown, keycode.ArrowRight, function () {
    return focusYear(nowFocusedYear + (theme.direction === 'ltr' ? 1 : -1));
  }), _useGlobalKeyDown));
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, utils.getYearRange(minDate, maxDate).map(function (year) {
    var yearNumber = utils.getYear(year);
    var selected = yearNumber === currentYear;
    return /*#__PURE__*/React.createElement(Year$1, {
      key: utils.format(year, 'year'),
      selected: selected,
      value: yearNumber,
      onSelect: handleYearSelection,
      allowKeyboardControl: allowKeyboardControl,
      focused: yearNumber === focusedYear,
      ref: selected ? selectedYearRef : undefined,
      disabled: disablePast && utils.isBeforeYear(year, now) || disableFuture && utils.isAfterYear(year, now) || shouldDisableYear && shouldDisableYear(year)
    }, utils.format(year, 'year'));
  }));
}

var muiComponentConfig$4 = {
  name: 'MuiPickersCalendarView'
};
var useStyles$l = styles$1.makeStyles({
  viewTransitionContainer: {
    overflowY: 'auto'
  },
  fullHeightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: (DAY_SIZE + DAY_MARGIN * 4) * 7,
    height: '100%'
  }
}, muiComponentConfig$4);
var defaultReduceAnimations = typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);
function CalendarView(props) {
  var _useDefaultProps = useDefaultProps(props, muiComponentConfig$4),
      allowKeyboardControlProp = _useDefaultProps.allowKeyboardControl,
      changeView = _useDefaultProps.changeView,
      date = _useDefaultProps.date,
      disableFuture = _useDefaultProps.disableFuture,
      disablePast = _useDefaultProps.disablePast,
      loading = _useDefaultProps.loading,
      maxDateProp = _useDefaultProps.maxDate,
      minDateProp = _useDefaultProps.minDate,
      onChange = _useDefaultProps.onChange,
      onMonthChange = _useDefaultProps.onMonthChange,
      _useDefaultProps$redu = _useDefaultProps.reduceAnimations,
      reduceAnimations = _useDefaultProps$redu === void 0 ? defaultReduceAnimations : _useDefaultProps$redu,
      renderLoading = _useDefaultProps.renderLoading,
      shouldDisableDate = _useDefaultProps.shouldDisableDate,
      shouldDisableYear = _useDefaultProps.shouldDisableYear,
      view = _useDefaultProps.view,
      other = _objectWithoutProperties(_useDefaultProps, ["allowKeyboardControl", "changeView", "date", "disableFuture", "disablePast", "loading", "maxDate", "minDate", "onChange", "onMonthChange", "reduceAnimations", "renderLoading", "shouldDisableDate", "shouldDisableYear", "view"]);

  var utils = useUtils();
  var classes = useStyles$l();
  var isStatic = React.useContext(IsStaticVariantContext);
  var allowKeyboardControl = allowKeyboardControlProp !== null && allowKeyboardControlProp !== void 0 ? allowKeyboardControlProp : !isStatic;
  var minDate = minDateProp || utils.date(defaultMinDate);
  var maxDate = maxDateProp || utils.date(defaultMaxDate);

  var _useCalendarState = useCalendarState({
    date: date,
    reduceAnimations: reduceAnimations,
    onMonthChange: onMonthChange,
    minDate: minDate,
    maxDate: maxDate,
    shouldDisableDate: shouldDisableDate,
    disablePast: disablePast,
    disableFuture: disableFuture
  }),
      calendarState = _useCalendarState.calendarState,
      changeFocusedDay = _useCalendarState.changeFocusedDay,
      changeMonth = _useCalendarState.changeMonth,
      isDateDisabled = _useCalendarState.isDateDisabled,
      handleChangeMonth = _useCalendarState.handleChangeMonth,
      onMonthSwitchingAnimationEnd = _useCalendarState.onMonthSwitchingAnimationEnd;

  React.useEffect(function () {
    if (date && isDateDisabled(date)) {
      var closestEnabledDate = findClosestEnabledDate({
        utils: utils,
        date: date,
        minDate: minDate,
        maxDate: maxDate,
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled
      });
      onChange(closestEnabledDate, 'partial');
    } // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.

  }, []); // eslint-disable-line

  React.useEffect(function () {
    changeMonth(date);
  }, [date]); // eslint-disable-line

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CalendarHeader, _extends({}, other, {
    view: view,
    currentMonth: calendarState.currentMonth,
    changeView: changeView,
    onMonthChange: function onMonthChange(newMonth, direction) {
      return handleChangeMonth({
        newMonth: newMonth,
        direction: direction
      });
    },
    minDate: minDate,
    maxDate: maxDate,
    disablePast: disablePast,
    disableFuture: disableFuture,
    reduceAnimations: reduceAnimations
  })), /*#__PURE__*/React.createElement(FadeTransitionGroup, {
    reduceAnimations: reduceAnimations,
    className: classes.viewTransitionContainer,
    transKey: view
  }, /*#__PURE__*/React.createElement("div", null, view === 'year' && /*#__PURE__*/React.createElement(YearSelection, _extends({}, other, {
    date: date,
    onChange: onChange,
    minDate: minDate,
    maxDate: maxDate,
    disableFuture: disableFuture,
    disablePast: disablePast,
    isDateDisabled: isDateDisabled,
    allowKeyboardControl: allowKeyboardControl,
    shouldDisableYear: shouldDisableYear,
    changeFocusedDay: changeFocusedDay
  })), view === 'month' && /*#__PURE__*/React.createElement(MonthSelection, _extends({}, other, {
    date: date,
    onChange: onChange,
    minDate: minDate,
    maxDate: maxDate,
    onMonthChange: onMonthChange
  })), view === 'date' && /*#__PURE__*/React.createElement(Calendar, _extends({}, other, calendarState, {
    onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
    changeFocusedDay: changeFocusedDay,
    reduceAnimations: reduceAnimations,
    date: date,
    onChange: onChange,
    isDateDisabled: isDateDisabled,
    allowKeyboardControl: allowKeyboardControl,
    loading: loading,
    renderLoading: renderLoading
  })))));
}

var getOrientation = function getOrientation() {
  if (typeof window === 'undefined') {
    return 'portrait';
  }

  if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
    return Math.abs(window.screen.orientation.angle) === 90 ? 'landscape' : 'portrait';
  } // Support IOS safari


  if (window.orientation) {
    return Math.abs(Number(window.orientation)) === 90 ? 'landscape' : 'portrait';
  }

  return 'portrait';
};

function useIsLandscape(views, customOrientation) {
  var _React$useState = React.useState(getOrientation()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      orientation = _React$useState2[0],
      setOrientation = _React$useState2[1];

  useIsomorphicEffect(function () {
    var eventHandler = function eventHandler() {
      setOrientation(getOrientation());
    };

    window.addEventListener('orientationchange', eventHandler);
    return function () {
      window.removeEventListener('orientationchange', eventHandler);
    };
  }, []);

  if (arrayIncludes(views, ['hours', 'minutes', 'seconds'])) {
    // could not display 13:34:44 in landscape mode
    return false;
  }

  var orientationToUse = customOrientation || orientation;
  return orientationToUse === 'landscape';
}

var MobileKeyboardInputView = styles$1.styled('div')({
  padding: '16px 24px'
}, {
  name: 'MuiPickersMobileKeyboardInputView'
});

var muiComponentConfig$5 = {
  name: 'MuiPickersBasePicker'
};
var useStyles$m = styles$1.makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  landscape: {
    flexDirection: 'row'
  },
  pickerView: {
    overflowX: 'hidden',
    width: DIALOG_WIDTH,
    maxHeight: VIEW_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  pickerViewLandscape: {
    padding: '0 8px'
  }
}, muiComponentConfig$5);
var MobileKeyboardTextFieldProps = {
  fullWidth: true
};

var isDatePickerView = function isDatePickerView(view) {
  return view === 'year' || view === 'month' || view === 'date';
};

function Picker(_ref) {
  var className = _ref.className,
      date = _ref.date,
      DateInputProps = _ref.DateInputProps,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      onDateChange = _ref.onDateChange,
      _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'date' : _ref$openTo,
      orientation = _ref.orientation,
      showToolbar = _ref.showToolbar,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      _ref$ToolbarComponent = _ref.ToolbarComponent,
      ToolbarComponent = _ref$ToolbarComponent === void 0 ? function () {
    return null;
  } : _ref$ToolbarComponent,
      toolbarFormat = _ref.toolbarFormat,
      toolbarPlaceholder = _ref.toolbarPlaceholder,
      toolbarTitle = _ref.toolbarTitle,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['year', 'month', 'date', 'hours', 'minutes', 'seconds'] : _ref$views,
      other = _objectWithoutProperties(_ref, ["className", "date", "DateInputProps", "isMobileKeyboardViewOpen", "onDateChange", "openTo", "orientation", "showToolbar", "toggleMobileKeyboardView", "ToolbarComponent", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"]);

  var classes = useStyles$m();
  var isLandscape = useIsLandscape(views, orientation);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var toShowToolbar = typeof showToolbar === 'undefined' ? wrapperVariant !== 'desktop' : showToolbar;
  var handleDateChange = React.useCallback(function (date, selectionState) {
    onDateChange(date, wrapperVariant, selectionState);
  }, [onDateChange, wrapperVariant]);

  var _useViews = useViews({
    views: views,
    openTo: openTo,
    onChange: handleDateChange,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView
  }),
      openView = _useViews.openView,
      nextView = _useViews.nextView,
      previousView = _useViews.previousView,
      setOpenView = _useViews.setOpenView,
      handleChangeAndOpenNext = _useViews.handleChangeAndOpenNext;

  return /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.root, className, isLandscape && classes.landscape)
  }, toShowToolbar && /*#__PURE__*/React.createElement(ToolbarComponent, _extends({}, other, {
    views: views,
    isLandscape: isLandscape,
    date: date,
    onChange: handleDateChange,
    setOpenView: setOpenView,
    openView: openView,
    toolbarTitle: toolbarTitle,
    toolbarFormat: toolbarFormat,
    toolbarPlaceholder: toolbarPlaceholder,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView
  })), /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.pickerView, isLandscape && classes.pickerViewLandscape)
  }, isMobileKeyboardViewOpen ? /*#__PURE__*/React.createElement(MobileKeyboardInputView, null, /*#__PURE__*/React.createElement(KeyboardDateInput, _extends({}, DateInputProps, {
    ignoreInvalidInputs: true,
    disableOpenPicker: true,
    TextFieldProps: MobileKeyboardTextFieldProps
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, (openView === 'year' || openView === 'month' || openView === 'date') && /*#__PURE__*/React.createElement(CalendarView, _extends({
    date: date,
    changeView: setOpenView // @ts-ignore
    ,
    views: views,
    onChange: handleChangeAndOpenNext,
    view: openView
  }, other)), (openView === 'hours' || openView === 'minutes' || openView === 'seconds') && /*#__PURE__*/React.createElement(ClockView, _extends({}, other, {
    date: date,
    type: openView,
    onDateChange: handleDateChange,
    onChange: handleChangeAndOpenNext,
    openNextView: function openNextView() {
      return setOpenView(nextView);
    },
    openPreviousView: function openPreviousView() {
      return setOpenView(previousView);
    },
    nextViewAvailable: !nextView,
    previousViewAvailable: !previousView || isDatePickerView(previousView),
    showViewSwitcher: wrapperVariant === 'desktop'
  })))));
}

var Picker$1 = withDefaultProps(muiComponentConfig$5, Picker);

function withDateAdapterProp(Component) {
  return function (_ref) {
    var dateAdapter = _ref.dateAdapter,
        other = _objectWithoutProperties(_ref, ["dateAdapter"]);

    if (dateAdapter) {
      return /*#__PURE__*/React.createElement(MuiPickersAdapterContext.Provider, {
        value: dateAdapter
      }, /*#__PURE__*/React.createElement(Component, other));
    }

    return /*#__PURE__*/React.createElement(Component, other);
  };
}

/* Creates a component that rendering modal/popover/nothing and spreading props down to text field */
function makeWrapperComponent(Wrapper, _ref) {
  var KeyboardDateInputComponent = _ref.KeyboardDateInputComponent,
      PureDateInputComponent = _ref.PureDateInputComponent;

  function WrapperComponent(props) {
    var disableCloseOnSelect = props.disableCloseOnSelect,
        cancelText = props.cancelText,
        children = props.children,
        clearable = props.clearable,
        clearText = props.clearText,
        DateInputProps = props.DateInputProps,
        DialogProps = props.DialogProps,
        displayStaticWrapperAs = props.displayStaticWrapperAs,
        inputFormat = props.inputFormat,
        okText = props.okText,
        onAccept = props.onAccept,
        onChange = props.onChange,
        onClose = props.onClose,
        onOpen = props.onOpen,
        open = props.open,
        PopperProps = props.PopperProps,
        showTabs = props.showTabs,
        todayText = props.todayText,
        value = props.value,
        wider = props.wider,
        wrapperProps = props.wrapperProps,
        restPropsForTextField = _objectWithoutProperties(props, ["disableCloseOnSelect", "cancelText", "children", "clearable", "clearText", "DateInputProps", "DialogProps", "displayStaticWrapperAs", "inputFormat", "okText", "onAccept", "onChange", "onClose", "onOpen", "open", "PopperProps", "showTabs", "todayText", "value", "wider", "wrapperProps"]);

    var WrapperComponent = Wrapper;
    return /*#__PURE__*/React__default.createElement(WrapperComponent, _extends({
      clearable: clearable,
      clearText: clearText,
      DialogProps: DialogProps,
      PopperProps: PopperProps,
      okText: okText,
      todayText: todayText,
      cancelText: cancelText,
      DateInputProps: DateInputProps // @ts-ignore
      ,
      KeyboardDateInputComponent: KeyboardDateInputComponent // @ts-ignore
      ,
      PureDateInputComponent: PureDateInputComponent,
      wider: wider,
      showTabs: showTabs,
      displayStaticWrapperAs: displayStaticWrapperAs
    }, wrapperProps, restPropsForTextField), children);
  }

  return WrapperComponent;
}

function useOpenState(_ref) {
  var open = _ref.open,
      onOpen = _ref.onOpen,
      onClose = _ref.onClose;
  var isControllingOpenProp = React.useRef(typeof open === 'boolean').current;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      openState = _React$useState2[0],
      setIsOpenState = _React$useState2[1]; // It is required to update inner state in useEffect in order to avoid situation when
  // Our component is not mounted yet, but `open` state is set to `true` (e.g. initially opened)


  React.useEffect(function () {
    if (isControllingOpenProp) {
      if (typeof open !== 'boolean') {
        throw new Error('You must not mix controlling and uncontrolled mode for `open` prop');
      }

      setIsOpenState(open);
    }
  }, [isControllingOpenProp, open]);
  var setIsOpen = React.useCallback(function (newIsOpen) {
    if (!isControllingOpenProp) {
      setIsOpenState(newIsOpen);
    }

    return newIsOpen ? onOpen && onOpen() : onClose && onClose();
  }, [isControllingOpenProp, onOpen, onClose]);
  return {
    isOpen: openState,
    setIsOpen: setIsOpen
  };
}

function usePickerState(props, valueManager) {
  var inputFormat = props.inputFormat,
      disabled = props.disabled,
      readOnly = props.readOnly,
      onAccept = props.onAccept,
      onChange = props.onChange,
      disableCloseOnSelect = props.disableCloseOnSelect,
      value = props.value;

  if (!inputFormat) {
    throw new Error('inputFormat prop is required');
  }

  var now = useNow();
  var utils = useUtils();

  var _useOpenState = useOpenState(props),
      isOpen = _useOpenState.isOpen,
      setIsOpen = _useOpenState.setIsOpen;

  var _React$useState = React.useState(valueManager.parseInput(utils, props)),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      pickerDate = _React$useState2[0],
      setPickerDate = _React$useState2[1]; // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, cause we are just showing text field


  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isMobileKeyboardViewOpen = _React$useState4[0],
      setMobileKeyboardViewOpen = _React$useState4[1];

  React.useEffect(function () {
    var parsedDateValue = valueManager.parseInput(utils, props);
    setPickerDate(function (currentPickerDate) {
      if (!valueManager.areValuesEqual(utils, currentPickerDate, parsedDateValue)) {
        return parsedDateValue;
      }

      return currentPickerDate;
    }); // We need to react only on value change, because `date` could potentially return new Date() on each render
  }, [value, utils]); // eslint-disable-line

  var acceptDate = React.useCallback(function (acceptedDate, needClosePicker) {
    onChange(acceptedDate);

    if (needClosePicker) {
      setIsOpen(false);

      if (onAccept) {
        onAccept(acceptedDate);
      }
    }
  }, [onAccept, onChange, setIsOpen]);
  var wrapperProps = React.useMemo(function () {
    return {
      open: isOpen,
      onClear: function onClear() {
        return acceptDate(valueManager.emptyValue, true);
      },
      onAccept: function onAccept() {
        return acceptDate(pickerDate, true);
      },
      onDismiss: function onDismiss() {
        return setIsOpen(false);
      },
      onSetToday: function onSetToday() {
        // TODO FIX ME
        setPickerDate(now);
        acceptDate(now, !disableCloseOnSelect);
      }
    };
  }, [acceptDate, disableCloseOnSelect, isOpen, now, pickerDate, setIsOpen, valueManager.emptyValue]);
  var pickerProps = React.useMemo(function () {
    return {
      // canAutoFocus,
      date: pickerDate,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: function toggleMobileKeyboardView() {
        if (!isMobileKeyboardViewOpen) {
          // accept any partial input done by React.user
          setPickerDate(pickerDate);
        }

        setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen);
      },
      onDateChange: function onDateChange(newDate, wrapperVariant) {
        var selectionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'partial';
        setPickerDate(newDate);

        if (selectionState === 'partial') {
          acceptDate(newDate, false);
        }

        if (selectionState === 'finish') {
          var shouldCloseOnSelect = !(disableCloseOnSelect !== null && disableCloseOnSelect !== void 0 ? disableCloseOnSelect : wrapperVariant === 'mobile');
          acceptDate(newDate, shouldCloseOnSelect);
        } // if selectionState === "shallow" do nothing (we already update picker state)

      }
    };
  }, [acceptDate, disableCloseOnSelect, isMobileKeyboardViewOpen, pickerDate]);
  var inputProps = React.useMemo(function () {
    return {
      onChange: onChange,
      inputFormat: inputFormat,
      open: isOpen,
      rawValue: value,
      openPicker: function openPicker() {
        return !readOnly && !disabled && setIsOpen(true);
      }
    };
  }, [onChange, inputFormat, isOpen, value, readOnly, disabled, setIsOpen]);
  var pickerState = {
    pickerProps: pickerProps,
    inputProps: inputProps,
    wrapperProps: wrapperProps
  };
  React.useDebugValue(pickerState, function () {
    return {
      MuiPickerState: {
        pickerDate: pickerDate,
        other: pickerState
      }
    };
  });
  return pickerState;
}

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var valueManager = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: function areValuesEqual(utils, a, b) {
    return utils.isEqual(a, b);
  }
};
function makePickerWithStateAndWrapper(Wrapper, _ref) {
  var name = _ref.name,
      useInterceptProps = _ref.useInterceptProps,
      useValidation = _ref.useValidation,
      DefaultToolbarComponent = _ref.DefaultToolbarComponent;
  var WrapperComponent = makeWrapperComponent(Wrapper, {
    KeyboardDateInputComponent: KeyboardDateInput,
    PureDateInputComponent: PureDateInput
  });

  function PickerWithState(__props) {
    var allProps = useInterceptProps(__props);
    var validationError = useValidation(allProps.value, allProps) !== null;

    var _usePickerState = usePickerState(allProps, valueManager),
        pickerProps = _usePickerState.pickerProps,
        inputProps = _usePickerState.inputProps,
        wrapperProps = _usePickerState.wrapperProps; // Note that we are passing down all the value without spread.
    // It saves us >1kb gzip and make any prop available automatically on any level down.


    var value = allProps.value,
        onChange = allProps.onChange,
        other = _objectWithoutProperties(allProps, ["value", "onChange"]);

    var AllDateInputProps = _objectSpread$7(_objectSpread$7(_objectSpread$7({}, inputProps), other), {}, {
      validationError: validationError
    });

    return /*#__PURE__*/React.createElement(WrapperComponent, _extends({
      wrapperProps: wrapperProps,
      DateInputProps: AllDateInputProps
    }, other), /*#__PURE__*/React.createElement(Picker$1, _extends({}, pickerProps, {
      toolbarTitle: allProps.label || allProps.toolbarTitle,
      ToolbarComponent: other.ToolbarComponent || DefaultToolbarComponent,
      DateInputProps: AllDateInputProps
    }, other)));
  }

  var FinalPickerComponent = withDefaultProps({
    name: name
  }, withDateAdapterProp(PickerWithState)); // @ts-ignore Simply ignore generic values in props, because it is impossible
  // to keep generics without additional cast when using forwardRef
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834

  return React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(FinalPickerComponent, _extends({}, props, {
      forwardedRef: ref
    }));
  });
}

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var datePickerConfig = {
  useValidation: makeValidationHook(validateDate),
  DefaultToolbarComponent: DatePickerToolbar,
  useInterceptProps: function useInterceptProps(_ref) {
    var _ref$openTo = _ref.openTo,
        openTo = _ref$openTo === void 0 ? 'date' : _ref$openTo,
        _ref$views = _ref.views,
        views = _ref$views === void 0 ? ['year', 'date'] : _ref$views,
        _ref$minDate = _ref.minDate,
        __minDate = _ref$minDate === void 0 ? defaultMinDate : _ref$minDate,
        _ref$maxDate = _ref.maxDate,
        __maxDate = _ref$maxDate === void 0 ? defaultMaxDate : _ref$maxDate,
        other = _objectWithoutProperties(_ref, ["openTo", "views", "minDate", "maxDate"]);

    var utils = useUtils();
    var minDate = useParsedDate(__minDate);
    var maxDate = useParsedDate(__maxDate);
    return _objectSpread$8(_objectSpread$8({
      views: views,
      openTo: openTo,
      minDate: minDate,
      maxDate: maxDate
    }, getFormatAndMaskByViews(views, utils)), other);
  }
};
var DatePicker = makePickerWithStateAndWrapper(ResponsiveWrapper, _objectSpread$8({
  name: 'MuiDatePicker'
}, datePickerConfig));
var MobileDatePicker = makePickerWithStateAndWrapper(MobileWrapper, _objectSpread$8({
  name: 'MuiMobileDatePicker'
}, datePickerConfig));
var DesktopDatePicker = makePickerWithStateAndWrapper(DesktopWrapper, _objectSpread$8({
  name: 'MuiDesktopDatePicker'
}, datePickerConfig));
var StaticDatePicker = makePickerWithStateAndWrapper(StaticWrapper, _objectSpread$8({
  name: 'MuiStaticDatePicker'
}, datePickerConfig));

/**
 * @ignore - internal component.
 */

var ClockIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
})), 'Clock');

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function getTextFieldAriaText$1(value, utils) {
  return value && utils.isValid(utils.date(value)) ? "Choose time, selected time is ".concat(utils.format(utils.date(value), 'fullTime')) : 'Choose time';
}

function useInterceptProps(_ref) {
  var ampm = _ref.ampm,
      inputFormat = _ref.inputFormat,
      __maxTime = _ref.maxTime,
      __minTime = _ref.minTime,
      _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'hours' : _ref$openTo,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['hours', 'minutes'] : _ref$views,
      other = _objectWithoutProperties(_ref, ["ampm", "inputFormat", "maxTime", "minTime", "openTo", "views"]);

  var utils = useUtils();
  var minTime = useParsedDate(__minTime);
  var maxTime = useParsedDate(__maxTime);
  var willUseAmPm = ampm !== null && ampm !== void 0 ? ampm : utils.is12HourCycleInCurrentLocale();
  return _objectSpread$9({
    views: views,
    openTo: openTo,
    minTime: minTime,
    maxTime: maxTime,
    ampm: willUseAmPm,
    acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
    mask: '__:__',
    disableMaskedInput: willUseAmPm,
    getOpenDialogAriaText: getTextFieldAriaText$1,
    openPickerIcon: /*#__PURE__*/React__default.createElement(ClockIcon, null),
    inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
      localized: utils.formats.fullTime,
      '12h': utils.formats.fullTime12h,
      '24h': utils.formats.fullTime24h
    })
  }, other);
}

var timePickerConfig = {
  useInterceptProps: useInterceptProps,
  useValidation: makeValidationHook(validateTime),
  DefaultToolbarComponent: TimePickerToolbar
};
var TimePicker = makePickerWithStateAndWrapper(ResponsiveWrapper, _objectSpread$9({
  name: 'MuiTimePicker'
}, timePickerConfig));
var DesktopTimePicker = makePickerWithStateAndWrapper(DesktopWrapper, _objectSpread$9({
  name: 'MuiDesktopTimePicker'
}, timePickerConfig));
var MobileTimePicker = makePickerWithStateAndWrapper(MobileWrapper, _objectSpread$9({
  name: 'MuiMobileTimePicker'
}, timePickerConfig));
var StaticTimePicker = makePickerWithStateAndWrapper(StaticWrapper, _objectSpread$9({
  name: 'MuiStaticTimePicker'
}, timePickerConfig));

/**
 * @ignore - internal component.
 */

var TimeIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
})), 'Time');

/**
 * @ignore - internal component.
 */

var DateRangeIcon = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
}), 'DateRange');

var viewToTabIndex = function viewToTabIndex(openView) {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

var tabIndexToView = function tabIndexToView(tab) {
  if (tab === 'date') {
    return 'date';
  }

  return 'hours';
};

var useStyles$n = styles$1.makeStyles(function (theme) {
  var tabsBackground = theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background["default"];
  return {
    root: {},
    modeDesktop: {
      order: 1
    },
    tabs: {
      color: theme.palette.getContrastText(tabsBackground),
      backgroundColor: tabsBackground
    }
  };
}, {
  name: 'MuiDateTimePickerTabs'
});

var DateTimePickerTabs = function DateTimePickerTabs(props) {
  var _props$dateRangeIcon = props.dateRangeIcon,
      dateRangeIcon = _props$dateRangeIcon === void 0 ? /*#__PURE__*/React.createElement(DateRangeIcon, null) : _props$dateRangeIcon,
      onChange = props.onChange,
      _props$timeIcon = props.timeIcon,
      timeIcon = _props$timeIcon === void 0 ? /*#__PURE__*/React.createElement(TimeIcon, null) : _props$timeIcon,
      view = props.view;
  var classes = useStyles$n();
  var theme = styles$1.useTheme();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';

  var handleChange = function handleChange(e, value) {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return /*#__PURE__*/React.createElement(Paper, {
    className: clsx(classes.root, wrapperVariant === 'desktop' && classes.modeDesktop)
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "fullWidth",
    value: viewToTabIndex(view),
    onChange: handleChange,
    className: classes.tabs,
    indicatorColor: indicatorColor
  }, /*#__PURE__*/React.createElement(Tab, {
    value: "date",
    "aria-label": "pick date",
    icon: /*#__PURE__*/React.createElement(React.Fragment, null, dateRangeIcon)
  }), /*#__PURE__*/React.createElement(Tab, {
    value: "time",
    "aria-label": "pick time",
    icon: /*#__PURE__*/React.createElement(React.Fragment, null, timeIcon)
  })));
};

var muiComponentConfig$6 = {
  name: 'MuiDateTimePickerToolbar'
};
var useStyles$o = styles$1.makeStyles({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-around'
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default'
  },
  timeContainer: {
    display: 'flex'
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  timeTypography: {},
  penIcon: {
    position: 'absolute',
    top: 8,
    right: 8
  }
}, muiComponentConfig$6);
var DateTimePickerToolbar = withDefaultProps(muiComponentConfig$6, function (props) {
  var ampm = props.ampm,
      date = props.date,
      dateRangeIcon = props.dateRangeIcon,
      hideTabs = props.hideTabs,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onChange = props.onChange,
      openView = props.openView,
      setOpenView = props.setOpenView,
      timeIcon = props.timeIcon,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarFormat = props.toolbarFormat,
      _props$toolbarPlaceho = props.toolbarPlaceholder,
      toolbarPlaceholder = _props$toolbarPlaceho === void 0 ? '––' : _props$toolbarPlaceho,
      _props$toolbarTitle = props.toolbarTitle,
      toolbarTitle = _props$toolbarTitle === void 0 ? 'SELECT DATE & TIME' : _props$toolbarTitle,
      other = _objectWithoutProperties(props, ["ampm", "date", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle"]);

  var utils = useUtils();
  var classes = useStyles$o();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var showTabs = wrapperVariant === 'desktop' ? true : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  var formatHours = function formatHours(time) {
    return ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  };

  var dateText = React.useMemo(function () {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    return utils.format(date, 'shortDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, wrapperVariant !== 'desktop' && /*#__PURE__*/React.createElement(PickerToolbar, _extends({
    toolbarTitle: toolbarTitle,
    penIconClassName: classes.penIcon,
    className: classes.root,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView
  }, other, {
    isLandscape: false
  }), /*#__PURE__*/React.createElement("div", {
    className: classes.dateContainer
  }, /*#__PURE__*/React.createElement(ToolbarButton, {
    tabIndex: -1,
    variant: "subtitle1",
    onClick: function onClick() {
      return setOpenView('year');
    },
    selected: openView === 'year',
    value: date ? utils.format(date, 'year') : '–'
  }), /*#__PURE__*/React.createElement(ToolbarButton, {
    tabIndex: -1,
    variant: "h4",
    "data-mui-test": "datetimepicker-toolbar-date",
    onClick: function onClick() {
      return setOpenView('date');
    },
    selected: openView === 'date',
    value: dateText
  })), /*#__PURE__*/React.createElement("div", {
    className: classes.timeContainer
  }, /*#__PURE__*/React.createElement(ToolbarButton, {
    tabIndex: -1,
    variant: "h3",
    "data-mui-test": "hours",
    onClick: function onClick() {
      return setOpenView('hours');
    },
    selected: openView === 'hours',
    value: date ? formatHours(date) : '--',
    typographyClassName: classes.timeTypography
  }), /*#__PURE__*/React.createElement(ToolbarText, {
    variant: "h3",
    value: ":",
    className: classes.separator
  }), /*#__PURE__*/React.createElement(ToolbarButton, {
    tabIndex: -1,
    variant: "h3",
    "data-mui-test": "minutes",
    onClick: function onClick() {
      return setOpenView('minutes');
    },
    selected: openView === 'minutes',
    value: date ? utils.format(date, 'minutes') : '--',
    typographyClassName: classes.timeTypography
  }))), showTabs && /*#__PURE__*/React.createElement(DateTimePickerTabs, {
    dateRangeIcon: dateRangeIcon,
    timeIcon: timeIcon,
    view: openView,
    onChange: setOpenView
  }));
});

function validateDateAndTime(utils, value, _ref) {
  var minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disableFuture = _ref.disableFuture,
      shouldDisableDate = _ref.shouldDisableDate,
      disablePast = _ref.disablePast,
      timeValidationProps = _objectWithoutProperties(_ref, ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"]);

  var dateValidationResult = validateDate(utils, value, {
    minDate: minDate,
    maxDate: maxDate,
    disableFuture: disableFuture,
    shouldDisableDate: shouldDisableDate,
    disablePast: disablePast
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime(utils, value, timeValidationProps);
}

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useInterceptProps$1(_ref) {
  var ampm = _ref.ampm,
      inputFormat = _ref.inputFormat,
      _ref$maxDate = _ref.maxDate,
      __maxDate = _ref$maxDate === void 0 ? defaultMaxDate : _ref$maxDate,
      __maxDateTime = _ref.maxDateTime,
      __maxTime = _ref.maxTime,
      _ref$minDate = _ref.minDate,
      __minDate = _ref$minDate === void 0 ? defaultMinDate : _ref$minDate,
      __minDateTime = _ref.minDateTime,
      __minTime = _ref.minTime,
      _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'date' : _ref$openTo,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? 'portrait' : _ref$orientation,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['year', 'date', 'hours', 'minutes'] : _ref$views,
      other = _objectWithoutProperties(_ref, ["ampm", "inputFormat", "maxDate", "maxDateTime", "maxTime", "minDate", "minDateTime", "minTime", "openTo", "orientation", "views"]);

  var utils = useUtils();
  var minTime = useParsedDate(__minTime);
  var maxTime = useParsedDate(__maxTime);
  var minDate = useParsedDate(__minDate);
  var maxDate = useParsedDate(__maxDate);
  var minDateTime = useParsedDate(__minDateTime);
  var maxDateTime = useParsedDate(__maxDateTime);
  var willUseAmPm = ampm !== null && ampm !== void 0 ? ampm : utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return _objectSpread$a({
    openTo: openTo,
    views: views,
    ampm: willUseAmPm,
    ampmInClock: true,
    orientation: orientation,
    showToolbar: true,
    showTabs: true,
    allowSameDateSelection: true,
    minDate: minDateTime || minDate,
    minTime: minDateTime || minTime,
    maxDate: maxDateTime || maxDate,
    maxTime: maxDateTime || maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: '__/__/____ __:__',
    disableMaskedInput: willUseAmPm,
    inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
      localized: utils.formats.keyboardDateTime,
      '12h': utils.formats.keyboardDateTime12h,
      '24h': utils.formats.keyboardDateTime24h
    })
  }, other);
}

var useValidation = makeValidationHook(validateDateAndTime);
var dateTimePickerConfig = {
  useInterceptProps: useInterceptProps$1,
  useValidation: useValidation,
  DefaultToolbarComponent: DateTimePickerToolbar
};
var DateTimePicker = makePickerWithStateAndWrapper(ResponsiveWrapper, _objectSpread$a({
  name: 'MuiDateTimePicker'
}, dateTimePickerConfig));
var DesktopDateTimePicker = makePickerWithStateAndWrapper(DesktopWrapper, _objectSpread$a({
  name: 'MuiDesktopDateTimePicker'
}, dateTimePickerConfig));
var MobileDateTimePicker = makePickerWithStateAndWrapper(MobileWrapper, _objectSpread$a({
  name: 'MuiMobileDateTimePicker'
}, dateTimePickerConfig));
var StaticDateTimePicker = makePickerWithStateAndWrapper(StaticWrapper, _objectSpread$a({
  name: 'MuiStaticDateTimePicker'
}, dateTimePickerConfig));

function calculateRangeChange(_ref) {
  var utils = _ref.utils,
      range = _ref.range,
      selectedDate = _ref.newDate,
      currentlySelectingRangeEnd = _ref.currentlySelectingRangeEnd;

  var _range = _slicedToArray(range, 2),
      start = _range[0],
      end = _range[1];

  if (currentlySelectingRangeEnd === 'start') {
    return Boolean(end) && utils.isAfter(selectedDate, end) ? {
      nextSelection: 'end',
      newRange: [selectedDate, null]
    } : {
      nextSelection: 'end',
      newRange: [selectedDate, end]
    };
  }

  return Boolean(start) && utils.isBefore(selectedDate, start) ? {
    nextSelection: 'end',
    newRange: [selectedDate, null]
  } : {
    nextSelection: 'start',
    newRange: [start, selectedDate]
  };
}
function calculateRangePreview(options) {
  if (!options.newDate) {
    return [null, null];
  }

  var _options$range = _slicedToArray(options.range, 2),
      start = _options$range[0],
      end = _options$range[1];

  var _calculateRangeChange = calculateRangeChange(options),
      newRange = _calculateRangeChange.newRange;

  if (!start || !end) {
    return newRange;
  }

  var _newRange = _slicedToArray(newRange, 2),
      previewStart = _newRange[0],
      previewEnd = _newRange[1];

  return options.currentlySelectingRangeEnd === 'end' ? [end, previewEnd] : [previewStart, start];
}

var muiComponentConfig$7 = {
  name: 'MuiPickersDateRangePickerToolbarProps'
};
var useStyles$p = styles$1.makeStyles({
  root: {},
  penIcon: {
    position: 'relative',
    top: 4
  },
  dateTextContainer: {
    display: 'flex'
  }
}, muiComponentConfig$7);
var DateRangePickerToolbar = withDefaultProps(muiComponentConfig$7, function (_ref) {
  var currentlySelectingRangeEnd = _ref.currentlySelectingRangeEnd,
      _ref$date = _slicedToArray(_ref.date, 2),
      start = _ref$date[0],
      end = _ref$date[1],
      endText = _ref.endText,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      setCurrentlySelectingRangeEnd = _ref.setCurrentlySelectingRangeEnd,
      startText = _ref.startText,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      toolbarFormat = _ref.toolbarFormat,
      _ref$toolbarTitle = _ref.toolbarTitle,
      toolbarTitle = _ref$toolbarTitle === void 0 ? 'SELECT DATE RANGE' : _ref$toolbarTitle;

  var utils = useUtils();
  var classes = useStyles$p();
  var startDateValue = start ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate) : startText;
  var endDateValue = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : endText;
  return /*#__PURE__*/React.createElement(PickerToolbar, {
    className: classes.root,
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: false,
    penIconClassName: classes.penIcon
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.dateTextContainer
  }, /*#__PURE__*/React.createElement(ToolbarButton, {
    variant: start !== null ? 'h5' : 'h6',
    value: startDateValue,
    selected: currentlySelectingRangeEnd === 'start',
    onClick: function onClick() {
      return setCurrentlySelectingRangeEnd('start');
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    variant: "h5"
  }, "\xA0", '–', "\xA0"), /*#__PURE__*/React.createElement(ToolbarButton, {
    variant: end !== null ? 'h5' : 'h6',
    value: endDateValue,
    selected: currentlySelectingRangeEnd === 'end',
    onClick: function onClick() {
      return setCurrentlySelectingRangeEnd('end');
    }
  })));
});

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$b(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%'
};
var startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%'
};
var useStyles$q = styles$1.makeStyles(function (theme) {
  return {
    root: {
      '&:first-child $rangeIntervalDayPreview': _objectSpread$b(_objectSpread$b({}, startBorderStyle), {}, {
        borderLeftColor: theme.palette.divider
      }),
      '&:last-child $rangeIntervalDayPreview': _objectSpread$b(_objectSpread$b({}, endBorderStyle), {}, {
        borderRightColor: theme.palette.divider
      })
    },
    rangeIntervalDayHighlight: {
      borderRadius: 0,
      color: theme.palette.primary.contrastText,
      backgroundColor: styles$1.fade(theme.palette.primary.light, 0.6),
      '&:first-child': startBorderStyle,
      '&:last-child': endBorderStyle
    },
    rangeIntervalDayHighlightStart: _objectSpread$b(_objectSpread$b({}, startBorderStyle), {}, {
      paddingLeft: 0,
      marginLeft: DAY_MARGIN / 2
    }),
    rangeIntervalDayHighlightEnd: _objectSpread$b(_objectSpread$b({}, endBorderStyle), {}, {
      paddingRight: 0,
      marginRight: DAY_MARGIN / 2
    }),
    day: {
      // Required to overlap preview border
      transform: 'scale(1.1)',
      '& > *': {
        transform: 'scale(0.9)'
      }
    },
    dayOutsideRangeInterval: {
      '&:hover': {
        border: "1px solid ".concat(theme.palette.grey[500])
      }
    },
    dayInsideRangeInterval: {
      color: theme.palette.getContrastText(styles$1.fade(theme.palette.primary.light, 0.6))
    },
    notSelectedDate: {
      backgroundColor: 'transparent'
    },
    rangeIntervalPreview: {
      // replace default day component margin with transparent border to avoid jumping on preview
      border: '2px solid transparent'
    },
    rangeIntervalDayPreview: {
      borderRadius: 0,
      border: "2px dashed ".concat(theme.palette.divider),
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      '&$rangeIntervalDayPreviewStart': _objectSpread$b({
        borderLeftColor: theme.palette.divider
      }, startBorderStyle),
      '&$rangeIntervalDayPreviewEnd': _objectSpread$b({
        borderRightColor: theme.palette.divider
      }, endBorderStyle)
    },
    rangeIntervalDayPreviewStart: {},
    rangeIntervalDayPreviewEnd: {}
  };
}, {
  name: 'MuiPickersDateRangeDay'
});
function PureDateRangeDay(props) {
  var className = props.className,
      day = props.day,
      inCurrentMonth = props.inCurrentMonth,
      isEndOfHighlighting = props.isEndOfHighlighting,
      isEndOfPreviewing = props.isEndOfPreviewing,
      isHighlighting = props.isHighlighting,
      isPreviewing = props.isPreviewing,
      isStartOfHighlighting = props.isStartOfHighlighting,
      isStartOfPreviewing = props.isStartOfPreviewing,
      selected = props.selected,
      other = _objectWithoutProperties(props, ["className", "day", "inCurrentMonth", "isEndOfHighlighting", "isEndOfPreviewing", "isHighlighting", "isPreviewing", "isStartOfHighlighting", "isStartOfPreviewing", "selected"]);

  var utils = useUtils();
  var classes = useStyles$q();
  var isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  var isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));
  var shouldRenderHighlight = isHighlighting && inCurrentMonth;
  var shouldRenderPreview = isPreviewing && inCurrentMonth;
  return /*#__PURE__*/React.createElement("div", {
    "data-mui-test": shouldRenderHighlight ? 'DateRangeHighlight' : undefined,
    className: clsx(classes.root, (isEndOfHighlighting || isEndOfMonth) && classes.rangeIntervalDayHighlightEnd, (isStartOfHighlighting || isStartOfMonth) && classes.rangeIntervalDayHighlightStart, shouldRenderHighlight && classes.rangeIntervalDayHighlight)
  }, /*#__PURE__*/React.createElement("div", {
    "data-mui-test": shouldRenderPreview ? 'DateRangePreview' : undefined,
    className: clsx(classes.rangeIntervalPreview, (isEndOfPreviewing || isEndOfMonth) && classes.rangeIntervalDayPreviewEnd, (isStartOfPreviewing || isStartOfMonth) && classes.rangeIntervalDayPreviewStart, shouldRenderPreview && classes.rangeIntervalDayPreview)
  }, /*#__PURE__*/React.createElement(Day, _extends({}, other, {
    disableMargin: true,
    allowSameDateSelection: true,
    allowKeyboardControl: false,
    day: day,
    selected: selected,
    inCurrentMonth: inCurrentMonth,
    "data-mui-test": "DateRangeDay",
    className: clsx(classes.day, className, !selected && [classes.notSelectedDate, isHighlighting && classes.dayInsideRangeInterval], !isHighlighting && classes.dayOutsideRangeInterval)
  }))));
}
PureDateRangeDay.displayName = 'DateRangeDay';
var DateRangeDay = React.memo(PureDateRangeDay, function (prevProps, nextProps) {
  return prevProps.isHighlighting === nextProps.isHighlighting && prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting && prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting && prevProps.isPreviewing === nextProps.isPreviewing && prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing && prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing && areDayPropsEqual(prevProps, nextProps);
});

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$c(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var onlyDateView = ['date'];
function DateRangePickerViewMobile(props) {
  var changeMonth = props.changeMonth,
      date = props.date,
      leftArrowButtonProps = props.leftArrowButtonProps,
      leftArrowButtonText = props.leftArrowButtonText,
      leftArrowIcon = props.leftArrowIcon,
      __minDate = props.minDate,
      __maxDate = props.maxDate,
      onChange = props.onChange,
      rightArrowButtonProps = props.rightArrowButtonProps,
      rightArrowButtonText = props.rightArrowButtonText,
      rightArrowIcon = props.rightArrowIcon,
      _props$renderDay = props.renderDay,
      _renderDay = _props$renderDay === void 0 ? function (_, props) {
    return /*#__PURE__*/React.createElement(DateRangeDay, props);
  } : _props$renderDay,
      other = _objectWithoutProperties(props, ["changeMonth", "date", "leftArrowButtonProps", "leftArrowButtonText", "leftArrowIcon", "minDate", "maxDate", "onChange", "rightArrowButtonProps", "rightArrowButtonText", "rightArrowIcon", "renderDay"]);

  var utils = useUtils();

  var minDate = __minDate || utils.date(defaultMinDate);

  var maxDate = __maxDate || utils.date(defaultMaxDate);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CalendarHeader, _extends({
    view: "date",
    views: onlyDateView,
    changeView: function changeView() {
      return {};
    },
    onMonthChange: changeMonth,
    leftArrowButtonText: leftArrowButtonText,
    leftArrowButtonProps: leftArrowButtonProps,
    leftArrowIcon: leftArrowIcon,
    rightArrowButtonProps: rightArrowButtonProps,
    rightArrowButtonText: rightArrowButtonText,
    rightArrowIcon: rightArrowIcon,
    minDate: minDate,
    maxDate: maxDate
  }, other)), /*#__PURE__*/React.createElement(Calendar, _extends({}, other, {
    date: date,
    onChange: onChange,
    renderDay: function renderDay(day, _, DayProps) {
      return _renderDay(day, _objectSpread$c({
        isPreviewing: false,
        isStartOfPreviewing: false,
        isEndOfPreviewing: false,
        isHighlighting: isWithinRange(utils, day, date),
        isStartOfHighlighting: isStartOfRange(utils, day, date),
        isEndOfHighlighting: isEndOfRange(utils, day, date)
      }, DayProps));
    }
  })));
}

function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$d(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var useStyles$r = styles$1.makeStyles(function (theme) {
  return {
    root: _defineProperty({
      display: 'flex',
      alignItems: 'baseline'
    }, theme.breakpoints.down('xs'), {
      flexDirection: 'column',
      alignItems: 'center'
    }),
    toLabelDelimiter: _defineProperty({
      margin: '8px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '0 16px'
    })
  };
}, {
  name: 'MuiPickersDateRangePickerInput'
});
var DateRangePickerInput = function DateRangePickerInput(_ref) {
  var containerRef = _ref.containerRef,
      currentlySelectingRangeEnd = _ref.currentlySelectingRangeEnd,
      disableOpenPicker = _ref.disableOpenPicker,
      endText = _ref.endText,
      forwardedRef = _ref.forwardedRef,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      open = _ref.open,
      openPicker = _ref.openPicker,
      rawValue = _ref.rawValue,
      _ref$rawValue = _slicedToArray(_ref.rawValue, 2),
      start = _ref$rawValue[0],
      end = _ref$rawValue[1],
      readOnly = _ref.readOnly,
      renderInput = _ref.renderInput,
      setCurrentlySelectingRangeEnd = _ref.setCurrentlySelectingRangeEnd,
      startText = _ref.startText,
      TextFieldProps = _ref.TextFieldProps,
      _ref$validationError = _slicedToArray(_ref.validationError, 2),
      startValidationError = _ref$validationError[0],
      endValidationError = _ref$validationError[1],
      other = _objectWithoutProperties(_ref, ["containerRef", "currentlySelectingRangeEnd", "disableOpenPicker", "endText", "forwardedRef", "onBlur", "onChange", "open", "openPicker", "rawValue", "rawValue", "readOnly", "renderInput", "setCurrentlySelectingRangeEnd", "startText", "TextFieldProps", "validationError"]);

  var utils = useUtils();
  var classes = useStyles$r();
  var startRef = React.useRef(null);
  var endRef = React.useRef(null);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  React.useEffect(function () {
    if (!open) {
      return;
    }

    if (currentlySelectingRangeEnd === 'start') {
      var _startRef$current;

      (_startRef$current = startRef.current) === null || _startRef$current === void 0 ? void 0 : _startRef$current.focus();
    } else if (currentlySelectingRangeEnd === 'end') {
      var _endRef$current;

      (_endRef$current = endRef.current) === null || _endRef$current === void 0 ? void 0 : _endRef$current.focus();
    }
  }, [currentlySelectingRangeEnd, open]); // TODO: rethink this approach. We do not need to wait for calendar to be updated to rerender input (looks like freezing)
  // TODO: so simply break 1 react's commit phase in 2 (first for input and second for calendars) by executing onChange in the next tick

  var lazyHandleChangeCallback = React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return executeInTheNextEventLoopTick(function () {
      return onChange.apply(void 0, args);
    });
  }, [onChange]);

  var handleStartChange = function handleStartChange(date, inputString) {
    lazyHandleChangeCallback([date, utils.date(end)], inputString);
  };

  var handleEndChange = function handleEndChange(date, inputString) {
    lazyHandleChangeCallback([utils.date(start), date], inputString);
  };

  var openRangeStartSelection = function openRangeStartSelection() {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
    }

    if (!disableOpenPicker) {
      openPicker();
    }
  };

  var openRangeEndSelection = function openRangeEndSelection() {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }

    if (!disableOpenPicker) {
      openPicker();
    }
  };

  var openOnFocus = wrapperVariant === 'desktop';
  var startInputProps = useMaskedInput(_objectSpread$d(_objectSpread$d({}, other), {}, {
    readOnly: readOnly,
    rawValue: start,
    onChange: handleStartChange,
    label: startText,
    validationError: startValidationError !== null,
    TextFieldProps: _objectSpread$d(_objectSpread$d({}, TextFieldProps), {}, {
      ref: startRef,
      variant: 'outlined',
      focused: open && currentlySelectingRangeEnd === 'start'
    }),
    inputProps: {
      onClick: !openOnFocus ? openRangeStartSelection : undefined,
      onFocus: openOnFocus ? openRangeStartSelection : undefined
    }
  }));
  var endInputProps = useMaskedInput(_objectSpread$d(_objectSpread$d({}, other), {}, {
    readOnly: readOnly,
    label: endText,
    rawValue: end,
    onChange: handleEndChange,
    validationError: endValidationError !== null,
    TextFieldProps: _objectSpread$d(_objectSpread$d({}, TextFieldProps), {}, {
      ref: endRef,
      variant: 'outlined',
      focused: open && currentlySelectingRangeEnd === 'end'
    }),
    inputProps: {
      onClick: !openOnFocus ? openRangeEndSelection : undefined,
      onFocus: openOnFocus ? openRangeEndSelection : undefined
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    onBlur: onBlur,
    className: classes.root,
    ref: mergeRefs([containerRef, forwardedRef])
  }, renderInput(startInputProps, endInputProps));
};
process.env.NODE_ENV !== "production" ? DateRangePickerInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func
} : void 0;

function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$e(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var useStyles$s = styles$1.makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row'
    },
    rangeCalendarContainer: {
      '&:not(:last-child)': {
        borderRight: "2px solid ".concat(theme.palette.divider)
      }
    },
    calendar: {
      minWidth: 312,
      minHeight: 288
    },
    arrowSwitcher: {
      padding: '16px 16px 8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  };
}, {
  name: 'MuiPickersDesktopDateRangeCalendar'
});

function getCalendarsArray(calendars) {
  switch (calendars) {
    case 1:
      return [0];

    case 2:
      return [0, 0];

    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars

    default:
      return new Array(calendars).fill(0);
  }
}

function DateRangePickerViewDesktop(props) {
  var date = props.date,
      _props$calendars = props.calendars,
      calendars = _props$calendars === void 0 ? 2 : _props$calendars,
      changeMonth = props.changeMonth,
      leftArrowButtonProps = props.leftArrowButtonProps,
      leftArrowButtonText = props.leftArrowButtonText,
      leftArrowIcon = props.leftArrowIcon,
      rightArrowButtonProps = props.rightArrowButtonProps,
      rightArrowButtonText = props.rightArrowButtonText,
      rightArrowIcon = props.rightArrowIcon,
      onChange = props.onChange,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      __minDate = props.minDate,
      __maxDate = props.maxDate,
      currentlySelectingRangeEnd = props.currentlySelectingRangeEnd,
      currentMonth = props.currentMonth,
      _props$renderDay = props.renderDay,
      _renderDay = _props$renderDay === void 0 ? function (_, dateRangeProps) {
    return /*#__PURE__*/React.createElement(DateRangeDay, dateRangeProps);
  } : _props$renderDay,
      other = _objectWithoutProperties(props, ["date", "calendars", "changeMonth", "leftArrowButtonProps", "leftArrowButtonText", "leftArrowIcon", "rightArrowButtonProps", "rightArrowButtonText", "rightArrowIcon", "onChange", "disableFuture", "disablePast", "minDate", "maxDate", "currentlySelectingRangeEnd", "currentMonth", "renderDay"]);

  var utils = useUtils();
  var classes = useStyles$s();

  var minDate = __minDate || utils.date(defaultMinDate);

  var maxDate = __maxDate || utils.date(defaultMaxDate);

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      rangePreviewDay = _React$useState2[0],
      setRangePreviewDay = _React$useState2[1];

  var isNextMonthDisabled = useNextMonthDisabled(currentMonth, {
    disableFuture: disableFuture,
    maxDate: maxDate
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, {
    disablePast: disablePast,
    minDate: minDate
  });
  var previewingRange = calculateRangePreview({
    utils: utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd: currentlySelectingRangeEnd
  });
  var handleDayChange = React.useCallback(function (day) {
    setRangePreviewDay(null);
    onChange(day);
  }, [onChange]);

  var handlePreviewDayChange = function handlePreviewDayChange(newPreviewRequest) {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  var CalendarTransitionProps = React.useMemo(function () {
    return {
      onMouseLeave: function onMouseLeave() {
        return setRangePreviewDay(null);
      }
    };
  }, []);
  var selectNextMonth = React.useCallback(function () {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  var selectPreviousMonth = React.useCallback(function () {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, getCalendarsArray(calendars).map(function (_, index) {
    var monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: classes.rangeCalendarContainer
    }, /*#__PURE__*/React.createElement(ArrowSwitcher, {
      className: classes.arrowSwitcher,
      onLeftClick: selectPreviousMonth,
      onRightClick: selectNextMonth,
      isLeftHidden: index !== 0,
      isRightHidden: index !== calendars - 1,
      isLeftDisabled: isPreviousMonthDisabled,
      isRightDisabled: isNextMonthDisabled,
      leftArrowButtonProps: leftArrowButtonProps,
      leftArrowButtonText: leftArrowButtonText,
      leftArrowIcon: leftArrowIcon,
      rightArrowButtonProps: rightArrowButtonProps,
      rightArrowButtonText: rightArrowButtonText,
      rightArrowIcon: rightArrowIcon,
      text: utils.format(monthOnIteration, 'monthAndYear')
    }), /*#__PURE__*/React.createElement(Calendar, _extends({}, other, {
      key: index,
      date: date,
      className: classes.calendar,
      onChange: handleDayChange,
      currentMonth: monthOnIteration,
      TransitionProps: CalendarTransitionProps,
      renderDay: function renderDay(day, __, DayProps) {
        return _renderDay(day, _objectSpread$e({
          isPreviewing: isWithinRange(utils, day, previewingRange),
          isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
          isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
          isHighlighting: isWithinRange(utils, day, date),
          isStartOfHighlighting: isStartOfRange(utils, day, date),
          isEndOfHighlighting: isEndOfRange(utils, day, date),
          onMouseEnter: function onMouseEnter() {
            return handlePreviewDayChange(day);
          }
        }, DayProps));
      }
    })));
  }));
}

function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$f(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function DateRangePickerView(props) {
  var _props$calendars = props.calendars,
      calendars = _props$calendars === void 0 ? 2 : _props$calendars,
      className = props.className,
      currentlySelectingRangeEnd = props.currentlySelectingRangeEnd,
      date = props.date,
      DateInputProps = props.DateInputProps,
      _props$disableAutoMon = props.disableAutoMonthSwitching,
      disableAutoMonthSwitching = _props$disableAutoMon === void 0 ? false : _props$disableAutoMon,
      disableFuture = props.disableFuture,
      disableHighlightToday = props.disableHighlightToday,
      disablePast = props.disablePast,
      endText = props.endText,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      _props$maxDate = props.maxDate,
      unparsedMaxDate = _props$maxDate === void 0 ? defaultMaxDate : _props$maxDate,
      _props$minDate = props.minDate,
      unparsedMinDate = _props$minDate === void 0 ? defaultMinDate : _props$minDate,
      onDateChange = props.onDateChange,
      onMonthChange = props.onMonthChange,
      open = props.open,
      _props$reduceAnimatio = props.reduceAnimations,
      reduceAnimations = _props$reduceAnimatio === void 0 ? defaultReduceAnimations : _props$reduceAnimatio,
      setCurrentlySelectingRangeEnd = props.setCurrentlySelectingRangeEnd,
      shouldDisableDate = props.shouldDisableDate,
      showToolbar = props.showToolbar,
      startText = props.startText,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarFormat = props.toolbarFormat,
      toolbarTitle = props.toolbarTitle,
      other = _objectWithoutProperties(props, ["calendars", "className", "currentlySelectingRangeEnd", "date", "DateInputProps", "disableAutoMonthSwitching", "disableFuture", "disableHighlightToday", "disablePast", "endText", "isMobileKeyboardViewOpen", "maxDate", "minDate", "onDateChange", "onMonthChange", "open", "reduceAnimations", "setCurrentlySelectingRangeEnd", "shouldDisableDate", "showToolbar", "startText", "toggleMobileKeyboardView", "toolbarFormat", "toolbarTitle"]);

  var now = useNow();
  var utils = useUtils();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var minDate = useParsedDate(unparsedMinDate);
  var maxDate = useParsedDate(unparsedMaxDate);

  var _date = _slicedToArray(date, 2),
      start = _date[0],
      end = _date[1];

  var _useCalendarState = useCalendarState({
    date: start || end || now,
    minDate: minDate,
    maxDate: maxDate,
    reduceAnimations: reduceAnimations,
    disablePast: disablePast,
    disableFuture: disableFuture,
    onMonthChange: onMonthChange,
    shouldDisableDate: shouldDisableDate,
    disableSwitchToMonthOnDayFocus: true
  }),
      changeMonth = _useCalendarState.changeMonth,
      calendarState = _useCalendarState.calendarState,
      isDateDisabled = _useCalendarState.isDateDisabled,
      onMonthSwitchingAnimationEnd = _useCalendarState.onMonthSwitchingAnimationEnd,
      changeFocusedDay = _useCalendarState.changeFocusedDay;

  var toShowToolbar = showToolbar !== null && showToolbar !== void 0 ? showToolbar : wrapperVariant !== 'desktop';

  var scrollToDayIfNeeded = function scrollToDayIfNeeded(day) {
    if (!day || !utils.isValid(day) || isDateDisabled(day)) {
      return;
    }

    var currentlySelectedDate = currentlySelectingRangeEnd === 'start' ? start : end;

    if (currentlySelectedDate === null) {
      // do not scroll if one of ages is not selected
      return;
    }

    var displayingMonthRange = wrapperVariant === 'mobile' ? 0 : calendars - 1;
    var currentMonthNumber = utils.getMonth(calendarState.currentMonth);
    var requestedMonthNumber = utils.getMonth(day);

    if (!utils.isSameYear(calendarState.currentMonth, day) || requestedMonthNumber < currentMonthNumber || requestedMonthNumber > currentMonthNumber + displayingMonthRange) {
      var newMonth = currentlySelectingRangeEnd === 'start' ? currentlySelectedDate : // If need to focus end, scroll to the state when "end" is displaying in the last calendar
      utils.addMonths(currentlySelectedDate, -displayingMonthRange);
      changeMonth(newMonth);
    }
  };

  React.useEffect(function () {
    if (disableAutoMonthSwitching || !open) {
      return;
    }

    scrollToDayIfNeeded(currentlySelectingRangeEnd === 'start' ? start : end);
  }, [currentlySelectingRangeEnd, date]); // eslint-disable-line

  var handleChange = React.useCallback(function (newDate) {
    var _calculateRangeChange = calculateRangeChange({
      newDate: newDate,
      utils: utils,
      range: date,
      currentlySelectingRangeEnd: currentlySelectingRangeEnd
    }),
        nextSelection = _calculateRangeChange.nextSelection,
        newRange = _calculateRangeChange.newRange;

    setCurrentlySelectingRangeEnd(nextSelection);
    var isFullRangeSelected = currentlySelectingRangeEnd === 'end' && isRangeValid(utils, newRange);
    onDateChange(newRange, wrapperVariant, isFullRangeSelected ? 'finish' : 'partial');
  }, [currentlySelectingRangeEnd, date, onDateChange, setCurrentlySelectingRangeEnd, utils, wrapperVariant]);

  var renderView = function renderView() {
    var sharedCalendarProps = _objectSpread$f(_objectSpread$f({
      date: date,
      isDateDisabled: isDateDisabled,
      changeFocusedDay: changeFocusedDay,
      onChange: handleChange,
      reduceAnimations: reduceAnimations,
      disableHighlightToday: disableHighlightToday,
      onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
      changeMonth: changeMonth,
      currentlySelectingRangeEnd: currentlySelectingRangeEnd,
      disableFuture: disableFuture,
      disablePast: disablePast,
      minDate: minDate,
      maxDate: maxDate
    }, calendarState), other);

    switch (wrapperVariant) {
      case 'desktop':
        {
          return /*#__PURE__*/React.createElement(DateRangePickerViewDesktop, _extends({
            calendars: calendars
          }, sharedCalendarProps));
        }

      default:
        {
          return /*#__PURE__*/React.createElement(DateRangePickerViewMobile, sharedCalendarProps);
        }
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, toShowToolbar && /*#__PURE__*/React.createElement(DateRangePickerToolbar, {
    date: date,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    currentlySelectingRangeEnd: currentlySelectingRangeEnd,
    setCurrentlySelectingRangeEnd: setCurrentlySelectingRangeEnd,
    startText: startText,
    endText: endText,
    toolbarTitle: toolbarTitle,
    toolbarFormat: toolbarFormat
  }), isMobileKeyboardViewOpen ? /*#__PURE__*/React.createElement(MobileKeyboardInputView, null, /*#__PURE__*/React.createElement(DateRangePickerInput, _extends({
    disableOpenPicker: true,
    ignoreInvalidInputs: true
  }, DateInputProps))) : renderView());
}
process.env.NODE_ENV !== "production" ? DateRangePickerView.propTypes = {
  calendars: PropTypes.oneOf([1, 2, 3]),
  disableAutoMonthSwitching: PropTypes.bool
} : void 0;

var DateRangeDelimiter = withDefaultProps({
  name: 'MuiPickersDateRangeDelimiter'
}, styles$1.styled(Typography)({
  margin: '0 16px'
}));

function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$g(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var useDateRangeValidation = makeValidationHook(validateDateRange, {
  defaultValidationError: [null, null],
  isSameError: function isSameError(a, b) {
    return a[1] === b[1] && a[0] === b[0];
  }
});
function makeRangePicker(name, Wrapper) {
  var WrapperComponent = makeWrapperComponent(Wrapper, {
    KeyboardDateInputComponent: DateRangePickerInput,
    PureDateInputComponent: DateRangePickerInput
  });
  var rangePickerValueManager = {
    emptyValue: [null, null],
    parseInput: parseRangeInputValue,
    areValuesEqual: function areValuesEqual(utils, a, b) {
      return utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]);
    }
  };

  function RangePickerWithStateAndWrapper(_ref) {
    var calendars = _ref.calendars,
        value = _ref.value,
        onChange = _ref.onChange,
        _ref$mask = _ref.mask,
        mask = _ref$mask === void 0 ? '__/__/____' : _ref$mask,
        _ref$startText = _ref.startText,
        startText = _ref$startText === void 0 ? 'Start' : _ref$startText,
        _ref$endText = _ref.endText,
        endText = _ref$endText === void 0 ? 'End' : _ref$endText,
        passedInputFormat = _ref.inputFormat,
        _ref$minDate = _ref.minDate,
        __minDate = _ref$minDate === void 0 ? defaultMinDate : _ref$minDate,
        _ref$maxDate = _ref.maxDate,
        __maxDate = _ref$maxDate === void 0 ? defaultMaxDate : _ref$maxDate,
        other = _objectWithoutProperties(_ref, ["calendars", "value", "onChange", "mask", "startText", "endText", "inputFormat", "minDate", "maxDate"]);

    var utils = useUtils();
    var minDate = useParsedDate(__minDate);
    var maxDate = useParsedDate(__maxDate);

    var _React$useState = React.useState('start'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        currentlySelectingRangeEnd = _React$useState2[0],
        setCurrentlySelectingRangeEnd = _React$useState2[1];

    var pickerStateProps = _objectSpread$g(_objectSpread$g({}, other), {}, {
      value: value,
      onChange: onChange,
      inputFormat: passedInputFormat || utils.formats.keyboardDate
    });

    var restProps = _objectSpread$g(_objectSpread$g({}, other), {}, {
      minDate: minDate,
      maxDate: maxDate
    });

    var _usePickerState = usePickerState(pickerStateProps, rangePickerValueManager),
        pickerProps = _usePickerState.pickerProps,
        inputProps = _usePickerState.inputProps,
        wrapperProps = _usePickerState.wrapperProps;

    var validationError = useDateRangeValidation(value, restProps);

    var DateInputProps = _objectSpread$g(_objectSpread$g(_objectSpread$g({}, inputProps), restProps), {}, {
      currentlySelectingRangeEnd: currentlySelectingRangeEnd,
      setCurrentlySelectingRangeEnd: setCurrentlySelectingRangeEnd,
      startText: startText,
      endText: endText,
      mask: mask,
      validationError: validationError
    });

    return /*#__PURE__*/React.createElement(WrapperComponent, _extends({
      wrapperProps: wrapperProps,
      DateInputProps: DateInputProps
    }, restProps), /*#__PURE__*/React.createElement(DateRangePickerView, _extends({
      open: wrapperProps.open,
      DateInputProps: DateInputProps,
      calendars: calendars,
      currentlySelectingRangeEnd: currentlySelectingRangeEnd,
      setCurrentlySelectingRangeEnd: setCurrentlySelectingRangeEnd,
      startText: startText,
      endText: endText
    }, pickerProps, restProps)));
  }

  process.env.NODE_ENV !== "production" ? RangePickerWithStateAndWrapper.propTypes = {
    value: PropTypes.arrayOf(date).isRequired,
    onChange: PropTypes.func.isRequired,
    startText: PropTypes.node,
    endText: PropTypes.node
  } : void 0;
  var FinalPickerComponent = withDefaultProps({
    name: name
  }, withDateAdapterProp(RangePickerWithStateAndWrapper)); // @ts-ignore @see lib/src/Picker/makePickerWithState.tsx:95

  return React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(FinalPickerComponent, _extends({}, props, {
      forwardedRef: ref
    }));
  });
}
var DateRangePicker = makeRangePicker('MuiPickersDateRangePicker', ResponsiveTooltipWrapper);
var DesktopDateRangePicker = makeRangePicker('MuiDesktopDateRangePicker', DesktopTooltipWrapper);
var MobileDateRangePicker = makeRangePicker('MuiMobileDateRangePicker', MobileWrapper);
var StaticDateRangePicker = makeRangePicker('MuiStaticDateRangePicker', StaticWrapper);

exports.DatePicker = DatePicker;
exports.DatePickerToolbar = DatePickerToolbar;
exports.DateRangeDelimiter = DateRangeDelimiter;
exports.DateRangePicker = DateRangePicker;
exports.DateRangePickerToolbar = DateRangePickerToolbar;
exports.DateTimePicker = DateTimePicker;
exports.DateTimePickerToolbar = DateTimePickerToolbar;
exports.DesktopDatePicker = DesktopDatePicker;
exports.DesktopDateRangePicker = DesktopDateRangePicker;
exports.DesktopDateTimePicker = DesktopDateTimePicker;
exports.DesktopTimePicker = DesktopTimePicker;
exports.LocalizationProvider = LocalizationProvider;
exports.MobileDatePicker = MobileDatePicker;
exports.MobileDateRangePicker = MobileDateRangePicker;
exports.MobileDateTimePicker = MobileDateTimePicker;
exports.MobileTimePicker = MobileTimePicker;
exports.MuiPickersContext = MuiPickersAdapterContext;
exports.PickersBasePickers = Picker$1;
exports.PickersCalendar = Calendar;
exports.PickersCalendarView = CalendarView;
exports.PickersClock = Clock;
exports.PickersClockView = ClockView;
exports.PickersDay = Day;
exports.StaticDatePicker = StaticDatePicker;
exports.StaticDateRangePicker = StaticDateRangePicker;
exports.StaticDateTimePicker = StaticDateTimePicker;
exports.StaticTimePicker = StaticTimePicker;
exports.TimePicker = TimePicker;
exports.TimePickerToolbar = TimePickerToolbar;
exports.getTextFieldAriaText = getTextFieldAriaText$1;
exports.makeRangePicker = makeRangePicker;
exports.useDateRangeValidation = useDateRangeValidation;
exports.usePickerState = usePickerState;
exports.useUtils = useUtils;
//# sourceMappingURL=material-ui-pickers.js.map
