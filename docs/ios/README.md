---
sidebarDepth: 1
---

# iOS SDK

## Installation

### Using CocoaPods

```ruby
# Podfile
pod 'Soundlinks-iOS-SDK'
```

```bash
$ pod setup    # recommended
$ pod install
```

Don't forget checking whether microphone usage description has been added in app's **Info.plist** file:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Using SOUNDLINKS service needs to enable your microphone</string>
```

## Usage

### Initialization

Firstly initialize `SLRecognizer` like this：

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

### Starting recognizer

```objectivec
[[SLRecognizer sharedInstance] enable];
```

### Delegate for the result

```objectivec
- (void)recognizer:(SLRecognizer *)recognizer code:(NSString *)code
{
    NSLog(@"Soundlinks code = %@", code);
}
```

The `code` here is not readable, you need to invoke the method of generating `token` followed.

### Generating token

Convert `code` got in the delegate to `token` in order to request data, which will be expired in 5 minutes. During that period of time, you can get final Soundlinks information with the `token` by requesting [Recognition result API](/result/).

```objectivec
NSString *token = [[SLRecognizer sharedInstance] getTokenWithCode:code];
```

::: tip Why code and token？

`code` is like a song's ID which is unique for each one. `token` is used for two reasons:

- Every APP has its different usage, so we let developers to decide when to fire the network request.
- To save the time for developers to generate signature by themselves, we wrap up this method to generate `token`.

:::

### Stopping recognizer

```objectivec
[[SLRecognizer sharedInstance] disable];
```

## Feedback

If you have any issues or suggestions, please [submit here](https://github.com/soundlinks/Soundlinks-iOS-SDK/issues/new) and we are ready to help.

