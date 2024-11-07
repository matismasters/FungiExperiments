import { supabase } from "./supabase.js";
import { createNotFoundError } from "./errors.js";

export const getAllSubstratums = async () => {
  const { data, error } = await supabase.from("sustratos_nico").select("*");

  return { data, error };
};

export const linkSubstratumsToExperiment = async ({ exp_id, substratums }) => {
  //if the user didn't send substratums, we don't add them
  if (substratums.length == 0) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("sustratos_experimentos_nico")
    .upsert(substratums)
    .eq("exp_id", parseInt(exp_id));

  return { data, error };
};
