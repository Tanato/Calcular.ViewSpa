import { Processo } from '../processo/processo.model';

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
