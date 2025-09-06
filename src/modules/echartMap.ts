import * as echarts from 'echarts'
import sdData from '@/assets/data/中国.ts'
import mapBg from '@/assets/images/map-bg.jpg'
// import mapBg from '@/assets/images/mapBg.png'

import lineTop1 from '@/assets/images/lineTop1.png'
import lineTop2 from '@/assets/images/lineTop2.png'
import lineTop3 from '@/assets/images/lineTop3.png'
import lineTop4 from '@/assets/images/lineTop4.png'
import lineTop5 from '@/assets/images/lineTop5.png'
echarts.registerMap('sd', sdData as any)
const lineTopList: any = [lineTop1, lineTop2, lineTop3, lineTop4, lineTop5]
// 获取地图配置
export const getMapOption = () => {
  // 渐变层颜色
  const colorList: string[] = [
    // '#8b5e70',
    // '#81596d',
    // '#78556a',
    // '#6e5068',
    // '#644c65',
    // '#5b4762',
    // '#51435f',
    // '#483e5c',
    // '#3e3a59',
    // '#343557',
    // '#2b3154',
    // '#212c51',
     '#58fcef',
    '#49f6f1',
    '#30ecf4',
    '#1ae1f7',
    '#09d6fa',
    '#05cbfc',
    '#09bdff',
    '#13afff',
    '#20a0ff',
    '#2691ff',
    '#2583f8',
    '#1c75e8'
  ]
  // 生成渐变图层
  const geoList: any = []
  for (let i = 1; i <= colorList.length; i++) {
    const mapOption: any = {
      map: 'sd',
      aspectScale: 0.85,
      emphasis: {
        disabled: true
      },
      z: 12 - i,
      layoutCenter: ['50%', `${i * 0.3 + 50}%`], //地图位置
      layoutSize: '100%',
      itemStyle: {
        normal: {
          areaColor: colorList[i - 1],
          borderWidth: 0
        },
        emphasis: {
          areaColor: colorList[i - 1],
          borderWidth: 0
        }
      },
      label: {
          show: false,
          color: '#fff',
          fontSize: 14
        }
    }
    if (i === colorList.length) {
      mapOption.itemStyle.normal.shadowColor = 'rgba(0, 0, 0, 0.71)'
      mapOption.itemStyle.normal.shadowBlur = 100
    }
    geoList.push(mapOption)
  }
  // 获取柱状图配置
  const lineSeriesData = getLineData()

  const placeList = [
  { name: "海门", geoCoord: [121.15, 31.89] },
  { name: "鄂尔多斯", geoCoord: [109.781327, 39.608266] },
  { name: "招远", geoCoord: [120.38, 37.35] },
  { name: "舟山", geoCoord: [122.207216, 29.985295] },
  { name: "齐齐哈尔", geoCoord: [123.97, 47.33] },
  { name: "盐城", geoCoord: [120.13, 33.38] },
  { name: "赤峰", geoCoord: [118.87, 42.28] },
  { name: "青岛", geoCoord: [120.33, 36.07] },
  { name: "乳山", geoCoord: [121.52, 36.89] },
  { name: "金昌", geoCoord: [102.188043, 38.520089] },
  { name: "泉州", geoCoord: [118.58, 24.93] },
  { name: "莱西", geoCoord: [120.53, 36.86] },
  { name: "日照", geoCoord: [119.46, 35.42] },
  { name: "胶南", geoCoord: [119.97, 35.88] },
  { name: "南通", geoCoord: [121.05, 32.08] },
  { name: "拉萨", geoCoord: [91.11, 29.97] },
  { name: "云浮", geoCoord: [112.02, 22.93] },
  { name: "梅州", geoCoord: [116.1, 24.55] },
  { name: "文登", geoCoord: [122.05, 37.2] },
  { name: "上海", geoCoord: [121.48, 31.22] },
  { name: "攀枝花", geoCoord: [101.718637, 26.582347] },
  { name: "威海", geoCoord: [122.1, 37.5] },
  { name: "承德", geoCoord: [117.93, 40.97] },
  { name: "厦门", geoCoord: [118.1, 24.46] },
  { name: "汕尾", geoCoord: [115.375279, 22.786211] },
  { name: "潮州", geoCoord: [116.63, 23.68] },
  { name: "丹东", geoCoord: [124.37, 40.13] },
  { name: "太仓", geoCoord: [121.1, 31.45] },
  { name: "曲靖", geoCoord: [103.79, 25.51] },
  { name: "烟台", geoCoord: [121.39, 37.52] },
  { name: "福州", geoCoord: [119.3, 26.08] },
  { name: "瓦房店", geoCoord: [121.979603, 39.627114] },
  { name: "即墨", geoCoord: [120.45, 36.38] },
  { name: "抚顺", geoCoord: [123.97, 41.97] },
  { name: "玉溪", geoCoord: [102.52, 24.35] },
  { name: "张家口", geoCoord: [114.87, 40.82] },
  { name: "阳泉", geoCoord: [113.57, 37.85] },
  { name: "莱州", geoCoord: [119.942327, 37.177017] },
  { name: "湖州", geoCoord: [120.1, 30.86] },
  { name: "汕头", geoCoord: [116.69, 23.39] },
  { name: "昆山", geoCoord: [120.95, 31.39] },
  { name: "宁波", geoCoord: [121.56, 29.86] },
  { name: "湛江", geoCoord: [110.359377, 21.270708] },
  { name: "揭阳", geoCoord: [116.35, 23.55] },
  { name: "荣成", geoCoord: [122.41, 37.16] },
  { name: "连云港", geoCoord: [119.16, 34.59] },
  { name: "葫芦岛", geoCoord: [120.836932, 40.711052] },
  { name: "常熟", geoCoord: [120.74, 31.64] },
  { name: "东莞", geoCoord: [113.75, 23.04] },
  { name: "河源", geoCoord: [114.68, 23.73] },
  { name: "淮安", geoCoord: [119.15, 33.5] },
  { name: "泰州", geoCoord: [119.9, 32.49] },
  { name: "南宁", geoCoord: [108.33, 22.84] },
  { name: "营口", geoCoord: [122.18, 40.65] },
  { name: "惠州", geoCoord: [114.4, 23.09] },
  { name: "江阴", geoCoord: [120.26, 31.91] },
  { name: "蓬莱", geoCoord: [120.75, 37.8] },
  { name: "韶关", geoCoord: [113.62, 24.84] },
  { name: "嘉峪关", geoCoord: [98.289152, 39.77313] },
  { name: "广州", geoCoord: [113.23, 23.16] },
  { name: "延安", geoCoord: [109.47, 36.6] },
  { name: "太原", geoCoord: [112.53, 37.87] },
  { name: "清远", geoCoord: [113.01, 23.7] },
  { name: "中山", geoCoord: [113.38, 22.52] },
  { name: "昆明", geoCoord: [102.73, 25.04] },
  { name: "寿光", geoCoord: [118.73, 36.86] },
  { name: "盘锦", geoCoord: [122.070714, 41.119997] },
  { name: "长治", geoCoord: [113.08, 36.18] },
  { name: "深圳", geoCoord: [114.07, 22.62] },
  { name: "珠海", geoCoord: [113.52, 22.3] },
  { name: "宿迁", geoCoord: [118.3, 33.96] },
  { name: "咸阳", geoCoord: [108.72, 34.36] },
  { name: "铜川", geoCoord: [109.11, 35.09] },
  { name: "平度", geoCoord: [119.97, 36.77] },
  { name: "佛山", geoCoord: [113.11, 23.05] },
  { name: "海口", geoCoord: [110.35, 20.02] },
  { name: "江门", geoCoord: [113.06, 22.61] },
  { name: "章丘", geoCoord: [117.53, 36.72] },
  { name: "肇庆", geoCoord: [112.44, 23.05] },
  { name: "大连", geoCoord: [121.62, 38.92] },
  { name: "临汾", geoCoord: [111.5, 36.08] },
  { name: "吴江", geoCoord: [120.63, 31.16] },
  { name: "石嘴山", geoCoord: [106.39, 39.04] },
  { name: "沈阳", geoCoord: [123.38, 41.8] },
  { name: "苏州", geoCoord: [120.62, 31.32] },
  { name: "茂名", geoCoord: [110.88, 21.68] },
  { name: "嘉兴", geoCoord: [120.76, 30.77] },
  { name: "长春", geoCoord: [125.35, 43.88] },
  { name: "胶州", geoCoord: [120.03336, 36.264622] },
  { name: "银川", geoCoord: [106.27, 38.47] },
  { name: "张家港", geoCoord: [120.555821, 31.875428] },
  { name: "三门峡", geoCoord: [111.19, 34.76] },
  { name: "锦州", geoCoord: [121.15, 41.13] },
  { name: "南昌", geoCoord: [115.89, 28.68] },
  { name: "柳州", geoCoord: [109.4, 24.33] },
  { name: "三亚", geoCoord: [109.511909, 18.252847] },
  { name: "自贡", geoCoord: [104.778442, 29.33903] },
  { name: "吉林", geoCoord: [126.57, 43.87] },
  { name: "阳江", geoCoord: [111.95, 21.85] },
  { name: "泸州", geoCoord: [105.39, 28.91] },
  { name: "西宁", geoCoord: [101.74, 36.56] },
  { name: "宜宾", geoCoord: [104.56, 29.77] },
  { name: "呼和浩特", geoCoord: [111.65, 40.82] },
  { name: "成都", geoCoord: [104.06, 30.67] },
  { name: "大同", geoCoord: [113.3, 40.12] },
  { name: "镇江", geoCoord: [119.44, 32.2] },
  { name: "桂林", geoCoord: [110.28, 25.29] },
  { name: "张家界", geoCoord: [110.479191, 29.117096] },
  { name: "宜兴", geoCoord: [119.82, 31.36] },
  { name: "北海", geoCoord: [109.12, 21.49] },
  { name: "西安", geoCoord: [108.95, 34.27] },
  { name: "金坛", geoCoord: [119.56, 31.74] },
  { name: "东营", geoCoord: [118.49, 37.46] },
  { name: "牡丹江", geoCoord: [129.58, 44.6] },
  { name: "遵义", geoCoord: [106.9, 27.7] },
  { name: "绍兴", geoCoord: [120.58, 30.01] },
  { name: "扬州", geoCoord: [119.42, 32.39] },
  { name: "常州", geoCoord: [119.95, 31.79] },
  { name: "潍坊", geoCoord: [119.1, 36.62] },
  { name: "重庆", geoCoord: [106.54, 29.59] },
  { name: "台州", geoCoord: [121.420757, 28.656386] },
  { name: "南京", geoCoord: [118.78, 32.04] },
  { name: "滨州", geoCoord: [118.03, 37.36] },
  { name: "贵阳", geoCoord: [106.71, 26.57] },
  { name: "无锡", geoCoord: [120.29, 31.59] },
  { name: "本溪", geoCoord: [123.73, 41.3] },
  { name: "克拉玛依", geoCoord: [84.77, 45.59] },
  { name: "渭南", geoCoord: [109.5, 34.52] },
  { name: "马鞍山", geoCoord: [118.48, 31.56] },
  { name: "宝鸡", geoCoord: [107.15, 34.38] },
  { name: "焦作", geoCoord: [113.21, 35.24] },
  { name: "句容", geoCoord: [119.16, 31.95] },
  { name: "北京", geoCoord: [116.46, 39.92] },
  { name: "徐州", geoCoord: [117.2, 34.26] },
  { name: "衡水", geoCoord: [115.72, 37.72] },
  { name: "包头", geoCoord: [110, 40.58] },
  { name: "绵阳", geoCoord: [104.73, 31.48] },
  { name: "乌鲁木齐", geoCoord: [87.68, 43.77] },
  { name: "枣庄", geoCoord: [117.57, 34.86] },
  { name: "杭州", geoCoord: [120.19, 30.26] },
  { name: "淄博", geoCoord: [118.05, 36.78] },
  { name: "鞍山", geoCoord: [122.85, 41.12] },
  { name: "溧阳", geoCoord: [119.48, 31.43] },
  { name: "库尔勒", geoCoord: [86.06, 41.68] },
  { name: "安阳", geoCoord: [114.35, 36.1] },
  { name: "开封", geoCoord: [114.35, 34.79] },
  { name: "济南", geoCoord: [117, 36.65] },
  { name: "德阳", geoCoord: [104.37, 31.13] },
  { name: "温州", geoCoord: [120.65, 28.01] },
  { name: "九江", geoCoord: [115.97, 29.71] },
  { name: "邯郸", geoCoord: [114.47, 36.6] },
  { name: "临安", geoCoord: [119.72, 30.23] },
  { name: "兰州", geoCoord: [103.73, 36.03] },
  { name: "沧州", geoCoord: [116.83, 38.33] },
  { name: "临沂", geoCoord: [118.35, 35.05] },
  { name: "南充", geoCoord: [106.110698, 30.837793] },
  { name: "天津", geoCoord: [117.2, 39.13] },
  { name: "富阳", geoCoord: [119.95, 30.07] },
  { name: "泰安", geoCoord: [117.13, 36.18] },
  { name: "诸暨", geoCoord: [120.23, 29.71] },
  { name: "郑州", geoCoord: [113.65, 34.76] },
  { name: "哈尔滨", geoCoord: [126.63, 45.75] },
  { name: "聊城", geoCoord: [115.97, 36.45] },
  { name: "芜湖", geoCoord: [118.38, 31.33] },
  { name: "唐山", geoCoord: [118.02, 39.63] },
  { name: "平顶山", geoCoord: [113.29, 33.75] },
  { name: "邢台", geoCoord: [114.48, 37.05] },
  { name: "德州", geoCoord: [116.29, 37.45] },
  { name: "济宁", geoCoord: [116.59, 35.38] },
  { name: "荆州", geoCoord: [112.239741, 30.335165] },
  { name: "宜昌", geoCoord: [111.3, 30.7] },
  { name: "义乌", geoCoord: [120.06, 29.32] },
  { name: "丽水", geoCoord: [119.92, 28.45] },
  { name: "洛阳", geoCoord: [112.44, 34.7] },
  { name: "秦皇岛", geoCoord: [119.57, 39.95] },
  { name: "株洲", geoCoord: [113.16, 27.83] },
  { name: "石家庄", geoCoord: [114.48, 38.03] },
  { name: "莱芜", geoCoord: [117.67, 36.19] },
  { name: "常德", geoCoord: [111.69, 29.05] },
  { name: "保定", geoCoord: [115.48, 38.85] },
  { name: "湘潭", geoCoord: [112.91, 27.87] },
  { name: "金华", geoCoord: [119.64, 29.12] },
  { name: "岳阳", geoCoord: [113.09, 29.37] },
  { name: "长沙", geoCoord: [113, 28.21] },
  { name: "衢州", geoCoord: [118.88, 28.97] },
  { name: "廊坊", geoCoord: [116.7, 39.53] },
  { name: "菏泽", geoCoord: [115.480656, 35.23375] },
  { name: "合肥", geoCoord: [117.27, 31.86] },
  { name: "武汉", geoCoord: [114.31, 30.52] },
  { name: "大庆", geoCoord: [125.03, 46.58] },
];
  const option = {
    legend: {
      show: true,
      orient: "vertical",
      left: "30%",
      bottom: "37%",
      data: ["弱", "中", "强"],
      textStyle: {
        color: "#fff",
        fontSize: 14
      },
      itemWidth: 20,
      itemHeight: 14,
      itemGap: 15
    },
    geo: [
      // 最外围发光边界
      {
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '100%',
        z: 12,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            // borderColor: 'rgb(180, 137, 81)',
            borderColor: '#5dffee',
            borderWidth: 8,
            // shadowColor: 'rgba(218, 163, 88, 0.4)',
            // shadowBlur: 20
          },
          emphasis: {
            borderColor: '#5dffee',
            borderWidth: 8
          }
        },
        label: {
          show: false,
          color: '#fff',
          fontSize: 14
        }
      },
      // 最外层遮罩蒙版
      {
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '100%',
        z: 14,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            // areaColor: 'rgba(106, 125, 171, 0.45)',
            // areaColor: '#5dffee',
            // borderWidth: 0
             areaColor: {
              image: mapBg
            },
            // areaColor: '#0141a0',
            borderColor: '#5dffee',
          },
          emphasis: {
            areaColor: {
              image: mapBg
            },
            borderColor: '#5dffee',
          }
        },
        label: {
          show: false,
          color: '#fff',
          fontSize: 14
        }
      },
      // 内部蓝色边界
      {
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '100%',
        z: 12,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            areaColor: {
              image: mapBg
            },
            // areaColor: '#0141a0',
            borderColor: '#5dffee',
            borderWidth: 1
          },
          emphasis: {
            areaColor: {
              image: mapBg
            },
            borderColor: '#5dffee',
            borderWidth: 1
          }
        },
        label: {
          show: false,
          color: '#fff',
          fontSize: 14
        }
      },
      ...geoList
    ],
    series: [
       // 保留大规模 markPoint 特效（弱）
      {
        name: "弱",
        type: "effectScatter",
        coordinateSystem: "geo",
        geoIndex: 2,
        zlevel: 3,
        symbolSize: 3,
        large: true,
        effectType: "ripple",
        rippleEffect: {
          show: true,
          brushType: "stroke",
        },
        itemStyle: {
          color: "#2688F0",
        },
        data: (() => {
          const data = [];
          const len = 50;
          let geoCoord;
          for (let i = 0; i < len; i++) {
            geoCoord = placeList[i % placeList.length].geoCoord;
            data.push({
              name: placeList[i % placeList.length].name + i,
              // value: 10,
              // ECharts 5.x effectScatter 只认 value: [lng, lat]
              // 但可以加 name
              value: [
                geoCoord[0] + Math.random() * 5 - 2.5,
                geoCoord[1] + Math.random() * 3 - 1.5,
              ],
            });
          }
          return data;
        })(),
      },
      // 保留大规模 markPoint 特效（中）
      {
        name: "中",
        type: "effectScatter",
        coordinateSystem: "geo",
        geoIndex: 2,
        zlevel: 3,
        symbolSize: 4,
        large: true,
        effectType: "ripple",
        rippleEffect: {
          show: true,
          brushType: "stroke",
        },
        itemStyle: {
          color: "#21C7C7",
        },
        data: (() => {
          const data = [];
          const len = 10;
          let geoCoord;
          for (let i = 0; i < len; i++) {
            geoCoord = placeList[i % placeList.length].geoCoord;
            data.push({
              name: placeList[i % placeList.length].name + i,
              // value: 50,
              value: [
                geoCoord[0] + Math.random() * 5 - 2.5,
                geoCoord[1] + Math.random() * 3 - 1.5,
              ],
            });
          }
          return data;
        })(),
      },
      // 保留大规模 markPoint 特效（强）
      {
        name: "强",
        type: "effectScatter",
        coordinateSystem: "geo",
        geoIndex: 2,
        zlevel: 3,
        symbolSize: 5,
        large: true,
        effectType: "ripple",
        rippleEffect: {
          show: true,
          brushType: "stroke",
        },
        itemStyle: {
          color: "#F6F6F6",
        },
        data: (function () {
          var data = [];
          var len = placeList.length;
          while (len--) {
            data.push({
              name: placeList[len].name,
              // value: 90,
              value: placeList[len].geoCoord,
            });
          }
          return data;
        })(),
      },
      // 地图数据柱子
      // ...lineSeriesData
    ]
  }
  return option
}

// 生成地图数据柱数据
const getLineData = () => {
  const districtData: {
    name: string
    value: number
    point: number[]
  }[] = [
    {
      name: '青岛市',
      value: 267,
      point: [120.150883, 36.451227]
    },
    {
      name: '济南市',
      value: 200,
      point: [117.221211, 36.640013]
    },
    {
      name: '临沂市',
      value: 129,
      point: [118.326443, 35.065282]
    },
    {
      name: '潍坊市',
      value: 107,
      point: [119.107078, 36.70925]
    },
    {
      name: '济宁市',
      value: 86,
      point: [116.740918, 35.371173]
    }
  ]
  const lineSeriesData: any = []
  const maxValue: number = Math.max(...districtData.map(item => item.value))
  districtData.forEach((item: any, index: number) => {
    // 柱子
    const lineData = {
      type: 'lines',
      zlevel: 5,
      effect: {
        show: false,
        symbolSize: 5
      },
      lineStyle: {
        width: 10,
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(232, 204, 149, 1)'
            },
            {
              offset: 1,
              color: 'rgba(170, 144, 91, 1)'
            }
          ],
          global: false
        },
        opacity: 1,
        curveness: 0
      },
      label: {
        show: 0,
        position: 'end',
        formatter: '245'
      },
      silent: true,
      data: [
        {
          ...item,
          coords: [item.point, [item.point[0], item.point[1] + item.value / maxValue]]
        }
      ]
    }
    // 柱子顶部
    const lineTop: any = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 5,
      label: {
        show: false
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: 'rgba(255, 255, 179, 1)'
      },
      silent: true,
      data: [
        [item.point[0], item.point[1] + item.value / maxValue],
        [item.point[0], item.point[1] + item.value / maxValue]
      ]
    }
    // 柱子底部
    const lineBottom: any = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 4,
      label: {
        show: false
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(232, 204, 149, 1)'
            },
            {
              offset: 1,
              color: 'rgba(170, 144, 91, 1)'
            }
          ],
          global: false
        }
      },
      silent: true,
      data: [item.point]
    }
    // 底部光圈
    const lineBottomCircle: any = {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [
        {
          name: item['name'],
          value: [item.point[0], item.point[1], item['value']]
        }
      ],
      showEffectOn: 'render',
      rippleEffect: {
        scale: 5,
        brushType: 'stroke'
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'bottom',
          show: false,
          color: '#fff',
          distance: 10
        }
      },
      symbol: 'circle',
      symbolSize: [20, 10],
      itemStyle: {
        normal: {
          color: 'rgba(232, 204, 149, 1)',
          shadowBlur: 10,
          shadowColor: 'rgba(232, 204, 149, 1)'
        },
        opacity: 1
      },
      zlevel: 4
    }
    // 顶部图标
    const lineTopIcon = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 5,
      label: {
        normal: {
          show: true,
          formatter: function (params: any) {
            return `{cityName|${params.name}}\n {value|${params.data.data}} {unit|万人}`
          },
          rich: {
            cityName: {
              color: 'rgba(201, 211, 234, 1)',
              fontSize: 14,
              padding: [6, 0, 4, 48]
            },
            value: {
              color: 'rgba(255, 187, 94, 1)',
              fontSize: 18,
              fontWeight: 800,
              padding: [0, 0, 0, 44]
            },
            unit: {
              color: 'rgba(255, 187, 94, 1)',
              fontSize: 14
            }
          }
        },
        emphasis: {
          show: true
        }
      },
      symbol: `image://` + lineTopList[index],
      symbolSize: [143, 48],
      symbolOffset: [0, 0],
      z: 999,
      data: [
        {
          name: item.name,
          data: item.value,
          value: [item.point[0], item.point[1] + item.value / maxValue + 0.2]
        }
      ]
    }
    lineSeriesData.push(lineData)
    lineSeriesData.push(lineTop)
    lineSeriesData.push(lineBottom)
    lineSeriesData.push(lineBottomCircle)
    lineSeriesData.push(lineTopIcon)
  })
  return lineSeriesData
}
