export function copyToClipboard(cb: () => void) {
  return async (data: string) => {
    try {
      await navigator.clipboard.writeText(data);
      cb();
    } catch (e) {
      console.error('Failed to copy text:', e);
    }
  };
}
