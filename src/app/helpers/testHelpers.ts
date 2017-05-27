import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseRequestOptions, Http, RequestOptions } from '@angular/http';

import { MockBackend } from '@angular/http/testing';

import 'reflect-metadata';

let testClassesContainer = {};
export function MakeTestComponent(name: string, selector: string, inputs?: string[], outputs?: string[], template?: string) {
    let _inputs = inputs || [];
    let _outputs = outputs || [];
    // create a auto template
    let _template = template || '<div>' + _inputs.reduce((p, c) => p + '<pre>' + c + ' = {{' + c + ' | json}}</pre>', '') + '</div>';

    // create the class
    testClassesContainer[name] = function () {
        for (let oup of _outputs) {
            this[oup] = new EventEmitter<any>();
        }
    };
    // attach the input metadata
    for (let inp of _inputs) {
        Reflect.decorate([Input()], testClassesContainer[name].prototype, inp);
    }

    // attach the output metadata
    for (let oup of _outputs) {
        Reflect.decorate([Output()], testClassesContainer[name].prototype, oup);
    }
    // attach the component metadata
    Reflect.decorate([
        Component({
            template: _template,
            selector: selector
        })
    ], testClassesContainer[name]);

    // return the class
    return testClassesContainer[name];
}

export const MOCK_HTTP_PROVIDERS = [
    {
        provide: Http, useFactory:
        (mockBackend: MockBackend, requestOptions: RequestOptions): Http =>
            new Http(mockBackend, requestOptions),
        deps: [MockBackend, RequestOptions]
    },
    { provide: RequestOptions, useClass: BaseRequestOptions },
    MockBackend
];
