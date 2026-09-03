import { Component } from '@angular/core';
import { OffersList } from './components/offers-list/offers-list'
import { AddOfferForm } from './components/add-offer-form/add-offer-form'

@Component({
  imports: [OffersList, AddOfferForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
