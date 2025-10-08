// Dados dos serviços baseados na primeira imagem
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
        selected: true
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
            <span class="check-icon ${service.selected ? 'checked' : ''}" 
                  data-service-id="${service.id}">✓</span>
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

    // Event listeners para ícones de seleção
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('check-icon')) {
            const serviceId = parseInt(e.target.dataset.serviceId);
            toggleServiceSelection(serviceId);
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
            const totalValue = quantity > 0 ? 
                formatCurrency(service.unitValue * quantity) : 
                'Informe uma quantidade';
            
            totalCell.textContent = totalValue;
            totalCell.className = `total-value ${quantity === 0 ? 'zero' : ''}`;
        }
        
        updateTotalValue();
    }
}

function toggleServiceSelection(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (service) {
        service.selected = !service.selected;
        
        // Atualizar visual da linha
        const row = document.querySelector(`tr:has(input[data-service-id="${serviceId}"])`);
        const checkIcon = document.querySelector(`.check-icon[data-service-id="${serviceId}"]`);
        
        if (service.selected) {
            row.classList.add('selected');
            checkIcon.classList.add('checked');
        } else {
            row.classList.remove('selected');
            checkIcon.classList.remove('checked');
        }
        
        updateSelectedServices();
        updateTotalValue();
    }
}

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

    // Criar conteúdo do PDF
    const pdfContent = createPDFContent();
    
    // Gerar PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configurações do PDF
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('SISTEMA DE CONTRATAÇÃO DE SERVIÇOS TOPOGRÁFICOS', 20, 30);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Data: ' + new Date().toLocaleDateString('pt-BR'), 20, 45);
    doc.text('Valor Total: ' + formatCurrency(totalValue), 20, 55);
    
    // Tabela de serviços
    let yPosition = 70;
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    
    // Cabeçalho da tabela
    doc.text('Item', 20, yPosition);
    doc.text('Serviço', 30, yPosition);
    doc.text('Unidade', 120, yPosition);
    doc.text('Valor Un.', 150, yPosition);
    doc.text('Quantidade', 180, yPosition);
    doc.text('Valor Total', 200, yPosition);
    
    yPosition += 10;
    doc.setFont(undefined, 'normal');
    
    selectedServices.forEach((service, index) => {
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 30;
        }
        
        doc.text(service.id.toString(), 20, yPosition);
        doc.text(service.name, 30, yPosition);
        doc.text(service.unit, 120, yPosition);
        doc.text(formatCurrency(service.unitValue), 150, yPosition);
        doc.text(service.quantity.toString(), 180, yPosition);
        doc.text(formatCurrency(service.unitValue * service.quantity), 200, yPosition);
        
        yPosition += 8;
    });
    
    // Adicionar especificação técnica
    doc.addPage();
    yPosition = 30;
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('ESPECIFICAÇÃO TÉCNICA - BASES CARTOGRÁFICAS', 20, yPosition);
    
    yPosition += 20;
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
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 30;
        }
        
        if (line.trim()) {
            doc.text(line, 20, yPosition);
            yPosition += 6;
        } else {
            yPosition += 3;
        }
    });
    
    // Salvar PDF
    doc.save('contratacao-servicos-topograficos.pdf');
    
    // Restaurar botão
    generateBtn.innerHTML = originalText;
    generateBtn.disabled = false;
    
    alert('PDF gerado com sucesso!');
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

