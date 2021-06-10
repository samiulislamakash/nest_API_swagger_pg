//? To Number
export function toNumber(value: string): number {
  return parseInt(value, 10);
}

//? To Bool
export function toBool(value: string): boolean {
  return value === 'true';
}
