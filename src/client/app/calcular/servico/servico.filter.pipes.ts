import { Pipe, PipeTransform } from '@angular/core';
import { Atividade } from '../atividade/atividade.model';
/*
 * Filtra as atividades com etapa "Original"
*/
@Pipe({name: 'filterEtapaAtividade'})
export class FilterEtapaAtividadePipe implements PipeTransform {
  transform(atividades: Atividade[]) {
    return atividades ? atividades.filter(a => a.etapaAtividade === 0) : null;
  }
}