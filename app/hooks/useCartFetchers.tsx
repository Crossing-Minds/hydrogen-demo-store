import {useFetchers} from '@remix-run/react'

export function useCartFetchers(actionName: string, productVariant?: string) {
  const fetchers = useFetchers()

  return fetchers.filter(fetcher => {
    const formData = fetcher.submission?.formData

    if (!formData || formData.get('cartAction') !== actionName) {
      return false
    }

    if (!productVariant) {
      return true
    }

    const lines: any[] = JSON.parse((formData.get('lines') as string) || '')
    const productVariantLine = lines.find(
      line => line.merchandiseId === productVariant
    )

    return productVariantLine
  })
}
