import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li{
      cursor: ponter;
    }
    `
  ]
})
export class PorPaisComponent {
  termino: string = ''
  isError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.isError = false;
    this.mostrarSugerencias = false;
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

  sugerencias(termino: string) {
    this.isError = false;
    this.mostrarSugerencias = true;
    this.termino = termino;
    
    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0, 5),
        err => this.paisesSugeridos = []
      )

  }

  buscarSugerido( termino:string){
    this.buscar(termino)

  }
}
