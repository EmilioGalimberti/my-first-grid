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
    
    
    agInit(params: any): void{
        this.params = params;
        //console.log(params.value)
        
        
    }

   

}