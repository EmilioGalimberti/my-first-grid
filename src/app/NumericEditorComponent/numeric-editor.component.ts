//Custom cell editor
//Define custom component
//Similar to a custom cell renderer, we need to define an Angular component to act as a cell editor. 
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ICellEditorAngularComp, ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
//. Let’s start with the basic implementation that will render an input element that will pop up when a user activates the edit mode:
  selector: 'app-numeric-editor-cell',
  template: `
    <input #i [value]="params.value" (keypress)="onKeyPress($event)" (keydown)="onKeyDown($event)"/>
  `
})
export class NumericEditorComponent implements AfterViewInit {

//We want to return the value that a user typed into the input. So we need to access that input to read its value. 
//In Angular we can use the @ViewChild mechanism to accomplish that:
  @ViewChild('i') textInput; // me daba error Member 'textInput' implicitly has an 'any' type. agg "noImplicitAny": false en el tsconfig.json se arregla
  params;

  /*All right, now we’ve got almost everything set up. The last thing we need to do is to set focus to the input in our custom cell editor as soon 
  as the user activates the edit mode. Conveniently, to do that we can use the ngAfterViewInit lifecycle hook provided by Angular:
  */
  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }
  //Notice that we’re getting the cell value from the grid in the agInit method and returning the value in the getValue method.
  
  agInit(params: any): void {
    this.params = params;
  }
  /*Once editing is finished by pressing Enter or removing the focus from the input, ag-Grid needs to get a value from our editor. 
  To do that, it calls the getValue method on our Angular component that should return the result of the editing.
  */
  getValue() {
    return this.textInput.nativeElement.value;
  }

  /*Now we’re ready to implement the functionality to filter out non-numeric characters. 
  To do that, we need to add an event listener to the input and check each item typed in by the user.
  */
  onKeyPress(event) {
    if (!isNumeric(event)) {
      event.preventDefault();
    }

    function isNumeric(ev) {
      return /\d/.test(ev.key);
    }
  }

  //We also need to add the keyDown listener to prevent losing focus when the user presses navigation keys.
  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }
}