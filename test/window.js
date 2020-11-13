
// 安卓端
if (process.env.PLATFORM === 'android') {
  Object.defineProperty(window.navigator, 'userAgent', {
    get () {
      return "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Mobile Safari/537.36";
    }
  })

  Object.defineProperty(window, 'jsBridgeMethods', {
    get () {
      return {
        test (options) {
          const optionsParse = JSON.parse(options)
          window[optionsParse.callback](optionsParse);
        }
      };
    }
  })
}

// ios端
if (process.env.PLATFORM === 'ios') {
  Object.defineProperty(window.navigator, 'userAgent', {
    get () {
      return "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
    }
  })

  Object.defineProperty(window, 'webkit', {
    get () {
      return {
        messageHandlers: {
          test: {
            postMessage (options) {
              const optionsParse = JSON.parse(options)
              window[optionsParse.callback](optionsParse);
            }
          }
        }
      }
    }
  })
}

