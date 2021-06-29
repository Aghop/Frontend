import { Pipe, PipeTransform } from '@angular/core';
import { Comuna } from 'src/app/interfaces/comuna';

@Pipe({
  name: 'comunasByRegion'
})
export class ComunasByRegionPipe implements PipeTransform {
  //filtra las comunas dada una region
  transform(value: Comuna[], arg: number): unknown {
    let fruits: Array<Comuna> = [];
    try {
      console.log('id: ', arg);
      for (var i = 0; i < value.length; i++) {
        if (value[i].idRegion == arg) {
          fruits.push(value[i]);
        }
      };
      console.log(fruits);
    } catch (error) {
    }
    return fruits;
  }
}
