import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
    providedIn: 'root',
})
export class PeliculasService {
    private baseUrl = 'https://api.themoviedb.org/3';
    private carteleraPage = 1;
    public cargando = false;

    constructor(private http: HttpClient) {}

    get params() {
        return {
            api_key: '28e6a6e41fcc052fa05e64346f4f6c11',
            languaje: 'es-ES',
            page: this.carteleraPage.toString(),
        };
    }
    getCartelera(): Observable<Movie[]> {
        // console.log('Cargando API');
        if (this.cargando) {
            return of([]);
        }
        this.cargando = true;
        return this.http
            .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
                params: this.params,
            })
            .pipe(
                map((resp) => resp.results),
                tap(() => {
                    this.carteleraPage += 1;
                    this.cargando = false;
                })
            );
    }

    resetCarteleraPage() {
        this.carteleraPage = 1;
    }

    buscarPeliculas(texto: string): Observable<Movie[]> {
        const params = {
            ...this.params,
            page: '1',
            query: texto,
        };
        return this.http
            .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
                params,
            })
            .pipe(map((resp) => resp.results));
    }

    getPeliculaDetalle(id: string) {
        return this.http
            .get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
                params: this.params,
            })
            .pipe(catchError((err) => of(null)));
    }

    getCast(id: string): Observable<Cast[]> {
        return this.http
            .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
                params: this.params,
            })
            .pipe(
                map((resp) => resp.cast),
                catchError((err) => of([]))
            );
    }
}
