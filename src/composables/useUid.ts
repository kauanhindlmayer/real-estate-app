let uuid = 0

export default function useUid() {
  return String(uuid++)
}
