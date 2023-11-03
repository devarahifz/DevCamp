import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus } from "../../configs/public_url";

export const getGroup3 = createAsyncThunk(
  "konten/getGroup3",
  async () => {
    const res = await directus.items("group_3").readByQuery({
      fields: ['*']
    })

    return res.data
  }
)