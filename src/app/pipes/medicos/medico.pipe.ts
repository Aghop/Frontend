import { Pipe, PipeTransform } from '@angular/core';
import { Medico } from 'src/app/interfaces/medico';

@Pipe({
  name: 'medico'
})
export class MedicoPipe implements PipeTransform {

  transform(value: Medico[], arg: unknown): unknown {
    try {
      for (var i = 0; i < value.length; i++) {
        if (value[i].idmedico == arg) {
          let nombre = value[i].nombre.concat(" " + value[i].apellidos.toString());
          return nombre;
        }
      }
    } catch (error) {
    } return null;
  }
}
