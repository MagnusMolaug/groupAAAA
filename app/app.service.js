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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        /**
         * `serverUrl` contains the api location of the server. You would generally get the baseUrl from the manifest.webapp
         * as described here http://dhis2.github.io/dhis2-docs/master/en/developer/html/apps_creating_apps.html
         *
         * `basicAuth` contains the username and password to send with the request as the basic authentication token. This is only needed when you develop locally and need CORS support (https://developer.mozilla.org/en-US/docs/Web/HTTP).
         * You obviously should not do this for your production apps.
         */
        this.serverUrl = 'http://localhost:8082/api';
        this.basicAuth = "Basic " + btoa('admin:district');
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AppService.prototype.saveOrganisationUnit = function (organisationUnit) {
        // POST the payload to the server to save the organisationUnit
        console.log(JSON.stringify(organisationUnit));
        this.headers.append('Authorization', this.basicAuth);
        return this.http
            .post(this.serverUrl + "/organisationUnits", JSON.stringify(organisationUnit), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.loadOrganisationUnits = function () {
        var _this = this;
        // GET the payload from the server
        console.log("loadOrganisationUnits");
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return Observable_1.Observable.create(function (observer) {
            _this.http
                .get(_this.serverUrl + "/organisationUnits?paging=false&level=1", { headers: _this.headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                observer.next(data);
                observer.complete();
            });
        });
    };
    AppService.prototype.deleteOrganisationUnit = function (unitId) {
        var _this = this;
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return Observable_1.Observable.create(function (observer) {
            _this.http
                .delete(_this.serverUrl + "/organisationUnits/" + unitId, { headers: _this.headers })
                .subscribe(function (res) {
                observer.next(res);
                observer.complete();
            }, function (error) {
                alert("I did smoke, but I did not inhale.");
            });
        });
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map