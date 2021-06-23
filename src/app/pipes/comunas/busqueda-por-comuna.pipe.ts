import { Pipe, PipeTransform } from '@angular/core';
import { Comuna } from 'src/app/interfaces/comuna';
import { Paciente } from 'src/app/interfaces/paciente';

@Pipe({
  name: 'busquedaPorComuna'
})
export class BusquedaPorComunaPipe implements PipeTransform {

  pacienteaux: Paciente[]=[];

  transform(value: Paciente[], args:number): Paciente[] {
    try {
      if ((args != null ) || (args != undefined) ) {
        console.log(value, "value15");
        value.forEach(items => {
          console.log(items.idComuna,"idcomuna");
          console.log(args,"args");
          if (items.idComuna === args) {
               console.log("algo");
            if (!this.pacienteaux.includes(items)) {
              this.pacienteaux.push(items);
            }
  
          }
        })
        console.log(this.pacienteaux,"hueal");
        return this.pacienteaux;
      }
    } catch (error) {
      return value;
    }
    return value;
    
    
  }

}
