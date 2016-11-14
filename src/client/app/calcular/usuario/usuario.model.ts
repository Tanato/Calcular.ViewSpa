export class Usuario {
    id: number;
    userName: string;
    nome: string;
    birthDate: any;
    email: string;
    perfil: number[];
}

export class AlterarSenha {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
