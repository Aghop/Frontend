import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';

@Pipe({
  name: 'busquedaPorNombre'
})
export class BusquedaPorNombrePipe implements PipeTransform {
  

  transform(value: Paciente[], args: String): Paciente[] {
    
    try {
      var pacienteaux: Paciente[]=[];
      if ((args != "")) {
        value.forEach(items => {
          if ((items.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1) || (items.apellidos.toLowerCase().indexOf(args.toLowerCase()) > -1)) {
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