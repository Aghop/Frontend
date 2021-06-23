import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';
import { Region } from 'src/app/interfaces/region';

@Pipe({
  name: 'busquedaPorRegion'
})
export class BusquedaPorRegionPipe implements PipeTransform {

  pacienteaux: Paciente[]=[];

  transform(value: Paciente[], args: number): Paciente[] {
    
    try {
      if ((args != null )) {
       
        value.forEach(items => {
  
          if (items.idRegion == args) {
            
            if (!this.pacienteaux.includes(items)) {
              this.pacienteaux.push(items);
            }
  
          }
        })
        return this.pacienteaux;
      }
    } catch (error) {
      return value;
    }
 
    return value;
    
  }


}
