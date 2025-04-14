# Guía de Desarrollo - Código del Destino

Esta guía técnica explica la estructura y funcionamiento del código del proyecto "Código del Destino". Está diseñada para ayudar a desarrolladores a entender y extender el juego.

## Estructura de Archivos

```
/
├── index.html              # Punto de entrada principal
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   └── script.js           # Lógica principal del juego
├── chapters/               # Ejemplos de capítulos individuales
│   └── chapter2.html       # Ejemplo de un capítulo específico
├── images/                 # Recursos visuales
│   ├── background.png      # Imagen de fondo
│   ├── favicon.ico         # Icono de la página
│   └── README.md           # Documentación de recursos visuales
├── utils/                  # Herramientas de utilidad
│   └── cipher-generator.html # Generador de cifrados para crear acertijos
└── docs/                   # Documentación
    └── guia-desarrollo.md  # Este archivo
```

## Lógica Principal del Juego

El juego está construido siguiendo estos principios:

1. **Estructura basada en capítulos**: La historia se divide en capítulos, cada uno con un contenido narrativo y un acertijo.
2. **Navegación dinámica**: El usuario avanza entre capítulos sin recargar la página, mediante JavaScript que actualiza el DOM.
3. **Sistema de acertijos**: Cada capítulo puede contener un acertijo de tipo numérico o textual, con validación en tiempo real.
4. **Sistema de pistas**: Los usuarios pueden solicitar pistas para ayudarles a resolver los acertijos.

## Modelo de Datos

El archivo `script.js` contiene un array `chapters` con la estructura de datos principal:

```javascript
const chapters = [
    {
        id: 1,                     // Identificador numérico único del capítulo
        title: "Título",           // Título del capítulo
        content: "HTML",           // Contenido narrativo (puede incluir HTML)
        puzzle: {                  // Información del acertijo
            type: "number/text",   // Tipo de acertijo
            question: "Pregunta",  // Pregunta que se muestra al usuario
            answer: "respuesta",   // Respuesta correcta
            hints: ["pista1", ...] // Array de pistas ordenadas
        }
    },
    // Más capítulos...
];
```

## Estado del Juego

El estado del juego se gestiona a través del objeto `gameState`:

```javascript
let gameState = {
    currentChapter: 0,        // Índice del capítulo actual
    hintsUsed: 0,             // Número de pistas utilizadas
    startTime: null,          // Momento de inicio
    completionTime: null,     // Momento de finalización
    attemptsPerPuzzle: {}     // Registro de intentos por puzzle
};
```

## Funciones Principales

### `loadChapter(chapterId)`

Esta función carga dinámicamente un capítulo en el DOM, basándose en su ID:

1. Encuentra el capítulo correspondiente en el array `chapters`.
2. Actualiza el `gameState`.
3. Crea los elementos DOM necesarios para el capítulo.
4. Si hay un puzzle, añade el formulario correspondiente.
5. Si es el capítulo final, muestra estadísticas.

### `createPuzzleForm(chapter)`

Crea y devuelve un elemento DOM con el formulario para el acertijo del capítulo:

1. Genera un formulario con campos basados en el tipo de acertijo.
2. Configura los eventos para validar respuestas y mostrar feedback.
3. Implementa la lógica para solicitar pistas.

## Flujo de Ejecución

1. **Inicio**: Al cargar la página, se muestra la pantalla de bienvenida.
2. **Comienzo del Juego**: Al hacer clic en "Comenzar Aventura", se inicializa `gameState` y se carga el primer capítulo.
3. **Navegación por Capítulos**: Cuando el usuario resuelve un acertijo correctamente, se carga automáticamente el siguiente capítulo.
4. **Finalización**: Al llegar al último capítulo, se muestran estadísticas y un botón para reiniciar.

## Extensión del Juego

### Añadir un Nuevo Capítulo

Para añadir un nuevo capítulo, sigue estos pasos:

1. Localiza el array `chapters` en `script.js`.
2. Añade un nuevo objeto al final del array, siguiendo la estructura existente.
3. Asegúrate de que el `id` sea secuencial respecto al último capítulo.
4. Si es el último capítulo, establece `isFinal: true`.

Ejemplo:

```javascript
{
    id: 5,
    title: "Nuevo Capítulo",
    content: `
        <p>Texto narrativo del nuevo capítulo...</p>
        <blockquote>Una cita o mensaje importante</blockquote>
    `,
    puzzle: {
        type: "text",
        question: "¿Cuál es la respuesta al acertijo?",
        answer: "respuesta correcta",
        hints: [
            "Primera pista más general",
            "Segunda pista más específica",
            "Tercera pista casi revelando la respuesta"
        ]
    }
}
```

### Tipos de Acertijos

El sistema actualmente soporta dos tipos de acertijos:

1. **Numéricos (`type: "number"`)**: Para respuestas que son números.
   - La validación compara el valor exacto con `puzzle.answer`.
   - Proporciona pistas de "más alto" o "más bajo".

2. **Textuales (`type: "text"`)**: Para respuestas que son texto.
   - La validación compara el texto en minúsculas con `puzzle.answer`.
   - Opcionalmente puede incluir `alternativeAnswers` para aceptar sinónimos.

## Estilos y Personalización Visual

Los estilos están definidos en `css/styles.css` y siguen estas convenciones:

1. **Variables CSS**: Utiliza variables para colores principales, permitiendo cambiar el tema fácilmente.
2. **Diseño Responsivo**: Incluye media queries para adaptar la interfaz a diferentes tamaños de pantalla.
3. **Animaciones**: Contiene clases como `fade-in` y `typewriter` para efectos visuales.

## Herramientas de Utilidad

El archivo `utils/cipher-generator.html` proporciona una interfaz para:

1. Crear mensajes cifrados usando el cifrado César.
2. Generar textos con cifrado por sustitución.
3. Crear mensajes con palabras invertidas.

Estas herramientas son útiles para diseñar nuevos acertijos para el juego.

## Mejoras Futuras

Algunas posibles mejoras para el proyecto:

1. **Persistencia**: Añadir almacenamiento local para guardar el progreso del usuario.
2. **Más tipos de acertijos**: Implementar acertijos gráficos, de secuencias, etc.
3. **Sistema de puntuación**: Añadir un sistema que puntúe basado en tiempo y pistas utilizadas.
4. **Ramificación narrativa**: Permitir diferentes caminos basados en las elecciones del usuario.
5. **Integración con backend**: Conectar con Python para ampliar la funcionalidad (como está en el plan original).

## Consideraciones Técnicas

- El código está estructurado para funcionar sin dependencias externas.
- Se utiliza JavaScript vanilla para maximizar la compatibilidad.
- Las animaciones CSS se utilizan para efectos visuales en lugar de librerías pesadas.
- El diseño está pensado para ser responsive y adaptarse a diferentes dispositivos. 