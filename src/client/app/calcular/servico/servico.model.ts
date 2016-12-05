import { Atividade } from '../atividade/atividade.model';
import { Processo } from '../processo/processo.model';

export class Servico {
    id: number;
    processoId: number;
    processo: Processo;
    volumes: string;
    entrada: any;
    saida: any;
    prazo: any;
    atividades: Atividade[];
    status: number;
    statusDescricao: string;
}
