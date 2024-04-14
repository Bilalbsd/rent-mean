import { Component } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Utilisateur {
  mail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  utilisateur: Utilisateur = {
    mail: '',
    password: ''
  };
  errorMessage = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  handleSubmit(): void {
    this.utilisateurService.login(this.utilisateur).subscribe(
      (response: { token: string }) => {
        localStorage.setItem('token', response.token); // Ajouter le token dans le localStorage
        this.router.navigate(['/accueil']); // Rediriger vers la page d'accueil après la connexion réussie
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  handleChange(event: any, field: string): void {
    this.utilisateur[field as keyof Utilisateur] = event.target.value;
  }
}
