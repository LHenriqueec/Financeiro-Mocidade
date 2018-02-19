import { LancamentoType } from './lancamento-type.enum';

export class Lancamento {
    
    emissao: Date;
    descricao: string = '';
    valor:number = 0;
    type: LancamentoType;

    constructor(emissao?: Date, descricao?: string, valor?: number, type?: LancamentoType) {
        this.emissao = emissao;
        this.descricao = descricao;
        this.valor = valor;
        this.type = type ? type : LancamentoType.REVENUE;
    }

    setEmissao(emissao) {
        this.emissao = new Date(emissao);
    }
}