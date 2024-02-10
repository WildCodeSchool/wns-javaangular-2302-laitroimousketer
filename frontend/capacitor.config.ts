import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alayde.ionic',
  appName: 'alayde',
  webDir: 'dist/angular-frontend-ticketing',
  server: {
    androidScheme: 'https'
  }
};

export default config;
