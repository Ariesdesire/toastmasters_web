import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  tap,
  distinctUntilChanged,
  mergeMap,
  startWith
} from 'rxjs/operators';
import * as meetingActions from './meeting.actions';
import { MeetingService } from './meeting.service';
import { Meeting } from '@app/examples/meetings/meeting.model';

export const MEETING_KEY = 'EXAMPLES.MEETINGS';

@Injectable()
export class MeetingEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private service: MeetingService
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<meetingActions.ActionMeetingLoad>(
      meetingActions.MeetingActionTypes.LOAD_MEETINGS
    ),
    startWith(new meetingActions.ActionMeetingLoad()),
    switchMap(action =>
      this.service.retrieveAllMeetings().pipe(
        map(
          meetings =>
            new meetingActions.ActionLoadMeetingsSuccess({
              meetings
            })
        ),
        catchError(error =>
          observableOf(new meetingActions.ActionLoadMeetingsFail({ error }))
        )
      )
    )
  );
}
