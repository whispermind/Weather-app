export function dayFormatter(date: string) {
  return new Date(date).toLocaleDateString("en-US", { weekday: "long" })
}