import { Pipe, PipeTransform } from '@angular/core';
import { Comuna } from 'src/app/interfaces/comuna';
import { Paciente } from 'src/app/interfaces/paciente';

@Pipe({
  name: 'busquedaPorComuna'
})
export class BusquedaPorComunaPipe implements PipeTransform {

  // filtra las comunas recibidas de un arreglo de paciente

  transform(value: Paciente[], args:number): Paciente[] {
    try {
      var pacienteaux: Paciente[]=[];
      if ((args != null ) || (args != undefined) ) {
        value.forEach(items => {
          if (items.idComuna === args) {
            if (!pacienteaux.includes(items)) {
              pacienteaux.push(items);
            }
          }
        })
        return pacienteaux;
      }
    } catch (error) {
      return value;
    }
    return value;
  }
}