import { Processo } from '../processo/processo.model';

export class Proposta {
    id: number;
    processoId: number;
    processo: Processo;
    contato: string;
    dataProposta: any;
    observacao: string;
    valorProposta: number;
    fechado: boolean;
    comoChegou: number;
    movito: number;
    motivoDescricao: string;
}
