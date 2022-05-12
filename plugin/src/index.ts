import { ConfigPlugin, withInfoPlist, AndroidConfig } from "@expo/config-plugins"

// Default usage descriptions
const PROTOCOLS = ['com.apple.m1']
const PERIPHERAL_SHARE = 'Allow $(PRODUCT_NAME) to check bluetooth peripheral info'
const ALWAYS_SHARE = 'Allow $(PRODUCT_NAME) to always use bluetooth info'

// Plugin Props interface
interface PluginProps {
    peripheralUsageDescription?: string;
    alwaysUsageDescription?: string;
    protocols?: string
}

// iOS modifier sets
//  > NSBluetoothPeripheralUsageDescription
//  > NSBluetoothAlwaysUsageDescription
//  > UISupportedExternalAccessoryProtocols
const withIosBLC : ConfigPlugin<PluginProps> = (config, { peripheralUsageDescription, alwaysUsageDescription, protocols} = {}) => 
{
    config = withInfoPlist(config, (config) => {
        // config = {modResults, modRequests, ...}
        config.modResults.NSBluetoothPeripheralUsageDescription =
            peripheralUsageDescription ? 
            peripheralUsageDescription : 
            PERIPHERAL_SHARE
        config.modResults.NSBluetoothAlwaysUsageDescription =
            alwaysUsageDescription ? 
            alwaysUsageDescription : 
            ALWAYS_SHARE
        config.modResults.UISupportedExternalAccessoryProtocols = 
            protocols ?
            protocols :
            PROTOCOLS
        return config
    })
    return config
}

// Android modifier sets permissions
//  > BLUETOOTH
//  > BLUETOOTH_ADMIN
//  > ACCESS_FINE_LOCATION
const withAndroidBLC : ConfigPlugin<any> = (config, options = {}) => {
    config = AndroidConfig.Permissions.withPermissions(config, [
        'android.permission.BLUETOOTH',
        'android.permission.BLUETOOTH_ADMIN',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.BLUETOOTH_CONNECT',
        'android.permission.BLUETOOTH_SCAN',
        'android.permission.BLUETOOTH_ADVERTISE',
      ]);
    return config
}

// iOS + Android modifier
const withBLC : ConfigPlugin<PluginProps> = (config, { peripheralUsageDescription, alwaysUsageDescription, protocols} = {},) => 
{
    config = withIosBLC(config, {peripheralUsageDescription, alwaysUsageDescription, protocols})
    config = withAndroidBLC(config, {})
    return config
}

module.exports = withBLC