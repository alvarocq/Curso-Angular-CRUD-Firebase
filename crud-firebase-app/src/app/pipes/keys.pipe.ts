import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  //para que esté pendiente del ciclo de cambio (cuando eliminamos un héroe)
  pure:false,
})
export class KeysPipe implements PipeTransform {

  transform( value: any ): any {

    let keys = [];
    for ( let key in value ){
      keys.push(key)
    }

    return keys;
  }

}
