// ===============================
// DADOS INICIAIS
// ===============================
const dadosIniciais = [
  { titulo: "Blinding Lights", artista: "The Weeknd", genero: "Pop", duracao: 3, plays: 2100000 },
  { titulo: "As It Was", artista: "Harry Styles", genero: "Pop", duracao: 2, plays: 1800000 },
  { titulo: "Heat Waves", artista: "Glass Animals", genero: "Indie", duracao: 4, plays: 1600000 },
  { titulo: "Stay", artista: "Justin Bieber", genero: "Pop", duracao: 2, plays: 1400000 },
  { titulo: "Levitating", artista: "Dua Lipa", genero: "Pop", duracao: 3, plays: 1300000 },
  { titulo: "Sunflower", artista: "Post Malone", genero: "Rap", duracao: 2, plays: 1100000 },
  { titulo: "Good 4 U", artista: "Olivia Rodrigo", genero: "Rock", duracao: 3, plays: 1000000 },
  { titulo: "Peaches", artista: "Justin Bieber", genero: "R&B", duracao: 3, plays: 980000 }
];

// ===============================
// ESTADO
// ===============================
let musicas = carregarDados();

// ===============================
// LOCAL STORAGE
// ===============================
function carregarDados() {
  const dados = localStorage.getItem("musicas");
  return dados ? JSON.parse(dados) : dadosIniciais;
}

function salvarDados() {
  localStorage.setItem("musicas", JSON.stringify(musicas));
}

// ===============================
// RENDERIZAÇÃO (TABELA)
// ===============================
function renderizarLista(lista) {
  const tbody = document.getElementById("lista");
  tbody.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const m = lista[i];

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${m.titulo}</td>
      <td>${m.artista}</td>
      <td>${m.genero}</td>
      <td>${m.duracao} min</td>
      <td>${m.plays}</td>
    `;

    tbody.appendChild(tr);
  }

  atualizarIndicadores(lista);
  ativarCliques();
}

// ===============================
// INDICADORES
// ===============================
function atualizarIndicadores(lista) {
  let total = lista.length;
  let duracao = 0;
  let plays = 0;

  for (let i = 0; i < lista.length; i++) {
    duracao += lista[i].duracao;
    plays += lista[i].plays;
  }

  document.getElementById("total").textContent = total;
  document.getElementById("duracao").textContent = duracao;
  document.getElementById("media").textContent = Math.round(plays / total);
}

// ===============================
// FILTRO
// ===============================
function aplicarFiltro() {
  const termo = document.getElementById("filtro").value.toLowerCase();
  const filtradas = [];

  for (let i = 0; i < musicas.length; i++) {
    const m = musicas[i];

    if (
      m.artista.toLowerCase().includes(termo) ||
      m.genero.toLowerCase().includes(termo)
    ) {
      filtradas.push(m);
    }
  }

  renderizarLista(filtradas);
}

// ===============================
// FORMULÁRIO
// ===============================
function adicionarMusica(e) {
  e.preventDefault();

  const nova = {
    titulo: document.getElementById("titulo").value,
    artista: document.getElementById("artista").value,
    genero: document.getElementById("genero").value,
    duracao: Number(document.getElementById("duracaoInput").value),
    plays: Number(document.getElementById("plays").value)
  };

  musicas.push(nova);
  salvarDados();
  renderizarLista(musicas);

  document.getElementById("form").reset();
}

// ===============================
// CLIQUE NAS CÉLULAS
// ===============================
function ativarCliques() {
  const linhas = document.querySelectorAll("#lista tr");

  for (let i = 0; i < linhas.length; i++) {
    const tds = linhas[i].querySelectorAll("td");

    tds[0].onclick = () => alert("Música: " + tds[0].textContent);
    tds[1].onclick = () => alert("Artista: " + tds[1].textContent);
    tds[2].onclick = () => alert("Gênero: " + tds[2].textContent);
    tds[3].onclick = () => alert("Duração: " + tds[3].textContent);
    tds[4].onclick = () => alert("Plays: " + tds[4].textContent);
  }
}

// ===============================
// EVENTOS
// ===============================
document.getElementById("filtro").addEventListener("input", aplicarFiltro);
document.getElementById("form").addEventListener("submit", adicionarMusica);

// ===============================
// GRÁFICO (CHART.JS)
// ===============================
const ctx = document.getElementById('meuGrafico').getContext('2d');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Pop', 'Rock', 'Indie', 'Rap', 'Outros'],
    datasets: [{
      data: [40, 20, 15, 15, 10],
      backgroundColor: ['#44ce1b', '#8b5cf6', '#3b82f6', '#f97316', '#6b7280'],
      responsive: true,
      maintainAspectRatio: false,
      borderWidth: 1,
      
      cutout: '50%'
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff',
          font: { size: 14 },
          padding: 20
        }
      }
    }
  }
});

// ===============================
// INICIALIZAÇÃO
// ===============================
renderizarLista(musicas);