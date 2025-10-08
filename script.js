// Dados dos serviços baseados na imagem da ENGEMAP
const servicesData = [
    {
        id: 1,
        name: "Poligonal classe I P",
        unit: "Km",
        unitValue: 2579.65,
        quantity: 1200,
        selected: true
    },
    {
        id: 2,
        name: "Poligonal classe II P",
        unit: "Km",
        unitValue: 1934.74,
        quantity: 0,
        selected: false
    },
    {
        id: 3,
        name: "Poligonal classe III P",
        unit: "Km",
        unitValue: 1982.77,
        quantity: 0,
        selected: false
    },
    {
        id: 4,
        name: "Poligonal classe IV P",
        unit: "Km",
        unitValue: 4086.27,
        quantity: 0,
        selected: false
    },
    {
        id: 5,
        name: "Poligonal classe V P",
        unit: "Km",
        unitValue: 1500.00,
        quantity: 0,
        selected: false
    },
    {
        id: 6,
        name: "Nivelamento Geométrico 4 mm",
        unit: "Km",
        unitValue: 1200.50,
        quantity: 0,
        selected: false
    },
    {
        id: 7,
        name: "Nivelamento Geométrico classe I N",
        unit: "Km",
        unitValue: 1800.25,
        quantity: 0,
        selected: false
    },
    {
        id: 8,
        name: "Nivelamento Geométrico classe II N",
        unit: "Km",
        unitValue: 2200.75,
        quantity: 0,
        selected: false
    },
    {
        id: 9,
        name: "Levantamento topográfico planialtimétrico classe III PA",
        unit: "Ha",
        unitValue: 3500.00,
        quantity: 0,
        selected: false
    },
    {
        id: 10,
        name: "Levantamento topográfico planialtimétrico classe IV PA",
        unit: "Ha",
        unitValue: 2800.00,
        quantity: 0,
        selected: false
    },
    {
        id: 11,
        name: "Levantamento topográfico planialtimétrico cadastral classe I PAC",
        unit: "Ha",
        unitValue: 4200.00,
        quantity: 0,
        selected: false
    },
    {
        id: 12,
        name: "Levantamento topográfico planialtimétrico cadastral classe II PAC",
        unit: "Ha",
        unitValue: 3600.00,
        quantity: 0,
        selected: false
    },
    {
        id: 13,
        name: "Levantamento planialtimétrico cadastral utilizando metodologia I PAC",
        unit: "Ha",
        unitValue: 5000.00,
        quantity: 0,
        selected: false
    },
    {
        id: 14,
        name: "Levantamento planialtimétrico cadastral utilizando metodologia II PAC",
        unit: "Ha",
        unitValue: 4500.00,
        quantity: 0,
        selected: false
    },
    {
        id: 15,
        name: "Levantamento aerofotogramétrico classe I A",
        unit: "Ha",
        unitValue: 2800.00,
        quantity: 0,
        selected: false
    },
    {
        id: 16,
        name: "Levantamento aerofotogramétrico classe II A",
        unit: "Ha",
        unitValue: 2200.00,
        quantity: 0,
        selected: false
    },
    {
        id: 17,
        name: "Levantamento aerofotogramétrico classe III A",
        unit: "Ha",
        unitValue: 1800.00,
        quantity: 0,
        selected: false
    },
    {
        id: 18,
        name: "Levantamento aerofotogramétrico classe IV A",
        unit: "Ha",
        unitValue: 1500.00,
        quantity: 0,
        selected: false
    },
    {
        id: 19,
        name: "Levantamento aerofotogramétrico classe V A",
        unit: "Ha",
        unitValue: 1200.00,
        quantity: 0,
        selected: false
    },
    {
        id: 20,
        name: "Levantamento aerofotogramétrico classe VI A",
        unit: "Ha",
        unitValue: 1000.00,
        quantity: 0,
        selected: false
    },
    {
        id: 21,
        name: "Levantamento aerofotogramétrico classe VII A",
        unit: "Ha",
        unitValue: 800.00,
        quantity: 0,
        selected: false
    },
    {
        id: 22,
        name: "Levantamento aerofotogramétrico classe VIII A",
        unit: "Ha",
        unitValue: 600.00,
        quantity: 0,
        selected: false
    },
    {
        id: 23,
        name: "Levantamento aerofotogramétrico classe IX A",
        unit: "Ha",
        unitValue: 400.00,
        quantity: 0,
        selected: false
    },
    {
        id: 24,
        name: "Levantamento aerofotogramétrico classe X A",
        unit: "Ha",
        unitValue: 200.00,
        quantity: 0,
        selected: false
    },
    {
        id: 25,
        name: "Levantamento aerofotogramétrico classe XI A",
        unit: "Ha",
        unitValue: 100.00,
        quantity: 0,
        selected: false
    },
    {
        id: 26,
        name: "Levantamento aerofotogramétrico classe XII A",
        unit: "Ha",
        unitValue: 50.00,
        quantity: 0,
        selected: false
    },
    {
        id: 27,
        name: "Levantamento aerofotogramétrico classe XIII A",
        unit: "Ha",
        unitValue: 25.00,
        quantity: 0,
        selected: false
    },
    {
        id: 28,
        name: "Levantamento aerofotogramétrico classe XIV A",
        unit: "Ha",
        unitValue: 10.00,
        quantity: 0,
        selected: false
    },
    {
        id: 29,
        name: "Levantamento aerofotogramétrico classe XV A",
        unit: "Ha",
        unitValue: 5.00,
        quantity: 0,
        selected: false
    },
    {
        id: 30,
        name: "Levantamento aerofotogramétrico classe XVI A",
        unit: "Ha",
        unitValue: 2.50,
        quantity: 0,
        selected: false
    }
];

// Variáveis globais
let selectedServices = [];
let totalValue = 0;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderServicesTable();
    updateTotalValue();
    setupEventListeners();
}

function renderServicesTable() {
    const tbody = document.getElementById('servicesTableBody');
    tbody.innerHTML = '';

    servicesData.forEach(service => {
        const row = createServiceRow(service);
        tbody.appendChild(row);
    });
}

function createServiceRow(service) {
    const row = document.createElement('tr');
    if (service.selected) {
        row.classList.add('selected');
    }

    const totalValue = service.quantity > 0 ? 
        formatCurrency(service.unitValue * service.quantity) : 
        'Informe uma quantidade';

    // Só mostra o checkbox se a quantidade for maior que 0
    const checkIcon = service.quantity > 0 ? 
        `<span class="check-icon ${service.selected ? 'checked' : ''}" 
               data-service-id="${service.id}">✓</span>` : 
        '';

    row.innerHTML = `
        <td>${service.id}</td>
        <td>${service.name}</td>
        <td>${service.unit}</td>
        <td>${formatCurrency(service.unitValue)}</td>
        <td>
            <input type="number" 
                   class="quantity-input" 
                   value="${service.quantity}" 
                   min="0" 
                   step="0.01"
                   data-service-id="${service.id}">
        </td>
        <td class="total-value ${service.quantity === 0 ? 'zero' : ''}">${totalValue}</td>
        <td class="action-icons">
            ${checkIcon}
        </td>
    `;

    return row;
}

function setupEventListeners() {
    // Event listeners para inputs de quantidade
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const serviceId = parseInt(e.target.dataset.serviceId);
            const quantity = parseFloat(e.target.value) || 0;
            
            updateServiceQuantity(serviceId, quantity);
        }
    });

    // Event listeners para ícones de seleção (agora automático baseado na quantidade)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('check-icon')) {
            // O checkbox agora é apenas visual, a seleção é automática baseada na quantidade
            // Não precisa fazer nada aqui, pois a seleção é controlada pelo input de quantidade
        }
    });

    // Event listeners para botões
    document.getElementById('viewSpecBtn').addEventListener('click', openSpecModal);
    document.getElementById('finalizeBtn').addEventListener('click', openConfirmModal);
    document.getElementById('generatePdfBtn').addEventListener('click', generatePDF);

    // Event listeners para modais
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });

    document.getElementById('closeSpecModal').addEventListener('click', closeModals);
    document.getElementById('cancelConfirm').addEventListener('click', closeModals);
    document.getElementById('confirmContract').addEventListener('click', confirmContract);

    // Fechar modais clicando fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

function updateServiceQuantity(serviceId, quantity) {
    const service = servicesData.find(s => s.id === serviceId);
    if (service) {
        service.quantity = quantity;
        
        // Atualizar a linha da tabela
        const row = document.querySelector(`tr:has(input[data-service-id="${serviceId}"])`);
        if (row) {
            const totalCell = row.querySelector('.total-value');
            const actionCell = row.querySelector('.action-icons');
            
            const totalValue = quantity > 0 ? 
                formatCurrency(service.unitValue * quantity) : 
                'Informe uma quantidade';
            
            totalCell.textContent = totalValue;
            totalCell.className = `total-value ${quantity === 0 ? 'zero' : ''}`;
            
            // Se quantidade > 0, mostrar checkbox e marcar automaticamente
            if (quantity > 0) {
                service.selected = true;
                row.classList.add('selected');
                actionCell.innerHTML = `<span class="check-icon checked" data-service-id="${serviceId}">✓</span>`;
            } else {
                service.selected = false;
                row.classList.remove('selected');
                actionCell.innerHTML = '';
            }
        }
        
        updateTotalValue();
    }
}

// Função removida - a seleção agora é automática baseada na quantidade

function updateSelectedServices() {
    selectedServices = servicesData.filter(service => service.selected && service.quantity > 0);
    
    // Atualizar estado dos botões
    const hasSelectedServices = selectedServices.length > 0;
    document.getElementById('viewSpecBtn').disabled = !hasSelectedServices;
    document.getElementById('finalizeBtn').disabled = !hasSelectedServices;
    document.getElementById('generatePdfBtn').disabled = !hasSelectedServices;
}

function updateTotalValue() {
    totalValue = 0;
    
    servicesData.forEach(service => {
        if (service.selected && service.quantity > 0) {
            totalValue += service.unitValue * service.quantity;
        }
    });
    
    document.getElementById('totalValue').textContent = formatCurrency(totalValue);
    updateSelectedServices();
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function openSpecModal() {
    document.getElementById('specModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openConfirmModal() {
    const selectedServicesList = document.getElementById('selectedServicesList');
    selectedServicesList.innerHTML = '';
    
    selectedServices.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'selected-service-item';
        serviceItem.innerHTML = `
            <span>${service.name} - ${service.quantity} ${service.unit}</span>
            <span>${formatCurrency(service.unitValue * service.quantity)}</span>
        `;
        selectedServicesList.appendChild(serviceItem);
    });
    
    document.getElementById('finalTotalValue').textContent = formatCurrency(totalValue);
    document.getElementById('confirmModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function confirmContract() {
    // Simular confirmação da contratação
    alert('Contratação realizada com sucesso!\n\n' +
          `Total: ${formatCurrency(totalValue)}\n` +
          `Serviços: ${selectedServices.length}\n\n` +
          'Um e-mail de confirmação será enviado em breve.');
    
    closeModals();
    
    // Reset do sistema
    resetSystem();
}

function resetSystem() {
    servicesData.forEach(service => {
        service.quantity = 0;
        service.selected = false;
    });
    
    selectedServices = [];
    totalValue = 0;
    
    renderServicesTable();
    updateTotalValue();
    
    // Limpar dados do cliente
    document.getElementById('quotationNumber').value = 'ORC-2024-001';
    document.getElementById('contactName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('municipality').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('position').value = '';
    document.getElementById('cellContact').value = '';
    document.getElementById('address').value = '';
}

function generatePDF() {
    if (selectedServices.length === 0) {
        alert('Selecione pelo menos um serviço para gerar o PDF.');
        return;
    }

    // Mostrar loading
    const generateBtn = document.getElementById('generatePdfBtn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '⏳ Gerando PDF...';
    generateBtn.disabled = true;

    // Obter dados do cliente
    const clientData = getClientData();
    
    // Gerar PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header da empresa
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('ENGEMAP - ENGENHARIA E AEROLEVANTAMENTO Ltda', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(255, 102, 0);
    doc.text('Sistema Web de Orçamento - Saneamento', 20, 40);
    
    // Dados do cliente
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    let yPos = 60;
    doc.text(`Número Orçamento: ${clientData.quotationNumber}`, 20, yPos);
    doc.text(`Cliente: ${clientData.clientName}`, 120, yPos);
    yPos += 10;
    
    doc.text(`Nome Contato: ${clientData.contactName}`, 20, yPos);
    doc.text(`Cargo: ${clientData.position}`, 120, yPos);
    yPos += 10;
    
    doc.text(`Email: ${clientData.email}`, 20, yPos);
    doc.text(`Contato Cel: ${clientData.cellContact}`, 120, yPos);
    yPos += 10;
    
    doc.text(`Município: ${clientData.municipality}`, 20, yPos);
    doc.text(`Endereço: ${clientData.address}`, 120, yPos);
    yPos += 20;
    
    // Título dos serviços
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('SERVIÇOS GERAIS DE SANEAMENTO', 20, yPos);
    yPos += 15;
    
    // Tabela de serviços
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    
    // Cabeçalho da tabela
    doc.text('ITEM', 20, yPos);
    doc.text('SERVIÇO', 30, yPos);
    doc.text('UNIDADE', 120, yPos);
    doc.text('VALOR UN.', 150, yPos);
    doc.text('QUANTIDADE', 180, yPos);
    doc.text('VALOR TOTAL', 200, yPos);
    
    yPos += 8;
    doc.setFont(undefined, 'normal');
    
    selectedServices.forEach((service, index) => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 30;
        }
        
        doc.text(service.id.toString(), 20, yPos);
        doc.text(service.name, 30, yPos);
        doc.text(service.unit, 120, yPos);
        doc.text(formatCurrency(service.unitValue), 150, yPos);
        doc.text(service.quantity.toString(), 180, yPos);
        doc.text(formatCurrency(service.unitValue * service.quantity), 200, yPos);
        
        yPos += 6;
    });
    
    // Valor total
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('VALOR TOTAL: ' + formatCurrency(totalValue), 20, yPos);
    
    // Adicionar especificação técnica
    doc.addPage();
    yPos = 30;
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('ESPECIFICAÇÃO TÉCNICA - BASES CARTOGRÁFICAS', 20, yPos);
    
    yPos += 20;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    const specText = `
Item 1.1 - Especificações técnicas bases cartográficas

As proporções de crianças e jovens frequentando ou tendo completado determinados ciclos indicam a situação educacional entre a população em idade escolar e contribuem para o IDHM Educação.

PROPORÇÕES EDUCACIONAIS (2010):
• Proporção de crianças de 5 a 6 anos na escola: 96,31%
• Proporção de crianças de 11 a 13 anos frequentando os anos finais do ensino fundamental: 95,17%
• Proporção de jovens de 15 a 17 anos com ensino fundamental completo: 67,43%
• Proporção de jovens de 18 a 20 anos com ensino médio completo: 56,13%

EVOLUÇÃO TEMPORAL (1991-2010):
Essas proporções aumentaram significativamente entre 1991 e 2010:
• Primeira proporção (5-6 anos): aumento de 48,99 pontos percentuais
• Segunda proporção (11-13 anos): aumento de 64,61 pontos percentuais
• Terceira proporção (15-17 anos): aumento de 53,96 pontos percentuais
• Quarta proporção (18-20 anos): aumento de 56,13 pontos percentuais

DISTORÇÃO IDADE-SÉRIE NO ENSINO BÁSICO:
Em 2010, 89,47% da população de 6 a 17 anos do município estava matriculada no ensino básico regular com até dois anos de distorção idade-série.
• 2000: 74,47%
• 1991: 62,86%

MATRÍCULA NO ENSINO SUPERIOR:
Em 2010, 11,36% dos jovens de 18 a 24 anos cursavam o ensino superior.
• 2000: 2,42%
• 1991: 2,41%

O indicador "Expectativa de Anos de Estudo" sintetiza a frequência.
    `;
    
    const lines = specText.split('\n');
    lines.forEach(line => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 30;
        }
        
        if (line.trim()) {
            doc.text(line, 20, yPos);
            yPos += 6;
        } else {
            yPos += 3;
        }
    });
    
    // Salvar PDF
    doc.save('orcamento-engemap-saneamento.pdf');
    
    // Restaurar botão
    generateBtn.innerHTML = originalText;
    generateBtn.disabled = false;
    
    alert('PDF gerado com sucesso!');
}

function getClientData() {
    return {
        quotationNumber: document.getElementById('quotationNumber').value || 'N/A',
        contactName: document.getElementById('contactName').value || 'N/A',
        email: document.getElementById('email').value || 'N/A',
        municipality: document.getElementById('municipality').value || 'N/A',
        clientName: document.getElementById('clientName').value || 'N/A',
        position: document.getElementById('position').value || 'N/A',
        cellContact: document.getElementById('cellContact').value || 'N/A',
        address: document.getElementById('address').value || 'N/A'
    };
}

function createPDFContent() {
    return {
        title: 'Sistema de Contratação de Serviços Topográficos',
        date: new Date().toLocaleDateString('pt-BR'),
        totalValue: totalValue,
        services: selectedServices,
        specifications: 'Especificação técnica conforme Item 1.1 - Bases Cartográficas'
    };
}

// Função para animações suaves
function addAnimation(element, animationClass) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 500);
}

// Função para validação de entrada
function validateQuantityInput(input) {
    const value = parseFloat(input.value);
    if (value < 0) {
        input.value = 0;
    }
    if (value > 999999) {
        input.value = 999999;
    }
}

// Adicionar validação aos inputs
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('quantity-input')) {
        validateQuantityInput(e.target);
    }
});

// Função para notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar estilos para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

