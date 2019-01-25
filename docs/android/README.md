---
sidebarDepth: 1
---

# Android SDK

## 快速集成

### 添加 AAR 文件

1. 复制 aar 文件到`libs`目录。
2. 在项目`builde.gradle`声明`libs`目录。
   ```groovy
   repositories {
       flatDir {
           dirs 'libs'
       }
   }
   ```
3. 在项目`builde.gradle`添加 aar 依赖。
   ```groovy
   dependencies {
       compile(name:'soundlinkssdk-release', ext:'aar')
   }
   ```

### 配置 gradle

在项目 `build.gradle` 添加：

```groovy
dependencies {
    api 'io.jsonwebtoken:jjwt-api:0.10.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.10.5'
    runtimeOnly('io.jsonwebtoken:jjwt-orgjson:0.10.5') {
        exclude group: 'org.json', module: 'json' //provided by Android natively
    }
}
```

### 配置清单文件

```xml
<!-- 配置麦克风权限 -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>

<!-- 在 application 节点配置 appId 和 appSecret -->
<meta-data android:name="SOUNLINKS_APPID" android:value="appId"/>
<meta-data android:name="SOUNLINKS_APPSECRET" android:value="appSecret"/>
```

### 添加 so 文件

有两种方法可以往项目中添加 so 文件：

#### 方法一

在下载的开发包中拷贝需要的 CPU 架构对应的 so 文件文件夹到 `app/libs` 目录下，在 `app` 目录下的 **build.gradle** 文件中 `android` 块中配置 `sourceSets` 标签，如果没有使用该标签则新增，详细配置代码如下：

```groovy
sourceSets {
    main {
        jniLibs.srcDir 'libs'
    }
}
```

#### 方法二

在 `src/main/` 目录下新建 `jniLibs` 目录（如果你的项目中已经包含该目录不用重复创建），在下载的开发包中拷贝项目中需要的 CPU 架构对应的 so 文件文件夹到 `jniLibs` 目录。

## 基本用法

### Application 类初始化

```java
Soundlinks.init(this, appId, appKey, false);
```

配置字段说明

| 参数 | 说明 |
|:----:|:----: |
| Context context | 上下文 |
| String appId | appId，可在清单文件配置 |
| String appKey | appKey，可在清单文件配置 |
| Boolean isLog | 是否开启日志 |

### 创建 `SLRecognizer`

创建`SoundLinksRecognizer`实例，并注册回调监听。

```java
SLRecognizer recognizer = new SLRecognizer(new SLRecognizerListener() {
    @Override
    public void onResult(int code) {

    }
    @Override
    public void onError(int i, String s) {

    }
});
```

### 开始识别

```java
recognizer.start();
```

### 结束识别

```java
recognizer.stop();
```

### 生成 token

```java
// 传入识别到的 code 生成 token
String token = SoundlinksJWT.getInstance().generateToken(code);
```

## 代码混淆

```
# soundlinks
-keep class net.soundlinks.commonsdk.** { *; }

# jjwt
-keepattributes InnerClasses

-keep class io.jsonwebtoken.** { *; }
-keepnames class io.jsonwebtoken.* { *; }
-keepnames interface io.jsonwebtoken.* { *; }

-keep class org.bouncycastle.** { *; }
-keepnames class org.bouncycastle.** { *; }
-dontwarn org.bouncycastle.**
```

## 反馈问题

[提交问题](https://github.com/soundlinks/Soundlinks-Android-SDK/issues/new) 后我们会及时处理。
