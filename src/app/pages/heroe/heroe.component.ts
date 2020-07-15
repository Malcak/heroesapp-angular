import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit, OnChanges {
  @Input() id: string;

  heroe: HeroeModel;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {
    this.heroe = new HeroeModel();
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges(): void {
    Swal.fire({
      title: 'Espere',
      text: 'Cargando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    if (this.id !== 'nuevo') {
      this.heroesService.getHeroe(this.id).subscribe((res: HeroeModel) => {
        this.heroe = res;
        this.heroe.id = this.id;
      });
    } else {
      this.heroe = new HeroeModel();
    }
    setTimeout(() => {
      Swal.close();
    }, 1000);
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log(`Form no valido`);
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe((res) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
  }
}
