# Documentación Técnica: Código del Destino

Este documento proporciona una explicación detallada de cada archivo y componente del proyecto "Código del Destino", un juego de aventura interactivo basado en acertijos.

## Estructura de Archivos

```
/
├── index.html                    # Punto de entrada principal
├── css/
│   └── styles.css                # Estilos globales
├── js/
│   └── script.js                 # Lógica principal del juego
├── chapters/                     # Capítulos individuales (versiones estáticas)
│   ├── chapter1.html             # Capítulo 1: El Candado del Destino
│   ├── chapter2.html             # Capítulo 2: El Mensaje Cifrado
│   ├── chapter3.html             # Capítulo 3: La Biblioteca Ancestral
│   └── chapter4.html             # Capítulo 4: El Secreto Revelado
├── images/                       # Recursos visuales
│   └── README.md                 # Instrucciones para imágenes
├── utils/                        # Herramientas de utilidad
│   └── cipher-generator.html     # Generador de cifrados para acertijos
├── docs/                         # Documentación
│   └── guia-desarrollo.md        # Guía para desarrolladores
└── README.md                     # Descripción general del proyecto
```

## Análisis Detallado por Archivo

### 1. index.html

Este archivo es el punto de entrada principal para el juego.

#### Estructura del HTML (Líneas 1-29)
- **Doctype y metadatos (1-7)**: Declaración HTML5 estándar, configuración de caracteres y viewport.
- **Contenedor principal (9-28)**: Contiene dos secciones principales:
  - **Pantalla de bienvenida (10-22)**: Muestra el título, subtítulo, texto introductorio y botón para iniciar.
  - **Contenedor de capítulos (25)**: Div vacío con id `chapter-container` donde se cargarán dinámicamente los capítulos.
- **Enlace a JavaScript (27)**: Conecta el archivo script.js que contiene la lógica del juego.

### 2. css/styles.css

Este archivo contiene todos los estilos visuales del juego.

#### Componentes Principales
- **Variables CSS (4-9)**: Define colores y efectos mediante variables para facilitar la personalización.
- **Estilos base (11-38)**: Configuración general, fondo, fuentes y estructura básica.
- **Textos y tipografía (40-62)**: Establece estilos para títulos, subtítulos y textos de introducción.
- **Botones (64-85)**: Estilos para botones, incluyendo efectos hover y active.
- **Animaciones (87-98)**: Define clases para animaciones como fade-in.
- **Formularios (100-126)**: Estilos para campos de entrada y etiquetas.
- **Capítulos (128-145)**: Configuración visual para la presentación de capítulos.
- **Feedback (147-162)**: Estilos para mensajes de éxito y error.
- **Efecto typewriter (164-222)**: Configura la animación de texto tipo máquina de escribir, incluyendo:
  - Estilos básicos para el contenedor de texto
  - Animación del cursor
  - Efecto de brillo pulsante para mensajes importantes
- **Responsive (224-236)**: Ajustes para diferentes tamaños de pantalla.

### 3. js/script.js

Este archivo contiene toda la lógica del juego.

#### Estructura y Datos (1-82)
- **Array de capítulos (1-81)**: Definición de los 4 capítulos con:
  - Identificador único (id)
  - Título
  - Contenido narrativo (HTML)
  - Configuración del acertijo (tipo, pregunta, respuesta, pistas)
- **Estado global (84-90)**: Objeto que almacena el estado actual del juego.

#### Inicialización (92-107)
- **Event Listener (92)**: Se ejecuta cuando se carga el DOM.
- **Referencias a elementos (93-95)**: Obtiene los elementos principales del DOM.
- **Evento de inicio (98-104)**: Configura el botón de inicio para:
  - Registrar el tiempo de inicio
  - Ocultar la pantalla de bienvenida
  - Mostrar el contenedor de capítulos
  - Cargar el primer capítulo

#### Funciones Principales
- **loadChapter (110-164)**: Función principal que:
  - Busca el capítulo según su ID
  - Limpia el contenido anterior
  - Crea los elementos del capítulo
  - Agrega formulario de acertijo si existe
  - Muestra estadísticas si es el capítulo final
  - Aplica animaciones de texto

- **createPuzzleForm (167-231)**: Crea el formulario para un acertijo:
  - Genera HTML basado en el tipo de acertijo
  - Configura validación de respuestas
  - Implementa sistema de pistas
  - Maneja la lógica de éxito/fracaso

- **restartGame (234-247)**: Reinicia el estado del juego y vuelve a la pantalla inicial.

- **formatTime (250-254)**: Función de utilidad para formatear el tiempo.

- **revealFinalMessage (257-276)**: Implementa el efecto especial para el mensaje final:
  - Extrae el texto original
  - Lo muestra caracter por caracter con retraso
  - Añade efecto de brillo al completar

### 4. chapters/*.html

Estos archivos son versiones estáticas de cada capítulo, útiles para desarrollo y pruebas independientes.

#### Estructura Común
Cada archivo chapter*.html sigue esta estructura:
- **Head (1-7)**: Configuración básica con enlace al CSS.
- **Contenido del capítulo (10-42)**: Presenta la narrativa y el acertijo específico.
- **Script independiente (44-83)**: Contiene lógica simplificada para probar el capítulo:
  - Validación de respuestas
  - Sistema de pistas
  - Efectos visuales específicos del capítulo

#### Características Específicas
- **chapter1.html**: Implementa un acertijo numérico con retroalimentación de "mayor/menor".
- **chapter2.html**: Presenta un mensaje cifrado y valida la solución textual.
- **chapter3.html**: Contiene una adivinanza con múltiples respuestas válidas.
- **chapter4.html**: Implementa el efecto especial de revelación del mensaje final.

### 5. utils/cipher-generator.html

Esta es una herramienta independiente para crear acertijos cifrados.

#### Componentes Principales
- **Interfaz (1-103)**: Configuración visual con tres secciones principales:
  - Cifrado César
  - Cifrado por Sustitución
  - Inversión de palabras
- **Lógica (105-296)**: Implementa las funciones JavaScript para:
  - Codificar/decodificar texto con cifrado César
  - Aplicar cifrado por sustitución
  - Invertir palabras o texto completo

### 6. docs/guia-desarrollo.md

Este archivo proporciona una visión general del proyecto para desarrolladores, incluyendo:
- Estructura de archivos
- Explicación de la lógica del juego
- Modelo de datos
- Flujo de ejecución
- Instrucciones para extender el juego
- Mejoras potenciales

## Flujo de Ejecución del Juego

1. **Carga inicial**: El usuario accede a index.html, donde ve la pantalla de bienvenida.
2. **Inicio del juego**: Al hacer clic en "Comenzar Aventura":
   - Se inicializa el estado del juego
   - Se oculta la pantalla de bienvenida
   - Se carga el primer capítulo
3. **Navegación por capítulos**:
   - El usuario lee la narrativa
   - Intenta resolver el acertijo
   - Si necesita ayuda, solicita pistas
   - Cuando resuelve correctamente, avanza al siguiente capítulo
4. **Finalización**:
   - Al llegar al capítulo final, se muestra el mensaje de conclusión
   - Se presentan estadísticas de tiempo y pistas utilizadas
   - Se ofrece la opción de reiniciar

## Funcionamiento de los Acertijos

### Acertijo 1: El Candado del Destino
- **Tipo**: Numérico
- **Lógica**: El usuario debe sumar el primer día de la semana (7) y los colores del arcoíris (7).
- **Validación**: Se compara directamente el número ingresado con la respuesta correcta (14).
- **Retroalimentación**: Indica si el número es mayor o menor.

### Acertijo 2: El Mensaje Cifrado
- **Tipo**: Textual
- **Lógica**: El usuario debe descifrar un mensaje codificado con cifrado César (desplazamiento -5).
- **Validación**: Se compara el texto ingresado con la solución "secreto se encuentra en la biblioteca".

### Acertijo 3: La Biblioteca Ancestral
- **Tipo**: Textual con múltiples respuestas
- **Lógica**: El usuario debe resolver una adivinanza cuya respuesta es "el mar".
- **Validación**: Se comprueba si la respuesta coincide con cualquiera de las alternativas válidas.

## Aspectos Técnicos Relevantes

### Manejo del DOM
El proyecto utiliza JavaScript vanilla para manipular el DOM:
- Creación dinámica de elementos
- Manejo de eventos
- Actualización de contenido sin recargar la página

### Sistema de Estilos
- Utiliza variables CSS para facilitar la personalización
- Implementa animaciones y transiciones para mejorar la experiencia de usuario
- Aplica diseño responsive para adaptarse a diferentes dispositivos

### Manejo de Estado
- El objeto `gameState` centraliza toda la información del progreso
- Se reinicia apropiadamente al comenzar una nueva partida

### Efectos Visuales Especiales
- Animación de texto tipo máquina de escribir
- Efecto de brillo pulsante para el mensaje final
- Transiciones suaves entre capítulos

## Consideraciones para Desarrollo Futuro

### Mejoras Potenciales
- **Persistencia de datos**: Implementar localStorage para guardar el progreso
- **Nuevos tipos de acertijos**: Añadir acertijos gráficos, de secuencia, etc.
- **Sistema de puntuación**: Implementar puntos basados en tiempo y uso de pistas
- **Ramificación de la historia**: Permitir múltiples caminos narrativos
- **Integración backend**: Como se menciona en el plan original, conectar con Python para ampliar funcionalidades

---

Este documento proporciona una visión técnica completa del proyecto "Código del Destino". Para instrucciones de uso general, consulta el archivo README.md en la raíz del proyecto. 