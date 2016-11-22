import { Usuario } from '../usuario/usuario.model';

export class Atividade {
    id: number;
    servicoId: number;
    nome: string;
    entrega: any;
    tempo: number;
    tipoImpressao: number;
    tipoImpressaoDescricao: string;
    observacao: string;
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    responsavelId: number;
    responsavel: Usuario;
}

export class TipoAtividade {
    id: number;
    nome: string;
}
