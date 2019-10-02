import { Provider, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ComponentDefinition } from './component-definition';
import { ComponentRegistry } from './component-registry';


export class Connector {
  private _registry: ComponentRegistry;
  private _modules: Set<Type<any>>= new Set();
  private _extraProviders: Provider[] = [];

  constructor() {
    this._registry = new ComponentRegistry();
    this._extraProviders.push({provide: ComponentRegistry, useValue: this._registry});
  }

  registerComponent(module: Type<any>, component: ComponentDefinition) {
    this._modules.add(module);
    this._registry.registerComponent(component);
  }

  bootstrap() {
    // const platform = platformBrowserDynamic(this._extraProviders);
    // this._modules.forEach((module: Type<any>) => platform.bootstrapModule(module));
  }
}
