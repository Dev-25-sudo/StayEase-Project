import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent {
  hotel: any;
  checkInDate: string = '';
  checkOutDate: string = '';
  guestCount: number = 1;
  nights: number = 0;
  totalPrice: number = 0;
  taxes: number = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;

    if (state) {
      this.hotel = state.hotel;
      this.checkInDate = state.checkInDate;
      this.checkOutDate = state.checkOutDate;
      this.guestCount = state.guestCount;
      this.calculatePricing();
    }
  }

  calculatePricing() {
    const inDate = new Date(this.checkInDate);
    const outDate = new Date(this.checkOutDate);
    const msDiff = outDate.getTime() - inDate.getTime();

    this.nights = msDiff > 0 ? msDiff / (1000 * 60 * 60 * 24) : 0;

    
    const pricePerNight = this.hotel.pricePerNight || this.hotel.price || 0;

    this.totalPrice = this.nights * pricePerNight;
    this.taxes = +(this.totalPrice * 0.105).toFixed(2); 
  }

  get finalAmount(): number {
    return this.totalPrice + this.taxes;
  }
}


