import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  hotel: any;
  propertyId: string | null = null;
  checkInDate: string = '';
  checkOutDate: string = '';
  guestCount: number = 1;

 
  backendApiUrl = "http://localhost:3000/api/v1/users/";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    console.log('Route ID:', this.propertyId);

   
    this.http.get<{ data: any[] }>(this.backendApiUrl).subscribe({
      next: (data) => {
      
        this.hotel = data.data.find(h => h.supplierHotelId === this.propertyId);
        console.log('Loaded hotel:', this.hotel);
      },
      error: (err) => {
        console.error('Failed to load hotel data:', err);
      }
    });
  }

  goToPayment() {
    const bookingData = {
      hotel: this.hotel,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestCount: this.guestCount
    };
    this.router.navigate(['/payment'], { state: bookingData });
  }
}
