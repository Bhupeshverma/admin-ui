import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataTableComponent } from './data-table.component';
import { MatTableModule } from '@angular/material/table';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule], 
      declarations: [ DataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const userData = [
    {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member"
    },
    {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member"
    },
    {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin"
    }
  ]

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show our users data', () => {
    const ourDomTableUnderTest: any = document.querySelector('table#userTable');
    const usersInTable: any = Array.from(ourDomTableUnderTest.getElementsByClassName('mat-row'));
    usersInTable.forEach((user: { getElementsByClassName: (arg0: string) => { (): any; new(): any; item: { (arg0: number): { (): any; new(): any; textContent: any; }; new(): any; }; }; }) => {
      const userName = user
        .getElementsByClassName('mat-column-name')
        .item(0).textContent;
      const userEmail = user
        .getElementsByClassName('mat-column-email')
        .item(0).textContent;
      const userRole = user
        .getElementsByClassName('mat-column-role')
        .item(0).textContent;
 
      expect(userData).toContain(
        jasmine.objectContaining({
          name: userName,
          email: userEmail,
          role: userRole
        })
      );
    })
  })
  it('should show the columns we expect', () => {
    const ourDomTableUnderTest: any = document.querySelector('table#userTable');
 
    const tableHeaders = Array.from(
      ourDomTableUnderTest.getElementsByClassName('mat-header-cell')
    );
    const headerClasses = [
      'mat-column-select',
      'mat-column-name',
      'mat-column-email',
      'mat-column-role',
      'mat-column-actions'
    ];
 
    tableHeaders.forEach((header: any) => {
      expect(
        headerClasses.some(item => header.classList.contains(item))
      ).toBeTruthy();
    });
  });
});
