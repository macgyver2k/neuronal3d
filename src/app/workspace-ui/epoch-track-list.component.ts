import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-epoch-track-list",
  standalone: true,
  template: `
    <article class="n3-panel n3-panel--epochs">
      <div id="epochTrackWrap" class="n3-epochwrap">
        <p id="epochTrackHeader" class="n3-epochhead">Epochs-Ansicht</p>
        <ul id="epochTrackList" class="n3-epochlist"></ul>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpochTrackListComponent {}
