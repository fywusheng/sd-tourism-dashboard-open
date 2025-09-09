# 低碳出行数据大屏API接口文档

## 接口概述

本文档描述了飞鸽电动自行车低碳出行数据大屏的核心数据获取接口，提供实时的用户活跃度、车辆状态、地理分布等关键指标数据。

## 接口信息

- **接口名称**: 获取大屏核心数据
- **请求方式**: GET
- **接口路径**: `http://121.89.87.166/api/device/low-carbon-dashboard/core-data`
- **接口描述**: 获取低碳出行数据大屏展示所需的核心统计数据

## 请求参数

无请求参数

## 响应格式

### 成功响应示例

```json
{
    "code": "200",
    "message": "操作成功",
    "data": {
        "ridingUserRate": 0.0,
        "totalUsers": 4,
        "activationRate": 0.0,
        "totalVehicles": 4,
        "updateTime": "Mon Sep 08 02:41:11 CST 2025",
        "mapDescription": "此地图为今日飞鸽电动自行车在全国各省范围内的行驶用户数据分布图",
        "onlineRate": 100.0,
        "projected2025Duration": 0.0,
        "dashboardTitle": "飞鸽电动绿色出行数据大屏",
        "mapData": [
            {
                "name": "北京",
                "geoCoord": [116.4072, 39.9041],
                "usageDuration": 105,
                "vehicleCount": 1,
                "userCount": 1
            }
        ],
        "projected2025Activation": 8,
        "todayRidingUsers": 0,
        "currentOnlineVehicles": 4,
        "projected2025Sales": 8,
        "todayActivatedUsers": 0
    },
    "timestamp": 1757270471001,
    "success": true
}
```

## 响应字段说明

### 基础响应字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| code | String | 响应状态码，"200"表示成功 |
| message | String | 响应消息，成功时为"操作成功" |
| success | Boolean | 请求是否成功 |
| timestamp | Long | 响应时间戳（毫秒） |
| data | Object | 核心数据对象 |

### 核心数据字段 (data)

| 字段名 | 类型 | 说明 | 单位 |
|--------|------|------|------|
| dashboardTitle | String | 大屏标题 | - |
| updateTime | String | 数据更新时间 | - |
| mapDescription | String | 地图数据描述说明 | - |

### 用户相关统计

| 字段名 | 类型 | 说明 | 单位 |
|--------|------|------|------|
| totalUsers | Integer | 系统总用户数 | 人 |
| todayActivatedUsers | Integer | 今日激活用户数 | 人 |
| activationRate | Double | 用户激活率 | % |
| todayRidingUsers | Integer | 今日骑行用户数 | 人 |
| ridingUserRate | Double | 今日骑行用户占比 | % |

### 车辆相关统计

| 字段名 | 类型 | 说明 | 单位 |
|--------|------|------|------|
| totalVehicles | Integer | 系统总车辆数 | 辆 |
| currentOnlineVehicles | Integer | 当前在线车辆数 | 辆 |
| onlineRate | Double | 车辆在线率 | % |

### 2025年预测数据

| 字段名 | 类型 | 说明 | 单位 |
|--------|------|------|------|
| projected2025Sales | Integer | 2025年预测总销量 | 万台 |
| projected2025Duration | Double | 2025年预测总运行时长 | 万小时 |
| projected2025Activation | Integer | 2025年预测总激活量 | 万台 |

### 地图数据 (mapData)

地图数据是一个数组，包含各省份的详细统计信息：

| 字段名 | 类型 | 说明 | 单位 |
|--------|------|------|------|
| name | String | 省份名称 | - |
| geoCoord | Array | 地理坐标 [经度, 纬度] | - |
| usageDuration | Integer | 该省份使用时长 | 分钟 |
| vehicleCount | Integer | 该省份车辆数量 | 辆 |
| userCount | Integer | 该省份用户数量 | 人 |

## 数据说明

### 统计时间范围
- **今日数据**: 基于当前日期的数据统计
- **历史数据**: 基于最近30天的数据进行分析
- **预测数据**: 基于历史数据趋势进行2025年预测

### 地理分布
- 地图数据基于用户骑行记录的起始位置进行省份识别
- 支持全国34个省级行政区的数据统计
- 坐标系统采用WGS84标准

### 数据更新频率
- 实时数据：车辆在线状态、用户活跃度
- 定时更新：统计数据每小时更新一次
- 地图数据：基于最近30天骑行记录生成

## 错误响应

### 常见错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 500 | 服务器内部错误 | 检查服务状态，查看日志 |
| 400 | 请求参数错误 | 检查请求格式 |
| 404 | 接口不存在 | 检查接口路径 |

### 错误响应示例

```json
{
    "code": "500",
    "message": "获取大屏核心数据失败",
    "data": null,
    "timestamp": 1757270471001,
    "success": false
}
```

## 使用示例

### JavaScript 调用示例

```javascript
// 获取大屏数据
fetch('/api/dashboard/core-data')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('总用户数:', data.data.totalUsers);
            console.log('在线车辆数:', data.data.currentOnlineVehicles);
            console.log('地图数据:', data.data.mapData);
        } else {
            console.error('获取数据失败:', data.message);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });
```

### Java 调用示例

```java
@RestController
public class DashboardController {
    
    @Autowired
    private LowCarbonDashboardService dashboardService;
    
    @GetMapping("/api/dashboard/core-data")
    public ApiResponse<DashboardCoreData> getCoreData() {
        try {
            DashboardCoreData data = dashboardService.getDashboardCoreData();
            return ApiResponse.success(data);
        } catch (Exception e) {
            return ApiResponse.error("获取大屏核心数据失败");
        }
    }
}
```

## 注意事项

1. **数据准确性**: 统计数据基于实时数据库查询，可能存在轻微延迟
2. **性能考虑**: 接口包含复杂的地理数据计算，建议设置合理的缓存策略
3. **数据隐私**: 地图数据已进行脱敏处理，不包含具体用户位置信息
4. **兼容性**: 建议前端使用现代浏览器，支持ES6+语法

## 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2025-09-08 | 初始版本，修复SQL查询错误 |

## 联系方式

如有问题或建议，请联系开发团队。

---

*本文档最后更新时间: 2025-09-08*
