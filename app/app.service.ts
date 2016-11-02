import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { DataStore } from './dataStore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AppService {

    //VARIABLES START

    private serverUrl = 'http://localhost:8082/api';
    private basicAuth = `Basic ${btoa('admin:district')}`;

    private headers = new Headers({'Content-Type': 'application/json'});

    //VARIABLES END

    constructor(private http: Http) {
    }

    saveDataStoreObject(dataStore: DataStore): any {
        //Receive a datastore object and saves it to the database.
    }

    loadDataStore(): any {
        //Return a list of all datastore objecct in the database.
    }

    deleteDataStoreObject(objectId): any {
        //Delete a datastore object with the received ID
    }
}