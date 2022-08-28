import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify()
  })
  const dummyData = [
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getUsers function', () => {
    expect(service.getUsers).toBeTruthy();
   });
  
  it('getUsers() should return data', () => {
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(dummyData)
    })
    const req = httpMock.expectOne('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  })
});
