import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import passwordMatchValidator from '../../../core/validators/repeat-password.validator';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnDestroy {
  private registerStream$: Subscription;
  public form: FormGroup;
  public readonly fields;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z.]+)@([a-zA-Z]+)\.([a-z]{2,3})$/)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [ Validators.required ]]
    });

    this.form.setValidators(passwordMatchValidator);
    this.form.updateValueAndValidity();

    this.fields = this.form.controls;
  }

  register() {
    const userData = this.form.value;
    this.registerStream$ = this.userService.register(userData).subscribe((res) => {
      this.form.reset();
      this.router.navigate(['/user/login']);
    });
  }

  ngOnDestroy() {
    if (this.registerStream$) {
      this.registerStream$.unsubscribe();
    }
  }
}
