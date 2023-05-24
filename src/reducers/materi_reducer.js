import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const fetchMateri = createAsyncThunk(
  "materi/fetchMateri",
  async (id) => {
    const res = await directus.items("materi").readByQuery((id), {
      fields: [
        "*",
      ],
    })
    return res.data
  }
)