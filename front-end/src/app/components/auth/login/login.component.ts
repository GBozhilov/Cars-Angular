import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {AuthService} from '../../../core/services/authentication/auth.service';
import {LoginModel} from '../../../core/models/input-models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.css'],
})
export class LoginComponent implements OnInit {
  private user: LoginModel;
  public model: FormGroup;
  public loginFail: boolean;
  public username: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.username = '';
  }

  ngOnInit() {
    this.model = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.onChanges()
  }

  onChanges() {
    this.model.statusChanges.subscribe(value => {
      this.loginFail = value === 'VALID';
    })
  }

  login() {
    this.user = new LoginModel(this.model.value.email, this.model.value.password);
    this.authService.login(this.user).subscribe(res => {
      if (res['success']) {
        sessionStorage.setItem('authtoken', res['token']);
        sessionStorage.setItem('username', res['user']['name']);
        sessionStorage.setItem('role', res['user']['roles']);
        sessionStorage.setItem('id', res['user']['id']);
        this.authService.username = res['user']['name'];
        this.toastr.success(res['message'], 'Success!');
        this.model.reset();
        this.authService.tryNavigate();
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }
}
