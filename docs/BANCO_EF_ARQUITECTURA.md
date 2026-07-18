# Banco Personal de Educación Física

## Objetivo

Ampliar **EduFísica Pro** con un banco personal de ejercicios, juegos, actividades, retos y sesiones reutilizables desde 1.º ESO hasta 2.º Bachillerato.

La aplicación seguirá trabajando con GitHub para control de versiones y Firebase como backend. El proyecto actual ya utiliza Firebase Realtime Database, por lo que la primera fase ampliará esa estructura sin romper las funciones existentes.

## Principios de diseño

1. La unidad básica es la **actividad**, no la sesión cerrada del libro.
2. Cada actividad conserva su **fuente y página original**.
3. Un mismo ejercicio puede recomendarse para varios cursos.
4. Las sesiones se construyen combinando actividades del banco.
5. No toda actividad tiene que ser calificable.
6. Algunas sesiones pueden generar evidencias vinculadas a criterios LOMLOE Andalucía.
7. Debe existir una vista clara e imprimible en A4.
8. Los dibujos y esquemas se almacenarán aparte y se vincularán mediante URL.

## Estructura Firebase propuesta

```text
edufisica/
├── alumnos/
├── resultados/
└── banco/
    ├── activities/
    ├── sessions/
    ├── sources/
    ├── curriculum/
    ├── assessmentTools/
    └── teachingLog/
```

### activities

Cada registro representa un ejercicio, juego, reto o actividad.

Campos principales:

- id
- nombre
- tipo
- categoria
- contenidoPrincipal
- contenidosSecundarios
- cursoOriginalEdad
- cursosRecomendados[]
- duracion
- espacio
- intensidad
- material
- objetivos
- descripcionBreve
- desarrollo
- organizacion
- faseSesion
- dificultad
- variantes
- adaptaciones
- evaluable
- evidenciaSugerida
- instrumentoSugerido
- competenciaEspecifica
- criterioEvaluacion
- saberBasico
- fuenteDocumental
- paginaOriginal
- imagenUrl
- favorito
- probadoEnClase
- valoracionDocente
- observacionesPersonales

### sessions

Las sesiones serán composiciones propias del profesor.

Campos principales:

- id
- titulo
- curso
- duracion
- numeroAlumnos
- espacio
- objetivos[]
- activityIds[]
- calentamientoIds[]
- partePrincipalIds[]
- vueltaCalmaIds[]
- evaluable
- criterios[]
- evidencias[]
- instrumentos[]
- observaciones
- fechaCreacion
- fechaUltimoUso

## LOMLOE Andalucía

La vinculación curricular debe tratarse como una capa separada de la actividad. Una actividad puede relacionarse con distintos criterios según el curso y el uso didáctico.

Relación recomendada:

```text
actividad -> curso -> competencia específica -> criterio -> saber básico -> evidencia -> instrumento
```

Tipos de uso:

- aprendizaje: no genera calificación necesariamente
- observación: recoge información formativa
- evaluable: genera evidencia vinculada a uno o varios criterios

## Módulos de interfaz previstos

1. Inicio
2. Banco de actividades
3. Buscador y filtros
4. Constructor de sesiones
5. Mis sesiones
6. Evaluación por criterios
7. Fuentes
8. Favoritos
9. Registro docente
10. Imprimir sesión

## Filtros del banco

- curso
- tipo de actividad
- contenido
- material
- espacio
- duración
- intensidad
- dificultad
- fase de sesión
- evaluable / no evaluable
- criterio
- fuente
- favorito

## Flujo de trabajo

```text
PDF original
   ↓
Extracción y clasificación
   ↓
Banco de actividades
   ↓
Selección mediante filtros
   ↓
Constructor de sesión
   ↓
Sesión guardada
   ↓
Vista A4 / impresión
   ↓
Opcional: evaluación por criterios
   ↓
Registro docente posterior
```

## Primera fase

- Incorporar los 20 juegos cooperativos como datos iniciales.
- Añadir pantalla de banco de actividades.
- Añadir filtros básicos.
- Permitir marcar favoritos.
- Añadir actividades a una sesión en construcción.
- Mantener intactas las funciones actuales de alumnos, pruebas físicas y resultados.

## Segunda fase

- Descomponer las sesiones del libro de 3.º y 4.º ESO en actividades individuales.
- Incorporar el libro de 16 y 17 años.
- Añadir fuentes y páginas originales.
- Vincular imágenes y esquemas cuando proceda.

## Tercera fase

- Incorporar currículo oficial LOMLOE Andalucía.
- Relacionar actividades y sesiones con criterios, saberes y evidencias.
- Crear instrumentos imprimibles: listas de cotejo, escalas y rúbricas.
- Crear exportación e impresión A4 de sesiones.

## Decisión técnica inicial

Se mantiene **Firebase Realtime Database** en la primera versión porque la aplicación actual ya está conectada a este servicio. La estructura se diseña de forma que una migración futura a Firestore sea posible sin cambiar el modelo conceptual de actividades y sesiones.
