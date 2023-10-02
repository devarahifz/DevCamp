import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const postTugas = createAsyncThunk(
  "tugas/postTugas",
  async (data) => {
    const res = await directus.items("tugas_peserta").createOne(data)
    return res.data
  }
)

export const getTugas = createAsyncThunk(
  "tugas/getTugas",
  async (id) => {
    const res = await directus.items("tugas_peserta").readByQuery({
      fields: [
        "*",
      ],
      filter: {
        idUser: {
          _eq: id
        }
      }
    })
    return res.data
  }
)

export const deleteTugas = createAsyncThunk(
  "tugas/deleteTugas",
  async (id) => {
    await directus.items("tugas_peserta").deleteOne(id)

    return "Berhasil menghapus 1 tugas"
  }
)

export const getFiles = createAsyncThunk(
  "tugas/getFiles",
  async (id) => {
    const res = await fetch(`${url}/files/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    return res.data
  }
)