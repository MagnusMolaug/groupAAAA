import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppService } from './app.service';
import { DataStore } from './dataStore';

import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
    <div id="outerContainer">
        <div class="app" id="mainContainer">
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">Brand</a>
                </div>
            
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                  <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        
        
            <div id="dataStoreMainList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        List of objects
                    </div>
                    <!--<form class="">
                       <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                       </div>
                        <!--button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                      </form>-->
                    <div class="list-group-item"><input type="text" class="form-control" placeholder="Search for an object"></div>
                    <div class="list-group namespaceList">
                      <a href="#" class="list-group-item active">Namespace-1</a>
                      <a href="#" class="list-group-item">Namespace-2</a>
                      <a href="#" class="list-group-item">Namespace-3</a>
                      <a href="#" class="list-group-item">Namespace-4</a>
                      <a href="#" class="list-group-item">Namespace-5</a>
                      <a href="#" class="list-group-item">Namespace-6</a>
                      <a href="#" class="list-group-item">Namespace-7</a>
                      <a href="#" class="list-group-item">Namespace-8</a>
                      <a href="#" class="list-group-item">Namespace-9</a>
                    </div>
                </div>
            </div>

            <div id="dataStoreKeyList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        List of keys
                    </div>
                    <!--<form class="">
                       <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                       </div>
                        <!--button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                      </form>-->
                    <div class="list-group-item"><input type="text" class="form-control" placeholder="Search for a key"></div>
                    <div class="list-group namespaceList">
                      <a href="#" class="list-group-item active">Key-1</a>
                      <a href="#" class="list-group-item">Key-2</a>
                      <a href="#" class="list-group-item">Key-3</a>
                      <a href="#" class="list-group-item">Key-4</a>
                      <a href="#" class="list-group-item">Key-5</a>
                      <a href="#" class="list-group-item">Key-6</a>
                      <a href="#" class="list-group-item">Key-7</a>
                      <a href="#" class="list-group-item">Key-8</a>
                      <a href="#" class="list-group-item">Key-9</a>
                    </div>
                </div>
            </div>
            
            <div id="dataStoreInfo" class=" col-md-6 col-sm-6">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="col-lg-6 h4">
                        Key: 5G6Jjgfjj
                      </div>
                      <div class="pull-right">
                        <a href="edit.html" class="btn btn-primary">Edit mode</a> <button class="btn btn-danger buttonLeftAdjust">Delete object</button>
                      </div>
                    </div>
                  </div>
                  <div class="panel-body">
                    <div class="JSONValues">
                        <div class="panel panel-default">
                            <div class="panel-heading">JSON value 1</div>
                            <div class="panel-body">value</div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">JSON value 2</div>
                            <div class="panel-body">value</div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">JSON value 3</div>
                            <div class="panel-body">value</div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
                
`
})
export class AppComponent {

    //VARIABLES START

    public dataStore = [];
    private dataStores;
    //private settings;

    model = new DataStore('', '', true);

    //VARIABLES END

    constructor(
        private appService: AppService
    ) { this.loadObjectList() }

    loadObjectList(): void {
        /*this.appService.loadDataStore()
            .subscribe( res => this.updateObjectList(res.dataStores) );*/
        //console.log(this.appService.getNamespaces());

        //var AAAA = this.appService.getNamespaces();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://play.dhis2.org/demo/api/dataStore",
            "method": "GET",
            "headers": {
                "authorization":"Basic YWRtaW46ZGlzdHJpY3Q=",
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, HEAD, GET, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description",
                "Access-Control-Max-Age": "1728000"
            }
        }
        $.ajax(settings).done(function (response) {
            console.log("A" + response);
        });

        //this.appService.getNamespaces();
        /*
        $.ajax(this.settings).done(function (response) {
            return response;
        });*/
    }

    updateObjectList( dataStore ): void {
        //updates variables of an object in the datastore.
    }

    newDataStore(): void {
        //Create a new object and save it to the datastore.

        this.appService.saveDataStoreObject(this.model)
            .subscribe(this.loadObjectList())
    }

    deleteObject(event): void {
        //Delete an object fromm the datastore.
    }

}