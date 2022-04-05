# Description

Config plugin for auto-configuring `react-native-bluetooth-classic` projects on Expo.

# Usage

Run `expo install with-rn-bluetooth-classic`(recommended) or `npm i --save with-rn-bluetooth-classic` in project root and add the following to `app.json` or `app.config.json`:

```
"plugins": [
      ["with-rn-bluetooth-classic",
        {
          "peripheralUsageDescription": "Allow myDevice to check bluetooth peripheral info",
          "alwaysUsageDescription": "Allow myDevice to always use bluetooth info",
          "protocols": [
            "com.myCompany.p1",
            "com.myCompany.p2"
          ]
        }
      ]
    ]
```

# Note

This plugin was originally intended for usage with Expo [dev clients](https://docs.expo.dev/development/introduction/). Expo Go is not sufficient because it doesn't include the native modules in `react-native-bluetooth-classic`. 

# Contributing

Modify `src/index.ts` to modify the plugin. Rebuild by running `npm run rebuild` on Windows. Run `npm run rebuild-mac-lin` on MacOS and Linux.
