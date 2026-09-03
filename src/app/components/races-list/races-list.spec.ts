import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesListComponent } from './races-list';

describe('RacesList', () => {
  let component: RacesListComponent;
  let fixture: ComponentFixture<RacesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RacesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
