import { ArticlesService } from './articles.service';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

class ApiServiceMock {
  get() {}
}

describe('Service: ArticlesService', () => {
  let apiService;
  let articlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesService, { provide: ApiService, useClass:  ApiServiceMock }]
    });

    apiService = TestBed.get(ApiService);
    articlesService = TestBed.get(ArticlesService);
  });

  it('should query articles', () => {
    spyOn(apiService, 'get');
    articlesService.query({ filters: { limit: 10, offset: 10} });
    // const params =  new HttpParams().set('limit', '10').set('offset', '10');

    expect(apiService.get).toHaveBeenCalledWith('/articles', jasmine.any(Object));
  });
});
