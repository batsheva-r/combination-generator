import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bigIntNumber',
})
export class BigIntNumberPipe implements PipeTransform {
    transform(value: bigint | null | undefined): string {
        if (value === null || value === undefined) {
            return '';
        }
        return value.toLocaleString('en-US');
    }
}