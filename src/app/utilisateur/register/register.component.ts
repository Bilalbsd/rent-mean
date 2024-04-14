import { Component } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  utilisateur: Utilisateur = {
    prenom: '',
    nom: '',
    telephone: '',
    mail: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  handleSubmit(): void {
    if (this.utilisateur.password !== this.utilisateur.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.utilisateurService.register(this.utilisateur).subscribe(
      () => {
        // Enregistrement réussi, rediriger vers la page de connexion
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  handleChange(event: any, field: string): void {
    if (field in this.utilisateur) {
      this.utilisateur[field as keyof Utilisateur] = event.target.value;
    }
  }
}
