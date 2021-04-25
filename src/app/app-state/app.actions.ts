import { createAction, props } from "@ngrx/store";
import { Person } from "../person/person";

// Persons list
export const PERSON_REDUCER_TOKEN_INIT = createAction('PERSON_FETCH_INIT');
export const PERSON_REDUCER_TOKEN_FETCHED = createAction('PERSON_FETCH_SUCCEEDED', props<{ persons: Person[]}>());
export const PERSON_REDUCER_TOKEN_FAILED = createAction('PERSON_FETCH_FAILED', props<{error: string}>());
export const PERSON_REDUCER_TOKEN_REMOVED = createAction('PERSON_REMOVED', props<{removed: Person}>());
export const PERSON_REDUCER_TOKEN_UPDATED = createAction('PERSON_UPDATED', props<{updated: Person}>());
export const PERSON_REDUCER_TOKEN_ADDED = createAction('PERSON_ADDED', props<{added: Person}>());

// Selected person
export const PERSON_SELECTED = createAction('[Person Display] person selected', props<{person: Person}>() );
export const PERSON_SELECTION_CLEARED = createAction('[Person Display] selection cleared');

// Query filter
export const FILTER_VALUE_CHANGED = createAction('[Person Filter] changed', props<{filter: string}>());