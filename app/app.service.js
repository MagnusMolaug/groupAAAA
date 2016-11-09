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
require('rxjs/add/operator/map');
require('rxjs/Rx');
var AppService = (function () {
    //VARIABLES END
    function AppService(http) {
        this.http = http;
        //VARIABLES START
        this.serverUrl = 'https://play.dhis2.org/test/api/dataStore';
        this.basicAuth = "Basic " + btoa('admin:district');
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.res = "";
    }
    AppService.prototype.saveDataStoreObject = function (dataStore) {
        //Receive a datastore object and saves it to the database.
        console.log(JSON.stringify(dataStore));
        this.headers.append('Authorization', this.basicAuth);
        return this.http
            .get(this.serverUrl + "?paging=false&level=1", { headers: this.headers });
        //.map(res => res.json())
    };
    AppService.prototype.loadDataStore = function () {
        //Return a list of all datastore objects in the database.
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get(this.serverUrl + "?paging=false&level=1", { headers: this.headers });
        //.map(res => res.json())
    };
    AppService.prototype.deleteDataStoreObject = function (objectId) {
        //Delete a datastore object with the received ID
    };
    AppService.prototype.getNamespaces = function () {
        //Gets list of namespaces
        //this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        /*this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get('${this.serverUrl}?paging=false&level=1', {headers: this.headers})*/
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://play.dhis2.org/demo/api/dataStore",
            "method": "GET",
            "headers": {
                "authorization": "Basic YWRtaW46ZGlzdHJpY3Q=",
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, HEAD, GET, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description",
                "Access-Control-Max-Age": "1728000"
            }
        };
        $.ajax(settings).done(function (response) {
            console.log("A" + response);
            this.res = response;
        });
        console.log("RES: " + this.res);
        return this.res;
        //return this.http.get(this.serverUrl, {headers: this.headers})
        //.map(res => res.json())
    };
    AppService.prototype.getNamespaceKeys = function () {
    };
    AppService.prototype.getKeyMetaData = function () {
    };
    AppService.prototype.addNamespaceKey = function () {
    };
    AppService.prototype.changeKeyMetadata = function () {
    };
    AppService.prototype.deleteNamespaceKey = function () {
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map