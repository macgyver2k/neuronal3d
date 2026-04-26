import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NeuronalAppInstance {
  private newModel = (): void => undefined;
  private selectModel = (_id: string): void => undefined;

  connect(c: { newModelFromToolbar: () => void; activeModelFromToolbar: (id: string) => void }): void {
    this.newModel = c.newModelFromToolbar;
    this.selectModel = c.activeModelFromToolbar;
  }

  newModelFromToolbar(): void {
    this.newModel();
  }

  activeModelFromToolbar(id: string): void {
    this.selectModel(id);
  }
}
