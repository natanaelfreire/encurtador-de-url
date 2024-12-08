import bcrypt from 'bcryptjs'

export interface UserProps {
    id?: number
    email: string
    password: string
}

export class User {
    private readonly props: UserProps

    get id (): number | undefined {
        return this.props.id
    }

    get email (): string {
        return this.props.email
    }

    get password (): string {
        return this.props.password
    }

    private generateHash (password: string): string {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
    
        return hash
    }

    private validateUser (props: UserProps) {
        if (props.email === null || props.email === undefined || props.email.length === 0) {
            throw new Error('Preencha o campo "email"')
        }
      
        if (props.password === null || props.password === undefined || props.password.length === 0) {
            throw new Error('Preencha o campo "senha"')
        }
      
        if (props.password.length < 8) {
            throw new Error('Senha deve conter no mínimo 8 letras/números')
        }
    }

    constructor (props: UserProps) {
        this.validateUser(props)

        let password = props.password

        if (props.id === null || props.id === undefined) {
            password = this.generateHash(props.password)
        }

        this.props = {
            ...props,
            password
        }
    }
}
