import jsonwebtoken, { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'helloWorld';
const tokenSign = (id: number) => {
  const sign = jsonwebtoken.sign(
    {
      id,
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  return sign;
};
const verifyToken = (tokenJwt: string) => {
  const tokenVerify = jsonwebtoken.verify(tokenJwt, JWT_SECRET) as {
    id: number;
  };
  return tokenVerify;
};

export { verifyToken, tokenSign };
