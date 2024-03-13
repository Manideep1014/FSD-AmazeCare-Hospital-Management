import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { AuthenticatedResponse } from '../interfaces/authenticated-response.model';
import { User } from '../interfaces/user.model';
import { GlobalServiceService } from '../../global-service.service';


@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  
  invalidLogin: boolean;
  credentials: User = {UserName:'', Password:'',SelectedRole:''};

  constructor(private router: Router, private http: HttpClient,public glbsrv:GlobalServiceService) {}

  ngOnInit(): void {}

  login=(form: NgForm) => {
    if (form.valid) 
    {



      //redirect to Patient Page
      if(this.credentials.SelectedRole==='Patient')
      {

          this.http.post<AuthenticatedResponse>("http://localhost:5012/api/Auth", this.credentials, {headers: new HttpHeaders({"Content-Type": "application/json"})}).subscribe(
            {
              next: (response: AuthenticatedResponse) => 
              {
                const token = response.token;
                localStorage.setItem("jwt", token);
                this.glbsrv.pId=response.id;
                this.invalidLogin = false;
                this.router.navigate(['patient']);
              },
          error: (err: HttpErrorResponse) => 
          {
            console.error(err);
            this.invalidLogin = true;
          }
        });

      }








      //redirect to Doctor Page
      if(this.credentials.SelectedRole==='Doctor')
      {
        
          this.http.post<AuthenticatedResponse>("http://localhost:5012/api/Auth", this.credentials, {
            headers: new HttpHeaders({ "Content-Type": "application/json"})
          })
          .subscribe({
            next: (response: AuthenticatedResponse) => {
              const token = response.token;
              this.glbsrv.pId=response.id;
      
              localStorage.setItem("jwt", token); 
              this.invalidLogin = false; 
              this.router.navigate(["doctor"]);
            },
            error: (err: HttpErrorResponse) => this.invalidLogin = true
          })
        

      }



      //redirect to Admin Page
      if(this.credentials.SelectedRole==='Admin')
      {
        this.http.post<AuthenticatedResponse>("http://localhost:5012/api/Auth", this.credentials, 
          {
            headers: new HttpHeaders({"Content-Type": "application/json"})
          })
          .subscribe(
            {
              next: (response: AuthenticatedResponse) => 
              {
                const token = response.token;
                localStorage.setItem("jwt", token);
                this.glbsrv.pId=response.id;
                this.invalidLogin = false;
                this.router.navigate(["RedirectToAdminNav"]);//give the path to admin dashboard
              },
          error: (err: HttpErrorResponse) => 
          {
            console.error(err);
            this.invalidLogin = true;
          }
        });
        
      }
      
    }
  }
  
}

// if(this.selectedRole==='patient'){
//   if ((this.username === 'sam123' && this.password === 'sam@123')&&(this.selectedRole==='patient'))
//   {
//     this.hidenavbar.login();
    
//   } 
//   else 
//   {
//   alert('Invalid username or password');
//   }
// }
// else if(this.selectedRole==='doctor'){
//   if ((this.username === 'sam123' && this.password === 'sam@123')&&(this.selectedRole==='doctor'))
//   {
    
//   } 
//   else 
//   {
//   alert('Invalid username or password');
//   }
// }
// else if(this.selectedRole==='admin'){
//   if ((this.username === 'sam123' && this.password === 'sam@123')&&(this.selectedRole==='admin'))
//   {
//     this.hidenavbar.login();
    
//   } 
//   else 
//   {
//   alert('Invalid username or password');
//   }
// }
// else{
//   alert("Invalid input parameters.check whether all parameters are filled")
// }






































// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { PatientserviceService } from '../patientservice.service';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../user.model';
// import { NgForm } from '@angular/forms';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { AuthenticatedResponse } from '../interfaces/authenticated-service.model';

// @Component({
//   selector: 'app-patientlogin',
//   templateUrl: './patientlogin.component.html',
//   styleUrl: './patientlogin.component.css'
// })
// export class PatientloginComponent implements OnInit {
  
//   invalidLogin: boolean;
//   credentials: User = {UserName:'', Password:''};
//   constructor(private router: Router,public usrlgn:PatientserviceService,private hidenavbar:AuthService,private http:HttpClient) {}
//   ngOnInit(): void {
//     // throw new Error('Method not implemented.');
//   }
//   username: string='';
//   password: string='';
//   selectedRole: string='';


// /*
// Here we are writing jwt code
//  */
// login=(form:NgForm)=>{
//   if(form.valid){
//     this.http.post<AuthenticatedResponse>("http://localhost:5012/api/Auth",this.credentials,{
//       headers:new HttpHeaders({"Content-Type": "application/json"})
//   }).subscribe({
//     next:(response:AuthenticatedResponse)=>{
//       const token=response.token;
//       localStorage.setItem("jwt",token);
//       this.invalidLogin=false;
//       this.router.navigate(["patient"]);

//     },
//     error:(err:HttpErrorResponse)=>this.invalidLogin=true
//   })
  
//     }
//   }
// }








































  // onSubmit() {
  //   this.usrlgn.authentication(this.username, this.password).subscribe(
  //     (response: any) => {
  //       const token = response;
  //       localStorage.setItem('token', token);
  //       this.router.navigate(['/patient']);
  //     },
  //     error => {
  //       // Handle authentication error
  //       console.error('Authentication failed:', error);
  //       alert('Authentication failed. Please check your username and password.');
  //     }
  //   );
  // }










































// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private router: Router) {}

//   onSubmit() {
//     // Make HTTP POST request to your backend API for authentication
//     this.http.post<any>('http://your-backend-api-url/login', { username: this.username, password: this.password })
//       .subscribe(response => {
//         // Assuming your backend API returns a token on successful authentication
//         const token = response.token;

//         // Save token to local storage or session storage
//         localStorage.setItem('token', token);

//         // Redirect user to the dashboard
//         this.router.navigate(['/dashboard']);
//       }, error => {
//         // Handle authentication error
//         console.error('Authentication failed:', error);
//         alert('Authentication failed. Please check your username and password.');
//       });
//   }
// }