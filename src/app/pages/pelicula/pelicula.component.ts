import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-pelicula',
    templateUrl: './pelicula.component.html',
    styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
    public pelicula: MovieResponse;
    public cast: Cast[] = [];

    constructor(
        private activateRoute: ActivatedRoute,
        private peliculasService: PeliculasService,
        private location: Location,
        private router: Router
    ) {}

    ngOnInit(): void {
        const { id } = this.activateRoute.snapshot.params;
        combineLatest([
            this.peliculasService.getPeliculaDetalle(id),
            this.peliculasService.getCast(id),
        ]).subscribe(([movie, cast]) => {
            if (!movie) {
                this.router.navigateByUrl('/home');
                return;
            }
            this.pelicula = movie;
            this.cast = cast.filter((actor) => actor.profile_path !== null);
        });
        // this.peliculasService.getPeliculaDetalle(id).subscribe((movie) => {
        //     if (!movie) {
        //         this.router.navigateByUrl('/home');
        //         return;
        //     }
        //     this.pelicula = movie;
        // });
        // this.peliculasService.getCast(id).subscribe((cast) => {
        //     console.log(id);
        //     this.cast = cast.filter((actor) => actor.profile_path !== null);
        // });
    }

    onRegresar() {
        this.location.back();
    }
}
