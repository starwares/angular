import {Component, Input, EventEmitter} from '@angular/core';
import {Select} from "@ngxs/store";
import {RecordState} from "../../store/records.store";
import {Observable} from "rxjs";
import {Record} from "../../models/record";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  constructor() { }
  itemTitle: string;
  onBoard(temTitle: string) {
    this.itemTitle = temTitle;
    alert(this.itemTitle)

  }
  @Select(RecordState.records)
  public records$!: Observable<Record[]>;

  ngOnInit(): void {
  }

}

