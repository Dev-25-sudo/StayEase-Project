import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('favorites');
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  get fallbackImage(): string {
    return 'https://a0.muscache.com/im/pictures/miso/Hosting-1166641853711758251/original/e989d39a-6f8f-41c9-ba17-087f5f05a93c.jpeg?im_w=1200';
  }
}

