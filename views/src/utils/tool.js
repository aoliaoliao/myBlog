export const requireAll = (requireContext) => requireContext.keys().reduce((prev, next) => {
  let path = next.split('.')[ 1 ].substr(1)
  // prev[ path ] = fn.call(requireContext(next), next)
  prev[ path ] = requireContext(next).default
  return prev
}, {})

export default {}
