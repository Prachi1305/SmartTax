import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentYearComponent } from './assessment-year.component';

describe('AssessmentYearComponent', () => {
  let component: AssessmentYearComponent;
  let fixture: ComponentFixture<AssessmentYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
