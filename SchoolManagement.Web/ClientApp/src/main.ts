import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { SchoolModule } from "./app/school.module";
import { environment } from "./environments/environment";

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(SchoolModule)
  .then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window["ngRef"]) {
      window["ngRef"].destroy();
    }
    window["ngRef"] = ref;
    // Otherise, log the boot error
  })
  .catch(err => console.error(err));
