import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
    @Input() movies: Movie[];
    public mySwiper: Swiper;

    constructor() {}

    ngOnInit(): void {
        // console.log(this.movies);
    }

    ngAfterViewInit(): void {
        this.mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
        });
    }

    onSlideNext() {
        this.mySwiper.slideNext();
    }
    onSlidePrev() {
        this.mySwiper.slidePrev();
    }
}
