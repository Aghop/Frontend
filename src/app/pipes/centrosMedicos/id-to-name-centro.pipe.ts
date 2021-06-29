import { Pipe, PipeTransform } from '@angular/core';
import { CentroMedico } from 'src/app/interfaces/centro-medico';

@Pipe({
  name: 'idToNameCentro'
})
export class IdToNameCentroPipe implements PipeTransform {
  // filtra el id de un centromedico a el nombre de este
  transform(value: unknown, args: CentroMedico[]): unknown {
    try {
      for (var i = 0; i < args.length; i++) {
        if (args[i].idcentro == value) {
          return args[i].nombre;
        }
      }
    } catch (error) {
    }
    return null;
  }
}
