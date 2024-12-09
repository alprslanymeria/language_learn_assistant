import { jwtVerify } from "jose";

// GET SECRET KEY
export const getSecretKey = () => {
    const secretKeyString = process.env.SECRET_KEY
    if(!secretKeyString)
        throw new Error("JWT SecretKey is not defined")
    return new TextEncoder().encode(secretKeyString)
}

// VERIFY JWT TOKEN
export async function VerifyJwt(token){
    if(!token) return null;
    
    try {
        const { payload } = await jwtVerify(
            token, 
            getSecretKey()
        );
        return payload;
    } catch (error) {
        return null;
    }
}