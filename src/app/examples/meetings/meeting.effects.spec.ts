import { LocalStorageService } from '@app/core';
import { Actions } from '@ngrx/effects';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, throwError } from 'rxjs/';
import {
  ActionMeetingRetrieve,
  ActionMeetingRetrieveSuccess,
  ActionMeetingRetrieveError,
  ActionMeetingRetrieveAll,
  ActionMeetingRetrieveAllSuccess,
  ActionMeetingRetrieveAllError,
  ActionMeetingUpdate,
  ActionMeetingUpdateSuccess,
  ActionMeetingUpdateError,
  ActionMeetingCreate,
  ActionMeetingCreateSuccess,
  ActionMeetingCreateError
} from './meeting.actions';
import { MeetingEffects, MEETING_KEY } from './meeting.effects';
import { Meeting } from './meeting.model';
import { MeetingService } from './meeting.service';

describe('meetingEffects', () => {
  let localStorage: jasmine.SpyObj<LocalStorageService>;
  let meetingSpy: jasmine.SpyObj<MeetingService>;

  beforeEach(() => {
    localStorage = jasmine.createSpyObj('localStorageService', ['setItem']);
    meetingSpy = jasmine.createSpyObj('meetingService', ['retrieveMeeting']);
  });

  describe('retrieveMeeting', () => {
    const id = 1;

    it('should emit ActionMeetingRetrieveSuccess on success', () => {
      const retrieveAction1 = new ActionMeetingRetrieve({
        id
      });
      const retrieveAction2 = new ActionMeetingRetrieve({
        id
      });
      const retrieveAction3 = new ActionMeetingRetrieve({
        id
      });
      const meeting: Meeting = {
        id: id,
        date: new Date('1995-12-17T03:24:00'),
        theme: 'Avoiding the Speed Trap'
      };
      const successAction = new ActionMeetingRetrieveSuccess({
        meeting
      });
      const values = {
        a: retrieveAction1,
        b: retrieveAction2,
        c: retrieveAction3,
        s: successAction
      };
      const source = cold('a--b--c', values);
      const expected = cold('--s--s--s', values);
      const actions = new Actions(source);

      meetingSpy.retrieveMeeting.and.returnValue(of(meeting));

      const effects = new MeetingEffects(actions, localStorage, meetingSpy);

      expect(
        effects.retrieveMeeting({
          debounce: 20,
          scheduler: getTestScheduler()
        })
      ).toBeObservable(expected);
      expect(localStorage.setItem).toHaveBeenCalledWith(MEETING_KEY, {
        id
      });
    });

    it('should emit ActionMeetingRetrieveError on error', () => {
      const retrieveAction = new ActionMeetingRetrieve({
        id
      });
      const error = 'ERROR';
      const errorAction = new ActionMeetingRetrieveError({
        error
      } as any);
      const values = {
        a: retrieveAction,
        e: errorAction
      };
      const source = cold('a', values);
      const expected = cold('--e', values);
      const actions = new Actions(source);

      meetingSpy.retrieveMeeting.and.returnValue(throwError(error));

      const effects = new MeetingEffects(actions, localStorage, meetingSpy);

      expect(
        effects.retrieveMeeting({
          debounce: 20,
          scheduler: getTestScheduler()
        })
      ).toBeObservable(expected);
    });
  });
});
