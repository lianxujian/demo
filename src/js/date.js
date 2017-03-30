export function date(){
	//初始化首页默认入住日期
	let checkInDate=document.querySelector('.in-date');
	let checkOutDate=document.querySelector('.out-date');
	let current_date=new Date();
	let cYear=current_date.getFullYear();
	let cMonth=current_date.getMonth()+1;
	let cDay=current_date.getDate();
	let cTime=current_date.getHours();

	//住店
	if(cTime>16){
		current_date=new Date(cYear+'-'+cMonth+'-'+(cDay+1));
		cYear=current_date.getFullYear();
		cMonth=current_date.getMonth()+1;
		cDay=current_date.getDate();
	}
	checkInDate.innerHTML=cMonth+'月'+cDay+'日';
	//离店
	let out_date=new Date(cYear+'-'+cMonth+'-'+(cDay+1));
	let oYear=out_date.getFullYear();
	let oMonth=out_date.getMonth()+1;
	let oDay=out_date.getDate();
	let oTime=out_date.getHours();
	checkOutDate.innerHTML='1晚（'+oMonth+'月'+oDay+'日离店）';
}