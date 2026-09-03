import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard';
import { HomeComponent } from './components/home/home';
import { DriversComponent } from './components/drivers/drivers';
import { DriverProfileComponent } from './components/driver-profile/driver-profile';
import { RacesListComponent } from './components/races-list/races-list';
import { RaceDetailComponent } from './components/race-detail/race-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tabla-posiciones', component: LeaderboardComponent },
  { path: 'pilotos', component: DriversComponent },
  { path: 'pilotos/:id', component: DriverProfileComponent },
  { path: 'carreras', component: RacesListComponent },
  { path: 'carreras/:id', component: RaceDetailComponent },
  { path: '**', redirectTo: '' },
];
