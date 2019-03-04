import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store, select, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import * as fromSelectors from '../meeting.selector';
import * as meetingActions from '../meeting.actions';

import { Meeting } from '@app/examples/meetings/meeting.model';
import { MeetingService } from '@app/examples/meetings/meeting.service';
import { MeetingState } from '@app/examples/meetings/meeting.state';

@Component({
  selector: 'anms-meeting',
  templateUrl: './meetings-container.components.html',
  styleUrls: ['./meetings-container.components.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  meetings$: Observable<Meeting[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    public store: Store<State<MeetingState>>,
    private meetingService: MeetingService
  ) {}

  ngOnInit() {
    this.store.dispatch(new meetingActions.ActionMeetingLoad());
  }
}
