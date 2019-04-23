import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnDestroy {
  private loginStream$: Subscription;
  public form: FormGroup;
  public readonly fields;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z.]+)@([a-zA-Z]+)\.([a-z]{2,3})$/) ]],
      password: ['', [Validators.required ]]
    });

    this.fields = this.form.controls;
  }

  login() {
    const userData = this.form.value;
    this.loginStream$ = this.userService.login(userData).subscribe((responce) => {
      const token = responce['token'];
      const isAdmin = responce['user']['roles'].includes('Admin');
      const userEmail = responce['user']['email'];
      this.userService.saveUserData(token, isAdmin, userEmail);
      this.form.reset();
      this.router.navigate(['/car/all']);
    });
  }

  ngOnDestroy() {
    if (this.loginStream$) {
      this.loginStream$.unsubscribe();
    }
  }
}
