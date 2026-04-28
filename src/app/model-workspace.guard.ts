import { inject } from "@angular/core";
import { Router, type ActivatedRouteSnapshot, type UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { concatMap, filter, map, take, type Observable } from "rxjs";
import type { AppState } from "./store/app.state";
import { NeuronalActions } from "./store/neuronal/neuronal.actions";
import {
  selectModelCollection,
  selectModelStoreHydrated,
} from "./store/neuronal/neuronal.selectors";

export function modelWorkspaceCanActivate(
  route: ActivatedRouteSnapshot,
): Observable<boolean | UrlTree> {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  return store.select(selectModelStoreHydrated).pipe(
    filter((h): h is true => h),
    take(1),
    concatMap(() => store.select(selectModelCollection).pipe(take(1))),
    map((col) => {
      const id = (route.params["modelId"] ?? "").trim();
      if (!id) {
        return true;
      }
      if (!col.models.some((m) => m.id === id)) {
        return router.parseUrl("/");
      }
      store.dispatch(NeuronalActions.activeModelIdFromRouteSet({ id }));
      return true;
    }),
  );
}
