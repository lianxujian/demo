export class City{
	constructor(options){
		const defaults={
			data:[]
		};
		const opt=Object.assign({},defaults,options);

		this.alphabetWrap=document.querySelector('.city');
		this.cities=document.querySelector('.cities');
		this.detailCity=document.querySelector('.detail-city');
		this.cityPlugin=document.querySelector('.city-plugin');
		this.checkIn=document.querySelector('.check-in-hotel');
		this.back=document.querySelector('.back');
		this.uptop=document.querySelector('.uptop');

		this.render(opt.hotcity,opt.cities);
		this.collectCityHeight();
		this.bindEvent();
	};
	render(cityList,cities){

		//render alphabet
		let alphabetWrap=this.alphabetWrap;
		let cityAll=this.cities;
		let detailCity=this.detailCity;
		let empty_str='',city_str='',city_detail='';
		//console.log(cityList)
		
		//渲染热门城市
		for(var value in cityList){
			empty_str+=`<span>${cityList[value]}</span>`;
		}
		
		cities.forEach((value,index)=>{
			//渲染ABCD
			city_str+=`<span alpha="${value.alpha}">${value.alpha}</span>`;
			//渲染详情
			city_detail+=`<div class="item-top" alpha="${value.alpha}">${value.alpha}</div>
						<div class="item-bottom">
								${
									value.data.map((item,idx)=>{
										return `<p>${item[0]}</p>`;
									}).join('')
								}
						</div>`
		})
		
		alphabetWrap.innerHTML=empty_str;
		cityAll.innerHTML=city_str;
		detailCity.innerHTML=city_detail;
	}
	collectCityHeight(){
		let alphaDom=document.querySelectorAll('[alpha]');//多个加[],一个不加
		//console.log(alphaDom)
		let height_info={};
		Array.from(alphaDom).forEach((dom,index)=>{
			height_info[dom.getAttribute('alpha')]=dom.offsetTop;
		})
		this.heightInfo=height_info;
	}
	bindEvent(){
		this.cities.addEventListener('click',(e)=>{
			let target=e.target;
			if(target.tagName=='SPAN'){
				this.cityPlugin.scrollTop=this.heightInfo[target.getAttribute('alpha')];
				//console.log(this.cityPlugin.scrollTop);
			}
		},false)
		//显示隐藏
		this.checkIn.addEventListener('click',()=>{
			this.show();
			this.cityPlugin.scrollTop=0;
		},false)
		//点ABCD
		this.detailCity.addEventListener('click',(e)=>{
			let target=e.target;
			this.hide();
			this.uptop.classList.remove('block');
			this.checkIn.innerHTML=target.innerHTML+'<i class=" icon iconfont icon-gengduo"></i>';
		},false)
		//点热门城市
		this.alphabetWrap.addEventListener('click',(e)=>{
			let target=e.target;
			this.hide();
			this.uptop.classList.remove('block');
			this.checkIn.innerHTML=target.innerHTML+'<i class=" icon iconfont icon-gengduo"></i>';
		},false)
		//返回
		this.back.addEventListener('click',()=>{
			this.hide();
			this.uptop.classList.remove('block');
		})
		//返回顶部
		this.uptop.addEventListener('click',()=>{
			this.cityPlugin.scrollTop=0;
			//this.uptop.classList.add('move');
			this.uptop.classList.remove('block');
		},false)
		this.cityPlugin.onscroll=()=>{
			var top=this.cityPlugin.scrollTop;
			if(top>this.cityPlugin.clientHeight){
				this.uptop.classList.add('block');
			}else{
				this.uptop.classList.remove('block');
			}
		}
	}
	show(){
		this.cityPlugin.classList.add('plugin-active');
	}
	hide(){
		this.cityPlugin.classList.remove('plugin-active');
	}
}