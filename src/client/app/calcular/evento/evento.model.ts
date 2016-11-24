import { TipoAtividade } from '../atividade/atividade.model';

export class Evento {
    id: number;
    nome: string;
    entrega: any;
    observacao: string;
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    responsavelId: number;
}