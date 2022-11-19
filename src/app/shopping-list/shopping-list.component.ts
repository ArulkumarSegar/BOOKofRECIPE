import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredientsModel } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  
    ingredients!:ingredientsModel[];
    private igChanged!:Subscription
  constructor(private slService:ShoppingListService) { }

  ngOnInit(){
  this.ingredients = this.slService.getIngredient()
  this.igChanged = this.slService.ingredientChanged
  .subscribe((ing:ingredientsModel[]) =>{
    this.ingredients = ing;
  })  
}
onEditItem(index:number){
this.slService.startedEditing.next(index)
}
ngOnDestroy(){
  this.igChanged.unsubscribe()
}
}
