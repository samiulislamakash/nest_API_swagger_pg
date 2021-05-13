import * as jwt from 'jsonwebtoken';

const JWT_SECRET: string = 'SimpleJWT';

export async function generateToken(data: any) {
  return await jwt.sign({ data }, JWT_SECRET, { expiresIn: '1h' });
}

export async function decodeToken(token: string) {
  return await jwt.decode(token);
  // return jwt.verify(token, JWT_SECRET, function(err, decoded) {
  //   return decoded;
  // });
}
