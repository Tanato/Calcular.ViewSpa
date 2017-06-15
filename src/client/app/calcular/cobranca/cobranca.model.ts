import { Processo, ProcessoCobranca } from '../processo/processo.model';
import { Cliente } from '../cliente/cliente.model';

export class Cobranca {
    id: number;
    processoId: number;
    processo: Processo;
    contato: string;
    dataCobranca: any;
    previsaoPagamento: any;
    observacao: string;
    valorPendente: number;
}

export class CobrancaDetail {
    advogadoId: number;
    advogado: Cliente;
    dataCobranca: any;
    totalPendente: number;
    totalHonorarios: number;
    totalProcessosPendentes: number;
    processos: ProcessoCobranca[];
    statusHonorario: string;
}
