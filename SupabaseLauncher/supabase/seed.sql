insert into experimentos (exp_id) values(1),(2),(3),(4),(5);

insert into sustratos (nombre) values('ABONO'),('FLY'),('NOSE');

ALTER TABLE experimentos
ADD COLUMN exp_init_fructificacion_fecha DATE DEFAULT NULL;

ALTER TABLE experimento_iteraciones
ADD COLUMN iter_fructification_weight INT;