import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dofy.public',
  appName: 'Dofy',
  webDir: 'build',
  bundledWebRuntime: false,
  ios: {
    contentInset: "always"
  }
  // plugins: {
  //   PushNotifications: {
  //     presentationOptions: ["badge", "sound", "alert"],
  //   },
  // },
};

export default config;
