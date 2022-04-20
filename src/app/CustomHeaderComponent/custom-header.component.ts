import { Component, ElementRef, HostListener,ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

import { faArrowDown, faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-header',
  template: `


    <div role="columnheader" class="header-cell">
       
          <div>
              {{params.displayName}}
          </div>
        <div class="interaccion" tabindex="0"> 
          <div  tabIndex="0" id="sorting" *ngIf="params.enableSorting" (click)='onSortClicked($event)'>
            *
          </div>
        
          <div tabIndex="0" #menuButton *ngIf="params.enableMenu" (click)='onMenuClicked()'>
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
      display: flex;
      
    }
    
  
    #sorting{
      margin-left: 10px;
      margin-right: 10px
    }

    `,
  ],
})
/* 
.header-cell:hover .interaccion{
  display:flex
  
}
*/
//tabindex

export class CustomHeader implements IHeaderAngularComp {
 
/*
  private tabKey(event: KeyboardEvent) {
    let parentModal = $(document).find('.modal');
    //List of html elements which can be focused by tabbing.
    let focusableElementsArrayString = 'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"]';
    let focusableElementsInModal = parentModal.find(focusableElementsArrayString);
    let numberOfElements = focusableElementsInModal.length;
    let firstTabElement = focusableElementsInModal[0];
    let lastTabElement = focusableElementsInModal[numberOfElements - 1];
    // Check for Shift + Tab
    if (event.keyCode === 9 && event.shiftKey) {
        if (document.activeElement === firstTabElement) {
            event.preventDefault();
            lastTabElement.focus();
        } // Check for Tab
    } else if (event.keyCode === 9) {
        if (document.activeElement === lastTabElement) {
            event.preventDefault();
            firstTabElement.focus();
        }
    }
}
*/ 
 
  params: any;

  @ViewChild('menuButton', { read: ElementRef }) public menuButton! : ElementRef;

  @HostListener('keydown',['$event']) onKeyDown($event: KeyboardEvent){
    console.log("funciona el hijo");
  }

  // The agInit(params) method is called on the header component once.
  // See below for details on the parameters.
  agInit(params: IHeaderParams /*& ICustomHeaderParams*/): void {
    this.params = params
    // console.log(this.params);

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