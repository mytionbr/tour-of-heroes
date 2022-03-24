import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroThumbnailsComponent } from './hero-thumbnails.component';

describe('HeroThumbnailsComponent', () => {
  let component: HeroThumbnailsComponent;
  let fixture: ComponentFixture<HeroThumbnailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroThumbnailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
