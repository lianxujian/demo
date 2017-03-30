export class Calendar{
	constructor(options){
		if(options.callback)this.callback=options.callback;
		
		this.year=options.initDate.getFullYear();
		this.month=options.initDate.getMonth()+1;
		this.date=options.initDate.getDate();
		this.calendarPlugin=document.querySelector('.calendar-plugin');
		this.calendarMonths=document.querySelector('.calendar-months');
		this.calendarBack=document.querySelector('.header .back');
		this.prev=document.querySelector('.year-month .prev');
		this.next=document.querySelector('.year-month .next');
		this.yearMonthItems=document.querySelector('.year-month-items');
		this.done=document.querySelector('.done');
		this.liveInDate=document.querySelector('.live-in-date');
		this.reduce=document.querySelector('.reduce');
		this.count=document.querySelector('.count');
		this.add=document.querySelector('.add');

		this.render(this.year,this.month);
		this.bindEvent();
	}
	//当月共有多少天
	daysInOneMonth(year,month){
		let d31=[1,3,5,7,8,10,12],
			d30=[4,6,9,11],
			days=31;
		month=month*1;
		year=year*1;
		if(month==2){
			if(year%4==0 && year%100!=0 || year%400==0){
				days=29;
			}else{
				days=28;
			}
		}else{
			if(d31.indexOf(month)>-1){
				days=31;
			}else if(d30.indexOf(month)>-1){
				days=30;
			}
		}
		return days;
	}
	//当月1号是星期几;
	startInOneMonth(year,month){
		let date=new Date(year,month-1,1);
		return date.getDay();
	}
	//渲染上个月
	renderPrevMonth(year,month){
		let prevMonth=new Date(year,month-2);
		//上个月多少天（最后一天几号）
		let prevMonthDays=this.daysInOneMonth(prevMonth.getFullYear(),prevMonth.getMonth()+1);
		//当月1号是星期几（显示上个月多少天）
		let leftDays=this.startInOneMonth(year,month);
		let str='';
		while(leftDays>0){
			str+=`<span class="prev-bg">${prevMonthDays-leftDays+1}</span>`;
			leftDays--;
		}
		return str;
	}
	//渲染本月
	renderCurrentMonth(year,month){
		let str='',start=1;
		let days=this.daysInOneMonth(year,month);
		while(start<=days){
			if(start==this.date){
				str+=`<span class="current-active">${start}</span>`;
			}else{
				str+=`<span>${start}</span>`;
			}
			start++;
		}
		return str;
	}
	render(year,month){
		//console.log(this.renderCurrentMonth(year,month))
		this.calendarMonths.innerHTML=this.renderPrevMonth(year,month)+this.renderCurrentMonth(year,month);
		year=new Date(year,month-1).getFullYear();
		month=new Date(year,month-1).getMonth();
		this.yearMonthItems.innerHTML=year+'年'+(month+1)+'月';
		this.liveInDate.innerHTML=this.month+'月'+document.querySelector('.current-active').innerHTML+'日';
	}
	//绑定事件
	bindEvent(){
		//点返回
		this.calendarBack.addEventListener('click',()=>{
			this.hide();
		},false)
		//点上个月
		this.prev.addEventListener('click',()=>{
			this.month=this.month-1;
			this.render(this.year,this.month);
		},false)
		//点下个月
		this.next.addEventListener('click',()=>{
			this.month=this.month+1;
			this.render(this.year,this.month);
		},false)
		//点日历每一天
		this.calendarMonths.addEventListener('click',(e)=>{
			let target=e.target;
			if(!target.classList.contains('prev-bg')){
				document.querySelector('.current-active').classList.remove('current-active');
				target.classList.add('current-active')
			}
			this.liveInDate.innerHTML=this.month+'月'+document.querySelector('.current-active').innerHTML+'日';
		},false)
		//点完成 
		this.done.addEventListener('click',()=>{
			this.hide();
			var currentDate=document.querySelector('.current-active').innerHTML;
			let _inDate=this.month+'月'+currentDate+'日';
			let outMonth=new Date(this.year,this.month-1,currentDate*1+this.count.innerHTML*1).getMonth()+1;
			let outDate=new Date(this.year,this.month-1,currentDate*1+this.count.innerHTML*1).getDate();
			let _outDate=this.count.innerHTML+'晚（'+outMonth+'月'+outDate+'日离店）';
			
			if(this.callback)this.callback(_inDate,_outDate);
		},false)
		//点增加
		this.add.addEventListener('click',()=>{
			this.count.innerHTML=this.count.innerHTML*1+1;
		},false)
		//点减少
		this.reduce.addEventListener('click',()=>{
			this.count.innerHTML=this.count.innerHTML*1-1;
			if(this.count.innerHTML<=1){
				this.count.innerHTML=1;
			}
		},false)

	}
	show(){
		this.calendarPlugin.classList.add('plugin-active');
	}
	hide(){
		this.calendarPlugin.classList.remove('plugin-active');
	}
}