import { Component } from '@angular/core';
import { OffersList } from './components/offers-list/offers-list'

@Component({
  imports: [OffersList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
