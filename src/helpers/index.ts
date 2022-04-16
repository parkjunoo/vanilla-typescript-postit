export function setStorage(key: string, value: object | string | number) {
  const data: string = JSON.stringify(value);
  localStorage.setItem(key, data);
}
export function getStorage(key: string) {
  const data = JSON.parse(localStorage.getItem(key)!);
  return data;
}
export function removeStorage(key: string) {
  localStorage.removeItem(key);
}

export default { setStorage, getStorage, removeStorage };
