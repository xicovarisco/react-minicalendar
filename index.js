"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

var _keyboardArrowUp = _interopRequireDefault(require("material-ui/svg-icons/hardware/keyboard-arrow-up"));

var _keyboardArrowDown = _interopRequireDefault(require("material-ui/svg-icons/hardware/keyboard-arrow-down"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var daysOfTheWeek = [{
  day: 'Sunday',
  abr: 'S'
}, {
  day: 'Monday',
  abr: 'M'
}, {
  day: 'Tuesday',
  abr: 'T'
}, {
  day: 'Wednesday',
  abr: 'W'
}, {
  day: 'Thursday',
  abr: 'T'
}, {
  day: 'Friday',
  abr: 'F'
}, {
  day: 'Saturday',
  abr: 'S'
}];

var GoogleMiniCalendar = function GoogleMiniCalendar() {
  // Declare state variables
  var _useState = (0, _react.useState)((0, _moment["default"])().month()),
      _useState2 = _slicedToArray(_useState, 2),
      month = _useState2[0],
      setMonth = _useState2[1];

  var _useState3 = (0, _react.useState)((0, _moment["default"])().year()),
      _useState4 = _slicedToArray(_useState3, 2),
      year = _useState4[0],
      setYear = _useState4[1]; // Creates an array for the whole month


  var daysOfMonth = _utils.utils.getDaysInMonth(month, year); // Split array into weeks


  var weeksArray = _lodash["default"].chunk(daysOfMonth, 7);

  var renderMiniCalendarDay = function renderMiniCalendarDay(day) {
    var date = day.date,
        outOfMonth = day.outOfMonth;
    return _react["default"].createElement("span", {
      key: date.valueOf(),
      className: "day ".concat(outOfMonth ? 'outMonth' : '', " ").concat(_utils.utils.isToday(date) ? 'today' : ''),
      onClick: function onClick() {
        if (outOfMonth) setMonth(new Date(date).getMonth());
      }
    }, date.getDate());
  };

  var renderMiniCalendarRow = function renderMiniCalendarRow(week, key) {
    // Function to render each row of the month
    return _react["default"].createElement("div", {
      className: "weekRow",
      key: "week-".concat(key)
    }, _lodash["default"].map(week, function (day) {
      return renderMiniCalendarDay(day);
    }));
  };

  return _react["default"].createElement("div", {
    className: "miniCalendar"
  }, _react["default"].createElement("div", {
    className: "monthHeader"
  }, _react["default"].createElement("p", null, "".concat((0, _moment["default"])().month(month).format('MMMM'), " ").concat(year)), _react["default"].createElement("div", {
    className: "monthControls"
  }, _react["default"].createElement(_keyboardArrowUp["default"], {
    style: {
      width: 20,
      height: 20
    },
    color: "#666",
    onClick: function onClick() {
      var newMonth = month;
      newMonth += 1;

      if (month === 11) {
        newMonth = 0;
        setYear(year + 1);
      }

      setMonth(newMonth);
    }
  }), _react["default"].createElement(_keyboardArrowDown["default"], {
    style: {
      width: 20,
      height: 20
    },
    color: "#666",
    onClick: function onClick() {
      var newMonth = month;
      newMonth -= 1;

      if (month === 0) {
        newMonth = 11;
        setYear(year - 1);
      }

      setMonth(newMonth);
    }
  }))), _react["default"].createElement("div", {
    className: "monthContent"
  }, _react["default"].createElement("div", {
    className: "weeks"
  }, _lodash["default"].map(daysOfTheWeek, function (_ref) {
    var day = _ref.day,
        abr = _ref.abr;
    return _react["default"].createElement("span", {
      key: day
    }, abr);
  })), _react["default"].createElement("div", {
    className: "days"
  }, _lodash["default"].map(weeksArray, function (week, key) {
    return renderMiniCalendarRow(week, key);
  }))));
};

var _default = GoogleMiniCalendar;
exports["default"] = _default;
"use strict";

var utils = {
  getDaysInMonth: function getDaysInMonth(month, year) {
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];

    while (date.getMonth() === month) {
      var dayOfWeek = date.getDay(); // It should add some days at the beggining of the array from last month
      // This is useful for displaying purposes

      if (days.length === 0 && dayOfWeek !== 0) {
        for (var r = dayOfWeek; r > 0; r -= 1) {
          var d = new Date(date);
          var dateToAdd = new Date(d.setDate(d.getDate() - r));
          days.push({
            date: new Date(dateToAdd),
            outOfMonth: true
          });
        }
      }

      days.push({
        date: new Date(date),
        outOfMonth: false
      });
      date.setDate(date.getDate() + 1);
    }

    var lastDayOfMonth = days[days.length - 1].date; // It should add some days at the end of the array from the current month
    // This is useful for displaying purposes

    if (lastDayOfMonth.getDay() !== 6) {
      var numberOfDaysToAdd = 6 - lastDayOfMonth.getDay();

      for (var _r = 1; _r <= numberOfDaysToAdd; _r += 1) {
        var _d = new Date(lastDayOfMonth);

        var _dateToAdd = new Date(_d.setDate(_d.getDate() + _r));

        days.push({
          date: new Date(_dateToAdd),
          outOfMonth: true
        });
      }
    }

    return days;
  },
  isToday: function isToday(someDate) {
    var today = new Date();
    return someDate.getDate() === today.getDate() && someDate.getMonth() === today.getMonth() && someDate.getFullYear() === today.getFullYear();
  }
};
