import { Injectable } from '@angular/core';
import { Doctors } from './modelclass.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  readonly url="http://localhost:5012/api/doctors";
  getDocById:Doctors;
  docList:Doctors[];//creating a new list that stores list of Doctors objects i.e for get method we use 
  doctors:Doctors=new Doctors();//Creating an instance of Doctor
  apps:Appointment[];
  appointment: Appointment=new Appointment();

  constructor(private objHttp:HttpClient) { }//after calling the constructor it automatically injects Httpclient to objHttp

  public getDoctorById(id: number): Observable<Doctors> {
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
    const apiUrl = `${this.url}/${id}`;
    return this.objHttp.get<Doctors>(apiUrl,httpOptions);
  }
  

  public getAllDoctors(): Promise<Doctors[]> {
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
    return this.objHttp.get(this.url,httpOptions).toPromise().then(
       (res: any) => {
          return res as Doctors[];
       }
    ).catch(
       error => {
          throw error; // Re-throwing the error to be caught by the caller
       }
    );
 }
 
 


  public registerDoctor(){
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
    return this.objHttp.post(this.url,this.doctors,httpOptions);//Here we need to pass the url and the id
  }
  public updateDoctor(){//pass url+'/'+id and doctor object
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
    return this.objHttp.put(this.url+"/"+this.doctors.DoctorId,this.doctors,httpOptions);//To update the doctor we need to pass the url(adding the id at the end) and the doctor id
  }


  //In below we are passing the id to delete doctor record.(Note: if the record is not present then
  // we will get an exception we need to show that exception so we need to create user defined excpetions in backend)
  public deleteDoctor(id){
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
    return this.objHttp.delete(this.url+'/'+id,httpOptions);//return the status of delete operation we'll get an msg from backend check the code once
  }

  
  public viewAppointments(id:number)
  {
    //http://localhost:5012/api/Doctors/View Appointments?id
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
     this.objHttp.get(this.url+'/View Appointments?id='+id,httpOptions).toPromise().then(res=>this.apps=res as Appointment[])
  }


  readonly AppUrl:'http://localhost:5012/api/Appointments/'

  public deleteAppointment(appointmentId:number)
  {
    const token=localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
    const s = `${this.AppUrl}${appointmentId}`;
    return this.objHttp.delete(s,httpOptions);
  }

}
