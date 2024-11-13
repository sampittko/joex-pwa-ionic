import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "app.sampittko.joex",
  appName: "joex",
  webDir: "dist",
  plugins: {
    Badge: {
      persist: true,
      autoClear: false,
    },
  },
};

export default config;
