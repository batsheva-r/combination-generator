import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pageLabel',
})
export class PageLabelPipe implements PipeTransform {
    transform(page: bigint): string {
        const text = page.toString();
        if (text.length <= 3) {
            return text;
        }
        return `...${text.slice(-3)}`;
    }
}