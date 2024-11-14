import { supabase } from "./supabase.js";
import { createNotFoundError } from "./errors.js";

export const getAllSubstratums = async () => {
  const { data, error } = await supabase.from("sustratos").select("*");

  return { data, error };
};

export const linkSubstratumsToExperiment = async ({ exp_id, sustratos }) => {
  //if the user didn't send substratums, we don't add them
  if (sustratos.length == 0) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("sustratos_experimentos")
    .upsert(sustratos)
    .eq("exp_id", parseInt(exp_id));

  return { data, error };
};

export const experimentHasSubstratums = async (expId) => {
  const { data, error } = await supabase
    .from("sustratos_experimentos")
    .select("exp_id")
    .eq("exp_id", parseInt(expId))
    .limit(1);

  if (error) {
    return { data, error };
  }

  return { data: data.length >= 1, error: error };
};
