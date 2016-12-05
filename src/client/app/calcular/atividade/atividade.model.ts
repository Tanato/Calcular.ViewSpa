import { Usuario } from '../usuario/usuario.model';
import { Servico } from '../servico/servico.model';

export class Atividade {
    id: number;
    servicoId: number;
    nome: string;
    entrega: any;
    tempo: number;
    tipoImpressao: number;
    tipoImpressaoDescricao: string;
    observacao: string;
    observacaoRevisor: string;
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    responsavelId: string;
    responsavel: Usuario;
    servico: Servico;
    tipoExecucao: number;
    etapaAtividade: number;
    atividadeOrigemId: number;
    atividadeOrigem: Atividade;
    status: string;
}

export class TipoAtividade {
    id: number;
    nome: string;
}
