export function removeUaFromUrl(url: string): string {
  return url.replace("/ua/", "/");
}
