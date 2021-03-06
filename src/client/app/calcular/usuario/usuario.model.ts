export class Usuario {
    id: number;
    userName: string;
    nome: string;
    name: string;
    birthDate: any;
    email: string;
    roles: string[];
    perfis: string;
    inativo: boolean;
    isExterno: boolean;
}

export class AlterarSenha {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
