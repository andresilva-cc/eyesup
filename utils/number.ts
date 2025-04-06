export const formatDuration = (milliseconds: number) => {
  const numberFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 0,
  });

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${numberFormatter.format(minutes)}:${numberFormatter.format(seconds)}`;
};
