import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  user: IUser;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  hayUsuario(): boolean {
    return this.user != null && this.user != undefined;
  }

}
