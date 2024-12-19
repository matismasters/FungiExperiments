create table
experimentos (
exp_id serial primary key,
exp_fecha date default now(),
exp_fructificacion boolean default false,
exp_terminado boolean default false
);

create table
experimento_iteraciones (
iter_id serial primary key,
exp_id int,
iter_foto varchar(80) not null,
iter_fecha date default now(),
iter_porcentaje_colonizacion int,
iter_contaminacion boolean,
iter_observaciones varchar(100),
iter_numero_hongos int,
iter_fructification_peso int,

foreign key (exp_id) references experimentos(exp_id)
);

create table 
sustratos(
    id serial primary key,
    nombre varchar(50) not null
);

create table
sustratos_experimentos(
    exp_id int not null,
    sustrato_id int not null,
    porcentaje int not null,
    primary key(exp_id,sustrato_id),
    foreign key (sustrato_id) references sustratos(id),
    foreign key (exp_id) references experimentos(exp_id)
);
