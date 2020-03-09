import { Component, OnInit, HostListener, Host, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

@Component({
 selector: 'ng-jk-checkboxes',
 template: `
  <!-- add class form-check-inline for inline-->
  <label *ngIf="to.label" [ngClass]="{'required': to.required}">{{to.label}}</label>
  <div class="form-check" *ngFor="let f of field.fieldGroup">
    <input [id]="f.id" class="form-check-input" type="checkbox" [formControl]="f.formControl">
    <label [for]="f.id" class="form-check-label">
      {{f.templateOptions.label}}
    </label>
  </div>

  <div class="invalid-feedback" *ngIf="isInvalid">Al least one checkbox must be selected.</div>

  <ng-jk-edit-input-button
    [field]="field" [template]="to"
  ></ng-jk-edit-input-button>
 `,
 styles: [
   `
    :host{
      position:relative;
      display: block;
    }

    :host:hover{
      box-shadow: 0 0 0px 3px rgba(99, 255, 60, 0.4);
      background: rgba(99, 255, 60, 0.4);
    }

    :host > label{
      display:block;
    }

    :host:hover jk-edit-input-button{
      display:block;
    }

    jk-edit-input-button{
      display:none;
    }

    .invalid-feedback{
      display:block;
    }
   `
 ]
})
export class CheckboxesComponent extends FieldType implements OnInit, OnDestroy {

  isInvalid = true;
  sub: Subscription;

  ngOnInit() {
    this.sub = this.formControl.valueChanges.subscribe( x => {
      this.checkIfValid();
    });
    this.checkIfValid();
  }

  private checkIfValid() {
    this.isInvalid = Object.keys(this.formControl.value).filter( xx => {
      return this.formControl.value[xx];
    }).length === 0 && this.to.required && this.formControl.touched;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
