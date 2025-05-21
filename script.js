document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    const gradeSections = document.querySelectorAll('.grade-section');
    
    // Função de pesquisa
    function searchResources() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Mostrar todos os recursos se a pesquisa estiver vazia
            resourceCards.forEach(card => {
                card.style.display = 'flex';
            });
            
            // Mostrar todas as seções
            gradeSections.forEach(section => {
                section.style.display = 'block';
            });
            
            return;
        }
        
        // Ocultar todas as seções inicialmente
        gradeSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Filtrar recursos com base no termo de pesquisa
        let hasResults = false;
        
        resourceCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardTags = card.getAttribute('data-tags').toLowerCase();
            
            if (cardText.includes(searchTerm) || cardTags.includes(searchTerm)) {
                card.style.display = 'flex';
                // Mostrar a seção pai
                const parentSection = card.closest('.grade-section');
                if (parentSection) {
                    parentSection.style.display = 'block';
                }
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Exibir mensagem se não houver resultados
        if (!hasResults) {
            alert('Nenhum recurso encontrado para: ' + searchTerm);
            // Mostrar todos os recursos novamente
            resourceCards.forEach(card => {
                card.style.display = 'flex';
            });
            
            // Mostrar todas as seções
            gradeSections.forEach(section => {
                section.style.display = 'block';
            });
        }
    }
    
    // Evento de pesquisa
    searchBtn.addEventListener('click', searchResources);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchResources();
        }
    });
    
    // Filtrar por série
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Mostrar/ocultar seções com base no filtro
            gradeSections.forEach(section => {
                if (filter === 'all') {
                    section.style.display = 'block';
                } else {
                    if (section.id === 'grade-' + filter) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Adicionar efeito de hover aos cards
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});