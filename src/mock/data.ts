// Mock 数据示例
export const mockTourismStats = {
  code: 200,
  message: 'success',
  success: true,
  data: {
    totalRevenue: 12345.6,
    totalVisitors: 731.2,
    totalExpenditure: 8373.1
  }
}

export const mockScenicSpotRanking = {
  code: 200,
  message: 'success',
  success: true,
  data: [
    { id: 1, name: '泰山', location: '泰安市', visitors: 15000, rating: 4.8 },
    { id: 2, name: '崂山', location: '青岛市', visitors: 12000, rating: 4.6 },
    { id: 3, name: '蓬莱阁', location: '烟台市', visitors: 10000, rating: 4.5 },
    { id: 4, name: '趵突泉', location: '济南市', visitors: 8000, rating: 4.4 },
    { id: 5, name: '大明湖', location: '济南市', visitors: 7000, rating: 4.3 }
  ]
}

export const mockAgeDistribution = {
  code: 200,
  message: 'success',
  success: true,
  data: [
    { age: '0-18', count: 1200, percentage: 15 },
    { age: '19-30', count: 2400, percentage: 30 },
    { age: '31-45', count: 2800, percentage: 35 },
    { age: '46-60', count: 1200, percentage: 15 },
    { age: '60+', count: 400, percentage: 5 }
  ]
}

export const mockHotWords = {
  code: 200,
  message: 'success',
  success: true,
  data: [
    { word: '泰山', count: 156, trend: 'up' },
    { word: '青岛', count: 142, trend: 'up' },
    { word: '济南', count: 128, trend: 'stable' },
    { word: '烟台', count: 98, trend: 'down' },
    { word: '威海', count: 86, trend: 'up' },
    { word: '日照', count: 72, trend: 'stable' },
    { word: '临沂', count: 65, trend: 'down' },
    { word: '潍坊', count: 58, trend: 'up' }
  ]
}

export const mockVehicleUsage = {
  code: 200,
  message: 'success',
  success: true,
  data: {
    cities: ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'],
    data: [
      { city: '北京', duration: 112, usage: 85 },
      { city: '上海', duration: 110, usage: 82 },
      { city: '深圳', duration: 108, usage: 80 },
      { city: '广州', duration: 105, usage: 78 },
      { city: '苏州', duration: 102, usage: 75 }
    ]
  }
}

export const mockIndustryRevenue = {
  code: 200,
  message: 'success',
  success: true,
  data: {
    runtime1: 345,
    runtime2: 145,
    maxRuntime: 500
  }
}

export const mockMapData = {
  code: 200,
  message: 'success',
  success: true,
  data: {
    regions: [
      { name: '济南', value: 267, coordinates: [117.221211, 36.640013] },
      { name: '青岛', value: 200, coordinates: [120.150883, 36.451227] },
      { name: '临沂', value: 129, coordinates: [118.326443, 35.065282] },
      { name: '潍坊', value: 107, coordinates: [119.107078, 36.70925] },
      { name: '济宁', value: 86, coordinates: [116.740918, 35.371173] }
    ],
    connections: [
      { from: [117.221211, 36.640013], to: [120.150883, 36.451227], value: 50 },
      { from: [120.150883, 36.451227], to: [118.326443, 35.065282], value: 35 },
      { from: [118.326443, 35.065282], to: [119.107078, 36.70925], value: 28 }
    ]
  }
}
