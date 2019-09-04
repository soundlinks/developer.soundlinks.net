---
sidebarDepth: 1
---

# iOS SDK

## 安装

### 使用 CocoaPods

```ruby
# Podfile
pod 'Soundlinks-iOS-SDK'
```

```bash
$ pod setup    # 推荐
$ pod install
```

不要忘记检查 **Info.plist** 中是否已添加麦克风使用权限：

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

### 停止识别

```objectivec
[[SLRecognizer sharedInstance] disable];
```

## 反馈建议

有任何问题和建议请在此[提出](https://github.com/soundlinks/Soundlinks-iOS-SDK/issues/new) ，我们会及时处理。

