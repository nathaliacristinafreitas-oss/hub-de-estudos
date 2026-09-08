// Dados Iniciais (Simulando o banco de dados do estudante)
let materiais = [
    { id: 1, titulo: "Apostila - Primeira Lei de Mendel", tipo: "pdf", link: "https://drive.google.com/file/d/exemplo1" },
    { id: 2, titulo: "Aula Completa - Genética Básica (45 min)", tipo: "video", link: "https://youtube.com/watch?v=exemplo2" },
    { id: 3, titulo: "Lousa - Quadro de Punnett", tipo: "lousa", link: "Ver imagem em anexo" },
    { id: 4, titulo: "Resumo de Dicas para o Vestibular", tipo: "anotacao", link: "Revisar cruzamentos em homozigose." }
];

// Função para renderizar os cards na tela
function renderizarMateriais(filtro = 'todos') {
    const grid = document.getElementById('materialsGrid');
    grid.innerHTML = '';

    const materiaisFiltrados = filtro === 'todos' 
        ? materiais 
        : materiais.filter(m => m.tipo === filtro);

    materiaisFiltrados.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.tipo}`;
        
        card.innerHTML = `
            <div>
                <span class="card-tag">${obterLabelTipo(item.tipo)}</span>
                <h3>${item.titulo}</h3>
            </div>
            <a href="${item.link}" target="_blank">${item.link}</a>
        `;
        
        grid.appendChild(card);
    });

    document.getElementById('total-materiais').innerText = `${materiais.length} materiais salvos`;
}

// Retorna o nome amigável do tipo
function obterLabelTipo(tipo) {
    const labels = {
        pdf: "📄 PDF de Aula",
        video: "🎥 Vídeo do YouTube",
        lousa: "🖼️ Foto da Lousa",
        anotacao: "📝 Anotação Pessoal"
    };
    return labels[tipo] || tipo;
}

// Filtragem
function filtrar(tipo) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderizarMateriais(tipo);
}

// Funções de Modal
function abrirModal() {
    document.getElementById('modalMaterial').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalMaterial').style.display = 'none';
    document.getElementById('materialForm').reset();
}

// Adicionar Novo Material
function adicionarMaterial(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const tipo = document.getElementById('tipo').value;
    const link = document.getElementById('link').value;

    const novoMaterial = {
        id: Date.now(),
        titulo,
        tipo,
        link
    };

    materiais.unshift(novoMaterial);
    renderizarMateriais();
    fecharModal();
}

// Inicialização da página
renderizarMateriais();
