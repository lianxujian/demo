import {Calendar} from '../component/calendar';
import {ajax,getUrlParams,loading} from '../component/tools';

let $=function(lis){
	let dom=document.querySelectorAll(lis);
	return dom.length>1?dom:dom[0];
}

//点击查看图集
$('.more-pic').addEventListener('click',()=>{

	$('.all-img').classList.remove('none');
	$('.mask').classList.remove('none');
	if($('.swiper-wrapper')) return;
	//数据返回之前加载动画
	loading.startLoading('.container');
	
	ajax({
		url:'../../server/banner.json',
		callback:function(data){

			loading.stopLoading('.container');
			let str='';
			data.forEach(function(value,index){
				str+=`<li class="swiper-slide"><img src="${value.url}" alt=""></li>`
			})
			$('.more-banner').innerHTML=`<ul class="swiper-wrapper">${str}</ul>`;
			
			new Swiper('.more-banner',{
				/*autoplay:1000,
				loop:true*/
			});
		}
	})
},false)

$('.mask').addEventListener('click',function(){
	$('.order-page').classList.add('none');
	$('.all-img').classList.add('none');
	$('.mask').classList.add('none');
},false)

//实例化日历组件
let calendar=new Calendar({
	initDate:new Date(),
	callback:function(a,b){
		$('.hotel-in').innerHTML=a;
		$('.hotel-out').innerHTML=b.match(/\（(\d*[\u4e00-\u9fa5]*)*离/)[0].slice(1,-1);
	}
})

//点击修改
$('.recompose').addEventListener('click',function(){
	calendar.show();
},false)
//点击返回
$('.hotel-back').addEventListener('click',function(){
	let time=new Date(),y=time.getMonth()+1,d=time.getDate();
	window.location.href='list.html?checkInDate='+y+'月'+d+'日&checkOutDate=1晚（'+y+'月'+(d+1)+'日离店）';
},false)

//渲染详情
let hotel_data=new Promise(function(resolve,reject){
	ajax({
		url:'../../server/hotel.json',
		callback:function(data){
			resolve(data);
		}
	})
})
hotel_data.then(function(data){
	let data_list=data.data;
	let id=getUrlParams('id')-1;
	//渲染banner
	$('.banner img').src=data_list[id].image;
	$('.base-news').innerHTML=`<h3>${data_list[id].name}</h3>
					<p><i class="icon iconfont icon-ds"></i>星级：<label for="">${data_list[id].stars}</label>级酒店</p>
					<p><i class="icon iconfont icon-phone"></i>电话：<label for="">${data_list[id].tel}</label></p>
					<p><i class="icon iconfont icon-dingwei"></i>地址：<label for="">${data_list[id].addr}</label></p>`;
});

//基本信息、酒店介绍切换
for(let i=0;i<$('.nav-detail div').length;i++){
	$('.nav-detail div')[i].onclick=function(){
		for(let j=0;j<$('.nav-detail div').length;j++){
			$('.nav-box div')[j].classList.add('none');
			$('.nav-detail div')[j].classList.remove('detail-active');
		}
		$('.nav-box div')[i].classList.remove('none');
		$('.nav-detail div')[i].classList.add('detail-active');
	}
}
//点击预订显示订单信息
for(let i=0;i<$('.book').length;i++){
	$('.book')[i].addEventListener('click',()=>{
		let houseType=$('.book')[i].parentNode.childNodes[1].childNodes[1].innerHTML;
		let housePrice=$('.book')[i].previousSibling.previousSibling.innerHTML;
		
		$('.order-page').classList.remove('none');
		$('.mask').classList.remove('none');
		$('.house-type').innerHTML=houseType;
		$('.house-price').innerHTML=housePrice;
		$('.house-img').src=$('.banner').childNodes[1].src;
	},false)
}
//点击close关闭订单消息
$('.close').addEventListener('click',()=>{
	$('.order-page').classList.add('none');
	$('.mask').classList.add('none');
},false)

//点立即预订
$('.order-now').addEventListener('click',()=>{

	window.location.href='order.html?hotelName='+$('.base-news h3').innerHTML+'&hotelBed='+$('.house-type').innerHTML+'&hotelPrice='+$('.house-price').innerHTML+'&hotelImg='+$('.house-img').src+'&hotelIn='+$('.hotel-in').innerHTML+'&hotelOut='+$('.hotel-out').innerHTML;
},false)

//渲染时间
$('.hotel-in').innerHTML=getUrlParams('hotelIn');
$('.hotel-out').innerHTML=getUrlParams('hotelOut');

//显示更多type-list
$('.type-more').addEventListener('click',()=>{
	$('.type-box').style.height="auto";
	$('.type-more').classList.add('none');
},false)

//显示更多rim-list
$('.list-more').addEventListener('click',()=>{
	$('.list-box').style.height="auto";
	$('.list-more').classList.add('none');
},false)

//显示更多special-list
$('.special-more').addEventListener('click',()=>{
	$('.special-box').style.height="auto";
	$('.special-more').classList.add('none');
},false)