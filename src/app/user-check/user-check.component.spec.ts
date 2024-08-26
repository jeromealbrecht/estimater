import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckComponent } from './user-check.component';

describe('UserCheckComponent', () => {
  let component: UserCheckComponent;
  let fixture: ComponentFixture<UserCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
