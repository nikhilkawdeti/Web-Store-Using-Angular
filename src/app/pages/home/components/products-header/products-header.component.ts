import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {

@Output() columnsCountChange = new EventEmitter<number>
  
  sort = 'desc';
  itemsShowCount = 3;


  onSortUpdated(newSort: string): void{
    this.sort = newSort;
  }

  onItemsUpdated(counts: number): void{
    this.itemsShowCount = counts;
  }

  onColumnsUpdated(columnsNumber: number): void{
    this.columnsCountChange.emit(columnsNumber);
  }
}
