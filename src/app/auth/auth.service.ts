import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, tap, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'
import { User } from "./user.model";

export interface AuthResponseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
@Injectable({
    providedIn:'root'
})
export class AuthService{

    user = new BehaviorSubject<User>(null!)
    private tokenExpireTimer:any
    constructor(private http:HttpClient,private router:Router){}

    signUp(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoduBTwSHjp6XYP4xJqJ1mhn-onMRf7l0',
        {
            
                email:email,
                password:password,
                returnSecureToken:true
            
        })
    .pipe(catchError(this.handleError),
    tap(
        resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    })
    )
    }

    login(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoduBTwSHjp6XYP4xJqJ1mhn-onMRf7l0',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        )
        .pipe(
            catchError(this.handleError),
            tap(
                resData => {
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
            }) 
            )
    }
    autoLogin(){
        const UserData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('Data')as string)
        if(!UserData){
            return 
        }
        const loadedUser = new User(UserData.email,UserData.id,UserData._token,new Date(UserData._tokenExpirationDate))
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expireDuration = new Date(UserData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expireDuration)
        }
    }
    logout(){
        this.user.next(null!)
        this.router.navigate(['/auth'])
        localStorage.removeItem('Data')
        if(this.tokenExpireTimer){
            clearTimeout(this.tokenExpireTimer)
        }
        this.tokenExpireTimer = null
    }
    autoLogout(expireDuration:number){
        console.log(expireDuration);
        
       this.tokenExpireTimer = setTimeout(
            () => {
                this.logout()
            },2000)
    }
    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate)
        this.user.next(user)
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('Data',JSON.stringify(user))
    }
    private handleError(errorRes:HttpErrorResponse){
            
        let errorMsg = "An unknown Error occured";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMsg)
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMsg = 'this email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'this email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'this password is not correct';
                break;
        }
        return throwError(errorMsg)
    }

}