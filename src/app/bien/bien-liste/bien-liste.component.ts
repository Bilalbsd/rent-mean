import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/bien.service';
import { Location } from '../../models/location.model'; // Importer Location depuis le modèle
import { LocationService } from '../../services/location.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bien-liste',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bien-liste.component.html',
  styleUrls: ['./bien-liste.component.css']
})
export class BienListeComponent implements OnInit {
  biens: Bien[] = [];

  moyenne: number | string = 0;

  dateDebut: string = '';
  dateFin: string = '';
  commune: string = '';
  prixMax: number = 0;
  nbChambresMin: number = 0;
  nbCouchagesMin: number = 0;
  distanceMax: number = 0;

  bienRent: boolean = false;
  afficherListeBiens: boolean = false;

  constructor(
    private bienService: BienService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBiens();
  }

  getBiens(): void {
    this.bienService.getBiens()
      .subscribe(biens => {
        this.biens = biens;
        // Pour chaque bien, rechercher les locations associées et calculer la moyenne des notes
        this.biens.forEach(bien => {
          this.locationService.getLocations()
            .subscribe(locations => {
              const notes: number[] = [];
              locations.forEach(location => {
                if (location.avis && location.avis.length > 0) {
                  location.avis.forEach(avis => {
                    notes.push(avis.note);
                  });
                }
              });
              // Calcul de la moyenne des notes
              if (notes.length > 0) {
                this.moyenne = notes.reduce((total, note) => total + note, 0) / notes.length;
              } else {
                this.moyenne = "Pas d'avis";
              }
            });
        });
      });
  }

  rechercheBiens(): void {
    this.bienService.rechercheBiens({
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      commune: this.commune,
      prixMax: this.prixMax,
      nbChambresMin: this.nbChambresMin,
      nbCouchagesMin: this.nbCouchagesMin,
      distanceMax: this.distanceMax
    }).subscribe(
      (biens: Bien[] | any) => {
        if (Array.isArray(biens)) {
          this.biens = biens;
          this.afficherListeBiens = true;
        } else {
          console.log('Le service a retourné un résultat :', biens.data);
          this.biens = biens.data;
          this.afficherListeBiens = true;
        }
      },
      (error) => {
        console.error('Une erreur est survenue lors de la recherche :', error);
      }
    );
  }

  louerBien(bien: Bien): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const mailLoueur = decodedToken.mail;

      if (this.dateDebut && this.dateFin) {
        this.locationService.addLocation({
          idBien: bien._id,
          mailLoueur,
          dateDebut: this.dateDebut,
          dateFin: this.dateFin
        }).subscribe(
          (res: any) => {
            console.log('Location ajoutée avec succès :', res);
            this.bienRent = true;
            // Mettre à jour d'autres états ou actions nécessaires
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la location :', error);
          }
        );
      } else {
        console.error('Veuillez renseigner les dates de début et de fin pour louer ce bien.');
      }
    }
  }

}
