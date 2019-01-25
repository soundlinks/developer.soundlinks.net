---
sidebarDepth: 1
---

# iOS SDK

## 快速集成

1. 解压 zip 文件得到 **libSoundlinksSDK.a** 和 **SLNeoRecognizer.h** 两个文件
2. Xcode -> File -> Add Files to "Your Project"，在弹出面板中选择上一步下载的两个文件 -> Add（勾选“Copy items if needed”）
3. 选中 Info.plist -> Open As -> Source Code，在其中

添加麦克风使用权限

```xml
<key>NSMicrophoneUsageDescription</key>
<string>接入 SOUNDLINKS 服务需要打开麦克风</string>
```

## 基本用法

### 初始化

在一个 ViewController 中识别 Soundlinks，像这样开始：

```objectivec
#import "ViewController.h"
#import "SLNeoRecognizer.h"

@interface ViewController() <SLNeoRecognizerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [[SLNeoRecognizer sharedInstance] initWithAppId:@"APP_ID" appKey:@"APP_KEY"];
    [SLNeoRecognizer sharedInstance].delegate = self;
}

@end
```

### 开始识别

```objectivec
[[SLNeoRecognizer sharedInstance] enable];
```

### 识别结果回调

```objectivec
- (void)recognizer:(SLNeoRecognizer *)recognizer code:(NSString *)code
{
    NSLog(@"Soundlinks code = %@", code);
}
```

### 获取 token

```objectivec
// 有效时间 5 分钟
NSString *token = [[SLNeoRecognizer sharedInstance] getTokenWithCode:code];
```

### 停止识别

```objectivec
[[SLNeoRecognizer sharedInstance] disable];
```

## 反馈问题

[提交问题](https://github.com/soundlinks/Soundlinks-iOS-SDK/issues/new) 后我们会及时处理。

