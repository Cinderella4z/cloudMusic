export function throttle (fn, delay) {
  let timer = null
  return function (e) {
    let that = this
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.call(that, e)
      }, delay);
    }
  }

}