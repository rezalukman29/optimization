export const currency = (value: number, hasNoPrefix?: boolean) => {
  return (
    (hasNoPrefix ? '' : '$ ') + new Intl.NumberFormat('ja-JP').format(value)
  );
};
