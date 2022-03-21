import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nothingWinner',
})
export class NothingWinnerPipe implements PipeTransform {

  transform(nomeVencedor: string) {
    return nomeVencedor == null || nomeVencedor.length == 0 ? 'Nenhum vencedor' : nomeVencedor; 
  }
}
