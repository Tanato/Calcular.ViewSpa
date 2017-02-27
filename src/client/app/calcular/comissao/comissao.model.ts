import { TipoAtividade, Atividade } from '../atividade/atividade.model';
import { Usuario } from '../usuario/usuario.model';

export class Comissao {
    id: number;
    tipoAtividadeId: number;
    tipoAtividade: TipoAtividade;
    horaMin: any;
    horaMax: any;
    valor: number;
    ativo: boolean;
    vigencia: any;
}

export class ComissaoFuncionarioMes {

    id: number;
    responsavelId: string;
    responsavel: Usuario;
    funcionarioId: string;
    funcionario: Usuario;
    mes: number;
    ano: number;
    comissaoAtividades: ComissaoAtividade[];

    public constructor(init?: Partial<ComissaoFuncionarioMes>) {
        Object.assign(this, init);
    };
}

export class ComissaoAtividade {

    id: number;
    atividadeId: number;
    atividade: Atividade;
    comissaoMesId: number;
    comissaoMes: ComissaoFuncionarioMes;
    valorBase: number;
    valorAdicional: number;
    valorAdicionalAux: string;
    valorFinal: number;

    public constructor(init?: Partial<ComissaoAtividade>) {
        Object.assign(this, init);
    };
}
