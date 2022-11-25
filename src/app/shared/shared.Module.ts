import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert-component";
import { dropdowndirective } from "./dropdown.directive";
import { loadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { placeHolderDirective } from "./PlaceHolder/placeHolder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        loadingSpinnerComponent,
        placeHolderDirective,
        dropdowndirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        loadingSpinnerComponent,
        placeHolderDirective,
        dropdowndirective,
        CommonModule
    ]
})
export class SharedModule{}