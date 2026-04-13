// ===================================================================
// VERSA SALES HUB — APPLICATION ENGINE v1.1
// ===================================================================

let sectionCounter = 0;
let lastBattlecard = 'zscaler';

// ===================== UTILITY: Copy to Clipboard =====================
function copyToClipboard(btn) {
    const card = btn.closest('.copyable');
    if (!card) return;
    const text = card.querySelector('.copy-content')?.innerText || card.innerText;
    navigator.clipboard.writeText(text.trim()).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
            btn.classList.remove('copied');
        }, 1500);
    });
}

// Wrap content with a copy button
function withCopy(html, extraClass = '') {
    return `<div class="copyable ${extraClass}">${html}<button class="copy-btn" onclick="copyToClipboard(this)" title="Copy to clipboard"><i class="fas fa-copy"></i></button><div class="copy-content" style="display:none">${html}</div></div>`;
}

// ===================== ESCAPE HTML (XSS prevention) =====================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===================== TAB SWITCHING =====================
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    // Initialize tab content if needed
    if (tab === 'battlecards') showBattlecard(lastBattlecard);
    if (tab === 'meddic') renderMEDDIC();
    if (tab === 'live') document.getElementById('liveSearch')?.focus();

    // Update URL hash for deep linking
    history.replaceState(null, '', '#' + tab);
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
    const clouds = Array.from(document.querySelectorAll('.chip-group input[type="checkbox"]:checked'))
        .filter(cb => ['aws','azure','gcp','private','hybrid'].includes(cb.value))
        .map(cb => cb.value);

    let html = '';

    // Toolbar: Collapse All / Expand All + Print
    html += `<div class="output-toolbar">
        <button class="toolbar-btn" onclick="toggleAllSections(false)"><i class="fas fa-compress-alt"></i> Collapse All</button>
        <button class="toolbar-btn" onclick="toggleAllSections(true)"><i class="fas fa-expand-alt"></i> Expand All</button>
        <button class="toolbar-btn" onclick="window.print()"><i class="fas fa-print"></i> Print</button>
    </div>`;

    // ===== MEDDIC QUALIFICATION SCORE =====
    html += buildMEDDICScore(industry, vendors, usecases, personaTitle, numSites, remoteUsers);

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

    // Scroll output into view (critical on mobile)
    outputContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearForm() {
    document.getElementById('prep-form').reset();
    document.querySelectorAll('.chip:has(input:checked), .vendor-card:has(input:checked)').forEach(el => {
        el.querySelector('input').checked = false;
    });
    document.getElementById('output-empty').style.display = '';
    document.getElementById('output-content').style.display = 'none';
    document.getElementById('output-content').innerHTML = '';
}

function buildExecutiveSummary(company, industry, sites, remote, vendors, usecases, persona) {
    let summary = `<div class="pitch-card"><strong>Pre-Call Briefing for ${escapeHtml(company)}</strong><br><br>`;

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
    html += withCopy(`<div class="versa-strength">${p.talkTrack}</div>`);

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
        const allQuestions = m.questions;
        const showInitial = 5;
        const sectionId = 'meddic-qs-' + key;

        html += `<div class="question-category"><span class="tag tag-blue">${m.letter}</span> ${m.name}</div>`;
        html += `<ul>`;

        allQuestions.slice(0, showInitial).forEach(q => html += `<li>${q}</li>`);

        if (allQuestions.length > showInitial) {
            html += `</ul><div id="${sectionId}" class="more-questions" style="display:none;"><ul>`;
            allQuestions.slice(showInitial).forEach(q => html += `<li>${q}</li>`);
            html += `</ul></div>`;
            html += `<button class="show-more-btn" onclick="toggleMore('${sectionId}', this)">Show ${allQuestions.length - showInitial} more questions <i class="fas fa-chevron-down"></i></button>`;
        } else {
            html += `</ul>`;
        }

        // Add contextual tip
        if (m.tips.length > 0) {
            html += `<div class="tip-inline"><span class="tag tag-yellow">TIP</span> ${m.tips[0]}</div>`;
        }
    });

    return html;
}

function toggleMore(id, btn) {
    const el = document.getElementById(id);
    if (el.style.display === 'none') {
        el.style.display = 'block';
        btn.innerHTML = 'Show fewer <i class="fas fa-chevron-up"></i>';
    } else {
        el.style.display = 'none';
        const count = el.querySelectorAll('li').length;
        btn.innerHTML = `Show ${count} more questions <i class="fas fa-chevron-down"></i>`;
    }
}

function buildIndustryIntel(industryKey) {
    const ind = INDUSTRIES[industryKey];
    let html = '';

    html += `<div class="question-category">Compliance Requirements</div>`;
    html += `<div class="flex-wrap-gap">`;
    ind.compliance.forEach(c => html += `<span class="stat-box">${c}</span>`);
    html += `</div>`;

    html += `<div class="question-category">Industry Pain Points</div><ul>`;
    ind.painPoints.forEach(p => html += `<li>${p}</li>`);
    html += `</ul>`;

    html += `<div class="question-category">Industry-Specific Discovery Questions</div><ul>`;
    ind.discoveryQuestions.forEach(q => html += `<li>${q}</li>`);
    html += `</ul>`;

    html += `<div class="question-category">Versa Pitch for ${ind.name}</div>`;
    html += withCopy(`<div class="versa-strength">${ind.versaPitch}</div>`);

    if (ind.customerProof.length > 0) {
        html += `<div class="question-category">Customer Proof Points</div>`;
        html += `<div class="flex-wrap-gap">`;
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

        html += `<div class="uc-value-wrap">`;
        uc.versaValue.forEach(v => html += withCopy(`<div class="versa-strength">${v}</div>`));
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

        html += `<div class="sub-heading red">Key Weaknesses to Exploit</div>`;
        html += `<ul>`;
        comp.weaknesses.slice(0, 6).forEach(w => html += `<li><span class="tag tag-red">WEAK</span> ${w}</li>`);
        html += `</ul>`;

        html += `<div class="sub-heading green">Versa Advantages</div>`;
        html += `<ul>`;
        comp.versaAdvantages.slice(0, 5).forEach(a => html += `<li><span class="tag tag-green">VERSA</span> ${a}</li>`);
        html += `</ul>`;

        html += `<div class="sub-heading primary">Kill Questions (ask these on the call)</div>`;
        html += `<ul>`;
        comp.killQuestions.slice(0, 5).forEach(q => html += `<li>${q}</li>`);
        html += `</ul>`;

        // Security stats comparison
        if (comp.securityStats) {
            html += `<div class="flex-wrap-gap" style="margin:10px 0;">`;
            html += `<span class="stat-box"><span class="stat-value">${comp.securityStats.versa.effectiveness}</span> Versa ${comp.securityStats.versa.testName || ''}</span>`;
            if (comp.securityStats.competitor.effectiveness !== 'Not independently tested' && comp.securityStats.competitor.effectiveness !== 'Declined testing') {
                html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span> ${comp.name}</span>`;
            } else {
                html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span></span>`;
            }
            html += `</div>`;
        }

        // Analyst quotes
        if (comp.analystQuotes && comp.analystQuotes.length > 0) {
            html += `<div class="sub-heading yellow">Analyst Ammunition</div>`;
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

    html += withCopy(`<div class="pitch-card">
        <strong>Versa's Core Value Proposition</strong><br><br>
        Versa delivers the industry's only <strong>true Unified SASE platform</strong> — SD-WAN, SSE, NGFW, and SD-LAN running on a single operating system (VOS) with a single management console. This means:<br><br>
        <strong>1. Fewer Vendors</strong> — Replace 4-8 networking and security vendors with one platform<br>
        <strong>2. Better Security</strong> — #1 in CyberRatings.org Enterprise Firewall test, independently validated<br>
        <strong>3. Lower TCO</strong> — Dell achieved 130% ROI; Adobe saved $500K+<br>
        <strong>4. Simpler Operations</strong> — One console, one policy, one team<br>
        <strong>5. Deployment Flexibility</strong> — On-premises, cloud, hybrid, or sovereign
    </div>`);

    html += `<div class="question-category">Third-Party Validation</div>`;
    html += `<div class="flex-wrap-gap">`;
    html += `<span class="stat-box"><span class="stat-value">99.98%</span> Enterprise Firewall (CyberRatings)</span>`;
    html += `<span class="stat-box"><span class="stat-value">99.90%</span> NGFW Effectiveness (CyberRatings)</span>`;
    html += `<span class="stat-box"><span class="stat-value">5 Years</span> Gartner SD-WAN MQ Leader</span>`;
    html += `<span class="stat-box"><span class="stat-value">AAA</span> CyberRatings SSE Rating</span>`;
    html += `<span class="stat-box"><span class="stat-value">AAA</span> CyberRatings ZTNA Rating</span>`;
    html += `<span class="stat-box"><span class="stat-value">130%</span> ROI (Dell)</span>`;
    html += `<span class="stat-box"><span class="stat-value">120+</span> Service Providers</span>`;
    html += `<span class="stat-box"><span class="stat-value">5/5</span> Forrester Support Rating</span>`;
    html += `</div>`;

    // Overcoming Objections About Versa
    if (typeof VERSA_OBJECTIONS !== 'undefined') {
        html += `<div class="question-category">Overcoming Objections About Versa</div>`;
        Object.entries(VERSA_OBJECTIONS).forEach(([objection, response]) => {
            html += withCopy(`<div class="live-card">
                <h4><span class="tag tag-red">OBJECTION</span> "${objection}"</h4>
                <p><span class="tag tag-green">RESPONSE</span> ${response}</p>
            </div>`);
        });
    }

    return html;
}

// ===================== SECTION BUILDER HELPER =====================
function buildSection(title, icon, meddicLetter, body) {
    sectionCounter++;
    const id = 'section-' + sectionCounter;
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

function toggleAllSections(expand) {
    document.querySelectorAll('.output-section').forEach(sec => {
        if (expand) {
            sec.classList.remove('collapsed');
        } else {
            sec.classList.add('collapsed');
        }
    });
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
        results.innerHTML = `<div class="live-empty">
            <div class="empty-icon-ring"><i class="fas fa-bolt"></i></div>
            <h3>Quick Intel at Your Fingertips</h3>
            <p>Start typing or click a chip above to instantly pull up pain-point questions, objection handling, and competitive positioning.</p>
        </div>`;
        return;
    }

    const q = query.toLowerCase().trim();
    let html = '';
    let found = false;
    const rendered = new Set(); // Prevent duplicate results

    // Search through the index — show ALL matches, not just the first
    for (const [key, entry] of Object.entries(SEARCH_INDEX)) {
        if (q.includes(key) || key.includes(q)) {
            const entryId = entry.type + '-' + (entry.key || entry.title);
            if (rendered.has(entryId)) continue;
            rendered.add(entryId);
            found = true;

            if (entry.type === 'vendor') {
                html += renderVendorLiveResult(entry.key);
            } else if (entry.type === 'usecase') {
                html += renderUseCaseLiveResult(entry.key);
            } else if (entry.type === 'industry') {
                html += renderIndustryLiveResult(entry.key);
            } else if (entry.type === 'topic') {
                html += renderTopicLiveResult(entry);
            } else if (entry.type === 'persona') {
                html += renderPersonaLiveResult(entry.key);
            }
        }
    }

    if (!found) {
        // Fuzzy search across all competitor weaknesses and questions
        html += fuzzySearch(q);
    }

    const safeQuery = escapeHtml(query);
    results.innerHTML = html || `<div class="live-empty">
        <div class="empty-icon-ring"><i class="fas fa-search"></i></div>
        <h3>No results for "${safeQuery}"</h3>
        <p>Try: vendor name, use case (SD-WAN, SASE, VPN), industry, or security topic (CASB, DLP, IPS)</p>
    </div>`;
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
        html += `<div class="flex-wrap-gap">`;
        html += `<span class="stat-box"><span class="stat-value">${comp.securityStats.versa.effectiveness}</span> Versa ${comp.securityStats.versa.testName || ''}</span>`;
        html += `<span class="stat-box"><span class="stat-vs">${comp.securityStats.competitor.effectiveness}</span> ${comp.name}</span>`;
        html += `</div></div>`;
    }
    html += `</div>`;

    // Kill Questions — with copy buttons
    html += `<div class="live-result-group"><h3><i class="fas fa-crosshairs"></i> Kill Questions — Ask These NOW</h3>`;
    comp.killQuestions.forEach(q => {
        html += withCopy(`<div class="live-card">${q}</div>`);
    });
    html += `</div>`;

    // Top Weaknesses
    html += `<div class="live-result-group"><h3><i class="fas fa-bullseye"></i> Key Weaknesses</h3>`;
    html += `<div class="live-card"><ul>`;
    comp.weaknesses.slice(0, 7).forEach(w => html += `<li>${w}</li>`);
    html += `</ul></div></div>`;

    // Objection Handling — with copy buttons
    html += `<div class="live-result-group"><h3><i class="fas fa-shield"></i> Objection Handling</h3>`;
    Object.entries(comp.objectionHandling).forEach(([objection, response]) => {
        html += withCopy(`<div class="live-card">
            <h4><span class="tag tag-red">OBJECTION</span> "${objection}"</h4>
            <p><span class="tag tag-green">RESPONSE</span> ${response}</p>
        </div>`);
    });
    html += `</div>`;

    // Analyst Quotes
    if (comp.analystQuotes && comp.analystQuotes.length > 0) {
        html += `<div class="live-result-group"><h3><i class="fas fa-quote-left"></i> Analyst Ammunition</h3>`;
        comp.analystQuotes.forEach(aq => {
            html += withCopy(`<div class="live-card"><em>"${aq.quote}"</em><br><small class="analyst-source">— ${aq.source}</small></div>`);
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
    html += `<div class="flex-wrap-gap">`;
    ind.compliance.forEach(c => html += `<span class="stat-box">${c}</span>`);
    html += `</div></div>`;

    html += `<div class="live-card"><h4>Industry Pain Points</h4><ul>`;
    ind.painPoints.forEach(p => html += `<li>${p}</li>`);
    html += `</ul></div>`;

    html += `<div class="live-card"><h4>Industry-Specific Questions</h4><ul>`;
    ind.discoveryQuestions.forEach(q => html += `<li>${q}</li>`);
    html += `</ul></div>`;

    html += withCopy(`<div class="live-card"><h4>Versa Pitch</h4><p>${ind.versaPitch}</p></div>`);

    html += `</div>`;
    return html;
}

function renderTopicLiveResult(entry) {
    let html = `<div class="live-result-group"><h3><i class="fas fa-info-circle"></i> ${entry.title}</h3>`;
    html += withCopy(`<div class="live-card"><p style="white-space:pre-line;">${entry.content}</p></div>`);
    html += `</div>`;
    return html;
}

function renderPersonaLiveResult(key) {
    const p = PERSONAS[key];
    if (!p) return '';
    let html = `<div class="live-result-group"><h3><i class="fas fa-user-tie"></i> Persona: ${p.title}</h3>`;
    html += withCopy(`<div class="live-card">
        <p><strong>Level:</strong> ${p.level.charAt(0).toUpperCase() + p.level.slice(1)} | <strong>Focus:</strong> ${p.focus.charAt(0).toUpperCase() + p.focus.slice(1)}</p>
        <p><strong>What they care about:</strong> ${p.cares.join(', ')}</p>
        <p><strong>Talk Track:</strong> ${p.talkTrack}</p>
        <p><strong>Discovery Questions:</strong></p>
        <ul>${p.questions.map(q => `<li>${q}</li>`).join('')}</ul>
    </div>`);
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
        // Also search objection handling
        Object.entries(comp.objectionHandling).forEach(([obj, resp]) => {
            if (words.some(word => obj.toLowerCase().includes(word) || resp.toLowerCase().includes(word))) {
                results.push({ type: 'objection', vendor: comp.name, objection: obj, response: resp });
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

    // Search Versa objections
    if (typeof VERSA_OBJECTIONS !== 'undefined') {
        Object.entries(VERSA_OBJECTIONS).forEach(([obj, resp]) => {
            if (words.some(word => obj.toLowerCase().includes(word) || resp.toLowerCase().includes(word))) {
                results.push({ type: 'versa-objection', objection: obj, response: resp });
            }
        });
    }

    if (results.length === 0) return '';

    const safeQuery = escapeHtml(query);
    let html = `<div class="live-result-group"><h3><i class="fas fa-search"></i> Search Results for "${safeQuery}"</h3>`;
    results.slice(0, 20).forEach(r => {
        if (r.type === 'weakness') {
            html += `<div class="live-card"><span class="tag tag-red">${r.vendor} Weakness</span> ${r.text}</div>`;
        } else if (r.type === 'question') {
            html += withCopy(`<div class="live-card"><span class="tag tag-blue">${r.vendor} Kill Question</span> ${r.text}</div>`);
        } else if (r.type === 'objection' || r.type === 'versa-objection') {
            html += withCopy(`<div class="live-card">
                <h4><span class="tag tag-red">OBJECTION</span> "${r.objection}"</h4>
                <p><span class="tag tag-green">RESPONSE</span> ${r.response}</p>
            </div>`);
        } else {
            html += `<div class="live-card"><span class="tag tag-green">${r.usecase}</span> ${r.text}</div>`;
        }
    });
    html += `</div>`;
    return html;
}

// ===================== BATTLECARDS TAB =====================
function showBattlecard(vendorKey) {
    lastBattlecard = vendorKey;

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

    // Security Stats — handle "Declined testing" / "Not independently tested"
    if (comp.securityStats) {
        html += `<div class="bc-section"><h3><i class="fas fa-chart-bar"></i> Security Effectiveness</h3>`;
        html += `<div class="flex-wrap-gap">`;
        html += `<span class="stat-box"><span class="stat-value">${comp.securityStats.versa.effectiveness}</span> Versa ${comp.securityStats.versa.testName || ''}</span>`;
        const compEff = comp.securityStats.competitor.effectiveness;
        if (compEff !== 'Not independently tested' && compEff !== 'Declined testing') {
            html += `<span class="stat-box"><span class="stat-vs">${compEff}</span> ${comp.name}</span>`;
        } else {
            html += `<span class="stat-box"><span style="color:var(--text-muted);font-style:italic;font-size:12px;">${compEff}</span></span>`;
        }
        html += `</div></div>`;
    }

    // Weaknesses
    html += `<div class="bc-section"><h3><i class="fas fa-bullseye"></i> ${comp.name} Weaknesses</h3>`;
    comp.weaknesses.forEach(w => html += `<div class="competitor-weakness">${w}</div>`);
    html += `</div>`;

    // Versa Advantages
    html += `<div class="bc-section"><h3><i class="fas fa-trophy"></i> Versa Advantages</h3>`;
    comp.versaAdvantages.forEach(a => html += `<div class="versa-strength">${a}</div>`);
    html += `</div>`;

    // Kill Questions — with copy
    html += `<div class="bc-section"><h3><i class="fas fa-crosshairs"></i> Kill Questions</h3>`;
    comp.killQuestions.forEach(q => {
        html += withCopy(`<div class="live-card">${q}</div>`);
    });
    html += `</div>`;

    // Objection Handling — with copy
    html += `<div class="bc-section"><h3><i class="fas fa-comments"></i> Objection Handling</h3>`;
    Object.entries(comp.objectionHandling).forEach(([objection, response]) => {
        html += withCopy(`<div class="live-card">
            <h4><span class="tag tag-red">OBJECTION</span> "${objection}"</h4>
            <p><span class="tag tag-green">RESPONSE</span> ${response}</p>
        </div>`);
    });
    html += `</div>`;

    // Analyst Quotes
    html += `<div class="bc-section"><h3><i class="fas fa-quote-left"></i> Analyst Ammunition</h3>`;
    comp.analystQuotes.forEach(aq => {
        html += withCopy(`<div class="pitch-card"><em>"${aq.quote}"</em><br><small class="analyst-source">— ${aq.source}</small></div>`);
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
                <p>${m.whyItMatters}</p>

                <h4>Versa Context</h4>
                <p>${m.versaContext}</p>

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

// ===================== MEDDIC QUALIFICATION SCORE =====================
function buildMEDDICScore(industry, vendors, usecases, personaTitle, numSites, remoteUsers) {
    const elements = [
        { key: 'M', name: 'Metrics', filled: !!(numSites || remoteUsers) },
        { key: 'E', name: 'Economic Buyer', filled: !!personaTitle && ['ciso','cio','vp_it'].includes(personaTitle) },
        { key: 'D', name: 'Decision Criteria', filled: !!(usecases.length > 0) },
        { key: 'D', name: 'Decision Process', filled: !!(industry) },
        { key: 'I', name: 'Identify Pain', filled: !!(vendors.length > 0 && !vendors.every(v => v === 'unknown')) },
        { key: 'C', name: 'Champion', filled: !!personaTitle }
    ];
    const colors = ['#2563eb','#7c3aed','#0891b2','#0d9488','#dc2626','#ea580c'];
    const filledCount = elements.filter(e => e.filled).length;
    const missing = elements.filter(e => !e.filled).map(e => e.name);

    let html = `<div class="meddic-score"><div class="score-meter">`;
    elements.forEach((el, i) => {
        html += `<div class="score-dot ${el.filled ? 'filled' : 'empty'}" style="background:${colors[i]}" title="${el.name}">${'MEDDIC'[i]}</div>`;
    });
    html += `</div><div class="score-text"><strong>MEDDIC Coverage: ${filledCount}/6</strong>`;
    if (missing.length > 0 && missing.length < 6) {
        html += `<br>Gaps to discover: ${missing.join(', ')}`;
    } else if (missing.length === 0) {
        html += `<br>Full qualification — strong deal positioning!`;
    }
    html += `</div></div>`;
    return html;
}

// ===================== SAVE / LOAD PROFILES =====================
function getProfiles() {
    try { return JSON.parse(localStorage.getItem('versaProfiles') || '{}'); } catch { return {}; }
}

function refreshProfileDropdown() {
    const select = document.getElementById('savedProfiles');
    const profiles = getProfiles();
    select.innerHTML = '<option value="">Load Saved Profile...</option>';
    Object.keys(profiles).sort().forEach(name => {
        select.innerHTML += `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`;
    });
}

function saveProfile() {
    const company = document.getElementById('companyName').value.trim();
    if (!company) { alert('Enter a Company Name first.'); return; }

    const profile = {
        companyName: company,
        industry: document.getElementById('industry').value,
        numSites: document.getElementById('numSites').value,
        remoteUsers: document.getElementById('remoteUsers').value,
        personaTitle: document.getElementById('personaTitle').value,
        department: document.getElementById('department').value,
        vendors: Array.from(document.querySelectorAll('input[name="vendor"]:checked')).map(cb => cb.value),
        usecases: Array.from(document.querySelectorAll('input[name="usecase"]:checked')).map(cb => cb.value),
        clouds: Array.from(document.querySelectorAll('.chip-group input[type="checkbox"]:checked'))
            .filter(cb => ['aws','azure','gcp','private','hybrid'].includes(cb.value)).map(cb => cb.value)
    };

    const profiles = getProfiles();
    profiles[company] = profile;
    localStorage.setItem('versaProfiles', JSON.stringify(profiles));
    refreshProfileDropdown();
    document.getElementById('savedProfiles').value = company;
}

function loadProfile(name) {
    if (!name) return;
    const profiles = getProfiles();
    const p = profiles[name];
    if (!p) return;

    document.getElementById('companyName').value = p.companyName || '';
    document.getElementById('industry').value = p.industry || '';
    document.getElementById('numSites').value = p.numSites || '';
    document.getElementById('remoteUsers').value = p.remoteUsers || '';
    document.getElementById('personaTitle').value = p.personaTitle || '';
    document.getElementById('department').value = p.department || '';

    // Reset all checkboxes first
    document.querySelectorAll('input[name="vendor"], input[name="usecase"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.chip-group input[type="checkbox"]').forEach(cb => {
        if (['aws','azure','gcp','private','hybrid'].includes(cb.value)) cb.checked = false;
    });

    // Set saved values
    (p.vendors || []).forEach(v => { const cb = document.querySelector(`input[name="vendor"][value="${v}"]`); if (cb) cb.checked = true; });
    (p.usecases || []).forEach(v => { const cb = document.querySelector(`input[name="usecase"][value="${v}"]`); if (cb) cb.checked = true; });
    (p.clouds || []).forEach(v => {
        const cb = document.querySelector(`.chip-group input[value="${v}"]`);
        if (cb) cb.checked = true;
    });
}

function deleteProfile() {
    const select = document.getElementById('savedProfiles');
    const name = select.value;
    if (!name) { alert('Select a profile to delete.'); return; }
    if (!confirm(`Delete profile "${name}"?`)) return;

    const profiles = getProfiles();
    delete profiles[name];
    localStorage.setItem('versaProfiles', JSON.stringify(profiles));
    refreshProfileDropdown();
}

// ===================== POST-CALL: FOLLOW-UP GENERATOR =====================
let lastPrepData = null;

function generatePostCall() {
    const notes = document.getElementById('callNotes').value.trim();
    const nextStepsText = document.getElementById('nextSteps').value.trim();

    // Pull context from the last prep (if available) or from the form
    const company = document.getElementById('companyName').value || 'the prospect';
    const industry = document.getElementById('industry').value;
    const persona = document.getElementById('personaTitle').value;
    const vendors = Array.from(document.querySelectorAll('input[name="vendor"]:checked')).map(cb => cb.value);

    const personaName = persona && PERSONAS[persona] ? PERSONAS[persona].title : 'the team';
    const industryName = industry && INDUSTRIES[industry] ? INDUSTRIES[industry].name : '';
    const vendorNames = vendors.map(v => COMPETITORS[v] ? COMPETITORS[v].name : v).filter(v => v !== 'unknown' && v !== 'legacy_vpn' && v !== 'mpls');

    let html = '';

    // ===== FOLLOW-UP EMAIL =====
    let email = `Hi [First Name],\n\nThank you for taking the time to speak with ${personaName !== 'the team' ? 'me' : 'us'} today about ${escapeHtml(company)}'s ${industryName ? industryName + ' ' : ''}networking and security strategy.\n\n`;

    if (notes) {
        email += `Based on our conversation, I understand that:\n`;
        notes.split(/[.\n]/).filter(s => s.trim()).forEach(point => {
            email += `• ${point.trim()}\n`;
        });
        email += `\n`;
    }

    email += `Versa's Unified SASE platform is uniquely positioned to help ${escapeHtml(company)} consolidate networking and security into a single platform — reducing complexity, improving security posture, and lowering total cost of ownership.\n\n`;

    if (vendorNames.length > 0) {
        email += `As we discussed regarding your current ${vendorNames.join(' and ')} environment, Versa offers a truly unified alternative with independently validated security (99.98% effectiveness by CyberRatings.org) and 5 consecutive years as a Gartner SD-WAN MQ Leader.\n\n`;
    }

    if (nextStepsText) {
        email += `Proposed Next Steps:\n`;
        nextStepsText.split(/[,.\n]/).filter(s => s.trim()).forEach((step, i) => {
            email += `${i + 1}. ${step.trim()}\n`;
        });
        email += `\n`;
    }

    email += `I'll follow up to schedule our next conversation. In the meantime, please don't hesitate to reach out with any questions.\n\nBest regards,\n[Your Name]\n[Your Title] | Versa Networks`;

    html += buildFollowUpSection('Follow-Up Email', 'fa-envelope', email);

    // ===== CRM NOTES =====
    let crm = `ACCOUNT: ${escapeHtml(company)}`;
    if (industryName) crm += `\nINDUSTRY: ${industryName}`;
    if (personaName !== 'the team') crm += `\nCONTACT ROLE: ${personaName}`;
    if (vendorNames.length > 0) crm += `\nINCUMBENT: ${vendorNames.join(', ')}`;
    crm += `\nDATE: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`;
    crm += `\nTYPE: Discovery Call\n`;

    crm += `\n--- CALL SUMMARY ---`;
    if (notes) {
        crm += `\n${notes}`;
    } else {
        crm += `\n[Add call notes here]`;
    }

    crm += `\n\n--- MEDDIC STATUS ---`;
    crm += `\nMetrics: ${document.getElementById('numSites').value ? 'Sites: ' + document.getElementById('numSites').value : '[TBD]'}`;
    crm += `\nEconomic Buyer: ${persona && ['ciso','cio','vp_it'].includes(persona) ? personaName + ' (confirmed)' : '[To identify]'}`;
    crm += `\nDecision Criteria: ${document.querySelectorAll('input[name="usecase"]:checked').length > 0 ? 'Identified' : '[To discover]'}`;
    crm += `\nDecision Process: [To map]`;
    crm += `\nIdentify Pain: ${notes ? 'Captured in notes above' : '[To discover]'}`;
    crm += `\nChampion: ${persona ? personaName + ' (potential)' : '[To identify]'}`;

    if (nextStepsText) {
        crm += `\n\n--- NEXT STEPS ---`;
        nextStepsText.split(/[,.\n]/).filter(s => s.trim()).forEach(step => {
            crm += `\n☐ ${step.trim()}`;
        });
    }

    html += buildFollowUpSection('CRM Notes (Salesforce/HubSpot)', 'fa-database', crm);

    // ===== NEXT MEETING AGENDA =====
    let agenda = `FOLLOW-UP MEETING AGENDA — ${escapeHtml(company)}\n`;
    agenda += `Date: [TBD]\nAttendees: [Names]\n\n`;
    agenda += `1. RECAP (5 min)\n   • Review key takeaways from discovery call\n   • Confirm understanding of current challenges\n\n`;

    if (vendorNames.length > 0) {
        agenda += `2. COMPETITIVE COMPARISON (10 min)\n   • Side-by-side: Versa vs. ${vendorNames.join(' / ')}\n   • CyberRatings security effectiveness data\n   • Architecture differences (unified vs. stitched)\n\n`;
    } else {
        agenda += `2. SOLUTION OVERVIEW (10 min)\n   • VersaONE platform deep-dive\n   • Deployment options and architecture\n\n`;
    }

    agenda += `3. USE CASE DEEP DIVE (15 min)\n   • Address specific requirements identified in discovery\n   • Demo relevant capabilities\n\n`;
    agenda += `4. BUSINESS CASE & ROI (10 min)\n   • TCO comparison and consolidation savings\n   • Customer proof points (Dell 130% ROI, Adobe $500K+)\n\n`;
    agenda += `5. NEXT STEPS & TIMELINE (5 min)\n   • POC planning (if appropriate)\n   • Stakeholder mapping\n   • Decision timeline alignment`;

    html += buildFollowUpSection('Next Meeting Agenda', 'fa-calendar-check', agenda);

    // Show output
    document.querySelector('#tab-postcall .output-empty').style.display = 'none';
    const content = document.getElementById('postcall-content');
    content.style.display = 'block';
    content.innerHTML = html;
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildFollowUpSection(title, icon, body) {
    const id = 'followup-' + (++sectionCounter);
    return `
    <div class="followup-section" id="${id}">
        <div class="followup-header">
            <h3><i class="fas ${icon}"></i> ${title}</h3>
            <button class="followup-copy-btn" onclick="copyFollowUp('${id}')"><i class="fas fa-copy"></i> Copy</button>
        </div>
        <div class="followup-body">${body}</div>
    </div>`;
}

function copyFollowUp(id) {
    const body = document.querySelector(`#${id} .followup-body`);
    const btn = document.querySelector(`#${id} .followup-copy-btn`);
    navigator.clipboard.writeText(body.innerText.trim()).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// ===================== ROI CALCULATOR =====================
function calculateROI() {
    const vendors = parseInt(document.getElementById('roiVendors').value) || 4;
    const spend = parseInt(document.getElementById('roiSpend').value) || 0;
    const ftes = parseInt(document.getElementById('roiFtes').value) || 3;

    // Consolidation savings: 15-30% of spend based on vendor count
    const consolidationPct = Math.min(0.15 + (vendors - 2) * 0.04, 0.35);
    const consolidationSavings = Math.round(spend * consolidationPct);

    // Operational savings: ~$80K per FTE saved, estimate 0.5-2 FTEs freed
    const fteSaved = Math.min(Math.round(ftes * 0.35 * 10) / 10, ftes - 1);
    const opsSavings = Math.round(fteSaved * 80000);

    // Reduced downtime / breach risk (industry average)
    const riskReduction = Math.round(spend * 0.08);

    const totalSavings = consolidationSavings + opsSavings + riskReduction;
    const roi = spend > 0 ? Math.round((totalSavings / spend) * 100) : 0;
    const paybackMonths = spend > 0 ? Math.max(3, Math.round(12 / (totalSavings / spend))) : 0;

    let html = '';

    html += `<h3 style="font-size:18px;font-weight:700;margin-bottom:16px;color:var(--text-primary);">
        <i class="fas fa-chart-line" style="color:var(--versa-green);"></i> ROI Estimate for Consolidation with Versa
    </h3>`;

    html += `<div class="roi-grid">
        <div class="roi-card"><div class="roi-value">${roi}%</div><div class="roi-label">Estimated ROI</div></div>
        <div class="roi-card"><div class="roi-value">$${(totalSavings/1000).toFixed(0)}K</div><div class="roi-label">Total Annual Savings</div></div>
        <div class="roi-card"><div class="roi-value accent">${paybackMonths} mo</div><div class="roi-label">Payback Period</div></div>
        <div class="roi-card"><div class="roi-value accent">${vendors}→1</div><div class="roi-label">Vendor Consolidation</div></div>
    </div>`;

    html += `<div class="followup-section"><div class="followup-header"><h3><i class="fas fa-piggy-bank"></i> Savings Breakdown</h3>
        <button class="followup-copy-btn" onclick="copyFollowUp('roi-breakdown')"><i class="fas fa-copy"></i> Copy</button></div>
        <div class="followup-body" id="roi-breakdown-body">`;

    html += `VENDOR CONSOLIDATION SAVINGS: $${(consolidationSavings/1000).toFixed(0)}K/year`;
    html += `\n• Replacing ${vendors} vendors with Versa's unified SASE platform`;
    html += `\n• Eliminates overlapping licenses, duplicate support contracts`;
    html += `\n• Estimated ${Math.round(consolidationPct * 100)}% reduction in licensing costs\n`;

    html += `\nOPERATIONAL EFFICIENCY: $${(opsSavings/1000).toFixed(0)}K/year`;
    html += `\n• ~${fteSaved} FTE(s) freed from managing ${vendors} separate consoles`;
    html += `\n• Single pane of glass reduces training, troubleshooting, and context-switching`;
    html += `\n• Zero-touch provisioning cuts branch deployment from weeks to hours\n`;

    html += `\nRISK REDUCTION VALUE: $${(riskReduction/1000).toFixed(0)}K/year`;
    html += `\n• 99.98% security effectiveness (CyberRatings) vs. industry average`;
    html += `\n• Reduced attack surface from consolidated architecture`;
    html += `\n• Faster incident response with unified analytics\n`;

    html += `\n--- BENCHMARK COMPARISONS ---`;
    html += `\n• Dell: Achieved 130% ROI with Versa SASE`;
    html += `\n• Adobe: Saved $500K+ annually after consolidation`;
    html += `\n• Dorset Council: Saved £1M with Versa deployment`;

    html += `</div></div>`;

    // Show output
    document.querySelector('#tab-postcall .output-empty').style.display = 'none';
    const content = document.getElementById('postcall-content');
    content.style.display = 'block';
    content.innerHTML = html;
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K = Jump to Live Search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        switchTab('live');
        setTimeout(() => document.getElementById('liveSearch')?.focus(), 50);
    }

    // Cmd/Ctrl + 1-5 = Tab switching
    if ((e.metaKey || e.ctrlKey) && ['1','2','3','4','5'].includes(e.key)) {
        e.preventDefault();
        const tabs = ['prep', 'live', 'battlecards', 'meddic', 'postcall'];
        switchTab(tabs[parseInt(e.key) - 1]);
    }

    // Escape = Clear live search
    if (e.key === 'Escape' && document.activeElement?.id === 'liveSearch') {
        document.getElementById('liveSearch').value = '';
        performSearch('');
    }
});

// ===================== INITIALIZE =====================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved profiles
    refreshProfileDropdown();

    // Handle deep linking from URL hash
    const hash = window.location.hash.replace('#', '');
    if (['prep', 'live', 'battlecards', 'meddic', 'postcall'].includes(hash)) {
        switchTab(hash);
    }
});
