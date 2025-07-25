import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:3000/api/v1/hotels';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

 // hotel.service.ts
deleteHotel(id: number) {
  return this.http.delete(`http://localhost:3000/api/v1/hotels/${id}`);
}

}

