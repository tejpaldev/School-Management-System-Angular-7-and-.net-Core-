import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  ViewChildren,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  Directive
} from "@angular/core";
import {
  AnimationFactory,
  AnimationBuilder,
  style,
  animate,
  AnimationPlayer
} from "@angular/animations";
import { CarouselItemElementDirective } from "../directives/carousel-item-element.directive";
import { CarouselItemDirective } from "../directives/carousel-item.directive";
import { Observable, interval } from "rxjs";

@Component({
  selector: "carousel",
  exportAs: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective)
  items: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElementDirective, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  @ViewChild("carousel") private carousel: ElementRef;
  @Input() timing = "1000ms ease";
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  public currentIndex = 0;
  carouselWrapperStyle = {};

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });
    interval(40 * 60).subscribe(x => {
      this.next();
    });
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  private play() {
    this.player.play();
  }

  private pause() {
    this.player.pause();
  }

  public next() {
    if (this.currentSlide + 1 === this.items.length) {
      this.currentSlide = 0;
      this.currentIndex = this.currentSlide;
    } else {
      this.currentSlide = (this.currentSlide + 1) % this.items.length;
      this.currentIndex = this.currentSlide;
    }

    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.play();
  }

  public prev() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.items.length - 1;
      this.currentIndex = this.currentSlide;
    } else {
      this.currentSlide =
        (this.currentSlide - 1 + this.items.length) % this.items.length;
      this.currentIndex = this.currentSlide;
    }
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.play();
  }

  public slide(index: number) {
    this.currentIndex = index;
    this.currentSlide = index;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.play();
  }
}
