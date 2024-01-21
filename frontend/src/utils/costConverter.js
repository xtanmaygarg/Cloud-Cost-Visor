const formatDollar = (money) => {
    let roundDown = Math.floor(money);
    let dollarUSLocale = Intl.NumberFormat('en-US');
    return dollarUSLocale.format(roundDown);
};

const getSum = (list) => {
    const initialValue = 0;
    const sumWithInitial = list.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );

    return sumWithInitial;
};

export { formatDollar, getSum };
