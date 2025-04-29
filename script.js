// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBP0_cwPBpSk1Q4Tp7VgzGTEVRRiHpDJVs",
    authDomain: "niversamu.firebaseapp.com",
    databaseURL: "https://niversamu-default-rtdb.firebaseio.com",
    projectId: "niversamu",
    storageBucket: "niversamu.appspot.com", // Corrigido aqui também!
    messagingSenderId: "837297567094",
    appId: "1:837297567094:web:6c417d20b6b9f5a6eb3657",
    measurementId: "G-HL5CP7Y8GG"
  };
  
  // Inicializa o app
  firebase.initializeApp(firebaseConfig);
  
  // Referência ao banco de dados
  const database = firebase.database();
  
  const btn = document.getElementById('confirmarBtn');
  const mensagem = document.getElementById('mensagem');
  const botaoSecreto = document.getElementById('botaoSecreto');
  const atracao = document.querySelector('.atracao h2');
  
  // Senha para ver a lista de convidados
  const senhaAcesso = "1234";
  
  // Botão de confirmar presença
  btn.addEventListener('click', () => {
      const nome = prompt("Digite seu nome para confirmar presença:");
  
      if (nome && nome.trim() !== "") {
          const novoConvidadoRef = database.ref('convidados').push(); // Cria um novo id
          novoConvidadoRef.set(nome.trim()); // Salva o nome no Firebase
  
          mensagem.textContent = `✅ Obrigado, ${nome}! Presença confirmada!`;
      } else {
          mensagem.textContent = "⚠️ Nome inválido. Tente novamente.";
      }
  });
  
  // Função para ver a lista
  function verListaConvidados() {
      const senha = prompt("Digite a senha para ver a lista de convidados:");
      if (senha === senhaAcesso) {
          database.ref('convidados').once('value')
              .then((snapshot) => {
                  const convidados = snapshot.val();
                  if (!convidados) {
                      alert("Nenhum convidado confirmado ainda.");
                      return;
                  }
                  const lista = Object.values(convidados);
                  alert("Lista de convidados:\n\n" + lista.join("\n"));
              })
              .catch((error) => {
                  alert("Erro ao buscar convidados: " + error.message);
              });
      } else {
          alert("❌ Senha incorreta!");
      }
  }
  
  // --- Mecanismo secreto --- //
  let cliqueSecreto = 0;
  let tempoClique;
  
  document.body.addEventListener('click', function(event) {
      if (event.clientX < 100 && event.clientY < 100) {
          cliqueSecreto++;
  
          clearTimeout(tempoClique);
          tempoClique = setTimeout(() => {
              cliqueSecreto = 0;
          }, 1000);
  
          if (cliqueSecreto >= 3) {
              botaoSecreto.style.opacity = 1;
              botaoSecreto.style.pointerEvents = 'auto';
              cliqueSecreto = 0;
          }
      }
  });
  
  function limparConfirmados() {
      database.ref('convidados').remove()
          .then(() => {
              mensagem.textContent = '';
              alert('✅ Lista de convidados limpa!');
          })
          .catch((error) => {
              alert("Erro ao limpar lista: " + error.message);
          });
  }
  