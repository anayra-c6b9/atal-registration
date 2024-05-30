import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  // post "get participants by event id"
  participantsByEventIdApi = async (eventId: string) => {
    const getParticipants$ = this._http.post(environment.API_BASE+environment.PARTICIPANTS_BY_EVENT, {eventId: eventId}, {withCredentials: true});

    return await lastValueFrom(getParticipants$);
  }

  // post "get participant by participant id"
  participantByIdApi = async (participantId: string, eventId: string) => {
    const getParticipant$ = this._http.post(environment.API_BASE+environment.PARTICIPANT_BY_ID, {userId: participantId, eventId: eventId}, {withCredentials: true});

    return await lastValueFrom(getParticipant$);
  }

  deleteParticipantByIdApi = async (participantId: string) => {
    const getParticipant$ = this._http.post(environment.API_BASE+environment.DELETE_PARTICIPANT_BY_ID, {userId: participantId}, {withCredentials: true});

    return await lastValueFrom(getParticipant$);
  }
}
