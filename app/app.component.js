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
var dataStore_1 = require('./dataStore');
require('rxjs/Rx');
var AppComponent = (function () {
    //VARIABLES END
    function AppComponent(appService) {
        this.appService = appService;
        //VARIABLES START
        this.model = new dataStore_1.DataStore('', '');
        this.loadObjectList();
    }
    AppComponent.prototype.loadObjectList = function () {
        //Loads a list of objects in the datastore.
    };
    AppComponent.prototype.updateObjectList = function (dataStore) {
        //updates variables of an object in the datastore.
    };
    AppComponent.prototype.newObject = function () {
        //Create a new object and save it to the datastore.
    };
    AppComponent.prototype.deleteObject = function (event) {
        //Delete an object fromm the datastore.
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n            <div class=\"app\" id=\"mainContainer\">\n                <div class=\"content\">\n                    <nav class=\"navbar navbar-default\">\n                      <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n                          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                            <span class=\"sr-only\">Toggle navigation</span>\n                            <span class=\"icon-bar\"></span>\n                            <span class=\"icon-bar\"></span>\n                            <span class=\"icon-bar\"></span>\n                          </button>\n                          <a class=\"navbar-brand\" href=\"#\">Brand</a>\n                        </div>\n                    \n                        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                          <ul class=\"nav navbar-nav\">\n                            <li class=\"active\"><a href=\"#\">Link <span class=\"sr-only\">(current)</span></a></li>\n                            <li><a href=\"#\">Link</a></li>\n                          </ul>\n                        </div>\n                      </div>\n                    </nav>\n                </div>\n                TODO: Fix the navbar with bootstrap styling\n            </div>\n                \n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map