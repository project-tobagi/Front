export class FunnelFlow {
    private setStep;

    constructor(setStep: any) {
        this.setStep = setStep;
    }

    getFlowStep() {}

    start() {
        this.setStep((prev: number) => {
            return prev++;
        });
    }

    reStart() {
        this.setStep((prev: number) => {
            return 0;
        });
    }
}
