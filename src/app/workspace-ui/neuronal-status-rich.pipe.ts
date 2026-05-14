import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { neuronalStatusPlainToRichHtml } from '../core/status-line-rich-html';

@Pipe({
  name: 'neuronalStatusRich',
  standalone: true,
})
export class NeuronalStatusRichPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(plain: string | null | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      neuronalStatusPlainToRichHtml(plain ?? ''),
    );
  }
}
