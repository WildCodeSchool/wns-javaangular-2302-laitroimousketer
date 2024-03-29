import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as action from '../actions/user.action';
import * as sidebarAction from '../actions/sidebar.action';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AlertService } from "src/app/core/services/alert.service";

import { User } from "src/app/core/models/user.model";
import { UserService } from "src/app/core/services/user.service";


@Injectable()
export class UserEffects {
  baseAPI = environment.apiUrl;
  constructor(
    private actions$: Actions,
    private httpService: HttpClient,
    private msgService: AlertService,
    private userService: UserService,


  ) { }


  getuser = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getUser),
      switchMap(({ payload, displayInSidebar }) =>
        this.userService.getUser(payload).pipe(
          switchMap((data: User) => {
            const saveUserAction = action.saveUser({ payload: data });

            if (displayInSidebar) {
              return [
                saveUserAction,
                sidebarAction.displayUserDetails()
              ];
            } else {
              return [saveUserAction];
            }
          }),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la récupération du user');
            return of(/* action d'erreur si nécessaire */);
          })
        )
      )
    )
  );





  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateUser),
      switchMap(({ payload }) =>
        this.userService.update(payload).pipe(
          switchMap(() =>
            this.userService.getByKey(payload.id).pipe(
              map((data: User) => action.saveUser({ payload: data })),
              tap(() => this.msgService.showSuccessAlert('Utilisateur modifié avec succès')),
              catchError(error => {
                this.msgService.showErrorAlert("Erreur lors de la modification de l'utilisateur");
                // Handle errors here if necessary
                return of(/* error action if needed */);
              })
            )
          )
        )
      )
    )
  );

  createUser = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createUser),
      switchMap(({ payload }) =>
        this.userService.add(payload).pipe(
          map((data: User) => action.saveUser({ payload: data })),
          tap(() => this.msgService.showSuccessAlert('User créé')),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la création du User');
            // Gérer les erreurs ici si nécessaire
            return of(/* action d'erreur si besoin */);
          })
        )
      )
    ));


  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteUser),
      switchMap(({ payload }) =>
        this.userService.delete(payload).pipe(
          tap(() => {
            this.msgService.showSuccessAlert('user supprimé');
          }),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la suppression du user');
            // Gérer les erreurs ici si nécessaire
            return of(/* action d'erreur si besoin */);
          })
        )
      )
    ), { dispatch: false } // Ajoutez cette ligne si vous ne souhaitez pas déclencher d'action
  );


  getUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getUsers),
      switchMap(() => {
        return this.userService.getUsers().pipe(
          map((users: User[]) => {
            return action.saveUsers({ payload: users });
          }),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la récupération des users');
            return of(/* action d'erreur si besoin */);
          })
        );
      })
    )
  );


}

