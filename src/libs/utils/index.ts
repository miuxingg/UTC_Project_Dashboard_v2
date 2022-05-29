export const moneyFormat = (money: any = '0', unit = 'đ'): string => {
  return String(money).replace(/(.)(?=(\d{3})+$)/g, '$1.') + unit;
};
