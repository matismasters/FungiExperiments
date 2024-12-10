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

//In charge of finishing the experiment if the payload contains that instruction
export const finishExperiment = async (payload) => {
  const { exp_id, exp_terminado: userWantsToFinish } = payload;
  const doesNOTWantToFinish = !userWantsToFinish;
  //if the user does not want to finish the experiment, we return
  if (doesNOTWantToFinish) {
    return { data: null, error: null };
  }
  const { data, error } = await supabase
    .from("experimentos")
    .update({ exp_terminado: true })
    .eq("exp_id", parseInt(exp_id));

  return { data, error };
};

export const changeToFructification = async ({
  exp_id,
  iter_observaciones,
  iter_numero_hongos,
}) => {
  if (!iter_observaciones || !iter_numero_hongos) {
    return { data: null, error: null };
  }
  //if we get the signal to change to fructification
  const { data, error } = await supabase
    .from("experimentos")
    .update({ exp_fructificacion: true })
    .eq("exp_id", parseInt(exp_id));

  return { data, error };
};

export const isInFructification = async (exp_id) => {
  const { data, error } = await supabase
    .from("experimentos")
    .select("exp_fructificacion")
    .eq("exp_id", parseInt(exp_id));

  return { data: data[0]?.exp_fructificacion, error };
};

export const experimentIsAlreadyFinished = async (exp_id) => {
  const { data: exp, error: expError } = await getExperiment(exp_id);
  if (expError) return true;

  if (exp[0].exp_terminado) return true;

  return false;
};
