import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const fetchKelas = createAsyncThunk(
  "kelas/fetchKelas",
  async () => {
    const res = await directus.items("kelas").readByQuery({
      fields: [
        "*",
        "materi.materi_id.judul_materi",
        "materi.materi_id.isi_materi",
        "materi.materi_id.id",
      ]
    })
    return res.data
  }
)

export const getKelasByUser = createAsyncThunk(
  "kelas/getKelasByUser",
  async (idUser) => {
    const res = await directus.items("kelas").readByQuery({
      fields: [
        "*",
        "materi.materi_id.judul_materi",
        "materi.materi_id.isi_materi",
        "materi.materi_id.id",
        "materi.materi_id.status",
        "materi.materi_id.tugas_peserta.*"
      ],
      filter: {
        "peserta": {
          _eq: idUser
        }
      }
    })
    return res.data
  }
)

export function getAssetURL(id) {
  return `${url}/assets/${id}`
}