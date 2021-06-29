import { Pipe, PipeTransform } from '@angular/core';
import { Region } from 'src/app/interfaces/region';
@Pipe({
  name: 'idToNameRegion'
})
export class IdToNameRegionPipe implements PipeTransform {

  transform(value: unknown, args: Region[]): unknown {
    
    try {
      for (var i = 0; i < args.length; i++){
      if (args[i].idregion == value){
        return args[i].nombreRegion;
      }
    }
    } catch (error) {
      
    }
    return null;
    
  }

}