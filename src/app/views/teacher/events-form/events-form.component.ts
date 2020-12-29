import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../../services/evets/events.service';
import {IEventForm} from './events-form.resolver';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IClass} from '../../../services/lessons/lessons.service.models';
import {AuthenticationGuard} from '../../../authentication/authentication.guard';
import {IEvent} from '../../../services/evets/events.service.models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {

  public eventForm: FormGroup;
  public classes: IClass[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventsService: EventsService,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly authenticationGuard: AuthenticationGuard,
  ) {

    this.classes = this.activatedRouteData.classes;

    this.eventForm = this.formBuilder.group({
      id: [null],
      teacherId: [this.authenticationGuard.credentials.detailsId, Validators.required],
      classId: [null, Validators.required],
      date: [null, Validators.required],
      description: [null, Validators.required],
      type: [null, Validators.required],
      priority: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.eventForm.patchValue(this.activatedRouteData.event);
    }
  }

  public get isEditMode(): boolean {
    return this.activatedRouteData.event instanceof Object;
  }

  public get activatedRouteData(): IEventForm {
    return this.activatedRoute.snapshot.data.data;
  }

  public async onSaveButtonClick(): Promise<void> {
    const formValue: IEvent = this.eventForm.getRawValue();
    const isSuccess = this.isEditMode
      ? await this.eventsService.update(formValue).toPromise()
      : await this.eventsService.insert(formValue).toPromise();

    if (isSuccess) {
      this.matSnackBar.open('Akcja przebiegła pomyślnie');
      await this.router.navigate([
        this.isEditMode ? '../../view' : '../view'
      ], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.matSnackBar.open('Coś poszło nie tak');
    }
  }

}
