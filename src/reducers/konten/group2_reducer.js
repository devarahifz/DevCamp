import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus } from "../../configs/public_url";

export const getGroup2 = createAsyncThunk(
  "konten/getGroup2",
  async () => {
    const res = await directus.items("group_2").readByQuery({
      fields: ['*']
    })

    return res.data
  }
)