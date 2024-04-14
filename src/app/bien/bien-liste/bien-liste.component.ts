import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/bien.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-bien-liste',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bien-liste.component.html',
  styleUrl: './bien-liste.component.css'
})
export class BienListeComponent implements OnInit {
  biens: Bien[] = [];

  dateDebut: string = '';
  dateFin: string = '';
  commune: string = '';
  prixMax: number = 0;
  nbChambresMin: number = 0;
  nbCouchagesMin: number = 0;
  distanceMax: number = 0;

  bienRent: boolean = false;

  afficherListeBiens: boolean = false;

  constructor(private bienService: BienService, private locationService: LocationService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getBiens();
    console.log(this.biens, "biens");
  }

  getBiens(): void {
    this.bienService.getBiens()
      .subscribe(biens => this.biens = biens);
  }

  rechercheBiens(): void {
    // Appel à la méthode de recherche du service avec les valeurs du formulaire
    this.bienService.rechercheBiens({
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      commune: this.commune,
      prixMax: this.prixMax,
      nbChambresMin: this.nbChambresMin,
      nbCouchagesMin: this.nbCouchagesMin,
      distanceMax: this.distanceMax
    }).subscribe((biens: any) => {
      // Vérifie si biens est un tableau
      if (Array.isArray(biens)) {
        // Mettre à jour le tableau de biens avec les résultats de la recherche
        this.biens = biens;
        this.afficherListeBiens = true;
      } else {
        console.log('Le service a retourné un résultat :', biens.data);
        this.biens = biens.data;
        this.afficherListeBiens = true;
      }
    }, (error) => {
      console.error('Une erreur est survenue lors de la recherche :', error);
    });
  }

  louerBien(bien: Bien): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);

    const mailLoueur = decodedToken.mail // Remplacer par l'email de l'utilisateur connecté
    const { dateDebut, dateFin } = this; // Récupérer les dates de début et de fin du formulaire
    // Vérifier si les dates de début et de fin sont renseignées
    if (dateDebut && dateFin) {
      this.locationService.addLocation({ idBien: bien._id, mailLoueur, dateDebut, dateFin })
        .subscribe((res: any) => {
          console.log('Location ajoutée avec succès :', res);
          this.bienRent = true;
          // Mettre à jour d'autres états ou actions nécessaires
        }, (error) => {
          console.error('Erreur lors de l\'ajout de la location :', error);
          // Gérer les erreurs
        });
      }
    } else {
      console.error('Veuillez renseigner les dates de début et de fin pour louer ce bien.');
    }
  }
  
}
