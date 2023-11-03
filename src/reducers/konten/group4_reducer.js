import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus } from "../../configs/public_url";

export const getGroup4 = createAsyncThunk(
  "konten/getGroup4",
  async () => {
    const res = await directus.items("group_4").readByQuery({
      fields: ['*']
    })

    return res.data
  }
)