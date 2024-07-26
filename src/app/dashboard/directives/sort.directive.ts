import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSort]',
  standalone: true,
})
export class SortDirective implements OnInit, OnChanges {
  private htmlElement?: ElementRef<HTMLElement>;
  @Input() sortField: string = '';
  @Input() typo: string = 'text';
  @Input() order: boolean =  false;
  @Output() sortChanged = new EventEmitter<{ field: string, order: boolean }>();
  private sortOrder: boolean = false; // 1 for ascending, -1 for descending
  private isSorted = false; // Flag to track if sorting has been triggered

  constructor(private el: ElementRef) {
    this.htmlElement = el;
  }

  // Define the icons
  private initialIcon = '<i class="fas fa-sort"></i>';
  private ascAZIcon = '<i class="fas fa-sort-alpha-up"></i>';
  private descZAIcon = '<i class="fas fa-sort-alpha-down-alt"></i>';
  private ascNumIcon = '<i class="fas fa-sort-numeric-up"></i>';
  private descNumIcon = '<i class="fas fa-sort-numeric-down-alt"></i>';

  ngOnInit(): void {
    this.showInitialIcon();
    console.log(`Se inicia el compoente de sort`);
    console.log(`SortField: ${this.sortField} SortOrder: ${this.sortOrder}, Typo: ${this.typo}`);

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortField'] && !changes['sortField'].isFirstChange()) {
      this.resetSortOrder();
    }
    console.log(`onChange`);
  }

  private resetSortOrder() {
    this.isSorted = false;
    this.sortOrder = false;
    this.showInitialIcon();
  }


  private showInitialIcon() {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.innerHTML = this.initialIcon;
  }

  private toggleSortOrderAndUpdateIcon() {

    if (!this.htmlElement) return;
    console.log(`SortField: ${this.sortField} SortOrder: ${this.sortOrder}, Typo: ${this.typo}`);
    this.sortOrder = !this.sortOrder; // toggle sort order
    switch (this.typo) {
      case 'text':
        this.htmlElement.nativeElement.innerHTML = this.sortOrder ? this.ascAZIcon : this.descZAIcon;
        break;
      case 'number':
        this.htmlElement.nativeElement.innerHTML = this.sortOrder ? this.ascNumIcon : this.descNumIcon;
        break;
    }
  }

  @HostListener('click')
  onSort() {
    if (!this.isSorted) {
      this.isSorted = true;
      this.sortOrder = !this.sortOrder; // Set initial sort order to descending
    }
    // this.toggleSortOrderAndUpdateIcon();
    this.sortChanged.emit({ field: this.sortField, order: this.sortOrder });
  }
}
