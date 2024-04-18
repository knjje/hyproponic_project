import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.email, this.password);
  }

  GoRegister() {
    window.location.href = 'register';
  }

  switch(): void {
    const switchers = Array.from(document.querySelectorAll('.switcher'));

    switchers.forEach((item) => {
      item.addEventListener('click', function (this: HTMLElement) {
        switchers.forEach((item) =>
          item.parentElement?.classList.remove('is-active')
        );
        this.parentElement?.classList.add('is-active');
      });
    });
  }
}
