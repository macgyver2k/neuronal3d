import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { hydrateDaisyThemeFromStorage } from "./app/workspace-ui/daisy-theme";

hydrateDaisyThemeFromStorage(window);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
