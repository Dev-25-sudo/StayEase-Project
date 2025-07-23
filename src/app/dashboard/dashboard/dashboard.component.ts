import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  favorites: any[] = [];
  allHotels: any[] = [];
  filteredHotels: any[] = [];

  groupedHotelsByCity: { [city: string]: any[] } = {};
  citiesToDisplay: string[] = ['Pune', 'Goa', 'Mumbai', 'Manali', 'Jaipur', 'Rishikesh'];

  searchQuery: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';

  isLoggedIn: boolean = false;
  userEmail: string = '';

  guestCount: number = 1;
  showGuestDropdown: boolean = false;

  today: string = '';

  backendApiUrl = "http://localhost:3000/api/v1/users/";

  fallbackImage: string = 'https://a0.muscache.com/im/pictures/miso/Hosting-1166641853711758251/original/e989d39a-6f8f-41c9-ba17-087f5f05a93c.jpeg?im_w=1200';

  constructor(private http: HttpClient, private router: Router,public authService: AuthService) {}


  getCityHeading(city: string): string {
    switch (city) {
      case 'Pune':
        return 'Popular homes in Pune';
      case 'Goa':
        return 'Stay in Goa';
      case 'Mumbai':
        return 'Popular homes in Mumbai';
      case 'Manali':
        return 'Famous stay in Manali';
      case 'Jaipur':
        return 'Stay in Jaipur';
      case 'Rishikesh':
        return 'Popular stays in Rishikesh';
      default:
        return 'Stay in ' + city;
    }
  }


  ngOnInit(): void {

    this.loadHotels();

    this.authService.user$.subscribe(user => {
    this.isLoggedIn = !!user;
    this.userEmail = user?.email || '';
    console.log('User state changed:', this.isLoggedIn, this.userEmail);
    });

    const stored = localStorage.getItem('favorites');
    this.favorites = stored ? JSON.parse(stored) : [];

    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];

  }

  isFavorite(hotel: any): boolean {
    return this.favorites.some(fav => fav.supplierHotelId === hotel.supplierHotelId);
  }

  toggleFavorite(hotel: any): void {

    if (this.isFavorite(hotel)) {
      this.favorites = this.favorites.filter(fav => fav.supplierHotelId !== hotel.supplierHotelId);
    } else {
      this.favorites.push(hotel);
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadHotels(): void {
    this.http.get<{ data: any[] }>(this.backendApiUrl).subscribe({
      next: (data) => {
        console.log(data);
        this.allHotels = data.data;
        this.filteredHotels = data.data;
        this.groupHotelsByCity(); 
      },
      error: (err) => {
        console.error('Failed to load hotels:', err);
      }
    });
  }

  groupHotelsByCity(): void {
    this.groupedHotelsByCity = {};

    for (const city of this.citiesToDisplay) {
      this.groupedHotelsByCity[city] = this.allHotels
        .filter(hotel => hotel.cityName.toLowerCase() === city.toLowerCase())
        .slice(0, 4);
    }
  }

  objectKeys = Object.keys;

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredHotels = this.allHotels.filter(hotel =>
      hotel.cityName.toLowerCase().includes(query)
    );
  }

  navigateToSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: {
        destination: this.searchQuery,
        checkin: this.checkInDate,
        checkout: this.checkOutDate,
        guests: this.guestCount
      }
    });
  }

  toggleGuestDropdown(): void {
    this.showGuestDropdown = !this.showGuestDropdown;
  }

  incrementGuests(): void {
    this.guestCount++;
  }

  decrementGuests(): void {
    if (this.guestCount > 1) {
      this.guestCount--;
    }
  }
  

  currentYear: number = new Date().getFullYear();

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-item')) {
      this.showGuestDropdown = false;
    }
  }
}
