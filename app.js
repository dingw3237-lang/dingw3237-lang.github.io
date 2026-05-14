let map;
let markers = [];
let data = null;

// 加载数据并初始化
async function init() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        renderContent();
        initMap();
        renderProjects();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// 渲染页面内容
function renderContent() {
    if (!data) return;

    // 个人介绍
    document.getElementById('intro-text').textContent = data.bio;
    document.getElementById('intro-text-en').textContent = data.bioEn;

    // 项目副标题
    document.getElementById('projects-subtitle').textContent = '每一个项目都是一次对空间、人与城市关系的深度探索';
    document.getElementById('projects-subtitle-en').textContent = 'Each project represents an exploration of the relationship between space, people, and the city';

    // 关于部分
    document.getElementById('about-title').textContent = data.about.title + ' | ' + data.about.titleEn;
    document.getElementById('about-content').textContent = data.about.content;
    document.getElementById('about-content-en').textContent = data.about.contentEn;
    document.getElementById('about-philosophy').textContent = data.about.philosophy;
    document.getElementById('about-philosophy-en').textContent = data.about.philosophyEn;

    // 联系部分
    document.getElementById('contact-title').textContent = data.contact.title + ' | ' + data.contact.titleEn;
    document.getElementById('contact-subtitle').textContent = data.contact.subtitle;
    document.getElementById('contact-subtitle-en').textContent = data.contact.subtitleEn;
    document.getElementById('contact-email').textContent = data.contact.email;
    document.getElementById('contact-phone').textContent = data.contact.phone;
}

// 初始化地图
function initMap() {
    map = L.map('map').setView([30.63, 104.07], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19,
    }).addTo(map);

    addMarkers();
}

// 创建自定义图标
function createCustomIcon(isActive) {
    const size = isActive ? 40 : 32;
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: ${size}px;
                height: ${size}px;
                background: ${isActive ? '#ffffff' : '#4a4a4a'};
                border: 2px solid ${isActive ? '#ffffff' : '#6a6a6a'};
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                cursor: pointer;
            ">
                <svg width="${isActive ? 20 : 16}px" height="${isActive ? 20 : 16}px" viewBox="0 0 24 24" fill="${isActive ? '#1a1a1a' : '#e5e5e5'}">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
    });
}

// 添加标记
function addMarkers() {
    if (!data || !data.projects) return;

    data.projects.forEach((project) => {
        const marker = L.marker(project.coordinates, {
            icon: createCustomIcon(false),
        }).addTo(map);

        marker.bindPopup(`
            <div style="font-family: 'Cormorant Garamond', 'Noto Serif SC', Georgia, serif; padding: 12px; min-width: 180px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 500; color: #ffffff;">${project.title}</h3>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #888888;">${project.location}</p>
                <p style="margin: 0; font-size: 12px; color: #a0a0a0;">${project.type} · ${project.year}</p>
            </div>
        `, {
            closeButton: false,
            offset: [0, -10],
        });

        marker.on('click', () => {
            openModal(project.id);
        });

        marker.on('mouseover', function () {
            this.openPopup();
        });

        marker.on('mouseout', function () {
            this.closePopup();
        });

        markers.push(marker);
    });
}

// 渲染项目卡片
function renderProjects() {
    if (!data || !data.projects) return;

    const grid = document.getElementById('projects-grid');
    grid.innerHTML = data.projects.map(project => `
        <div class="project-card" onclick="openModal('${project.id}')">
            <div class="project-card-header">
                <span class="project-type">${project.type}</span>
                <span class="project-year">${project.year}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-location">${project.location}</p>
            <p class="project-description">${project.description}</p>
            <p class="project-description-en">${project.typeEn}</p>
            <div class="project-card-footer">
                <span>查看详情 | VIEW DETAILS</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </div>
        </div>
    `).join('');
}

// 打开项目详情弹窗
function openModal(projectId) {
    const project = data.projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-meta">
                <span class="modal-type">${project.type}</span>
                <span class="modal-year">${project.year}</span>
            </div>
            <h1 class="modal-title">${project.title}</h1>
            <p class="modal-location">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" style="vertical-align: middle;">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                ${project.location}, Chengdu
            </p>
        </div>

        <div class="modal-grid">
            <div class="modal-details">
                <div class="modal-details-section">
                    <h3 class="modal-section-title">项目概述 | PROJECT OVERVIEW</h3>
                    <p class="modal-details-text">${project.details}</p>
                    <p class="modal-details-text-en">${project.detailsEn}</p>
                </div>

                <div class="modal-details-section">
                    <h3 class="modal-section-title">设计理念 | DESIGN PHILOSOPHY</h3>
                    <div class="modal-details-box">
                        <p class="modal-details-text">本项目在设计过程中始终坚持以人为本的原则，充分考虑使用者的需求与行为模式。</p>
                        <p class="modal-details-text-en">Throughout the design process, we adhere to people-oriented principles, fully considering user needs and behavioral patterns.</p>
                    </div>
                </div>

                <div class="modal-details-section">
                    <h3 class="modal-section-title">项目特色 | FEATURES</h3>
                    <div class="modal-features">
                        <div class="modal-feature">
                            <div class="modal-feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                            </div>
                            <h4 class="modal-feature-title">功能布局</h4>
                            <p class="modal-feature-text">科学合理的空间组织</p>
                        </div>
                        <div class="modal-feature">
                            <div class="modal-feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                </svg>
                            </div>
                            <h4 class="modal-feature-title">绿色可持续</h4>
                            <p class="modal-feature-text">践行绿色建筑理念</p>
                        </div>
                        <div class="modal-feature">
                            <div class="modal-feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                                </svg>
                            </div>
                            <h4 class="modal-feature-title">在地文化</h4>
                            <p class="modal-feature-text">融入地域特色</p>
                        </div>
                        <div class="modal-feature">
                            <div class="modal-feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h4 class="modal-feature-title">技术创新</h4>
                            <p class="modal-feature-text">运用先进技术手段</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-sidebar">
                <div class="modal-info-card">
                    <h3 class="modal-info-title">项目信息 | PROJECT INFO</h3>
                    <div class="modal-info-item">
                        <span class="modal-info-label">项目名称</span>
                        <span class="modal-info-value">${project.title}</span>
                    </div>
                    <div class="modal-info-item">
                        <span class="modal-info-label">项目类型</span>
                        <span class="modal-info-value">${project.type}</span>
                    </div>
                    <div class="modal-info-item">
                        <span class="modal-info-label">项目地点</span>
                        <span class="modal-info-value">${project.location}</span>
                    </div>
                    <div class="modal-info-item">
                        <span class="modal-info-label">完成年份</span>
                        <span class="modal-info-value">${project.year}</span>
                    </div>
                    <div class="modal-info-item">
                        <span class="modal-info-label">建筑面积</span>
                        <span class="modal-info-value">12,500 m²</span>
                    </div>
                </div>

                <div class="modal-info-card">
                    <div id="modal-map" class="modal-map"></div>
                </div>

                <div class="modal-info-card">
                    <h3 class="modal-info-title">位置 | LOCATION</h3>
                    <p style="color: #888888; font-size: 14px; margin-bottom: 12px;">${project.location}, Chengdu, China</p>
                    <p style="color: #6a6a6a; font-size: 12px; font-family: monospace;">${project.coordinates[0].toFixed(4)}, ${project.coordinates[1].toFixed(4)}</p>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 延迟初始化小地图
    setTimeout(() => {
        initModalMap(project);
    }, 100);
}

// 初始化弹窗中的小地图
function initModalMap(project) {
    const modalMap = L.map('modal-map').setView(project.coordinates, 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19,
    }).addTo(modalMap);

    const marker = L.marker(project.coordinates, {
        icon: createCustomIcon(true),
    }).addTo(modalMap);
}

// 关闭弹窗
function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 点击弹窗外部关闭
document.getElementById('project-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);