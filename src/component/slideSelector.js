let SlideSelector=function(){
	
}
SlideSelector.prototype={
	init:function(){
		let defaults={
			container:document.body,
			list:['1','2','3','4','5'],
			title:'选择数据'
		};
		let options=Object.assign({},defaults,this.options);
		this.container=typeof options.container=='string'?document.querySelector(options.container):options.container;
		this.options=options;

		let slideContainer=document.querySelector('.slide-selector');
		if(slideContainer){
			this.slideContainer=slideContainer;
		}else{
			let slideContainer=document.createElement('div');
			slideContainer.className='slide-selector';
			this.container.appendChild(slideContainer);
			this.slideContainer=slideContainer;
		}
	},
	tpl:function(title,list){
		return `<div class="slide-wrapper">
					<div class="header">
						<span class="cancel">取消</span>
						<span class="title">${title}</span>
						<span class="done">确定</span>
					</div>
					<div class="slide-items">
						<ul>
							${
								list.map((value,index)=>{
									return `<li class="slide-item">${value}</li>`;
								}).join('')
							}
						</ul>
					</div>
				</div>`
	},
	render:function(){
		let opt=this.options;
		this.slideContainer.innerHTML=this.tpl(opt.title,opt.list);
	},
	bindEvent:function(){
		//遮罩层绑定事件
		this.slideContainer.addEventListener('click',(e)=>{
			let target=e.target;
			if(target.tagName=='DIV'){
				this.hide();
			}
		},false)
		this.cancel.addEventListener('click',()=>{
			this.hide();
		},false)
		this.done.addEventListener('click',()=>{
			this.hide();
			if(this.options.list.indexOf(this.selected_value)==-1)return;
			this.options.callback(this.selected_value);
		},false)
		this.wrap.addEventListener(this.transEnd,()=>{
			if(this.onhide){
				this.remove();
			}
		},false)
		let slide_item=this.wrap.querySelectorAll('.slide-item');
		this.wrap.querySelector('.slide-items').addEventListener('click',(e)=>{
			let target=e.target;
			if(target.tagName=='LI'){
				for(let i=0;i<slide_item.length;i++){
					slide_item[i].classList.remove('slide-selected');
				}
				target.classList.add('slide-selected');
				this.selected_value=target.innerHTML;
			}
		},false)
	},
	transEnd:function(){
		let bs=document.createElement('bootstrap');
		let transitions={
			'WebkitTransform':'webkitTransitionEnd',
			'OTransform':'oTransitionEnd',
			'MozTransform':'TransitionEnd',
			'MsTransform':'msTransitionEnd',
			'transform':'transitionEnd'
		};
		for(let k in transitions){
			if(bs.style[k]!=undefined){
				return transitions[k]
			}
		}
	}(),
	show:function(options){
		this.options=options;
		//根据show传进来的配置进行后续操作
		this.init();
		this.render();

		this.slideContainer.classList.remove('none');
		let wrap=this.slideContainer.querySelector('.slide-wrapper');
		this.cancel=wrap.querySelector('.cancel');
		this.done=wrap.querySelector('.done');
		this.wrap=wrap;
		setTimeout(()=>{
			wrap.classList.add('slide-wrapper-show');
		},10)

		this.bindEvent();
	},
	hide:function(){
		this.onhide=true;
		this.wrap.classList.remove('slide-wrapper-show');
	},
	remove:function(){
		this.slideContainer.classList.add('none');
		this.onhide=false;
	}
}
export { SlideSelector };