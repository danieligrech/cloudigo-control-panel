import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOfferForm } from './add-offer-form';

describe('AddOfferForm', () => {
  let component: AddOfferForm;
  let fixture: ComponentFixture<AddOfferForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfferForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOfferForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
