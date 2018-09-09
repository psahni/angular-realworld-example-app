import { ApiService } from './api.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtService } from './jwt.service';

describe('Service: ApiService', () => {
  let apiService;
  let jwtService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [  HttpClientModule, HttpClientTestingModule ],
      providers: [ApiService, JwtService]
    });

    apiService = TestBed.get(ApiService);
    jwtService = TestBed.get(JwtService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('http: ', () => {
    it('get()', () => {
      const users = [
        { id: 1, name: 'alex' },
        { id: 1, name: 'wael' }
      ];

      apiService.get('/users').subscribe((data) => {
        expect(data).toEqual(users);
      });

      const requester = httpMock.expectOne('https://conduit.productionready.io/api/users');

      expect(requester.request.url).toBe('https://conduit.productionready.io/api/users');
      requester.flush(users);
    });
  });
});
