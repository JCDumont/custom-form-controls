import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[showToolTip]'
})
export class showToolTipDirective {

  @Input() containerElement: HTMLElement;

  @Input() textElement: HTMLElement;

  tooltipDisabled: boolean = false;

  constructor(private el: ElementRef) {
    el.nativeElement.onmouseover = () => {
      const containerWidth = this.el.nativeElement.offsetWidth;
      const childWidth = this.el.nativeElement.childNodes[0].offsetWidth;
      console.log('Mouseover!', containerWidth, childWidth);

      this.el.nativeElement.tooltipDisabled = containerWidth >= childWidth;
    }
  }
}

