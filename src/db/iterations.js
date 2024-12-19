import { supabase } from "./supabase";

export const uploadExperimentIterationData = async ({
  exp_id,
  iter_foto,
  iter_observaciones,
  iter_numero_hongos,
  iter_fructification_peso,
  iter_porcentaje_colonizacion,
  iter_contaminacion,
}) => {
  const { data, error } = await supabase
    .from("experimento_iteraciones")
    .upsert({
      exp_id: exp_id,
      iter_foto: iter_foto,
      iter_observaciones: iter_observaciones,
      iter_numero_hongos: iter_numero_hongos,
      iter_fructification_peso: iter_fructification_peso,
      iter_contaminacion: iter_contaminacion,
      iter_porcentaje_colonizacion: iter_porcentaje_colonizacion,
    });

  return { data, error };
};
