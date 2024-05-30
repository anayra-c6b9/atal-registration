import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  // get all event
  getEventsApi = async () => {
    const getEvents$ = this._http.get((environment.API_BASE+environment.ALL_EVENT_DATA));

    return await lastValueFrom(getEvents$);
  }

  // post partipant form
  postParticipantApi = async (participantData: any) => {
    // const postParticipant$ = this._http.post(environment.API_BASE+environment.REGISTRATION_POST_FORM, participantData);
    const postParticipant$ = this._http.post(environment.API_BASE+environment.REGISTRATION_POST_FORM, participantData);
    return await lastValueFrom(postParticipant$);
  }

  // post partipant form
  postEventByIdApi = async (eventId: string) => {
    const postParticipant$ = this._http.post(environment.API_BASE+environment.EVENT_DATA_BY_ID, {eventId: eventId});

    return await lastValueFrom(postParticipant$);
  }
}
