import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppService } from './app.service';
import { OrganisationUnit } from './organisationUnit';

import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
           <div class="app">
            <div class="list">
                <ul>
                    <li *ngFor="let unit of organisationUnit;" [attr.data-id]="unit.id" (click)="deleteUnit($event)">{{unit.displayName}}</li>
                </ul>
            </div>
            <div class="form">
                <form *ngIf="true" #unitForm="ngForm">
                    <div>
                        <label>
                            <span>Name</span>
                            <input type="text" class="form-control" id="name"
                                required
                                [(ngModel)]="model.name" name="name"
                                #name="ngModel" >
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Short name</span>
                            <input type="text" class="form-control" id="shortName"
                                required
                                [(ngModel)]="model.shortName" name="shortName"
                                #shortName="ngModel" >
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Opening date</span>
                            <input type="date" class="form-control" id="date"
                                required
                                [(ngModel)]="model.openingDate" name="openingDate"
                                #openingDate="ngModel" >
                        </label>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-default" [disabled]="!unitForm.form.valid" (click)="newUnit()">Submit</button>
                    </div>
                </form>
            </div>
        </div>
`
})
export class AppComponent {
    public organisationUnit = [];
    private organisationUnits;

    model = new OrganisationUnit('', '', '');


    constructor(
        private appService: AppService,
    ) { this.loadList() }

    loadList(): void {
        this.appService.loadOrganisationUnits()
            .subscribe( res => this.updateList(res.organisationUnits) );
    }

    updateList( organisationUnits ): void {
        this.organisationUnit = [];
        for(let i = 0; i < organisationUnits.length; i++){
            this.organisationUnit.push(organisationUnits[i]);
        }
    }

    newUnit(): void {
        this.appService.saveOrganisationUnit(this.model)
            .subscribe(this.loadList())
    }

    deleteUnit(event): void {
        this.appService.deleteOrganisationUnit(event.target.dataset.id)
            .subscribe((data) => {
                this.loadList()
            })
    }

}