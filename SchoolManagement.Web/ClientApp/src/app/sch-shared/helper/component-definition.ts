import { Type } from '@angular/core';

export interface ComponentDefinition {
    componentType: Type<any>;
    targetSelector: string;
}
