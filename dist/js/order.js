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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tools = __webpack_require__(0);

var _slideSelector = __webpack_require__(2);

var $ = function $(lis) {
	var dom = document.querySelectorAll(lis);
	return dom.length > 1 ? dom : dom[0];
};

//根据地址栏参数渲染酒店
if (location.search != '') {
	$(".order-img").src = (0, _tools.getUrlParams)('hotelImg');
	$('.order-name').innerHTML = (0, _tools.getUrlParams)('hotelName');
	$('.order-bed').innerHTML = (0, _tools.getUrlParams)('hotelBed');
	$('.order-price').innerHTML = (0, _tools.getUrlParams)('hotelPrice');
	$('.live-in').innerHTML = (0, _tools.getUrlParams)('hotelIn');
	$('.live-out').innerHTML = (0, _tools.getUrlParams)('hotelOut');
}
//点击hotel-back返回detail页
$('.hotel-back').addEventListener('click', function () {
	var hotelIn = $('.live-in').innerHTML;
	var hotelOut = $('.live-out').innerHTML;
	location.href = 'detail.html?id=1&hotelIn=' + hotelIn + '&hotelOut=' + hotelOut;
}, false);

var selector = new _slideSelector.SlideSelector();

//点击房间数量
(0, _tools.getEle)('.room-count').addEventListener('click', function () {
	var ele = this.querySelector('span');
	selector.show({
		list: ['1', '2', '3', '4', '5', '6'],
		title: '房间数量',
		callback: function callback(data) {
			ele.innerHTML = data + '<label class="iconfont icon-gengduo"></label>';
			var info_list = (0, _tools.getEle)('.info-box');
			var str = '';
			for (var i = 0; i < data; i++) {
				str += '<p>\u59D3\u540D<input type="text" class="live-name" placeholder="\u6BCF\u95F4\u53EA\u586B\u5199\u4E00\u4E2A\u59D3\u540D"></p>\n\t\t\t\t\t<p>\u8BC1\u4EF6<input type="text" class="live-id"  placeholder="\u5165\u4F4F\u4EBA\u8EAB\u4EFD\u8BC1\u53F7/\u62A4\u7167\u53F7"><b>&times;</b></p>';
			}
			info_list.innerHTML = str;
		}
	});
}, false);
//点击到店时间
(0, _tools.getEle)('.check-in-time').addEventListener('click', function () {
	var ele = this.querySelector('span');
	selector.show({
		list: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
		title: '到店时间',
		callback: function callback(data) {
			ele.innerHTML = data + '<label class="iconfont icon-gengduo"></label>';
		}
	});
}, false);

//给提交按钮绑定事件
$('.buy-now').addEventListener('click', function () {
	window.location.href = 'guarantee.html';
}, false);

//点击clear-all
$('.order-page').addEventListener('click', function (e) {
	var target = e.target;
	if (target.tagName == 'B') {
		target.previousSibling.value = '';
	}
});

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var SlideSelector = function SlideSelector() {};
SlideSelector.prototype = {
	init: function init() {
		var defaults = {
			container: document.body,
			list: ['1', '2', '3', '4', '5'],
			title: '选择数据'
		};
		var options = Object.assign({}, defaults, this.options);
		this.container = typeof options.container == 'string' ? document.querySelector(options.container) : options.container;
		this.options = options;

		var slideContainer = document.querySelector('.slide-selector');
		if (slideContainer) {
			this.slideContainer = slideContainer;
		} else {
			var _slideContainer = document.createElement('div');
			_slideContainer.className = 'slide-selector';
			this.container.appendChild(_slideContainer);
			this.slideContainer = _slideContainer;
		}
	},
	tpl: function tpl(title, list) {
		return '<div class="slide-wrapper">\n\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t<span class="cancel">\u53D6\u6D88</span>\n\t\t\t\t\t\t<span class="title">' + title + '</span>\n\t\t\t\t\t\t<span class="done">\u786E\u5B9A</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="slide-items">\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t' + list.map(function (value, index) {
			return '<li class="slide-item">' + value + '</li>';
		}).join('') + '\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
	},
	render: function render() {
		var opt = this.options;
		this.slideContainer.innerHTML = this.tpl(opt.title, opt.list);
	},
	bindEvent: function bindEvent() {
		var _this = this;

		//遮罩层绑定事件
		this.slideContainer.addEventListener('click', function (e) {
			var target = e.target;
			if (target.tagName == 'DIV') {
				_this.hide();
			}
		}, false);
		this.cancel.addEventListener('click', function () {
			_this.hide();
		}, false);
		this.done.addEventListener('click', function () {
			_this.hide();
			if (_this.options.list.indexOf(_this.selected_value) == -1) return;
			_this.options.callback(_this.selected_value);
		}, false);
		this.wrap.addEventListener(this.transEnd, function () {
			if (_this.onhide) {
				_this.remove();
			}
		}, false);
		var slide_item = this.wrap.querySelectorAll('.slide-item');
		this.wrap.querySelector('.slide-items').addEventListener('click', function (e) {
			var target = e.target;
			if (target.tagName == 'LI') {
				for (var i = 0; i < slide_item.length; i++) {
					slide_item[i].classList.remove('slide-selected');
				}
				target.classList.add('slide-selected');
				_this.selected_value = target.innerHTML;
			}
		}, false);
	},
	transEnd: function () {
		var bs = document.createElement('bootstrap');
		var transitions = {
			'WebkitTransform': 'webkitTransitionEnd',
			'OTransform': 'oTransitionEnd',
			'MozTransform': 'TransitionEnd',
			'MsTransform': 'msTransitionEnd',
			'transform': 'transitionEnd'
		};
		for (var k in transitions) {
			if (bs.style[k] != undefined) {
				return transitions[k];
			}
		}
	}(),
	show: function show(options) {
		this.options = options;
		//根据show传进来的配置进行后续操作
		this.init();
		this.render();

		this.slideContainer.classList.remove('none');
		var wrap = this.slideContainer.querySelector('.slide-wrapper');
		this.cancel = wrap.querySelector('.cancel');
		this.done = wrap.querySelector('.done');
		this.wrap = wrap;
		setTimeout(function () {
			wrap.classList.add('slide-wrapper-show');
		}, 10);

		this.bindEvent();
	},
	hide: function hide() {
		this.onhide = true;
		this.wrap.classList.remove('slide-wrapper-show');
	},
	remove: function remove() {
		this.slideContainer.classList.add('none');
		this.onhide = false;
	}
};
exports.SlideSelector = SlideSelector;

/***/ })

/******/ });