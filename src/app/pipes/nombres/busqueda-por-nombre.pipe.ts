import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';

@Pipe({
  name: 'busquedaPorNombre'
})
export class BusquedaPorNombrePipe implements PipeTransform {
  pacienteaux: Paciente[]=[];

  transform(value: Paciente[], args: String): Paciente[] {
    
    try {
      if ((args != "")) {

        value.forEach(items => {
           
          if (items.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1) {
  
            if (!this.pacienteaux.includes(items)) {
              this.pacienteaux.push(items);
              
            }
            
  
          }
        })
        return this.pacienteaux;
      }
    } catch (error) {
      console.log(value);
      return value;
    }
    return value;
    
    
  }

}
