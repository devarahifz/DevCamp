import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../../configs/public_url";

export const getCarousel = createAsyncThunk(
  "konten/getCarousel",
  async () => { 
    const res = await directus.items("carousel").readByQuery({
      fields: ['*']
    })

    return res.data
  }
)

export function getGambar(id) {
  return url + "/assets/" + id
}