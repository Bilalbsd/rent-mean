import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/bien.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { SDKGoogleMapModule } from 'sdk-google-map';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-bien-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SDKGoogleMapModule],
  templateUrl: './bien-detail.component.html',
  styleUrls: ['./bien-detail.component.css']
})
export class BienDetailComponent implements OnInit {
  bien: Bien | undefined;

  location: Location | undefined;
  locataires: Location[] = [];

  newAvisNote: number | undefined;
  newAvisCommentaire: string | undefined;

  public mapLatitude: string = '';
  public mapLongitude: string = '';

  nom: string = '';
  prenom: string = '';
  mail: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bienService: BienService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getBien();
    this.getLocatairesByBienId();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.nom = decodedToken.nom;
      this.prenom = decodedToken.prenom;
      this.mail = decodedToken.mail;
    }
  }

  getBien(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.bienService.getBien(id)
        .subscribe(bien => {
          this.bien = bien;
          this.mapLatitude = this.bien?.latitude.toString();
          this.mapLongitude = this.bien?.longitude.toString();
          this.getLocation();
        });
    }
  }

  deleteBien(id: string): void {
    this.bienService.deleteBien(id)
      .subscribe(() => {
        this.router.navigate(['/biens']);
      });
    }

  getLocatairesByBienId(): void {
    this.locationService.getLocations()
      .subscribe(locations => {
        // Filtrer les locations pour récupérer uniquement celles liées au bien actuel
        this.locataires = locations.filter(location => location.idBien === this.bien?._id);
      });
  }

  getLocation(): void {
    const bienId = this.route.snapshot.paramMap.get('id');
    if (bienId !== null) {
      this.locationService.getLocationById(bienId)
        .subscribe(location => {
          this.location = location;
        });
    }
  }

  saveAvis(): void {
    if (this.newAvisNote !== undefined && this.newAvisCommentaire !== undefined && this.location !== undefined) {
        const newAvis = {
            note: this.newAvisNote,
            commentaire: this.newAvisCommentaire
        };
        if (!this.location.avis) {
            this.location.avis = []; // Initialisation du tableau d'avis s'il est vide
        }
        this.location.avis.push(newAvis); // Ajout du nouvel avis au tableau

        if (this.location._id) {
            this.locationService.updateLocation(this.location._id, this.location)
                .subscribe((location) => {
                    this.location = location; // Mettre à jour la location avec les avis mis à jour
                    console.log('Avis enregistré avec succès');
                });
        }
    }
}

}
