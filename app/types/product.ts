import {z} from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  descriptionHtml: z.string(),
  handle: z.string(),
  media: z.object({
    nodes: z.array(
      z.object({
        image: z.object({
          height: z.number(),
          url: z.string(),
          width: z.number()
        })
      })
    )
  }),
  title: z.string(),
  variants: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        price: z.object({
          amount: z.string()
        })
      })
    )
  })
})

export type ProductType = z.infer<typeof ProductSchema>
