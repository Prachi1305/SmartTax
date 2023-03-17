import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAuditIssueComponent } from './account-audit-issue.component';

describe('AccountAuditIssueComponent', () => {
  let component: AccountAuditIssueComponent;
  let fixture: ComponentFixture<AccountAuditIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAuditIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAuditIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
