// ===============================
// DADOS INICIAIS
// ===============================
const dadosIniciais = [
  {
    titulo: "Blinding Lights",
    artista: "The Weeknd",
    genero: "Pop",
    duracao: 3,
    plays: 2100000,
  },
  {
    titulo: "As It Was",
    artista: "Harry Styles",
    genero: "Pop",
    duracao: 2,
    plays: 1800000,
  },
  {
    titulo: "Heat Waves",
    artista: "Glass Animals",
    genero: "Indie",
    duracao: 4,
    plays: 1600000,
  },
  {
    titulo: "Stay",
    artista: "Justin Bieber",
    genero: "Pop",
    duracao: 2,
    plays: 1400000,
  },
  {
    titulo: "Levitating",
    artista: "Dua Lipa",
    genero: "Pop",
    duracao: 3,
    plays: 1300000,
  },
  {
    titulo: "Sunflower",
    artista: "Post Malone",
    genero: "Rap",
    duracao: 2,
    plays: 1100000,
  },
  {
    titulo: "Good 4 U",
    artista: "Olivia Rodrigo",
    genero: "Rock",
    duracao: 3,
    plays: 1000000,
  },
  {
    titulo: "Peaches",
    artista: "Justin Bieber",
    genero: "R&B",
    duracao: 3,
    plays: 980000,
  },
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

    let foto = "";

    if (m.artista === "The Weeknd") {
      foto =
        "https://tse3.mm.bing.net/th/id/OIP.xdAeC4I7s6CCwBkYCbojUQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
    } else if (m.artista === "Harry Styles") {
      foto = "https://s.hdnux.com/photos/01/55/61/61/28777551/3/rawImage.jpg";
    } else if (m.artista === "Glass Animals") {
      foto =
        "https://th.bing.com/th/id/R.cb72f15a509dba0d2c508a2889cb36ef?rik=FsAq8V8luDWXtw&pid=ImgRaw&r=0";
    } else if (m.artista === "Justin Bieber") {
      foto =
        "https://image.cnbcfm.com/api/v1/image/107114207-1662486469326-gettyimages-1414522654-szigetfestival_day3_120822_joeokpako-61_b6b74b20-6cf0-4c84-a.jpeg?v=1662486591";
    } else if (m.artista === "Dua Lipa") {
      foto =
        "https://tse3.mm.bing.net/th/id/OIF.nbztm0TjLPyd6YTbWL2daA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
    } else if (m.artista === "Post Malone") {
      foto =
        "https://tse3.mm.bing.net/th/id/OIP.devKgnYtEMpbMENlZIdZigHaE5?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
    } else if (m.artista === "Olivia Rodrigo") {
      foto =
        "https://s.yimg.com/ny/api/res/1.2/vJrGct4Ehk8gkl2cxJKntw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/rollingstone.com/f90553e0a0471446fb7b4409eaabf57b";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${m.titulo}</td>

      <td>
        <div class="artista-info">
          <img src="${foto}" class="foto-artista">
          <span>${m.artista}</span>
        </div>
      </td>

      <td>${m.genero}</td>
      <td>${m.duracao} min</td>
      <td>${m.plays}</td>

      <td>
        <button onclick="removerMusica(${i})">
          Remover
        </button>
      </td>
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

  document.getElementById("valorDuracaoTotal").textContent = duracao + " min";
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

    // MINUTOS QUEBRADOS
    duracao: Number(document.getElementById("duracaoInput").value).toFixed(1),

    plays: document.getElementById("plays").value,
  };

  musicas.push(nova);

  renderizarLista(musicas);

  document.getElementById("form").reset();
}

function removerMusica(indice) {
  musicas.splice(indice, 1);

  renderizarLista(musicas);
}

document.getElementById("form").addEventListener("submit", adicionarMusica);

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
// GRÁFICO Pizza
// ===============================
const ctx = document.getElementById("meuGrafico").getContext("2d");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Pop", "Rock", "Indie", "Rap", "Outros"],
    datasets: [
      {
        data: [40, 20, 15, 15, 10],
        backgroundColor: [
          "#da41c0",
          "#474747",
          "#f6d43b",
          "#ec2222",
          "#1d04fc",
        ],
        borderWidth: 1,
        cutout: "50%",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
          font: { size: 14 },
          padding: 20,
        },
      },
    },
  },
});

// ===============================
// INICIALIZAÇÃO
// ===============================
renderizarLista(musicas);
// ================================
/*Gráfico Barra*/
// =================================
const artistas = [
  "The Weeknd",
  "Harry Styles",
  "Glass Animals",
  "Justin Bieber",
  "Dua Lipa",
  "Post Malone",
  "Olivia Rodrigo",
];

const plays = [2100000, 1800000, 1600000, 1400000, 1300000, 1100000, 1000000];

const cores = [
  "#ff4d6d",
  "#4cc9f0",
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#3a86ff",
  "#06d6a0",
];

const cty = document.getElementById("graficoArtistas");

new Chart(cty, {
  type: "bar",

  data: {
    labels: artistas,

    datasets: [
      {
        label: "Plays",
        data: plays,
        backgroundColor: cores,
        borderRadius: 10,
        borderWidth: 1,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    indexAxis: "y",

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },

        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },

      y: {
        ticks: {
          color: "white",
        },

        grid: {
          display: false,
        },
      },
    },
  },
});

salvarDados();




