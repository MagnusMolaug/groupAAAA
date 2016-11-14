import { Injectable }    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { DataStore } from './dataStore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


class namespace{
    content: string;

}

@Injectable()
export class AppService {

    //VARIABLES START

    private serverUrl = 'https://play.dhis2.org/test/api/dataStore';

    private headers = new Headers({'Content-Type': 'application/json'});

    private basicAuth = `Basic ${btoa('admin:district')}`;

    private res = "";

    private namespace: namespace = new namespace();


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

    getNamespaces(): any{


        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        return this.http.get(this.serverUrl, {headers: this.headers}).map(res => res.json());

    }

    getNamespaceKeys( namespace ): any{


        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get(this.serverUrl + '/' + namespace, {headers: this.headers})
            .map(res => res.json());
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