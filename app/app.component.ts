import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppService } from './app.service';
import { OrganisationUnit } from './organisationUnit';

import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
           <div class="app" id="mainContainer">
                <button class="btn" onclick="toggleDivMain('people')">
                    People
                </button>
                <button class="btn" onclick="toggleDivMain('group')">
                    Group
                </button>
                
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