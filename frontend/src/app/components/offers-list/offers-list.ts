import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { OfferService, Offer } from '../../services/offer';

@Component({
  imports: [CommonModule],
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

  toggleStatus(id: string): void{
    this.offerService.toggleOfferStatus(id).subscribe(updatedOffer => {
      const updatedOffers = this.offers().map(offer =>
        offer._id === id ? updatedOffer : offer
      );

      this.offers.set(updatedOffers);
    });
  }
}
