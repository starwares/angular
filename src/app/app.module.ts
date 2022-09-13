import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import {ToDoService} from "./services/to-do.service";
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import {TodoItemComponent} from "./components/todo-item/todo-item.component";

import { AboutComponent } from './components/about/about.component';
import {NgxsModule} from "@ngxs/store";
import {TodoState} from "./store/todo.store";
import {RecordState} from "./store/records.store";
import { RecordsComponent } from './components/records/records.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToDoListComponent,
    TodoItemComponent,
    AboutComponent,
    RecordsComponent
  ],
    imports: [
        NgxsModule.forRoot(),
        NgxsModule.forFeature([TodoState, RecordState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
