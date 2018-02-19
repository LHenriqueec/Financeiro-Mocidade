import { Injectable } from '@angular/core';

import { Lancamento } from './entity/lancamento';
import { LancamentoType } from './entity/lancamento-type.enum';

@Injectable()
export class LancamentosService {

  lancamentos: Lancamento[];

  constructor() {
    this.lancamentos = [
      new Lancamento(new Date(), 'lancamento 1', 321, LancamentoType.EXPENSE),
      new Lancamento(new Date('02/02/2018'), 'lancamento 2', 1469.14, LancamentoType.EXPENSE),
      new Lancamento(new Date('01/15/2018'), 'lancamento 3', 214.12, LancamentoType.EXPENSE),
      new Lancamento(new Date('02/13/2018'), 'lancamento 4', 15.36, LancamentoType.EXPENSE),
      new Lancamento(new Date('01/18/2018'), 'lancamento 5', 458.45, LancamentoType.REVENUE),
      new Lancamento(new Date('02/07/2018'), 'lancamento 6', 37.48, LancamentoType.REVENUE),
      new Lancamento(new Date('01/09/2018'), 'lancamento 7', 879.23, LancamentoType.REVENUE),
      new Lancamento(new Date('02/18/2018'), 'lancamento 7', 799.49, LancamentoType.REVENUE)
    ];
  }

  addLancamento(lancamento: Lancamento): void {
    lancamento.setEmissao(lancamento.emissao);
    this.lancamentos.push(lancamento);
  }

  removeLancamento(index: number): number {
    return this.lancamentos.splice(index, 1)[0].valor;
    
  }

  getLancamentos(): Lancamento[] {
    return this.lancamentos;
  }

  getLancamentosOfMonth(month: number): Lancamento[]  {
    return this.lancamentos.filter(lancamento => { return lancamento.emissao.getMonth() == month });
  }

  getTotalLancamentos(type: LancamentoType): number {
    let total = 0;
    this.lancamentos.filter(lancamento => lancamento.type == type)
      .forEach(lancamento => total += lancamento.valor);
    return total;
  }
}
