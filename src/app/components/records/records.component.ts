import { Component, OnInit, Input } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TodoState} from "../../store/todo.store";
import {Observable} from "rxjs";
import {RecordState} from "../../store/records.store";
import {Record} from "../../models/record"

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})






export class RecordsComponent implements OnInit {
  @Input()
  item: Record;

  constructor(public store: Store) { }







  ngOnInit(): void {
  }

}
