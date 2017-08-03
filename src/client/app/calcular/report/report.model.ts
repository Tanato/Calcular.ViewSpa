export class CustoProcesso {
    cliente: string;
    empresa: string;
    quantidadeProcessos: number;
    totalHonorario: number;
    totalCusto: number;
    diferenca: number;
    mediaHonorario: number;
    mediaCUsto: number;
}

export class ProdutividadeColaborador {
    meses: string;
    report: ReportItem[];
}

class ReportItem {
    name: string;
    data: any[];
}

