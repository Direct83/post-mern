export const makeId = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  return [...Array(length)].map((_) => characters.charAt(Math.floor(Math.random() * charactersLength))).join('');
}
