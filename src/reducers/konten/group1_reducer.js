import { createAsyncThunk } from "@reduxjs/toolkit"
import { directus, url } from '../../configs/public_url'

export const getGroup1 = createAsyncThunk(
  "konten/getGroup1",
  async () => {
    const res = await directus.items("group_1").readByQuery({
      fields: ['*']
    })

    return res.data
  }
)

export function getGambar(id) {
  return url + "/assets/" + id
}