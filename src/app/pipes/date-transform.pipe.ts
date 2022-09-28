import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'date-transform',
    pure: true, // arvuma nra hamar vor pipe-i logic-y mi angam ashxati u amen angam change detection-i het noric chkanchvi qani vor tvyal case-um initial value-n popoxman yentaka chi, karar grac chliner qani vor pipe-y by default pure: true - a
})
export class DateTransformPipe implements PipeTransform {
    transform(value: string, args?: any): string {
        const seconds = (+new Date() - +new Date(value)) / 1000;
        if (seconds <= 30) {
            return "Just now"
        } else {
            const intervals: { [key: string]: number } = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            let intervalCount!: number;
            for (let interval in intervals) {
                intervalCount = Math.floor(seconds / intervals[interval]);
                if (intervalCount < 1) {
                    continue
                } else if (intervalCount === 1) {
                    return `${intervalCount} ${interval} ago`
                } else {
                    return `${intervalCount} ${interval}s ago`
                }
            }
        }
        return value
    }
}