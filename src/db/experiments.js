import { supabase } from "./supabase.js";
import { createNotFoundError } from "./errors.js";

export const getExperiment = async (id) => {
  let { data, error } = await supabase
    .from("experimentos_nico")
    .select("*")
    .eq("exp_id", id);

  if (error) {
    return { data, error };
  }

  if (data.length == 0) error = createNotFoundError();

  return { data, error };
};
