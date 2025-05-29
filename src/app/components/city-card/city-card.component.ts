import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherData } from '../../models/weather.model';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent {
  @Input() weatherData!: WeatherData;
  @Output() remove = new EventEmitter<string>();

  getWeatherIcon(condition: string): string {
    const icons: Record<string, string> = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
      Drizzle: '🌦️',
      Mist: '🌫️',
      Fog: '🌁'
    };
    return icons[condition] || '🌈';
  }

  removeCity(): void {
    this.remove.emit(this.weatherData.city);
  }
}