import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;



export function generetetoken(payload : object){
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifytoken(token : string){
    return jwt.verify(token, JWT_SECRET);
}