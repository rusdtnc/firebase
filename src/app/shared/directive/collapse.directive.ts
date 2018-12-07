import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[collapse]'
})
export class CollapseDirective {
  private changes: MutationObserver;


  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          if (mutation.target.attributes['aria-expanded'].nodeValue === 'true' && element.className !== 'fas fa-minus-square') {
            element.className = 'fas fa-minus-square';
          } else if (mutation.target.attributes['aria-expanded'].nodeValue === 'false' && element.className !== 'fas fa-plus-square') {
            element.className = 'fas fa-plus-square';
          }
        });
      }
    );

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }
}
