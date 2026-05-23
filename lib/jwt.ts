import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRETE!;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRETE is not defined");
}

export function generetetoken(payload : object){
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifytoken(token : string){
    return jwt.verify(token, JWT_SECRET);
}