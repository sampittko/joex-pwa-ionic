import BadgeService from "@/services/badge";
import { useEffect } from "react";

export default function useBadgeSync(count: number) {
  useEffect(() => {
    const updateBadgeCount = async () => {
      const badgeService = await BadgeService.getInstance();
      await badgeService.setBadgeCount(count);
    };

    updateBadgeCount();
  }, [count]);
}
