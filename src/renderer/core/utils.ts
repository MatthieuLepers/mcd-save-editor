import { api } from '@renderer/core/api';
import { name } from '../../../package.json';

export function toCamelCase(str: string): string {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .split(' ')
    .map((part, i) => (i > 0 ? `${part.charAt(0).toUpperCase()}${part.substr(1).toLowerCase()}` : part.toLowerCase()))
    .join('')
  ;
}

export function debounce(callback: Function, delay: number) {
  let timer: number;
  return function () {
    window.clearTimeout(timer);
    timer = window.setTimeout(callback, delay);
  };
}

export function shuffleArray<T>(e: Array<T>): Array<T> {
  for (let i = e.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [e[i], e[j]] = [e[j], e[i]];
  }
  return e;
}

export function chunkArray<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
  return arr.reduce((acc, val, i) => {
    const ch = Math.floor(i / chunkSize);
    acc[ch] = ([] as Array<T>).concat((acc[ch] ?? []), val);
    return acc;
  }, [] as Array<Array<T>>);
}

export function generatePermutations<T>(input: Array<T>, length: number): Array<Array<T>> {
  // Use reduce to iteratively build permutations while ensuring non-decreasing order.
  return Array(length)
    .fill(input)
    .reduce((acc, curr) => acc.flatMap((perm: Array<T>) => curr
      .filter((el: T) => el >= (perm[perm.length - 1] || el)) // Ensure non-decreasing order
      .map((el: T) => [...perm, el])), [[]]);
}

export function image(path: string): string {
  if (api.isDev) return `/${path}`;
  return process.env.NODE_ENV === 'production'
    ? `/${name}/${path}`
    : path
  ;
}

export function download(fileName: string, fileContent: string) {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(fileContent)}`);
  element.setAttribute('download', fileName);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function openLink(link: string) {
  const a = document.createElement('a');
  a.setAttribute('href', link);
  a.setAttribute('target', '_blank');

  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

export async function openFile(accept: string = 'application/json'): Promise<FileList | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', accept);

    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', () => {
      resolve(input.files);
      document.body.removeChild(input);
    });
    input.click();
  });
}

export async function readFile(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsText(file);
  });
}
