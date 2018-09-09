import { AuthComponent } from './auth.component';

import { TestBed, ComponentFixture, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListErrorsComponent } from '../shared';
import { UserService } from '../core';


xdescribe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockActivatedRoute;
  let userSvc;
  let router: Router;

  beforeEach(() => {
    mockActivatedRoute = { url: of([ { path: 'login' }]) };
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
      mockActivatedRoute = TestBed.get(ActivatedRoute);

      mockActivatedRoute.url = of([ { path: 'register' }]);

      fixture.detectChanges();
    });

    it('should add a name field for registration', () => {
      expect(component.authType).toEqual('register');
    });
  });

  describe('submitForm()', () => {
    let email;
    let password;

    beforeEach(() => {
      email = component.authForm.controls['email'];
      password = component.authForm.controls['password'];

      email.setValue('test@gmail.com');
      password.setValue('123456');

      userSvc = TestBed.get(UserService);

      fixture.detectChanges();
    });

    // console.log('auth form', component.authForm);
    // console.log(component.authForm.value);

    it('should able user to login', () => {
      spyOn(userSvc, 'attemptAuth').and.returnValue(of([]));
      component.submitForm();

      expect(userSvc.attemptAuth).toHaveBeenCalledWith('login', component.authForm.value);
    });

    it('should navigate to root', () => {
      router  = TestBed.get(Router);
      spyOn(router, 'navigateByUrl');

      component.submitForm();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should handle error', () => {
      spyOn(userSvc, 'attemptAuth').and.returnValue(throwError( { errors: {message: 'Invalid Credentials'} }));
      component.submitForm();

      expect(component.errors).toEqual({ errors: {message: 'Invalid Credentials'} });
      expect(component.isSubmitting).toEqual(false);
    });

    it('should submit form when submit button is clicked', () => {
      spyOn(component, 'submitForm');
      const submitBtn = fixture.debugElement.query(By.css('button[type=\'submit\']'));
      submitBtn.nativeElement.click();

      expect(component.submitForm).toHaveBeenCalled();
    });
  });
});
