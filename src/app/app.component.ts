import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   @ViewChild('agGrid') agGrid!: AgGridAngular;

   columnDefs: ColDef[] = [
       {field: 'make', sortable: true, filter: true, checkboxSelection: true},
       {field: 'model', sortable: true, filter: true},
       {field: 'price', sortable: true, filter: true}
   ];


/*
    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
*/
rowData: Observable<any[]>;

   constructor(private http: HttpClient) {
      this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
   }

   getSelectedRows(): void {
            const selectedNodes = this.agGrid.api.getSelectedNodes();
            const selectedData = selectedNodes.map(node => node.data);
            const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model} $${node.price}`).join(', ');
      
            alert(`Selected nodes: ${selectedDataStringPresentation}`);
         }
}