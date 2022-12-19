import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageService } from './lib/services/storage-service/storage.service';
import { HeaderComponent } from './lib/components/header/header.component';
import { FooterComponent } from './lib/components/footer/footer.component';
import { SidebarComponent } from './lib/components/sidebar/sidebar.component';
import { LayoutComponent } from './lib/components/layout/layout.component';
import { ContentComponent } from './lib/components/content/content.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './lib/interceptors/jwt.interceptor';
import { NotfoundComponent } from './lib/components/error-pages/notfound/notfound.component';
import * as $ from 'jquery';
import * as DataTable from 'datatables.net';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    ContentComponent,
    NotfoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
