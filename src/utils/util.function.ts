import { diskStorage } from 'multer';

//? To Number
export function toNumber(value: string): number {
  return parseInt(value, 10);
}

//? To Bool
export function toBool(value: string): boolean {
  return value === 'true';
}

export const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}.jpg`;
}
