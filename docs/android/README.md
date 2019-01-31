---
sidebarDepth: 1
---

# Android SDK

## Installation

### Configuring gradle

Add these lines in project's **build.gradle**:

```groovy
allprojects {
    repositories {
        maven {
            url 'https://raw.githubusercontent.com/soundlinks/Soundlinks-Android-SDK/master'
        }
    }
}
```

Add these lines in app's **build.gradle**:

```groovy
dependencies {
    implementation 'net.soundlinks:soundlinksSDK:1.0.0'
}
```

### Editing manifest.xml

```xml
<!-- Configure microphone permission -->
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>

<!-- Add appId and appSecret in application -->
<meta-data android:name="SOUNLINKS_APPID" android:value="appId"/>
<meta-data android:name="SOUNLINKS_APPSECRET" android:value="appSecret"/>
```

## Usage

### Initialization

```java
Soundlinks.init(this, appId, appSecret, false);
```

Arguments notes:

| Argument | comment |
|:----:|:----: |
| `Context context` | Context |
| `String appId` | APP_ID，configurable in manifest |
| `String appSecret` | APP_SECRET，configurable in manifest |
| `Boolean isLog` | Log on/off |

### Create `SLRecognizer`

Create an `SLRecognizer` instance and register callback:

```java
SLRecognizer recognizer = new SLRecognizer(new SLRecognizerListener() {
    @Override
    public void onResult(String code) {

    }
});
```

The `code` here is not readable, you need to invoke the method of generating `token` followed.

### Starting recognizer

```java
recognizer.start();
```

### Stopping recognizer

```java
recognizer.stop();
```

### Generating token

Convert the `code` got in the callback to `token` in order to request data, which will be expired in 5 minutes. During that time you can get final Soundlinks information with the `token` by requesting [Recognition result API](/result/).

```java
String token = SoundlinksJWT.getInstance().generateToken(code);
```

::: tip Why code and token？

`code` is like a song's ID which is unique for each one. `token` is used for two reasons:

- Every APP has its different usage, so we let developers to decide when to fire the network request.
- To save the time for developers to generate signature by themselves, we wrap up this method to generate `token`.

:::

### ProGuard

Depending on your ProGuard config and usage, you may need to include the following lines:

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

## Feedback

If you have any issues or suggestions, please [submit here](https://github.com/soundlinks/Soundlinks-Android-SDK/issues/new) and we are ready to help.
