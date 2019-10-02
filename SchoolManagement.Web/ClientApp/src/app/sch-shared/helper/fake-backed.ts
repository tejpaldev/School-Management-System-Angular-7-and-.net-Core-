import {
    BaseRequestOptions,
    Http,
    RequestMethod,
    RequestOptions,
    Response,
    ResponseContentType,
    ResponseOptions,
    XHRBackend,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    if (localStorage.getItem('schooldata') === null) {
        const realHttpData = new Http(realBackend, options);
        const requestOptionsData = new RequestOptions({
            method: RequestMethod.Get,
            responseType: ResponseContentType.Json
        });
        realHttpData.request('/assets/data.json', requestOptionsData)
            .subscribe((response: Response) => {
                localStorage.setItem('schooldata', JSON.stringify(response.json()));
                // console.log(JSON.parse(localStorage.getItem('schooldata')));
            },
            (error: any) => {
                // console.log(error.json());
            });
            // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('schooldata')).users || [];
    }
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
            // pass through any requests not handled above
            const realHttp = new Http(realBackend, options);
            const requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
