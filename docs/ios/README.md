---
sidebarDepth: 1
---

# iOS SDK

## 快速集成

### 使用 CocoaPods

```bash
$ pod setup # 推荐
$ pod 'Soundlinks-iOS-SDK'
```

不要忘记检查是否已添加麦克风使用权限：

```xml
<key>NSMicrophoneUsageDescription</key>
<string>接入 SOUNDLINKS 服务需要打开麦克风</string>
```

## 使用方法

### 初始化

初始化一个 `SLRecognizer`，像这样开始：

```objectivec
#import "ViewController.h"
#import "SLRecognizer.h"

@interface ViewController() <SLRecognizerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [[SLRecognizer sharedInstance] initWithAppId:@"APP_ID" appSecret:@"APP_SECRET"];
    [SLRecognizer sharedInstance].delegate = self;
}

@end
```

### 开始识别

```objectivec
[[SLRecognizer sharedInstance] enable];
```

### 识别结果的代理

```objectivec
- (void)recognizer:(SLRecognizer *)recognizer code:(NSString *)code
{
    NSLog(@"Soundlinks code = %@", code);
}
```

识别到的 `code` 并不可读，需要调用下一步的方法。

### 获取 token

将上一步代理方法中的 `code` 转换成用来请求数据的 `token`，其有效期为 5 分钟。在有效期内可使用该 `token` 请求[识别结果 API](/result/) 以获取歌曲最终的 Soundlinks 信息。

```objectivec
NSString *token = [[SLRecognizer sharedInstance] getTokenWithCode:code];
```

### 停止识别

```objectivec
[[SLRecognizer sharedInstance] disable];
```

## 反馈建议

有任何问题和建议请在此[提出](https://github.com/soundlinks/Soundlinks-iOS-SDK/issues/new) ，我们会及时处理。

