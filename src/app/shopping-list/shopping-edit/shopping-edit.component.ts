import { Component, OnInit,ViewChild,ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredientsModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
//  @ViewChild('nameInput') nameInputRef!:ElementRef
//  @ViewChild('amountInput') amountInputRef!:ElementRef
@ViewChild('f') slForm!:NgForm;
subscription!:Subscription
 editMode = false
 editedItemIndex!:number
 editedItem!:ingredientsModel
 
  constructor(private slService:ShoppingListService) { }

  ngOnInit(){
  this.subscription = this.slService.startedEditing.subscribe(
    (index:number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngrediets(index)
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    }
  )
  }
  onSubmit(form:NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingamount = this.amountInputRef.nativeElement.value;
    const values = form.value
    const newIngre = new ingredientsModel(values.name,values.amount)
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngre)
    }else{
      this.slService.addIngredient(newIngre)
    }
    this.editMode = false
    form.reset()
  }
  onClear(){
    this.slForm.reset()
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
