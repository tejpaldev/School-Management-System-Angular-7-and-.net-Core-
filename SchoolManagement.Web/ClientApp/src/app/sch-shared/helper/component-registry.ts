import { Type } from '@angular/core';

import { ComponentDefinition } from './component-definition';
import { ComponentMapping } from './component-mapping';

/**
 * Registry for components that will be bootstrapped.
 */

export class ComponentRegistry {

    private _componentMappings: ComponentMapping[] = [];

    registerComponent(instance: ComponentDefinition) {
        const entryIndex: number = this._componentMappings.findIndex((mapping: ComponentMapping) =>
            mapping.matchesType(instance.componentType));
        if (entryIndex !== -1) {
            this._componentMappings[entryIndex].addTarget(instance);
        } else {
            const mapping: ComponentMapping = new ComponentMapping(instance);
            this._componentMappings.push(mapping);
        }
    }

    /**
     * Returns a list of target selectors for which the component with the
     * given type should be bootstrapped.
     */
    getTargets(componentType: Type<any>) {
        return this._componentMappings.find((mapping) => mapping.matchesType(componentType)).targets;
    }
}
