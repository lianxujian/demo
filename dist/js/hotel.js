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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(1);

var _tools = __webpack_require__(0);

var $ = function $(lis) {
	var dom = document.querySelectorAll(lis);
	return dom.length > 1 ? dom : dom[0];
};

//数据返回之前加载动画
_tools.loading.startLoading('.hotel-plugin');

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
	window.location.href = 'index.html';
}, false);

var strOut = (0, _tools.getUrlParams)("checkOutDate");
strOut = strOut.match(/\（(\d*[\u4e00-\u9fa5]*)*离/)[0].slice(1, -1);
$('.hotel-in').innerHTML = (0, _tools.getUrlParams)("checkInDate");
$('.hotel-out').innerHTML = strOut;

//渲染hotel列表
var hotel_data = new Promise(function (resolve, reject) {
	(0, _tools.ajax)({
		url: '../../server/hotel.json',
		callback: function callback(data) {
			resolve(data);
		}
	});
});
function tpl(type, name, price, addr, image, distance, district, stars, id) {
	var ele = '';
	if (type == 'string') {
		ele = '<dl class="hotel-list" data-region="' + district + '" data-stars="' + stars + '" \tdata-price="' + price + '" data-id="' + id + '"/> \n\t\t\t\t\t<dt><img src="' + image + '" alt=""></dt>\n\t\t\t\t\t<dd>\n\t\t\t\t\t\t<h3>' + name + '</h3>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<span><label class="hotel-stars" for="">' + stars + '</label><b>\u793C</b></span>\n\t\t\t\t\t\t\t<span><b>\uFFE5' + price + '</b>\u8D77</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>' + district + '<i class="icon iconfont icon-wifi"></i><i class="icon iconfont icon-tingche"></i></p>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<span>' + addr + '</span>\n\t\t\t\t\t\t\t<span>' + distance.slice(-4, -1) + 'km</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</dd>\n\t\t\t\t</dl>';
	} else if (type == 'dom') {
		ele = document.createElement('dl');
		ele.className = 'hotel-list';
		ele.setAttribute('data-region', district);
		ele.setAttribute('data-stars', stars);
		ele.setAttribute('data-price', price);
		ele.setAttribute('data-id', id);
		ele.innerHTML = '<dt><img src="' + image + '" alt=""></dt>\n\t\t\t\t\t\t<dd>\n\t\t\t\t\t\t\t<h3>' + name + '</h3>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span><label class="hotel-stars" for="">' + stars + '</label><b>\u793C</b></span>\n\t\t\t\t\t\t\t\t<span><b>\uFFE5' + price + '</b>\u8D77</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p>' + district + '<i class="icon iconfont icon-wifi"></i><i class="icon iconfont icon-tingche"></i></p>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span>' + addr + '</span>\n\t\t\t\t\t\t\t\t<span>' + distance.slice(-4, -1) + 'km</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</dd>';
	}
	return ele;
}
hotel_data.then(function (data) {
	var data_list = data.data;
	data_list = data_list.map(function (value, index) {
		return tpl('dom', value.name, value.price, value.addr, value.image, value.tel, value.district, value.stars, value.hotel_id);
	});

	//数据返回停止加载动画
	_tools.loading.stopLoading('.hotel-plugin');
	data_list.forEach(function (ele, index) {
		$('.hotel-content').appendChild(ele);
	});
	//$('.hotel-content').innerHTML=data_list;

	dl_height = $('.hotel-list')[0].offsetHeight;
	//点击.hotel_list跳转页面将id传到地址栏
	btnList();
});
//滚动加载更多
var dl_height = 0;
$('.hotel-content').onscroll = function () {
	var count_height = dl_height * $('.hotel-list').length;
	if (count_height - (this.scrollTop + this.offsetHeight) < 100) {
		(0, _tools.ajax)({
			url: '../../server/hotel.json',
			callback: function callback(data) {
				var data_list = data.data;
				data_list = data_list.map(function (value, index) {
					return tpl('dom', value.name, value.price, value.addr, value.image, value.tel, value.district, value.stars);
				});

				data_list.forEach(function (ele, index) {
					$('.hotel-content').appendChild(ele);
				});
				if ($('.arrange .checkbox-checked')) {
					arrangeFn($('.arrange .checkbox-checked').getAttribute('arrange'));
				}
			}
		});
	}
};

//点击页脚显示隐藏
function resetArrow(a) {
	for (var i = 0; i < $('.hotel-foot p').length; i++) {
		if (a != i) {
			$('.hotel-foot p')[i].childNodes[1].classList.add('icon-shangxiajiantou-copy');
			$('.hotel-foot p')[i].childNodes[1].classList.remove('icon-shangxiajiantou');
		}
	}
}
var screenW = screen.width;

var _loop = function _loop(i) {
	$('.hotel-foot p')[i].addEventListener('click', function () {
		$('.filter-area').style.left = -screenW * i + 'px';
		resetArrow(i);
		if ($('.hotel-foot p')[i].childNodes[1].classList.contains('icon-shangxiajiantou-copy')) {
			$('.filter-area').classList.add('filter-active');
			$('.hotel-foot p')[i].childNodes[1].classList.remove('icon-shangxiajiantou-copy');
			$('.hotel-foot p')[i].childNodes[1].classList.add('icon-shangxiajiantou');
			$('.mask').classList.add('show');
		} else {
			$('.filter-area').classList.remove('filter-active');
			$('.hotel-foot p')[i].childNodes[1].classList.add('icon-shangxiajiantou-copy');
			$('.hotel-foot p')[i].childNodes[1].classList.remove('icon-shangxiajiantou');
			$('.mask').classList.remove('show');
		}
	}, false);
};

for (var i = 0; i < $('.hotel-foot p').length; i++) {
	_loop(i);
}
//点击遮罩层让其隐藏
$('.mask').addEventListener('click', function () {
	$('.mask').classList.remove('show');
	$('.filter-area').classList.remove('filter-active');
	resetArrow(10);
}, false);
//点击筛选
var p = $('.filter-area p');

var _loop2 = function _loop2(i) {
	p[i].addEventListener('click', function () {
		//切换选中不选中
		if (p[i].parentNode.classList.contains('arrange')) {
			//单选
			for (var j = 0; j < $('.arrange').childNodes.length; j++) {
				if ($('.arrange').childNodes[j].nodeType != 3) {
					$('.arrange').childNodes[j].className = 'checkbox';
				}
			}
			p[i].className = 'checkbox-checked';

			var arrange = p[i].getAttribute('arrange');
			arrangeFn(arrange);
		} else {
			//多选
			if (p[i].className != 'checkbox-checked') {
				p[i].className = 'checkbox-checked';
			} else {
				p[i].className = 'checkbox';
			}
		}

		//将选中的名字放到数组中
		var checkbox = document.querySelectorAll('.checkbox-checked');
		var screenItems = {
			region: [],
			stars: []
		};
		for (var _j = 0; _j < checkbox.length; _j++) {
			if (checkbox[_j].getAttribute('region')) {
				screenItems.region.push(checkbox[_j].getAttribute('region'));
			} else if (checkbox[_j].getAttribute('stars')) {
				screenItems.stars.push(checkbox[_j].getAttribute('stars'));
			}
		}
		for (var _j2 in screenItems) {
			if (screenItems[_j2].length == 0) {
				delete screenItems[_j2];
			}
		}

		//遍历hotel列表，根据数组内容让其显示隐藏实现筛选。
		for (var n = 0; n < $('.hotel-list').length; n++) {
			//筛选区域
			$('.hotel-list')[n].classList.remove('none');
			/*let region=$('.hotel-list')[n].getAttribute('data-region');
   let stars=$('.hotel-list')[n].getAttribute('data-stars');*/
			for (var k in screenItems) {
				if (screenItems[k].indexOf($('.hotel-list')[n].getAttribute('data-' + k)) == -1) {
					$('.hotel-list')[n].classList.add('none');
				}
			}
		}
	}, false);
};

for (var i = 0; i < p.length; i++) {
	_loop2(i);
}
function arrangeFn(direction) {
	var dls = Array.from($('.hotel-list'));
	dls = dls.sort(function (a, b) {
		if (direction == 'up') {
			return a.getAttribute('data-price') - b.getAttribute('data-price');
		} else {
			return b.getAttribute('data-price') - a.getAttribute('data-price');
		}
	});
	dls.forEach(function (ele, index) {
		$('.hotel-content').appendChild(ele);
	});
}

//点击.hotel_list跳转页面将id传到地址栏
function btnList() {
	var _loop3 = function _loop3(i) {
		$('.hotel-list')[i].addEventListener('click', function () {
			var hotelIn = $('.hotel-in').innerHTML;
			var hotelOut = $('.hotel-out').innerHTML;
			location.href = 'detail.html?id=' + $('.hotel-list')[i].getAttribute('data-id') + '&hotelIn=' + hotelIn + '&hotelOut=' + hotelOut;
		});
	};

	for (var i = 0; i < $('.hotel-list').length; i++) {
		_loop3(i);
	}
}

/***/ })

/******/ });