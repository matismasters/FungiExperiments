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
  return supabase.from("experimentos").select("*").eq("exp_id", id);
};

const allExperiments = () => {
  return supabase.from("experimentos").select("*");
};

//POST
export const postExperiment = async (experiment) => {
  let { data, error } = await supabase
    .from("experimentos")
    .upsert({ exp_fecha: experiment?.exp_fecha })
    .select();
  return { data, error };
};

export const postPhotoToExperiment = async (payload) => {
  const { experimentId, photo } = payload;
  //add the photo
  const { data, error } = await supabase
    .from("iteraciones_nico")
    .upsert({ id_experiment: experimentId, iter_photo: photo });
  if (error) {
    return { data, error };
  }
};
