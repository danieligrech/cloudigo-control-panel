import { Component, inject, signal } from '@angular/core';
import { OfferService, Offer } from '../../services/offer';

@Component({
  imports: [],
  selector: 'app-add-offer-form',
  styleUrl: './add-offer-form.css',
  templateUrl: './add-offer-form.html',
})

export class AddOfferForm {
  private offerService = inject(OfferService);

  //One signal per form field
  storeName = signal('');
  discountType = signal<'percentage' | 'custom'>('percentage');
  discountValue = signal<number | null>(null);
  redemptionMode = signal<'in-person' | 'online'>('in-person');
  userTier = signal<string[]>([]);
  daysValid = signal<string[]>([]);
  customOffer = signal('');
  limitType = signal<'limited' | 'recurring' | ''>('');
  period = signal<'daily' | 'weekly' | 'monthly' | 'annually' | ''>('');
  count = signal<number | null>(null);
  minimumSpent = signal<number | null>(null);
  maxPeople = signal<number | null>(null);
  loyaltyLadderInput = signal('');
  offerExpiry = signal('');

  toggleTier(tier: string): void{
    const current = this.userTier();
    if(current.includes(tier)){
      this.userTier.set(current.filter(t => t !== tier));
    }
    else{
      this.userTier.set([...current, tier]);
    }
  }

  toggleDay(day: string): void{
    const current = this.daysValid();
    if(current.includes(day)){
      this.daysValid.set(current.filter(d => d !== day));
    }
    else{
      this.daysValid.set([...current, day]);
    }
  }

  //Called when the form is submitted
  onSubmit():void{
    //Setting up a plain object from our signals current values
    const newOffer: Partial<Offer> = {
      storeName: this.storeName(),
      discountType: this.discountType(),
      redemptionMode: this.redemptionMode(),
      userTier: this.userTier() as ('standard' | 'premium' | 'corporate')[],
      daysValid: this.daysValid(),
    };

    if(this.discountType() === "percentage" && this.discountValue() !== null){
      newOffer.discountValue = this.discountValue()!;
    }

    if(this.discountType() === "custom" && this.customOffer().trim() !== ''){
      newOffer.customOffer = this.customOffer();
    }

    if (this.limitType() !== '') {
      newOffer.offerLimit = {
        limitType: this.limitType() as 'limited' | 'recurring',
      };
      if (this.count() !== null) {
        newOffer.offerLimit.count = this.count()!;
      }
      if (this.period() !== '') {
        newOffer.offerLimit.period = this.period() as 'daily' | 'weekly' | 'monthly' | 'annually';
      }
    }

    if(this.minimumSpent() !== null){
      newOffer.minimumSpent = this.minimumSpent()!;
    }

    if (this.maxPeople() !== null) {
      newOffer.maxPeople = this.maxPeople()!;
    }

    if (this.userTier().includes('premium') && this.loyaltyLadderInput().trim() !== '') {
      newOffer.loyaltyLadder = this.loyaltyLadderInput()
        .split(',')
        .map(n => Number(n.trim()))
        .filter(n => !isNaN(n));
    }

    if (this.offerExpiry() !== '') {
      newOffer.offerExpiry = this.offerExpiry();
    }

    this.offerService.createOffer(newOffer).subscribe({
      next: (createdOffer) => {
        console.log("Offer Created!: ", createdOffer);
      },
      error: (err) => {
        console.error("Failed to create an offer...: ", err);
      }
    });
  }
}