import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';
import { Region } from 'src/app/interfaces/region';

@Pipe({
  name: 'busquedaPorRegion'
})
export class BusquedaPorRegionPipe implements PipeTransform {

  

  transform(value: Paciente[], args: number): Paciente[] {
    try {
      var pacienteaux: Paciente[]=[];
      if ((args != null )) {
        value.forEach(items => {
          if (items.idRegion == args) {
            if (!pacienteaux.includes(items)) {
              pacienteaux.push(items);
            }
          }
        })
        return pacienteaux;
      }
    } catch (error) {
    }
    return value;
  }
}