export class Usuario {
    id: number;
    userName: string;
    nome: string;
    birthDate: any;
    email: string;
    roles: string[];
}

export class AlterarSenha {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
