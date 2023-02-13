export {};
// import { combineEpics, ofType } from "redux-observable";
// import { catchError, delay, first, map, mergeMap, Observable, of, take, takeUntil, tap } from "rxjs";
// import { pingSlice } from "../slice/ping";
// import { Action } from "@reduxjs/toolkit";
// import { StateObservable } from "redux-observable/dist/types/StateObservable";
//
//
// export const pingEpic = (action$: any) => {
//   return action$.pipe(
//     ofType(pingSlice.actions.setPing),
//     delay(2000),
//     tap(console.log),
//   );
// };
//
//
// export const pongEpic = (action$: any) => action$.pipe(
//   ofType(pingSlice.actions.setPong),
//   delay(2000),
//   map(v => console.log(v)),
//   tap(console.log),
// );
//
// const epics = [
//   pingEpic,
//   pongEpic
// ]
//
// export const rootEpic = (action$: Observable<Action>, store$: StateObservable<void>, dependencies: any) =>
//   combineEpics(...epics)(action$, store$, dependencies).pipe(
//     catchError((error, source) => {
//       console.error(error);
//       return source;
//     })
//   );
//
