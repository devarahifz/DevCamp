import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus } from "../configs/public_url";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const res = await directus.items("user").readByQuery({
      fields: [
        "nama_lengkap",
      ]
    })
    return res.data
  }
)