import {getUrlParams,getEle} from '../component/tools';
import {SlideSelector} from '../component/slideSelector';

let $=function(lis){
	let dom=document.querySelectorAll(lis);
	return dom.length>1?dom:dom[0];
}

//根据地址栏参数渲染酒店
if(location.search!=''){
	$(".order-img").src=getUrlParams('hotelImg');
	$('.order-name').innerHTML=getUrlParams('hotelName');
	$('.order-bed').innerHTML=getUrlParams('hotelBed');
	$('.order-price').innerHTML=getUrlParams('hotelPrice');
	$('.live-in').innerHTML=getUrlParams('hotelIn');
	$('.live-out').innerHTML=getUrlParams('hotelOut');
}
//点击hotel-back返回detail页
$('.hotel-back').addEventListener('click',()=>{
	let hotelIn=$('.live-in').innerHTML;
	let hotelOut=$('.live-out').innerHTML;
	location.href='detail.html?id=1&hotelIn='+hotelIn+'&hotelOut='+hotelOut;
},false)

let selector=new SlideSelector();

//点击房间数量
getEle('.room-count').addEventListener('click',function(){
	let ele=this.querySelector('span');
	selector.show({
		list:['1','2','3','4','5','6'],
		title:'房间数量',
		callback:function(data){
			ele.innerHTML=data +'<label class="iconfont icon-gengduo"></label>';
			let info_list=getEle('.info-box');
			let str='';
			for(let i=0;i<data;i++){
				str+=`<p>姓名<input type="text" class="live-name" placeholder="每间只填写一个姓名"></p>
					<p>证件<input type="text" class="live-id"  placeholder="入住人身份证号/护照号"><b>&times;</b></p>`;
			}
			info_list.innerHTML=str;
		}
	});
},false)
//点击到店时间
getEle('.check-in-time').addEventListener('click',function(){
	let ele=this.querySelector('span');
	selector.show({
		list:['16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
		title:'到店时间',
		callback:function(data){
			ele.innerHTML=data +'<label class="iconfont icon-gengduo"></label>';
		}
	})
},false)

//给提交按钮绑定事件
$('.buy-now').addEventListener('click',()=>{
	window.location.href='guarantee.html';
},false)

//点击clear-all
$('.order-page').addEventListener('click',function(e){
	let target=e.target;
	if(target.tagName=='B'){
		target.previousSibling.value='';
	}
})