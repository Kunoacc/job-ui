import { createStandaloneToast } from "@chakra-ui/react"

export const numberFormat = (number: number) => Intl.NumberFormat('en').format(number)

export const useToast = createStandaloneToast()

export const debounce = (func: any, wait: number, immediate: boolean) => {
  let timeout: NodeJS.Timeout
  return function () {
    const context = this; const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}