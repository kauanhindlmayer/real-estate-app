let uuid = 0

export function useUid() {
  return String(uuid++)
}
