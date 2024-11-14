import { Badge } from "@capawesome/capacitor-badge";

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

  public async getBadgeCount(): Promise<number> {
    if (!this.isSupported) return 0;
    const result = await Badge.get();
    return result.count;
  }

  public async setBadgeCount(count: number): Promise<void> {
    if (!this.isSupported) return;
    await Badge.set({ count });
  }

  public async clearBadgeCount(): Promise<void> {
    if (!this.isSupported) return;
    await Badge.clear();
  }

  public async increaseBadgeCount(): Promise<void> {
    if (!this.isSupported) return;
    await Badge.increase();
  }

  public async decreaseBadgeCount(): Promise<void> {
    if (!this.isSupported) return;
    await Badge.decrease();
  }
}
