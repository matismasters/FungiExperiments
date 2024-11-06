import { supabase } from "./supabase.js";
import { createNotFoundError } from "./errors.js";

export const getAllSubstratums = async () => {
  const { data, error } = await supabase.from("sustratos_nico").select("*");

  return { data, error };
};
