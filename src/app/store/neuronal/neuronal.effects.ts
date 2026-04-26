import { inject, Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { concatMap, debounceTime, from, skip } from "rxjs";
import { saveEpochTrackStoreToStorage } from "../../core/epoch-storage";
import { saveModelStoreToStorage } from "../../core/model-storage";
import type { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import { selectEpochByModelId, selectModelCollection } from "./neuronal.selectors";

@Injectable()
export class NeuronalEffects {
  private readonly store = inject(Store<AppState>);

  persistModelCollection$ = createEffect(
    () =>
      this.store.select(selectModelCollection).pipe(
        skip(1),
        debounceTime(200),
        concatMap((c) => from(saveModelStoreToStorage(c))),
      ),
    { dispatch: false },
  );

  persistEpoch$ = createEffect(
    () =>
      this.store.select(selectEpochByModelId).pipe(
        skip(1),
        debounceTime(200),
        concatMap((by) => from(saveEpochTrackStoreToStorage({ version: 1, byModelId: by }))),
      ),
    { dispatch: false },
  );
}
