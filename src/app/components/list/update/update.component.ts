import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { ListService } from '../../service/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, FormsModule, MatButtonModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  
  updateForm: FormGroup;
  itemId: any;

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      type: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.getItemDetails(this.itemId);
    });
  }

  getItemDetails(id: any): void {
    this.listService.get(id).subscribe(
      (data: Item) => {
        this.updateForm.setValue({
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          type: data.type,
          description: data.description
        });
      },
      error => {
        console.error('Error getting item details:', error);
        // Adicione lógica adicional para lidar com o erro, se necessário
      }
    );
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedItem = {
        name: this.updateForm.value.name,
        quantity: this.updateForm.value.quantity,
        price: this.updateForm.value.price,
        type: this.updateForm.value.type,
        description: this.updateForm.value.description
      };

      this.listService.update(this.itemId, updatedItem).subscribe(
        response => {
          console.log('Item updated successfully:', response);
          // Adicione lógica adicional, se necessário
          this.router.navigate(['/item']);  // Redireciona para a página de leitura após a atualização
        },
        error => {
          console.error('Error updating item:', error);
          // Trate o erro conforme necessário
        }
      );
    } else {
      // Exibir mensagem ou lógica para lidar com o formulário inválido
    }
  }

}
