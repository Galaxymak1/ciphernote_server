import * as bun from "bun";
import {UserRepository} from "../repositories/userRepository";

export abstract class AuthService {
    static async signIn(email: string, password: string): Promise<void> {
        try {
            const user =  UserRepository.findByEmail(email)
            if (!user) {
                new Error(`User ${email} not found`)
            }
            if (bun.password.verify(user., password)) {}
        }catch (error) {
            return Promise.reject(error);
        }

    }
}