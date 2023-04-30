import {z} from 'zod'

export const ProductVariantSchema = z.object({
  id: z.string(),
  image: z.object({
    height: z.number(),
    url: z.string(),
    width: z.number()
  }),
  price: z.object({
    amount: z.string()
  }),
  product: z.object({
    id: z.string(),
    descriptionHtml: z.string(),
    handle: z.string(),
    title: z.string()
  }),
  title: z.string()
})

export type ProductVariantType = z.infer<typeof ProductVariantSchema>
