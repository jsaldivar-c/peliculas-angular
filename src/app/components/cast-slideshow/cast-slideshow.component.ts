import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

@Component({
    selector: 'app-cast-slideshow',
    templateUrl: './cast-slideshow.component.html',
    styleUrls: ['./cast-slideshow.component.css'],
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {
    @Input() cast: Cast[];
    public mySwiper: Swiper;
    constructor() {}

    ngOnInit(): void {
        console.log(this.cast);
    }

    ngAfterViewInit(): void {
        this.mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 5.3,
            freeMode: true,
            spaceBetween: 15,
        });
    }

    onSlideNext() {
        this.mySwiper.slideNext();
    }
    onSlidePrev() {
        this.mySwiper.slidePrev();
    }
}
