import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  public currName : string
  public currId: string
  constructor(
    private router : Router,
    private server : AuthService
  ) { 
    this.currName = sessionStorage.getItem('username')
    this.currId = sessionStorage.getItem('id')
  }

  ngOnInit() { 

  }
}