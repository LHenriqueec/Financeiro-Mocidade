import { Pipe, PipeTransform } from '@angular/core';

import { Lancamento } from '../entity/lancamento';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, search: any): any {
    return search ? this.contain(value, search) : value;
  }

  /**
   * Verifica se o valor desejado contem nos objetos de uma lista
   * @param values Lista de dados que serão filtrados
   * @param search Valor que será buscado em cada propriedade do Object da lista
   */
  private contain(values: any, search: any): boolean {
    return values.filter(value => {
      for(let property in value) {
        let prop = value[property];
      
        if(this.searchExist(prop, search)) return true;
      }

      return false;
    });
  }

  /**
   * Verifica se o valor procurado contem no atributo
   * @param prop Valor de um atributo
   * @param search Valor que será procurado no atributo
   */
  private searchExist(prop: any, search: any): boolean {
    return String(prop).toLowerCase().indexOf(String(search).toLowerCase()) != -1;
  }
}