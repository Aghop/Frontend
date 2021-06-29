import { Pipe, PipeTransform } from '@angular/core';
import { Cita } from 'src/app/interfaces/cita';

@Pipe({
  name: 'filtroEstado'
})
export class FiltroEstadoPipe implements PipeTransform {
 
  transform(value: Cita[], ...args: String[]): Array<Cita>{
    let fruits: Array<Cita>=[];
    try {
      for (var i = 0; i < value.length; i++) {
      args.forEach(element => {
        if (value[i].idEstado.toString() == element) {
        fruits.push(value[i]);
      }
      });
    }
    return fruits;
    } catch (error) {
      return null;
    }
  }
}
