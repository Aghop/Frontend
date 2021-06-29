import { Pipe, PipeTransform } from '@angular/core';
import { Comuna } from 'src/app/interfaces/comuna';

@Pipe({
  name: 'idToNameComuna'
})
export class IdToNameComunaPipe implements PipeTransform {
   
  transform(value: unknown, args: Comuna[]): unknown {
    try {
      for (var i = 0; i < args.length; i++){
      if (args[i].idcomuna == value){
        return args[i].nombreComuna;
      }
    }
    } catch (error) {
    }
    return null;
  }
}