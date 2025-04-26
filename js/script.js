// Estructura de los capítulos del juego
const chapters = [
    {
        id: 1,
        title: "El Candado del Destino",
        content: `
            <p>Al abrir la carta, descubres un mensaje enigmático:</p>
            <blockquote>"El secreto se oculta tras un candado numérico. La inscripción indica que el número mágico es la suma de dos números misteriosos: el día en que comenzó todo y el número de llaves que guarda el guardián."</blockquote>
            <p>En el reverso de la carta hay algunas pistas adicionales:</p>
            <div class="hint hint-animated">
                <p>- El día en que comenzó todo es el primer día de la semana.</p>
                <p>- El guardián siempre lleva consigo tantas llaves como colores tiene el arcoíris.</p>
            </div>
        `,
        puzzle: {
            type: "number",
            question: "¿Cuál es el número mágico que abre el candado?",
            answer: 14, // 7 (número de colores del arcoíris) + 7 (domingo, primer día de la semana bíblica)
            hints: [
                "Piensa en los días de la semana desde una perspectiva bíblica o tradicional.",
                "¿Cuántos colores tiene un arcoíris completo?",
                "La suma de ambos números te dará la respuesta."
            ]
        }
    },
    {
        id: 2,
        title: "El Mensaje Cifrado",
        content: `
            <p>Al abrir el candado, encuentras un pergamino con un mensaje cifrado:</p>
            <div class="cipher-text" id="cipher-message">
                "JQ XJHWJYT XJ JSHZJSYWF JS QF GNGQNTYJHF"
            </div>
            <p>Una nota adjunta menciona: "El código está en el alfabeto, solo debes retroceder en el tiempo."</p>
        `,
        puzzle: {
            type: "text",
            question: "¿Cuál es el mensaje descifrado?",
            answer: "el secreto se encuentra en la biblioteca",
            hints: [
                "Este es un cifrado César, donde cada letra se desplaza un número fijo de posiciones.",
                "Retroceder en el tiempo sugiere mover las letras hacia atrás en el alfabeto.",
                "Prueba desplazando cada letra 5 posiciones hacia atrás."
            ]
        }
    },
    {
        id: 3,
        title: "La Biblioteca Ancestral",
        content: `
            <p>Siguiendo las indicaciones, llegas a una antigua biblioteca. En la entrada hay un librero que te detiene:</p>
            <blockquote>"Para acceder a nuestro tesoro de conocimientos, debes demostrar tu sabiduría. Responde esta adivinanza:"</blockquote>
            <div class="hint hint-animated adivinanza">
                <p>"Siempre va y viene pero nunca se mueve de su sitio.</p>
                <p>Puede ser tan fuerte que rompe rocas, o tan suave que apenas lo notas.</p>
                <p>La vida nació en su dominio. ¿Qué es?"</p>
            </div>
        `,
        puzzle: {
            type: "text",
            question: "¿Cuál es la respuesta a la adivinanza?",
            answer: "el mar",
            alternativeAnswers: ["mar", "océano", "oceano", "agua", "olas"],
            hints: [
                "Piensa en elementos naturales que tienen movimiento pero permanecen en su lugar.",
                "Este elemento puede ser muy poderoso, pero también tranquilo.",
                "Es un gran cuerpo de agua."
            ]
        }
    },
    {
        id: 4,
        title: "El Secreto Revelado",
        content: `
            <p>Al resolver la adivinanza, el bibliotecario asiente con aprobación y te guía hacia una sala oculta. Allí, sobre un pedestal, encuentras un antiguo libro abierto que revela el secreto tan largamente guardado:</p>
            <blockquote class="typewriter important-message" id="final-message">"El verdadero tesoro no es el oro ni las joyas, sino el conocimiento. Has demostrado ser digno de este legado. Tu búsqueda por la verdad apenas comienza, pero has dado el primer paso. El código final te espera en el próximo capítulo de tu aventura..."</blockquote>
            <p>Al cerrar el libro, descubres grabado en su contraportada un símbolo misterioso y una frase enigmática que parece ser el inicio de una nueva búsqueda.</p>
        `,
        puzzle: null, // Este capítulo no tiene puzzle, es el final de la historia
        isFinal: true
    }
];

// Estado global del juego
let gameState = {
    currentChapter: 0,
    hintsUsed: 0,
    startTime: null,
    completionTime: null,
    attemptsPerPuzzle: {}
};

// Elementos DOM
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const chapterContainer = document.getElementById('chapter-container');
    
    // Iniciar el juego
    startButton.addEventListener('click', () => {
        gameState.startTime = new Date();
        welcomeScreen.classList.add('hidden');
        chapterContainer.classList.remove('hidden');
        loadChapter(1);
    });
});

// Cargar un capítulo específico
function loadChapter(chapterId) {
    const chapter = chapters.find(ch => ch.id === chapterId);
    
    if (!chapter) {
        console.error(`Capítulo ${chapterId} no encontrado`);
        return;
    }
    
    gameState.currentChapter = chapterId;
    
    const chapterContainer = document.getElementById('chapter-container');
    chapterContainer.innerHTML = ''; // Limpiar contenido anterior
    
    // Crear el contenido del capítulo
    const chapterElement = document.createElement('div');
    chapterElement.classList.add('chapter', 'fade-in');
    
    chapterElement.innerHTML = `
        <h2 class="chapter-title">Capítulo ${chapter.id}: ${chapter.title}</h2>
        <div class="chapter-content">${chapter.content}</div>
    `;
    
    // Si el capítulo tiene un puzzle, agregar el formulario
    if (chapter.puzzle) {
        const puzzleForm = createPuzzleForm(chapter);
        chapterElement.appendChild(puzzleForm);
    } else if (chapter.isFinal) {
        // Si es el capítulo final, mostrar el tiempo y estadísticas
        gameState.completionTime = new Date();
        const timeTaken = Math.floor((gameState.completionTime - gameState.startTime) / 1000);
        
        const statsElement = document.createElement('div');
        statsElement.classList.add('game-stats');
        statsElement.innerHTML = `
            <h3>¡Has completado la aventura!</h3>
            <p>Tiempo total: ${formatTime(timeTaken)}</p>
            <p>Pistas utilizadas: ${gameState.hintsUsed}</p>
            <button id="restart-btn" class="btn">Volver a Jugar</button>
        `;
        
        chapterElement.appendChild(statsElement);
        
        // Añadir evento para reiniciar el juego
        setTimeout(() => {
            document.getElementById('restart-btn').addEventListener('click', restartGame);
        }, 100);
    }
    
    chapterContainer.appendChild(chapterElement);
    
    // Aplicar animaciones especiales según el capítulo
    if (chapter.id === 2) {
        setTimeout(() => {
            const cipherMessage = document.getElementById('cipher-message');
            if (cipherMessage) {
                const text = cipherMessage.textContent.trim();
                let animatedHtml = '';
                
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (char === ' ' || char === '"') {
                        animatedHtml += char;
                    } else {
                        animatedHtml += `<span class="cipher-animated" style="--char-index: ${i}">${char}</span>`;
                    }
                }
                
                cipherMessage.innerHTML = animatedHtml;
            }
        }, 100);
    } else if (chapter.id === 3) {
        // Agregar estilo para la animación específica del capítulo 3 (adivinanza)
        const style = document.createElement('style');
        style.textContent = `
            .hint-animated p {
                margin-bottom: 8px;
            }
            
            .hint-animated p:nth-child(2) {
                animation: revealText 1.5s forwards 1.5s, floatText 3s ease-in-out infinite 3s;
                display: block !important;
                position: relative;
                z-index: 2;
            }
            
            .hint-animated p:nth-child(3) {
                animation: revealText 1.5s forwards 2.5s, floatText 3s ease-in-out infinite 4s;
            }
            
            .adivinanza {
                border: 2px solid rgba(233, 69, 96, 0.3);
                padding: 15px !important;
                background-color: rgba(233, 69, 96, 0.1);
                margin-bottom: 20px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Aplicar animaciones de texto si hay elementos con la clase 'typewriter'
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        // Reiniciar la animación
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
        
        // Si es el mensaje final, aplicar efecto especial de revelado
        if (element.id === 'final-message') {
            revealFinalMessage(element);
        }
    });
}

// Crear el formulario para un puzzle
function createPuzzleForm(chapter) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('puzzle-form');
    
    const puzzle = chapter.puzzle;
    let formHTML = `
        <h3>${puzzle.question}</h3>
        <form id="puzzle-form">
            <div class="form-group">
                <label for="puzzle-answer">Tu respuesta:</label>
                <input type="${puzzle.type === 'number' ? 'number' : 'text'}" 
                       id="puzzle-answer" 
                       name="puzzle-answer" 
                       required>
            </div>
            <button type="submit" class="btn">Comprobar</button>
        </form>
        <div id="feedback" class="feedback hidden"></div>
        <div class="hint-section">
            <button id="hint-btn" class="btn btn-secondary">Dame una pista</button>
            <p id="hint-text" class="hint hidden"></p>
        </div>
    `;
    
    formContainer.innerHTML = formHTML;
    
    // Añadir eventos después de que el elemento esté en el DOM
    setTimeout(() => {
        const puzzleForm = document.getElementById('puzzle-form');
        const hintBtn = document.getElementById('hint-btn');
        const hintText = document.getElementById('hint-text');
        const feedback = document.getElementById('feedback');
        
        // Inicializar contador de intentos para este puzzle si no existe
        if (!gameState.attemptsPerPuzzle[chapter.id]) {
            gameState.attemptsPerPuzzle[chapter.id] = 0;
        }
        
        // Evento de envío del formulario
        puzzleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userAnswer = document.getElementById('puzzle-answer').value.trim().toLowerCase();
            gameState.attemptsPerPuzzle[chapter.id]++;
            
            let isCorrect = false;
            
            // Comprobar la respuesta
            if (puzzle.type === 'number') {
                isCorrect = parseInt(userAnswer) === puzzle.answer;
            } else {
                isCorrect = userAnswer === puzzle.answer.toLowerCase();
                
                // Comprobar respuestas alternativas si existen
                if (!isCorrect && puzzle.alternativeAnswers) {
                    isCorrect = puzzle.alternativeAnswers.some(alt => 
                        alt.toLowerCase() === userAnswer
                    );
                }
            }
            
            // Mostrar feedback
            feedback.classList.remove('hidden', 'success', 'error');
            
            if (isCorrect) {
                feedback.classList.add('success');
                feedback.textContent = '¡Correcto! Has resuelto el enigma.';
                
                // Desactivar el formulario
                document.getElementById('puzzle-answer').disabled = true;
                puzzleForm.querySelector('button').disabled = true;
                hintBtn.disabled = true;
                
                // Cargar el siguiente capítulo después de un breve delay
                setTimeout(() => {
                    loadChapter(chapter.id + 1);
                }, 2000);
            } else {
                feedback.classList.add('error');
                
                // Si es un puzzle numérico, dar pistas sobre si es mayor o menor
                if (puzzle.type === 'number') {
                    const userNumber = parseInt(userAnswer);
                    if (userNumber < puzzle.answer) {
                        feedback.textContent = 'Incorrecto. El número que buscas es mayor.';
                    } else if (userNumber > puzzle.answer) {
                        feedback.textContent = 'Incorrecto. El número que buscas es menor.';
                    } else {
                        feedback.textContent = 'Incorrecto. Inténtalo de nuevo.';
                    }
                } else {
                    feedback.textContent = 'Incorrecto. Inténtalo de nuevo.';
                }
            }
        });
        
        // Evento para mostrar pistas
        hintBtn.addEventListener('click', () => {
            // Seleccionar una pista basada en cuántas ha utilizado ya
            const currentHintIndex = Math.min(gameState.hintsUsed % puzzle.hints.length, puzzle.hints.length - 1);
            hintText.textContent = puzzle.hints[currentHintIndex];
            hintText.classList.remove('hidden');
            gameState.hintsUsed++;
        });
    }, 100);
    
    return formContainer;
}

// Reiniciar el juego
function restartGame() {
    gameState = {
        currentChapter: 0,
        hintsUsed: 0,
        startTime: null,
        completionTime: null,
        attemptsPerPuzzle: {}
    };
    
    const welcomeScreen = document.querySelector('.welcome-screen');
    const chapterContainer = document.getElementById('chapter-container');
    
    chapterContainer.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}

// Función auxiliar para formatear el tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Función para el efecto de revelado gradual del mensaje final
function revealFinalMessage(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const speed = 50; // velocidad de escritura en milisegundos
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Añadir brillo pulsante cuando termina de escribir
            element.classList.add('reveal-complete');
        }
    }
    
    setTimeout(() => {
        typeWriter();
    }, 1000); // retraso antes de comenzar a escribir
} 