import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { OrganisationUnit } from './organisationUnit';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AppService {

    /**
     * `serverUrl` contains the api location of the server. You would generally get the baseUrl from the manifest.webapp
     * as described here http://dhis2.github.io/dhis2-docs/master/en/developer/html/apps_creating_apps.html
     *
     * `basicAuth` contains the username and password to send with the request as the basic authentication token. This is only needed when you develop locally and need CORS support (https://developer.mozilla.org/en-US/docs/Web/HTTP).
     * You obviously should not do this for your production apps.
     */
    private serverUrl = 'http://localhost:8082/api';
    private basicAuth = `Basic ${btoa('admin:district')}`;

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    saveOrganisationUnit(organisationUnit: OrganisationUnit): any {
        // POST the payload to the server to save the organisationUnit

        console.log(JSON.stringify(organisationUnit));
        this.headers.append('Authorization', this.basicAuth);
        return this.http
            .post(`${this.serverUrl}/organisationUnits`, JSON.stringify(organisationUnit), {headers: this.headers})
            .map( res => res.json() )
    }

    loadOrganisationUnits(): any {
        // GET the payload from the server

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get(`${this.serverUrl}/organisationUnits?paging=false&level=1`, {headers: this.headers})
            .map(res => res.json())

    }

    deleteOrganisationUnits(index): any{
        console.log("inner delete of " + index);
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .post(`${this.serverUrl}/organisationUnits`, {headers: this.headers})
            .map(res => res.json())

    }
}
