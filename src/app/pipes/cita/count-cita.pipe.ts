import { Pipe, PipeTransform } from '@angular/core';
import { Cita } from 'src/app/interfaces/cita';

@Pipe({
  name: 'countCita'
})
export class CountCitaPipe implements PipeTransform {
  // filtra la cantidad de citas de cierto tipo y las cuenta
  transform(value: Cita[], arg: unknown): unknown {
    let cant = 0;
    try {
      for (var i = 0; i < value.length; i++) {
        if (value[i].idEstado == arg) {
          cant++;
        }
      }
    } catch (error) {
    }
    return cant;
  }
}
