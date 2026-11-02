import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardPage } from './pokemon-card.page';

describe('PokemonCardPage', () => {
  let component: PokemonCardPage;
  let fixture: ComponentFixture<PokemonCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
