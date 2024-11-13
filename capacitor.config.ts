import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "app.sampittko.joex",
  appName: "Joex",
  webDir: "dist",
  plugins: {
    Badge: {
      persist: true,
      autoClear: false,
    },
  },
};

export default config;
