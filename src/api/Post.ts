import { User as UserResponse } from './interfaces/Response';
import { generateToken } from '../jwt/JwtHanddler';

export const LoginUser = async (email: string, password: string): Promise<UserResponse.ILoginUser> => {
    return {
        token: generateToken({ email: email })
    }
}
