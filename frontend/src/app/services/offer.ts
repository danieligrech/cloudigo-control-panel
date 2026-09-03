import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface OfferLimit{
    limitType?: 'limited' | 'recurring';
    period?: 'daily' | 'weekly' | 'monthly' | 'annually';
    count?: number;
}

export interface Offer{
    _id: string;
    storeName: string;
    discountType: 'percentage' | 'custom';
    discountValue?: number;
    customOffer?: string;
    userTier: ('standard' | 'premium' | 'corporate')[];
    offerLimit?: OfferLimit;
    loyaltyLadder?: number[];
    daysValid: string[];
    redemptionMode: 'in-person' | 'online';
    minimumSpent?: number;
    maxPeople?: number;
    offerExpiry?: string;
    offerStatus: boolean;
    createdAt: string;
    updatedAt: string;
}

@Service()
export class OfferService {
    //Pulling in Angluar's HttpClient to make API calls
    private http = inject(HttpClient);

    //This is the base URL of the API
    private apiURL = "http://localhost:3000/api/offers";

    //Corresponds to the GET /api/offers endpoint
    getOffers(){
        return this.http.get<Offer[]>(this.apiURL);
    }

    //Corresponds to the POST /api/offers endpoint
    createOffer(offerData: Partial<Offer>){
        return this.http.post<Offer>(this.apiURL, offerData);
    }

    //Corresponds to the PATCH /api/offers/:id/status endpoint
    toggleOfferStatus(id: string){
        return this.http.patch<Offer>(`${this.apiURL}/${id}/status`, {});
    }
}
