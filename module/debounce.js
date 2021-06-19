export default function Debounce(callback, delay = 200) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      callback()
      timer = null
    }, delay)
  }
}