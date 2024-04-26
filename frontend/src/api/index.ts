import { z } from "zod"
import { safeFetch } from "../http"

export const getHotels = (id: number, name: string, pricePerNightInUSD: number) => safeFetch({
    method: "GET",
    path: `/api/hotels/${id}/${name}/${pricePerNightInUSD}`,
  }, z.array(z.object({
    id: z.number(),
    name: z.string(),
    pricePerNightInUSD: z.number()
  })));

  