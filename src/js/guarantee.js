import {getUrlParams,getEle} from '../component/tools';
import {SlideSelector} from '../component/slideSelector';

let selector=new SlideSelector();

//点击银行
getEle('.bank').addEventListener('click',function(){
	let ele=this.querySelector('span');
	selector.show({
		list:['工商银行','建设银行','农业银行','交通银行','广大银行','浦发银行'],
		title:'发卡银行',
		callback:function(data){
			ele.innerHTML=data +'<label class="iconfont icon-gengduo"></label>';
		}
	})
},false)

//点击证件类型
getEle('.id-card').addEventListener('click',function(){
	let ele=this.querySelector('span');
	selector.show({
		list:['身份证','学生证','结婚证','驾驶证','残疾证'],
		title:'证件类型',
		callback:function(data){
			ele.innerHTML=data +'<label class="iconfont icon-gengduo"></label>';
		}
	})
},false)

//点击返回
getEle('.hotel-back').addEventListener('click',()=>{
	window.location.href='order.html';
},false)

//点击clear-all
getEle('.order-page').addEventListener('click',function(e){
	let target=e.target;
	if(target.tagName=='B'){
		target.previousSibling.value='';
	}
})