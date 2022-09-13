import {Record} from "../models/record";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {auditTime, catchError, from, mergeMap, of, tap} from "rxjs";
import {Todo} from "../models/todo";
import {TodoStateModel} from "./todo.store";






export interface RecordsStateModel {
  records: Record[];

}



export class DelRecord {
  static readonly type = "[Record] delRecord"

  constructor(public record: Record) {
  }

}

export class NewRecord {
  static readonly type = "[Record] newRecord"

  constructor(public record: Record) {
  }

}




@State<RecordsStateModel>({
  name: "record",
  defaults: {
    records: []
  }
})

@Injectable()
export class RecordState {
  constructor() {
  }



  @Action(DelRecord)
  delRecord(ctx: StateContext<RecordsStateModel>, action: DelRecord){
    const state = ctx.getState()
    ctx.patchState({records: state.records.filter(record => record != action.record)})
    return of(action.record).pipe(

      mergeMap(_ => ctx.dispatch([]))
    )

  }


  @Action(NewRecord)
  newRecord(ctx: StateContext<RecordsStateModel>, action: NewRecord){
    const state = ctx.getState()
    ctx.patchState({records: [...state.records, action.record]})
    return of(action.record).pipe(
      auditTime(3000),
      mergeMap(_ => ctx.dispatch([new DelRecord(action.record)]))
    )

  }

  @Selector()
  static records(state: RecordsStateModel): Record[]{
    return state.records
  }


}

