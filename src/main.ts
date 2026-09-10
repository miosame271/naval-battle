import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/1-app/app.component';
import { appConfig } from 'app/1-app/config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
