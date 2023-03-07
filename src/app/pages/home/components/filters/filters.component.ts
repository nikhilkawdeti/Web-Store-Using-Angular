import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {

  @Output() showCatagory = new EventEmitter<string>();

  catagories = ['shoes', 'sports'];

// the show catagory event emitter send or emit catagory to whovere called (showcatagory)
  onShowCatagories(catagory:string):void {
    this.showCatagory.emit(catagory);
  }

  
}
