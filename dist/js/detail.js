/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function ajax(options) {
	var defaults = {
		type: 'get',
		url: '',
		params: null,
		callback: function callback() {}
	};
	var obj = Object.assign({}, defaults, options);
	var xhr = new XMLHttpRequest();
	if (obj.type == "get" && obj.params) {
		var params_str = '';
		for (var i in obj.params) {
			params_str += i + '=' + obj.params[i];
		}
		xhr.open(obj.type, obj.url + "?" + params_str, true);
		xhr.send();
	} else {
		xhr.open(obj.type, obj.url, true);
		xhr.send(obj.params);
	}

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			obj.callback(JSON.parse(xhr.responseText));
		}
	};
}
function jsonp(url, callback) {
	window.jsonp_callback = function (data) {
		callback(data);
	};
	var s = document.createElement('script');
	s.src = url + "&callback=jsonp_callback";
	document.querySelector('body').appendChild(s);
}
function getUrlParams(str) {
	var tmp = decodeURIComponent(location.search).split("?")[1];
	var arr = tmp.split('&');
	var obj = {};
	for (var i = 0; i < arr.length; i++) {
		var res = arr[i].split('=');
		obj[res[0]] = res[1];
	}
	return str ? obj[str] : obj;
}

var loadingAnimate = function loadingAnimate() {
	var tpl = '<div class="circle-wrap">\n\t\t\t\t<div class="circle circle-index1"></div>\n\t\t\t\t<div class="circle circle-index2"></div>\n\t\t\t\t<div class="circle circle-index3"></div>\n\t\t\t\t<div class="circle circle-index4"></div>\n\t\t\t\t<div class="circle circle-index5"></div>\n\t\t\t\t<div class="circle circle-index6"></div>\n\t\t\t\t<div class="circle circle-index7"></div>\n\t\t\t\t<div class="circle circle-index8"></div>\n\t\t\t</div>';
	var load = document.createElement('div');
	load.className = 'loading';
	load.innerHTML = tpl;

	this.startLoading = function (container) {
		var parentDom = void 0;
		if (typeof container == 'string') {
			parentDom = document.querySelector(container);
		} else if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) == 'object') {
			parentDom = container;
		} else {
			parentDom = document.querySelector('.container');
		}
		this.parentDom = parentDom;
		this.parentDom.appendChild(load);
	};
	this.stopLoading = function () {
		this.parentDom.removeChild(load);
		if (document.querySelector('.hotel-content')) {
			document.querySelector('.hotel-content').innerHTML = '';
		}
	};
};
var loading = new loadingAnimate();

var getEle = function getEle(cls) {
	var ele = document.querySelectorAll(cls);
	if (!Node.prototype.bind) {
		Node.prototype.bind = function (event, ele, callback) {
			this.addEventListener('click', function (e) {
				if (e.target.tagName.toLowerCase() == ele) {
					callback(e, ele);
				}
			}, false);
		};
	}
	if (!NodeList.prototype.bind) {
		NodeList.prototype.bind = function (event, ele, callback) {
			this.addEventListener('click', function () {
				callback(ele, index);
			}, false);
		};
	}
	if (ele.length == 1) {
		return ele[0];
	} else {
		return ele;
	}
};

exports.ajax = ajax;
exports.jsonp = jsonp;
exports.getUrlParams = getUrlParams;
exports.loading = loading;
exports.getEle = getEle;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calendar = exports.Calendar = function () {
	function Calendar(options) {
		_classCallCheck(this, Calendar);

		if (options.callback) this.callback = options.callback;

		this.year = options.initDate.getFullYear();
		this.month = options.initDate.getMonth() + 1;
		this.date = options.initDate.getDate();
		this.calendarPlugin = document.querySelector('.calendar-plugin');
		this.calendarMonths = document.querySelector('.calendar-months');
		this.calendarBack = document.querySelector('.header .back');
		this.prev = document.querySelector('.year-month .prev');
		this.next = document.querySelector('.year-month .next');
		this.yearMonthItems = document.querySelector('.year-month-items');
		this.done = document.querySelector('.done');
		this.liveInDate = document.querySelector('.live-in-date');
		this.reduce = document.querySelector('.reduce');
		this.count = document.querySelector('.count');
		this.add = document.querySelector('.add');

		this.render(this.year, this.month);
		this.bindEvent();
	}
	//当月共有多少天


	_createClass(Calendar, [{
		key: 'daysInOneMonth',
		value: function daysInOneMonth(year, month) {
			var d31 = [1, 3, 5, 7, 8, 10, 12],
			    d30 = [4, 6, 9, 11],
			    days = 31;
			month = month * 1;
			year = year * 1;
			if (month == 2) {
				if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
					days = 29;
				} else {
					days = 28;
				}
			} else {
				if (d31.indexOf(month) > -1) {
					days = 31;
				} else if (d30.indexOf(month) > -1) {
					days = 30;
				}
			}
			return days;
		}
		//当月1号是星期几;

	}, {
		key: 'startInOneMonth',
		value: function startInOneMonth(year, month) {
			var date = new Date(year, month - 1, 1);
			return date.getDay();
		}
		//渲染上个月

	}, {
		key: 'renderPrevMonth',
		value: function renderPrevMonth(year, month) {
			var prevMonth = new Date(year, month - 2);
			//上个月多少天（最后一天几号）
			var prevMonthDays = this.daysInOneMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
			//当月1号是星期几（显示上个月多少天）
			var leftDays = this.startInOneMonth(year, month);
			var str = '';
			while (leftDays > 0) {
				str += '<span class="prev-bg">' + (prevMonthDays - leftDays + 1) + '</span>';
				leftDays--;
			}
			return str;
		}
		//渲染本月

	}, {
		key: 'renderCurrentMonth',
		value: function renderCurrentMonth(year, month) {
			var str = '',
			    start = 1;
			var days = this.daysInOneMonth(year, month);
			while (start <= days) {
				if (start == this.date) {
					str += '<span class="current-active">' + start + '</span>';
				} else {
					str += '<span>' + start + '</span>';
				}
				start++;
			}
			return str;
		}
	}, {
		key: 'render',
		value: function render(year, month) {
			//console.log(this.renderCurrentMonth(year,month))
			this.calendarMonths.innerHTML = this.renderPrevMonth(year, month) + this.renderCurrentMonth(year, month);
			year = new Date(year, month - 1).getFullYear();
			month = new Date(year, month - 1).getMonth();
			this.yearMonthItems.innerHTML = year + '年' + (month + 1) + '月';
			this.liveInDate.innerHTML = this.month + '月' + document.querySelector('.current-active').innerHTML + '日';
		}
		//绑定事件

	}, {
		key: 'bindEvent',
		value: function bindEvent() {
			var _this = this;

			//点返回
			this.calendarBack.addEventListener('click', function () {
				_this.hide();
			}, false);
			//点上个月
			this.prev.addEventListener('click', function () {
				_this.month = _this.month - 1;
				_this.render(_this.year, _this.month);
			}, false);
			//点下个月
			this.next.addEventListener('click', function () {
				_this.month = _this.month + 1;
				_this.render(_this.year, _this.month);
			}, false);
			//点日历每一天
			this.calendarMonths.addEventListener('click', function (e) {
				var target = e.target;
				if (!target.classList.contains('prev-bg')) {
					document.querySelector('.current-active').classList.remove('current-active');
					target.classList.add('current-active');
				}
				_this.liveInDate.innerHTML = _this.month + '月' + document.querySelector('.current-active').innerHTML + '日';
			}, false);
			//点完成 
			this.done.addEventListener('click', function () {
				_this.hide();
				var currentDate = document.querySelector('.current-active').innerHTML;
				var _inDate = _this.month + '月' + currentDate + '日';
				var outMonth = new Date(_this.year, _this.month - 1, currentDate * 1 + _this.count.innerHTML * 1).getMonth() + 1;
				var outDate = new Date(_this.year, _this.month - 1, currentDate * 1 + _this.count.innerHTML * 1).getDate();
				var _outDate = _this.count.innerHTML + '晚（' + outMonth + '月' + outDate + '日离店）';

				if (_this.callback) _this.callback(_inDate, _outDate);
			}, false);
			//点增加
			this.add.addEventListener('click', function () {
				_this.count.innerHTML = _this.count.innerHTML * 1 + 1;
			}, false);
			//点减少
			this.reduce.addEventListener('click', function () {
				_this.count.innerHTML = _this.count.innerHTML * 1 - 1;
				if (_this.count.innerHTML <= 1) {
					_this.count.innerHTML = 1;
				}
			}, false);
		}
	}, {
		key: 'show',
		value: function show() {
			this.calendarPlugin.classList.add('plugin-active');
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.calendarPlugin.classList.remove('plugin-active');
		}
	}]);

	return Calendar;
}();

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(1);

var _tools = __webpack_require__(0);

var $ = function $(lis) {
	var dom = document.querySelectorAll(lis);
	return dom.length > 1 ? dom : dom[0];
};

//点击查看图集
$('.more-pic').addEventListener('click', function () {

	$('.all-img').classList.remove('none');
	$('.mask').classList.remove('none');
	if ($('.swiper-wrapper')) return;
	//数据返回之前加载动画
	_tools.loading.startLoading('.container');

	(0, _tools.ajax)({
		url: '../../server/banner.json',
		callback: function callback(data) {

			_tools.loading.stopLoading('.container');
			var str = '';
			data.forEach(function (value, index) {
				str += '<li class="swiper-slide"><img src="' + value.url + '" alt=""></li>';
			});
			$('.more-banner').innerHTML = '<ul class="swiper-wrapper">' + str + '</ul>';

			new Swiper('.more-banner', {
				/*autoplay:1000,
    loop:true*/
			});
		}
	});
}, false);

$('.mask').addEventListener('click', function () {
	$('.order-page').classList.add('none');
	$('.all-img').classList.add('none');
	$('.mask').classList.add('none');
}, false);

//实例化日历组件
var calendar = new _calendar.Calendar({
	initDate: new Date(),
	callback: function callback(a, b) {
		$('.hotel-in').innerHTML = a;
		$('.hotel-out').innerHTML = b.match(/\（(\d*[\u4e00-\u9fa5]*)*离/)[0].slice(1, -1);
	}
});

//点击修改
$('.recompose').addEventListener('click', function () {
	calendar.show();
}, false);
//点击返回
$('.hotel-back').addEventListener('click', function () {
	var time = new Date(),
	    y = time.getMonth() + 1,
	    d = time.getDate();
	window.location.href = 'list.html?checkInDate=' + y + '月' + d + '日&checkOutDate=1晚（' + y + '月' + (d + 1) + '日离店）';
}, false);

//渲染详情
var hotel_data = new Promise(function (resolve, reject) {
	(0, _tools.ajax)({
		url: '../../server/hotel.json',
		callback: function callback(data) {
			resolve(data);
		}
	});
});
hotel_data.then(function (data) {
	var data_list = data.data;
	var id = (0, _tools.getUrlParams)('id') - 1;
	//渲染banner
	$('.banner img').src = data_list[id].image;
	$('.base-news').innerHTML = '<h3>' + data_list[id].name + '</h3>\n\t\t\t\t\t<p><i class="icon iconfont icon-ds"></i>\u661F\u7EA7\uFF1A<label for="">' + data_list[id].stars + '</label>\u7EA7\u9152\u5E97</p>\n\t\t\t\t\t<p><i class="icon iconfont icon-phone"></i>\u7535\u8BDD\uFF1A<label for="">' + data_list[id].tel + '</label></p>\n\t\t\t\t\t<p><i class="icon iconfont icon-dingwei"></i>\u5730\u5740\uFF1A<label for="">' + data_list[id].addr + '</label></p>';
});

//基本信息、酒店介绍切换

var _loop = function _loop(i) {
	$('.nav-detail div')[i].onclick = function () {
		for (var j = 0; j < $('.nav-detail div').length; j++) {
			$('.nav-box div')[j].classList.add('none');
			$('.nav-detail div')[j].classList.remove('detail-active');
		}
		$('.nav-box div')[i].classList.remove('none');
		$('.nav-detail div')[i].classList.add('detail-active');
	};
};

for (var i = 0; i < $('.nav-detail div').length; i++) {
	_loop(i);
}
//点击预订显示订单信息

var _loop2 = function _loop2(i) {
	$('.book')[i].addEventListener('click', function () {
		var houseType = $('.book')[i].parentNode.childNodes[1].childNodes[1].innerHTML;
		var housePrice = $('.book')[i].previousSibling.previousSibling.innerHTML;

		$('.order-page').classList.remove('none');
		$('.mask').classList.remove('none');
		$('.house-type').innerHTML = houseType;
		$('.house-price').innerHTML = housePrice;
		$('.house-img').src = $('.banner').childNodes[1].src;
	}, false);
};

for (var i = 0; i < $('.book').length; i++) {
	_loop2(i);
}
//点击close关闭订单消息
$('.close').addEventListener('click', function () {
	$('.order-page').classList.add('none');
	$('.mask').classList.add('none');
}, false);

//点立即预订
$('.order-now').addEventListener('click', function () {

	window.location.href = 'order.html?hotelName=' + $('.base-news h3').innerHTML + '&hotelBed=' + $('.house-type').innerHTML + '&hotelPrice=' + $('.house-price').innerHTML + '&hotelImg=' + $('.house-img').src + '&hotelIn=' + $('.hotel-in').innerHTML + '&hotelOut=' + $('.hotel-out').innerHTML;
}, false);

//渲染时间
$('.hotel-in').innerHTML = (0, _tools.getUrlParams)('hotelIn');
$('.hotel-out').innerHTML = (0, _tools.getUrlParams)('hotelOut');

//显示更多type-list
$('.type-more').addEventListener('click', function () {
	$('.type-box').style.height = "auto";
	$('.type-more').classList.add('none');
}, false);

//显示更多rim-list
$('.list-more').addEventListener('click', function () {
	$('.list-box').style.height = "auto";
	$('.list-more').classList.add('none');
}, false);

//显示更多special-list
$('.special-more').addEventListener('click', function () {
	$('.special-box').style.height = "auto";
	$('.special-more').classList.add('none');
}, false);

/***/ })
/******/ ]);