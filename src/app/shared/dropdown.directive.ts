import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appdropdown]'
})
export class dropdowndirective{

    @HostBinding('class.open') isOpen = false;

@HostListener('click') toggleOpen(){
this.isOpen = !this.isOpen
}

}