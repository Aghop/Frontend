import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      
      case 1:
        return "<span class='abierta estado'>Abierta</span>"

      case 2:
        return "<span class='cancelada estado'>Cancelada</span>"
       
      case 3:
        return "<span class='concluida estado'>Concluida</span>"
      
      default:

        break;
    }

    return null;
  }

}
