import { Component } from '@angular/core';

// i dont know why we need to write this here row height
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {

  cols = 3; 
  rowHeight = ROWS_HEIGHT[this.cols];
  catagory: string | undefined;

  // when we click on 1 3 4 column icons it changes the views of products list
  onColumnsCountChange(columnsNumber: number) :void {
    this.cols = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }


  // we are passing onShowCatagory to filter.component.ts
  onShowCatagory(newCatagory: string): void {
    this.catagory = newCatagory;
  }
}
