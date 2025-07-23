import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AddPropertyService } from '../add-property.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegistrationComponent {
  hotelForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ap: AddPropertyService,
    private http: HttpClient
  ) {
    this.hotelForm = this.fb.group({
      supplierHotelId: [''],
      hotelName: [''],
      brand: [''],
      category: [''],
      starRating: [''],
      latitude: [''],
      longitude: [''],
      address: [''],
      cityName: [''],
      stateCode: [''],
      zipCode: [''],
      countryCode: [''],
      pricePerNight: [''],
      price: ['']
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.hotelForm.valid && this.selectedFile) {
      const formData = new FormData();

      // Flatten details into top-level object
      const hotelData = {
        ...this.hotelForm.value,
        ...this.hotelForm.value.details,
      };
      delete hotelData.details;

      for (const key in hotelData) {
        formData.append(key, hotelData[key]);
      }

      formData.append('image', this.selectedFile);

      this.http
        .post('http://localhost:3000/api/v1/hotels/upload', formData)
        .subscribe({
          next: (res) => {
            console.log('Success:', res);
            this.successMessage = 'Hotel submitted successfully!';
            this.hotelForm.reset();
            this.selectedFile = null;
          },
          error: (err) => {
            console.error('Error:', err);
            this.successMessage = 'Error submitting hotel. Please try again.';
          },
        });
    } else {
      console.log('Form Invalid or image missing');
      this.successMessage = 'Form is incomplete. Please fill all fields and add an image.';
    }
  }
}

