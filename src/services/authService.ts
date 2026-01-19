import * as bun from "bun";
import {UserRepository} from "../repositories/userRepository";
import {AuthModel} from "../types/AuthModel";
import jwt from "jsonwebtoken";
import * as process from "node:process";

export abstract class AuthService {
    static async signIn({email, password} : AuthModel.signUpBody): Promise<AuthModel.signInResponse | undefined>  {
        try {
            const user = await UserRepository.findByEmail(email)
            if (!user) {
                new Error(`User ${email} not found`)
            }
            if (await bun.password.verify(password,user.password )) {
                return {
                    email: user.email,
                    accessToken : jwt.sign({email:email},process.env.JWT_PRIVATE_KEY!,{expiresIn: "30M"})
                }
            }else {
                new Error(`Incorrect email or password`)
            }
        }catch (error) {
            return Promise.reject(error);
        }

    }
}