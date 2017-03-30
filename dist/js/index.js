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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var City = exports.City = function () {
	function City(options) {
		_classCallCheck(this, City);

		var defaults = {
			data: []
		};
		var opt = Object.assign({}, defaults, options);

		this.alphabetWrap = document.querySelector('.city');
		this.cities = document.querySelector('.cities');
		this.detailCity = document.querySelector('.detail-city');
		this.cityPlugin = document.querySelector('.city-plugin');
		this.checkIn = document.querySelector('.check-in-hotel');
		this.back = document.querySelector('.back');
		this.uptop = document.querySelector('.uptop');

		this.render(opt.hotcity, opt.cities);
		this.collectCityHeight();
		this.bindEvent();
	}

	_createClass(City, [{
		key: 'render',
		value: function render(cityList, cities) {

			//render alphabet
			var alphabetWrap = this.alphabetWrap;
			var cityAll = this.cities;
			var detailCity = this.detailCity;
			var empty_str = '',
			    city_str = '',
			    city_detail = '';
			//console.log(cityList)

			//渲染热门城市
			for (var value in cityList) {
				empty_str += '<span>' + cityList[value] + '</span>';
			}

			cities.forEach(function (value, index) {
				//渲染ABCD
				city_str += '<span alpha="' + value.alpha + '">' + value.alpha + '</span>';
				//渲染详情
				city_detail += '<div class="item-top" alpha="' + value.alpha + '">' + value.alpha + '</div>\n\t\t\t\t\t\t<div class="item-bottom">\n\t\t\t\t\t\t\t\t' + value.data.map(function (item, idx) {
					return '<p>' + item[0] + '</p>';
				}).join('') + '\n\t\t\t\t\t\t</div>';
			});

			alphabetWrap.innerHTML = empty_str;
			cityAll.innerHTML = city_str;
			detailCity.innerHTML = city_detail;
		}
	}, {
		key: 'collectCityHeight',
		value: function collectCityHeight() {
			var alphaDom = document.querySelectorAll('[alpha]'); //多个加[],一个不加
			//console.log(alphaDom)
			var height_info = {};
			Array.from(alphaDom).forEach(function (dom, index) {
				height_info[dom.getAttribute('alpha')] = dom.offsetTop;
			});
			this.heightInfo = height_info;
		}
	}, {
		key: 'bindEvent',
		value: function bindEvent() {
			var _this = this;

			this.cities.addEventListener('click', function (e) {
				var target = e.target;
				if (target.tagName == 'SPAN') {
					_this.cityPlugin.scrollTop = _this.heightInfo[target.getAttribute('alpha')];
					//console.log(this.cityPlugin.scrollTop);
				}
			}, false);
			//显示隐藏
			this.checkIn.addEventListener('click', function () {
				_this.show();
				_this.cityPlugin.scrollTop = 0;
			}, false);
			//点ABCD
			this.detailCity.addEventListener('click', function (e) {
				var target = e.target;
				_this.hide();
				_this.uptop.classList.remove('block');
				_this.checkIn.innerHTML = target.innerHTML + '<i class=" icon iconfont icon-gengduo"></i>';
			}, false);
			//点热门城市
			this.alphabetWrap.addEventListener('click', function (e) {
				var target = e.target;
				_this.hide();
				_this.uptop.classList.remove('block');
				_this.checkIn.innerHTML = target.innerHTML + '<i class=" icon iconfont icon-gengduo"></i>';
			}, false);
			//返回
			this.back.addEventListener('click', function () {
				_this.hide();
				_this.uptop.classList.remove('block');
			});
			//返回顶部
			this.uptop.addEventListener('click', function () {
				_this.cityPlugin.scrollTop = 0;
				//this.uptop.classList.add('move');
				_this.uptop.classList.remove('block');
			}, false);
			this.cityPlugin.onscroll = function () {
				var top = _this.cityPlugin.scrollTop;
				if (top > _this.cityPlugin.clientHeight) {
					_this.uptop.classList.add('block');
				} else {
					_this.uptop.classList.remove('block');
				}
			};
		}
	}, {
		key: 'show',
		value: function show() {
			this.cityPlugin.classList.add('plugin-active');
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.cityPlugin.classList.remove('plugin-active');
		}
	}]);

	return City;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.date = date;
function date() {
	//初始化首页默认入住日期
	var checkInDate = document.querySelector('.in-date');
	var checkOutDate = document.querySelector('.out-date');
	var current_date = new Date();
	var cYear = current_date.getFullYear();
	var cMonth = current_date.getMonth() + 1;
	var cDay = current_date.getDate();
	var cTime = current_date.getHours();

	//住店
	if (cTime > 16) {
		current_date = new Date(cYear + '-' + cMonth + '-' + (cDay + 1));
		cYear = current_date.getFullYear();
		cMonth = current_date.getMonth() + 1;
		cDay = current_date.getDate();
	}
	checkInDate.innerHTML = cMonth + '月' + cDay + '日';
	//离店
	var out_date = new Date(cYear + '-' + cMonth + '-' + (cDay + 1));
	var oYear = out_date.getFullYear();
	var oMonth = out_date.getMonth() + 1;
	var oDay = out_date.getDate();
	var oTime = out_date.getHours();
	checkOutDate.innerHTML = '1晚（' + oMonth + '月' + oDay + '日离店）';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.location = location;

var _tools = __webpack_require__(0);

function location() {
	document.querySelector('.location').addEventListener('click', function (e) {
		/*jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location='+36+','+100.6+'&key=RFEBZ-RRS3G-G7QQZ-IPWLE-2VNXQ-DMBZ5&output=jsonp&',function(data){
  	console.log(data)
  }) */
		e.stopPropagation();
		//实现定位
		var git = navigator.geolocation;
		if (git) {
			//watchPosition
			git.getCurrentPosition(function (position) {
				var coords = position.coords;
				alert(coords.latitude + ',' + coords.longitude);
				//根据经纬度定位
				(0, _tools.jsonp)('http://apis.map.qq.com/ws/geocoder/v1/?location=' + coords.latitude + ',' + coords.longitude + '&key=RFEBZ-RRS3G-G7QQZ-IPWLE-2VNXQ-DMBZ5&output=jsonp&', function (data) {
					//返回位置信息
					console.log(data);
				});
				/*// 维度
          coords.latitude,
          // 精度
          coords.longitude*/

				/*document.getElementById('container').style.display='block';
    var searchService,map,markers = [];
    var center = new qq.maps.LatLng(coords.latitude,coords.longitude);
    map = new qq.maps.Map(document.getElementById('container'),{
     center: center,
     zoom: 13
    });
    //设置圆形
    new qq.maps.Circle({
     center:new qq.maps.LatLng(coords.latitude,coords.longitude),
     radius: 2000,
     map: map
    });
    var latlngBounds = new qq.maps.LatLngBounds();
    //调用Poi检索类
    searchService = new qq.maps.SearchService({
     complete : function(results){
         var pois = results.detail.pois;
         for(var i = 0,l = pois.length;i < l; i++){
             var poi = pois[i];
             latlngBounds.extend(poi.latLng);  
             var marker = new qq.maps.Marker({
                 map:map,
                 position: poi.latLng
             });
               marker.setTitle(i+1);
             
             markers.push(marker);
         }
         map.fitBounds(latlngBounds);
     }
    });
    */
			}, function (error) {
				switch (error.code) {
					case error.TIMEOUT:
						console.log("A timeout occured! Please try again!");
						break;
					case error.POSITION_UNAVAILABLE:
						console.log('We can\'t detect your location. Sorry!');
						break;
					case error.PERMISSION_DENIED:
						console.log('Please allow geolocation access for this to work.');
						break;
					case error.UNKNOWN_ERROR:
						console.log('An unknown error occured!');
						break;
				}
				//根据ip地址定位
				(0, _tools.jsonp)('http://apis.map.qq.com/ws/location/v1/ip?key=RFEBZ-RRS3G-G7QQZ-IPWLE-2VNXQ-DMBZ5&output=jsonp&', function (data) {
					console.log(data);
				});
			}, {
				// 指示浏览器获取高精度的位置，默认为false
				enableHighAccuracy: true,
				// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
				timeout: 5000,
				// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
				maximumAge: 3000
			});
		} else {
			alert("Your browser does not support Geolocation!");
		}
	}, false);
}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tools = __webpack_require__(0);

var _city2 = __webpack_require__(3);

var _location = __webpack_require__(5);

var _date = __webpack_require__(4);

var _calendar = __webpack_require__(1);

var $ = function $(lis) {
	var dom = document.querySelectorAll(lis);
	return dom.length > 1 ? dom : dom[0];
};

//实例化日历组件
var calendar = new _calendar.Calendar({
	initDate: new Date(),
	callback: function callback(_inDate, _outDate) {
		//点完成
		document.querySelector('.in-date').innerHTML = _inDate;
		document.querySelector('.out-date').innerHTML = _outDate;
	}
});

var _ref = [document.querySelector('.banner ul'), ''],
    banner = _ref[0],
    str = _ref[1];

var city_data = new Promise(function (resolve, reject) {
	(0, _tools.ajax)({
		url: '../../server/banner.json',
		callback: function callback(data) {
			resolve(data);
		}
	});
});

city_data.then(function (data) {
	data.forEach(function (item, index) {
		str += '<li class="swiper-slide" style="background:url(' + item.url + ');background-size:100% 100%;"><a href="" title="' + item.title + '"></a></li>';
	});
	banner.innerHTML = str;
	new Swiper('.banner', {
		autoplay: 1000,
		loop: true
	});
});

var obj = {};
(0, _tools.ajax)({
	url: '../../server/hotcity.json',
	callback: function callback(data) {
		obj.hotcity = data;
		new _city2.City(obj);
	}
});
(0, _tools.ajax)({
	url: '../../server/cities.json',
	callback: function callback(data) {
		obj.cities = data;
		new _city2.City(obj);
	}
});

//日期
(0, _date.date)();
//location
(0, _location.location)();

//点击搜索酒店
document.querySelector('.sousuo').addEventListener('click', function () {
	var _city = document.querySelector('.check-in-hotel').innerText;
	var _checkIn = document.querySelector('.in-date').innerHTML;
	var _checkOut = document.querySelector('.out-date').innerHTML;
	var _hotel = document.querySelector('.txt').value;
	var str = '?city=' + _city + '&checkInDate=' + _checkIn + '&checkOutDate=' + _checkOut;
	if (_hotel) {
		str += '&hotelName=' + _hotel;
	}
	window.location.href = 'list.html' + str;
}, false);

//点入住日
document.querySelector('.in-date').addEventListener('click', function () {
	calendar.show();
}, false);
//点离店日
document.querySelector('.out-date').addEventListener('click', function () {
	calendar.show();
}, false);

/***/ })
/******/ ]);