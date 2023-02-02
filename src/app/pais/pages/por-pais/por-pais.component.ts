import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {
  termino: string = ''
  isError: boolean = false;
  paises: Country[] = []

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => {
          this.paises = paises;
          this.isError = false
        },
        error: (err) => {
          this.paises = [];
          this.isError = true;
        }
      });
  }

  sugerencias(termino:string){
    this.isError = false;
    console.log('conexion')
  }

}
