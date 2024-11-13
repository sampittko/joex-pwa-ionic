import { Badge, type PermissionStatus } from "@capawesome/capacitor-badge";

export default class BadgeManager {
  static async isSupported(): Promise<boolean> {
    const { isSupported } = await Badge.isSupported();
    return isSupported;
  }

  static async checkPermissions(): Promise<PermissionStatus> {
    return await Badge.checkPermissions();
  }

  static async requestPermissions(): Promise<PermissionStatus> {
    return await Badge.requestPermissions();
  }

  static async set(count: number): Promise<void> {
    await Badge.set({ count });
  }

  static async initialize(): Promise<void> {
    const isBadgeSupported = await this.isSupported();
    if (!isBadgeSupported) {
      return;
    }

    const permissions = await this.checkPermissions();
    if (permissions.display === "granted") {
      await this.set(1);
    } else {
      const newPermissions = await this.requestPermissions();
      if (newPermissions.display === "granted") {
        await this.set(1);
      }
    }
  }
}
