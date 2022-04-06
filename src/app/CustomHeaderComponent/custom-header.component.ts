import { Component, ElementRef, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

/*export interface ICustomHeaderParams {
  menuIcon: string;
}
*/
@Component({
  selector: 'app-custom-header',
  template: `
    
  `,
  styles: [
    `
    `,
  ],
})
export class CustomHeader implements IHeaderAngularComp {
  params: any;
  /*public params!: IHeaderParams //& ICustomHeaderParams;

  public ascSort = 'inactive';
  public descSort = 'inactive';
  public noSort = 'inactive';*/

  //@ViewChild('menuButton', { read: ElementRef }) public menuButton!: ElementRef;

  // The agInit(params) method is called on the header component once.
  // See below for details on the parameters.
  agInit(params: IHeaderParams /*& ICustomHeaderParams*/): void {
    /*this.params = params;

    params.column.addEventListener(
      'sortChanged',
      this.onSortChanged.bind(this)
    );

    this.onSortChanged();*/
  }

// option 1) tell the grid when you want to progress the sorting
onSortClicked(event) {
  // in this example, we do multi sort if Shift key is pressed
 this.params.progressSort(event.shiftKey);
};

/*
  onMenuClicked() {
    this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  onSortRequested(order: 'asc' | 'desc' | null, event: any) {
    this.params.setSort(order, event.shiftKey);
  }

*/


   // Gets called when a new Column Definition has been set for this header.
   // If you handle the refresh of your header return true otherwise return false and the grid will re-create your header from scratch.
  refresh(params: IHeaderParams)
  {//: boolean 
    return true;
  }
}