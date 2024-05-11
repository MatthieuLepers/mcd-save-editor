import { ipcMain, globalShortcut } from 'electron';
import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export const IpcHandle = (_target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  ipcMain.handle(propertyKey, (_e: IpcMainInvokeEvent, ...args: any[]): any => descriptor.value(...args));
  return descriptor;
};

export const IpcOn = (_target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  ipcMain.on(propertyKey, (e: IpcMainEvent, ...args: any[]): void => {
    e.returnValue = descriptor.value(...args);
  });
  return descriptor;
};

export const GlobalShortcut = (accelerator: string) => (_target: any, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  globalShortcut.register(accelerator, () => descriptor.value(accelerator));
  return descriptor;
};
