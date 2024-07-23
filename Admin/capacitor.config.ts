import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dofy.rider',
  appName: 'DofyRider',
  webDir: 'build',
  bundledWebRuntime: false,
  ios: {
    contentInset: "always"
  }
};

export default config;
