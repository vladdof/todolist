export const formatNumber = (number) => {
    return new Intl.NumberFormat('ru-RU').format(number);
}
