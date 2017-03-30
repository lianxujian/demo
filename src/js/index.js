import {ajax} from '../component/tools';
import {City} from '../component/city';
import {location} from './location';
import {date} from './date';
import {Calendar} from '../component/calendar';

let $=function(lis){
	let dom=document.querySelectorAll(lis);
	return dom.length>1?dom:dom[0];
}

//实例化日历组件
let calendar=new Calendar({
	initDate:new Date(),
	callback:function(_inDate,_outDate){
		//点完成
		document.querySelector('.in-date').innerHTML=_inDate;
		document.querySelector('.out-date').innerHTML=_outDate;
	}
})

let [banner,str]=[document.querySelector('.banner ul'),''];
let city_data=new Promise(function(resolve,reject){
	ajax({
		url:'../../server/banner.json',
		callback:function(data){
			resolve(data);
		}
	})
})

city_data.then(function(data){
	data.forEach((item,index)=>{
		str+=`<li class="swiper-slide" style="background:url(${item.url});background-size:100% 100%;"><a href="" title="${item.title}"></a></li>`;
	})
	banner.innerHTML=str;
	new Swiper('.banner',{
		autoplay:1000,
		loop:true
	});
})

let obj={};
ajax({
	url:'../../server/hotcity.json',
	callback:function(data){
		obj.hotcity=data;
		new City(obj);
	}
})
ajax({
	url:'../../server/cities.json',
	callback:function(data){
		obj.cities=data;
		new City(obj);
	}
})

//日期
date();
//location
location();

//点击搜索酒店
document.querySelector('.sousuo').addEventListener('click',function(){
	let _city=document.querySelector('.check-in-hotel').innerText;
	let _checkIn=document.querySelector('.in-date').innerHTML;
	let _checkOut=document.querySelector('.out-date').innerHTML;
	let _hotel=document.querySelector('.txt').value;
	let str='?city='+_city+'&checkInDate='+_checkIn+'&checkOutDate='+_checkOut;
	if(_hotel){
		str+='&hotelName='+_hotel;
	}
	window.location.href='list.html'+str;
},false)

//点入住日
document.querySelector('.in-date').addEventListener('click',()=>{
	calendar.show();
},false)
//点离店日
document.querySelector('.out-date').addEventListener('click',()=>{
	calendar.show();
},false)
