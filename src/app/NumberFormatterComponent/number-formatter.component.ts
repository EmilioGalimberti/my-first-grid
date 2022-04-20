/*We want to format our number according to a user’s locale, so we need to create a custom component. 
The component will take advantage of the Angular’s currency pipe to format values
que seria currency?
*/

//Define custom component
//To show the formatted value, we’ll use a simple span element

import {Component} from '@angular/core';

@Component({
  selector: 'app-number-formatter-cell',
  template: `
    <span>{{params.value | currency:'EUR'}}</span>
  `
})
export class NumberFormatterComponent {
  params: any;

  //It will receive the value of a cell through the agInit method, is used to receive parameters from ag-Grid.
  agInit(params: any): void {
    this.params = params;
  }
}

// https://www.ag-grid.com/angular-data-grid/cell-rendering/ Custom cell renderer