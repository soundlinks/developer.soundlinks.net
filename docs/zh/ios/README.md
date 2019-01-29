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

识别到的 `code` 并不可读，需要调用下方生成 `token` 的方法。

### 生成 token

将代理方法中的 `code` 转换成用来请求数据的 `token`，其有效期为 5 分钟。在有效期内可使用该 `token` 请求「[识别结果 API](/result/)」以获取歌曲最终的 Soundlinks 信息。

```objectivec
NSString *token = [[SLRecognizer sharedInstance] getTokenWithCode:code];
```

::: tip 为什么识别结果要分 code 和 token？
`code` 相当于歌曲的 ID，每首歌都不同；`token` 一是考虑到每个 APP 的应用场景都不同，所以由开发者自行决定网络请求的时机；二是为了省去开发者自行生成签名麻烦，所以封装了生成 `token` 的方法。
:::

### 停止识别

```objectivec
[[SLRecognizer sharedInstance] disable];
```

## 反馈建议

有任何问题和建议请在此[提出](https://github.com/soundlinks/Soundlinks-iOS-SDK/issues/new) ，我们会及时处理。

