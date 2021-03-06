/*
*localdata
 */
/*
*区域天气数据;
*说明：区域形状由bounds数组中的点数量决定，最少要三个点，最多不限，若前台不显示形状，可能是图形的点坐标取得有问题;
*说明：数据中的id仅仅作为当前数据主键，不代表数据库中的数据主键;
**/

//温度区域数据,数据条数不限
var tempMarkerData = [
	{
		id:1,
		name:'玉龙家园',
		isShow:true,
		position:[118.879902,42.309856],
		weatherMesg:{
			currentTemp:'23',
			temperature:'10℃~23℃',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		name:'王府花园',
		isShow:true,
		position:[118.873722,42.281413],
		weatherMesg:{
			currentTemp:'34',
			temperature:'10℃~23℃',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		name:'沃尔玛',
		isShow:true,
		position:[119.017917,42.287509],
		weatherMesg:{
			currentTemp:'15',
			temperature:'10℃~23℃',
			mesgTime:'07/05 15:00'
		}
	},
];
//气温颜色表数据格式，数据条数不要超过十条，温度范围之间不要叠加,current统一设为false;
var tempColorData = [
	{
		id:1,
		color:'#f0840a',
		min:11,
		max:13,
		current:false
	},
	{
		id:2,
		color:'#ef7510',
		min:14,
		max:16,
		current:false
	},
	{
		id:3,
		color:'#ee6618',
		min:17,
		max:20,
		current:false
	},
	{
		id:4,
		color:'#ee571e',
		min:21,
		max:23,
		current:false
	},
	{
		id:5,
		color:'#e74b1a',
		min:24,
		max:26,
		current:false
	},
	{
		id:6,
		color:'#e14016',
		min:27,
		max:30,
		current:false
	},
	{
		id:7,
		color:'#da3313',
		min:31,
		max:33,
		current:false
	},
	{
		id:8,
		color:'#d0240e',
		min:34,
		max:36,
		current:false
	},
	{
		id:9,
		color:'#c20003',
		min:37,
		max:40,
		current:false
	},
	{
		id:10,
		color:'#b5010a',
		min:41,
		max:45,
		current:false
	}
];
//降水区域数据,数据条数不限
var rainMarkerData = [
	{
		id:1,
		isShow:true,
		position:[118.879902,42.309856],
		rainMesg:{
			rainfall:'0',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		isShow:true,
		position:[118.873722,42.281413],
		rainMesg:{
			rainfall:'21',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		isShow:true,
		position:[119.017917,42.287509],
		rainMesg:{
			rainfall:'34',
			mesgTime:'07/05 15:00'
		}
	},
];
//降雨色值表数据，
var rainColorData = [
	{
		id:1,
		color:'#a6f28f',
		min:0,
		max:1,
		current:false
	},
	{
		id:2,
		color:'#3dba3d',
		min:1.1,
		max:5,
		current:false
	},
	{
		id:3,
		color:'#61b8ff',
		min:5.1,
		max:20,
		current:false
	},
	{
		id:4,
		color:'#0000e1',
		min:20.1,
		max:23,
		current:false
	},
	{
		id:5,
		color:'#fa00fa',
		min:23.1,
		max:26,
		current:false
	},
	{
		id:6,
		color:'#800040',
		min:26.1,
		max:100,
		current:false
	}
];
//湿度区域数据,数据条数不限
var humidtyMarkerData = [
	{
		id:1,
		isShow:true,
		position:[118.879902,42.309856],
		humidtyMesg:{
			humidtyVal:'0',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		isShow:true,
		position:[118.873722,42.281413],
		humidtyMesg:{
			humidtyVal:'21',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		isShow:true,
		position:[119.017917,42.287509],
		humidtyMesg:{
			humidtyVal:'34',
			mesgTime:'07/05 15:00'
		}
	},
];
//湿度色值表数据，
var humidtyColorData = [
	{
		id:1,
		color:'#a6f28f',
		min:0,
		max:1,
		current:false
	},
	{
		id:2,
		color:'#3dba3d',
		min:1.1,
		max:5,
		current:false
	},
	{
		id:3,
		color:'#61b8ff',
		min:5.1,
		max:20,
		current:false
	},
	{
		id:4,
		color:'#0000e1',
		min:20.1,
		max:23,
		current:false
	},
	{
		id:5,
		color:'#fa00fa',
		min:23.1,
		max:26,
		current:false
	},
	{
		id:6,
		color:'#800040',
		min:26.1,
		max:100,
		current:false
	}
];
//气压区域数据,数据条数不限
var pressureMarkerData = [
	{
		id:1,
		isShow:true,
		position:[118.879902,42.309856],
		humidtyMesg:{
			humidtyVal:'0',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		isShow:true,
		position:[118.873722,42.281413],
		humidtyMesg:{
			humidtyVal:'21',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		isShow:true,
		position:[119.017917,42.287509],
		humidtyMesg:{
			humidtyVal:'34',
			mesgTime:'07/05 15:00'
		}
	},
];
//气压色值表数据，
var pressureColorData = [
	{
		id:1,
		color:'#a6f28f',
		min:0,
		max:1,
		current:false
	},
	{
		id:2,
		color:'#3dba3d',
		min:1.1,
		max:5,
		current:false
	},
	{
		id:3,
		color:'#61b8ff',
		min:5.1,
		max:20,
		current:false
	},
	{
		id:4,
		color:'#0000e1',
		min:20.1,
		max:23,
		current:false
	},
	{
		id:5,
		color:'#fa00fa',
		min:23.1,
		max:26,
		current:false
	},
	{
		id:6,
		color:'#800040',
		min:26.1,
		max:100,
		current:false
	}
];
//能见度区域数据,数据条数不限
var visibleMarkerData = [
	{
		id:1,
		isShow:true,
		position:[118.879902,42.309856],
		humidtyMesg:{
			humidtyVal:'0',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		isShow:true,
		position:[118.873722,42.281413],
		humidtyMesg:{
			humidtyVal:'21',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		isShow:true,
		position:[119.017917,42.287509],
		humidtyMesg:{
			humidtyVal:'34',
			mesgTime:'07/05 15:00'
		}
	},
];
//能见度色值表数据，
var visibleColorData = [
	{
		id:1,
		color:'#a6f28f',
		min:0,
		max:1,
		current:false
	},
	{
		id:2,
		color:'#3dba3d',
		min:1.1,
		max:5,
		current:false
	},
	{
		id:3,
		color:'#61b8ff',
		min:5.1,
		max:20,
		current:false
	},
	{
		id:4,
		color:'#0000e1',
		min:20.1,
		max:23,
		current:false
	},
	{
		id:5,
		color:'#fa00fa',
		min:23.1,
		max:26,
		current:false
	},
	{
		id:6,
		color:'#800040',
		min:26.1,
		max:100,
		current:false
	}
];
//空气质量区域数据,数据条数不限
var airqualityMarkerData = [
	{
		id:1,
		isShow:true,
		position:[118.879902,42.309856],
		humidtyMesg:{
			humidtyVal:'0',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		isShow:true,
		position:[118.873722,42.281413],
		humidtyMesg:{
			humidtyVal:'21',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		isShow:true,
		position:[119.017917,42.287509],
		humidtyMesg:{
			humidtyVal:'34',
			mesgTime:'07/05 15:00'
		}
	},
];
//空气质量色值表数据，
var airqualityColorData = [
	{
		id:1,
		color:'#a6f28f',
		min:0,
		max:1,
		current:false
	},
	{
		id:2,
		color:'#3dba3d',
		min:1.1,
		max:5,
		current:false
	},
	{
		id:3,
		color:'#61b8ff',
		min:5.1,
		max:20,
		current:false
	},
	{
		id:4,
		color:'#0000e1',
		min:20.1,
		max:23,
		current:false
	},
	{
		id:5,
		color:'#fa00fa',
		min:23.1,
		max:26,
		current:false
	},
	{
		id:6,
		color:'#800040',
		min:26.1,
		max:100,
		current:false
	}
];
//风力区域数据,数据条数不限
var windMarkerData = [
	{
		id:1,
		isShow:true,
		position:[118.879902,42.309856],
		windMesg:{
			windVal:'1',
			direction:'N',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		isShow:true,
		position:[118.873722,42.281413],
		windMesg:{
			windVal:'5',
			direction:'S',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		isShow:true,
		position:[119.017917,42.287509],
		windMesg:{
			windVal:'7',
			direction:'W',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:4,
		isShow:true,
		position:[119.017917,42.287509],
		windMesg:{
			windVal:'5',
			direction:'ES',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:5,
		isShow:true,
		position:[119.017917,42.287509],
		windMesg:{
			windVal:'3',
			direction:'E',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:6,
		isShow:true,
		position:[119.017917,42.287509],
		windMesg:{
			windVal:'7',
			direction:'WN',
			mesgTime:'07/05 15:00'
		}
	},
];
//风力颜色表数据格式;
var windColorData = [
	{
		id:1,
		color:'#97e8ad',
		level:1,
		current:false
	},
	{
		id:2,
		color:'#99d2ca',
		level:2,
		current:false
	},
	{
		id:3,
		color:'#9bbcde',
		level:3,
		current:false
	},
	{
		id:4,
		color:'#6b9de1',
		level:4,
		current:false
	},
	{
		id:5,
		color:'#3b7edb',
		level:5,
		current:false
	},
	{
		id:6,
		color:'#2b5cc2',
		level:6,
		current:false
	},
	{
		id:7,
		color:'#1c3ba9',
		level:7,
		current:false
	},
	{
		id:8,
		color:'#112c90',
		level:8,
		current:false
	},
	{
		id:9,
		color:'#071e78',
		level:9,
		current:false
	},
	{
		id:10,
		color:'#461981',
		level:10,
		current:false
	}
];
//预警信息局域数据，数据条数不限
var warningPolygonData = [
	{
		id:1,
		name:'松山区',
		bounds:[
			[119.478619,42.582568],
			[119.345409,42.442872],
			[119.138043,42.351598],
			[118.853771,42.476306],
			[119.217693,42.631085],
		],
		boundsColor:'#f9b42f',
		warningMesg:{
			warningIcon:'img/timg3.jpg',
			warningTitle: '黄色霜冻预警',
			warningTxt:'24小时内地表温度将下降至0度一下，对农作物影响较大',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		name:'红山区',
		bounds:[
			[118.99728,42.330027],
			[119.054958,42.313528],
			[119.046032,42.2546],
			[118.975308,42.269337],
			[118.925182,42.329774],
		],
		boundsColor:'#3251d3',
		warningMesg:{
			warningIcon:'img/timg2.jpg',
			warningTitle: '蓝色预警',
			warningTxt:'24小时蓝色预警，对农作物影响较大',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		name:'元宝山区',
		bounds:[
			[119.544537,42.434004],
			[119.230053,42.386348],
			[119.065258,42.288897],
			[118.954022,42.188241],
			[119.10783,42.00278],
			[119.326183,41.940498],
			[119.44154,42.081311],
			[119.250652,42.194346],
			[119.4333,42.319366],
			[119.518444,42.43299],
		],
		boundsColor:'#f9b42f',
		warningMesg:{
			warningIcon:'img/timg1.jpg',
			warningTitle: '黄色沙尘暴预警',
			warningTxt:'24小时内黄色沙尘暴预警，对农作物影响较大',
			mesgTime:'07/05 15:00'
		}
	},
];

//降水估测数据,数据条数不限,isRain为当前观测点是否有降水
var raindataMarkerData = [
	{
		id:1,
		name:'玉龙家园',
		position:[118.879902,42.309856],
		isRain:true,
		raindataMesg:{
			mesgTitle:'未来2小时降水估测',
			mesgTxt:'预计30分钟后降水10mm,一小时后降水50mm',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:2,
		name:'和谐家园',
		position:[118.873722,42.281413],
		isRain:false,
		raindataMesg:{
			mesgTitle:'未来2小时无降水',
			mesgTxt:'预计未来2小时无降水',
			mesgTime:'07/05 15:00'
		}
	},
	{
		id:3,
		name:'富河家园',
		position:[119.017917,42.287509],
		isRain:false,
		raindataMesg:{
			mesgTitle:'未来2小时无降水',
			mesgTxt:'预计未来2小时无降水',
			mesgTime:'07/05 15:00'
		}
	},
];
//卫星图片数据
var satelliteImgData ={
	startTime:'2017/11/03 15:03:33',
	endTime:'2017/11/04 15:03:33',
	imgUrl:[
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031134500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031141500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031144500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031151500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031154500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031161500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031164500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031171500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031174500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031181500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031184500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031191500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031194500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031201500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031204500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031211500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031214500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031221500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031224500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031231500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031234500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171101001500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171101004500000.jpg',
	]
};
//雷达图片数据
var radarImgData ={
	startTime:'2017/11/03 15:03:33',
	endTime:'2017/11/04 15:03:33',
	imgUrl:[
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031134500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031141500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031144500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031151500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031154500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031161500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031164500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031171500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031174500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031181500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031184500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031191500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031194500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031201500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031204500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031211500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031214500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031221500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031224500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031231500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171031234500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171101001500000.jpg',
		'img/satellite/sevp_nsmc_wxcl_asc_e99_achn_lno_py_20171101004500000.jpg',
	]
};



















