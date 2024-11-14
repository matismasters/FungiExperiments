import { supabase } from "./supabase";
import { uploadImage } from "./buckets";

export const uploadExperimentIterationData = async ({ exp_id, iter_foto }) => {
  const { data, error } = await supabase
    .from("experimento_iteraciones")
    .upsert({ exp_id: exp_id, iter_foto: iter_foto });

  return { data, error };
};

export const uploadExperimentIterationPhoto = async ({ foto }) => {
  const { data, error } = await uploadImage(foto);
  return { data, error };
};
