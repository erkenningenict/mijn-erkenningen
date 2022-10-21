/**
 * Show an amount as money with default 2 digits, and optional leading euro sign
 * @param value Amount
 * @param options.defaultValue [''] or supplied value,
 * @param options.fractionDigits [2] 5,00 or supplied value (i.e. 0)
 * @param options.euroPrefix [false] i.e. `5,25` or true `€ 5,25`
 * @param options.useGrouping [true] i.e. `10.000,25`
 */
export function toDutchMoney(
  value: number | undefined | null | string,
  options: {
    defaultValue?: string;
    fractionDigits?: number;
    euroPrefix?: boolean;
    useGrouping?: boolean;
  } = {
    defaultValue: '',
    fractionDigits: 2,
    euroPrefix: false,
    useGrouping: true,
  },
): string {
  const localeOptions = {
    minimumFractionDigits: options.fractionDigits || 2,
    maximumFractionDigits: options.fractionDigits || 2,
    style: 'decimal',
    useGrouping: options.useGrouping === false ? false : options.useGrouping,
  };
  if (!value && value !== 0 && value !== '0') {
    return options.defaultValue || '';
  }
  return `${options.euroPrefix ? '€ ' : ''}${new Intl.NumberFormat(
    'nl-NL',
    localeOptions,
  ).format(+value)}`;
}
