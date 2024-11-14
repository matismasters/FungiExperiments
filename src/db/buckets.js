import { supabase } from "./supabase.js";
import { decode } from "base64-arraybuffer";

export async function uploadImage({ iter_foto, base64Foto }) {
  const base64 = base64Foto.split("base64,")[1];
  const { data, error } = await supabase.storage
    .from("imagenes")
    .upload(`public/${iter_foto}`, decode(base64));

  return { data, error };
}
