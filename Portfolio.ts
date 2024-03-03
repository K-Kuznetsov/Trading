const CombinedWallet = (Portfolio1: { [key: string]: number; }, Portfolio2: { [key: string]: any; }) => {
    const result = { ...Portfolio1 };

    Object.keys(Portfolio2).forEach(key => {
        if (result[key]) {
            result[key] += Portfolio2[key];
        } else {
            result[key] = Portfolio2[key];
        };
    });
    return result;
};

export default CombinedWallet;