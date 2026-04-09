// ===================================================================
// VERSA SALES HUB — DATA ENGINE
// All competitive intel, industry data, MEDDIC framework, and
// discovery question banks live here.
// ===================================================================

// ===================== COMPETITOR DATA =====================
const COMPETITORS = {
    zscaler: {
        name: "Zscaler",
        tagline: "Cloud-only SSE vendor lacking native SD-WAN",
        summary: "Zscaler's cloud-only, user-to-app-centric architecture lacks native SD-WAN and deployment flexibility, forcing customers into a fragmented SASE security model that often does not align with real-world requirements.",
        weaknesses: [
            "Fragmented software stack using acquired point-products with a minimal SD-WAN offering",
            "Never appeared on Gartner Magic Quadrant for SD-WAN despite claims since 2017",
            "ZPA requires add-on for malware and sandbox analysis — not included natively",
            "Requires up to 8 different management consoles",
            "Cloud-only delivery — no on-premises or sovereign deployment options",
            "Gartner: 'Lacks advanced SD-WAN functionality such as in-depth path selection, packet duplication, and support for high bandwidth throughput'",
            "Requires connection to cloud gateway for full security services",
            "No native SD-LAN — depends entirely on third-party integrations for LAN infrastructure",
            "Limited WAN control — optimizes traffic only after it reaches its cloud",
            "Policy enforcement limited to firewall and SSE functions — not across LAN/WAN"
        ],
        versaAdvantages: [
            "Single OS (VOS) with native integration of SD-WAN + SSE + NGFW",
            "Unified single management console vs. Zscaler's up to 8 consoles",
            "Enterprise-class SD-WAN — Gartner Leader 5 years running",
            "Full stack NGFW and advanced security on-premises capability",
            "Sovereign SASE for air-gapped and on-premises compliance environments",
            "NGFW ranked #1 by CyberRatings.org: 99.90% security effectiveness",
            "SD-WAN Leader in GigaOm SD-WAN Radar (second consecutive year)",
            "Complete LAN/WAN/security policy enforcement from one platform",
            "Path optimization per connection for lower latency",
            "Supports flexible deployment: on-prem, cloud, hybrid, service provider"
        ],
        killQuestions: [
            "How many management consoles does your team currently have to juggle? We hear Zscaler shops end up with 6-8 different dashboards — is that creating operational overhead?",
            "Since Zscaler doesn't have native SD-WAN, are you running a separate SD-WAN vendor alongside ZIA/ZPA? How's that integration working for you?",
            "Do you have any on-premises security requirements — compliance, data sovereignty, or air-gapped environments? Zscaler is cloud-only and can't inspect traffic locally.",
            "How are you handling branch-level firewall and IPS today? Zscaler's FwaaS runs only in the cloud — what happens when your cloud connection goes down?",
            "Have you evaluated total cost when you add ZPA malware scanning and sandbox? Those are add-on licenses — not included in base ZPA.",
            "What does your LAN security look like at branch sites? Zscaler has zero LAN capabilities — are you bolting on a third-party solution for that?",
            "How's your east-west traffic inspection? Zscaler only handles north-south cloud traffic — they can't see lateral movement inside your WAN.",
            "Are you backhauling all branch traffic to Zscaler's cloud? What's the latency impact on real-time apps like voice and video?",
            "With Zscaler's cloud-only model, who controls your encryption keys and where does your data get inspected? Is that a compliance concern?",
            "Have you looked at Gartner's SD-WAN Magic Quadrant? Zscaler has never appeared on it. How important is mature SD-WAN to your architecture?"
        ],
        objectionHandling: {
            "Zscaler is the market leader in SSE": "Zscaler built a strong SSE brand, but SASE requires SD-WAN + SSE unified. They had to acquire SD-WAN capabilities and still lack depth. Gartner's Critical Capabilities report flags their lack of advanced SD-WAN functionality. Versa delivers both natively in one OS — no integration tax.",
            "We already have Zscaler deployed": "Many customers run Zscaler for SSE alongside another SD-WAN vendor. That's two vendors, two contracts, two consoles, zero integration. Versa consolidates everything. We can even do a phased migration — start with SD-WAN and layer in SSE over time.",
            "Zscaler has more PoPs globally": "PoP count is a vanity metric. What matters is where inspection happens and latency to YOUR users. Versa optimizes path per-connection and can inspect at cloud edge, WAN edge, AND LAN edge. Zscaler can only inspect in the cloud.",
            "Our security team trusts Zscaler": "We respect Zscaler's SSE. But ask your security team: who handles on-prem firewall? Who handles SD-WAN? Who handles LAN security? That's 3+ vendors Zscaler can't replace. Versa is one platform for all of it."
        },
        securityStats: {
            versa: { effectiveness: "99.90%", rating: "Recommended" },
            competitor: { effectiveness: "Not independently tested", rating: "N/A" }
        },
        analystQuotes: [
            { source: "Gartner Critical Capabilities for SASE 2025", quote: "The vendor lacks advanced SD-WAN functionality such as in-depth path selection, packet duplication and support for high bandwidth throughput." },
            { source: "Gartner MQ for SASE, July 2025", quote: "VSAF scores excellent in foundational SASE platform and secure branch network modernization use cases." }
        ],
        categories: {
            sdwan: { versa: "Longstanding SD-WAN leader with carrier-grade routing", competitor: "Nascent, built on acquisitions, relies on partner SD-WAN" },
            sse: { versa: "Unified SSE within single SASE platform", competitor: "Strong SSE but cloud-only, requires add-ons" },
            ngfw: { versa: "Enterprise-class NGFW at every edge", competitor: "Cloud FwaaS only — no on-prem firewall capability" },
            sdlan: { versa: "Natively integrated LAN switching and Wi-Fi", competitor: "No LAN capabilities — relies on third parties" },
            deployment: { versa: "On-prem, cloud, hybrid, sovereign", competitor: "Cloud-only delivery" },
            management: { versa: "Single unified console", competitor: "Up to 8 separate consoles" }
        }
    },

    paloalto: {
        name: "Palo Alto Networks",
        tagline: "Fragmented acquired stack with dual management consoles",
        summary: "Palo Alto's SASE is a collection of acquired point-products. Their SD-WAN is bolted onto a firewall platform, and managing it requires two separate consoles — Panorama for SD-WAN and Prisma Access Management for SSE.",
        weaknesses: [
            "Fragmented software stack with acquired point-products — features not on same stack",
            "Requires 2 separate consoles: Panorama for SD-WAN + Prisma Access Management for SSE",
            "Gartner 2025: 'Weaker in the basic networking capability'",
            "Lower security effectiveness: 79.24% vs. Versa's 99.98% (CyberRatings)",
            "Backhauls traffic to public hyperscalers — increases latency, jitter, and packet loss",
            "Added SD-WAN to existing firewall platform — not purpose-built for WAN",
            "Lacks path optimization for individual connections",
            "SSE (Prisma Access) is a separate product from networking stack requiring integration",
            "Higher TCO: multiple appliances, separate licenses, higher operational overhead",
            "Multi-tenancy better suited for enterprise than carrier-scale deployments",
            "Limited deployment flexibility — relies on dedicated appliances or VM-series",
            "Higher false positive rates than Versa in independent testing"
        ],
        versaAdvantages: [
            "Single unified console for all SD-WAN, SSE, and NGFW functions",
            "Purpose-built SD-WAN — Gartner Leader outscoring Palo Alto in nearly every SD-WAN critical capability",
            "99.98% security effectiveness vs. Palo Alto's 79.24% (CyberRatings 2025)",
            "Path optimization per connection for lower latency",
            "Carrier-grade multi-tenant architecture for SPs and large enterprises",
            "Sovereign SASE with fully on-premises deployment option",
            "Single OS (VOS) runs NGFW, SD-WAN, and SSE functions together",
            "Lower TCO through platform consolidation and white-box/COTS hardware",
            "Deploys on appliances, VMs, cloud infrastructure, or provider-hosted platforms",
            "SD-WAN Capability Leader: 4.6 vs. Palo Alto's 4.4 (Gartner Critical Capabilities)"
        ],
        killQuestions: [
            "How are you managing your Palo Alto environment today — are you using both Panorama AND Prisma Access Management? How much time does your team spend context-switching between consoles?",
            "Palo Alto added SD-WAN to their firewall platform. How well is it handling your complex routing requirements — BGP, OSPF, multicast, VRFs?",
            "We've seen in CyberRatings that Palo Alto scored 79.24% on security effectiveness vs. Versa's 99.98%. Has your team independently validated their detection rates?",
            "Are you backhauling branch traffic to hyperscaler PoPs for Prisma Access? What's the latency impact on latency-sensitive applications?",
            "How many separate Palo Alto SKUs and licenses are you managing across firewall, SD-WAN, and Prisma? What does your true TCO look like?",
            "If you need on-premises security inspection for compliance — can Prisma Access handle that, or do you need to keep separate firewalls?",
            "How is Palo Alto handling your LAN infrastructure? Are you using a third-party switch/Wi-Fi vendor alongside their SD-WAN?",
            "Have you looked at the Gartner Critical Capabilities scores for SD-WAN? Versa outscored Palo Alto in nearly every category.",
            "What does your carrier or MSSP relationship look like? Palo Alto's multi-tenancy is limited for service provider deployments.",
            "Is your team concerned about vendor lock-in with PA's proprietary hardware? Versa runs on white-box and COTS hardware."
        ],
        objectionHandling: {
            "Palo Alto is the biggest name in security": "Brand recognition doesn't equal best fit. CyberRatings.org independently tested both — Versa scored 99.98% security effectiveness vs. Palo Alto's 79.24%. Plus, Palo Alto requires two consoles to manage SASE. Your team deserves a single pane of glass.",
            "We're standardized on PAN-OS": "We understand — PAN-OS is deeply embedded. But consider: your SD-WAN team is on Panorama, your cloud security team is on Prisma Access Management, and your LAN team is on a third vendor. That's three operational silos. Versa unifies all of that.",
            "Prisma Access is a strong SASE solution": "Prisma Access is SSE delivered separately from SD-WAN. Gartner specifically flagged Palo Alto as 'weaker in basic networking capability.' If you need true Unified SASE — networking + security in one platform — that's Versa's architecture.",
            "We're already in a Palo Alto renewal": "Perfect timing. Before you renew, let us show you a side-by-side TCO comparison. Most customers find they're paying for 3-4 separate Palo Alto products when Versa consolidates it into one platform at lower cost."
        },
        securityStats: {
            versa: { effectiveness: "99.98%", rating: "Recommended" },
            competitor: { effectiveness: "79.24%", rating: "Lower effectiveness" }
        },
        analystQuotes: [
            { source: "Gartner Critical Capabilities for SASE 2025", quote: "Weaker in the basic networking capability." },
            { source: "CyberRatings 2025 Enterprise Firewall", quote: "Versa 99.98% security effectiveness vs. Palo Alto 79.24%." }
        ],
        categories: {
            sdwan: { versa: "Purpose-built SD-WAN, Gartner Leader 5 years", competitor: "Bolted SD-WAN onto firewall platform" },
            sse: { versa: "Unified SSE in single platform", competitor: "Prisma Access — separate product" },
            ngfw: { versa: "99.98% effectiveness, edge-deployed", competitor: "79.24% effectiveness, separate appliances" },
            sdlan: { versa: "Natively integrated LAN platform", competitor: "Relies on third-party LAN vendors" },
            deployment: { versa: "On-prem, cloud, hybrid, sovereign", competitor: "Primarily public cloud infrastructure" },
            management: { versa: "Single unified console", competitor: "2 consoles: Panorama + Prisma Access Mgmt" }
        }
    },

    cisco: {
        name: "Cisco",
        tagline: "Fragmented acquisitions with poor security testing results",
        summary: "Cisco's SASE is a mix of acquired products (Umbrella, Duo, AnyConnect, Meraki, Viptela, Secure Firewall) resulting in inconsistent policy, complex operations, and limited depth across networking and security.",
        weaknesses: [
            "Fragmented stack of acquired point-products: Viptela, Umbrella, Duo, Meraki, Secure Firewall, AnyConnect, ThousandEyes",
            "Excluded from 2025 Forrester Wave for SASE — 'hasn't gone far enough to integrate' acquired products",
            "Excluded from 2025 Gartner Magic Quadrant for SSE — lacked required customer count",
            "SSE testing: 12.44% security effectiveness with 'Caution' designation (CyberRatings)",
            "Cloud Network Firewall: 53.50% security effectiveness with 'Caution' rating",
            "Exploit Evasion Resistance: 40% vs. Versa's 100%",
            "Requires up to 4 different management consoles",
            "Performance issues due to network hairpinning between acquired services",
            "Cisco Viptela requires multi-components: Manager, Controller, Validator, WAN Edge — each separate deployment",
            "Requires proprietary hardware (ISR/ASR for Viptela, Meraki-only appliances) — drives up CapEx",
            "Meraki has severely limited routing capabilities",
            "Gartner: 'Lacks in enterprise features and functionality. Long way to go to be a full enterprise product'",
            "Cisco SDA relies on SGTs and ISE integration — adds complexity and cost for micro-segmentation",
            "Proprietary lock-in at every layer: hardware, software, cables, optical modules"
        ],
        versaAdvantages: [
            "SASE built as single, natively integrated platform from ground up",
            "99.90% security effectiveness vs. Cisco's 53.50% (CyberRatings 2025)",
            "SSE security effectiveness: Versa leader vs. Cisco's 12.44% with 'Caution' rating",
            "Exploit Evasion Resistance: 100% vs. Cisco's 40%",
            "Malware Block Rate: 99.01% vs. Cisco's 77.49%",
            "Single console management vs. Cisco's 4 consoles",
            "Full-featured routing stack (BGP, OSPF, IS-IS, multicast, VRFs) on every edge device",
            "Runs on white-box/COTS hardware and major hyperscalers — no proprietary lock-in",
            "Purpose-built multi-tenancy for SPs and large enterprises",
            "Micro-segmentation via single policy framework — no ISE or SGTs needed",
            "Standard off-the-shelf cables and SFPs, Broadcom ASICs — all standard 1RU boxes"
        ],
        killQuestions: [
            "How many different Cisco platforms is your team managing today? Viptela, Meraki, Umbrella, Duo, ISE — how many consoles are you jumping between?",
            "Are you aware that Cisco was EXCLUDED from the 2025 Forrester Wave for SASE? Forrester said they 'haven't gone far enough to integrate' their acquisitions.",
            "Cisco was also EXCLUDED from Gartner's 2025 Magic Quadrant for SSE — they didn't have enough customers. Does that concern you for their SSE maturity?",
            "CyberRatings tested Cisco's SSE at only 12.44% security effectiveness. Have you independently validated what's actually being caught vs. what's getting through?",
            "How much are you paying for Cisco proprietary hardware — ISR/ASR routers, Meraki appliances, proprietary cables and optics? Have you priced out the total lock-in cost?",
            "Is your Cisco SD-WAN on Viptela or Meraki? They're completely separate platforms with different management. How does that affect your team?",
            "For micro-segmentation, are you running Cisco ISE with SGTs? How complex is that deployment and what does the ISE licensing cost look like?",
            "How is Cisco handling your security for east-west traffic between sites? Their acquired products create hairpinning that adds latency.",
            "What happens when you need to open a support case that spans SD-WAN and security? With Cisco, those are different products, different TAC teams.",
            "Have you thought about what your environment looks like in 3 years? Cisco keeps acquiring and rebranding — are you confident their roadmap is unified?"
        ],
        objectionHandling: {
            "We're a Cisco shop — everything is Cisco": "We hear that a lot. But which Cisco? Viptela SD-WAN? Meraki SD-WAN? Umbrella? Duo? Secure Firewall? Each has a different console, different team, different contract. That's not unified — that's vendor sprawl under one logo. Versa is actually one platform.",
            "Cisco has the biggest install base": "Install base doesn't mean best solution. Cisco was excluded from both the Forrester Wave for SASE and Gartner's MQ for SSE in 2025. CyberRatings tested their SSE at 12.44% effectiveness. Your security posture matters more than a logo.",
            "We have an ELA with Cisco": "ELAs look cost-effective until you count the operational overhead of managing 4+ platforms, proprietary hardware requirements, and ISE licensing. We can show you a true TCO comparison that includes OpEx — most Cisco shops find Versa is 30-40% less.",
            "Our network team only knows Cisco": "Versa's VOS runs full enterprise routing — BGP, OSPF, IS-IS, VRFs, multicast. Your network engineers will find it familiar. Plus, our single console is easier to learn than juggling Viptela + Meraki + Umbrella + ISE."
        },
        securityStats: {
            versa: { effectiveness: "99.90%", sse: "Leader", firewall: "99.43%", exploitEvasion: "100%", malwareBlock: "99.01%", falsePositive: "99.63%" },
            competitor: { effectiveness: "53.50%", sse: "12.44% (Caution)", firewall: "57.34%", exploitEvasion: "40%", malwareBlock: "77.49%", falsePositive: "79.94%" }
        },
        analystQuotes: [
            { source: "Forrester Wave SASE 2025", quote: "Cisco hasn't gone far enough to integrate Umbrella, Secure Access, ThousandEyes, Viptela, Meraki, Duo." },
            { source: "Gartner MQ SSE 2025", quote: "Cisco lacked the required number of customers and seats for its primary SSE offering as of October 2024." },
            { source: "Gartner Peer Insights", quote: "Lacks in enterprise features and functionality. I think they have a long way to go to be a full enterprise product." }
        ],
        categories: {
            sdwan: { versa: "Purpose-built SD-WAN with full routing stack on every edge", competitor: "Two separate SD-WAN platforms (Viptela & Meraki)" },
            sse: { versa: "Unified SSE — leader in effectiveness", competitor: "12.44% effectiveness, 'Caution' rating" },
            ngfw: { versa: "99.43% firewall effectiveness", competitor: "57.34% effectiveness, 'Caution' rating" },
            sdlan: { versa: "Micro-segmentation via single policy framework", competitor: "Requires ISE + SGTs — complex and costly" },
            deployment: { versa: "White-box/COTS hardware, any cloud", competitor: "Proprietary hardware lock-in at every layer" },
            management: { versa: "Single unified console", competitor: "Up to 4 separate consoles" }
        }
    },

    fortinet: {
        name: "Fortinet",
        tagline: "Firewall-centric platform with complexity and hardware lock-in",
        summary: "Fortinet SASE lacks a unified, cloud-native architecture, relying on disparate firewall-centric products and on-prem hardware with complexity and fragmented management.",
        weaknesses: [
            "Fragmented software stack with acquired technologies layered onto FortiGate",
            "Limited routing stack with subpar support for large hybrid WAN use cases",
            "Limited analytics lacking visibility into network, SLAs, and users",
            "Security effectiveness comes at expense of throughput and cost per Mbps",
            "Expensive hardware refreshes tied to proprietary FortiASIC processors",
            "Complex, unintuitive GUI — Gartner Peer Insights: 'The first firewall GUI that made me want to throw device through a brick wall'",
            "Requires more appliances for HA — more points of failure, complex troubleshooting",
            "SSE does NOT support cloud/network service provider markets",
            "SSE does NOT offer private cloud, multi-cloud, or sovereign deployment models",
            "Device-centric SD-WAN management doesn't scale for large environments",
            "FortiSASE built by layering cloud-hosted security onto FortiGate SD-WAN — not unified",
            "Relies on proprietary FortiLink protocol for SD-Branch — vendor lock-in and error risk",
            "Template/ADOM-based scaling creates bottlenecks for large tenants",
            "Posture signaling tied to FortiClient EMS tags — limited endpoint assessment",
            "Support rated 1/5 in Forrester's SASE Wave vs. Versa's 5/5"
        ],
        versaAdvantages: [
            "Native SD-WAN + SSE integration in single stack — not layered products",
            "Carrier-class routing for complex enterprise/MSSP deployments",
            "Near real-time data with advanced analytics in unified console",
            "99.98% security effectiveness at scale (CyberRatings 2025)",
            "Exploit Evasion Resistance: 99.43% vs. Fortinet's 53.50%",
            "Intuitive template workflows — Gartner: 'Intuitive template workflow for common use cases'",
            "Support rated 5/5 vs. Fortinet's 1/5 (Forrester SASE Wave)",
            "VOS runs on VM, cloud, or white-box hardware — no proprietary processor lock-in",
            "Cloud-native orchestration for LAN and WAN — no device-level management",
            "Open standards SD-LAN — no FortiLink protocol dependency",
            "Continuous device posture assessment with adaptive micro-segmentation"
        ],
        killQuestions: [
            "How's your team finding the FortiGate management interface? We consistently hear about the complexity — is that eating into your team's productivity?",
            "Fortinet's security throughput drops significantly once you enable full UTM features. What's your actual throughput with all security features turned on?",
            "When is your next FortiGate hardware refresh? Those proprietary FortiASIC boxes aren't cheap — have you priced out the replacement cycle?",
            "How is your FortiSASE handling complex routing — BGP, OSPF, IS-IS? Fortinet's routing stack is limited compared to purpose-built SD-WAN platforms.",
            "Are you using FortiSwitch and FortiAP for your branches? How many separate products are you managing at each site?",
            "Fortinet scored 53.50% on Exploit Evasion Resistance in CyberRatings testing vs. Versa's 99.43%. Are you confident in your evasion detection?",
            "How's Fortinet's support been? Forrester rated them 1 out of 5 for support in their SASE Wave. Has that matched your experience?",
            "Are you aware of the FortiLink protocol dependency for SD-Branch? If you want to change switch vendors later, that's a full rip-and-replace.",
            "For large multi-tenant deployments, how is Fortinet's ADOM-based management scaling? We hear it creates bottlenecks.",
            "Does Fortinet offer you sovereign or private SASE deployment? Their SSE is tied to their cloud — what about your on-prem compliance needs?"
        ],
        objectionHandling: {
            "Fortinet has great TCO — it's the cheapest option": "Fortinet's sticker price looks good until you factor in: proprietary hardware refreshes, throughput degradation with full UTM, multiple appliances for HA, and operational overhead of their complex GUI. The real TCO includes people cost, and Versa's unified platform reduces that significantly.",
            "We're a FortiGate shop and our team knows it": "FortiGate is a firewall. When you layer on FortiSASE, FortiSwitch, FortiAP, FortiClient EMS, and FortiManager — that's 5+ products your team needs to learn. Versa is one platform with one console. The learning curve is actually simpler.",
            "Fortinet has the best NGFW performance": "Performance at what cost? Fortinet's throughput numbers rely on proprietary FortiASIC hardware, and they drop dramatically when you turn on full UTM. CyberRatings tested actual security effectiveness — Versa scored 99.98% vs. Fortinet's 79.24%. Plus, Versa runs on standard x86 hardware.",
            "Fortinet has a bigger installed base for SD-WAN": "Market share doesn't equal capability. Gartner's Critical Capabilities for SASE 2025 shows Versa as the SD-WAN capability leader. Fortinet added SD-WAN to a firewall — Versa built SD-WAN as its core architecture."
        },
        securityStats: {
            versa: { effectiveness: "99.98%", exploitEvasion: "99.43%" },
            competitor: { effectiveness: "79.24%", exploitEvasion: "53.50%" }
        },
        analystQuotes: [
            { source: "Forrester SASE Wave", quote: "Versa support rated 5/5 vs. Fortinet's 1/5." },
            { source: "Gartner", quote: "Intuitive template workflow for common use cases." },
            { source: "Gartner Peer Insights", quote: "(On Fortinet) The first firewall GUI that made me want to throw device through a brick wall." }
        ],
        categories: {
            sdwan: { versa: "Purpose-built carrier-grade SD-WAN", competitor: "Evolved from firewall — limited routing stack" },
            sse: { versa: "Native SSE with sovereign deployment", competitor: "No private cloud or sovereign options" },
            ngfw: { versa: "99.98% effectiveness on standard hardware", competitor: "Throughput drops with full UTM enabled" },
            sdlan: { versa: "Open standards SD-LAN", competitor: "Proprietary FortiLink protocol lock-in" },
            deployment: { versa: "VM, cloud, white-box — no proprietary hardware", competitor: "Tied to proprietary FortiASIC processors" },
            management: { versa: "Single intuitive console, 5/5 support", competitor: "Complex GUI, 1/5 support rating" }
        }
    },

    cato: {
        name: "Cato Networks",
        tagline: "Cloud-only with no on-prem capability and limited SD-WAN",
        summary: "Cato offers SASE over a proprietary backbone, restricting control and limiting enterprises in need of strong security, SD-WAN, or hybrid environments. Their simplified model targets SMB, not enterprise.",
        weaknesses: [
            "Cloud-only — requires rip-and-replace for installs, no on-premises option",
            "Never appeared on Gartner Magic Quadrant for SD-WAN despite claiming SD-WAN since 2017",
            "Limited SD-WAN capabilities — more suitable for SMB markets, not enterprise",
            "Latency issues with backhauled traffic over proprietary PoP backbone",
            "Gartner: 'Lacks on-premises intrusion prevention systems (IPS) and content filtering'",
            "Gartner: 'Limited support for turnkey compliance with data sovereignty laws'",
            "Gartner: 'Weaknesses with in-line on-premises security controls and basic networking capabilities'",
            "Traffic must traverse Cato's proprietary backbone — no direct path steering",
            "Traditional bandwidth-allocation licensing — risk of over/under-provisioning",
            "Minimal LAN capabilities — relies on third-party infrastructure",
            "Socket appliances cannot provide deep micro-segmentation",
            "Cannot accommodate complex WAN architectures, regulatory requirements, or custom routing",
            "Limited support for country-specific sovereign SASE requirements",
            "Not FedRAMP certified — cannot serve federal government requirements"
        ],
        versaAdvantages: [
            "Full security stack in any deployment mode: on-prem, hybrid, cloud",
            "No rip-and-replace required — supports phased digital transformation",
            "Gartner SD-WAN Leader 5 years running — Cato has never appeared on MQ",
            "Direct path steering — optimizes traffic across any underlay",
            "Built-in Sovereign SASE for data sovereignty and compliance",
            "FedRAMP High Ready certification",
            "Enterprise-grade NGFW far exceeds Cato's basic socket scalability",
            "Carrier-grade multi-tenant SD-WAN for global telecom providers",
            "Comprehensive LAN portfolio with native switching and Wi-Fi",
            "Identity-aware micro-segmentation across LAN and WAN",
            "Bandwidth AND consumption-based licensing options"
        ],
        killQuestions: [
            "Cato requires you to backhaul ALL traffic through their proprietary backbone. How is that affecting latency for your real-time applications?",
            "Are you aware that Cato has NEVER appeared on Gartner's Magic Quadrant for SD-WAN? They've been claiming SD-WAN since 2017. Why no recognition?",
            "Do you have any on-premises security requirements? Cato literally cannot inspect traffic locally — everything goes through their cloud PoPs.",
            "Gartner flagged Cato for lacking on-premises IPS and content filtering. How are you handling those requirements at your sites today?",
            "How is Cato handling your data sovereignty compliance? Their cloud-hosted model limits where your data gets inspected and logged.",
            "Are you in a regulated industry? Cato is not FedRAMP certified. What are your compliance requirements?",
            "What does your WAN architecture look like? Cato's simplified model struggles with complex routing, multicast, and advanced VRF requirements.",
            "How is Cato handling your LAN security at branch sites? Their socket appliances have minimal LAN capabilities.",
            "What's your licensing model with Cato? Their bandwidth-allocation approach often leads to over-provisioning and wasted spend.",
            "If Cato's backbone has an outage, what's your failover? With Versa, you can run full security locally — you're never dependent on cloud availability."
        ],
        objectionHandling: {
            "Cato is simple and easy to deploy": "Simple works for SMB. But you have enterprise requirements — complex routing, regulatory compliance, multi-tenant environments, on-prem security. Cato's simplicity is actually a limitation. Gartner specifically flagged their 'weaknesses with basic networking capabilities.'",
            "Cato's backbone provides great performance": "Cato forces ALL traffic through their backbone — that's not optimization, that's backhauling. Versa does per-connection path steering across any underlay. Your traffic takes the best path, not the only path.",
            "Cato is a unified platform too": "Cato is unified in the cloud only. They have zero on-prem security capability. No IPS, no content filtering at the edge. If your cloud connection drops, your security drops. Versa runs the full stack at every edge — cloud, WAN, and LAN.",
            "We like Cato's per-user pricing": "Pricing models matter, but so does what you're getting. Cato's bandwidth-allocation licensing creates overprovisioning risk. Versa offers both bandwidth and consumption-based options. Let's compare actual cost for your specific user count and traffic patterns."
        },
        securityStats: {
            versa: { effectiveness: "99.98%", rating: "Recommended" },
            competitor: { effectiveness: "Not independently tested", rating: "N/A" }
        },
        analystQuotes: [
            { source: "Gartner MQ SASE, July 2025", quote: "Lacks on-premises intrusion prevention systems (IPS) and content filtering." },
            { source: "Gartner MQ SASE, July 2025", quote: "Limited support for turnkey compliance with data sovereignty laws." },
            { source: "Gartner Critical Capabilities SASE, July 2025", quote: "Weaknesses with in-line on-premises security controls and basic networking capabilities." }
        ],
        categories: {
            sdwan: { versa: "Gartner SD-WAN Leader, carrier-grade", competitor: "Never appeared on Gartner SD-WAN MQ" },
            sse: { versa: "Full SSE with sovereign deployment", competitor: "Cloud-only, no on-prem IPS or content filtering" },
            ngfw: { versa: "Enterprise NGFW at every edge", competitor: "Basic socket firewall — cloud dependent" },
            sdlan: { versa: "Native LAN switching, Wi-Fi, micro-segmentation", competitor: "Minimal LAN — relies on third parties" },
            deployment: { versa: "On-prem, cloud, hybrid, sovereign, FedRAMP", competitor: "Cloud-only, not FedRAMP, limited sovereignty" },
            management: { versa: "Single console, flexible licensing", competitor: "Bandwidth-allocation licensing model" }
        }
    },

    netskope: {
        name: "Netskope",
        tagline: "CASB-origin vendor with no native SD-WAN or NGFW",
        summary: "Netskope originated as a CASB vendor. Their SASE offers limited SD-WAN capabilities (acquired Infiot in 2022) and lacks the deployment flexibility required for enterprise WAN environments, regulated industries, or hybrid networks.",
        weaknesses: [
            "SSE-focused heritage with fragmented stack — not a unified SASE platform",
            "SASE offering EXCLUDES NGFW entirely",
            "Declined participation in CyberRatings.org SSE evaluation — transparency concern",
            "Limited SD-WAN experience — entered market via Infiot acquisition (2022)",
            "Separate security stacks with disjointed reporting across SWG, CASB, and ZTNA",
            "Requires cloud for all security delivery — no on-premises option",
            "No native SD-LAN — relies on third-party integrations",
            "Gartner: 'Less experience supporting SD-WAN offerings compared with some other vendors'",
            "Gartner Peer Insights: 'Ongoing reliability issues with the overall product impacting performance'",
            "Limited IPS-like inspection is cloud-only — no edge IPS",
            "No DoS/DDoS protection at branch or data center edges",
            "Cloud proxy/SWG architecture — not a full stateful L3-L7 firewall",
            "Cloud-dependent control plane — limited sovereign deployment"
        ],
        versaAdvantages: [
            "Native integration of SD-WAN + SSE in single stack with NGFW included",
            "Market-leading SSE AND NGFW for on-premises and cloud protection",
            "Gartner-recognized SD-WAN leader year over year — Netskope is not",
            "Near real-time data with advanced analytics in unified console",
            "Supports cloud, on-premises, and hybrid deployments",
            "Full stateful L3-L7 firewall at branch, data center, and cloud",
            "Full-featured IPS across all enforcement points — not cloud-only",
            "DoS/DDoS protection at every edge",
            "Sovereign SASE for air-gapped and on-premises environments",
            "Versa matched or exceeded Netskope in 14 capabilities in Forrester Wave SASE 2025"
        ],
        killQuestions: [
            "Netskope's SASE offering doesn't include NGFW. How are you handling next-gen firewall requirements — is that a separate vendor and product?",
            "Netskope declined to participate in CyberRatings.org SSE testing. What does that tell you about their confidence in independent validation?",
            "How mature is Netskope's SD-WAN for your environment? They acquired Infiot in 2022 — are you comfortable with a 3-year-old acquired SD-WAN?",
            "Are you seeing the reliability issues that Gartner Peer Insights users reported — 'ongoing reliability issues impacting performance'?",
            "How is Netskope handling your on-premises security inspection? They're cloud-only — what happens during connectivity issues?",
            "Where is your IPS and DDoS protection? Netskope's inspection is limited to cloud proxy — they don't have edge IPS at your branches.",
            "How many separate reports and dashboards do you need across Netskope's SWG, CASB, and ZTNA? Is that creating visibility gaps?",
            "Do you have sovereign data requirements? Netskope's control plane is cloud-dependent — where is your data being inspected?",
            "How is Netskope managing your LAN infrastructure? They rely entirely on third parties for switching and Wi-Fi.",
            "Forrester found that Versa matched or exceeded Netskope in 14 capabilities. Have you seen that comparison?"
        ],
        objectionHandling: {
            "Netskope has the best CASB": "Netskope started as CASB and it's still their strongest feature. But SASE requires much more — SD-WAN, NGFW, LAN, sovereign deployment. Netskope's SASE literally excludes NGFW. That's a major gap they can't fill without a third vendor.",
            "Our security team already uses Netskope": "If your security team likes Netskope for CASB/SWG, that's fine. But who handles your SD-WAN? Your NGFW? Your LAN security? Your on-prem compliance? That's 3-4 additional vendors. Versa handles ALL of that in one platform.",
            "Netskope is a leader in SSE": "They're positioned well in SSE, but they refused to participate in CyberRatings testing. Versa scored 99.98% security effectiveness in the same test. And SSE alone isn't SASE — you need integrated networking. Gartner says Netskope has 'less experience supporting SD-WAN offerings.'",
            "We don't need SD-WAN yet": "You may not need it today, but your MPLS contracts will expire, your branches will grow, and you'll need WAN transformation. With Versa, you get SSE now AND enterprise SD-WAN when you're ready — same platform, same console, zero migration."
        },
        securityStats: {
            versa: { effectiveness: "99.98%", rating: "Recommended" },
            competitor: { effectiveness: "Declined testing", rating: "Unknown" }
        },
        analystQuotes: [
            { source: "Gartner MQ SASE, July 2025", quote: "Netskope's heritage is delivering SSE functionality, and it has less experience supporting SD-WAN offerings compared with some other vendors." },
            { source: "Gartner Peer Insights 2025", quote: "We have observed ongoing reliability issues with the overall product which is impacting performance and consistency." },
            { source: "Forrester Wave SASE 2025", quote: "Versa matched or exceeded Netskope in 14 capabilities." }
        ],
        categories: {
            sdwan: { versa: "Gartner SD-WAN Leader, purpose-built", competitor: "Acquired Infiot 2022 — limited maturity" },
            sse: { versa: "99.98% tested effectiveness", competitor: "Declined CyberRatings testing" },
            ngfw: { versa: "Enterprise NGFW included in SASE", competitor: "NO NGFW in SASE offering" },
            sdlan: { versa: "Native LAN with switching and Wi-Fi", competitor: "No LAN — third-party only" },
            deployment: { versa: "On-prem, cloud, hybrid, sovereign", competitor: "Cloud-only delivery" },
            management: { versa: "Single unified console, real-time analytics", competitor: "Disjointed reporting across SWG/CASB/ZTNA" }
        }
    }
};

// ===================== INDUSTRY DATA =====================
const INDUSTRIES = {
    financial: {
        name: "Financial Services / Banking",
        icon: "fa-landmark",
        compliance: ["PCI-DSS", "SOX", "GLBA", "FFIEC", "GDPR", "DORA", "Basel III"],
        painPoints: [
            "Strict data sovereignty and residency requirements",
            "Zero tolerance for security breaches — brand reputation at stake",
            "Complex multi-branch environments with high-performance trading apps",
            "Legacy VPN infrastructure struggling with remote workforce",
            "M&A activity requiring rapid network integration",
            "Regulatory audits requiring unified visibility and reporting",
            "Securing customer-facing digital banking platforms",
            "Real-time fraud detection requires low-latency connections"
        ],
        discoveryQuestions: [
            "How are you handling PCI-DSS segmentation across your branch and data center environments?",
            "Where is your sensitive financial data being inspected today — and do you have full visibility into those inspection points?",
            "With regulatory requirements around data sovereignty, are you comfortable with where your traffic is being decrypted and analyzed?",
            "How many branch locations do you have, and what does your WAN connectivity look like — MPLS, broadband, both?",
            "Have you had any recent M&A activity that required integrating different network architectures?",
            "What does your audit trail look like across networking and security? Can you pull unified reports, or is that spread across multiple tools?",
            "How are you securing your trading floor and real-time financial applications? What's the latency tolerance?",
            "Are your compliance teams satisfied with the segmentation between customer data and internal operations?"
        ],
        versaPitch: "Versa's Unified SASE provides the data sovereignty controls financial institutions require — with Sovereign SASE deployments that keep inspection and logging in-country. Our single-platform approach gives your compliance team unified audit trails, and our enterprise SD-WAN handles the low-latency requirements of trading applications. Major financial institutions including Barclays, Societe Generale, Capital One, and US Bank trust Versa.",
        customerProof: ["Capital One", "Barclays", "Societe Generale", "US Bank", "Visa", "RCBC"]
    },
    healthcare: {
        name: "Healthcare / Pharma",
        icon: "fa-hospital",
        compliance: ["HIPAA", "HITECH", "FDA 21 CFR Part 11", "GDPR"],
        painPoints: [
            "HIPAA compliance across distributed clinical environments",
            "IoT/medical device security (MRI, infusion pumps, patient monitors)",
            "Telemedicine platform performance and security",
            "EHR system access from multiple locations and devices",
            "Ransomware targeting healthcare — highest industry target",
            "Merging clinic networks post-acquisition",
            "Securing guest Wi-Fi from clinical networks",
            "Limited IT staff at smaller clinic sites"
        ],
        discoveryQuestions: [
            "How many clinical sites do you manage, and what does your HIPAA segmentation look like across those locations?",
            "How are you handling IoT and medical device security? Can you see all connected devices on your network?",
            "What does your telemedicine architecture look like? Are you seeing latency or quality issues?",
            "How are you separating guest Wi-Fi from clinical networks and EHR systems?",
            "Have you experienced any ransomware attempts? What's your micro-segmentation strategy to contain lateral movement?",
            "With limited IT staff at smaller clinics, how quickly can you deploy and manage security at those sites?",
            "Are you using a VPN for clinician remote access? How's that scaling with telemedicine growth?",
            "How do you handle network integration when you acquire a new clinic or practice?"
        ],
        versaPitch: "Healthcare organizations choose Versa because we deliver HIPAA-compliant segmentation, IoT device security, and zero-trust access for EHR systems — all from one platform. Our zero-touch provisioning means new clinic sites go live in hours, not weeks. Versa's micro-segmentation contains ransomware lateral movement, and our SD-LAN separates guest Wi-Fi from clinical networks natively.",
        customerProof: ["Quest Diagnostics", "Advanced Dermatology (ADCS)", "Pharmaceutical companies"]
    },
    retail: {
        name: "Retail / E-Commerce",
        icon: "fa-shopping-cart",
        compliance: ["PCI-DSS", "GDPR", "CCPA"],
        painPoints: [
            "PCI-DSS compliance across hundreds/thousands of store locations",
            "Securing point-of-sale systems and payment processing",
            "Guest Wi-Fi management alongside POS networks",
            "Seasonal traffic spikes and scaling requirements",
            "IoT devices: smart shelves, cameras, digital signage",
            "MPLS costs across large store footprints",
            "Rapid new store deployment requirements",
            "Supply chain connectivity and warehouse security"
        ],
        discoveryQuestions: [
            "How many retail locations are you managing, and how do you handle PCI compliance at each one?",
            "What does your POS network segmentation look like? Is POS traffic separated from guest Wi-Fi and back-office systems?",
            "How quickly can you bring a new store location online from a networking and security standpoint?",
            "What are you spending on MPLS across your store footprint? Have you explored broadband + SD-WAN as an alternative?",
            "How are you handling IoT devices in stores — cameras, digital signage, smart shelves? Are those segmented?",
            "During peak seasons like Black Friday, how does your network handle the traffic spikes?",
            "What does your supply chain connectivity look like between stores, warehouses, and headquarters?",
            "Are your store managers able to self-service any network issues, or does everything require central IT?"
        ],
        versaPitch: "Retailers with hundreds of locations choose Versa to replace expensive MPLS with SD-WAN, achieve PCI-DSS segmentation from one platform, and deploy new stores in hours with zero-touch provisioning. Our SD-LAN natively separates POS, guest Wi-Fi, and IoT traffic. Companies like Macy's, Ace Hardware, and FamilyMart rely on Versa.",
        customerProof: ["Macy's", "Ace Hardware", "FamilyMart"]
    },
    manufacturing: {
        name: "Manufacturing",
        icon: "fa-industry",
        compliance: ["IEC 62443", "NIST CSF", "ISO 27001"],
        painPoints: [
            "IT/OT convergence — connecting operational technology to IT networks",
            "IoT and IIoT device security on factory floors",
            "Securing SCADA/ICS systems without disrupting production",
            "Multi-site global operations with varying connectivity",
            "Supply chain partner connectivity and segmentation",
            "Limited IT staff at plant locations",
            "Legacy systems that can't be patched or updated",
            "Downtime costs potentially millions per hour"
        ],
        discoveryQuestions: [
            "How are you handling the IT/OT convergence at your plants? Is your OT network fully segmented from IT?",
            "What does your IoT/IIoT footprint look like on the factory floor? How are you securing those devices?",
            "Are your SCADA and ICS systems connected to the broader network? What protections are in place?",
            "How many manufacturing sites do you operate globally, and what does connectivity look like at each?",
            "What would an hour of production downtime cost your organization?",
            "How do you connect with supply chain partners? What security controls exist at those boundaries?",
            "Do you have legacy systems on the plant floor that can't be patched? How do you protect those?",
            "With limited IT staff at plant sites, how quickly can you respond to a security incident?"
        ],
        versaPitch: "Manufacturers trust Versa for IT/OT segmentation, IoT security, and global multi-site connectivity. Our micro-segmentation protects legacy OT systems that can't be patched, and our zero-touch provisioning keeps plant-level IT simple. Versa's SD-WAN connects global operations with application-aware routing that prioritizes production-critical traffic. John Deere and Cargill run on Versa.",
        customerProof: ["John Deere", "Cargill", "Samsung"]
    },
    technology: {
        name: "Technology",
        icon: "fa-microchip",
        compliance: ["SOC 2", "ISO 27001", "GDPR", "CCPA"],
        painPoints: [
            "Multi-cloud environments (AWS + Azure + GCP) requiring consistent security",
            "Distributed engineering teams needing low-latency access to dev environments",
            "SaaS application performance and security",
            "IP protection and data loss prevention",
            "Rapid scaling — new offices, acquisitions, remote employees",
            "DevSecOps integration requirements",
            "GenAI security and governance",
            "API security across microservices architectures"
        ],
        discoveryQuestions: [
            "What does your multi-cloud environment look like? Are you running consistent security policies across AWS, Azure, and GCP?",
            "How are your engineering teams accessing development and staging environments? Is that traffic optimized?",
            "What does your SaaS footprint look like? How many cloud apps are you managing access to?",
            "How are you protecting intellectual property? What DLP controls are in place?",
            "Are your teams using GenAI tools? What governance do you have around AI data exposure?",
            "How quickly do you need to bring new offices or acquired companies online?",
            "What does your API security look like across your microservices?",
            "How are you handling security for your distributed/remote engineering workforce?"
        ],
        versaPitch: "Tech companies choose Versa for unified multi-cloud security, GenAI governance, and the ability to scale rapidly with acquisitions. Our DLP protects IP across cloud and SaaS applications, while our SD-WAN optimizes developer access to multi-cloud environments. Adobe saved over $500K with Versa, and Samsung and Amazon also rely on our platform.",
        customerProof: ["Adobe", "Samsung", "Amazon", "NortonLifeLock"]
    },
    telecom: {
        name: "Telecommunications",
        icon: "fa-tower-broadcast",
        compliance: ["FCC", "SOX", "GDPR", "Local telecom regulations"],
        painPoints: [
            "Offering managed SASE/SD-WAN services to enterprise customers",
            "Multi-tenancy at carrier scale — thousands of customers",
            "Service differentiation in competitive market",
            "Network transformation from legacy MPLS to SD-WAN",
            "5G integration and edge computing",
            "Operational efficiency across massive subscriber base",
            "White-labeling and branding requirements"
        ],
        discoveryQuestions: [
            "Are you looking to offer managed SD-WAN or SASE services to your enterprise customers?",
            "How many enterprise customers would you be managing on a multi-tenant platform?",
            "What's your current managed service architecture? Are you looking to replace or augment?",
            "How important is white-labeling and branding for your managed service offering?",
            "What does your 5G and edge computing strategy look like for enterprise services?",
            "How are you differentiating from other carriers in the managed security space?",
            "What's your deployment automation capability? Can you spin up a new customer environment in minutes?"
        ],
        versaPitch: "Versa was purpose-built for service providers with carrier-grade multi-tenancy that scales to thousands of customers. More than 120 service providers worldwide — including Comcast, Verizon, Virgin Media, Tata Communications, and Swisscom — deliver managed SD-WAN and SASE services on Versa. Our platform supports white-labeling, per-tenant routing, and automated provisioning.",
        customerProof: ["Comcast", "Verizon", "Virgin Media", "Tata Communications", "Swisscom"]
    },
    education: {
        name: "Education",
        icon: "fa-graduation-cap",
        compliance: ["FERPA", "CIPA", "COPPA", "E-Rate"],
        painPoints: [
            "Securing campus and remote learning environments",
            "Student data privacy (FERPA compliance)",
            "Content filtering requirements (CIPA compliance)",
            "Bring-your-own-device (BYOD) policies",
            "Budget constraints and E-Rate funding requirements",
            "Multi-campus or district-wide network management",
            "Guest and student Wi-Fi segmentation",
            "IoT devices: smart boards, security cameras, HVAC"
        ],
        discoveryQuestions: [
            "How many campus or school locations are in your district/system?",
            "How are you handling FERPA compliance for student data across your network?",
            "What does your content filtering look like for CIPA compliance?",
            "How are you managing BYOD — students and faculty bringing personal devices?",
            "What does your network segmentation look like between administrative, academic, and guest traffic?",
            "Are you leveraging E-Rate funding? What are the procurement requirements?",
            "How are you securing your IoT devices — smart boards, cameras, building systems?",
            "What does your remote learning infrastructure look like?"
        ],
        versaPitch: "Educational institutions choose Versa for unified campus security, FERPA-compliant segmentation, and CIPA content filtering — all from one platform. Our SD-LAN natively separates student, faculty, guest, and IoT traffic. Zero-touch provisioning makes multi-campus deployments simple even with limited IT staff.",
        customerProof: ["University deployments", "K-12 districts"]
    },
    government: {
        name: "Federal / Public Sector",
        icon: "fa-landmark-flag",
        compliance: ["FedRAMP", "FISMA", "NIST 800-53", "NIST 800-171", "ITAR", "CMMC", "IL4/IL5"],
        painPoints: [
            "FedRAMP authorization requirements",
            "Zero Trust Architecture mandates (EO 14028)",
            "Data sovereignty and classified network requirements",
            "Air-gapped environment support",
            "CMMC compliance for defense contractors",
            "Legacy infrastructure modernization",
            "Inter-agency secure connectivity",
            "Budget cycle and procurement complexity"
        ],
        discoveryQuestions: [
            "What FedRAMP authorization level do you require for your network security solution?",
            "Where are you in your Zero Trust Architecture journey per the Executive Order?",
            "Do you have air-gapped or classified network requirements?",
            "What NIST frameworks are you being audited against — 800-53, 800-171, or CMMC?",
            "How are you handling data sovereignty — where is your traffic inspected and logged?",
            "What does your current WAN architecture look like across facilities?",
            "Are you modernizing legacy infrastructure? What's the timeline and budget cycle?",
            "How are you handling secure connectivity between agencies or departments?"
        ],
        versaPitch: "Versa is FedRAMP High Ready and purpose-built for government requirements. Our Sovereign SASE supports air-gapped and fully on-premises deployments required for classified environments. DISA and other federal agencies trust Versa. We align with NIST Zero Trust Architecture mandates and deliver CMMC-compliant segmentation.",
        customerProof: ["DISA", "Federal agencies", "Dorset Council (UK)"]
    },
    energy: {
        name: "Energy / Oil & Gas",
        icon: "fa-oil-well",
        compliance: ["NERC CIP", "TSA Pipeline Security", "IEC 62443", "NIST CSF"],
        painPoints: [
            "Critical infrastructure protection requirements",
            "Remote and harsh-environment site connectivity (rigs, pipelines, wind farms)",
            "IT/OT convergence and SCADA security",
            "TSA pipeline security directives",
            "NERC CIP compliance for power utilities",
            "Environmental monitoring IoT devices",
            "Global operations across jurisdictions",
            "Limited connectivity at remote sites"
        ],
        discoveryQuestions: [
            "How are you securing your SCADA and ICS environments? Is that segmented from IT?",
            "What does connectivity look like at your remote sites — rigs, pipelines, substations?",
            "Are you compliant with TSA Pipeline Security Directives or NERC CIP?",
            "How are you handling the IT/OT boundary security?",
            "What IoT devices do you have deployed for environmental monitoring?",
            "How do you manage security across operations in different countries and jurisdictions?",
            "What happens if connectivity drops at a remote site — do you maintain local security inspection?",
            "What does your incident response look like for remote locations?"
        ],
        versaPitch: "Energy companies choose Versa for critical infrastructure protection, IT/OT segmentation, and connectivity to remote sites. Our on-premises security stack ensures full protection even when cloud connectivity is unavailable — critical for rigs and remote substations. BP and SB Energy trust Versa for their operations.",
        customerProof: ["BP", "SB Energy"]
    },
    hospitality: {
        name: "Hospitality",
        icon: "fa-hotel",
        compliance: ["PCI-DSS", "GDPR", "CCPA", "Local privacy laws"],
        painPoints: [
            "Guest Wi-Fi security and segmentation from POS",
            "PCI-DSS compliance across property locations",
            "Property management system (PMS) security",
            "IoT devices: smart locks, HVAC, lighting, entertainment",
            "Franchise model with varied IT capabilities",
            "Rapid new property deployment",
            "Seasonal scaling and bandwidth management",
            "Guest data privacy across jurisdictions"
        ],
        discoveryQuestions: [
            "How many properties are you managing, and what does your network look like across them?",
            "How are you segmenting guest Wi-Fi from POS and back-office systems?",
            "What does PCI-DSS compliance look like across your properties?",
            "How many IoT devices per property — smart locks, thermostats, entertainment systems?",
            "How quickly can you bring a new property online from a network/security standpoint?",
            "Is this a franchise model? How varied is the IT capability at each property?",
            "How are you handling guest data privacy across different countries and states?",
            "What's your bandwidth management strategy during peak seasons?"
        ],
        versaPitch: "Hospitality brands choose Versa for rapid multi-property deployment, PCI-compliant POS segmentation, and IoT security for smart room technology. Our zero-touch provisioning brings new properties online in hours, and our SD-LAN natively segments guest Wi-Fi from operational networks.",
        customerProof: ["Hospitality chains"]
    },
    transportation: {
        name: "Transportation / Logistics",
        icon: "fa-truck-fast",
        compliance: ["TSA", "DOT", "ISO 27001", "GDPR"],
        painPoints: [
            "Fleet management and tracking system security",
            "Warehouse and distribution center connectivity",
            "IoT sensors and telematics devices",
            "Real-time supply chain visibility",
            "Multi-site operations across regions",
            "Driver and vehicle connectivity",
            "Regulatory compliance across jurisdictions"
        ],
        discoveryQuestions: [
            "How many distribution centers and warehouses are you connecting?",
            "What does your fleet management and telematics infrastructure look like?",
            "How are you securing IoT sensors across your supply chain?",
            "What's your WAN connectivity between distribution hubs?",
            "How do you handle real-time supply chain visibility and the network requirements for that?",
            "What regulatory requirements do you face across different regions?",
            "How quickly do you need to bring new distribution sites online?"
        ],
        versaPitch: "Transportation and logistics companies choose Versa for multi-site SD-WAN connectivity, IoT security for telematics and sensors, and rapid warehouse deployment. Our application-aware routing prioritizes supply chain applications, and our micro-segmentation protects OT systems at distribution centers.",
        customerProof: ["Qatar Airways", "Transportation companies"]
    },
    legal: {
        name: "Legal / Professional Services",
        icon: "fa-scale-balanced",
        compliance: ["Attorney-Client Privilege", "GDPR", "SOC 2", "Data residency"],
        painPoints: [
            "Protecting attorney-client privilege and confidential data",
            "Multi-office connectivity for global firms",
            "Secure access to document management systems",
            "Data residency for international clients",
            "M&A due diligence data protection",
            "Remote attorney access to sensitive case files",
            "Partner and client VPN access"
        ],
        discoveryQuestions: [
            "How are you protecting attorney-client privileged data across your network?",
            "How many office locations globally, and how are they connected?",
            "What does remote access look like for attorneys working from home or traveling?",
            "How do you handle data residency requirements for international clients?",
            "What DLP controls are in place to prevent sensitive document exfiltration?",
            "How are you managing secure access to document management systems like iManage or NetDocuments?",
            "What does your M&A data room security look like?"
        ],
        versaPitch: "Law firms and professional services firms choose Versa for data protection, sovereign deployment options, and secure multi-office connectivity. Our DLP prevents sensitive document exfiltration, our ZTNA provides secure remote access to document management systems, and our Sovereign SASE addresses cross-border data residency requirements.",
        customerProof: ["Professional services firms"]
    },
    other: {
        name: "General Enterprise",
        icon: "fa-building",
        compliance: ["SOC 2", "ISO 27001", "GDPR", "Industry-specific"],
        painPoints: [
            "Network complexity from too many point products",
            "MPLS cost reduction pressure",
            "Remote workforce security and access",
            "Cloud migration and multi-cloud security",
            "Vendor consolidation to reduce operational overhead",
            "Legacy VPN infrastructure limitations",
            "Insufficient visibility across network and security"
        ],
        discoveryQuestions: [
            "What does your current networking and security stack look like? How many vendors are you managing?",
            "What's driving this evaluation — cost, security gaps, digital transformation, or something else?",
            "How many sites and remote users do you need to support?",
            "What's your cloud strategy — are you multi-cloud, hybrid, or still primarily on-prem?",
            "How are your remote workers connecting today? VPN? Direct cloud access?",
            "What does your budget and decision timeline look like?",
            "Who else is involved in this decision?",
            "Have you looked at other vendors? Who are you comparing?"
        ],
        versaPitch: "Versa's Unified SASE platform consolidates SD-WAN, SSE, NGFW, and LAN security into a single platform with one console. This means fewer vendors, lower TCO, better security, and simplified operations. Thousands of enterprises and 120+ service providers worldwide trust Versa.",
        customerProof: ["Dell — 130% ROI, $1M savings", "Adobe — $500K+ savings", "Dorset Council — £1M savings"]
    }
};

// ===================== USE CASE DATA =====================
const USE_CASES = {
    sdwan: {
        name: "SD-WAN",
        description: "Replace MPLS, improve application performance, simplify WAN management",
        discoveryQuestions: [
            "What's your current WAN architecture — MPLS, broadband, hybrid?",
            "What are you paying per month for MPLS circuits? What's the total annual WAN spend?",
            "How long does it take to provision a new site today?",
            "Which applications are most critical for your business? Are they SaaS, cloud-hosted, or on-prem?",
            "What SLA requirements do you have for voice, video, and real-time applications?",
            "How many WAN links per site do you have? Do you have redundancy?",
            "What routing protocols are you running — BGP, OSPF, IS-IS?",
            "How are you handling traffic prioritization and QoS today?",
            "Do you have sites with limited or unreliable connectivity?",
            "What does your current change management process look like for WAN configuration?"
        ],
        versaValue: [
            "Replace MPLS with broadband + SD-WAN — customers see 30-60% WAN cost reduction",
            "Zero-touch provisioning: new sites live in hours vs. weeks",
            "Application-aware routing with per-packet path steering",
            "Full enterprise routing stack: BGP, OSPF, IS-IS, multicast, VRFs",
            "Gartner SD-WAN Magic Quadrant Leader — 5 consecutive years",
            "SD-WAN Capability Leader (4.6 score) in Gartner Critical Capabilities for Single-Vendor SASE 2025"
        ]
    },
    sase: {
        name: "Unified SASE",
        description: "Converge networking and security into one platform",
        discoveryQuestions: [
            "How many separate networking and security vendors are you managing today?",
            "What's the operational overhead of managing multiple consoles and policies?",
            "Are you experiencing security gaps between your network and security tools?",
            "How do you enforce consistent policy across branch, cloud, and remote users?",
            "What's your timeline for converging networking and security?",
            "Are you evaluating single-vendor SASE or multi-vendor SASE?",
            "What's more important to you — networking capabilities or security capabilities?",
            "How are you handling the skills gap — do you have separate network and security teams?"
        ],
        versaValue: [
            "True Unified SASE: SD-WAN + SSE + NGFW in single OS (VOS)",
            "Single management console for all functions",
            "No security gaps — consistent policy across all edges",
            "Gartner Critical Capabilities SASE 2025: Highest scores in foundational SASE platform",
            "Phased adoption: start with SD-WAN or SSE and expand",
            "Reduces vendor count from 4-8 down to 1"
        ]
    },
    vpn: {
        name: "VPN Replacement",
        description: "Modernize remote access with ZTNA",
        discoveryQuestions: [
            "What VPN solution are you using today — AnyConnect, GlobalProtect, other?",
            "How many concurrent VPN users do you support?",
            "Are you experiencing VPN scalability or performance issues?",
            "Does your VPN give full network access, or is it application-specific?",
            "How are you verifying device posture before granting access?",
            "What applications do remote users need access to — cloud, on-prem, or both?",
            "Have you explored Zero Trust Network Access as a VPN replacement?",
            "What does your current remote access architecture look like — hub-and-spoke, split tunnel?"
        ],
        versaValue: [
            "ZTNA replaces VPN with application-specific access — no full network access",
            "Continuous device posture assessment and adaptive access",
            "Supports access to cloud AND on-premises applications",
            "Eliminates VPN concentrator bottlenecks",
            "CyberRatings AAA rating for ZTNA",
            "Part of Unified SASE — no separate ZTNA product needed"
        ]
    },
    firewall: {
        name: "Firewall Refresh",
        description: "Modernize legacy firewalls with NGFW",
        discoveryQuestions: [
            "When do your current firewall contracts expire?",
            "What firewall vendor(s) are you using today?",
            "How many firewall appliances are you managing across all sites?",
            "What's the total cost of your current firewall infrastructure including support/maintenance?",
            "Are you running full UTM features — IPS, AV, URL filtering, SSL inspection?",
            "What's your actual throughput with all security features enabled?",
            "How are you handling firewall management across multiple sites — centralized or per-device?",
            "Are you considering consolidating firewall with SD-WAN and SSE?"
        ],
        versaValue: [
            "99.98% security effectiveness — #1 in CyberRatings Enterprise Firewall test",
            "100% exploit evasion resistance",
            "NGFW integrated with SD-WAN and SSE — not a separate product",
            "Runs on standard x86 hardware — no proprietary ASIC lock-in",
            "Consistent firewall policy across branch, data center, and cloud",
            "Lower cost per Mbps than competitors"
        ]
    },
    consolidation: {
        name: "Product Consolidation",
        description: "Reduce vendor sprawl and operational complexity",
        discoveryQuestions: [
            "How many networking and security vendors are you managing today? Can you list them?",
            "What's the total spend across all these vendors — licenses, hardware, support?",
            "How many FTEs are dedicated to managing these separate tools?",
            "Are you experiencing integration issues between vendors?",
            "How does your team handle correlated alerts across different security tools?",
            "What's the business impact of the operational complexity?",
            "Have you quantified the total cost of ownership across all vendors?",
            "Is there a mandate from leadership to simplify and consolidate?"
        ],
        versaValue: [
            "Replace 4-8 vendors with one unified platform",
            "Dell achieved 130% ROI and $1M savings with Versa consolidation",
            "Adobe saved $500K+ by consolidating on Versa",
            "Single console eliminates context-switching between tools",
            "Unified policy reduces security gaps between products",
            "Fewer renewal cycles, fewer vendor relationships, fewer integration headaches"
        ]
    },
    sovereign: {
        name: "Sovereign SASE",
        description: "Data sovereignty, compliance, and air-gapped deployments",
        discoveryQuestions: [
            "What data sovereignty requirements do you have? Which regulations?",
            "Do you need to keep traffic inspection and logging within specific countries?",
            "Do you have air-gapped environments that need security?",
            "What are your FedRAMP or government compliance requirements?",
            "Are you subject to GDPR, DORA, or other regional data protection laws?",
            "How are you currently ensuring data doesn't leave your jurisdiction?",
            "Do you need full on-premises deployment with no cloud dependency?",
            "Who controls your encryption keys today?"
        ],
        versaValue: [
            "Fully on-premises, private, and sovereign SASE deployments",
            "Air-gapped environment support with full security stack",
            "FedRAMP High Ready certification",
            "In-country inspection, logging, and key custody",
            "No cloud dependency — complete local control",
            "Sovereign deployment without sacrificing functionality"
        ]
    },
    ztna: {
        name: "Zero Trust / ZTNA",
        description: "Implement Zero Trust Architecture across the organization",
        discoveryQuestions: [
            "Where are you in your Zero Trust journey?",
            "How are you verifying user identity before granting access today?",
            "What's your device posture assessment process?",
            "Are you implementing micro-segmentation? How?",
            "How do you handle least-privilege access across applications?",
            "What visibility do you have into user-to-application traffic flows?",
            "Are you following any specific Zero Trust frameworks (NIST, Forrester)?",
            "How are you handling Zero Trust for on-premises vs. cloud applications?"
        ],
        versaValue: [
            "Zero Trust built into the platform — not bolted on",
            "Continuous verification: identity + device posture + context",
            "Micro-segmentation across LAN, WAN, and cloud",
            "CyberRatings AAA rating for ZTNA",
            "Consistent Zero Trust policy for on-prem AND cloud apps",
            "Versa Zero Trust Everywhere: same policy at every edge"
        ]
    },
    sdlan: {
        name: "LAN Modernization",
        description: "Modernize campus and branch LAN with integrated security",
        discoveryQuestions: [
            "What does your current LAN infrastructure look like — switches, wireless, vendor?",
            "Are your LAN and WAN managed by the same team or different teams?",
            "How are you handling guest Wi-Fi segmentation from corporate traffic?",
            "What micro-segmentation capabilities do you have on the LAN today?",
            "Are you using NAC for network access control? How complex is that?",
            "How many switch and AP vendors are you managing?",
            "What does your east-west traffic visibility look like within the LAN?",
            "Are you planning any campus or branch LAN refreshes?"
        ],
        versaValue: [
            "SD-LAN natively integrated with SD-WAN and security — same platform",
            "LAN switching and Wi-Fi management built in",
            "Identity-aware micro-segmentation across LAN and WAN",
            "No proprietary protocols — open standards",
            "Standard 1RU boxes with Broadcom ASICs and standard optics",
            "Eliminates need for separate NAC, switching, and wireless vendors"
        ]
    },
    ma: {
        name: "Mergers & Acquisitions",
        description: "Rapidly integrate acquired company networks",
        discoveryQuestions: [
            "Have you recently completed or are you planning any acquisitions?",
            "What does network integration typically look like post-acquisition? Timeline?",
            "How do you handle conflicting IP address spaces between organizations?",
            "What security policy harmonization challenges do you face during M&A?",
            "How long does it take to bring an acquired company onto your network today?",
            "Do acquired companies typically have different vendors and architectures?",
            "What's the business impact of slow network integration post-acquisition?"
        ],
        versaValue: [
            "Zero-touch provisioning: integrate acquired sites in hours, not months",
            "VRF-based segmentation handles overlapping IP spaces",
            "Single platform can overlay onto any existing infrastructure",
            "Unified policy enforcement across legacy and new environments",
            "Multi-tenant architecture keeps acquired entities separate until ready to merge",
            "Phased migration: no rip-and-replace required"
        ]
    },
    iot: {
        name: "IoT Security",
        description: "Discover, segment, and secure IoT devices",
        discoveryQuestions: [
            "How many IoT devices are connected to your network? Do you have full visibility?",
            "What types of IoT devices — cameras, sensors, medical devices, building systems?",
            "How are IoT devices segmented from your corporate network today?",
            "Have you experienced any security incidents originating from IoT devices?",
            "Can you identify rogue or unauthorized devices on your network?",
            "What's your IoT device lifecycle management process?",
            "Are IoT devices on the same VLANs as corporate endpoints?"
        ],
        versaValue: [
            "IoT device discovery and classification",
            "Automatic micro-segmentation for IoT traffic",
            "Behavioral analysis for anomaly detection",
            "Separate IoT traffic from corporate and guest networks",
            "Policy enforcement at the LAN edge — closest to the device",
            "Integrated with UEBA for user and entity behavior analytics"
        ]
    },
    genai: {
        name: "GenAI Security",
        description: "Govern and secure enterprise GenAI usage",
        discoveryQuestions: [
            "Are your employees using GenAI tools like ChatGPT, Copilot, or Gemini?",
            "Do you have visibility into which AI tools are being used and what data is being shared?",
            "Have you established AI governance policies?",
            "Are you concerned about sensitive data being uploaded to AI platforms?",
            "How are you controlling which AI applications are allowed vs. blocked?",
            "What DLP controls do you have for AI-bound traffic?",
            "Is GenAI security a priority for your CISO or security leadership?"
        ],
        versaValue: [
            "GenAI Firewall: visibility and control over AI application usage",
            "DLP for AI-bound traffic — prevent sensitive data uploads",
            "Application-level control: allow, block, or restrict specific AI tools",
            "Shadow AI discovery — find unsanctioned AI tool usage",
            "Policy enforcement at network level — works regardless of endpoint",
            "Versa AI-powered security analytics"
        ]
    },
    unknown: {
        name: "Discovery (Unknown Use Case)",
        description: "Open-ended discovery when use case isn't clear yet",
        discoveryQuestions: [
            "What's driving this conversation today — was there a specific event or initiative?",
            "What does your current networking and security architecture look like?",
            "What are the top 2-3 pain points your team is dealing with right now?",
            "Where are you in your digital transformation journey?",
            "Are you evaluating other vendors? Who have you looked at?",
            "What does your budget and decision timeline look like?",
            "Who else is involved in evaluating and deciding on this?",
            "If you could wave a magic wand, what would your ideal network and security architecture look like?",
            "What keeps you up at night from a security or network perspective?",
            "How many total sites and remote users do you need to cover?"
        ],
        versaValue: [
            "Unified SASE platform: SD-WAN + SSE + NGFW in one",
            "Single console management — simplify operations",
            "99.90%+ security effectiveness — independently validated",
            "Flexible deployment: on-prem, cloud, hybrid, sovereign",
            "Gartner Magic Quadrant Leader for SD-WAN — 5 consecutive years",
            "Thousands of enterprise customers, 120+ service providers globally"
        ]
    }
};

// ===================== PERSONA DATA =====================
const PERSONAS = {
    // Leadership / Executives
    ciso: {
        title: "CISO",
        level: "executive",
        focus: "security",
        cares: ["Risk reduction", "Compliance posture", "Board reporting", "Vendor consolidation", "Total cost of ownership", "Incident response", "Zero Trust strategy"],
        talkTrack: "Focus on risk metrics, compliance alignment, and board-level outcomes. CISOs care about quantifiable risk reduction, not technical features. Lead with CyberRatings effectiveness scores and consolidation ROI.",
        questions: [
            "What keeps you up at night from a security risk perspective?",
            "How are you reporting security posture to the board today?",
            "What's your Zero Trust strategy and timeline?",
            "How many security vendors are you managing, and what's the total spend?",
            "If you had to quantify your current security effectiveness, what would that number be?",
            "What compliance frameworks are you being audited against?",
            "How does vendor consolidation fit into your security strategy?"
        ]
    },
    cio: {
        title: "CIO / CTO",
        level: "executive",
        focus: "business",
        cares: ["Digital transformation", "IT modernization", "Budget optimization", "Operational efficiency", "Cloud strategy", "Innovation enablement", "Competitive advantage"],
        talkTrack: "Focus on business outcomes, digital transformation enablement, and operational efficiency. CIOs think in terms of ROI, time-to-value, and organizational agility. Lead with Dell's 130% ROI and Adobe's $500K savings.",
        questions: [
            "What's driving your digital transformation priorities this year?",
            "How is your current infrastructure supporting or limiting business agility?",
            "What does your cloud migration strategy look like?",
            "Where are you seeing the biggest IT operational inefficiencies?",
            "What's your approach to vendor consolidation and budget optimization?",
            "How are you enabling innovation while maintaining security?",
            "What's the business impact of your current network/security architecture?"
        ]
    },
    vp_it: {
        title: "VP of IT / VP of Security",
        level: "executive",
        focus: "both",
        cares: ["Team productivity", "Vendor management", "Budget allocation", "Strategic initiatives", "Talent retention", "Operational metrics"],
        talkTrack: "VPs bridge strategy and execution. Focus on how Versa simplifies their team's operations, reduces vendor management overhead, and frees up talent for strategic projects. They care about the 'people cost' of current solutions.",
        questions: [
            "How many FTEs are dedicated to managing your current network and security infrastructure?",
            "What strategic initiatives are being delayed because your team is stuck in operational mode?",
            "How many vendor relationships are you managing, and how much time goes into renewals and escalations?",
            "What's your team's biggest skill gap — networking or security?",
            "How would consolidating vendors impact your team's productivity?",
            "What's your budget cycle, and when are key renewal dates?"
        ]
    },
    dir_network: {
        title: "Director of Networking",
        level: "executive",
        focus: "networking",
        cares: ["Network reliability", "WAN performance", "SD-WAN architecture", "Routing depth", "Site deployment speed", "Carrier relationships"],
        talkTrack: "Networking Directors want to see routing depth and SD-WAN maturity. Lead with Versa's full routing stack (BGP, OSPF, IS-IS, VRFs, multicast), Gartner SD-WAN leadership, and carrier-grade architecture. These are technical buyers who respect engineering excellence.",
        questions: [
            "What does your current WAN architecture look like — MPLS, broadband, hybrid?",
            "What routing protocols are you running, and how complex are your routing requirements?",
            "How long does it take to provision a new site today?",
            "What's your experience been with your current SD-WAN or WAN vendor?",
            "Are you looking at converging networking and security, or keeping them separate?",
            "How are you handling traffic engineering and path optimization?",
            "What does your carrier/ISP relationship landscape look like?"
        ]
    },
    dir_security: {
        title: "Director of Security",
        level: "executive",
        focus: "security",
        cares: ["Threat detection", "Security effectiveness", "Incident response", "Security architecture", "Compliance", "Team skills"],
        talkTrack: "Security Directors want proof. Lead with CyberRatings scores (99.90% effectiveness, 100% exploit evasion), independent validation, and the security architecture advantages of Unified SASE. They need to trust the security before anything else.",
        questions: [
            "How are you measuring security effectiveness today?",
            "What does your threat detection and response capability look like?",
            "Where are your biggest security visibility gaps?",
            "How are you handling SSL/TLS inspection at scale?",
            "What's your micro-segmentation strategy?",
            "Are you seeing security gaps between your current networking and security tools?",
            "How important is independent third-party validation of security effectiveness to you?"
        ]
    },
    dir_infra: {
        title: "Director of Infrastructure",
        level: "executive",
        focus: "infrastructure",
        cares: ["Infrastructure modernization", "Cloud migration", "Data center strategy", "Deployment automation", "TCO", "Vendor management"],
        talkTrack: "Infrastructure Directors are dealing with legacy modernization and cloud migration. Focus on deployment flexibility (on-prem, cloud, hybrid), zero-touch provisioning, and white-box hardware support. They appreciate architecture diagrams and TCO comparisons.",
        questions: [
            "What does your infrastructure modernization roadmap look like?",
            "How are you handling the on-prem to cloud migration?",
            "What's your hardware refresh cycle, and what's coming up for renewal?",
            "Are you dealing with vendor lock-in from proprietary hardware?",
            "How automated is your deployment process for new sites?",
            "What does your data center connectivity strategy look like?",
            "How are you handling multi-cloud networking and security?"
        ]
    },
    // Management
    net_eng_mgr: {
        title: "Network Engineering Manager",
        level: "management",
        focus: "networking",
        cares: ["Team efficiency", "Technical depth", "Day-2 operations", "Troubleshooting", "Documentation", "Change management"],
        talkTrack: "Engineering Managers live in Day-2 operations. They want to know: How easy is it to troubleshoot? How good is the CLI? How does monitoring work? Show them Versa's operational simplicity, unified analytics, and the single console advantage. They'll be the ones living in the tool every day.",
        questions: [
            "What does your Day-2 operations workflow look like? How much time does troubleshooting take?",
            "How many different tools does your team use for monitoring and management?",
            "What's your change management process for network configuration changes?",
            "How are you handling capacity planning and growth?",
            "What does your team's learning curve look like when you bring on new tools?",
            "How satisfied is your team with the current management and monitoring capabilities?"
        ]
    },
    sec_mgr: {
        title: "Cybersecurity Manager",
        level: "management",
        focus: "security",
        cares: ["Alert management", "Policy consistency", "Compliance audits", "Vulnerability management", "Team capacity", "Tool rationalization"],
        talkTrack: "Security Managers are drowning in alerts and tool sprawl. Lead with how Versa unifies security visibility, reduces alert fatigue through integrated analytics, and simplifies compliance reporting. They want fewer tools, not more.",
        questions: [
            "How many security alerts is your team processing daily? What's the false positive rate?",
            "How consistent are your security policies across branch, remote, and cloud?",
            "What does your compliance audit preparation look like? How much time does it take?",
            "How many security tools are your analysts context-switching between?",
            "What's your vulnerability management and patching process?",
            "Where are the gaps in your security visibility today?"
        ]
    },
    cloud_sec_mgr: {
        title: "Cloud Security Manager",
        level: "management",
        focus: "security",
        cares: ["Cloud security posture", "SaaS security", "CASB", "Cloud DLP", "Multi-cloud policy", "Shadow IT"],
        talkTrack: "Cloud Security Managers are focused on SaaS visibility, shadow IT, and multi-cloud security policy. Lead with Versa's CASB, SSPM, and DLP capabilities as part of the unified platform — not a separate bolt-on product.",
        questions: [
            "How many SaaS applications are you managing access and security for?",
            "What's your visibility into shadow IT and unsanctioned cloud apps?",
            "How are you enforcing DLP across cloud and SaaS platforms?",
            "What does your CASB deployment look like today?",
            "How consistent are security policies across your cloud environments?",
            "Are you monitoring SaaS security posture (misconfigurations, over-permissioned users)?"
        ]
    },
    sr_architect: {
        title: "Senior / Principal Architect",
        level: "management",
        focus: "both",
        cares: ["Architecture design", "Scalability", "Integration", "Standards", "Future-proofing", "Technical evaluation"],
        talkTrack: "Architects think in systems. Show them the VersaONE architecture — single OS, single-pass processing, how components integrate, API capabilities, and scalability limits. They want to understand HOW it works, not just WHAT it does. Give them depth.",
        questions: [
            "What's your target architecture for networking and security over the next 3-5 years?",
            "How do you evaluate integration between networking and security components?",
            "What are your scalability requirements — sites, users, throughput?",
            "How important is API-first architecture and automation to you?",
            "What standards and frameworks are you designing against?",
            "How are you future-proofing for emerging requirements like AI security and sovereign deployment?"
        ]
    },
    // Intermediate
    sr_net_eng: {
        title: "Senior Network Engineer",
        level: "intermediate",
        focus: "networking",
        cares: ["CLI access", "Routing depth", "Troubleshooting tools", "Deployment automation", "Performance metrics"],
        talkTrack: "Senior Network Engineers are hands-on technical evaluators. They want to see the CLI, understand routing capabilities, and test failover scenarios. Lead with Versa's full routing stack and operational simplicity. These are your POC champions.",
        questions: [
            "What's your experience with your current SD-WAN platform?",
            "How complex are your routing requirements?",
            "What's your deployment and provisioning workflow?",
            "How do you handle troubleshooting and root cause analysis today?",
            "What does your monitoring and alerting stack look like?"
        ]
    },
    solutions_arch: {
        title: "Solutions Architect",
        level: "intermediate",
        focus: "both",
        cares: ["Solution design", "Integration", "Use case mapping", "POC planning", "Technical requirements"],
        talkTrack: "Solutions Architects map business requirements to technical solutions. Help them see how Versa addresses their specific use cases. They'll drive the technical evaluation and influence the decision criteria.",
        questions: [
            "What use cases are you trying to solve for in this evaluation?",
            "What are your must-have vs. nice-to-have technical requirements?",
            "How do you plan to evaluate vendors — POC, RFP, reference calls?",
            "What integrations are important for your environment?",
            "Who else will be involved in the technical evaluation?"
        ]
    },
    sec_arch: {
        title: "Security Architect",
        level: "intermediate",
        focus: "security",
        cares: ["Security architecture", "Zero Trust design", "Threat modeling", "Encryption standards", "Compliance architecture"],
        talkTrack: "Security Architects design the security framework. Lead with Versa's Zero Trust architecture, single-pass inspection engine, and how security is embedded into the network fabric — not bolted on top. They appreciate architecture-level depth.",
        questions: [
            "What does your target Zero Trust architecture look like?",
            "How are you designing micro-segmentation across your environment?",
            "What's your approach to SSL/TLS inspection?",
            "How do you handle security for east-west traffic?",
            "What's your threat modeling process for new infrastructure decisions?"
        ]
    },
    cloud_arch: {
        title: "Cloud Architect",
        level: "intermediate",
        focus: "infrastructure",
        cares: ["Cloud connectivity", "Multi-cloud networking", "Cloud security", "IaC", "Cloud cost optimization"],
        talkTrack: "Cloud Architects care about cloud-native integration and multi-cloud consistency. Show them Versa's cloud gateway architecture, direct cloud connectivity, and Infrastructure-as-Code capabilities.",
        questions: [
            "What does your multi-cloud architecture look like?",
            "How are you connecting branches and users to cloud workloads?",
            "What does your cloud security architecture look like?",
            "Are you using Infrastructure-as-Code for network and security provisioning?",
            "How are you optimizing cloud networking costs?"
        ]
    },
    infra_arch: {
        title: "Infrastructure Architect",
        level: "intermediate",
        focus: "infrastructure",
        cares: ["Infrastructure design", "Deployment models", "Hardware/software", "Scalability", "Standardization"],
        talkTrack: "Infrastructure Architects want deployment flexibility and standardization. Lead with Versa's ability to run on appliances, VMs, cloud, or white-box hardware. Show them how VOS standardizes operations regardless of deployment model.",
        questions: [
            "What's your infrastructure refresh timeline?",
            "How standardized is your infrastructure across sites?",
            "Are you looking at appliance-based, virtual, or cloud-based deployment?",
            "What are your scalability requirements?",
            "How do you handle infrastructure across different regions?"
        ]
    },
    // Early Career
    net_eng: {
        title: "Network Engineer",
        level: "early",
        focus: "networking",
        cares: ["Ease of use", "Documentation", "Training", "Day-to-day operations", "Monitoring"],
        talkTrack: "Network Engineers will be the daily operators. Focus on ease of use, training resources (Versa Academy), documentation quality, and how the single console simplifies their daily workflow. They'll be your internal champion if they love the tool.",
        questions: [
            "What tools are you using day-to-day for network management?",
            "What's your biggest operational pain point?",
            "How do you handle troubleshooting today?",
            "What training or certification would help your team adopt a new platform?",
            "How satisfied are you with your current vendor's support?"
        ]
    },
    sec_eng: {
        title: "Security Engineer",
        level: "early",
        focus: "security",
        cares: ["Alert triage", "Policy management", "Investigation tools", "Incident response", "Automation"],
        talkTrack: "Security Engineers live in alerts and policy management. Show them how Versa's unified analytics reduce alert fatigue, how policies are consistent across all edges, and how investigations are faster with correlated data in one console.",
        questions: [
            "How many alerts are you processing daily?",
            "What does your investigation and triage workflow look like?",
            "How are you managing security policies across different locations?",
            "What security automation do you have in place?",
            "Where are your biggest visibility gaps?"
        ]
    },
    net_admin: {
        title: "Network / Security Analyst",
        level: "early",
        focus: "both",
        cares: ["Monitoring", "Reporting", "Compliance checks", "Operational tasks", "Tool usability"],
        talkTrack: "Analysts need clear dashboards, easy reporting, and efficient operational workflows. Show them Versa's unified analytics dashboard, compliance reporting capabilities, and how the single console reduces context-switching.",
        questions: [
            "What does your reporting workflow look like?",
            "How many different tools do you log into on a daily basis?",
            "What's the most time-consuming part of your day?",
            "How do you generate compliance reports today?",
            "What would make your daily operations easier?"
        ]
    }
};

// ===================== MEDDIC FRAMEWORK =====================
const MEDDIC = {
    M: {
        letter: "M",
        name: "Metrics",
        color: "m-color",
        definition: "Quantifiable measures of value the customer expects from implementing the solution.",
        whyItMatters: "Without metrics, you can't build a business case. Metrics anchor the deal in measurable ROI and prevent it from stalling.",
        versaContext: "Versa delivers measurable outcomes: Dell achieved 130% ROI and $1M savings, Adobe saved $500K+, Dorset Council saved £1M. CyberRatings scores (99.90% effectiveness) provide security metrics.",
        questions: [
            "What metrics matter most to your organization — cost savings, risk reduction, operational efficiency, or all three?",
            "What's your current annual spend on networking and security infrastructure?",
            "How many FTEs are dedicated to managing your current tools?",
            "What's the cost of a security incident to your organization?",
            "What would a 30-60% reduction in WAN costs mean for your budget?",
            "How much time does your team spend on operations vs. strategic projects?",
            "What's the mean time to deploy a new site today? What would reducing that to hours mean?",
            "Can you quantify the productivity impact of network/security downtime?"
        ],
        tips: [
            "Always tie discovery back to specific dollar amounts or time savings",
            "If they can't articulate metrics, help them build the business case",
            "Get metrics EARLY — they justify budget and accelerate decision process",
            "Use Versa customer proof points: Dell 130% ROI, Adobe $500K+ savings"
        ]
    },
    E: {
        letter: "E",
        name: "Economic Buyer",
        color: "e-color",
        definition: "The person with the authority and budget to approve the purchase. Often a VP, CIO, CISO, or CFO.",
        whyItMatters: "If you're not connected to the economic buyer, the deal is at risk. Technical champions can't sign checks.",
        versaContext: "For Versa deals, the economic buyer is typically the CIO, CISO, or VP of IT/Infrastructure. In larger enterprises, it may require CFO approval. Position Versa's consolidation ROI and TCO reduction for this audience.",
        questions: [
            "Who has the final authority to approve the budget for this initiative?",
            "Is this funded from networking budget, security budget, or a combined IT budget?",
            "What's the budget range allocated for this project?",
            "Has this initiative been approved at the executive level, or are we still building the business case?",
            "Who signs off on vendor selection — is it the same person who controls budget?",
            "Are there other stakeholders who can block or delay the purchase?",
            "What's the procurement process — direct purchase, RFP, or through a partner/VAR?",
            "Is there a board-level mandate driving this initiative?"
        ],
        tips: [
            "Ask 'Who else needs to be in the room for this decision?' early",
            "Map the org chart — understand reporting lines",
            "If you haven't met the EB, you haven't qualified the deal",
            "CFOs care about TCO and consolidation savings — have those numbers ready",
            "CISOs care about risk reduction metrics — lead with CyberRatings data"
        ]
    },
    D1: {
        letter: "D",
        name: "Decision Criteria",
        color: "d1-color",
        definition: "The technical and business criteria the customer will use to evaluate and compare vendors.",
        whyItMatters: "If you don't know the decision criteria, you can't shape them. The best AEs influence criteria to favor their strengths.",
        versaContext: "Shape criteria toward: unified platform (single OS), security effectiveness (independently tested), deployment flexibility (on-prem + cloud), SD-WAN maturity (Gartner leader), and TCO (consolidation savings).",
        questions: [
            "What are the must-have requirements for this evaluation?",
            "What are the nice-to-have requirements?",
            "How will you evaluate security effectiveness — internal testing or independent reports?",
            "Is unified management (single console) a requirement?",
            "How important is deployment flexibility — do you need on-premises capability?",
            "What role does analyst validation (Gartner, Forrester) play in your evaluation?",
            "Who defines the evaluation criteria — technical team, procurement, or leadership?",
            "Have the criteria already been finalized, or can we provide input?",
            "Are you using an RFP? Can we review the requirements?"
        ],
        tips: [
            "If criteria aren't set, help define them around Versa's strengths",
            "Push for 'security effectiveness (independently validated)' as a criterion",
            "Push for 'unified management console' as a requirement — this eliminates Palo Alto (2 consoles), Cisco (4), Zscaler (8)",
            "Push for 'on-premises deployment capability' if applicable — eliminates Zscaler, Cato, Netskope",
            "Push for 'enterprise SD-WAN (Gartner MQ recognized)' — eliminates Zscaler, Cato"
        ]
    },
    D2: {
        letter: "D",
        name: "Decision Process",
        color: "d2-color",
        definition: "The steps, timeline, and stakeholders involved in making the purchasing decision.",
        whyItMatters: "Deals die when you don't understand the process. Knowing the steps lets you plan your engagement and anticipate blockers.",
        versaContext: "Typical Versa enterprise deal process: Technical evaluation → POC → Business case presentation → Procurement → Deployment. Position Versa's phased deployment model — start with SD-WAN or SSE and expand.",
        questions: [
            "What does your evaluation process look like — technical review, POC, RFP?",
            "What's your target timeline for making a decision?",
            "Who are all the stakeholders involved in this decision?",
            "Is there a formal procurement process we need to follow?",
            "What other vendors are you evaluating?",
            "What would cause this decision to get delayed or blocked?",
            "Have you done this type of evaluation before? What worked or didn't work?",
            "Is there a specific event driving the timeline — contract expiration, compliance audit, security incident?",
            "Do you need proof of concept, or will reference calls and analyst reports suffice?"
        ],
        tips: [
            "Map every stakeholder and their role (champion, influencer, blocker, EB)",
            "Understand the compelling event — contract expiration, security breach, compliance deadline",
            "Align your sales activities to their decision timeline",
            "Offer POC early — Versa's zero-touch provisioning makes POC fast and easy",
            "If no compelling event exists, you need to create urgency with risk/cost data"
        ]
    },
    I: {
        letter: "I",
        name: "Identify Pain",
        color: "i-color",
        definition: "The specific pain points the customer is experiencing that your solution addresses.",
        whyItMatters: "Pain drives action. No pain = no urgency = no deal. The deeper and more personal the pain, the more likely they are to buy.",
        versaContext: "Common pains Versa solves: vendor sprawl (4-8 tools), management complexity (multiple consoles), security gaps between products, MPLS cost pressure, slow site deployment, VPN scalability issues, compliance challenges, and lack of unified visibility.",
        questions: [
            "What are the top 2-3 challenges your team faces with your current infrastructure?",
            "What's not working well with your current vendor(s)?",
            "Have you experienced any security incidents that highlighted gaps?",
            "What's the impact of these challenges on the business — not just IT?",
            "How much time is your team spending on operational firefighting vs. strategic work?",
            "If nothing changes in the next 12 months, what's the impact?",
            "What have you tried before that didn't work?",
            "On a scale of 1-10, how painful is this problem? Why not higher/lower?",
            "Who else in the organization feels this pain?"
        ],
        tips: [
            "Pain is personal — understand how it affects the INDIVIDUAL, not just the company",
            "Three levels of pain: Technical (it's broken), Business (it costs money), Personal (it affects their career/reputation)",
            "If pain isn't strong enough, the deal won't close. Help them quantify it.",
            "Ask 'What happens if you do nothing?' — this tests urgency",
            "Connect their pain to Versa customer success stories with similar profiles"
        ]
    },
    C: {
        letter: "C",
        name: "Champion",
        color: "c-color",
        definition: "An internal advocate who has power, influence, and a personal stake in your solution winning.",
        whyItMatters: "Your champion sells for you when you're not in the room. Without one, you're flying blind on internal politics and competing priorities.",
        versaContext: "Best Versa champions are usually: Senior Network Engineers (they love the routing depth), Security Architects (they respect the CyberRatings scores), or IT Directors frustrated with vendor sprawl. Arm them with data they can present internally.",
        questions: [
            "Who on your team is most passionate about solving this problem?",
            "Who would benefit most personally from a successful implementation?",
            "Is there someone who has influence with the economic buyer on this topic?",
            "Who will be presenting the business case to leadership?",
            "Can you walk me through what happens after our conversation — who do you debrief with?",
            "What would make you personally successful in this initiative?",
            "What internal resistance do you anticipate, and from whom?",
            "How can we help you build the internal case for this?"
        ],
        tips: [
            "A champion has three qualities: Power (influence), Access (to the EB), and Personal Win (career benefit)",
            "Test your champion: ask them to do something (arrange a meeting, share a document). If they won't act, they're a coach, not a champion.",
            "Arm your champion with ammunition: ROI calculators, CyberRatings reports, Gartner rankings, customer case studies",
            "Multiple champions > one champion — build consensus across networking and security teams",
            "Your champion needs to understand MEDDIC too — help them build the business case"
        ]
    }
};

// ===================== CONSOLIDATION PLAY DATA =====================
const CONSOLIDATION_PLAY = {
    title: "The Versa Consolidation Play",
    subtitle: "When you don't know their vendors yet — lead with the platform story",
    approach: "When current vendors are unknown, lead with Versa's consolidation value proposition. Ask probing questions to uncover their stack, then pivot to specific competitive positioning.",
    discoveryFlow: [
        {
            phase: "Uncover the Stack",
            questions: [
                "How many different networking and security vendors are you managing today?",
                "Can you walk me through your current architecture from branch to data center to cloud?",
                "Who handles your SD-WAN? Your firewall? Your secure web gateway? Your VPN? Are those the same vendor?",
                "How many management consoles does your team log into on a daily basis?",
                "What does your current vendor renewal timeline look like?"
            ]
        },
        {
            phase: "Quantify the Pain",
            questions: [
                "What's the total annual spend across all your networking and security vendors?",
                "How many FTEs are dedicated to managing these separate tools?",
                "When there's a security incident that spans networking and security, how long does investigation take?",
                "How consistent are your policies across different products and vendors?",
                "What's the impact of all this complexity on your team's ability to do strategic work?"
            ]
        },
        {
            phase: "Paint the Vision",
            questions: [
                "What if you could manage SD-WAN, firewall, SSE, LAN, and all security functions from a single console?",
                "What would your team's productivity look like if you reduced from X vendors to one unified platform?",
                "How would unified visibility across networking and security change your incident response?",
                "What would a 130% ROI look like for your organization — that's what Dell achieved with consolidation on Versa.",
                "If you could deploy a new site in hours instead of weeks, how would that change your business?"
            ]
        }
    ],
    commonStacks: [
        { name: "Traditional Enterprise", vendors: "Cisco (switches/routing) + Palo Alto (firewall) + Zscaler (SSE) + AnyConnect (VPN)", versaReplaces: "All 4 vendors — Versa delivers routing, firewall, SSE, and ZTNA in one platform" },
        { name: "Fortinet-Centric", vendors: "FortiGate (firewall/SD-WAN) + FortiSwitch + FortiAP + FortiClient", versaReplaces: "Entire Fortinet stack — Versa consolidates SD-WAN, NGFW, SSE, SD-LAN, and endpoint" },
        { name: "Cloud-First", vendors: "Zscaler (ZIA/ZPA) + Cisco Meraki (SD-WAN) + Cloud firewalls", versaReplaces: "Replaces fragmented cloud stack with unified SASE — cloud, on-prem, and hybrid" },
        { name: "Legacy WAN", vendors: "MPLS provider + Legacy firewalls + VPN concentrators", versaReplaces: "SD-WAN replaces MPLS (30-60% savings) + NGFW replaces legacy firewalls + ZTNA replaces VPN" }
    ]
};

// ===================== LIVE SEARCH INDEX =====================
const SEARCH_INDEX = {
    // Vendor-related searches
    "zscaler": { type: "vendor", key: "zscaler" },
    "zia": { type: "vendor", key: "zscaler" },
    "zpa": { type: "vendor", key: "zscaler" },
    "zdx": { type: "vendor", key: "zscaler" },
    "palo alto": { type: "vendor", key: "paloalto" },
    "paloalto": { type: "vendor", key: "paloalto" },
    "pan-os": { type: "vendor", key: "paloalto" },
    "panos": { type: "vendor", key: "paloalto" },
    "prisma": { type: "vendor", key: "paloalto" },
    "prisma access": { type: "vendor", key: "paloalto" },
    "panorama": { type: "vendor", key: "paloalto" },
    "cisco": { type: "vendor", key: "cisco" },
    "meraki": { type: "vendor", key: "cisco" },
    "viptela": { type: "vendor", key: "cisco" },
    "umbrella": { type: "vendor", key: "cisco" },
    "anyconnect": { type: "vendor", key: "cisco" },
    "duo": { type: "vendor", key: "cisco" },
    "ise": { type: "vendor", key: "cisco" },
    "fortinet": { type: "vendor", key: "fortinet" },
    "fortigate": { type: "vendor", key: "fortinet" },
    "fortisase": { type: "vendor", key: "fortinet" },
    "fortiswitch": { type: "vendor", key: "fortinet" },
    "fortiap": { type: "vendor", key: "fortinet" },
    "forticlient": { type: "vendor", key: "fortinet" },
    "fortimanager": { type: "vendor", key: "fortinet" },
    "cato": { type: "vendor", key: "cato" },
    "cato networks": { type: "vendor", key: "cato" },
    "netskope": { type: "vendor", key: "netskope" },
    "infiot": { type: "vendor", key: "netskope" },
    // Topic-related searches
    "sd-wan": { type: "usecase", key: "sdwan" },
    "sdwan": { type: "usecase", key: "sdwan" },
    "sd wan": { type: "usecase", key: "sdwan" },
    "mpls": { type: "usecase", key: "sdwan" },
    "wan": { type: "usecase", key: "sdwan" },
    "sase": { type: "usecase", key: "sase" },
    "unified sase": { type: "usecase", key: "sase" },
    "vpn": { type: "usecase", key: "vpn" },
    "vpn replacement": { type: "usecase", key: "vpn" },
    "remote access": { type: "usecase", key: "vpn" },
    "ztna": { type: "usecase", key: "ztna" },
    "zero trust": { type: "usecase", key: "ztna" },
    "firewall": { type: "usecase", key: "firewall" },
    "ngfw": { type: "usecase", key: "firewall" },
    "firewall refresh": { type: "usecase", key: "firewall" },
    "consolidation": { type: "usecase", key: "consolidation" },
    "consolidate": { type: "usecase", key: "consolidation" },
    "vendor sprawl": { type: "usecase", key: "consolidation" },
    "sovereign": { type: "usecase", key: "sovereign" },
    "sovereign sase": { type: "usecase", key: "sovereign" },
    "data sovereignty": { type: "usecase", key: "sovereign" },
    "air-gapped": { type: "usecase", key: "sovereign" },
    "fedramp": { type: "usecase", key: "sovereign" },
    "sd-lan": { type: "usecase", key: "sdlan" },
    "sdlan": { type: "usecase", key: "sdlan" },
    "lan": { type: "usecase", key: "sdlan" },
    "campus": { type: "usecase", key: "sdlan" },
    "switching": { type: "usecase", key: "sdlan" },
    "m&a": { type: "usecase", key: "ma" },
    "merger": { type: "usecase", key: "ma" },
    "acquisition": { type: "usecase", key: "ma" },
    "iot": { type: "usecase", key: "iot" },
    "internet of things": { type: "usecase", key: "iot" },
    "genai": { type: "usecase", key: "genai" },
    "gen ai": { type: "usecase", key: "genai" },
    "ai security": { type: "usecase", key: "genai" },
    "chatgpt": { type: "usecase", key: "genai" },
    "copilot": { type: "usecase", key: "genai" },
    // Industry searches
    "healthcare": { type: "industry", key: "healthcare" },
    "hipaa": { type: "industry", key: "healthcare" },
    "hospital": { type: "industry", key: "healthcare" },
    "financial": { type: "industry", key: "financial" },
    "banking": { type: "industry", key: "financial" },
    "pci": { type: "industry", key: "financial" },
    "retail": { type: "industry", key: "retail" },
    "manufacturing": { type: "industry", key: "manufacturing" },
    "ot": { type: "industry", key: "manufacturing" },
    "scada": { type: "industry", key: "manufacturing" },
    "government": { type: "industry", key: "government" },
    "federal": { type: "industry", key: "government" },
    "education": { type: "industry", key: "education" },
    "energy": { type: "industry", key: "energy" },
    "oil": { type: "industry", key: "energy" },
    "telecom": { type: "industry", key: "telecom" },
    "service provider": { type: "industry", key: "telecom" },
    "hospitality": { type: "industry", key: "hospitality" },
    "hotel": { type: "industry", key: "hospitality" },
    "transportation": { type: "industry", key: "transportation" },
    "logistics": { type: "industry", key: "transportation" },
    "legal": { type: "industry", key: "legal" },
    "law firm": { type: "industry", key: "legal" },
    // Security topic searches
    "casb": { type: "topic", title: "CASB — Cloud Access Security Broker", content: "Versa CASB provides inline and API-based visibility and control over SaaS applications. Unlike Netskope (CASB-origin), Versa integrates CASB natively within the unified SASE platform — no separate deployment or console. Covers shadow IT discovery, DLP for cloud apps, and SaaS activity monitoring." },
    "swg": { type: "topic", title: "SWG — Secure Web Gateway", content: "Versa SWG secures internet access for enterprise sites, home offices, and on-the-go users. Integrated with SD-WAN for optimized traffic routing — unlike standalone SWG solutions that add latency by backhauling traffic." },
    "dlp": { type: "topic", title: "DLP — Data Loss Prevention", content: "Versa DLP prevents sensitive data exfiltration across web, cloud, SaaS, and email channels. Integrated into the unified SASE platform — not a bolt-on. Supports compliance with PCI-DSS, HIPAA, GDPR, and industry-specific regulations." },
    "rbi": { type: "topic", title: "RBI — Remote Browser Isolation", content: "Versa RBI defends against browser-based exploits by isolating web sessions. Part of the unified SSE stack — no separate product or license required." },
    "dem": { type: "topic", title: "DEM — Digital Experience Monitoring", content: "Versa DEM provides end-to-end visibility into user digital experience — application performance, network path, and device health. Integrated into the platform for real-time troubleshooting." },
    "sspm": { type: "topic", title: "SSPM — SaaS Security Posture Management", content: "Versa SSPM monitors SaaS application configurations for security risks — over-permissioned users, misconfigurations, compliance violations. Works alongside CASB for comprehensive SaaS security." },
    "ueba": { type: "topic", title: "UEBA — User Entity Behavior Analytics", content: "Versa UEBA detects anomalous user and device behavior using AI/ML. Integrated with the security stack for automated response to insider threats and compromised accounts." },
    "atp": { type: "topic", title: "ATP — Advanced Threat Protection", content: "Versa ATP provides malware detection, sandboxing, and threat intelligence integration. Part of the unified security stack — unlike Zscaler ZPA which requires add-on licenses for malware and sandbox analysis." },
    "ips": { type: "topic", title: "IPS — Intrusion Prevention System", content: "Versa IPS provides full-featured intrusion prevention across all enforcement points — branch, data center, cloud. Unlike cloud-only vendors (Zscaler, Netskope, Cato), Versa delivers IPS at the edge for local threat prevention." },
    "micro-segmentation": { type: "topic", title: "Micro-segmentation", content: "Versa delivers identity-aware micro-segmentation across LAN and WAN through a single policy framework. No ISE or SGTs needed (unlike Cisco). Supports VRF-based segmentation, east-west traffic control, and zero trust containment." },
    "routing": { type: "topic", title: "Enterprise Routing", content: "Versa runs a full-featured routing stack on every edge device: BGP, OSPF, IS-IS, multicast, VRFs, policy-based routing. This is carrier-grade routing — Versa was built by Juniper networking veterans. Competitors like Zscaler, Cato, and Netskope cannot match this routing depth." },
    "multi-tenancy": { type: "topic", title: "Multi-Tenancy", content: "Versa supports carrier-grade multi-tenancy with up to 256 simultaneous tenants, per-tenant route distribution, and complete separation. Purpose-built for service providers — 120+ carriers run managed services on Versa including Comcast, Verizon, and Tata Communications." },
    "cyberratings": { type: "topic", title: "CyberRatings.org Independent Testing", content: "Versa's independently validated results:\n- NGFW Security Effectiveness: 99.90% (Recommended)\n- SSE: AAA Rating, 99.96% Protection Rate\n- ZTNA: AAA Rating\n- SD-WAN: AAA Rating\n- Exploit Evasion Resistance: 100%\n\nCompare to: Palo Alto 79.24%, Cisco 53.50% (Caution), Fortinet 79.24%\nZscaler, Cato, Netskope — not independently tested or declined testing" },
    "gartner": { type: "topic", title: "Gartner Analyst Recognition", content: "Versa in Gartner:\n- SD-WAN Magic Quadrant Leader — 5 consecutive years\n- SD-WAN Capability Leader (4.6 score) in Critical Capabilities for Single-Vendor SASE 2025\n- Present in 3 Gartner MQs: SASE, SSE, SD-WAN\n- 'VSAF scores excellent in foundational SASE platform and secure branch network modernization'\n\nCompetitors NOT in Gartner SD-WAN MQ: Zscaler, Cato\nCompetitors NOT in Gartner SSE MQ: Cisco" },
    "versaone": { type: "topic", title: "VersaONE Universal SASE Platform", content: "The unified platform consolidating ALL Versa networking and security functions into:\n- Single operating system (VOS)\n- Single management console\n- Single policy framework\n- Single data lake for AI/ML analytics\n\nMulti-plane architecture with independent control, data, management, analytics, and AI planes that scale independently. Single-pass packet processing reduces overhead.\n\nKey differentiator: True convergence in one OS vs. competitors who stitch multiple acquired products together." },
    "vos": { type: "topic", title: "VOS — Versa Operating System", content: "VOS is the single operating system powering all Versa products. It runs SD-WAN, SSE, NGFW, SD-LAN, and all security functions in one unified stack. Single-pass packet processing means traffic is inspected once through integrated networking and security — no hairpinning between separate products.\n\nRuns on: appliances, VMs, cloud infrastructure, bare metal, containers, white-box hardware.\n\nThis is Versa's #1 architectural advantage over every competitor." },
    "versa ai": { type: "topic", title: "Versa AI — Native AI/ML Platform", content: "Three pillars of Versa AI:\n\n1. AI for Security: Behavioral analytics, reduced false positives, accelerated threat response, GenAI governance (shadow AI visibility, access policies for ChatGPT/Gemini, sensitive data blocking)\n\n2. AI for Networking: Real-time analytics, traffic forecasting, early performance issue identification, intelligent path optimization\n\n3. AI for Operations: Context-aware copilots, guided task automation, assisted troubleshooting\n\nAgentic AI Protection: Real-time policy orchestration for AI agents, MCP support, adaptive threat response.\n\nSelf-Protecting AI Fabric: Protects distributed AI training data, model nodes, inference nodes." },
    "sase fabric": { type: "topic", title: "Versa SASE Fabric — Global Backbone", content: "100+ Points of Presence (PoPs) with full-mesh overlay architecture:\n- Strategic peering with AWS, Azure, Google Cloud, Salesforce, Zoom\n- Real-time traffic evaluation: latency, jitter, loss, and policy\n- Hundreds of routing decision attributes per application\n- Full security stack inline at each PoP (NGFW, SWG, CASB, ZTNA, DLP, IPS)\n- Multi-tenant SD-WAN overlays\n- Published SLAs at trust.versanow.net\n\nDifferentiator vs. Cato: Versa doesn't force ALL traffic through backbone — optimizes per-connection." },
    "hardware": { type: "topic", title: "Versa Hardware — CSG/CSX Series", content: "All x86 architecture — NO proprietary ASICs (unlike Fortinet):\n\n- CSG300: Small enterprise / home branch\n- CSG700: Mid-to-large enterprise branches\n- CSG1000: Large enterprise, campus, data centers\n- CSG2500: High-performance compute with third-party VM hosting\n- CSG3000: High-performance branch/campus/DC WAN edge\n- CSX4000: Next-gen with Secure SD-LAN edge\n- CSG5000: Carrier-grade maximum uptime\n- Embedded 5G appliances available\n\nAll run VOS. No vendor lock-in — standard cables, SFPs, Broadcom ASICs." },
    "sase client": { type: "topic", title: "Versa SASE Client — Endpoint Agent", content: "Cloud-managed endpoint agent for Zero Trust connectivity:\n\nPlatforms: Windows, macOS, Linux, Chromebook, iOS, Android\n\nCapabilities:\n- MFA + continuous endpoint posture monitoring\n- OPSWAT-enhanced endpoint profiling\n- Real-time best-path routing with intelligent gateway selection\n- Split tunneling, force tunnel, always-on, fail-open/fail-close\n- IKEv2/IPSec tunnels, IPv4/IPv6 support\n- DLP enforcement (copy/paste, screenshots, USB blocking)\n- MDM integration, auto-provisioning, trusted network detection\n\nSingle client replacing multiple endpoint agents." },
    "private sase": { type: "topic", title: "Versa Private SASE", content: "Dedicated (non-shared) SASE instance for organizations requiring data isolation:\n\n- Dedicated resources with predictable performance (no noisy neighbor)\n- Customer-managed encryption keys\n- Data sovereignty and geofencing\n- PCI, HIPAA, GDPR compliance support\n- Multi-stage malware detection on-premises\n- Custom branding and tailored dashboards\n- Supports air-gapped environments\n\nUse cases: Regulated enterprises, service providers, finance, healthcare, government." },
    "sd-nic": { type: "topic", title: "Versa SD-NIC — Software-Defined NIC", content: "Extends Versa security directly into compute devices (servers):\n\n- Multi-tenant data centers: embed security into each server, protect all VMs\n- Untrusted environments: ATMs, tactical platforms, financial systems, critical infrastructure\n- Eliminates traffic rerouting to separate firewall appliances\n- Runs identical VOS software as all other Versa products\n\nUnique capability that no competitor offers." },
    "ztp": { type: "topic", title: "Zero-Touch Provisioning (ZTP)", content: "Versa's ZTP enables new site deployment in hours vs. weeks:\n\n- Automated device deployment with call-home security\n- On-site activation via laptop, mobile, or WiFi\n- Built-in topology workflows (full-mesh, partial-mesh, hub-and-spoke, custom)\n- Automated self-healing for users/devices/branches\n- Centralized software management with automatic rollback on failure\n\nKey selling point for multi-site enterprises and M&A scenarios." },
    "failover": { type: "topic", title: "SD-WAN Failover & Performance", content: "Versa SD-WAN performance specs:\n\n- Primary-to-secondary failover: under 2 seconds\n- NGFW throughput: 7,626 Mbps (highest rated by CyberRatings)\n- Lowest price per protected Mbps among Tier-1 NGFW vendors\n- Forward Error Correction (FEC) for lossy links\n- Packet cloning/decloning for mission-critical apps\n- MOS score-based traffic engineering for voice/video\n- First-packet traffic steering for known applications\n\nNo competitor matches this combination of performance and cost efficiency." },
    "compliance": { type: "topic", title: "Compliance & Certifications", content: "Versa certifications and compliance support:\n\n- FedRAMP High Ready\n- ISO 27001 and ISO 22301\n- NIAP Common Criteria Certificate\n- MEF 3.0 SASE Certification (AAA Rating)\n- CyberRatings.org: AAA (SSE, ZTNA, SD-WAN), Recommended (NGFW)\n\nRegulatory frameworks supported:\n- PCI-DSS, HIPAA, SOX, GLBA, FFIEC\n- GDPR, NIS2, DORA\n- FedRAMP, FISMA, NIST 800-53/171, CMMC\n- FERPA, CIPA, COPPA\n- NERC CIP, TSA Pipeline Security\n- IEC 62443 (OT/ICS)" },
    "roi": { type: "topic", title: "ROI & Customer Proof Points", content: "Proven customer outcomes:\n\n- Dell: 130% ROI, $1M savings\n- Adobe: $500K+ savings\n- Dorset Council: £1M savings\n- Lintasarta: 2,400 customers via Private SASE\n\nNamed customers: Capital One, Comcast, Visa, DISA, Qatar Airways, BP, Amazon, Virgin Media, Samsung, Verizon, Adobe, Barclays, McLaren, Versace, Adidas, Quest Diagnostics, Ace Hardware, Chobani, Cargill, John Deere, US Bank, Macy's\n\nScale: Thousands of enterprises, 120+ service providers, 7 of top-10 global telcos" },
    "support": { type: "topic", title: "Versa Support & Training", content: "Support highlights:\n- Rated 5/5 in Forrester SASE Wave (vs. Fortinet 1/5)\n- Versa Academy for training and certification\n- Implementation guides and product documentation\n- 24/7 NOC for cloud-managed deployments\n\nGartner Peer Insights quotes:\n- 'Versa SASE streamlined security, cloud agility, performance, and cost savings' — Banking engineer\n- 'Intuitive UI, scalable architecture, robust security, one-touch deployment' — Energy/utilities manager\n- 'Flexible pricing models and rapid implementation' — IT services professional" }
};
