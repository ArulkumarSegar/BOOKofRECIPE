import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

@Output() featureSelected = new EventEmitter<string>();
  userSub!:Subscription
  isAuthenticated = false
  onSelect(feature:string){
    this.featureSelected.emit(feature)
  }
  constructor(private dataService:DataStorageService,private authService:AuthService,
    private router:Router) { }

  ngOnInit(){
   this.userSub = this.authService.user.subscribe(
    user => {
      this.isAuthenticated = !!user;
    console.log(!user);
    console.log(!!user);
    
    }
   )
  }
  onSaveData(){
    this.dataService.storeRecipes()
  }
  onFetchData(){
    this.dataService.fetchRecipes().subscribe()
  }
  
  onLogout(){
    this.authService.logout();
    // this.router.navigate(['./auth'])
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}
