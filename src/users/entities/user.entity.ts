
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

    private validateUser (props: UserProps) {
        if (props.email == null || props.email.length === 0) {
            throw new Error('Preencha o campo "email"')
        }
      
        if (props.password == null || props.password.length === 0) {
            throw new Error('Preencha o campo "senha"')
        }
      
        if (props.password.length < 8) {
            throw new Error('Senha deve conter no mínimo 8 letras/números')
        }
    }

    constructor (props: UserProps) {
        this.validateUser(props)

        this.props = {
            ...props
        }
    }

}