export class SRUtils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static chooseOneFromArray(a: any[]): any {
        return a[Math.floor(Math.random() * a.length)];
    }

    public static getRndInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static makeDisplayAndReportString(elements: string[]): string[] {
        let display = '';
        let report = '';

        elements.forEach((s) => {
            const a = s.split('|');
            if (a.length == 1) {
                display += a[0];
                report += a[0];
            } else {
                display += a[0];
                report += a[1];
            }
        });

        return [display, report];
    }
}
