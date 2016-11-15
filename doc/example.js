(function () {
    require.config({
        paths: {
            echarts: './js'
        },
        packages: [
            {
                name: 'BMap',
                location: '../src',
                main: 'main'
            }
        ]
    });

    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],
    function (echarts, BMapExtension) {
        $('#main').css({
            height:$('body').height(),
            width: $('body').width()
        });

        // 初始化地图
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
            enableMapClick: false
        });
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            x: 116.390777,
            y: 39.973416
        };

        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 14);
        map.enableScrollWheelZoom(true);
        // 地图自定义样式
        map.setMapStyle({
            // style:'dark'
            styleJson: [
                {
                    "featureType": "land",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#212121"
                    }
                },
                {
                    "featureType": "building",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#2b2b2b"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "all",
                    "stylers": {
                        "lightness": -57,
                        "saturation": -91
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry",
                    "stylers": {
                        "lightness": -80,
                        "saturation": -94
                    }
                },
                {
                    "featureType": "green",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#1b1b1b"
                    }
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#181818"
                    }
                },
                {
                    "featureType": "subway",
                    "elementType": "geometry.stroke",
                    "stylers": {
                        "color": "#181818"
                    }
                },
                {
                    "featureType": "railway",
                    "elementType": "geometry",
                    "stylers": {
                        "lightness": -52
                    }
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                        "color": "#313131"
                    }
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": {
                        "color": "#8b8787"
                    }
                },
                {
                    "featureType": "manmade",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#1b1b1b"
                    }
                },
                {
                    "featureType": "local",
                    "elementType": "geometry",
                    "stylers": {
                        "lightness": -75,
                        "saturation": -91
                    }
                },
                {
                    "featureType": "subway",
                    "elementType": "all",
                    "stylers": {
                        "lightness": -58
                    }
                },
                {
                    "featureType": "railway",
                    "elementType": "all",
                    "stylers": {
                        "lightness": -60
                    }
                },
                {
                    "featureType": "boundary",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#8b8787",
                        "weight": "1",
                        "lightness": -29
                    }
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "label",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }
            ]
        });

        $.ajax({
            type: 'GET',
            url: './test.txt',
            success: function(msg) {
                var allData = eval("(" + msg +")");
                var geoCoord = allData.geoCoord;
                var data = allData.data;
                var markPointData = allData.markPintData;
                echartsInital(geoCoord, data, markPointData);
            }
        });

        function echartsInital(geoCoord, data, markPointData) {
            option = {
                color: ['gold','aqua','lime'],
                title : {
                    text: '模拟迁徙',
                    subtext:'数据纯属虚构',
                    x:'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                //tooltip : {
                //    trigger: 'item',
                //    formatter: function (v) {
                //        return v[1].replace(':', ' > ');
                //    }
                //},
                //legend: {
                //    orient: 'vertical',
                //    x:'left',
                //    data:['北京', '上海', '广州'],
                //    selectedMode: 'single',
                //    selected:{
                //        '上海' : false,
                //        '广州' : false
                //    },
                //    textStyle : {
                //        color: '#fff'
                //    }
                //},
                //toolbox: {
                //    show : true,
                //    orient : 'vertical',
                //    x: 'right',
                //    y: 'center',
                //    feature : {
                //        mark : {show: true},
                //        dataView : {show: true, readOnly: false},
                //        restore : {show: true},
                //        saveAsImage : {show: true}
                //    }
                //},
                dataRange: {
                    min : 0,
                    max : 100,
                    range: {
                        start: 0,
                        end: 100
                    },
                    x: '20',
                    y:  document.body.clientHeight * 0.7,
                    calculable : true,
                    color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                series : [
                    {
                        name:'北京',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        geoCoord: geoCoord,
                        //geoCoord: {
                        //    '上海': [121.4648,31.2891],
                        //    '东莞': [113.8953,22.901],
                        //    '东营': [118.7073,37.5513],
                        //    '中山': [113.4229,22.478],
                        //    '临汾': [111.4783,36.1615],
                        //    '临沂': [118.3118,35.2936],
                        //    '丹东': [124.541,40.4242],
                        //    '丽水': [119.5642,28.1854],
                        //    '乌鲁木齐': [87.9236,43.5883],
                        //    '佛山': [112.8955,23.1097],
                        //    '保定': [115.0488,39.0948],
                        //    '兰州': [103.5901,36.3043],
                        //    '包头': [110.3467,41.4899],
                        //    '北京': [116.4551,40.2539],
                        //    '北海': [109.314,21.6211],
                        //    '南京': [118.8062,31.9208],
                        //    '南宁': [108.479,23.1152],
                        //    '南昌': [116.0046,28.6633],
                        //    '南通': [121.1023,32.1625],
                        //    '厦门': [118.1689,24.6478],
                        //    '台州': [121.1353,28.6688],
                        //    '合肥': [117.29,32.0581],
                        //    '呼和浩特': [111.4124,40.4901],
                        //    '咸阳': [108.4131,34.8706],
                        //    '哈尔滨': [127.9688,45.368],
                        //    '唐山': [118.4766,39.6826],
                        //    '嘉兴': [120.9155,30.6354],
                        //    '大同': [113.7854,39.8035],
                        //    '大连': [122.2229,39.4409],
                        //    '天津': [117.4219,39.4189],
                        //    '太原': [112.3352,37.9413],
                        //    '威海': [121.9482,37.1393],
                        //    '宁波': [121.5967,29.6466],
                        //    '宝鸡': [107.1826,34.3433],
                        //    '宿迁': [118.5535,33.7775],
                        //    '常州': [119.4543,31.5582],
                        //    '广州': [113.5107,23.2196],
                        //    '廊坊': [116.521,39.0509],
                        //    '延安': [109.1052,36.4252],
                        //    '张家口': [115.1477,40.8527],
                        //    '徐州': [117.5208,34.3268],
                        //    '德州': [116.6858,37.2107],
                        //    '惠州': [114.6204,23.1647],
                        //    '成都': [103.9526,30.7617],
                        //    '扬州': [119.4653,32.8162],
                        //    '承德': [117.5757,41.4075],
                        //    '拉萨': [91.1865,30.1465],
                        //    '无锡': [120.3442,31.5527],
                        //    '日照': [119.2786,35.5023],
                        //    '昆明': [102.9199,25.4663],
                        //    '杭州': [119.5313,29.8773],
                        //    '枣庄': [117.323,34.8926],
                        //    '柳州': [109.3799,24.9774],
                        //    '株洲': [113.5327,27.0319],
                        //    '武汉': [114.3896,30.6628],
                        //    '汕头': [117.1692,23.3405],
                        //    '江门': [112.6318,22.1484],
                        //    '沈阳': [123.1238,42.1216],
                        //    '沧州': [116.8286,38.2104],
                        //    '河源': [114.917,23.9722],
                        //    '泉州': [118.3228,25.1147],
                        //    '泰安': [117.0264,36.0516],
                        //    '泰州': [120.0586,32.5525],
                        //    '济南': [117.1582,36.8701],
                        //    '济宁': [116.8286,35.3375],
                        //    '海口': [110.3893,19.8516],
                        //    '淄博': [118.0371,36.6064],
                        //    '淮安': [118.927,33.4039],
                        //    '深圳': [114.5435,22.5439],
                        //    '清远': [112.9175,24.3292],
                        //    '温州': [120.498,27.8119],
                        //    '渭南': [109.7864,35.0299],
                        //    '湖州': [119.8608,30.7782],
                        //    '湘潭': [112.5439,27.7075],
                        //    '滨州': [117.8174,37.4963],
                        //    '潍坊': [119.0918,36.524],
                        //    '烟台': [120.7397,37.5128],
                        //    '玉溪': [101.9312,23.8898],
                        //    '珠海': [113.7305,22.1155],
                        //    '盐城': [120.2234,33.5577],
                        //    '盘锦': [121.9482,41.0449],
                        //    '石家庄': [114.4995,38.1006],
                        //    '福州': [119.4543,25.9222],
                        //    '秦皇岛': [119.2126,40.0232],
                        //    '绍兴': [120.564,29.7565],
                        //    '聊城': [115.9167,36.4032],
                        //    '肇庆': [112.1265,23.5822],
                        //    '舟山': [122.2559,30.2234],
                        //    '苏州': [120.6519,31.3989],
                        //    '莱芜': [117.6526,36.2714],
                        //    '菏泽': [115.6201,35.2057],
                        //    '营口': [122.4316,40.4297],
                        //    '葫芦岛': [120.1575,40.578],
                        //    '衡水': [115.8838,37.7161],
                        //    '衢州': [118.6853,28.8666],
                        //    '西宁': [101.4038,36.8207],
                        //    '西安': [109.1162,34.2004],
                        //    '贵阳': [106.6992,26.7682],
                        //    '连云港': [119.1248,34.552],
                        //    '邢台': [114.8071,37.2821],
                        //    '邯郸': [114.4775,36.535],
                        //    '郑州': [113.4668,34.6234],
                        //    '鄂尔多斯': [108.9734,39.2487],
                        //    '重庆': [107.7539,30.1904],
                        //    '金华': [120.0037,29.1028],
                        //    '铜川': [109.0393,35.1947],
                        //    '银川': [106.3586,38.1775],
                        //    '镇江': [119.4763,31.9702],
                        //    '长春': [125.8154,44.2584],
                        //    '长沙': [113.0823,28.2568],
                        //    '长治': [112.8625,36.4746],
                        //    '阳泉': [113.4778,38.0951],
                        //    '青岛': [120.4651,36.3373],
                        //    '韶关': [113.7964,24.7028]
                        //},

                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    label:{show:false},
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : data
                        },
                        markPoint : {
                            symbol:'circle',
                            symbolSize : function (v){
                                return 2
                            },
                            itemStyle:{
                                normal:{
                                    label:{
                                        show:false,
                                        formatter: function(v) {
                                            return v.name;
                                        },
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            baseline: 'bottom'
                                        }
                                    },
                                }
                            },
                            //从这加数据打点
                            data : markPointData
                        }
                    }
                ]
            };

            var myChart = BMapExt.initECharts(container);
            window.onresize = myChart.onresize;
            BMapExt.setOption(option);

            var ecConfig = require('echarts/config');
            function eConsole(param) {
                var mes = '【' + param.type + '】';
                if (typeof param.seriesIndex != 'undefined') {
                    mes += '  seriesIndex : ' + param.seriesIndex;
                    mes += '  dataIndex : ' + param.dataIndex;
                }
                var markPointData = option.series[0].markPoint.data;

                //防止点击线时出现bug
                if (markPointData.length > param.dataIndex && param.name.indexOf(">") == -1) {
                    var liangDongData = markPointData[param.dataIndex].liandong;
                    //对画线数据封装
                    var markLineData = liangDongData.map(function(arr) {
                        return [{name: param.name}, {name: arr[0], value: arr[1]}];
                    });
                    option.series[0].markLine.data = markLineData;
                    myChart.clear();
                    BMapExt.setOption(option);
                    //对信息框填充信息
                    var lineDataLen = markLineData.length;
                    let sortedData = liangDongData.sort(function(a,b) {
                        return b[1] - a[1];
                    });
                    let message = "";
                    //数组长度小于10时显示全部，大于10时显示10条
                    if (lineDataLen <= 10) {
                        let index = 0;
                        for (let i = 0, len = sortedData.length; i < len; i++) {
                            message += ++index + "." +sortedData[i][0] + ":" + sortedData[i][1] + "<br/>"
                        }
                        document.getElementById("message").innerHTML = message;
                    } else {
                        let index = 0;
                        let temp = sortedData.slice(0,5);
                        for (let i = 0, len = temp.length; i < len; i++) {
                            message += ++index + "." + temp[i][0] + ":" + temp[i][1] + "<br/>"
                        }
                        document.getElementById("message").innerHTML = message;
                    }
                }
            }
            myChart.on(ecConfig.EVENT.CLICK, eConsole);

            //保存label对象
            var ecLabelSet = [];
            /**
             * 提取echarts数据并在地图上添加标签
             */
            function wrapDate() {
                //提取echarts数据
                var markerPointData = option.series[0].markPoint.data;
                var geoData = option.series[0].geoCoord;
                //打点
                for (var i = 0, len = markerPointData.length; i < len; i++) {
                    var centerPoint = geoData[markerPointData[i].name];
                    var value = markerPointData[i].value;
                    var point = new BMap.Point(centerPoint[0], centerPoint[1]);
                    var offsetY = Math.ceil((3 + value / 10) / 2);
                    var opts = {
                        position:point,
                        offset: new BMap.Size(0, (-30) - offsetY)
                    };
                    var lableName = "<div class='label-name'>" + markerPointData[i].name + "</div>";

                    var label = new BMap.Label(lableName, opts);  // 创建文本标注对象
                    label.setStyle({
                        border:1,
                        background: "",
                        color : setLabelColorByMarkPointValue(value),
                        fontFamily:"宋体",
                        fontSize : "12px"
                    });
                    ecLabelSet.push(label);
                    //map.addOverlay(label);
                }
            }
            wrapDate();

            /**
             * 通过echarts点value值设置标签颜色
             * @param value
             * @returns {*}
             */
            function setLabelColorByMarkPointValue(value) {
                if (value >= 0 && value < 20) {
                    return 'rgb(0, 255, 194)';
                } else if (value >= 20 && value < 40) {
                    return 'rgb(20, 255, 10)';
                } else if (value >= 40 && value < 60) {
                    return 'rgb(217, 255, 0)';
                } else if (value >= 60 && value < 80) {
                    return 'rgb(255, 250, 0)';
                } else {
                    return 'rgb(255, 68, 43)';
                }
            }

            //设定button点击事件
            var button1 = document.getElementById("button1");
            button1.flag = false;
            button1.onclick = function () {
                if (this.flag) {
                    for (let i = 0, len = ecLabelSet.length; i < len; i++) {
                        map.removeOverlay(ecLabelSet[i]);
                    }
                    this.flag = false;
                    this.value = "显示点标签";
                } else {
                    for (let i = 0, len = ecLabelSet.length; i < len; i++) {
                        map.addOverlay(ecLabelSet[i]);
                    }
                    this.flag = true;
                    this.value = "隐藏点标签";
                }
            }
        }
    }
);
})();