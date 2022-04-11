import { Component, ViewChild , OnInit} from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

import {NumberFormatterComponent} from './NumberFormatterComponent/number-formatter.component';
import {NumericEditorComponent} from './NumericEditorComponent/numeric-editor.component';
import {RangeFilterComponent} from './RangeFilterComponent/range-filter.component';

import {CustomHeader} from './CustomHeaderComponent/custom-header.component'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // AGREFAMOS EL VIEW CHILD PARA EL TEME DE LAS GETSELETCROWS PERO NO ME ACUERDO QUE HACIA EXACTAMENTE EL VIEWCHILD
   @ViewChild('agGrid') agGrid!: AgGridAngular;

   defaultColDef = {
    sortable: true,
    filter: true,
    headerHeigth:200
  };

   columnDefs  = [ // que diferncia hay con columnDefs = [
       {field:'model',sortable: false, suppressMenu: true, cellRenderer: 'agGroupCellRenderer',
       cellRendererParams: {
           checkbox: true
       }},
       // this column uses a custom header
       // component specified in comps
       {field: 'make', width: 200},
       {
        field: 'price',
        editable: true, //Enabling editing
        //Specify the renderer for the column
        cellRenderer: 'numberFormatterComponent',
        //custom cell editor
        cellEditor: 'numericEditorComponent',
        /* custom filter */
        filter: 'rangeFilterComponent',
        minWidth: 120,
      }
   ];

public headerHeight = 30; //alturaaaa


rowData = [];



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
    // custom cell editor component
    numericEditorComponent: NumericEditorComponent,
    /* custom filtering component */
    rangeFilterComponent: RangeFilterComponent,
    agColumnHeader: CustomHeader,
  };

  ngOnInit() {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }
  
  /*
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
*/
}