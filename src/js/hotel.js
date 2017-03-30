import {Calendar} from '../component/calendar';
import {ajax,getUrlParams,loading} from '../component/tools';

let $=function(lis){
	let dom=document.querySelectorAll(lis);
	return dom.length>1?dom:dom[0];
}

//数据返回之前加载动画
loading.startLoading('.hotel-plugin');

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
	window.location.href='index.html';
},false)

let strOut=getUrlParams("checkOutDate");
strOut=strOut.match(/\（(\d*[\u4e00-\u9fa5]*)*离/)[0].slice(1,-1);
$('.hotel-in').innerHTML=getUrlParams("checkInDate");
$('.hotel-out').innerHTML=strOut;

//渲染hotel列表
let hotel_data=new Promise(function(resolve,reject){
	ajax({
		url:'../../server/hotel.json',
		callback:function(data){
			resolve(data);
		}
	})
})
function tpl(type,name,price,addr,image,distance,district,stars,id){
	let ele='';
	if(type=='string'){
	 	ele=`<dl class="hotel-list" data-region="${district}" data-stars="${stars}" 	data-price="${price}" data-id="${id}"/> 
					<dt><img src="${image}" alt=""></dt>
					<dd>
						<h3>${name}</h3>
						<p>
							<span><label class="hotel-stars" for="">${stars}</label><b>礼</b></span>
							<span><b>￥${price}</b>起</span>
						</p>
						<p>${district}<i class="icon iconfont icon-wifi"></i><i class="icon iconfont icon-tingche"></i></p>
						<p>
							<span>${addr}</span>
							<span>${distance.slice(-4,-1)}km</span>
						</p>
					</dd>
				</dl>`;
	}else if(type=='dom'){
		ele=document.createElement('dl');
		ele.className='hotel-list';
		ele.setAttribute('data-region',district);
		ele.setAttribute('data-stars',stars);
		ele.setAttribute('data-price',price);
		ele.setAttribute('data-id',id);
		ele.innerHTML=`<dt><img src="${image}" alt=""></dt>
						<dd>
							<h3>${name}</h3>
							<p>
								<span><label class="hotel-stars" for="">${stars}</label><b>礼</b></span>
								<span><b>￥${price}</b>起</span>
							</p>
							<p>${district}<i class="icon iconfont icon-wifi"></i><i class="icon iconfont icon-tingche"></i></p>
							<p>
								<span>${addr}</span>
								<span>${distance.slice(-4,-1)}km</span>
							</p>
						</dd>`;
	}
	return ele;
}
hotel_data.then(function(data){
	let data_list=data.data;
	data_list=data_list.map((value,index)=>{
		return tpl('dom',value.name,value.price,value.addr,value.image,value.tel,value.district,value.stars,value.hotel_id)
	})

	//数据返回停止加载动画
	loading.stopLoading('.hotel-plugin');
	data_list.forEach((ele,index)=>{
		$('.hotel-content').appendChild(ele);
	})
	//$('.hotel-content').innerHTML=data_list;
	
	dl_height=$('.hotel-list')[0].offsetHeight;
	//点击.hotel_list跳转页面将id传到地址栏
	btnList();
})
//滚动加载更多
let dl_height=0;
$('.hotel-content').onscroll=function(){
	let count_height=dl_height*$('.hotel-list').length;
	if(count_height-(this.scrollTop+this.offsetHeight)<100){
		ajax({
			url:'../../server/hotel.json',
			callback:function(data){
				let data_list=data.data;
				data_list=data_list.map((value,index)=>{
					return tpl('dom',value.name,value.price,value.addr,value.image,value.tel,value.district,value.stars)
				})

				data_list.forEach((ele,index)=>{
					$('.hotel-content').appendChild(ele);
				})
				if($('.arrange .checkbox-checked')){
					arrangeFn($('.arrange .checkbox-checked').getAttribute('arrange'))
				}
			}
		})
	}
}

//点击页脚显示隐藏
function resetArrow(a){
	for(let i=0;i<$('.hotel-foot p').length;i++){
		if(a!=i){
			$('.hotel-foot p')[i].childNodes[1].classList.add('icon-shangxiajiantou-copy')
			$('.hotel-foot p')[i].childNodes[1].classList.remove('icon-shangxiajiantou')
		}
	}
}
let screenW=screen.width;
for(let i=0;i<$('.hotel-foot p').length;i++){
	$('.hotel-foot p')[i].addEventListener('click',()=>{
		$('.filter-area').style.left=-screenW*i+'px';
		resetArrow(i);
		if($('.hotel-foot p')[i].childNodes[1].classList.contains('icon-shangxiajiantou-copy')){
			$('.filter-area').classList.add('filter-active');
			$('.hotel-foot p')[i].childNodes[1].classList.remove('icon-shangxiajiantou-copy')
			$('.hotel-foot p')[i].childNodes[1].classList.add('icon-shangxiajiantou')
			$('.mask').classList.add('show');
		}else{
			$('.filter-area').classList.remove('filter-active');
			$('.hotel-foot p')[i].childNodes[1].classList.add('icon-shangxiajiantou-copy')
			$('.hotel-foot p')[i].childNodes[1].classList.remove('icon-shangxiajiantou')
			$('.mask').classList.remove('show');
		}
		
	},false)
}
//点击遮罩层让其隐藏
$('.mask').addEventListener('click',()=>{
	$('.mask').classList.remove('show');
	$('.filter-area').classList.remove('filter-active');
	resetArrow(10);
},false)
//点击筛选
let p=$('.filter-area p');
for(let i=0;i<p.length;i++){
	p[i].addEventListener('click',()=>{
		//切换选中不选中
		if(p[i].parentNode.classList.contains('arrange')){
			//单选
			for(let j=0;j<$('.arrange').childNodes.length;j++){
				if($('.arrange').childNodes[j].nodeType!=3){
					$('.arrange').childNodes[j].className='checkbox';
				}
			}
			p[i].className='checkbox-checked';

			let arrange=p[i].getAttribute('arrange');
			arrangeFn(arrange);
		}else{
			//多选
			if(p[i].className!='checkbox-checked'){
				p[i].className='checkbox-checked';
			}else{
				p[i].className='checkbox';
			}
		}
		
		//将选中的名字放到数组中
		let checkbox=document.querySelectorAll('.checkbox-checked');
		let screenItems={
			region:[],
			stars:[]
		};
		for(let j=0;j<checkbox.length;j++){
			if(checkbox[j].getAttribute('region')){
				screenItems.region.push(checkbox[j].getAttribute('region'));
			}else if(checkbox[j].getAttribute('stars')){
				screenItems.stars.push(checkbox[j].getAttribute('stars'));
			}
		}
		for(let j in screenItems){
			if(screenItems[j].length==0){
				delete screenItems[j];
			}
		}

		//遍历hotel列表，根据数组内容让其显示隐藏实现筛选。
		for(let n=0;n<$('.hotel-list').length;n++){
			//筛选区域
			$('.hotel-list')[n].classList.remove('none');
			/*let region=$('.hotel-list')[n].getAttribute('data-region');
			let stars=$('.hotel-list')[n].getAttribute('data-stars');*/
			for(let k in screenItems){
				if(screenItems[k].indexOf($('.hotel-list')[n].getAttribute('data-'+k))==-1){
					$('.hotel-list')[n].classList.add('none');
				}
			}
		}
	},false)
}
function arrangeFn(direction){
	let dls=Array.from($('.hotel-list'));
	dls=dls.sort(function(a,b){
		if(direction=='up'){
			return a.getAttribute('data-price')-b.getAttribute('data-price');
		}else{
			return b.getAttribute('data-price')-a.getAttribute('data-price');
		}
	})
	dls.forEach((ele,index)=>{
		$('.hotel-content').appendChild(ele);
	})	
}

//点击.hotel_list跳转页面将id传到地址栏
function btnList(){
	for(let i=0;i<$('.hotel-list').length;i++){
		$('.hotel-list')[i].addEventListener('click',()=>{
			let hotelIn=$('.hotel-in').innerHTML;
			let hotelOut=$('.hotel-out').innerHTML;
			location.href='detail.html?id='+$('.hotel-list')[i].getAttribute('data-id')+'&hotelIn='+hotelIn+'&hotelOut='+hotelOut;
		})
	}
}

