import { Component } from "@angular/core";

@Component({
    selector: 'makeForamatter',
    template:`
        <div [ngSwitch]="params.value">
            <span *ngSwitchCase="'Ford'">😎Ford</span>
            <span *ngSwitchCase="'Toyota'">😉toiota</span>
            <span *ngSwitchCase="'Porsche'">👀porche</span>
            <span *ngSwitchDefault>{{params.value}}</span>
        </div>
    `
})

export class MakeFormatterComponent {
    params: any;
    newparam: any;
    
    agInit(params: any): void{
        this.params = params;
        //console.log(params.value)
        if(params.value == "P"){
            console.log(params)
            console.log('ford')
        }
        
        
    }

    // Agregar la posibilidad de editar la columna de make, Pero segun el caso tendra un editor diferente por ejemplo:
    // Ford = edit with select
    // toyota edit with inputText
    // porche edit with default(checkbox)

}