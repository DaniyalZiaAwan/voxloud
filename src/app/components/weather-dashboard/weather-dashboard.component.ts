import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../models/weather.model';
import { LocalStorageUtil } from '../../utils/local-storage.util';
import { CityCardComponent } from '../city-card/city-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css'],
  imports: [CityCardComponent, FormsModule, CommonModule],
  standalone: true,
})
export class WeatherDashboardComponent implements OnInit {
  cities: WeatherData[] = [];
  newCity = '';
  isLoading = false;
  error = '';

  constructor(private weatherService: WeatherService, private zone: NgZone, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    const savedCities = LocalStorageUtil.getData<string[]>('weatherCities');
    if (savedCities && savedCities.length > 0) {
      savedCities.forEach((city: string) => this.addCity(city));
    }
  }

  addCity(cityName: string): void {
    if (!cityName) return;

    this.isLoading = true;
    this.error = '';

    this.weatherService.getWeatherForCity(cityName).subscribe({
      next: (weatherData: any) => {
        this.zone.run(() => {
          if (!this.cities.some(c => c.city.toLowerCase() === weatherData.city.toLowerCase())) {
            this.cities.push(weatherData);
            this.updateLocalStorage();
          } else {
            this.error = 'City already exists in dashboard';
            this.ref.detectChanges();
          }
          this.isLoading = false;
          this.newCity = '';
          this.ref.detectChanges();
        });

      },
      error: () => {
        this.error = 'City not found. Please try again.';
        this.isLoading = false;
        this.ref.detectChanges();
      }
    });
  }

  removeCity(city: string): void {
    this.cities = this.cities.filter(c => c.city !== city);
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    LocalStorageUtil.saveData('weatherCities', this.cities.map(c => c.city));
  }
}