import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appSort]',
  standalone: true,
})
export class SortDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _sortField: string = '';
  @Input() sortField: string = '';
  private sortOrder = 1; // 1 for ascending, -1 for descending

  constructor(private el: ElementRef) {
    this.htmlElement = el;
    console.log(`Directiva sort: ${this.sortField}`);
  }
  ngOnInit(): void {
    this.onSort();

  }

  @HostListener('click')
  onSort() {
    if ( !this.htmlElement )return;
    this.sortOrder = this.sortOrder * -1; // toggle sort order
    this.htmlElement!.nativeElement.innerHTML = this.sortOrder == 1 ? '<i class="fas fa-sort-alpha-up"></i>' : '<i class="fas fa-sort-alpha-down"></i>';

  }


}
