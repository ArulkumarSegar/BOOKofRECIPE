import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert-component";
import { placeHolderDirective } from "../shared/PlaceHolder/placeHolder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    
    isLoginMode = true;
    isLoading = false;
    error:string = null!;
    private closeSub!:Subscription;

    @ViewChild(placeHolderDirective) alertHost!:placeHolderDirective
    
    constructor(private authService:AuthService,private router:Router){}
    
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form:NgForm){
    
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        if(this.isLoginMode){
           authObs = this.authService.login(email,password)
        }else{
           authObs = this.authService.signUp(email,password)
        }
        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
           this.router.navigate(['/recipes'])
            },
            errorMsg => {
                console.log(errorMsg);
                this.error = errorMsg;
                this.showErrorAlert(errorMsg)
                this.isLoading = false;
            }
        )

        form.reset();

    }
        onHandleError(){
            this.error = null!;
        }
        private showErrorAlert(msg:string){
            
            const hostViewContainerRef = this.alertHost.viewContainerRef;
            
            const componentRef = hostViewContainerRef.createComponent(AlertComponent)
            componentRef.instance.message = msg;
            this.closeSub =  componentRef.instance.close.subscribe(
                () => {
            this.closeSub.unsubscribe()
            hostViewContainerRef.clear()
        }
        )
        
    }
    ngOnDestroy(){
        // this.closeSub.unsubscribe()
    }
        
}