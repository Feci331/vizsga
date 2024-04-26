import { z } from "zod";
import { safeFetch } from "../http";

export const hotelSchema = z.object({
  id: z.number(),
  name: z.string(),
  pricePerNightInUSD: z.number(),
});

// Define the schema for an array of hotels
export const hotelsArraySchema = z.array(hotelSchema);
