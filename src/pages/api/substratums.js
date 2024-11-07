import { object } from "astro:schema";
import { getAllSubstratums } from "../../db/substratums.js";
import { supabase } from "../../db/supabase.js";

export async function GET({ request }) {
  const { data, error } = await getAllSubstratums();
  if (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
