import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FramesliderButtonComponent } from './components/frameslider-button/frameslider-button.component';
import { FramesliderComponent } from './components/frameslider/frameslider.component';
import { NumbersToPixelsPipe } from './pipes/numbers-to-pixels.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FramesliderButtonComponent,
    FramesliderComponent,
    NumbersToPixelsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
