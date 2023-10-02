import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id) => {
    const res = await directus.items("user").readOne(id,{
      fields: [
        "id",
        "nama_lengkap",
        "email",
        "tempat_lahir",
        "tanggal_lahir",
        "jenis_kelamin",
        "nomor_telepon",
        "alamat",
        "pendidikan_terakhir",
        "domisili",
        "kelas",
        "foto",
        "token",
        "progress",
        "isActive"
      ]
    })
    return res
  }
)

export const getUserByEmail = createAsyncThunk(
  "user/getUser",
  async (email) => {
    const res = await directus.items("user").readByQuery({
      fields: [
        "id",
        "email",
      ],
      filter: {
        email: {
          _eq: email
        }
      }
    })
    return res
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    const res = await directus.items("user").updateOne(data.get("id"), {
      nama_lengkap: data.get("nama_lengkap"),
      email: data.get("email"),
      tempat_lahir: data.get("tempat_lahir"),
      tanggal_lahir: data.get("tanggal_lahir"),
      jenis_kelamin: data.get("jenis_kelamin"),
      nomor_telepon: data.get("nomor_telepon"),
      alamat: data.get("alamat"),
      pendidikan_terakhir: data.get("pendidikan_terakhir"),
      domisili: data.get("domisili"),
    })
    return res
  }
)

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data) => {
    const res = await directus.items("user").updateOne(data.get("id"), {
      kata_sandi: data.get("kata_sandi"),
    })
    return res
  }
)

export const register = createAsyncThunk(
  "user/register",
  async (data) => {
    const token = makeid(20)
    const res = await directus.items("user").createOne({
      nama_lengkap: data.nama_lengkap,
      kelas: data.kelas,
      email: data.email,
      kata_sandi: data.kata_sandi,
      token: token
    })

    return {
      nama_lengkap: data.nama_lengkap,
      email: data.email,
      token: token,
      id: res.id
    }
  }
)

export const verifyEmail = createAsyncThunk(
  "user/verify",
  async (data) => {
    const res = await directus.items("user").readByQuery({
      fields: [
        "id",
        "email",
        "token"
      ],
      filter: {
        token: {
          _eq: data.token
        }
      }
    })

    await directus.items("user").updateOne(res.data[0].id, {
      isActive: true
    })

    return res.data
  }
)

export const login = createAsyncThunk(
  "user/login",
  async (data) => {
    const res = await directus.items("user").readByQuery({
      fields: [
        "email",
        "kata_sandi",
        "confirm_kata_sandi",
        "id"
      ],
      filter: {
        email: {
          _eq: data.email
        }
      }
    })
    
    const hashPassword = res.data[0].kata_sandi

    const verify = await fetch(`${url}/utils/hash/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        string: data.kata_sandi,
        hash: hashPassword
      })
    })

    const token = makeid(20)

    await directus.items("user").updateOne(res.data[0].id, {
      token: token
    })

    const resVerify = await verify.json()
    return {verify: resVerify.data, token: token, id: res.data[0].id}
  }
)

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getFoto(id) {
  return `${url}/assets/${id}`
}