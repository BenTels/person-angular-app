import { Injectable, OnDestroy } from '@angular/core';
import { props, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_REMOVED, PERSON_REDUCER_TOKEN_UPDATED } from './app-state/app.actions';
import { AppState, getPersonById } from './app-state/app.reducers';
import { Person } from './person/person';
import { PersonService } from './person/person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonUpdateListenerService implements OnDestroy {

  static PERSON_TOPIC_ENDPOINT: string = 'ws://localhost:8080/topics/person';

  private ws?: WebSocket;
  private reallyStop: boolean = false;
  private timeOut?: number;
  private connectInterval?: ReturnType<typeof setTimeout>;

  constructor(private personService: PersonService, private store: Store<AppState>) {
    this.subscribeToTopicAndSetLifeCycle();
  }
  
  private subscribeToTopicAndSetLifeCycle(): void {
    let ws: WebSocket = new WebSocket(PersonUpdateListenerService.PERSON_TOPIC_ENDPOINT);
    this.setHandler(ws);
    this.ws = ws;
  }

  private setHandler(ws: WebSocket) {
    ws.onopen = (ev: Event) => {
      console.log('CONNECTED');
      this.timeOut = 250;
      if (this.connectInterval) {
        clearTimeout(this.connectInterval);
      }
    }

    ws.onmessage = (evt: MessageEvent) => {
      const eventData = JSON.parse(evt.data);
        switch (eventData.changeType) {
            case 'ADDED':
                this.personService.getPerson(eventData.resource, (person:Person) => this.store.dispatch(PERSON_REDUCER_TOKEN_ADDED({added: person})));
                break;
            case 'UPDATED':
                this.personService.getPerson(eventData.resource, (person:Person) => this.store.dispatch(PERSON_REDUCER_TOKEN_UPDATED({updated: person})));
                break;
            case 'REMOVED':
                const idx: number = eventData.resource.lastIndexOf('/');
                const id: string = eventData.resource.substring(idx + 1);
                this.store.select(getPersonById, {id : id}).pipe(take(1)).subscribe({
                  next: (dead: Person|undefined) => { if (dead) { this.store.dispatch(PERSON_REDUCER_TOKEN_REMOVED({removed: dead})); }}
                })
                .unsubscribe();
                break;
            default: throw new Error('Unexpected change type' + eventData.changeType);
        }
    }

    ws.onerror = (err: Event) => {
      console.log('ERROR');
      console.log(err);
      ws.close();
    }


    ws.onclose = (err: CloseEvent) => {
      if (!this.reallyStop) {
        console.log('DISCONNECTED -- will attempt reconnect');
        console.log(err.reason);
        this.timeOut = 2 * this.timeOut!;
        this.connectInterval = setTimeout(this.check, Math.min(10000, this.timeOut));
      }
    }
  }

  ngOnDestroy(): void {
    this.reallyStop = true;
    this.ws?.close();
  }

  check = () => {
    if (this.ws?.readyState === WebSocket.CLOSED) {
        this.subscribeToTopicAndSetLifeCycle();
    }
}
}

