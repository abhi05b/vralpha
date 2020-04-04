import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {WindowRefService} from './window-ref.service';
// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import the ButtonsModule
import { VrComponent } from './vr/vr.component';
import { HomeContentComponent } from './home-content/home-content.component';
import {MaterialModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import { RouterModule }   from '@angular/router';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { TourDialogComponent } from './tour-dialog/tour-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        VrComponent,
        HomeContentComponent,
        ActionBarComponent,
        DialogComponent,
        ChartComponent,
        TourDialogComponent
    ],
    entryComponents: [ DialogComponent,ActionBarComponent,TourDialogComponent],
    imports: [
        BrowserModule,
        MaterialModule,
        // Register the modules
        BrowserAnimationsModule,
        MdProgressSpinnerModule,
        ChartsModule,
        RouterModule.forRoot([
          {
            path: 'vr',
            component: VrComponent
          },
          {
            path: 'home',
            component: HomeContentComponent
          },
          {
            path: 'chart',
            component: ChartComponent
          },
          {
            path: '',
            redirectTo: '/home',
            pathMatch: 'full'
          }
        ])
    ],
    providers: [WindowRefService],
    bootstrap: [AppComponent]
})
export class AppModule { }
