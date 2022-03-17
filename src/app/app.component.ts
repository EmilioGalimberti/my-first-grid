import { Component, ViewChild , OnInit} from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import {NumberFormatterComponent} from './NumberFormatterComponent/number-formatter.component';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // AGREFAMOS EL VIEW CHILD PARA EL TEME DE LAS GETSELETCROWS PERO NO ME ACUERDO QUE HACIA EXACTAMENTE EL VIEWCHILD
   @ViewChild('agGrid') agGrid!: AgGridAngular;

   defaultColDef: ColDef = {
      sortable: true,
      filter: true
  };

   columnDefs: ColDef[] = [
       {field: 'make', rowGroup: true},
       {
         
        headerName: 'Price',
        field: 'price',
        editable: true, //Enabling editing
        //Specify the renderer for the column
        cellRenderer: 'numberFormatterComponent',
        cellEditor: 'numericEditorComponent',
        filter: 'rangeFilterComponent'
      }
   ];

   autoGroupColumnDef: ColDef = {
      headerName: 'Model',
      field: 'model',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
          checkbox: true
      }
  };


/*
    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
*/
//rowData: Observable<any[]>; //PARA QUE ERA EL OBSERVABLE
rowData = [];

//   constructor(private http: HttpClient) {
//      this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
//   }

   /*Well, we cheated a bit - calling alert is not exactly a call to our backend. Hopefully you will forgive us this shortcut for the sake of keeping the article short and simple. 
   Of course, you can substitute that bit with a real-world application logic after you are done with the tutorial.
   */

   getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => {
        if (node.groupData) {
          return { make: node.key, model: 'Group' };
        }
        return node.data;
      });
      const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

      alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  /*Register the component
    Now that we have our component, we need to tell ag-Grid about it. All custom components should be listed in frameworkComponents configuration option. 
    So let’s import our custom cell renderer and specify it in the configuration: and pass the option to the ag-Grid in the template
  */

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
  };

  ngOnInit() {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }
  
}