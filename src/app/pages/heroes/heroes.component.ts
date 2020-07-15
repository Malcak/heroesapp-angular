import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;

  id = 'nuevo';

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe((res) => {
      this.heroes = res;
      this.cargando = false;
    });
  }

  actualizarId(id: string) {
    this.id = id;
  }

  borrarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroesService.borrarHeroe(heroe.id).subscribe(() => {
          this.heroes.splice(index, 1);
        });
      }
    });
  }
}
