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
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    responsavelId: string;
    responsavel: Usuario;
    servico: Servico;
    tipoExecucao: number;
    atividadeOrigemId: number;
    atividadeOrigem: Atividade;
}

export class TipoAtividade {
    id: number;
    nome: string;
}
