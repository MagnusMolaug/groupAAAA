import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { DataStore } from './dataStore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AppService {

    //VARIABLES START

    private serverUrl = 'https://play.dhis2.org/demo/api/dataStore';
    private basicAuth = `Basic ${btoa('admin:district')}`;

    private headers = new Headers({'Content-Type': 'application/json'});

    //VARIABLES END

    constructor(private http: Http) {
    }

    saveDataStoreObject(dataStore: DataStore): any {
        //Receive a datastore object and saves it to the database.

        console.log(JSON.stringify(dataStore));
        this.headers.append('Authorization', this.basicAuth);
        return this.http
            .get(`${this.serverUrl}?paging=false&level=1`, {headers: this.headers})
            //.map(res => res.json())
    }

    loadDataStore(): any {
        //Return a list of all datastore objects in the database.

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get(`${this.serverUrl}?paging=false&level=1`, {headers: this.headers})
            //.map(res => res.json())
    }

    deleteDataStoreObject(objectId): any {
        //Delete a datastore object with the received ID
    }

    getNamespaces(){
        //Gets list of namespaces
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get("https://play.dhis2.org/demo/api/dataStore", {headers: this.headers})
            //.map(res => res.json())
    }

    getNamespaceKeys(){

    }

    getKeyMetaData(){

    }

    addNamespaceKey(){

    }

    changeKeyMetadata(){

    }

    deleteNamespaceKey(){

    }

}