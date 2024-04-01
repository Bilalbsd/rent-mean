import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienListeComponent } from './bien-liste.component';

describe('BienListeComponent', () => {
  let component: BienListeComponent;
  let fixture: ComponentFixture<BienListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BienListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
