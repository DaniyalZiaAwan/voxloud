import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'e702b3f5a19139715bd82d0527294d4d';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherForCity(city: string): Observable<WeatherData> {
    return this.http.get(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`).pipe(
      map((response: any) => ({
        city: response.name,
        temperature: response.main.temp,
        condition: response.weather[0].main,
        icon: response.weather[0].icon,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed
      })),
      catchError(error => {
        console.error('Error fetching weather data', error);
        throw error;
      })
    );
  }
}