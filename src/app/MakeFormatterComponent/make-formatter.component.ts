import { Component } from "@angular/core";

@Component({
    selector: 'makeForamatter',
    template:`
        
    `
})

export class MakeFormatterComponent {
    params: any;
    newparam: any;
    
    agInit(params: any): void{
        console.log('awa')
        this.params = params;
        console.log(params)
    }


}