export function truncate(elem, parts = 8, length = 20) {
  return elem.length > length
    ? elem.replace(elem.substring(parts, elem.length - parts), '...')
    : elem;
}
