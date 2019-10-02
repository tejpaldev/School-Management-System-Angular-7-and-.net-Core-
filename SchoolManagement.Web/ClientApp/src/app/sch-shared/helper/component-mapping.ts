import { Type } from '@angular/core';

import { ComponentDefinition } from './component-definition';

/**
 * Maps a component selector to multiple target selectors.
 */
export class ComponentMapping {
    componentType: Type<any>;
    targets: Array<string> = [];

    constructor(componentDef: ComponentDefinition) {
        this.componentType = componentDef.componentType;
        this.addTarget(componentDef);
    }

    addTarget(componentDef: ComponentDefinition) {
        this.targets.push(componentDef.targetSelector);
    }

    matchesType(componentType: Type<any>) {
        return this.componentType === componentType;
    }
}
