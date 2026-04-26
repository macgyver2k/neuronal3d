import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NeuronalAppInstance } from "../core/neuronal-app-instance";
import { NeuronalAppService } from "../core/neuronal-app.service";
import {
  selectModelDropdownButtonDisabled,
  selectModelDropdownLabel,
  selectModelDropdownMenuVm,
  selectModelDropdownOpen,
} from "../store/neuronal/neuronal.selectors";

@Component({
  selector: "app-neuronal-workspace",
  standalone: true,
  imports: [],
  templateUrl: "./neuronal-workspace.component.html",
  styleUrl: "./neuronal-workspace.component.scss",
})
export class NeuronalWorkspaceComponent implements AfterViewInit, OnDestroy {
  @ViewChild("appRoot", { read: ElementRef }) appRoot!: ElementRef<HTMLElement>;
  readonly n = inject(NeuronalAppService);
  readonly modelBarLabel = toSignal(this.n.store.select(selectModelDropdownLabel), {
    requireSync: true,
  });
  readonly modelMenuVm = toSignal(this.n.store.select(selectModelDropdownMenuVm), {
    requireSync: true,
  });
  readonly dropdownOpen = toSignal(this.n.store.select(selectModelDropdownOpen), {
    requireSync: true,
  });
  readonly modelDropdownDisabled = toSignal(
    this.n.store.select(selectModelDropdownButtonDisabled),
    { requireSync: true },
  );
  private readonly appInstance = inject(NeuronalAppInstance);
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    this.teardown = this.n.start(this.appRoot.nativeElement, this.appInstance);
  }

  ngOnDestroy(): void {
    this.teardown?.();
    this.teardown = null;
  }

  @HostListener("document:pointerdown", ["$event"])
  onDocumentPointerDown(ev: PointerEvent): void {
    this.n.onDocumentPointerDown(ev);
  }

  @HostListener("document:keydown", ["$event"])
  onDocumentKeydown(ev: KeyboardEvent): void {
    this.n.onDocumentKeydown(ev);
  }
}
