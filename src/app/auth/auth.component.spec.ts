import { AuthComponent } from './auth.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListErrorsComponent } from '../shared';
import { UserService } from '../core';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockActivatedRoute;
  let userSvc;

  beforeEach(() => {
    mockActivatedRoute = new ActivatedRoute();
    userSvc = { attemptAuth: () => of({id: '1234'}) };

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ AuthComponent, ListErrorsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: userSvc },
      ],
    }).overrideComponent(ListErrorsComponent, {
      set: {
        selector: 'app-list-errors',
        template: '<div></div>'
      }
    });

    fixture = TestBed.createComponent(AuthComponent);

    component = fixture.componentInstance;
  });

  it('should load the component', () => {
    expect(component).toBeDefined();
  });

  describe('should set the component states for login page', () => {
    beforeEach(() => {
      mockActivatedRoute.url = of([ { path: 'login' }]);

      fixture.detectChanges();
    });

    it('should be invalid form when empty', () => {
      expect(component.authForm.valid).toBeFalsy();
    });

    it('should set the auth type', () => {
      expect(component.authType).toEqual('login');
    });

    it('should set the title', () => {
      expect(component.title).toEqual('Sign in');
    });
  });

  describe('should set the component states for registration page', () => {
    beforeEach(() => {
      mockActivatedRoute.url = of([ { path: 'register' }]);

      fixture.detectChanges();
    });

    it('should add a name field for registration', () => {
      expect(component.authType).toEqual('register');
    });
  });
});
