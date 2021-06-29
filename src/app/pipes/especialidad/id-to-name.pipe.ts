import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';

@Pipe({
  name: 'idToNameEspecialidad'
})
export class IdToNamePipeEspecialidad implements PipeTransform {

  transform(value: unknown, args: Especialidad[]): unknown {
    try {
      for (var i = 0; i < args.length; i++) {
        if (args[i].idespecialidad == value) {
          return args[i].nombreEspecialidad;
        }
      }
    } catch (error) {
    }
    return null;
  }
}