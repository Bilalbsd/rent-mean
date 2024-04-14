import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    // Vérifiez si le token existe dans le localStorage
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Supprimez le token du localStorage
    localStorage.removeItem('token');
    // Redirigez l'utilisateur vers la page de connexion ou d'accueil
    this.router.navigate(['/login']); // ou ['/'] selon votre configuration
  }

}
