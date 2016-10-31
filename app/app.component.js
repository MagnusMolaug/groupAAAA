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
            template: "\n           <div class=\"app\" id=\"mainContainer\">\n                <button class=\"btn\" onclick=\"toggleDivMain('people')\">\n                    People\n                </button>\n                <button class=\"btn\" onclick=\"toggleDivMain('group')\">\n                    Group\n                </button>\n                \n            </div>\n                \n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map