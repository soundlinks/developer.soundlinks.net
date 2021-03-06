---
sidebarDepth: 1
---

# Android SDK

## 安装

### 配置 gradle

在项目下的 **build.gradle** 添加：

```groovy
allprojects {
    repositories {
        maven {
            url 'https://raw.githubusercontent.com/soundlinks/Soundlinks-Android-SDK/master'
        }
    }
}
```

在 app 下的 **build.gradle** 添加：

```groovy
dependencies {
    implementation 'net.soundlinks:soundlinksSDK:1.0.0'
}
```

### 编辑 manifest.xml

```xml
<!-- 配置麦克风权限 -->
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>

<!-- 在 application 节点配置 appId 和 appSecret -->
<meta-data android:name="SOUNLINKS_APPID" android:value="appId"/>
<meta-data android:name="SOUNLINKS_APPSECRET" android:value="appSecret"/>
```

## 使用方法

### 初始化

```java
Soundlinks.init(this, appId, appSecret, false);
```

参数说明：

| 参数 | 说明 |
|:----:|:----: |
| `Context context` | 上下文 |
| `String appId` | APP_ID，可在清单文件配置 |
| `String appSecret` | APP_SECRET，可在清单文件配置 |
| `Boolean isLog` | 是否开启日志 |

### 创建 `SLRecognizer`

创建 `SLRecognizer` 实例，并注册回调监听：

```java
SLRecognizer recognizer = new SLRecognizer(new SLRecognizerListener() {
    @Override
    public void onResult(String code) {
        // result goes here
    }
});
```

识别到的 `code` 并不可读，需要调用下方生成 `token` 的方法。

### 开始识别

```java
recognizer.start();
```

### 停止识别

```java
recognizer.stop();
```

### ProGuard

根据你的 ProGuard 配置，可以添加以下内容：

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

## 反馈建议

有任何问题和建议请在此[提出](https://github.com/soundlinks/Soundlinks-Android-SDK/issues/new) ，我们会及时处理。
