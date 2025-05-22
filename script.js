// Configurações
const PLANILHA_URL = "https://opensheet.vercel.app/1d1UTyY3dAHsTHlajeGkESUDH2bZMUTAhEhDCD6kE7e4/respostas";
const cursos = {
  "NR06": "https://sites.google.com/view/gomes-treinamentos-nr06/in%C3%ADcio",
  "INTEGRAÇÃO": "https://sites.google.com/view/gomes-treinamentos-integracao?usp=sharing",
  "SERVIÇO A QUENTE": "https://sites.google.com/view/gomes-treinamentos-nr34-5?usp=sharing",
  "FDS": "https://sites.google.com/view/gomes-treinamentos-fds?usp=sharing",
  "COLETA SELETIVA": "https://sites.google.com/view/gomes-treinamentos-coleta?usp=sharing",
  "PERCEPÇÃO DE RISCO": "https://sites.google.com/view/gomes-treinamentos-percepcao?usp=sharing",
  "PADRONIZAÇÃO": "https://sites.google.com/view/gomes-treinamentos-padronizaca?usp=sharing"
};

// Login
async function login() {
  const user = document.getElementById("username").value.trim().toLowerCase();
  const pass = document.getElementById("password").value.trim();
  const res = await fetch(PLANILHA_URL);
  const dados = await res.json();

  const linha = dados.find(l => {
    const nomeSplit = l["Nome Completo"].toLowerCase().split(" ");
    const loginEsperado = `${nomeSplit[0]}.${nomeSplit[nomeSplit.length - 1]}`;
    return loginEsperado === user && l.CPF.startsWith(pass);
  });

  if (!linha) {
    document.getElementById("login-error").innerText = "Login ou senha inválidos.";
    return;
  }

  const nome = linha["Nome Completo"];
  const cpf = linha.CPF;

  const cursosLiberados = dados
    .filter(l => l.CPF === cpf && l.Status.toLowerCase() === "liberado")
    .map(l => l.Curso);

  document.getElementById("aluno-nome").innerText = nome.split(" ")[0];
  const container = document.getElementById("courses-buttons");
  container.innerHTML = "";

  cursosLiberados.forEach(curso => {
    if (cursos[curso]) {
      const link = document.createElement("a");
      link.href = cursos[curso];
      link.innerText = curso;
      link.target = "_blank";
      container.appendChild(link);
    }
  });

  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("courses-box").classList.remove("hidden");
}

// Logout
function logout() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("courses-box").classList.add("hidden");
  document.getElementById("login-box").classList.remove("hidden");
}
