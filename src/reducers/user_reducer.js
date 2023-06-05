import { createAsyncThunk } from "@reduxjs/toolkit";
import { directus, url } from "../configs/public_url";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id) => {
    const res = await directus.items("user").readOne(id,{
      fields: [
        "*",
      ]
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
    })
    return res
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
    console.log(data)
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