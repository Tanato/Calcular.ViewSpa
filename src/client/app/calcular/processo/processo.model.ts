export class Processo {
    id: number;
    numero: string;
    autor: string;
    reu: string;
    local: number;
    parte: number;
    numerAutores: number;
    advogadoId: number;
    peritoid: number;
    indicacaoId: number;
    honorario: number;
    processoDetalhes: ProcessoDetalhe[];
}

export class ProcessoDetalhe {
    id: number;
    processoId: number;
    descricao: string;
}
