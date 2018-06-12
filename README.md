
## 环境依赖

nodejs

## ionic命令行工具

### 安装依赖

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

### 平台添加

```bash
$ ionic cordova platform add ios|android
$ ionic cordova run ios|android
```


### 平台启动-web

```bash
$ ionic cordova serve
```

### 平台启动-模拟器

```bash
$ ionic cordova run ios|android
```

### 平台构建-测试

```bash
$ ionic cordova build ios|android
```

### 平台构建-发布

```bash
$ ionic cordova build ios|android --prod --release
```
