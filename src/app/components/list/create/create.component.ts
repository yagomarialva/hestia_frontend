import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ListService } from '../../service/list.service';
import { Item } from '../../model/item.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, FormsModule, MatButtonModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers:[ListService]
})
export class CreateComponent  {

  items: Item[] = [];
  error: any;
  dataSource = new MatTableDataSource(this.items);
  createForm: FormGroup;

  constructor(private listService: ListService, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router) {
    this.createForm = this.formBuilder.group({
          name: ['', Validators.required],
          quantity: [0, Validators.required],
          price: [0, Validators.required],
          type: ['', Validators.required],
          description: ['']
        });
  }

  ngOnInit(): void {
    this.getAllItens();
  }
  displayedColumns: string[] = [ 'id','name', 'quantity', 'price', 'type', 'description', 'action'];

  private getAllItens() {
    this.listService.read().subscribe(itens => {
      this.dataSource.data = itens;
      console.log(this.dataSource.data);
    });
  }


  onSubmit(): void {
    if (this.createForm.valid) {
      const newItem = {
        name: this.createForm.value.name,
        quantity: this.createForm.value.quantity,
        price: this.createForm.value.price,
        type: this.createForm.value.type,
        description: this.createForm.value.description
      };

      this.listService.create(newItem).subscribe(
        response => {
          console.log('Item created successfully:', response);
          this.getAllItens();
          this.router.navigate(['/item'])
        },
        error => {
          console.error('Error creating item:', error);
        }
      );
    } else {
      // Exibir mensagem ou lógica para lidar com o formulário inválido
    }
  }
}

