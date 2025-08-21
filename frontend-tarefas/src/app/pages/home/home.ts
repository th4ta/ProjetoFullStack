import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ⬅ IMPORTANTE!
@Component({
selector: 'app-home',
standalone: true,
imports: [RouterModule], // ⬅ NECESSÁRIO PARA USAR routerLink NO HTML
templateUrl: './home.html',
styleUrl: './home.css'
})
export class Home {}