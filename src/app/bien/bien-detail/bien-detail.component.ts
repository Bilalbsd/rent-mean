import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/bien.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SDKGoogleMapModule } from 'sdk-google-map';

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

  getLocation(): void {
    const bienId = this.route.snapshot.paramMap.get('id');
    if (bienId !== null && this.location !== undefined && this.location.dateDebut !== undefined) {
      this.locationService.getLocationById(bienId)
        .subscribe(location => {
          this.location = location;
          this.initMap(); // Appel de initMap une fois que la location est récupérée
        });
    }
  }

  initMap(): void {
    // Implémentez l'initialisation de la carte ici
  }

  deleteBien(id: string): void {
    this.bienService.deleteBien(id)
      .subscribe(() => {
        this.router.navigate(['/biens']);
      });
  }
}