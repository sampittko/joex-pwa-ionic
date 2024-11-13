export default function getPlatformMode(): "ios" | "md" {
  const userAgent = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "ios";
  }

  if (/android/i.test(userAgent)) {
    return "md";
  }

  return "md";
}
