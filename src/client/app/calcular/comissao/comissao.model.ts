import { TipoAtividade } from '../atividade/atividade.model';

export class Comissao {
    id: number;
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    horaMinima: number;
    horaMaxima: number;
    valor: number;
    ativo: boolean;
    vigencia: any;
}
