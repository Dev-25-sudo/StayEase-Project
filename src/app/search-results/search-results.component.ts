import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  filteredHotels: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const destination = params['destination']?.toLowerCase();

    const backendApiUrl = 'http://localhost:3000/api/v1/users/'; 

    this.http.get<{ data: any[] }>(backendApiUrl).subscribe({
      next: (res) => {
        this.filteredHotels = res.data.filter(hotel =>
          hotel.cityName?.toLowerCase().includes(destination)
        );
        console.log('Filtered hotels:', this.filteredHotels);
      },
      error: (err) => {
        console.error('Error fetching hotels:', err);
      }
    });
  });
}


  
}