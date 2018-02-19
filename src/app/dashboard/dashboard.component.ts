import { Component, OnInit } from '@angular/core';

import { LancamentosService } from '../lancamentos.service';
import { Lancamento } from '../entity/lancamento';
import { Month } from '../entity/month.enum';
import { LancamentoType } from '../entity/lancamento-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  saldoInicial: number = 0;
  saldoDisponivel: number = 0;
  month: number;

  lancamentos: Lancamento[];
  lancamento: Lancamento;
  
  constructor(private lancamentoService: LancamentosService) { }

  ngOnInit() {
    this.month = new Date().getMonth();
    this.lancamentos = this.lancamentoService.getLancamentosOfMonth(this.month);
    this.lancamento = new Lancamento();
  }

  changeMonth(month) {
    this.lancamentos = this.lancamentoService.getLancamentosOfMonth(month);
  }

  addLancamento() {
    this.lancamentoService.addLancamento(this.lancamento);
    if(this.month == this.lancamento.emissao.getMonth()) this.lancamentos.push(this.lancamento);
    this.lancamento = new Lancamento();
  }

  getReceitas(): Lancamento[] {
    let receitas: Lancamento[] = [];
    receitas = this.lancamentos.filter(lancamento => { return lancamento.type == LancamentoType.REVENUE });
    this.instanceEmptyLancamento(receitas);
    return receitas;
  }

  getDespesas(): Lancamento[] {
    let despesas: Lancamento[] = [];
    despesas = this.lancamentos.filter(lancamento => { return lancamento.type == LancamentoType.EXPENSE });
    this.instanceEmptyLancamento(despesas);
    return despesas;
  }

  getTotalOfMonthAndType(month: number, type: LancamentoType): number {
    let totalMonth = 0;
    this.lancamentoService.getLancamentosOfMonth(month)
      .filter(lancamento => lancamento.type == type)
      .forEach(lancamento => totalMonth += lancamento.valor);
    
    return totalMonth;
  }

  getTotalRevenue(): number {
    return this.lancamentoService.getTotalLancamentos(LancamentoType.REVENUE);
  }

  getTotalExpense(): number {
    return this.lancamentoService.getTotalLancamentos(LancamentoType.EXPENSE)
  }

  getMonths() {
    return ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  }

  private instanceEmptyLancamento(list: any[]) {
    let size = list.length < 8 ? 8 - list.length : 0;

    while(size > -1) {
      list.push(new Lancamento());
      size--;
    }
  }

}
