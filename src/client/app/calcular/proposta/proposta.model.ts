import { Processo } from '../processo/processo.model';

export class Proposta {
    id: number;
    numero: string;
    contato: string;
    contatoId: number;
    local: number;
    email: string;
    celular: string;
    telefone: string;

    comoChegou: number;
    comoChegouDetalhe: string;

    honorario: number;
    dataProposta: any;
    observacao: string;

    fechado: boolean;
    movito: number;
    motivoDescricao: string;

    processoId: number;
    processo: Processo;
}
