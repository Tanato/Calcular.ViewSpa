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
    honorarios: Honorario[];
    total: number;
}

export class ProcessoDetalhe {
    id: number;
    processoId: number;
    descricao: string;
}

export class Honorario {
    id: number;
    processoId: number;
    registro: number;
    registroDescription : string;
    tipoPagamento: number;
    tipoPagamentoDescription : string;
    notaFiscal: string;
    valor: number;
    data: any;
    prazo: any;
}

