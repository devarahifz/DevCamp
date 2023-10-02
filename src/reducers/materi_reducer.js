import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const fetchMateri = createAsyncThunk(
  "materi/fetchMateri",
  async () => {
    const res = await directus.items("materi").readByQuery({
      fields: [
        "*",
        "tugas_peserta.*",
        "tugas_peserta.*.*",
        "kelas.kelas_id.*"
      ],
    })
    return res.data
  }
)

export const fetchMateriById = createAsyncThunk(
  "materi/fetchMateriById",
  async (id) => {
    const res = await directus.items("materi").readOne(id, {
      fields: [
        "*",
        "tugas_peserta.*"
      ],
    })
    return res.data
  }
)

export const updateTugas = createAsyncThunk(
  "materi/updateTugas",
  async (id, data) => {
    const res = await directus.items("materi").updateOne(id, {
      file_tugas_peserta: data,
    })
    return res.data
  }
)