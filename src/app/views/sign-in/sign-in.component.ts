import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISignInDto, SignInService} from '../../services/sign-in/sign-in.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  ) {

    const signInForm: Record<keyof ISignInDto, any> = {
      login: [null, Validators.required],
      password: [null, Validators.required],
      type: [null, Validators.required],
    };
    this.signInForm = this.formBuilder.group(signInForm);

  }

  ngOnInit(): void {
  }

  public async onSignInButtonClickHandler(): Promise<void> {
    this.signInForm.disable();

    const model: ISignInDto = this.signInForm.getRawValue();
    const isSuccess = await this.signInService.signIn(model).toPromise();

    this.signInForm.enable();

    if (isSuccess) {
      // TODO
    } else {
      this.matSnackBar.open('Błąd podczas logowania.');
    }
  }

}
