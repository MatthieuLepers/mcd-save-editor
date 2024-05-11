declare global {
  interface Window {
    api: typeof import('@/main/api').default;
  }
}
