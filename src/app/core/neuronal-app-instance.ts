import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NeuronalAppInstance {
  private newModel = (): void => undefined;
  private selectModel = (_id: string): void => undefined;
  private runtimeAttached = false;
  private pendingNew = false;
  private pendingSelectId: string | null = null;

  connect(c: {
    newModelFromToolbar: () => void;
    activeModelFromToolbar: (id: string) => void;
  }): void {
    this.newModel = c.newModelFromToolbar;
    this.selectModel = c.activeModelFromToolbar;
    this.runtimeAttached = true;
    this.flushPending();
  }

  disconnect(): void {
    this.newModel = () => undefined;
    this.selectModel = () => undefined;
    this.runtimeAttached = false;
    this.pendingNew = false;
    this.pendingSelectId = null;
  }

  private flushPending(): void {
    if (this.pendingNew) {
      this.pendingNew = false;
      this.pendingSelectId = null;
      this.newModel();
      return;
    }
    if (this.pendingSelectId !== null) {
      const id = this.pendingSelectId;
      this.pendingSelectId = null;
      this.selectModel(id);
    }
  }

  newModelFromToolbar(): void {
    if (!this.runtimeAttached) {
      this.pendingNew = true;
      this.pendingSelectId = null;
      return;
    }
    this.newModel();
  }

  activeModelFromToolbar(id: string): void {
    if (!this.runtimeAttached) {
      this.pendingSelectId = id;
      this.pendingNew = false;
      return;
    }
    this.selectModel(id);
  }
}
