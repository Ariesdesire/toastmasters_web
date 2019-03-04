import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { MeetingService } from './meeting.service';

describe('MeetingService', () => {
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule, SharedModule],
      providers: [
        MeetingService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('should be created', inject(
    [MeetingService],
    (service: MeetingService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should return expected result meeting with ID 1', inject(
    [MeetingService],
    (service: MeetingService) => {
      const expectedMeeting: any = {
        id: 1,
        date: '2017-08-12T06:11:00.000Z',
        theme: 'Lovers Rock'
      };

      httpClientSpy.get.and.returnValue(of(expectedMeeting));

      service.retrieveMeeting(1).subscribe(meeting => {
        expect(meeting.id).toBe(expectedMeeting.id);
      });

      expect(httpClientSpy.get.calls.count()).toBe(1, 'called once');
    }
  ));

  it('should return all the meetings', inject(
    [MeetingService],
    (service: MeetingService) => {
      const expectedMeetings: any = [
        {
          id: 1,
          date: '2017-08-12T06:11:00.000Z',
          theme: 'Lovers Rock'
        },
        {
          id: 2,
          date: '2017-08-08T06:11:00.000Z',
          theme: 'Facing Hard Times'
        },
        {
          id: 3,
          date: '2017-08-12T06:11:40.000Z',
          theme: 'Systems That Work'
        },
        {
          id: 4,
          date: '2017-02-02T06:11:00.000Z',
          theme: 'Conqquering the Dark'
        },
        {
          id: 5,
          date: '2017-05-03T06:11:00.000Z',
          theme: 'How to Cry'
        },
        {
          id: 6,
          date: '2016-08-12T06:11:00.000Z',
          theme: 'Lovers kkck'
        }
      ];

      service.retrieveAllMeetings().subscribe(meetings => {
        expect(meetings).toBe(expectedMeetings);
      });
    }
  ));
});
