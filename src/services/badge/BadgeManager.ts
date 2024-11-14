import { Badge } from "@capawesome/capacitor-badge";

export default class BadgeManager {
  private static instance: BadgeManager;
  private isSupported = false;

  private constructor() {}

  public static async getInstance(): Promise<BadgeManager> {
    if (!BadgeManager.instance) {
      BadgeManager.instance = new BadgeManager();
      const result = await Badge.isSupported();
      BadgeManager.instance.isSupported = result.isSupported;
    }
    return BadgeManager.instance;
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
