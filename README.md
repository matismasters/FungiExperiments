# Ejecutar el Front-end

**npm install**
**npm run dev**

# Backend configuración (supabase)

1. Ejecutar Docker
2. En la configuración general de docker activar <strong> Use the WSL2 based engine</strong> y también <strong> Add the \*.docker.internal names</strong>
3. Abrir a la carpeta <strong>SupabaseLauncher</strong>
4. Ejecutar dentro de esta carpeta<strong> npx supabase start </strong> para ejecutar el servicio de supabase
5. En la consola se mostraran varias urls de todos los servicios de supabase, nos interesa **API URL** y **service_role key**.
6. Crear un **.env** en el proyecto principal, y crear las variables **SUPABASE_URL** y **SUPABASE_KEY**, setearlas a **API URL** y **service_role key** respectivamente.
7. http://localhost:54323/project/default -> Entrar a esta url para acceder al dashboard de supabase. <strong>Dentro de la pestaña storage crear un bucket llamado "imagenes" </strong>
8. <strong> npx supabase stop </strong> para detener el contenedor
9. Luego de la configuración solo es necesario usar **npx supabase start** para empezar el contenedor de supabase, y **npx supabase stop** para detenerlos

# Migraciones y Cambios en la DB

**Esta DB viene ya con una migración y datos precargados**

- Crear una migración

npx supabase migration new (Nombre de la migracion)

Esto creara un archivo .sql en el cual podremos escribir cualquier codigo sql que se ejecutará al levantar el servicio

- Aplicar la migración

npx supabase db reset

# Datos Precargados

Se puede crear en un archivo llamado <strong>seed.sql</strong> dentro de la carpeta supabase, donde se puede escribir codigo sql para llenar campos de las tablas. EJ:

insert into experimentos (exp_id) values(1),(2),(3),(4),(5);

insert into sustratos (nombre) values('ABONO'),('FLY'),('NOSE');

<strong> No olvidar el punto y coma al final;</strong>
