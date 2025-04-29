const btn = document.getElementById('confirmarBtn');
const mensagem = document.getElementById('mensagem');
const botaoSecreto = document.getElementById('botaoSecreto');
const atracao = document.querySelector('.atracao h2');

// Senha para ver a lista de convidados
const senhaAcesso = "1234";

// Carregar lista ou criar uma vazia
let listaConvidados = JSON.parse(localStorage.getItem('convidados')) || [];

btn.addEventListener('click', () => {
    const nome = prompt("Digite seu nome para confirmar presença:");

    if (nome && nome.trim() !== "") {
        listaConvidados.push(nome.trim());
        localStorage.setItem('convidados', JSON.stringify(listaConvidados)); // Salva
        mensagem.textContent = `✅ Obrigado, ${nome}! Presença confirmada!`;
        

    } else {
        mensagem.textContent = "⚠️ Nome inválido. Tente novamente.";
    }
});

// Função para ver a lista
function verListaConvidados() {
    const senha = prompt("Digite a senha para ver a lista de convidados:");
    if (senha === senhaAcesso) {
        listaConvidados = JSON.parse(localStorage.getItem('convidados')) || [];
        if (listaConvidados.length === 0) {
            alert("Nenhum convidado confirmado ainda.");
        } else {
            alert("Lista de convidados:\n\n" + listaConvidados.join("\n"));
        }
    } else {
        alert("❌ Senha incorreta!");
    }
}

// --- Mecanismo secreto --- //
let cliqueSecreto = 0;
let tempoClique;

// Área sensível: canto superior esquerdo
document.body.addEventListener('click', function(event) {
    if (event.clientX < 100 && event.clientY < 100) {
        cliqueSecreto++;
        
        clearTimeout(tempoClique);
        tempoClique = setTimeout(() => {
            cliqueSecreto = 0; // Reseta se demorar demais
        }, 1000);

        if (cliqueSecreto >= 3) { // 3 cliques rápidos
            botaoSecreto.style.opacity = 1;
            botaoSecreto.style.pointerEvents = 'auto'; // Agora pode clicar
            cliqueSecreto = 0; // Reseta
        }
    }
});

function limparConfirmados() {
    listaConvidados.length = 0; // Corrigido!
    localStorage.setItem('convidados', JSON.stringify(listaConvidados)); // Atualiza no localStorage também

    const mensagem = document.getElementById('mensagem');
    if (mensagem) {
        mensagem.textContent = '';
    }

    alert('✅ Lista de convidados limpa!');
}