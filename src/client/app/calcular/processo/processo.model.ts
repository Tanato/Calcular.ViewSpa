import { Servico } from '../servico/servico.model';
import { Honorario } from '../honorario/honorario.model';
import { Cliente } from '../cliente/cliente.model';

export class Processo {
    id: number;
    numero: string;
    autor: string;
    reu: string;
    local: number;
    parte: number;
    numerAutores: number;
    advogadoId: number;
    advogado: Cliente;
    perito: string;
    indicacao: string;
    honorario: number;
    processoDetalhes: ProcessoDetalhe[];
    honorarios: Honorario[];
    servicos: Servico[];
    total: number;
    custoComissao: number;
    valorCausa: number;
    faseProcessoId: number;
    faseProcesso: FaseProcesso;
}

export class ProcessoDetalhe {
    id: number;
    processoId: number;
    descricao: string;
}

export class FaseProcesso {
    id: number;
    nome: string;
}

