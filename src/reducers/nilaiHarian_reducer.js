import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const getNilaiHarian = createAsyncThunk(
  "nilaiHarian/getNilaiHarian",
  async () => {
    const res = await directus.items("nilai_harian").readByQuery({
      fields: [
        "*",
      ],
    })
    return res.data
  }
)

export const postFeedback = createAsyncThunk(
  "nilaiHarian/postFeedback",
  async (data) => {
    const res = await directus.items("nilai_harian").updateOne(data.get("id"), {
      feedback: data.get("feedback"),
    })
    return res.data
  }
)

export const deleteNilaiHarian = createAsyncThunk(
  "nilaiHarian/deleteNilaiHarian",
  async (id) => {
    const res = await directus.items("nilai_harian").deleteOne(id)

    return res.data
  }
)