import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

 shoppingForm: FormGroup;

 subscription: Subscription;
 editMode = false;
 editedItemIndex: number;
 editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup( {
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
    })
    this.subscription = this.shoppingListService.startedEdit.subscribe(
      (index:number) => {
        this.onEditItem(index);
      }
    )
  }
  private onEditItem(index: number) {
    this.editedItemIndex = index;
    this.editMode = true;
    this.editedItem = this.shoppingListService.getIngedientByIndex(index);
    this.shoppingForm.get('name').setValue(this.editedItem.name);
    this.shoppingForm.get('amount').setValue(this.editedItem.amount);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(){
    if (this.shoppingForm.get('name').valid && this.shoppingForm.get('amount').valid){
      const ingredient ={name: this.shoppingForm.value['name'],
        amount: this.shoppingForm.value['amount']}
      if (this.editMode){
        this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
        this.editMode = false;
      }else {
        this.shoppingListService.onAddEvent(ingredient)
        this.shoppingForm.reset()
      }
    }else{
      this.shoppingForm.get('name').markAllAsTouched();
      this.shoppingForm.get('amount').markAllAsTouched();
    }
  }
  onDelete() {
    if (this.editMode){
      this.shoppingListService.delete(this.editedItemIndex);
      this.editMode = false;
    }
  }
  onReset(){
    this.shoppingForm.reset()
    this.editMode = false;
  }
}
