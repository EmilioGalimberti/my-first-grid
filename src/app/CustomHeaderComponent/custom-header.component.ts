import { Component, ElementRef, HostListener,ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

import { faArrowDown, faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-header',
  template: `
    <div role="columnheader" class="header-cell">
       
          <div >
              {{params.displayName}}
          </div>
        <div class="interaccion"> 
          <div id="sorting" *ngIf="params.enableSorting" (click)='onSortClicked($event)'>
            *
          </div>
        
          <div  #menuButton *ngIf="params.enableMenu" (click)='onMenuClicked()'>
            🐱‍👤
          </div>
        </div>
      
    </div>
  `,
  styles: [
    `
    .header-cell{
      display: flex;
      width:50px;
    }      

    .interaccion{
      display: none;
      
    }

    .header-cell:hover .interaccion{
      display:flex
      
    }

    #sorting{
      margin-left: 10px;
      margin-right: 10px
    }

    `,
  ],
})

//tabindex

export class CustomHeader implements IHeaderAngularComp {
  params: any;

  @ViewChild('menuButton', { read: ElementRef }) public menuButton! : ElementRef;

  // The agInit(params) method is called on the header component once.
  // See below for details on the parameters.
  agInit(params: IHeaderParams /*& ICustomHeaderParams*/): void {
    this.params = params
    console.log(this.params);

  }

 

  onSortClicked(event) {
    // in this example, we do multi sort if Shift key is pressed
   this.params.progressSort(event.shiftKey);
  };

  public onMenuClicked() {
    this.params.showColumnMenu(this.menuButton.nativeElement); //abri este elemento
  }

   // Gets called when a new Column Definition has been set for this header.
   // If you handle the refresh of your header return true otherwise return false and the grid will re-create your header from scratch.
  refresh(params: IHeaderParams)
  {//: boolean 
    return true;
  }
}