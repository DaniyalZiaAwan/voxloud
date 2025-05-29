import { RouterModule, Routes } from '@angular/router';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: WeatherDashboardComponent }, // Default route
    { path: '**', redirectTo: '' } // Redirect any unknown paths to default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
