import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
/*
we are using Angular's HttpClient and an async 
pipe. As a first step, let's add the HttpModule
and use extern data base
*/
//import { HttpClientModule } from '@angular/common/http';
//import 'ag-grid-enterprise';

import {NumberFormatterComponent} from './NumberFormatterComponent/number-formatter.component'
import {NumericEditorComponent} from './NumericEditorComponent/numeric-editor.component';
import {RangeFilterComponent} from './RangeFilterComponent/range-filter.component';

@NgModule({
  declarations: [AppComponent, NumberFormatterComponent,  NumericEditorComponent, RangeFilterComponent],
  imports: [
    BrowserModule,
    //HttpClientModule,

    //All custom components used by ag-Grid should be listed in the AgGridModule.withComponents method imported into the main application module
    AgGridModule.withComponents([
      /*Custom cell renderer
      we’re going to implement a custom cell renderer to show the price formatted according to a user’s locale. 
      Here’s how the numbers are displayed on my computer:
      */
      NumberFormatterComponent,
      NumericEditorComponent, 
      RangeFilterComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}