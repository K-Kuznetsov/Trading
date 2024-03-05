function CalculateRSI(ClosingPrices: number[]): number {
    let Increase: number = 0;
    let Decrease: number = 0;

    for (let i: number = 0; i < 14; i++) {
        if (ClosingPrices[i] > ClosingPrices[i + 1]) {
            Decrease += ClosingPrices[i] - ClosingPrices[i + 1];
        } else {
            Increase += ClosingPrices[i + 1] - ClosingPrices[i];
        };
    };

    const AvgIncrease: number = Increase / 14;
    const AvgDecrease: number = Decrease / 14;
    const RSI: number = 100 - (100 / (1 + (AvgIncrease / AvgDecrease)));
    return RSI;
};

export default CalculateRSI;