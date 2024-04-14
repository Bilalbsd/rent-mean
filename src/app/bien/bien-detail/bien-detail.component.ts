import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/bien.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { SDKGoogleMapModule } from 'sdk-google-map';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  newAvisNote: number | undefined;
  newAvisCommentaire: string | undefined;

  public mapLatitude: string = '';
  public mapLongitude: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bienService: BienService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getBien();
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
      this.location.avis = {
        note: this.newAvisNote,
        commentaire: this.newAvisCommentaire
      };
    }
    if (this.location !== undefined && this.location._id !== undefined) {
      this.locationService.updateLocation(this.location._id, this.location)
        .subscribe((location) => {
          // Succès de la mise à jour
          console.log("location pour avis", location);
          this.location = {...location, avis: location.avis};
          console.log('Avis enregistré avec succès');
        });
    }
  }
}
