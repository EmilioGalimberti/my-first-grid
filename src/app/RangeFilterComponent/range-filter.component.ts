// /*Define custom component
// To implement a custom filter, we follow the familiar customization approach and define an Angular component. 
// Our filter will be rendered as an input with a button to apply the filter. Let’s put this HTML into component’s template:
// */

// import {AfterViewInit, Component, ViewChild} from '@angular/core';

// /*
// We’ll define the filter property to store the current filter condition in the component’s state. When the input is shown, 
// we want to pre-fill it with the current filter condition in the component’s state. We’ll do that using the value input binding. Here’s the code that implements this:

// Then we need to process user input and save it to the component’s state. To do that, we’ll register an event listener on the form and process input when the 
// form is submitted using the Apply button:
// */
// @Component({
//   selector: 'app-range-filter-cell',
//   template: `
//     <form (submit)="onSubmit($event)">
//       <input #i name="filter" [value]="filter"/>
//       <button>Apply</button>
//     </form>
//   `
// })
// export class RangeFilterComponent implements AfterViewInit {
//   @ViewChild('i') textInput;
//   filter = '';
//   params: any;

//   /*hat ag-Grid provides for us through the parameters in the agInit method. 
//   Let’s add the agInit method and modify the onSubmit handler a little bit to notify the grid:
//   */
//   agInit(params: any): void {
//     this.params = params;
//   }
//   // isFilterActive. It determines whether the filter has any filtering condition to apply.
//   isFilterActive() {
//     return this.filter !== '';
//   }
//   //The last thing we need to do is bring focus to input. To do that we’ll use the familiar ngAfterViewInit lifecycle hook:
//   ngAfterViewInit() {
//     setTimeout(() => {
//       this.textInput.nativeElement.focus();
//     });
//   }
//   // doesFilterPass function that performs filtering. It’s called by ag-Grid to determine whether a value passes the current filtering condition or not
//   doesFilterPass(params) {
//     const filter = this.filter.split('-');
//     const gt = Number(filter[0]);
//     const lt = Number(filter[1]);
//     // valueGetter In the code below we use it to retrieve the current value of a cell.
//     const value = this.params.valueGetter(params.node);

//     return value >= gt && value <= lt;
//   }

//   /*ag-Grid implements an API that can be used to activate and deactivate filters on demand
//   For this functionality to work, our custom component should implement two methods — setModel and getModel. 
//   ag-Grid calls them to provide the current filtering condition for a component or to obtain it from the component.
//   */

//   getModel() {
//     return {filter: this.filter};
//   }

//   setModel(model) {
//     this.filter = model ? model.filter : '';
//   }

//   onSubmit(event) {
//     event.preventDefault();

//     const filter = event.target.elements.filter.value;
//     console.log(typeof filter);
//     if (this.filter !== filter) {
//       this.filter = filter;
//       /* notify the grid about the change */
//       this.params.filterChangedCallback();
//     }
//   }
// }
import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-range-filter-cell',
  template: `
    <form (submit)="onSubmit($event)">
      <input #i name="filter" [value]="filter"/>
      <button>Apply</button>
    </form>
  `
})
export class RangeFilterComponent implements AfterViewInit {
  @ViewChild('i') textInput;
  filter = '';
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  isFilterActive() {
    return this.filter !== '';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  doesFilterPass(params) {
    const filter = this.filter.split('-');
    const gt = Number(filter[0]);
    const lt = Number(filter[1]);
    //const value = this.params.valueGetter(params.node);
    let valor = params.node.data.price


    return valor >= gt && valor <= lt;
  }

  getModel() {
    return {filter: this.filter};
  }

  setModel(model) {
    this.filter = model ? model.filter : '';
  }

  onSubmit(event) {
    event.preventDefault();

    const filter = event.target.elements.filter.value;
    console.log(typeof filter);
    if (this.filter !== filter) {
      this.filter = filter;
      this.params.filterChangedCallback();
    }
  }
}