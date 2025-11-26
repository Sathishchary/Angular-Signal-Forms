import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { email, Field, form, pattern, required } from '@angular/forms/signals';
import { UserForm } from './userForm';

export function onlyNumbers(value: string): ValidationErrors | null {
  const regex = /^[0-9]*$/;
  return regex.test(value) ? null : { onlyNumbers: 'Only digits are allowed' };
}

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
    pattern(schemaPath.mobileNumber, /^\d{10}$/, {
      message: 'Mobile number must be 10 digits'
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
    //access individual field values
    console.log("User Name", this.userFormModel().userName);
    console.log("Form Data", formData);
    this.submittedData.set(formData);
    console.log(formData)

  }

  loadBasicData() {
    const userInfor = {
      "userName": "SathishKotha",
      "firstName": "Sathish",
      "lastName": "Kotha",
      "email": "sathishcharykotha@gmail.com",
      "mobileNumber": "8888888888",
      "address": {
        "street": "wetwet",
        "mandal": "wetet",
        "state": "wet",
        "country": "wtt"
      }
    }
    this.userFormModel.set(userInfor);
  }

  updateEmail() {
    // this.userFormModel.email.update('newemail@example.com', { emitEvent: true });
  }

  resetForm() {

    // this.userForm.reset();
    this.submittedData.set(null);
  }
}
