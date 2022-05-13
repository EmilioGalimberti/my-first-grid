import { NgSwitch } from '@angular/common';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-make-editor-cell',
    template:`
        <div [ngSwitch]="params.value">
            <span *ngSwitchCase="'Ford'"><input #i [value]="params.value" placeholder="Ingrese un valor..." (keydown)="onKeyDown($event)"></span>
            <!--<span *ngSwitchCase="'Toyota'"> <label for="make"> eliga una marca: </label>
                <select name="make" id="make">
                    <option value="toyota">Toyota</option>
                    <option value="ford">Ford</option>
                </select> -->
            <span *ngSwitchCase="'Toyota'" #opcions> <input  type="radio" value="Ford" name="toyota" id='one' (click)="onClick($event, $event.target)"> ford 
                                            <input type="radio" value="Toyota" name="toyota" id='two' (click)="onClick($event, $event.target)"> toyota
            </span>
            <span *ngSwitchDefault><input #default [value]="params.value??'papa'" placeholder="Lionel estuvo aqui..." (keydown)="onKeyDown($event)"></span>
   `
})

export class MakeEditorComponent implements AfterViewInit{
    /*We want to return the value that a user typed into the input. So we need to access that input to read its value. 
    In Angular we can use the @ViewChild mechanism to accomplish that:*/
    @ViewChild('i') textInput!: ElementRef;
    @ViewChild('opcions') optiones!: ElementRef;
    @ViewChild('default') default!: ElementRef;
    params;
    option!: string;
    
    
  

    /*All right, now we’ve got almost everything set up. The last thing we need to do is to set focus to the input in our custom cell editor as soon 
  as the user activates the edit mode. Conveniently, to do that we can use the ngAfterViewInit lifecycle hook provided by Angular:
  */
    
  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput?.nativeElement.focus();
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
    if (this.textInput != null) {
      return this.textInput?.nativeElement.value;
    }
    if (this.optiones != null) {
      return this.option;
    }
    if (this.default != null){
        return this.default?.nativeElement.value;
    }
  }

  //We also need to add the keyDown listener to prevent losing focus when the user presses navigation keys.
  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }

  onClick(event:MouseEvent , algo?: any){
    console.log(event , algo.value)
    this.option = algo.value
    this.params.api.stopEditing();
  }


  /*
    nueva grid
    con calendario
    1 columna para escribir datoss
    2 (por semana) las otras columnas para escribir horas, y luego que se repitan solas

    */

}
