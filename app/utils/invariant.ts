export default function invariant(
  cond: any,
  message: string,
  informationOrConstructor?: ErrorConstructor | {[key: string]: any}
) {
  if (cond) return

  if (typeof informationOrConstructor === 'function') {
    throw new informationOrConstructor(message)
  } else {
    const error = new Error(message)
    Object.assign(
      error,
      { name: 'Invariant Violation' },
      informationOrConstructor
    )
    throw error
  }
}
