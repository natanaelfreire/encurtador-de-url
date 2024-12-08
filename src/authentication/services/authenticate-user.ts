import { UserRepository } from "../../users/repositories/user-repository";
import { AuthenticateUserDto } from "../dto/authenticate-user-dto";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthenticateUser {
    private readonly SECRET = process.env.SECRET as jwt.Secret 

    constructor (private readonly userRepository: UserRepository) {}

    async execute ({
        email,
        password
    }: AuthenticateUserDto) {
        const user = await this.userRepository.findByEmail(email)

        if (user != null) {
            const isPasswordCorrect = this.validatePassword(password, user.password)

            if (isPasswordCorrect) {
                const token = jwt.sign({ user: user.email, userId: user.id }, this.SECRET, { expiresIn: '10h' })

                return token
                
            }
            else
                throw new Error("Senha incorreta.")

        }
        else
            throw new Error("Usuário não encontrado.")
        
    }

    private validatePassword (inputPassword: string, password: string): boolean {
        return bcrypt.compareSync(inputPassword, password)
    }
}