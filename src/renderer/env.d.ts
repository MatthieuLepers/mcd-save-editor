/// <reference types="vite/client" />

declare global {
  interface Window {
    api?: typeof import('@/main/api').default;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    GenerateModifiers: (baseClass: string, modifiers: Record<string, boolean>) => string;
    dateFormat: (date: Date, format: string) => string;
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export {};
