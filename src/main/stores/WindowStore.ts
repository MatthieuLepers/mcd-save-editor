import type ElectronWindow from '@/main/classes/ElectronWindow';

class WindowStore {
  public windowMap: Map<string, ElectronWindow>;

  constructor() {
    this.windowMap = new Map<string, ElectronWindow>();
  }

  get size(): number {
    return this.windowMap.size;
  }

  register(win: ElectronWindow) {
    if (!this.windowMap.has(win.name)) {
      this.windowMap.set(win.name, win);
    }
  }

  unregister(win: ElectronWindow) {
    if (this.windowMap.has(win.name)) {
      this.windowMap.delete(win.name);
    }
  }

  get(name: string): ElectronWindow | undefined {
    return this.windowMap.get(name);
  }

  has(name: string): boolean {
    return this.windowMap.has(name);
  }

  sendData(name: string, channel: string, ...data: any[]) {
    const win = this.get(name);
    if (win) {
      win.sendData(channel, ...data);
    }
  }

  broadcastData(channel: string, ...data: any[]) {
    [...this.windowMap.values()].forEach((win) => {
      win.sendData(channel, ...data);
    });
  }

  getFocusedWindow(): ElectronWindow | null {
    return [...this.windowMap.values()].find((win) => win.isFocused()) ?? null;
  }

  getVisibleWindows(): Array<ElectronWindow> {
    return [...this.windowMap.values()].filter((win) => win.isVisible());
  }
}

export default new WindowStore();
