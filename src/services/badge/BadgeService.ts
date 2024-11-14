import { Badge } from "@capawesome/capacitor-badge";
import type { PermissionStatus } from "@capawesome/capacitor-badge";

export default class BadgeService {
  private static instance: BadgeService;
  private isSupported = false;

  private constructor() {}

  public static async getInstance(): Promise<BadgeService> {
    if (!BadgeService.instance) {
      BadgeService.instance = new BadgeService();
      const result = await Badge.isSupported();
      BadgeService.instance.isSupported = result.isSupported;
    }
    return BadgeService.instance;
  }

  public async setBadgeCount(count: number): Promise<void> {
    if (!this.isSupported) return;

    const permissions = await this.checkPermissions();
    if (permissions.display !== "granted") {
      await this.requestPermissions();
    }

    await Badge.set({ count });
  }

  private async checkPermissions(): Promise<PermissionStatus> {
    if (!this.isSupported) return { display: "denied" };
    return await Badge.checkPermissions();
  }

  private async requestPermissions(): Promise<PermissionStatus> {
    if (!this.isSupported) return { display: "denied" };
    return await Badge.requestPermissions();
  }
}
