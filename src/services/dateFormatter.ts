export function dateFormatter(date: Date) {
  return `${date.getFullYear()}-${resolver(date.getMonth() + 1)}-${resolver(date.getDate())}`
}

function resolver(value: number) {
  return value >= 10 ? value : `0${value}`;
}