
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AddPropertyService {

  backendApiUrl = "http://localhost:3000/api/v1/users/";

  constructor(private http :HttpClient ) { 

  }

    createProperty(data: any): Observable<any> {
    return this.http.post(this.backendApiUrl, data);
  }
}
