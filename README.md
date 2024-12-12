# Fungi Experiments

FungiExperiments es una herramienta Open Source, desarrollada por [Nicolás Villegas](https://github.com/Ellniko75) y [Lucas Rodriguez](https://github.com/Ellukita97), que permite organizar y darle seguimiento a los experimentos de composición de sustrato llevados adelante por fungicultores.

La herramienta fue desarrollada utilizando [Astro](https://astro.build/), un JavaScript framework diseñado para construir sitios web estáticos de alto rendimiento. Su principal fortaleza está en minimizar el uso de JavaScript en el navegador, trasladando la mayor parte del procesamiento al momento de la compilación. 

Para la persistencia de datos se utilizó [Supabase](https://supabase.com/), una plataforma de backend como servicio de código abierto que proporciona herramientas potentes y listas para usar, como bases de datos PostgreSQL, autenticación, almacenamiento y funciones en tiempo real, facilitando el desarrollo rápido y eficiente de aplicaciones modernas.

## Importancia de la fungicultura

En los últimos años, el interés por el cultivo de hongos con fines alimenticios y medicinales ha experimentado un notable crecimiento, impulsado por su alto valor nutritivo, su perfil de sabor versátil y su capacidad de producirse de manera sostenible. 

Países como China, Estados Unidos y varios del norte de Europa se han posicionado a la vanguardia de la investigación, producción e innovación en este campo. Además, algunas empresas han comenzado a utilizar micelio —la estructura de raíces de los hongos— para la fabricación de materiales constructivos y textiles, presentando alternativas biodegradables que reducen la dependencia de plásticos y otros derivados del petróleo. 

Esta convergencia de factores ha generado un entorno más dinámico y prometedor para el desarrollo de sistemas y herramientas de gestión experimental, como el software de código abierto que aquí presentamos, orientado a optimizar el control de sustratos y las condiciones de cultivo en laboratorios especializados.

## Proyecto

El proyecto se desarrolló utilizando metodologías agiles de desarrollo, priorizando lograr un MVP muy rápido para permitir feedback de los usuarios tan temprano como fuera posible. Se utilizaron Sprints de una semana, con reuniones de planning y demo todos los Viernes.

### Funcionalidades y uso

- Generado de QR code por experimento
- Detección de QR code de cada experimento mediante cámara del móvil
- Ingreso de porcentajes de composición de sustrato mediante detección de QR
- Agregado de fotos diario a cada experimento mediante detección de QR
- Agregado de notas y detalles diarios mediante detección de QR
- Seguimiento de etapas de crecimiento, colonización y fructificación
- Registro de resultados de cosecha

#### Uso paso a paso

1. Crear experimento y generar QR code
1. Imprimir QR code y pegarlo el contenedor del experimento
1. Detectar el QR code e ingresar la composición del sustrato del experimento
1. Diariamente detectar el QR code de cada experimento e ingresar el progreso de colonización y tomar una foto.
1. Llegado el momento, detectar el QR code del experimento y marcarlo para avanzar a etapa de fructificación.
1. Diariamente detectar QR code, tomar foto, e ingresar cantidad de brotes.
1. Llegado el momento de cosechar, detectar QR code, tomar foto, e ingresar peso total de la cosecha.
1. Al dar por terminado el experimento, detectar QR code, tomar foto, y marcar como terminado

## Instalación para Desarrollo

### Configuración del Front-End

**npm install**
**npm run dev**

### Configuración del Back-End  (supabase)

1. Ejecutar Docker
2. En la configuración general de docker activar <strong> Use the WSL2 based engine</strong> y también <strong> Add the \*.docker.internal names</strong>
3. Abrir a la carpeta <strong>SupabaseLauncher</strong>
4. Ejecutar dentro de esta carpeta<strong> npx supabase start </strong> para ejecutar el servicio de supabase
5. En la consola se mostraran varias urls de todos los servicios de supabase, nos interesa **API URL** y **service_role key**.
6. Crear un **.env** en el proyecto principal, y crear las variables **SUPABASE_URL** y **SUPABASE_KEY**, setearlas a **API URL** y **service_role key** respectivamente.
7. http://localhost:54323/project/default -> Entrar a esta url para acceder al dashboard de supabase. <strong>Dentro de la pestaña storage crear un bucket llamado "imagenes" </strong>
8. <strong> npx supabase stop </strong> para detener el contenedor
9. Luego de la configuración solo es necesario usar **npx supabase start** para empezar el contenedor de supabase, y **npx supabase stop** para detenerlos

### Migraciones y Cambios en la DB

**Esta DB viene ya con una migración y datos precargados**

- Crear una migración

npx supabase migration new (Nombre de la migracion)

Esto creara un archivo .sql en el cual podremos escribir cualquier codigo sql que se ejecutará al levantar el servicio

- Aplicar la migración

npx supabase db reset

### Datos Precargados

Se puede crear en un archivo llamado <strong>seed.sql</strong> dentro de la carpeta supabase, donde se puede escribir codigo sql para llenar campos de las tablas. EJ:

insert into experimentos (exp_id) values(1),(2),(3),(4),(5);

insert into sustratos (nombre) values('ABONO'),('FLY'),('NOSE');

<strong> No olvidar el punto y coma al final;</strong>

## Agradecimientos

Se le agradece profundamente a los desarrolladores del proyecto, [Nicolás Villegas](https://github.com/Ellniko75) y [Lucas Rodriguez](https://github.com/Ellukita97), por su dedicación a una iniciativa innovadora donde aportando su tiempo y conocimiento estan permitiendo la democratización y profesionalización de la fungicultura. La aplicación esta planificada para usarse por mas de 68 fungicultures colombianos del grupo [CasOrellana](https://casorellana.com/)