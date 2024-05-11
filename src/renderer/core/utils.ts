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

export function image(path: string): string {
  return api.isDev ? `/${path}` : path;
}
