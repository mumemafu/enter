// Configurações do efeito Matrix
const matrix = document.getElementById('matrix');
const namePrompt = document.getElementById('name-prompt');
const nameInput = document.getElementById('name-input');
const submitButton = document.getElementById('submit-name');
const rectangle = document.getElementById('rectangle');

let userName = ''; // Variável para armazenar o nome do usuário

// Função para inicializar tudo após obter o nome
function initializeMatrix() {
    console.log("aqui começa")
  namePrompt.style.display = 'none'; // Esconde o prompt
  rectangle.style.display = 'block'; // Mostra o retângulo
  createMatrixEffect(); // Inicia o efeito Matrix
  startDialogue(); // Inicia o diálogo
}

// Event listener para o botão de submit
submitButton.addEventListener('click', () => {
  userName = nameInput.value.trim();
  if (userName) {
    initializeMatrix();
  } else {
    alert('Por favor, digite seu nome.');
  }
});

// Também permitir submeter com Enter
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    userName = nameInput.value.trim();
    if (userName) {
      initializeMatrix();
    } else {
      alert('Por favor, digite seu nome.');
    }
  }
});

// Configurações do efeito Matrix
let characters = '01';
const columns = Math.floor(window.innerWidth / 20);
const drops = Array(columns).fill(1);

let intervalId;

function createMatrixEffect() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  matrix.appendChild(canvas);

  const context = canvas.getContext('2d');

  function draw() {
    context.fillStyle = 'rgba(1, 8, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#00FF00';
    context.font = '20px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      context.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  intervalId = setInterval(draw, 50);
}

window.addEventListener('resize', () => {
  if (intervalId) {
    matrix.innerHTML = '';
    createMatrixEffect();
  }
});

function startDialogue() {
  const dialogue = document.getElementById('dialogue');
  const rectangle = document.getElementById('rectangle');
  const lines = [
    `Acorde ${userName}, a Matrix pegou você.`,
    "Siga o coelho branco.",
    "Toc, toc, toc."
  ];

  let delay = 8000;

  lines.forEach((line, index) => {
    setTimeout(() => {
      if (index > 0) {
        dialogue.innerHTML = '';
      }

      const lineElement = document.createElement('p');
      lineElement.classList.add('typing');
      lineElement.textContent = line;
      dialogue.appendChild(lineElement);

      setTimeout(() => {
        lineElement.classList.remove('typing');

        if (index === lines.length - 1) {
          // Remove o botão "Toc, toc, toc." e mostra os cards automaticamente após 2 segundos
          setTimeout(() => {
            dialogue.innerHTML = '';
            rectangle.style.animation = 'resize 1s ease-in-out forwards';

            // Cria os cards após 1 segundo (tempo da animação de resize)
            setTimeout(() => {
              const cardContainer = document.createElement('div');
              cardContainer.classList.add('card-container');

              const imagePaths = [
                'img/card1.jpg',
                'img/card2.jpg',
                'img/card3.jpg'
              ];

              imagePaths.forEach((path, index) => {
                const card = document.createElement('div');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = path;
                img.alt = 'Imagem do Card ' + index+1;
                card.appendChild(img);

                card.addEventListener('click', () => {
                  cardContainer.querySelectorAll('.card').forEach(cardItem => {
                    cardItem.classList.remove('expanded');
                  });
                  card.classList.add('expanded');
                });

                cardContainer.appendChild(card);
              });

              dialogue.appendChild(cardContainer);
            }, 1000);
          }, 2000); // Espera 2 segundos após o término da digitação
        }
      }, 3000); // Tempo de digitação
    }, delay);
    delay += 5000;
  });
}



