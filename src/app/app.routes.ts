import { Routes } from '@angular/router';
import { BienListeComponent } from './bien/bien-liste/bien-liste.component';
import { BienFormComponent } from './bien/bien-form/bien-form.component';
import { BienDetailComponent } from './bien/bien-detail/bien-detail.component';
import { RegisterComponent } from './utilisateur/register/register.component';
import { LoginComponent } from './utilisateur/login/login.component';
import { ProfilComponent } from './utilisateur/profil/profil.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: '', title: 'BienList', component: BienListeComponent },
    { path: 'biens/add', title: 'BienFrom', component: BienFormComponent },
    { path: 'biens/:id', title: 'BienDetail', component: BienDetailComponent },
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'profil', title: 'Profil', component: ProfilComponent },

    { path: 'map', title: 'Map', component: MapComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
    //   { path: 'biens/:id', component: DetailsBienComponent },
    //   { path: 'biens/:id/modification', component: ModificationBienComponent },
    //   { path: 'biens/:id/suppression', component: SuppressionBienComponent },

];
