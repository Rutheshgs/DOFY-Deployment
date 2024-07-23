import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dofy.public',
  appName: 'Dofy',
  webDir: 'out',
  bundledWebRuntime: false,
  ios: {
    contentInset: "always"
  },
};

export default config;
