import {jsonp} from '../component/tools';
export function location(){
	document.querySelector('.location').addEventListener('click',function(e){
		/*jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location='+36+','+100.6+'&key=RFEBZ-RRS3G-G7QQZ-IPWLE-2VNXQ-DMBZ5&output=jsonp&',function(data){
			console.log(data)
		}) */
		e.stopPropagation();
		//实现定位
		var git=navigator.geolocation;
		if(git){//watchPosition
			git.getCurrentPosition(function(position){
				var coords = position.coords; 
				alert(coords.latitude+','+coords.longitude)
				//根据经纬度定位
				jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location='+coords.latitude+','+coords.longitude+'&key=RFEBZ-RRS3G-G7QQZ-IPWLE-2VNXQ-DMBZ5&output=jsonp&',function(data){
					//返回位置信息
					console.log(data)
				}) 
				/*// 维度
		        coords.latitude,
		        // 精度
		        coords.longitude*/

		        /*document.getElementById('container').style.display='block';
				var searchService,map,markers = [];
			    var center = new qq.maps.LatLng(coords.latitude,coords.longitude);
			    map = new qq.maps.Map(document.getElementById('container'),{
			        center: center,
			        zoom: 13
			    });
			    //设置圆形
			    new qq.maps.Circle({
			        center:new qq.maps.LatLng(coords.latitude,coords.longitude),
			        radius: 2000,
			        map: map
			    });
			    var latlngBounds = new qq.maps.LatLngBounds();
			    //调用Poi检索类
			    searchService = new qq.maps.SearchService({
			        complete : function(results){
			            var pois = results.detail.pois;
			            for(var i = 0,l = pois.length;i < l; i++){
			                var poi = pois[i];
			                latlngBounds.extend(poi.latLng);  
			                var marker = new qq.maps.Marker({
			                    map:map,
			                    position: poi.latLng
			                });

			                marker.setTitle(i+1);
			                
			                markers.push(marker);
			            }
			            map.fitBounds(latlngBounds);
			        }
			    });
*/
			},function(error){
				switch(error.code) {
			        case error.TIMEOUT:
			            console.log("A timeout occured! Please try again!");
			            break;
			        case error.POSITION_UNAVAILABLE:
			            console.log('We can\'t detect your location. Sorry!');
			            break;
			        case error.PERMISSION_DENIED:
			            console.log('Please allow geolocation access for this to work.');
			            break;
			        case error.UNKNOWN_ERROR:
			            console.log('An unknown error occured!');
			            break;
		    	}
		    	//根据ip地址定位
		    	jsonp('http://apis.map.qq.com/ws/location/v1/ip?key=RFEBZ-RRS3G-G7QQZ-IPWLE-2VNXQ-DMBZ5&output=jsonp&',function(data){
					console.log(data)
				})
			},{
				// 指示浏览器获取高精度的位置，默认为false
		        enableHighAccuracy: true,
		        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
		        timeout: 5000,
		        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
		        maximumAge: 3000
			})
		}else{
			 alert("Your browser does not support Geolocation!");
		}
	},false)
}