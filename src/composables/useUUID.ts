let uuid = 0

export function useUUID() {
  return String(uuid++)
}
