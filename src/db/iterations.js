import { supabase } from "./supabase";

export const uploadExperimentIterationPhoto = async ({
  exp_id,
  photo,
  substratums,
}) => {
  const { data, error } = await supabase
    .from("iteraciones_nico")
    .upsert({ id_experiment: exp_id, iter_photo: photo });

  return { data, error };
};
