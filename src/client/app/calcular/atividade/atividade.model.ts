import { Usuario } from '../usuario/usuario.model';
import { Servico } from '../servico/servico.model';

export class Atividade {
    id: number;
    servicoId: number;
    nome: string;
    entrega: any;
    tempo: any;
    tipoImpressao: number;
    tipoImpressaoDescricao: string;
    observacao: string;
    observacaoRevisor: string;
    observacaoComissao: string;
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    responsavelId: string;
    responsavel: Usuario;
    servico: Servico;
    tipoExecucao: number;
    tipoExecucaoNew: number;
    etapaAtividade: number;
    atividadeOrigemId: number;
    atividadeOrigem: Atividade;
    valor: number;
}

export class TipoAtividade {
    id: number;
    nome: string;
}

export class Colaborador {
    id: number;
    userName: string;
    name: string;
    atividades: Atividade[];
}
