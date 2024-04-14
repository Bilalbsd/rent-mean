import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  mail: string = '';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.nom = decodedToken.nom;
      this.prenom = decodedToken.prenom;
      this.mail = decodedToken.mail;
    }
  }
}
