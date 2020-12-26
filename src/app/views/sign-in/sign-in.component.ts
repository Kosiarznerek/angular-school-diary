import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from '../../services/sign-in/sign-in.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ISignInCredentials} from '../../services/sign-in/sign-in.service.models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public readonly signInForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signInService: SignInService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router,
  ) {

    const signInForm: Record<keyof ISignInCredentials, any> = {
      login: [null, Validators.required],
      password: [null, Validators.required],
      type: [null, Validators.required],
    };
    this.signInForm = this.formBuilder.group(signInForm);

  }

  ngOnInit(): void {
    this.signInService.singOut();
  }

  public async onSignInClickHandler(): Promise<void> {
    this.signInForm.disable();

    const model: ISignInCredentials = this.signInForm.getRawValue();
    const isSuccess = await this.signInService.signIn(model).toPromise();

    this.signInForm.enable();

    if (isSuccess) {
      await this.router.navigate([model.type]);
    } else {
      this.matSnackBar.open('Błąd podczas logowania.');
    }
  }

}
