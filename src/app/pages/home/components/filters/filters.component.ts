import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {

  @Output() showCatagory = new EventEmitter<string>();

  catagories = ['shoes', 'sports'];


  onShowCatagories(catagory:string):void {
    this.showCatagory.emit(catagory);
  }
}
