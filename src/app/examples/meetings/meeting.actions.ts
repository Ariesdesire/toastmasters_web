import { Action } from '@ngrx/store';
import { Predicate, Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

import { Meeting } from './meeting.model';
import { Book } from '@app/examples/crud/books.model';

export enum MeetingActionTypes {
  LOAD_MEETINGS = '[Meetings-API] Load Meetings',
  LOAD_MEETINGS_SUCCESS = '[Meetings-API] Load Success',
  LOAD_MEETINGS_FAIL = '[MEETINGS-API] Load Fail',
  ADD_MEETING = '[Meeting] Add Meeting',
  ADD_MEETING_SUCCESS = '[Meeting] Add Meeting Success',
  ADD_MEETING_FAIL = '[Meeting] Add Meeting FAiLED',
  UPDATE_MEETING = '[Meeting] Update Meeting',
  UPDATE_MEETING_SUCCESS = '[UPDATE] update Meeting Success',
  UPDATE_MEETING_FAIL = '[UPDATE] update Meeting FAiLED',
  DELETE_MEETING_BY_ID = '[Meeting] Delete Meeting By Predicate',
  SELECT_MEETING = 'SELECT_MEETING'
}

export class ActionMeetingLoad implements Action {
  readonly type = MeetingActionTypes.LOAD_MEETINGS;
}

export class ActionLoadMeetingsFail implements Action {
  readonly type = MeetingActionTypes.LOAD_MEETINGS_FAIL;

  constructor(public payload: { error: string }) {}
}

export class ActionLoadMeetingsSuccess implements Action {
  readonly type = MeetingActionTypes.LOAD_MEETINGS_SUCCESS;

  constructor(public payload: { meetings: Meeting[] }) {}
}
// export class ActionAddMeetingsSuccess implements Action {
//   readonly type = MeetingActionTypes.ADD_MEETING_SUCCESS;
//
//   constructor(public payload: { meeting: Meeting} ) {
//   }
// }
//
// export class ActionAddMeetingsFail implements Action {
//   readonly type = MeetingActionTypes.ADD_MEETING_FAIL;
//
//   constructor(public payload: any) {
//   }
// }
//
// export class ActionMeetingCreate implements Action {
//   readonly type = MeetingActionTypes.ADD_MEETING;
//
//   constructor(public payload: { meeting:  Meeting}) {
//   }
// }
//
// export class ActionMeetingUpdate implements Action {
//   readonly type = MeetingActionTypes.UPDATE_MEETING;
//
//   constructor(readonly payload: { meeting: Meeting }) {}
//
// }export class ActionMeetingUpdateSuccess implements Action {
//   readonly type = MeetingActionTypes.UPDATE_MEETING_SUCCESS;
//
//   constructor(public payload: { meeting: Meeting}) {
//   }
// }
//
// export class ActionMeetingUpdateFail implements Action {
//   readonly type = MeetingActionTypes.ADD_MEETING_FAIL;
//
//   constructor(public payload: any) {
//   }
// }
//
//
// export class ActionMeetingDelete implements Action {
//   readonly type = MeetingActionTypes.DELETE_MEETING_BY_ID;
//
//   constructor(public payload: { id: number}) {
//   }
// }
// export class ActionMeetingSelect implements Action {
//   readonly type = MeetingActionTypes.SELECT_MEETING;
//
//   constructor(public payload: number) {
//   }
// }

export type MeetingActions =
  | ActionMeetingLoad
  | ActionLoadMeetingsSuccess
  | ActionLoadMeetingsFail;
