import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../patientusecase/interfaces/user.model'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  confirmPassword: string = '';
  credentials: User = { UserName:'', Password:'', SelectedRole:'' };
   resetPasswordUrl = 'http://localhost:5012/api/Auth/reset-password';

  constructor(private http: HttpClient, private router: Router) {}

  submitForgotPassword() {
    // Make sure to validate passwords match before sending the request
    if (this.confirmPassword !== this.credentials.Password) {
        alert('Passwords do not match');
        return;
    } else {
        // Send the reset password request to the backend API
        this.http.post<any>(this.resetPasswordUrl, this.credentials)
            .subscribe({
                next: (response) => {
                    console.log('Password Updated Successfully:', response);
                    // Optionally, you can redirect the user or show a success message
                    // this.router.navigate(['/login']); // Redirect to login page after password reset
                    alert('Password reset successfully!');
                },
                error: (error) => {
                    console.error('Error updating Password:', error);
                    // Handle error - Show error message to the user or retry
                    alert('Failed to reset password. Error: ' + error.message); // Display the error message returned by the server
                }
            });
    }
}


}