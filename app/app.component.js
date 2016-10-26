"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_service_1 = require('./app.service');
var organisationUnit_1 = require('./organisationUnit');
require('rxjs/Rx');
var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
        this.organisationUnit = [];
        this.model = new organisationUnit_1.OrganisationUnit('', '', '');
        this.loadList();
    }
    AppComponent.prototype.loadList = function () {
        var _this = this;
        this.appService.loadOrganisationUnits()
            .subscribe(function (res) { return _this.updateList(res.organisationUnits); });
    };
    AppComponent.prototype.updateList = function (organisationUnits) {
        this.organisationUnit = [];
        for (var i = 0; i < organisationUnits.length; i++) {
            this.organisationUnit.push(organisationUnits[i]);
        }
    };
    AppComponent.prototype.newUnit = function () {
        this.appService.saveOrganisationUnit(this.model)
            .subscribe(this.loadList());
    };
    AppComponent.prototype.deleteUnit = function (event) {
        var _this = this;
        this.appService.deleteOrganisationUnit(event.target.dataset.id)
            .subscribe(function (data) {
            _this.loadList();
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n           <div class=\"app\">\n            <div class=\"list\">\n                <ul>\n                    <li *ngFor=\"let unit of organisationUnit;\" [attr.data-id]=\"unit.id\" (click)=\"deleteUnit($event)\">{{unit.displayName}}</li>\n                </ul>\n            </div>\n            <div class=\"form\">\n                <form *ngIf=\"true\" #unitForm=\"ngForm\">\n                    <div>\n                        <label>\n                            <span>Name</span>\n                            <input type=\"text\" class=\"form-control\" id=\"name\"\n                                required\n                                [(ngModel)]=\"model.name\" name=\"name\"\n                                #name=\"ngModel\" >\n                        </label>\n                    </div>\n                    <div>\n                        <label>\n                            <span>Short name</span>\n                            <input type=\"text\" class=\"form-control\" id=\"shortName\"\n                                required\n                                [(ngModel)]=\"model.shortName\" name=\"shortName\"\n                                #shortName=\"ngModel\" >\n                        </label>\n                    </div>\n                    <div>\n                        <label>\n                            <span>Opening date</span>\n                            <input type=\"date\" class=\"form-control\" id=\"date\"\n                                required\n                                [(ngModel)]=\"model.openingDate\" name=\"openingDate\"\n                                #openingDate=\"ngModel\" >\n                        </label>\n                    </div>\n                    <div>\n                    <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!unitForm.form.valid\" (click)=\"newUnit()\">Submit</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map