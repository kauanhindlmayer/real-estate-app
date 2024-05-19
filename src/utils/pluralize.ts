function pluralize(count: number, singular: string, plural: string): string {
  if (count === 0) return `No ${plural}`
  return `${count} ${count === 1 ? singular : plural}`
}

export default pluralize
