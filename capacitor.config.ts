import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'nl.bureauerkenningen',
  appName: 'Bureau Erkenningen',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
