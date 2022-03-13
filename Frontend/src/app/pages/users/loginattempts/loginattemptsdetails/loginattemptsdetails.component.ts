import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginattemptsService } from 'src/app/core/services/loginattempts.service';

@Component({
  selector: 'app-loginattemptsdetails',
  templateUrl: './loginattemptsdetails.component.html',
  styleUrls: ['./loginattemptsdetails.component.scss']
})
export class LoginattemptsdetailsComponent implements OnInit {

  constructor(private route : ActivatedRoute, private loginattemptsService: LoginattemptsService) { }

  breadCrumbItems: Array<{}>;
  loginattemptdetails ={
    username:"",
    date:"",
    ipaddress:"",
    browsername:"",
    browserversion:"",
    countryname:"",
    capital:"",
    countryflag:"",
    countrytld:"",
    organisation:"",
    isp:"",
    currencycode:"",
    currencyname:"",
    currencysymbol:"",
    lat:"",
    lng:""

  }
  lat=6;
  lng=4;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Login attempts', active: true }];

    this.route.paramMap.subscribe(param => {
      this.loginattemptsService.getOneAttempt(param.get('id')).subscribe(
        data => {
          this.loginattemptdetails=data;
          this.lat=Number(data.lat)
          this.lng=Number(data.lng)
          console.log("this.lat ",this.lat," this.lng ",this.lng)

        }
      )
      console.log("param",param)
    })



  }

}
