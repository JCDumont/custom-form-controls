import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[stringHighlight]'
})
export class HighlightDirective {

  @Input() set stringHighlight (highlightText) {
    this.highLightString(highlightText);

  }

  constructor(private el: ElementRef) {}

 highLightString ( searchString = ''): void {
   // Get inner html and remove any highlights
   let elementInnerHtml = this.el.nativeElement.innerHTML
    .replace('<strong>', '')
    .replace('</strong>', '')
    .trim();

    if( ( !searchString || searchString === '' ) && elementInnerHtml ) {
      this.el.nativeElement.innerHTML = elementInnerHtml;
      return;
    }

    const regex = new RegExp(searchString, 'ig').exec(elementInnerHtml);

    if ( regex?.[0] ) {
      elementInnerHtml = elementInnerHtml.replace(regex[0],`<strong>${regex[0]}</strong>` )
      this.el.nativeElement.innerHTML = elementInnerHtml;
    }
 }
}
