import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
    selector: 'app-make-editor-cell',
    template:`
        <span ><input #i [value]="params.value" (keydown)="onKeyDown($event)"></span>
            
   `
})

export class MakeEditorComponent implements AfterViewInit{
    /*We want to return the value that a user typed into the input. So we need to access that input to read its value. 
    In Angular we can use the @ViewChild mechanism to accomplish that:*/
    @ViewChild('i') textInput;
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
    console.log(params.value)
  }
  /*Once editing is finished by pressing Enter or removing the focus from the input, ag-Grid needs to get a value from our editor. 
  To do that, it calls the getValue method on our Angular component that should return the result of the editing.
  */
  getValue() {
    return this.textInput.nativeElement.value;
  }

  //We also need to add the keyDown listener to prevent losing focus when the user presses navigation keys.
  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }
}
