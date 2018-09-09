import { UserService } from './user.service';
import { TestBed } from '@angular/core/testing';
import { ApiService, JwtService } from '.';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Service: UserService', () => {
  let userSvc: UserService;
  let jwtSvc;
  let apiService: ApiService;

  beforeEach(() => {
    // jwtSvc = jasmine.createSpyObj(['getToken']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [ UserService, ApiService, JwtService ]
    });

    userSvc = TestBed.get(UserService);
    jwtSvc = TestBed.get(JwtService);
    apiService = TestBed.get(ApiService);
  });

  it('should store the user', () => {
     spyOn(jwtSvc, 'getToken').and.returnValue('some token');
    // jwtSvc.getToken.and.returnValue('some token');
    spyOn(apiService, 'get').and.returnValue(of({ user: { id: '123'}}));
    spyOn(userSvc, 'setAuth');

    userSvc.populate();

    expect(userSvc.setAuth).toHaveBeenCalledWith({ id: '123'});
  });
});
