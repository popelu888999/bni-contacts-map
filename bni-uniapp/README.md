# BNI商会成员地图 - uni-app版

## 项目说明

这是BNI商会成员地图的uni-app版本，支持编译到多个平台：
- 微信小程序
- 支付宝小程序
- H5网页
- Android App
- iOS App

## 开发环境准备

1. 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 用 HBuilderX 打开本项目文件夹

## 运行项目

### 运行到浏览器（H5）
- 点击菜单：运行 → 运行到浏览器 → Chrome

### 运行到微信小程序
1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 点击菜单：运行 → 运行到小程序模拟器 → 微信开发者工具
3. 在 manifest.json 中填入你的微信小程序 AppID

### 运行到 Android
1. 手机开启USB调试，连接电脑
2. 点击菜单：运行 → 运行到手机或模拟器 → 选择你的设备

## 打包发布

### 打包 H5
- 点击菜单：发行 → 网站-H5手机版

### 打包微信小程序
- 点击菜单：发行 → 小程序-微信

### 打包 Android App
1. 点击菜单：发行 → 原生App-云打包
2. 选择 Android
3. 使用公共测试证书或自己的证书
4. 点击打包

## 图标资源

需要在 static 文件夹中添加以下图标：
- list.png - 列表图标（未选中）
- list-active.png - 列表图标（选中）
- map.png - 地图图标（未选中）
- map-active.png - 地图图标（选中）
- marker.png - 地图标记点图标

推荐图标尺寸：81x81 像素

## 配置说明

### 微信小程序配置
编辑 manifest.json，填入：
```json
"mp-weixin": {
    "appid": "你的微信小程序AppID"
}
```

### 高德地图配置（Android/iOS App）
编辑 manifest.json，填入高德地图Key：
```json
"sdkConfigs": {
    "maps": {
        "amap": {
            "appkey_ios": "你的iOS Key",
            "appkey_android": "你的Android Key"
        }
    }
}
```

## 更新联系人数据

1. 编辑 common/contacts.js 文件
2. 或者运行主项目中的 generate_contacts_array.js 重新生成
