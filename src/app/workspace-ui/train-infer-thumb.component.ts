import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { drawMnistPixelsOntoCanvas } from '../../data/mnist';
import { getMnistTrainSampleAt } from '../../neuronal-app';

@Component({
  selector: 'app-train-infer-thumb',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="border-base-300 bg-base-300/40 hover:bg-base-300/60 flex w-full items-center gap-3 rounded-lg border px-2 py-1 text-left transition-colors"
      (click)="pick.emit()"
    >
      <canvas
        #cv
        width="28"
        height="28"
        class="border-base-content/20 h-11 w-11 shrink-0 rounded border bg-black [image-rendering:pixelated]"
      ></canvas>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          class="text-base-content font-mono text-xs font-medium tabular-nums"
          >Nr. {{ displayNr }}</span
        >
        <span class="text-base-content/60 text-[11px]"
          >Label {{ labelStr }}</span
        >
      </div>
    </button>
  `,
})
export class TrainInferThumbComponent implements AfterViewInit, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('cv', { static: true }) cv!: ElementRef<HTMLCanvasElement>;

  @Input({ required: true }) index!: number;
  @Output() readonly pick = new EventEmitter<void>();

  displayNr = 0;
  labelStr = '—';

  ngAfterViewInit(): void {
    this.paint();
  }

  ngOnChanges(): void {
    queueMicrotask(() => this.paint());
  }

  private paint(): void {
    const canvas = this.cv?.nativeElement;
    if (!canvas) return;
    const s = getMnistTrainSampleAt(this.index);
    this.displayNr = this.index + 1;
    if (!s) {
      this.labelStr = '—';
      this.cdr.markForCheck();
      return;
    }
    this.labelStr = String(s.label);
    drawMnistPixelsOntoCanvas(canvas, s.pixels);
    this.cdr.markForCheck();
  }
}
