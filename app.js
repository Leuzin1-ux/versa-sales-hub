// ===================================================================
// VERSA SALES HUB — APPLICATION ENGINE
// ===================================================================

// ===================== TAB SWITCHING =====================
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    // Initialize tab content if needed
    if (tab === 'battlecards') showBattlecard('zscaler');
    if (tab === 'meddic') renderMEDDIC();
}

// ===================== PRE-CALL PREP GENERATOR =====================
function generatePrep(e) {
    e.preventDefault();

    const companyName = document.getElementById('companyName').value || 'the prospect';
    const industry = document.getElementById('industry').value;
    const numSites = document.getElementById('numSites').value;
    const remoteUsers = document.getElementById('remoteUsers').value;
    const personaTitle = document.getElementById('personaTitle').value;
    const department = document.getElementById('department').value;

    // Get selected vendors
    const vendors = Array.from(document.querySelectorAll('input[name="vendor"]:checked')).map(cb => cb.value);
    // Get selected use cases
    const usecases = Array.from(document.querySelectorAll('input[name="usecase"]:checked')).map(cb => cb.value);
    // Get cloud environments
    const clouds = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
        .filter(cb => ['aws','azure','gcp','private','hybrid'].includes(cb.value))
        .map(cb => cb.value);

    let html = '';

    // ===== EXECUTIVE SUMMARY =====
    html += buildSection('Executive Summary', 'fa-file-lines', null, buildExecutiveSummary(companyName, industry, numSites, remoteUsers, vendors, usecases, personaTitle));

    // ===== PERSONA-SPECIFIC GUIDANCE =====
    if (personaTitle && PERSONAS[personaTitle]) {
        html += buildSection(`Persona Briefing: ${PERSONAS[personaTitle].title}`, 'fa-user-tie', null, buildPersonaBriefing(personaTitle));
    }

    // ===== MEDDIC DISCOVERY QUESTIONS =====
    html += buildSection('MEDDIC Discovery Questions', 'fa-bullseye', null, buildMEDDICQuestions(industry, vendors, usecases, personaTitle));

    // ===== INDUSTRY-SPECIFIC INTEL =====
    if (industry && INDUSTRIES[industry]) {
        html += buildSection(`Industry Intel: ${INDUSTRIES[industry].name}`, INDUSTRIES[industry].icon, null, buildIndustryIntel(industry));
    }

    // ===== USE CASE DEEP DIVES =====
    if (usecases.length > 0) {
        html += buildSection('Use Case Discovery', 'fa-crosshairs', null, buildUseCaseIntel(usecases));
    }

    // ===== COMPETITIVE INTEL =====
    if (vendors.length > 0 && !vendors.includes('unknown')) {
        html += buildSection('Competitive Intelligence', 'fa-chess-knight', null, buildCompetitiveIntel(vendors));
    }

    // ===== CONSOLIDATION PLAY =====
    if (vendors.includes('unknown') || vendors.length === 0) {
        html += buildSection('Consolidation Play (Vendors Unknown)', 'fa-layer-group', null, buildConsolidationPlay());
    }

    // ===== VERSA PITCH =====
    html += buildSection('Versa Value Proposition', 'fa-gem', null, buildVersaPitch(industry, usecases, vendors, numSites, remoteUsers));

    // Show output
    document.getElementById('output-empty').style.display = 'none';
    const outputContent = document.getElementById('output-content');
    outputContent.style.display = 'block';
    outputContent.innerHTML = html;
}

function buildExecutiveSummary(company, industry, sites, remote, vendors, usecases, persona) {
    let summary = `<div class="pitch-card"><strong>Pre-Call Briefing for ${company}</strong><br><br>`;

    if (industry && INDUSTRIES[industry]) summary += `<strong>Industry:</strong> ${INDUSTRIES[industry].name}<br>`;
    if (sites) summary += `<strong>Sites:</strong> ${sites}<br>`;
    if (remote) summary += `<strong>Remote Users:</strong> ${remote}<br>`;
    if (vendors.length > 0) {
        const vendorNames = vendors.map(v => {
            if (COMPETITORS[v]) return COMPETITORS[v].name;
            if (v === 'legacy_vpn') return 'Legacy VPN';
            if (v === 'mpls') return 'MPLS Only';
            if (v === 'unknown') return 'Unknown (to discover)';
            return v;
        });
        summary += `<strong>Current Vendors:</strong> ${vendorNames.join(', ')}<br>`;
    }
    if (usecases.length > 0) {
        const ucNames = usecases.map(uc => USE_CASES[uc] ? USE_CASES[uc].name : uc);
        summary += `<strong>Use Cases:</strong> ${ucNames.join(', ')}<br>`;
    }
    if (persona && PERSONAS[persona]) summary += `<strong>Meeting With:</strong> ${PERSONAS[persona].title}<br>`;

    summary += `<br><strong>Key Objective:</strong> Discover pain points, map MEDDIC elements, and position Versa's unified SASE platform as the solution to consolidate and simplify their networking and security architecture.`;
    summary += `</div>`;

    // Sizing guidance
    if (sites || remote) {
        summary += `<div class="question-category">Sizing Considerations</div><ul>`;
        if (sites) {
            if (['101-500', '500+'].includes(sites)) {
                summary += `<li><span class="tag tag-blue">ENTERPRISE</span> ${sites} sites — this is a large enterprise deployment. Emphasize carrier-grade scalability, multi-tenancy, and Versa's service provider heritage. Reference Fortune 100 customer base.</li>`;
            } else if (['51-100'].includes(sites)) {
                summary += `<li><span class="tag tag-blue">MID-ENTERPRISE</span> ${sites} sites — strong fit for Versa's unified platform. Highlight single-console management and zero-touch provisioning for site deployment efficiency.</li>`;
            } else {
                summary += `<li><span class="tag tag-blue">MID-MARKET</span> ${sites} sites — focus on simplicity, TCO reduction, and consolidated management. Show how Versa replaces multiple vendors with one platform.</li>`;
            }
        }
        if (remote) {
            if (['2001-5000', '5000+'].includes(remote)) {
                summary += `<li><span class="tag tag-green">REMOTE</span> ${remote} remote users — ZTNA and VPN replacement are critical. Emphasize Versa ZTNA's AAA CyberRatings score and scalability vs. VPN concentrator bottlenecks.</li>`;
            } else {
                summary += `<li><span class="tag tag-green">REMOTE</span> ${remote} remote users — position ZTNA as part of the unified platform. No separate VPN product needed.</li>`;
            }
        }
        summary += `</ul>`;
    }

    return summary;
}

function buildPersonaBriefing(personaKey) {
    const p = PERSONAS[personaKey];
    let html = `<div class="pitch-card"><strong>You're meeting with a ${p.title}</strong> — here's how to approach this conversation:</div>`;
    html += `<div class="versa-strength">${p.talkTrack}</div>`;

    html += `<div class="question-category">What ${p.title}s Care About</div><ul>`;
    p.cares.forEach(c => html += `<li><strong>${c}</strong></li>`);
    html += `</ul>`;

    html += `<div class="question-category">Questions Tailored for ${p.title}</div><ul>`;
    p.questions.forEach(q => html += `<li>${q}</li>`);
    html += `</ul>`;

    return html;
}

function buildMEDDICQuestions(industry, vendors, usecases, persona) {
    let html = '';
    const sections = ['M', 'E', 'D1', 'D2', 'I', 'C'];

    sections.forEach(key => {
        const m = MEDDIC[key];
        html += `<div class="question-category"><span class="tag tag-blue">${m.letter}</span> ${m.name}</div>`;
        html += `<ul>`;

        // Pick most relevant questions (first 4-5)
        const questions = m.questions.slice(0, 5);
        questions.forEach(q => html += `<li>${q}</li>`);

        // Add contextual tip
        if (m.tips.length > 0) {
            html += `<li><span class="tag tag-yellow">TIP</span> ${m.tips[0]}</li>`;
        }
        html += `</ul>`;
    });

    return html;
}

function buildIndustryIntel(industryKey) {
    const ind = INDUSTRIES[industryKey];
    let html = '';

    html += `<div class="question-category">Compliance Requirements</div>`;
    html += `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">`;
    ind.compliance.forEach(c => html += `<span class="stat-box">${c}</span>`);
    html += `</div>`;

    html += `<div class="question-category">Industry Pain Points</div><ul>`;
    ind.painPoints.forEach(p => html += `<li>${p}</li>`);
    html += `</ul>`;

    html += `<div class="question-category">Industry-Specific Discovery Questions</div><ul>`;
    ind.discoveryQuestions.forEach(q => html += `<li>${q}</li>`);
    html += `</ul>`;

    html += `<div class="question-category">Versa Pitch for ${ind.name}</div>`;
    html += `<div class="versa-strength">${ind.versaPitch}</div>`;

    if (ind.customerProof.length > 0) {
        html += `<div class="question-category">Customer Proof Points</div>`;
        html += `<div style="display:flex;flex-wrap:wrap;gap:6px;">`;
        ind.customerProof.forEach(c => html += `<span class="stat-box"><i class="fas fa-check-circle" style="color:var(--versa-green)"></i> ${c}</span>`);
        html += `</div>`;
    }

    return html;
}

function buildUseCaseIntel(usecases) {
    let html = '';
    usecases.forEach(ucKey => {
        const uc = USE_CASES[ucKey];
        if (!uc) return;

        html += `<div class="question-category">${uc.name} — ${uc.description}</div>`;
        html += `<ul>`;
        uc.discoveryQuestions.slice(0, 6).forEach(q => html += `<li>${q}</li>`);
        html += `</ul>`;

        html += `<div style="margin-top:8px;margin-bottom:16px;">`;
        uc.versaValue.forEach(v => html += `<div class="versa-strength">${v}</div>`);
        html += `</div>`;
    });
    return html;
}

function buildCompetitiveIntel(vendors) {
    let html = '';
    vendors.forEach(vendorKey => {
        const comp = COMPETITORS[vendorKey];
        if (!comp) return;

        html += `<div class="question-category"><span class="tag tag-red">VS</span> ${comp.name}</div>`;
        html += `<div class="competitor-weakness"><strong>Summary:</strong> ${comp.summary}</div>`;

        html += `<div style="margin:10px 0 6px;font-size:12px;font-weight:600;color:var(--versa-red);">Key Weaknesses to Exploit</div>`;
        html += `<ul>`;
        comp.weaknesses.slice(0, 6).forEach(w => html += `<li><span class="tag tag-red">WEAK</span> ${w}</li>`);
        html += `</ul>`;

        html += `<div style="margin:10px 0 6px;font-size:12px;font-weight:600;color:var(--versa-green);">Versa Advantages</div>`;
        html += `<ul>`;
        comp.versaAdvantages.slice(0, 5).forEach(a => html += `<li><span class="tag tag-green">VERSA</span> ${a}</li>`);
        html += `</ul>`;

        html += `<div style="margin:10px 0 6px;font-size:12px;font-weight:600;color:var(--versa-light-blue);">Kill Questions (ask these on the call)</div>`;
        html += `<ul>`;
        comp.killQuestions.slice(0, 5).forEach(q => html += `<li>${q}</li>`);
        html += `</ul>`;

        // Security stats comparison
        if (comp.securityStats) {
            html += `<div style="display:flex;gap:10px;margin:10px 0;">`;
            html += `<span class="stat-box"><span class="stat-value">${comp.securityStats.versa.effectiveness}</span> Versa</span>`;
            if (comp.securityStats.competitor.effectiveness !== 'Not independently tested' && comp.securityStats.competitor.effectiveness !== 'Declined testing') {
                html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span> ${comp.name}</span>`;
            } else {
                html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span></span>`;
            }
            html += `</div>`;
        }

        // Analyst quotes
        if (comp.analystQuotes && comp.analystQuotes.length > 0) {
            html += `<div style="margin:10px 0 6px;font-size:12px;font-weight:600;color:var(--versa-yellow);">Analyst Ammunition</div>`;
            comp.analystQuotes.forEach(aq => {
                html += `<div class="pitch-card"><em>"${aq.quote}"</em><br><small>— ${aq.source}</small></div>`;
            });
        }
    });
    return html;
}

function buildConsolidationPlay() {
    let html = '';
    html += `<div class="versa-strength"><strong>Strategy:</strong> ${CONSOLIDATION_PLAY.approach}</div>`;

    CONSOLIDATION_PLAY.discoveryFlow.forEach(phase => {
        html += `<div class="question-category">${phase.phase}</div><ul>`;
        phase.questions.forEach(q => html += `<li>${q}</li>`);
        html += `</ul>`;
    });

    html += `<div class="question-category">Common Enterprise Stacks Versa Replaces</div>`;
    CONSOLIDATION_PLAY.commonStacks.forEach(stack => {
        html += `<div class="pitch-card">`;
        html += `<strong>${stack.name}:</strong><br>`;
        html += `<span class="tag tag-red">CURRENT</span> ${stack.vendors}<br>`;
        html += `<span class="tag tag-green">VERSA</span> ${stack.versaReplaces}`;
        html += `</div>`;
    });

    return html;
}

function buildVersaPitch(industry, usecases, vendors, sites, remote) {
    let html = '';

    html += `<div class="pitch-card">`;
    html += `<strong>Versa's Core Value Proposition</strong><br><br>`;
    html += `Versa delivers the industry's only <strong>true Unified SASE platform</strong> — SD-WAN, SSE, NGFW, and SD-LAN running on a single operating system (VOS) with a single management console. This means:<br><br>`;
    html += `<strong>1. Fewer Vendors</strong> — Replace 4-8 networking and security vendors with one platform<br>`;
    html += `<strong>2. Better Security</strong> — 99.90% security effectiveness, independently validated by CyberRatings.org<br>`;
    html += `<strong>3. Lower TCO</strong> — Dell achieved 130% ROI; Adobe saved $500K+<br>`;
    html += `<strong>4. Simpler Operations</strong> — One console, one policy, one team<br>`;
    html += `<strong>5. Deployment Flexibility</strong> — On-premises, cloud, hybrid, or sovereign`;
    html += `</div>`;

    html += `<div class="question-category">Third-Party Validation</div>`;
    html += `<div style="display:flex;flex-wrap:wrap;gap:8px;">`;
    html += `<span class="stat-box"><span class="stat-value">99.90%</span> Security Effectiveness (CyberRatings)</span>`;
    html += `<span class="stat-box"><span class="stat-value">5 Years</span> Gartner SD-WAN MQ Leader</span>`;
    html += `<span class="stat-box"><span class="stat-value">AAA</span> CyberRatings SSE Rating</span>`;
    html += `<span class="stat-box"><span class="stat-value">AAA</span> CyberRatings ZTNA Rating</span>`;
    html += `<span class="stat-box"><span class="stat-value">130%</span> ROI (Dell)</span>`;
    html += `<span class="stat-box"><span class="stat-value">120+</span> Service Providers</span>`;
    html += `<span class="stat-box"><span class="stat-value">5/5</span> Forrester Support Rating</span>`;
    html += `</div>`;

    return html;
}

// ===================== SECTION BUILDER HELPER =====================
function buildSection(title, icon, meddicLetter, body) {
    const id = 'section-' + Math.random().toString(36).substr(2, 9);
    return `
    <div class="output-section" id="${id}">
        <div class="output-section-header" onclick="toggleSection('${id}')">
            <h3><i class="fas ${icon}"></i> ${title}</h3>
            <i class="fas fa-chevron-down collapse-icon"></i>
        </div>
        <div class="output-section-body collapsible-body">
            ${body}
        </div>
    </div>`;
}

function toggleSection(id) {
    document.getElementById(id).classList.toggle('collapsed');
}

// ===================== LIVE CALL MODE =====================
let searchTimeout;

function handleLiveSearch(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(query), 200);
}

function quickSearch(term) {
    document.getElementById('liveSearch').value = term;
    performSearch(term);
}

function performSearch(query) {
    const results = document.getElementById('liveResults');
    if (!query || query.length < 2) {
        results.innerHTML = `<div class="live-empty"><i class="fas fa-bolt"></i><h3>Quick Intel at Your Fingertips</h3><p>Start typing or click a chip above to instantly pull up pain-point questions, objection handling, and competitive positioning.</p></div>`;
        return;
    }

    const q = query.toLowerCase().trim();
    let html = '';
    let found = false;

    // Search through the index
    for (const [key, entry] of Object.entries(SEARCH_INDEX)) {
        if (q.includes(key) || key.includes(q)) {
            found = true;

            if (entry.type === 'vendor') {
                html += renderVendorLiveResult(entry.key);
            } else if (entry.type === 'usecase') {
                html += renderUseCaseLiveResult(entry.key);
            } else if (entry.type === 'industry') {
                html += renderIndustryLiveResult(entry.key);
            } else if (entry.type === 'topic') {
                html += renderTopicLiveResult(entry);
            }
            break; // Show first match
        }
    }

    if (!found) {
        // Fuzzy search across all competitor weaknesses and questions
        html += fuzzySearch(q);
    }

    results.innerHTML = html || `<div class="live-empty"><i class="fas fa-search"></i><h3>No results for "${query}"</h3><p>Try: vendor name, use case (SD-WAN, SASE, VPN), industry, or security topic (CASB, DLP, IPS)</p></div>`;
}

function renderVendorLiveResult(vendorKey) {
    const comp = COMPETITORS[vendorKey];
    if (!comp) return '';

    let html = '';

    // Quick Stats
    html += `<div class="live-result-group"><h3><i class="fas fa-shield-halved"></i> ${comp.name} — Quick Reference</h3>`;
    html += `<div class="live-card"><h4>One-Line Summary</h4><p>${comp.summary}</p></div>`;

    if (comp.securityStats) {
        html += `<div class="live-card"><h4>Security Effectiveness Comparison</h4>`;
        html += `<div style="display:flex;gap:10px;flex-wrap:wrap;">`;
        html += `<span class="stat-box"><span class="stat-value">${comp.securityStats.versa.effectiveness}</span> Versa</span>`;
        html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span> ${comp.name}</span>`;
        html += `</div></div>`;
    }
    html += `</div>`;

    // Kill Questions
    html += `<div class="live-result-group"><h3><i class="fas fa-crosshairs"></i> Kill Questions — Ask These NOW</h3>`;
    comp.killQuestions.forEach(q => {
        html += `<div class="live-card">${q}</div>`;
    });
    html += `</div>`;

    // Top Weaknesses
    html += `<div class="live-result-group"><h3><i class="fas fa-bullseye"></i> Key Weaknesses</h3>`;
    html += `<div class="live-card"><ul>`;
    comp.weaknesses.slice(0, 7).forEach(w => html += `<li>${w}</li>`);
    html += `</ul></div></div>`;

    // Objection Handling
    html += `<div class="live-result-group"><h3><i class="fas fa-shield"></i> Objection Handling</h3>`;
    Object.entries(comp.objectionHandling).forEach(([objection, response]) => {
        html += `<div class="live-card">`;
        html += `<h4><span class="tag tag-red">OBJECTION</span> "${objection}"</h4>`;
        html += `<p><span class="tag tag-green">RESPONSE</span> ${response}</p>`;
        html += `</div>`;
    });
    html += `</div>`;

    // Analyst Quotes
    if (comp.analystQuotes && comp.analystQuotes.length > 0) {
        html += `<div class="live-result-group"><h3><i class="fas fa-quote-left"></i> Analyst Ammunition</h3>`;
        comp.analystQuotes.forEach(aq => {
            html += `<div class="live-card"><em>"${aq.quote}"</em><br><small style="color:var(--versa-yellow);">— ${aq.source}</small></div>`;
        });
        html += `</div>`;
    }

    // Feature Comparison
    html += `<div class="live-result-group"><h3><i class="fas fa-table"></i> Feature Comparison</h3>`;
    html += `<div class="live-card"><table class="bc-comparison-table"><tr><th>Capability</th><th>Versa</th><th>${comp.name}</th></tr>`;
    Object.entries(comp.categories).forEach(([cat, data]) => {
        const catName = cat === 'sdwan' ? 'SD-WAN' : cat === 'sse' ? 'SSE' : cat === 'ngfw' ? 'NGFW' : cat === 'sdlan' ? 'SD-LAN' : cat === 'deployment' ? 'Deployment' : 'Management';
        html += `<tr><td>${catName}</td><td>${data.versa}</td><td>${data.competitor}</td></tr>`;
    });
    html += `</table></div></div>`;

    return html;
}

function renderUseCaseLiveResult(ucKey) {
    const uc = USE_CASES[ucKey];
    if (!uc) return '';

    let html = `<div class="live-result-group"><h3><i class="fas fa-crosshairs"></i> ${uc.name} — ${uc.description}</h3>`;

    html += `<div class="live-card"><h4>Discovery Questions</h4><ul>`;
    uc.discoveryQuestions.forEach(q => html += `<li>${q}</li>`);
    html += `</ul></div>`;

    html += `<div class="live-card"><h4>Versa Value Points</h4><ul>`;
    uc.versaValue.forEach(v => html += `<li>${v}</li>`);
    html += `</ul></div>`;

    html += `</div>`;
    return html;
}

function renderIndustryLiveResult(indKey) {
    const ind = INDUSTRIES[indKey];
    if (!ind) return '';

    let html = `<div class="live-result-group"><h3><i class="fas ${ind.icon}"></i> ${ind.name}</h3>`;

    html += `<div class="live-card"><h4>Compliance Requirements</h4>`;
    html += `<div style="display:flex;flex-wrap:wrap;gap:6px;">`;
    ind.compliance.forEach(c => html += `<span class="stat-box">${c}</span>`);
    html += `</div></div>`;

    html += `<div class="live-card"><h4>Industry Pain Points</h4><ul>`;
    ind.painPoints.forEach(p => html += `<li>${p}</li>`);
    html += `</ul></div>`;

    html += `<div class="live-card"><h4>Industry-Specific Questions</h4><ul>`;
    ind.discoveryQuestions.forEach(q => html += `<li>${q}</li>`);
    html += `</ul></div>`;

    html += `<div class="live-card"><h4>Versa Pitch</h4><p>${ind.versaPitch}</p></div>`;

    html += `</div>`;
    return html;
}

function renderTopicLiveResult(entry) {
    let html = `<div class="live-result-group"><h3><i class="fas fa-info-circle"></i> ${entry.title}</h3>`;
    html += `<div class="live-card"><p style="white-space:pre-line;">${entry.content}</p></div>`;
    html += `</div>`;
    return html;
}

function fuzzySearch(query) {
    const words = query.split(/\s+/);
    let results = [];

    // Search competitor weaknesses
    Object.entries(COMPETITORS).forEach(([key, comp]) => {
        comp.weaknesses.forEach(w => {
            if (words.some(word => w.toLowerCase().includes(word))) {
                results.push({ type: 'weakness', vendor: comp.name, text: w });
            }
        });
        comp.killQuestions.forEach(q => {
            if (words.some(word => q.toLowerCase().includes(word))) {
                results.push({ type: 'question', vendor: comp.name, text: q });
            }
        });
    });

    // Search use case questions
    Object.entries(USE_CASES).forEach(([key, uc]) => {
        uc.discoveryQuestions.forEach(q => {
            if (words.some(word => q.toLowerCase().includes(word))) {
                results.push({ type: 'discovery', usecase: uc.name, text: q });
            }
        });
    });

    if (results.length === 0) return '';

    let html = `<div class="live-result-group"><h3><i class="fas fa-search"></i> Search Results for "${query}"</h3>`;
    results.slice(0, 15).forEach(r => {
        html += `<div class="live-card">`;
        if (r.type === 'weakness') {
            html += `<span class="tag tag-red">${r.vendor} Weakness</span> ${r.text}`;
        } else if (r.type === 'question') {
            html += `<span class="tag tag-blue">${r.vendor} Kill Question</span> ${r.text}`;
        } else {
            html += `<span class="tag tag-green">${r.usecase}</span> ${r.text}`;
        }
        html += `</div>`;
    });
    html += `</div>`;
    return html;
}

// ===================== BATTLECARDS TAB =====================
function showBattlecard(vendorKey) {
    // Update active state
    document.querySelectorAll('.bc-card').forEach(c => c.classList.remove('active'));
    const clickedCard = document.querySelector(`.bc-card[onclick*="${vendorKey}"]`);
    if (clickedCard) clickedCard.classList.add('active');

    const comp = COMPETITORS[vendorKey];
    if (!comp) return;

    let html = '';

    // Header
    html += `<div class="bc-section"><h3><i class="fas fa-shield-halved"></i> Versa vs. ${comp.name}</h3>`;
    html += `<div class="pitch-card">${comp.summary}</div></div>`;

    // Comparison Table
    html += `<div class="bc-section"><h3><i class="fas fa-table"></i> Feature Comparison</h3>`;
    html += `<table class="bc-comparison-table">`;
    html += `<tr><th>Capability</th><th>Versa</th><th>${comp.name}</th></tr>`;
    Object.entries(comp.categories).forEach(([cat, data]) => {
        const catName = { sdwan: 'SD-WAN', sse: 'SSE', ngfw: 'NGFW', sdlan: 'SD-LAN', deployment: 'Deployment', management: 'Management' }[cat] || cat;
        html += `<tr><td>${catName}</td><td>${data.versa}</td><td>${data.competitor}</td></tr>`;
    });
    html += `</table></div>`;

    // Security Stats
    html += `<div class="bc-section"><h3><i class="fas fa-chart-bar"></i> Security Effectiveness</h3>`;
    html += `<div style="display:flex;gap:12px;flex-wrap:wrap;">`;
    html += `<span class="stat-box"><span class="stat-value">${comp.securityStats.versa.effectiveness}</span> Versa</span>`;
    html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span> ${comp.name}</span>`;
    html += `</div></div>`;

    // Weaknesses
    html += `<div class="bc-section"><h3><i class="fas fa-bullseye"></i> ${comp.name} Weaknesses</h3>`;
    comp.weaknesses.forEach(w => html += `<div class="competitor-weakness">${w}</div>`);
    html += `</div>`;

    // Versa Advantages
    html += `<div class="bc-section"><h3><i class="fas fa-trophy"></i> Versa Advantages</h3>`;
    comp.versaAdvantages.forEach(a => html += `<div class="versa-strength">${a}</div>`);
    html += `</div>`;

    // Kill Questions
    html += `<div class="bc-section"><h3><i class="fas fa-crosshairs"></i> Kill Questions</h3>`;
    comp.killQuestions.forEach(q => {
        html += `<div class="live-card">${q}</div>`;
    });
    html += `</div>`;

    // Objection Handling
    html += `<div class="bc-section"><h3><i class="fas fa-comments"></i> Objection Handling</h3>`;
    Object.entries(comp.objectionHandling).forEach(([objection, response]) => {
        html += `<div class="live-card">`;
        html += `<h4><span class="tag tag-red">OBJECTION</span> "${objection}"</h4>`;
        html += `<p><span class="tag tag-green">RESPONSE</span> ${response}</p>`;
        html += `</div>`;
    });
    html += `</div>`;

    // Analyst Quotes
    html += `<div class="bc-section"><h3><i class="fas fa-quote-left"></i> Analyst Ammunition</h3>`;
    comp.analystQuotes.forEach(aq => {
        html += `<div class="pitch-card"><em>"${aq.quote}"</em><br><small style="color:var(--versa-yellow);">— ${aq.source}</small></div>`;
    });
    html += `</div>`;

    document.getElementById('bcContent').innerHTML = html;
}

// ===================== MEDDIC GUIDE TAB =====================
function renderMEDDIC() {
    const grid = document.getElementById('meddicGrid');
    if (grid.innerHTML) return; // Already rendered

    let html = '';
    const sections = ['M', 'E', 'D1', 'D2', 'I', 'C'];

    sections.forEach(key => {
        const m = MEDDIC[key];
        html += `
        <div class="meddic-card">
            <div class="meddic-card-header">
                <div class="meddic-letter-lg ${m.color}">${m.letter}</div>
                <div>
                    <h3>${m.name}</h3>
                    <p>${m.definition}</p>
                </div>
            </div>
            <div class="meddic-card-body">
                <h4>Why It Matters</h4>
                <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;">${m.whyItMatters}</p>

                <h4>Versa Context</h4>
                <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;">${m.versaContext}</p>

                <h4>Discovery Questions</h4>
                <ul>
                    ${m.questions.map(q => `<li>${q}</li>`).join('')}
                </ul>

                <h4>Pro Tips</h4>
                <ul>
                    ${m.tips.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    });

    grid.innerHTML = html;
}

// ===================== INITIALIZE =====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize battlecards tab content
    // Will be loaded when tab is clicked
});
