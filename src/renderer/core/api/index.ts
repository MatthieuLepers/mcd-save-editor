import { api as electronApi } from '@renderer/core/api/electron';
import { api as webApi } from '@/renderer/core/api/web';

export const api = electronApi || webApi;
