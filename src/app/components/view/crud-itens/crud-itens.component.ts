import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderService } from '../../service/header.service';
import { ReadComponent } from "../../list/read/read.component";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-crud-itens',
    standalone: true,
    templateUrl: './crud-itens.component.html',
    styleUrl: './crud-itens.component.scss',
    imports: [RouterOutlet, RouterModule, ReadComponent, MatButtonModule],
    providers: [HttpClient]
})
export class CrudItensComponent {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/item'
    }
  }

}
