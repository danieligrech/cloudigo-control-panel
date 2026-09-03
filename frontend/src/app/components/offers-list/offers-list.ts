import { Component, inject, OnInit, signal } from '@angular/core';
import { OfferService, Offer } from '../../services/offer';

@Component({
  imports: [],
  selector: 'app-offers-list',
  styleUrl: './offers-list.css',
  templateUrl: './offers-list.html',
})

export class OffersList implements OnInit{
  //Pulling offerService
  private offerService = inject(OfferService);

  offers = signal<Offer[]>([]);

  ngOnInit(): void{
    //The following function takes offers made by the admin and are stored in the offers property
    this.offerService.getOffers().subscribe(offers => {
      this.offers.set(offers);
    });
  }
}
