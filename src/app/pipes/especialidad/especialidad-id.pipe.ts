import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Medico } from 'src/app/interfaces/medico';

@Pipe({
  name: 'especialidadId'
})
export class EspecialidadIdPipe implements PipeTransform {

  transform(value: Medico[], arg: unknown): unknown {
    try {
      for (var i = 0; i < value.length; i++) {
        if (value[i].idmedico == arg) {
          return value[i].idEspecialidad;
        }
      }
    } catch (error) {
    }
    return null;
  }
}
