import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtre'
})
export class FiltrePipe implements PipeTransform {

  transform(Name: any[], text: any): string[] {

    if (text.length === 0){return Name}

    text = text.toLocaleLowerCase();

    return Name.filter( name => {

      return name.key.toLocaleLowerCase().includes(text);
    });

  }

}
