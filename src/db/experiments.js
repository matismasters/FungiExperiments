import { supabase } from "./supabase.js";
import { createNotFoundError } from "./errors.js";

//GET
export const getExperiment = async (id) => {
  let { data, error } = id ? await oneExperiment(id) : await allExperiments();

  if (error) {
    return { data, error };
  }

  if (data.length == 0) error = createNotFoundError();

  return { data, error };
};

const oneExperiment = (id) => {
  return supabase.from("experimentos_nico").select("*").eq("exp_id", id);
};

const allExperiments = () => {
  return supabase.from("experimentos_nico").select("*");
};

//POST
export const postExperiment = async (experiment) => {
  let { data, error } = await supabase
    .from("experimentos_nico")
    .upsert({ exp_date: experiment?.exp_date })
    .select();
  return { data, error };
};
