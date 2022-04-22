import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.scss']
})
export class CompanydetailsComponent implements OnInit {

  companyForm: FormGroup;
 
  typesubmit: boolean;


  constructor(private route : ActivatedRoute, private companyService:CompanyService,private modalService: NgbModal,private formBuilder: FormBuilder) { }
  breadCrumbItems: Array<{}>;

   companydetails ={
    id:"",
    code:"",
    name:"",
    image:"",
    manager:"",
    address:"",
    language:"",
    country:"",
    currency:"",
  }
   code;
   name;
   manager;
   address;
   country;
   companyImage;
  
  url;

  company;
  ngOnInit(): void {

    



    this.route.paramMap.subscribe(params => {
      console.log("params",params.get('id'))
      this.company= params.get('id')
      this.breadCrumbItems = [{ label: 'Company "'+this.company+'" details' }];

     
   
      

      this.companyService.getOneCompany(params.get('id')).subscribe(
        data=> {
          this.companydetails=data;
          console.log("4data",data)
          this.code=data["id"]
          this.name=data["name"]
          this.manager=data["manager"]["username"]
          this.address=data["address"]
          this.country=data["country"]
          console.log("6666666666666666666",this.code)


          
    this.companyForm = this.formBuilder.group({
      name: [this.name, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      manager: [this.manager, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      address: [this.address],
      country: [this.country],
      
    });
    this.typesubmit = false;


          
        }
      )


     
      

  })

 
  

}
 /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }


  updateCompany() {
    if (this.companyForm.valid) {

      const manager = this.companyForm.get('manager').value;
      const name = this.companyForm.get('name').value;
      const address = this.companyForm.get('address').value;
      const country = this.companyForm.get('country').value;


      let companydata = {
       
         name: name,
         address: address,
         country:country
        
    
    }

    this.companyService.updateCompany(this.code,companydata).subscribe(
      data=> {console.log(data,"data updated, company updated")
      this.modalService.dismissAll()
      window.location.reload();
    },
      err=> {console.log(err,"err data not updated company not updated")}

    )

    }
    else{
      console.log("company form not valid",this.companyForm.valid)
    }

  }

  typeSubmit() {
    this.typesubmit = true;
  }

  get type() {
    return this.companyForm.controls;
  }



  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); // read file as data url
  
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      
      this.companyService.updateCompanyLogo(this.code,event.target.files[0]).subscribe(data=> {
      },err => console.log("ERRRRRr",err))
  
    }
  }



}
