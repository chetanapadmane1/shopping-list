import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') iform: NgForm;
  selectedEdit: number;
  editMode = false;
  selectedIngredient: Ingredient = { name: '', amount: null };
  constructor(private sl: ShoppingListService) { }

  ngOnInit() {
    this.sl.selectEditing.subscribe(index => {
      this.selectedEdit = index;
      this.editMode = true;
      this.selectedIngredient = this.sl.getIngredient(this.selectedEdit);
      this.iform.setValue({
        name: this.selectedIngredient.name,
        amount: this.selectedIngredient.amount
      })
    });
  }
  onAddItem(form: NgForm) {
    const formValue = form.value;
    let newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.sl.updateIngredient(this.selectedEdit, newIngredient);
    }
    else {
      this.sl.addIngredient(newIngredient);
    }
    this.clearForm();
  }
  clearForm() {
    this.iform.reset();
    this.editMode = false;
  }
  deleteIngredient() {
    this.sl.deleteIngredient(this.selectedEdit);
    this.clearForm();
  }
}
