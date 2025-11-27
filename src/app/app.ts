import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, Field, form, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { UserForm } from './userForm';


@Component({
  selector: 'app-root',
  imports: [CommonModule, Field],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SignalForms');
  // Signal to store submitted data
  submittedData = signal<any>(null);

  // Create the form with typed controls
  userFormModel = signal<UserForm>({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: {
      street: '',
      mandal: '',
      state: '',
      country: ''
    }
  })

  userSignalForm = form(this.userFormModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.mobileNumber, {
      message: 'mobile number should be entered after email',
      when: ({ valueOf }) => !valueOf(schemaPath.email)
    })

    minLength(schemaPath.mobileNumber, 10, {
      message: 'Mobile number must be 10 digits'
    });

    maxLength(schemaPath.mobileNumber, 10, {
      message: 'Mobile number must be 10 digits'
    });

    pattern(schemaPath.mobileNumber, /^\d+$/, {
      message: 'Mobile number must contain digits only'
    });
    required(schemaPath.userName, { message: 'Username is required' });
    required(schemaPath.firstName, { message: 'First name is required' });
    required(schemaPath.address.street, { message: 'Street is required' });
    required(schemaPath.address.mandal, { message: 'Mandal is required' });
    required(schemaPath.address.state, { message: 'State is required' });
    required(schemaPath.address.country, { message: 'Country is required' });
  });



  onSubmit() {
    const formData = this.userSignalForm();
    console.log("User Name", this.userFormModel().userName);
    console.log("Form Data", formData);
    this.submittedData.set(formData);
    console.log(formData);

  }

  setBasicUserData() {
    const userInfo = {
      "userName": "johnDoe123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "mobileNumber": "9995551234",
      "address": {
        "street": "101 Sunset Boulevard",
        "mandal": "Los Angeles County",
        "state": "California",
        "country": "United States"
      }
    }
 
    this.userFormModel.set(userInfo);
  }

  updateEmail() {
    this.userFormModel.update(current => ({
      ...current,
      email: 'sathishkotha@gmail.com'
    }));
  }

  resetForm() {

    // this.userForm.reset();
    this.submittedData.set(null);
  }
}
