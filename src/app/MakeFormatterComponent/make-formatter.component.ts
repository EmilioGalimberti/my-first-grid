import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'makeForamatter',
    template:`
        <div [ngSwitch]="params.value">
            <span *ngSwitchCase="'Ford'">😎Ford</span>
            <span *ngSwitchCase="'Toyota'">😉toiota</span>
            <span *ngSwitchCase="'Porsche'">👀porche</span>
        </div>
    `
})

export class MakeFormatterComponent {
    params: any;
    newparam: any;
    coffe = faCoffee
    agInit(params: any): void{
        this.params = params;
        console.log(params.value)
        if(params.value == "P"){
            console.log(params)
            console.log('ford')
        }
        

    }


}