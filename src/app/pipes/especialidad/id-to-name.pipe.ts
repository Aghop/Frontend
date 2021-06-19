import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';

@Pipe({
  name: 'idToName'
})
export class IdToNamePipe implements PipeTransform {

  transform(value: unknown, args: Especialidad[]): unknown {
    for (var i = 0; i < args.length; i++) {
      if (args[i].idespecialidad == value) {
        return args[i].nombreEspecialidad;
      }
    }
    return null;
  }
  }

