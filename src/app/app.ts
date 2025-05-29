import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'voxloud';
}
