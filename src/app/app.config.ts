import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
 
import { routes } from './app.routes';
 
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
 

const firebaseConfig = {
  apiKey: "AIzaSyAFRdMre_5G9Vy7laqE-l9FvQVND939ovk",
  authDomain: "accommodation-booking-sy-be0e1.firebaseapp.com",
  projectId: "accommodation-booking-sy-be0e1",
  storageBucket: "accommodation-booking-sy-be0e1.firebasestorage.app",
  messagingSenderId: "385748548501",
  appId: "1:385748548501:web:935458c01119c7307e549c",
  measurementId: "G-68C7M6RPT3"
};
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ]
};