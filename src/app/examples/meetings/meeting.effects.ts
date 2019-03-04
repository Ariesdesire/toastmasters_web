import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { asyncScheduler, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import {
  ActionLoadMeetingsFail,
  ActionLoadMeetingsSuccess,
  ActionMeetingLoad,
  MeetingActionTypes
} from './meeting.actions';
import { MeetingService } from './meeting.service';

export const MEETING_KEY = 'EXAMPLES.MEETINGS';

@Injectable()
export class MeetingEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private service: MeetingService
  ) {}

  // loadRequestEffect$: Observable<Action> = this.actions$.pipe(
  //   ofType<meetingActions.ActionMeetingLoad>(
  //     meetingActions.MeetingActionTypes.LOAD_MEETINGS
  //   ),
  //   startWith(new meetingActions.ActionMeetingLoad()),
  //   switchMap(action =>
  //     this.service.retrieveAllMeetings().pipe(
  //       map(
  //         meetings =>
  //           new meetingActions.ActionLoadMeetingsSuccess({
  //             meetings
  //           })
  //       ),
  //       catchError(error =>
  //         observableOf(new meetingActions.ActionLoadMeetingsFail({ error }))
  //       )
  //     )
  //   )
  // );

  @Effect()
  retrieveMeetings = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionMeetingLoad>(MeetingActionTypes.LOAD_MEETINGS),
      tap(action => this.localStorageService.setItem(MEETING_KEY, {})),
      debounceTime(debounce, scheduler),
      switchMap((action: ActionMeetingLoad) =>
        this.service.retrieveAllMeetings().pipe(
          map(meetings => new ActionLoadMeetingsSuccess({ meetings })),
          catchError(error => of(new ActionLoadMeetingsFail({ error })))
        )
      )
    );
}
