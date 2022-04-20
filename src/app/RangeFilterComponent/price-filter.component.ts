//import {IFilterAngularComp} from "@ag-grid-community/angular";
//import {IDoesFilterPassParams, Component, IFilterParams} from "@ag-grid-community/core";

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'year-filter',
   template: `
     <div style="display: inline-block; width: 400px;">
           <!--  <div style="padding: 10px; background-color: #d3d3d3; text-align: center;">This is a very wide filter</div>
           <label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">
               <input type="radio" name="price" [(ngModel)]="price" (ngModelChange)="updateFilter()" [value]="'All'"/> All
          </label> -->
          <label style="margin: 10px; padding: 50px; display: inline-block; background-color: #000">
              <input type="number" name="price" [(ngModel)]="price" (ngModelChange)="updateFilter()" [value]="'32000'"/> Since 32000
          </label>
     </div>
   `
})
export class PriceFilter implements IFilterAngularComp {
   params!: IFilterParams;
   price: string = 'All';

   agInit(params: IFilterParams): void {
       this.params = params;
   }

   isFilterActive(): boolean {
       return this.price === '32000'
   }

   doesFilterPass(params: IDoesFilterPassParams): boolean {
        console.log(params);
       return params.data.price >= 32000;
   }

   getModel() {
   }

   setModel(model: any) {
   }

   updateFilter() {
       this.params.filterChangedCallback();
   }
}