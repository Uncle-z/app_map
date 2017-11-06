/*
* author:zou;
* apply:controller element;
 */

var map = null;

//气温色值表组件
Vue.component('map-page-component',{
	template: '#mapPage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers:[]
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			//添加覆盖物
			this.renderPolygon();
		},
		renderPolygon:function(){
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){
					var polygon = this._createPolygon(this.localMarkers[i]);
					AMap.event.addListener(polygon, 'click', this.polygonClick);
				}
			}
			map.setFitView();
		},
		_createPolygon:function(obj){
			var polygon = new AMap.Marker({
		            icon: new AMap.Icon({            
			            size: new AMap.Size(20, 32),  //图标大小
			            image: "img/mark_r.png",
			            imageOffset: new AMap.Pixel(0, 0)
			        }),
		            position: obj.position,
		            size: new AMap.Size(19, 30),
		            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
				    extData: {
				    	name: obj.name,
				    	currentTemp: obj.weatherMesg['currentTemp'],
						temperature: obj.weatherMesg['temperature'],
						mesgTime: obj.weatherMesg['mesgTime']
				    }//自定义数据
				});
			polygon.setMap(map);
			return polygon;
		},
		polygonClick:function(e){
			var obj = e.target.getExtData();
			var position = [];
			position.push(e.lnglat.getLng());
			position.push(e.lnglat.getLat());
			if(obj){
				var borderTemp = obj.currentTemp;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){					
					if((borderTemp >= colorTempArr[i].min) && (borderTemp <= colorTempArr[i].max)){
						colorTempArr[i].current = true;
					}else{
						colorTempArr[i].current = false;
					}
				}
				this.propMesg(obj,position);
			}
		},
		propMesg:function(mesg,position){
			var infoWindow = new AMap.InfoWindow({
		        isCustom: true,  //使用自定义窗体
		        content: this._createInfoWindow(mesg),
		        offset: new AMap.Pixel(95, 6)
		    });
			infoWindow.open(map,position);
		},
		_createInfoWindow:function(mesg){
			var info = document.createElement("div");
	        info.className = "info";
	        var top = document.createElement("h3");
	        var titleD = document.createElement("span");
	        var closeX = document.createElement("span");
	        top.className = "info-top";
	        titleD.innerHTML = mesg.name;
	        //closeX.src = "http://webapi.amap.com/images/close2.gif";
	        closeX.className = 'close';
	        closeX.innerHTML = 'x';
	        closeX.onclick = this._closeInfoWindow;

	        top.appendChild(titleD);
	        top.appendChild(closeX);
	        info.appendChild(top);

	        // 定义中部内容
	        var middle = document.createElement("div");
	        middle.className = "info-middle";
	        middle.style.backgroundColor = 'white';
	        var currentTemp = document.createElement("h4");
	        currentTemp.className = "info-currentTemp";
	        currentTemp.innerHTML = '当前实况：<span>' + mesg.currentTemp + '℃</span>';
	        var temperature = document.createElement("h4");
	        temperature.className = "info-temperature";
	        temperature.innerHTML = '今日气温：<span>' + mesg.temperature + '</span>';
	        var mesgTime = document.createElement("h4");
	        mesgTime.className = "info-mesgTime";
	        mesgTime.innerHTML = '数据时间：<span>' + mesg.mesgTime + '</span>';
	        middle.appendChild(currentTemp);
	        middle.appendChild(temperature);
	        middle.appendChild(mesgTime);
	        info.appendChild(middle);

	        // 定义底部内容
	        var bottom = document.createElement("div");
	        bottom.className = "info-bottom";
	        bottom.style.position = 'relative';
	        bottom.style.top = '0px';
	        bottom.style.margin = '0 auto';
	        var sharp = document.createElement("img");
	        sharp.src = "http://webapi.amap.com/images/sharp.png";
	        bottom.appendChild(sharp);
	        info.appendChild(bottom);
	        return info;
		},
		_closeInfoWindow:function(){
			map.clearInfoWindow();
			var colorTempArr = this.localColorTable;
			for(var i = 0;i<colorTempArr.length;i++){
				colorTempArr[i].current = false;
			}
		},
		showImg:function(){
			layer.open({
				title:'实时气温图',
				content:'<img src="img/mesg.png" width="100%">'
			})
		},
		filterArea:function(id,min,max){
			var polygonsArr = this.localMarkers;
			for(var i = 0;i<polygonsArr.length;i++){
				var obj = polygonsArr[i].weatherMesg;
				if((obj.currentTemp >= min) && (obj.currentTemp <= max)){
					polygonsArr[i].isShow = true;
				}else{
					polygonsArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderPolygon();
		}
	}
});
//降水组件
Vue.component('rain-page-component',{
	template: '#rainPage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers:[]
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderPolygon();
		},
		renderPolygon:function(){
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){
					var polygon = this._createPolygon(this.localMarkers[i]);
					AMap.event.addListener(polygon, 'click', this.polygonClick);
				}
			}
			map.setFitView();
		},
		_createPolygon:function(obj){
			var polygon = new AMap.Marker({
		            icon: new AMap.Icon({            
			            size: new AMap.Size(20, 32),  //图标大小
			            image: "img/mark_r.png",
			            imageOffset: new AMap.Pixel(0, 0)
			        }),
		            position: obj.position,
		            size: new AMap.Size(19, 30),
		            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
				    extData: {
				    	currentTemp: obj.rainMesg['rainfall'],
						mesgTime: obj.rainMesg['mesgTime']
				    }//自定义数据
				});
			polygon.setMap(map);
			return polygon;
		},
		polygonClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				var borderTemp = obj.currentTemp;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){
					colorTempArr[i].current = false;
					if((borderTemp >= colorTempArr[i].min) && (borderTemp <= colorTempArr[i].max)){
						colorTempArr[i].current = true;
					}
				}
				//this.propMesg(obj,position);
			}
		},
		showImg:function(){
			layer.open({
				title:'实时降水图',
				content:'<img src="img/mesg.png" width="100%">'
			})
		},
		filterArea:function(id,min,max){
			var polygonsArr = this.localMarkers;
			for(var i = 0;i<polygonsArr.length;i++){
				var obj = polygonsArr[i].rainMesg;
				if((obj.rainfall >= min) && (obj.rainfall <= max)){
					polygonsArr[i].isShow = true;
				}else{
					polygonsArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderPolygon();
		}
	}
});
//湿度组件
Vue.component('humidty-page-component',{
	template: '#humidtyPage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers: [],
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderMarker();
		},
		renderMarker:function(){			
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){					
					var marker = this._createMarker(this.localMarkers[i]);
					AMap.event.addListener(marker, 'click', this.markerClick);
				}
			}
			map.setFitView();
		},
		_createMarker:function(obj){
			var marker = new AMap.Marker({
	            icon: new AMap.Icon({            
		            size: new AMap.Size(20, 32),  //图标大小
		            image: "img/humidty.png",
		            imageOffset: new AMap.Pixel(0, 0)
		        }),
	            position: obj.position,
	            size: new AMap.Size(19, 30),
	            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
	            extData:{
	            	humidtyVal:obj.humidtyMesg['humidtyVal'],
	            	mesgTime: obj.humidtyMesg['mesgTime']
	            }
	        });
			marker.setMap(map);
			return marker;
		},
		markerClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				var humidtyVal = obj.humidtyVal;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){					
					if((humidtyVal >= colorTempArr[i].min) && (humidtyVal <= colorTempArr[i].max)){
						colorTempArr[i].current = true;
					}else{
						colorTempArr[i].current = false;
					}
				}
				//this.propMesg(obj,position);
			}
		},
		filterArea:function(id,min,max){
			var markersArr = this.localMarkers;
			for(var i = 0;i<markersArr.length;i++){
				var obj = markersArr[i].humidtyMesg;
				if((obj.humidtyVal >= min) && (obj.humidtyVal <= max)){
					markersArr[i].isShow = true;
				}else{
					markersArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderMarker();
		}
	}
});
Vue.component('pressure-page-component',{
	template: '#pressurePage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers: [],
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderMarker();
		},
		renderMarker:function(){			
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){					
					var marker = this._createMarker(this.localMarkers[i]);
					AMap.event.addListener(marker, 'click', this.markerClick);
				}
			}
			map.setFitView();
		},
		_createMarker:function(obj){
			var marker = new AMap.Marker({
	            icon: new AMap.Icon({            
		            size: new AMap.Size(20, 32),  //图标大小
		            image: "img/pressure.png",
		            imageOffset: new AMap.Pixel(0, 0)
		        }),
	            position: obj.position,
	            size: new AMap.Size(19, 30),
	            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
	            extData:{
	            	humidtyVal:obj.humidtyMesg['humidtyVal'],
	            	mesgTime: obj.humidtyMesg['mesgTime']
	            }
	        });
			marker.setMap(map);
			return marker;
		},
		markerClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				var humidtyVal = obj.humidtyVal;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){					
					if((humidtyVal >= colorTempArr[i].min) && (humidtyVal <= colorTempArr[i].max)){
						colorTempArr[i].current = true;
					}else{
						colorTempArr[i].current = false;
					}
				}
				//this.propMesg(obj,position);
			}
		},
		filterArea:function(id,min,max){
			var markersArr = this.localMarkers;
			for(var i = 0;i<markersArr.length;i++){
				var obj = markersArr[i].humidtyMesg;
				if((obj.humidtyVal >= min) && (obj.humidtyVal <= max)){
					markersArr[i].isShow = true;
				}else{
					markersArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderMarker();
		}
	}
});
Vue.component('visible-page-component',{
	template: '#visiblePage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers: [],
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderMarker();
		},
		renderMarker:function(){			
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){					
					var marker = this._createMarker(this.localMarkers[i]);
					AMap.event.addListener(marker, 'click', this.markerClick);
				}
			}
			map.setFitView();
		},
		_createMarker:function(obj){
			var marker = new AMap.Marker({
	            icon: new AMap.Icon({            
		            size: new AMap.Size(26, 26),  //图标大小
		            image: "img/visible.png",
		            imageOffset: new AMap.Pixel(0, 0)
		        }),
	            position: obj.position,
	            size: new AMap.Size(19, 30),
	            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
	            extData:{
	            	humidtyVal:obj.humidtyMesg['humidtyVal'],
	            	mesgTime: obj.humidtyMesg['mesgTime']
	            }
	        });
			marker.setMap(map);
			return marker;
		},
		markerClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				var humidtyVal = obj.humidtyVal;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){					
					if((humidtyVal >= colorTempArr[i].min) && (humidtyVal <= colorTempArr[i].max)){
						colorTempArr[i].current = true;
					}else{
						colorTempArr[i].current = false;
					}
				}
				//this.propMesg(obj,position);
			}
		},
		filterArea:function(id,min,max){
			var markersArr = this.localMarkers;
			for(var i = 0;i<markersArr.length;i++){
				var obj = markersArr[i].humidtyMesg;
				if((obj.humidtyVal >= min) && (obj.humidtyVal <= max)){
					markersArr[i].isShow = true;
				}else{
					markersArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderMarker();
		}
	}
});
Vue.component('airquality-page-component',{
	template: '#airqualityPage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers: [],
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderMarker();
		},
		renderMarker:function(){			
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){					
					var marker = this._createMarker(this.localMarkers[i]);
					AMap.event.addListener(marker, 'click', this.markerClick);
				}
			}
			map.setFitView();
		},
		_createMarker:function(obj){
			var marker = new AMap.Marker({
	            icon: new AMap.Icon({            
		            size: new AMap.Size(20, 32),  //图标大小
		            image: "img/mark_r.png",
		            imageOffset: new AMap.Pixel(0, 0)
		        }),
	            position: obj.position,
	            size: new AMap.Size(19, 30),
	            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
	            extData:{
	            	humidtyVal:obj.humidtyMesg['humidtyVal'],
	            	mesgTime: obj.humidtyMesg['mesgTime']
	            }
	        });
			marker.setMap(map);
			return marker;
		},
		markerClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				var humidtyVal = obj.humidtyVal;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){					
					if((humidtyVal >= colorTempArr[i].min) && (humidtyVal <= colorTempArr[i].max)){
						colorTempArr[i].current = true;
					}else{
						colorTempArr[i].current = false;
					}
				}
				//this.propMesg(obj,position);
			}
		},
		filterArea:function(id,min,max){
			var markersArr = this.localMarkers;
			for(var i = 0;i<markersArr.length;i++){
				var obj = markersArr[i].humidtyMesg;
				if((obj.humidtyVal >= min) && (obj.humidtyVal <= max)){
					markersArr[i].isShow = true;
				}else{
					markersArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderMarker();
		}
	}
});
Vue.component('wind-page-component',{
	template: '#windPage',
	props:['colorTable','markers','menulist'],
	data: function () {
	  return {
	    	localColorTable: [],
	    	localMarkers: [],
	  	}
	},
	mounted:function(){
		this.localColorTable = this.colorTable;
		this.localMarkers = this.markers;
		this.mapInit();
	},
	computed:{
		itemWidth:function(){
			return 'width:' + (100 / this.localColorTable.length) + '%';
		}
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderMarker();
		},
		renderMarker:function(){			
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){
				if(this.localMarkers[i].isShow){					
					var marker = this._createMarker(this.localMarkers[i]);
					AMap.event.addListener(marker, 'click', this.markerClick);
				}
			}
			map.setFitView();
		},
		_createMarker:function(obj){
			var marker = new AMap.Marker({
	            icon: new AMap.Icon({            
		            size: new AMap.Size(20, 32),  //图标大小
		            image: "img/wind.png",
		            imageOffset: new AMap.Pixel(0, 0)
		        }),
	            position: obj.position,
	            angle: this.winddir(obj.windMesg['direction']),
	            //animation: 'AMAP_ANIMATION_BOUNCE',//图标动画
	            extData:{
	            	windVal:obj.windMesg['windVal'],
	            	mesgTime: obj.windMesg['mesgTime']
	            }
	        });
			marker.setMap(map);
			return marker;
		},
		markerClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				var windVal = obj.windVal;
				var colorTempArr = this.localColorTable;
				for(var i = 0;i<colorTempArr.length;i++){					
					if((windVal == colorTempArr[i].level)){
						colorTempArr[i].current = true;
					}else{
						colorTempArr[i].current = false;
					}
				}
				//this.propMesg(obj,position);
			}
		},
		winddir:function(dir){
			dir = dir.toUpperCase();
			switch(dir){
				case 'N':
					return 90;
					break;
				case 'E':
					return 180;
					break;
				case 'S':
					return 270;
					break;
				case 'W':
					return 0;
					break;
				case 'WN':
					return 315;
					break;
				case 'EN':
					return 45;
					break;
				case 'ES':
					return 135;
					break;
				case 'WS':
					return 225;
					break;
				default:
					return 0;
			}
		},
		filterArea:function(id,level){
			var markersArr = this.localMarkers;
			for(var i = 0;i<markersArr.length;i++){
				var obj = markersArr[i].windMesg;
				if(obj.windVal == level){
					markersArr[i].isShow = true;
				}else{
					markersArr[i].isShow = false;
				}
			}
			var colorTempArr = this.localColorTable;
			for(var j = 0;j<colorTempArr.length;j++){
				if(colorTempArr[j].id == id){
					colorTempArr[j].current = true;
				}else{					
					colorTempArr[j].current = false;
				}
			}
			this.renderMarker();
		}
	}
});
Vue.component('warning-page-component',{
	template: '#warningPage',
	props:['polygons'],
	data: function () {
	  return {
	    	//
	  	}
	},
	mounted:function(){
		this.renderPolygon();
	},
	methods:{
		renderPolygon:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.polygons.length;i++){
				var polygon = this._createPolygon(this.polygons[i]);
				AMap.event.addListener(polygon, 'click', this.polygonClick);
			}
			map.setFitView();
		},
		_createPolygon:function(obj){
			var polygon = new AMap.Polygon({
				    path: obj.bounds,//设置多边形边界路径
				    strokeColor: "#fff", //线颜色
				    strokeOpacity: 0.5, //线透明度
				    strokeWeight: 3,    //线宽
				    fillColor: obj.boundsColor, //填充色
				    fillOpacity: 0.75,//填充透明度
				    extData: {
				    	name: obj.name,
				    	warningIcon: obj.warningMesg['warningIcon'],
						warningTitle: obj.warningMesg['warningTitle'],
						warningTxt: obj.warningMesg['warningTxt'],
						mesgTime: obj.warningMesg['mesgTime']
				    }//自定义数据
				});
			polygon.setMap(map);
			return polygon;
		},
		polygonClick:function(e){
			var obj = e.target.getExtData();
			var position = [];
			position.push(e.lnglat.getLng());
			position.push(e.lnglat.getLat());
			if(obj){
				this.propMesg(obj,position);
			}
		},
		propMesg:function(mesg,position){
			var infoWindow = new AMap.InfoWindow({
		        isCustom: true,  //使用自定义窗体
		        content: this._createInfoWindow(mesg),
		        offset: new AMap.Pixel(95, 6)
		    });
			infoWindow.open(map,position);
		},
		_createInfoWindow:function(mesg){
			var info = document.createElement("div");
	        info.className = "info";
	        var top = document.createElement("h3");
	        var titleD = document.createElement("span");
	        var closeX = document.createElement("span");
	        top.className = "warninginfo info-top";
	        titleD.innerHTML = mesg.name;
	        //closeX.src = "http://webapi.amap.com/images/close2.gif";
	        closeX.className = 'close';
	        closeX.innerHTML = 'x';
	        closeX.onclick = this._closeInfoWindow;

	        top.appendChild(titleD);
	        top.appendChild(closeX);
	        info.appendChild(top);

	        // 定义中部内容
	        var middle = document.createElement("div");
	        middle.className = "info-middle";
	        middle.style.backgroundColor = 'white';
	        var warningTitle = document.createElement("h4");
	        warningTitle.className = "info-warning-title";
	        warningTitle.innerHTML = '<img src="' + mesg.warningIcon + '" width="30" height="24">' + mesg.warningTitle;
	        var warningTxt = document.createElement("p");
	        warningTxt.className = "info-warningTxt";
	        warningTxt.innerHTML =  mesg.warningTxt;
	        var mesgTime = document.createElement("h4");
	        mesgTime.className = "info-mesgTime";
	        mesgTime.innerHTML = '数据时间：<span>' + mesg.mesgTime + '</span>';
	        middle.appendChild(warningTitle);
	        middle.appendChild(warningTxt);
	        middle.appendChild(mesgTime);
	        info.appendChild(middle);
	        
	        // 定义底部内容
	        var bottom = document.createElement("div");
	        bottom.className = "info-bottom";
	        bottom.style.position = 'relative';
	        bottom.style.top = '0px';
	        bottom.style.margin = '0 auto';
	        var sharp = document.createElement("img");
	        sharp.src = "http://webapi.amap.com/images/sharp.png";
	        bottom.appendChild(sharp);
	        info.appendChild(bottom);
	        return info;
		},
		_closeInfoWindow:function(){
			map.clearInfoWindow();
		}
	}
});
Vue.component('raindata-page-component',{
	template: '#raindataPage',
	props:['markers'],
	data: function () {
	  return {
	    	localMarkers: [],
	  	}
	},
	mounted:function(){
		this.localMarkers = this.markers;
		this.mapInit();
	},
	methods:{
		mapInit:function(){
			map = new AMap.Map('container', {
			    resizeEnable: true,
			    //layers: [new AMap.TileLayer.Satellite()],
			});
			this.renderMarker();
		},
		renderMarker:function(){			
			map.clearMap();//清空覆盖物
			for(var i=0;i<this.localMarkers.length;i++){					
				var marker = this._createMarker(this.localMarkers[i]);
				AMap.event.addListener(marker, 'click', this.markerClick);
			}
			map.setFitView();
		},
		_createMarker:function(obj){
			var marker = new AMap.Marker({
	            icon: new AMap.Icon({            
		            size: new AMap.Size(20, 32),  //图标大小
		            image: "img/mark_r.png",
		            imageOffset: new AMap.Pixel(0, 0)
		        }),
	            position: obj.position,
	            size: new AMap.Size(19, 30),
	            animation: (obj.isRain) ? 'AMAP_ANIMATION_BOUNCE' : 'AMAP_ANIMATION_NONE',//图标动画
	            extData:{
	            	position: obj.position,
	            	name: obj.name,
	            	mesgTitle:obj.raindataMesg['mesgTitle'],
	            	mesgTxt:obj.raindataMesg['mesgTxt'],
	            	mesgTime: obj.raindataMesg['mesgTime']
	            }
	        });
			marker.setMap(map);
			return marker;
		},
		markerClick:function(e){
			var obj = e.target.getExtData();
			if(obj){
				this.propMesg(obj,obj.position);
			}
		},
		propMesg:function(mesg,position){
			var infoWindow = new AMap.InfoWindow({
		        isCustom: true,  //使用自定义窗体
		        content: this._createInfoWindow(mesg),
		        offset: new AMap.Pixel(95, -16)
		    });
			infoWindow.open(map,position);
		},
		_createInfoWindow:function(mesg){
			var info = document.createElement("div");
	        info.className = "info";
	        var top = document.createElement("h3");
	        var titleD = document.createElement("span");
	        var closeX = document.createElement("span");
	        top.className = "info-top";
	        titleD.innerHTML = mesg.name;
	        //closeX.src = "http://webapi.amap.com/images/close2.gif";
	        closeX.className = 'close';
	        closeX.innerHTML = 'x';
	        closeX.onclick = this._closeInfoWindow;

	        top.appendChild(titleD);
	        top.appendChild(closeX);
	        info.appendChild(top);

	        // 定义中部内容
	        var middle = document.createElement("div");
	        middle.className = "info-middle";
	        middle.style.backgroundColor = 'white';
	        var currentTemp = document.createElement("h4");
	        currentTemp.className = "info-rainTitle";
	        currentTemp.innerHTML =  mesg.mesgTitle;
	        var temperature = document.createElement("h4");
	        temperature.className = "info-temperature";
	        temperature.innerHTML = mesg.mesgTxt;
	        var mesgTime = document.createElement("h4");
	        mesgTime.className = "info-mesgTime";
	        mesgTime.innerHTML = '数据时间：<span>' + mesg.mesgTime + '</span>';
	        middle.appendChild(currentTemp);
	        middle.appendChild(temperature);
	        middle.appendChild(mesgTime);
	        info.appendChild(middle);

	        // 定义底部内容
	        var bottom = document.createElement("div");
	        bottom.className = "info-bottom";
	        bottom.style.position = 'relative';
	        bottom.style.top = '0px';
	        bottom.style.margin = '0 auto';
	        var sharp = document.createElement("img");
	        sharp.src = "http://webapi.amap.com/images/sharp.png";
	        bottom.appendChild(sharp);
	        info.appendChild(bottom);
	        return info;
		},
		_closeInfoWindow:function(){
			map.clearInfoWindow();
		}
	}
});

Vue.component('radar-page-component',{
	template: '#radarPage',
	props:['satelliteimgs'],
	data: function () {
	  return {
	    	playState: false,
	    	progressVal: 0,
	    	imgUrl: '',
	    	progressLength: 0,
	    	imgIndex: 0,
	    	timer: null
	  	}
	},
	mounted:function(){
		var imgArr = this.satelliteimgs.imgUrl;
		this.progressLength = imgArr.length;
		this.imgUrl = imgArr[0];
	},
	computed:{
		progress:function(){
			this.progressVal = (this.imgIndex + 1) / this.progressLength * 100;
			return this.progressVal + '%';
		}
	},
	methods:{
		playFun:function(){
			var getImg = this._getImg;
			if(!this.playState){				
				clearInterval(this.timer);
				this.timer = setInterval(function(){
					getImg();
				},800);
			}else{
				clearInterval(this.timer);
			}
			this.playState = !this.playState;
		},
		_getImg:function(){			
			if(this.imgIndex < this.progressLength -1){
				this.imgIndex ++;				
			}else{
				this.imgIndex = 0;
				clearInterval(this.timer);
				this.playState = false;
			}
			this.imgUrl = this.satelliteimgs.imgUrl[this.imgIndex];		
		}
	}
});
Vue.component('satellite-page-component',{
	template: '#satellitePage',
	props:['satelliteimgs'],
	data: function () {
	  return {
	    	playState: false,
	    	progressVal: 0,
	    	imgUrl: '',
	    	progressLength: 0,
	    	imgIndex: 0,
	    	timer: null
	  	}
	},
	mounted:function(){
		var imgArr = this.satelliteimgs.imgUrl;
		this.progressLength = imgArr.length;
		this.imgUrl = imgArr[0];
	},
	computed:{
		progress:function(){
			this.progressVal = (this.imgIndex + 1) / this.progressLength * 100;
			return this.progressVal + '%';
		}
	},
	methods:{
		playFun:function(){
			var getImg = this._getImg;
			if(!this.playState){				
				clearInterval(this.timer);
				this.timer = setInterval(function(){
					getImg();
				},1000);
			}else{
				clearInterval(this.timer);
			}
			this.playState = !this.playState;
		},
		_getImg:function(){			
			if(this.imgIndex < this.progressLength -1){
				this.imgIndex ++;				
			}else{
				this.imgIndex = 0;
				clearInterval(this.timer);
				this.playState = false;
			}
			this.imgUrl = this.satelliteimgs.imgUrl[this.imgIndex];		
		}
	}
});
var mapVue = new Vue({
	el: '#mapVue',
	data: {
		//currentPosition:[118.889434,42.259502],
		polygons: [],
		markers: tempMarkerData,
		satelliteimgs: {},
		colorTable: tempColorData,
		menulist: true,
		componentState:{
			temp: true,
			rain: false,
			humidty: false,
			pressure: false,
			visible: false,
			airquality: false,
			wind: false,
			warning: false,
			radar: false,
			satellite: false,
			raindata: false,
		}
	},
	methods: {
		tabBtn:function(){
			this.menulist = !this.menulist;
		},
		tabFunction:function(str){
			switch(str){
				case 'temp':
					this._tempShow(str);
					break;
				case 'rain':
					this._rainShow(str);
					break;
				case 'humidty':
					this._humidtyShow(str);					
					break;
				case 'pressure':
					this._pressureShow(str);
					break;
				case 'visible':
					this._visibleShow(str);
					break;
				case 'airquality':
					this._airqualityShow(str);
					break;
				case 'wind':
					this._windShow(str);
					break;
				case 'warning':
					this._warningShow(str);					
					break;
				case 'radar':
					this._radarShow(str);					
					break;
				case 'satellite':
					this._satelliteShow(str);					
					break;
				case 'raindata':
					this._raindataShow(str);					
					break;
				default :
					this._tempShow(str);
			}
		},
		_resetFun:function(str){
			for(key in this.componentState){
				if(key === str){
					this.componentState[key] = true;
				}else{					
					this.componentState[key] = false;
				}
			}
			//this._setCenter();
		},
		// _setCenter:function(){
		// 	map.setZoomAndCenter(14, this.currentPosition);
	 //        // 在新中心点添加 marker 
	 //        var marker = new AMap.Marker({
	 //            map: map,
	 //            position: this.currentPosition
	 //        });
		// },
		_tempShow:function(key){
			this.markers = tempMarkerData,
			this.colorTable = tempColorData;
			this._resetFun(key);
		},
		_rainShow:function(key){
			this.markers = rainMarkerData,
			this.colorTable = rainColorData;
			this._resetFun(key);
		},
		_humidtyShow:function(key){
			this.markers = humidtyMarkerData,
			this.colorTable = humidtyColorData;
			this._resetFun(key);
		},
		_pressureShow:function(key){
			this.markers = pressureMarkerData,
			this.colorTable = pressureColorData;
			this._resetFun(key);
		},
		_visibleShow:function(key){
			this.markers = visibleMarkerData,
			this.colorTable = visibleColorData;
			this._resetFun(key);
		},
		_airqualityShow:function(key){
			this.markers = airqualityMarkerData,
			this.colorTable = airqualityColorData;
			this._resetFun(key);
		},
		_windShow:function(key){
			this.markers = windMarkerData,
			this.colorTable = windColorData;
			this._resetFun(key);
		},
		_warningShow:function(key){
			this.polygons = warningPolygonData;
			this._resetFun(key);
		},
		_radarShow:function(key){
			this.satelliteimgs = radarImgData;
			this.menulist = false;
			this._resetFun(key);
		},
		_satelliteShow:function(key){
			this.satelliteimgs = satelliteImgData;
			this.menulist = false;
			this._resetFun(key);
		},
		_raindataShow:function(key){
			this.markers = raindataMarkerData;
			this.menulist = false;
			this._resetFun(key);
		},
	}
});








