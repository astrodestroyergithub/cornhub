(function () {
      const STORAGE_KEY = 'codehub_portal_state_v1';

      const DEFAULT_CATEGORIES = [
        'Full-Stack',
        'React & Next.js',
        'Rust Systems',
        'Python & AI',
        'System Design',
        'Raw Uncut Debug',
        'Amateur / Indie',
        'Speedrun',
        'DevOps & Docker',
        'Database Tuning',
        'CSS Wizardry',
        'Linux Rigs'
      ];

      const DEFAULT_VIDEOS = [
        {
          id: 'vid-1',
          title: 'Raw Uncut: Rewriting a Legacy Node.js Monolith in Rust Under 45 Minutes',
          creator: 'FerrisAfterDark',
          category: 'Rust Systems',
          duration: '44:18',
          quality: '4K',
          views: 1840200,
          rating: 99,
          dateLabel: '2 hours ago',
          sourceType: 'local',
          sourceSite: 'CodeHub Originals',
          externalUrl: '',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#ff9000',
          codeSnippet: 'fn main() -> Result<(), Box<dyn Error>> {\n  let pool = ThreadPool::new(64);\n  pool.spawn_zero_copy();\n}',
          tags: ['rust', 'uncut', 'zero-copy', 'backend'],
          description: 'Complete unedited session migrating high-throughput payment webhooks from Node.js to asynchronous Rust with Tokio and Axum.'
        },
        {
          id: 'vid-2',
          title: 'Amateur Junior Dev Tries Live Production Database Migration Without a Backup',
          creator: 'SQL_Siren',
          category: 'Database Tuning',
          duration: '19:05',
          quality: 'HD',
          views: 2410900,
          rating: 97,
          dateLabel: '5 hours ago',
          sourceType: 'external',
          sourceSite: 'DevStream.tv',
          externalUrl: 'https://developer.mozilla.org/',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#f97316',
          codeSnippet: 'BEGIN TRANSACTION;\nALTER TABLE orders DROP COLUMN legacy_id;\n-- Wait where is the staging flag?!',
          tags: ['amateur', 'postgres', 'production', 'live'],
          description: 'Watch what happens when an unindexed 400M-row table locks up during peak traffic—and how we recovered the WAL segments in real time.'
        },
        {
          id: 'vid-3',
          title: 'React 19 Compiler Deep Dive: Zero Manual Memoization in Complex Dashboards',
          creator: 'HookMasterPro',
          category: 'React & Next.js',
          duration: '28:50',
          quality: '4K',
          views: 980400,
          rating: 96,
          dateLabel: '1 day ago',
          sourceType: 'local',
          sourceSite: 'CodeHub Originals',
          externalUrl: '',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#38bdf8',
          codeSnippet: 'export default function Feed({ items }) {\n  // Auto-memoized by React Compiler\n  return items.map(renderCard);\n}',
          tags: ['react', 'frontend', 'performance', '4k'],
          description: 'Inspecting the AST output of the React Compiler and benchmarking flamegraphs across 10,000 interactive DOM nodes.'
        },
        {
          id: 'vid-4',
          title: 'Designing a 10-Million Concurrent User Video Streaming CDN Architecture',
          creator: 'ScaleArchitect',
          category: 'System Design',
          duration: '36:12',
          quality: '4K',
          views: 1520000,
          rating: 99,
          dateLabel: '2 days ago',
          sourceType: 'external',
          sourceSite: 'SysDesignHub',
          externalUrl: 'https://web.dev/',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#a855f7',
          codeSnippet: 'Edge POP -> Anycast DNS -> NVMe Cache\nHLS Segmenter -> Adaptive Bitrate Ladder',
          tags: ['system-design', 'cdn', 'streaming', 'architecture'],
          description: 'How global video portals serve terabits per second using edge caching, adaptive HLS/DASH manifests, and custom NVMe storage servers.'
        },
        {
          id: 'vid-5',
          title: 'Speedrun: Building a Neural Network From Scratch in Pure NumPy (No PyTorch)',
          creator: 'TensorQueen',
          category: 'Python & AI',
          duration: '22:40',
          quality: '4K',
          views: 1190300,
          rating: 98,
          dateLabel: '3 days ago',
          sourceType: 'local',
          sourceSite: 'CodeHub Originals',
          externalUrl: '',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#10b981',
          codeSnippet: 'dW2 = A1.T @ dZ2 / m\ndZ1 = (dZ2 @ W2.T) * relu_grad(Z1)\nW1 -= lr * dW1',
          tags: ['python', 'ai', 'speedrun', 'matrix'],
          description: 'Deriving backpropagation by hand and training a multi-layer classifier on raw pixel tensors in 22 minutes flat.'
        },
        {
          id: 'vid-6',
          title: 'Late Night Debugging: Hunting a Heisenbug Memory Leak in Kubernetes Pods',
          creator: 'KubeOpsUncut',
          category: 'DevOps & Docker',
          duration: '31:15',
          quality: 'HD',
          views: 740800,
          rating: 95,
          dateLabel: '4 days ago',
          sourceType: 'external',
          sourceSite: 'CloudCasts',
          externalUrl: 'https://kubernetes.io/',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#eab308',
          codeSnippet: 'kubectl top pods -n prod --containers\nperf record -F 99 -p $(pidof worker) -g',
          tags: ['devops', 'kubernetes', 'debugging', 'uncut'],
          description: 'Using eBPF flamegraphs at 2:00 AM to catch a native C++ addon holding onto detached buffers inside alpine containers.'
        },
        {
          id: 'vid-7',
          title: 'Pure CSS 3D Cyberpunk UI Without a Single Line of JavaScript',
          creator: 'PixelSorceress',
          category: 'CSS Wizardry',
          duration: '15:33',
          quality: '4K',
          views: 890100,
          rating: 97,
          dateLabel: '5 days ago',
          sourceType: 'local',
          sourceSite: 'CodeHub Originals',
          externalUrl: '',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#ec4899',
          codeSnippet: '.scene {\n  transform-style: preserve-3d;\n  perspective: 900px;\n}',
          tags: ['css', 'animation', 'frontend', 'design'],
          description: 'Mastering perspective matrices, custom trigonometric CSS variables, and hardware-accelerated keyframe shaders.'
        },
        {
          id: 'vid-8',
          title: 'Full-Stack SaaS Build: Stripe Webhooks, Auth & Real-Time WebSockets',
          creator: 'FullStackAfterDark',
          category: 'Full-Stack',
          duration: '52:09',
          quality: '4K',
          views: 1630500,
          rating: 98,
          dateLabel: '1 week ago',
          sourceType: 'external',
          sourceSite: 'FullStackTV',
          externalUrl: 'https://github.com/',
          videoDataUrl: '',
          thumbUrl: '',
          accent: '#ff9000',
          codeSnippet: 'wss.on("connection", (socket) => {\n  socket.send(JSON.stringify({ live: true }));\n});',
          tags: ['fullstack', 'websockets', 'saas', 'production'],
          description: 'End-to-end architecture walkthrough taking a multi-tenant web application from empty git repo to Netlify & Edge deployment.'
        }
      ];

      const DEFAULT_PHOTOS = [
        {
          id: 'pho-1',
          title: 'Triple-OLED Dark Mode Kernel Dev Battlestation',
          creator: 'RigMaster4K',
          category: 'Linux Rigs',
          views: '412K views',
          rating: '99%',
          imageUrl: '',
          accent: '#ff9000',
          diagramText: '3x 4K OLED • Custom Loop • Arch i3wm'
        },
        {
          id: 'pho-2',
          title: 'Zero-Downtime Microservices Mesh Blueprint (4K Cheat Sheet)',
          creator: 'ScaleArchitect',
          category: 'System Design',
          views: '318K views',
          rating: '98%',
          imageUrl: '',
          accent: '#38bdf8',
          diagramText: 'API Gateway → Envoy Mesh → Sharded Raft Cluster'
        },
        {
          id: 'pho-3',
          title: 'PostgreSQL B-Tree vs GIN Index Memory Layout Diagram',
          creator: 'SQL_Siren',
          category: 'Database Tuning',
          views: '289K views',
          rating: '97%',
          imageUrl: '',
          accent: '#10b981',
          diagramText: 'Heap Pages • Tuple Pointers • Posting Lists'
        },
        {
          id: 'pho-4',
          title: 'Rust Ownership, Borrowing & Lifetimes Visual Reference Poster',
          creator: 'FerrisAfterDark',
          category: 'Rust Systems',
          views: '520K views',
          rating: '99%',
          imageUrl: '',
          accent: '#f97316',
          diagramText: '&mut T (Unique) vs &T (Shared Immutable)'
        },
        {
          id: 'pho-5',
          title: 'Minimalist Split-Ergonomic Mechanical Keyboard & Neovim Setup',
          creator: 'VimVixen',
          category: 'Amateur / Indie',
          views: '195K views',
          rating: '96%',
          imageUrl: '',
          accent: '#a855f7',
          diagramText: '36-Key Choc Corne • Lua LSP • Tmux'
        },
        {
          id: 'pho-6',
          title: 'Docker Multi-Stage Distroless Build Pipeline Poster',
          creator: 'KubeOpsUncut',
          category: 'DevOps & Docker',
          views: '264K views',
          rating: '98%',
          imageUrl: '',
          accent: '#eab308',
          diagramText: 'Builder Stage (680MB) → Scratch Runtime (14MB)'
        }
      ];

      let state = {
        brandPrefix: 'Code',
        brandSuffix: 'Hub',
        activeView: 'home',
        activeCategory: 'all',
        activeSort: 'recommended',
        searchQuery: '',
        categories: [...DEFAULT_CATEGORIES],
        videos: [...DEFAULT_VIDEOS],
        photos: [...DEFAULT_PHOTOS],
        comments: {
          'vid-1': [
            { user: 'AsyncRustacean', text: 'That zero-copy buffer pool refactor at 14:20 was pure art.', time: '1h ago' },
            { user: 'NodeSurvivor', text: 'Finally an uncut migration video that shows the real compiler errors!', time: '45m ago' }
          ]
        },
        tickets: []
      };

      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.videos) && Array.isArray(parsed.categories)) {
              state = Object.assign({}, state, parsed);
            }
          }
        } catch (err) {
          // Ignore storage errors in sandboxed iframes
        }
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (err) {
          // Ignore storage errors
        }
      }

      function showToast(msg) {
        const toast = document.getElementById('toastNotification');
        const text = document.getElementById('toastMessageText');
        if (!toast || !text) return;
        text.textContent = msg;
        toast.classList.remove('hidden');
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => {
          toast.classList.add('hidden');
        }, 3200);
      }

      function formatViews(num) {
        const n = Number(num) || 0;
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M views';
        if (n >= 1000) return Math.round(n / 1000) + 'K views';
        return n + ' views';
      }

      function escapeHtml(str) {
        return String(str || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      function buildSvgThumbnail(video) {
        if (video.thumbUrl && video.thumbUrl.trim() !== '') {
          return video.thumbUrl;
        }
        const accent = video.accent || '#ff9000';
        const cat = escapeHtml(video.category || 'CodeHub');
        const snippetLines = String(video.codeSnippet || 'const stream = await Edge.connect(4096);').split('\n');
        const line1 = escapeHtml(snippetLines[0] || '');
        const line2 = escapeHtml(snippetLines[1] || '');
        const line3 = escapeHtml(snippetLines[2] || '');

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#0d0d0d"/>
              <stop offset="55%" stop-color="#181818"/>
              <stop offset="100%" stop-color="#22170a"/>
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="url(#bg)"/>
          <rect x="24" y="24" width="592" height="312" rx="10" fill="#111111" stroke="#2e2e2e" stroke-width="2"/>
          <circle cx="48" cy="48" r="6" fill="#ef4444"/>
          <circle cx="68" cy="48" r="6" fill="#f59e0b"/>
          <circle cx="88" cy="48" r="6" fill="#10b981"/>
          <rect x="440" y="34" width="156" height="26" rx="4" fill="${accent}"/>
          <text x="518" y="52" text-anchor="middle" fill="#000000" font-family="Inter, sans-serif" font-weight="900" font-size="13">${cat.toUpperCase()}</text>
          <line x1="24" y1="70" x2="616" y2="70" stroke="#262626" stroke-width="2"/>
          <text x="48" y="125" fill="${accent}" font-family="monospace" font-weight="700" font-size="19">${line1}</text>
          <text x="48" y="165" fill="#e5e7eb" font-family="monospace" font-size="17">${line2}</text>
          <text x="48" y="205" fill="#9ca3af" font-family="monospace" font-size="16">${line3}</text>
          <circle cx="320" cy="265" r="32" fill="#000000" fill-opacity="0.75" stroke="${accent}" stroke-width="3"/>
          <polygon points="312,249 312,281 338,265" fill="${accent}"/>
        </svg>`;
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
      }

      function buildPhotoSvg(photo) {
        if (photo.imageUrl && photo.imageUrl.trim() !== '') {
          return photo.imageUrl;
        }
        const accent = photo.accent || '#ff9000';
        const title = escapeHtml(photo.title || 'Visual Shot');
        const diag = escapeHtml(photo.diagramText || '4K Ultra-HD Snapshot');
        const cat = escapeHtml(photo.category || 'Gallery');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420">
          <rect width="600" height="420" fill="#101010"/>
          <rect x="20" y="20" width="560" height="380" rx="12" fill="#171717" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <rect x="40" y="42" width="140" height="28" rx="4" fill="${accent}"/>
          <text x="110" y="61" text-anchor="middle" fill="#000" font-family="Inter, sans-serif" font-weight="900" font-size="13">${cat.toUpperCase()}</text>
          <rect x="40" y="100" width="520" height="190" rx="8" fill="#0c0c0c" stroke="#2c2c2c"/>
          <text x="300" y="195" text-anchor="middle" fill="${accent}" font-family="monospace" font-weight="700" font-size="18">${diag}</text>
          <text x="40" y="340" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="17">${title.slice(0, 46)}</text>
        </svg>`;
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
      }

      // Render Header & Category Controls
      function renderBrandingAndCounts() {
        document.getElementById('brandPrefixText').textContent = state.brandPrefix;
        document.getElementById('brandSuffixText').textContent = state.brandSuffix;
        document.getElementById('brandPrefixInput').value = state.brandPrefix;
        document.getElementById('brandSuffixInput').value = state.brandSuffix;

        document.getElementById('headerVideoStat').textContent = state.videos.length;
        const extCount = state.videos.filter(v => v.sourceType === 'external').length;
        document.getElementById('headerExternalStat').textContent = extCount;
        document.getElementById('navPhotoCount').textContent = state.photos.length;
      }

      function renderCategoryControls() {
        const pillBar = document.getElementById('categoryPillBar');
        const sidebarList = document.getElementById('sidebarCategoryList');
        const headerSelect = document.getElementById('headerCategorySelect');
        const vidCatSelect = document.getElementById('vidCategoryInput');
        const photoCatSelect = document.getElementById('photoCategoryInput');
        const photoFilterSelect = document.getElementById('photoCategoryFilter');

        // 1. Pill Bar
        const allPills = ['all', ...state.categories];
        pillBar.innerHTML = allPills.map(cat => {
          const isActive = state.activeCategory.toLowerCase() === cat.toLowerCase();
          const label = cat === 'all' ? 'All Videos' : cat;
          return `<button type="button" data-cat-pill="${escapeHtml(cat)}" class="px-3 py-1 rounded-full text-xs font-bold transition ${
            isActive
              ? 'bg-[#ff9000] text-black shadow'
              : 'bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white'
          }">${escapeHtml(label)}</button>`;
        }).join('');

        // 2. Sidebar List (Static HTML preserved — only toggle active highlight class)
        if (sidebarList) {
          sidebarList.querySelectorAll('[data-cat-pill]').forEach(btn => {
            const cat = btn.getAttribute('data-cat-pill') || '';
            const isActive = state.activeCategory.toLowerCase() === cat.toLowerCase();
            btn.className = 'sidebar-cat-item w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition ' +
              (isActive ? 'bg-[#ff9000] text-black font-bold' : 'text-gray-300 hover:bg-[#242424]');
          });
        }

        // 3. Dropdowns
        headerSelect.innerHTML = `<option value="all">All Categories</option>` +
          state.categories.map(c => `<option value="${escapeHtml(c)}" ${state.activeCategory === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('');

        const catOptions = state.categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
        vidCatSelect.innerHTML = catOptions;
        photoCatSelect.innerHTML = catOptions;
        photoFilterSelect.innerHTML = `<option value="all">All Photo Categories</option>` + catOptions;
      }

      function getFilteredVideos() {
        let list = [...state.videos];

        if (state.activeCategory !== 'all') {
          list = list.filter(v => v.category.toLowerCase() === state.activeCategory.toLowerCase());
        }

        if (state.searchQuery.trim() !== '') {
          const q = state.searchQuery.toLowerCase().trim();
          list = list.filter(v =>
            v.title.toLowerCase().includes(q) ||
            v.creator.toLowerCase().includes(q) ||
            v.category.toLowerCase().includes(q) ||
            (v.tags && v.tags.some(t => t.toLowerCase().includes(q)))
          );
        }

        if (state.activeSort === 'views') {
          list.sort((a, b) => b.views - a.views);
        } else if (state.activeSort === 'rating') {
          list.sort((a, b) => b.rating - a.rating);
        } else if (state.activeSort === 'newest') {
          list.sort((a, b) => String(b.id).localeCompare(String(a.id)));
        } else if (state.activeSort === 'external') {
          list = list.filter(v => v.sourceType === 'external');
        } else if (state.activeSort === 'local') {
          list = list.filter(v => v.sourceType !== 'external');
        }

        return list;
      }

      function renderVideoCardHtml(v) {
        const thumbSrc = buildSvgThumbnail(v);
        const isExternal = v.sourceType === 'external';
        const sourceBadge = isExternal
          ? `<span class="bg-[#ff9000] text-black text-[10px] font-black px-1.5 py-0.5 rounded uppercase">🔗 ${escapeHtml(v.sourceSite || 'External')}</span>`
          : `<span class="bg-[#262626] text-gray-200 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Uploaded</span>`;

        return `
          <article class="video-card bg-[#181818] border border-[#282828] rounded-md overflow-hidden flex flex-col justify-between group cursor-pointer transition hover:border-[#ff9000]/60" data-play-video="${escapeHtml(v.id)}">
            <div>
              <div class="relative aspect-video bg-black overflow-hidden">
                <img src="${thumbSrc}" alt="${escapeHtml(v.title)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div class="thumb-overlay opacity-0 transition duration-200 absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span class="bg-[#ff9000] text-black font-black text-xs px-3 py-1.5 rounded-full shadow-lg">▶ Play Stream</span>
                </div>
                <span class="absolute top-2 left-2 bg-black/80 text-[#ff9000] border border-[#ff9000]/50 text-[10px] font-black px-1.5 py-0.5 rounded">
                  ${escapeHtml(v.quality || 'HD')}
                </span>
                <span class="absolute bottom-2 right-2 bg-black/90 text-white font-mono text-xs font-bold px-1.5 py-0.5 rounded">
                  ${escapeHtml(v.duration || '12:00')}
                </span>
                <div class="absolute bottom-0 inset-x-0 h-1 bg-[#222]">
                  <div class="preview-bar h-full bg-[#ff9000]"></div>
                </div>
              </div>

              <div class="p-3 space-y-1.5">
                <div class="flex items-center justify-between gap-2 text-[11px] text-gray-400">
                  <span class="truncate font-semibold text-gray-300 hover:text-white">${escapeHtml(v.creator)} <span class="text-[#ff9000]">✔</span></span>
                  ${sourceBadge}
                </div>

                <h3 class="video-title text-sm font-bold text-gray-100 leading-snug line-clamp-2 transition">
                  ${escapeHtml(v.title)}
                </h3>
              </div>
            </div>

            <div class="px-3 pb-3 pt-1 flex items-center justify-between text-xs text-gray-400 border-t border-[#222]/80">
              <div class="flex items-center space-x-2">
                <span>${formatViews(v.views)}</span>
                <span>•</span>
                <span class="text-emerald-400 font-semibold">👍 ${escapeHtml(v.rating)}%</span>
              </div>
              <span class="text-[11px] text-[#ff9000] font-semibold">${escapeHtml(v.category)}</span>
            </div>
          </article>
        `;
      }

      function renderHomeFeed() {
        const filtered = getFilteredVideos();
        const grid = document.getElementById('videoGridContainer');
        const countEl = document.getElementById('feedResultCount');
        const headingEl = document.getElementById('feedHeadingText');
        const badgeEl = document.getElementById('activeFilterBadge');

        countEl.textContent = `${filtered.length} video${filtered.length === 1 ? '' : 's'} shown`;
        headingEl.textContent = state.activeCategory === 'all'
          ? 'Recommended Videos'
          : `Category: ${state.activeCategory}`;
        badgeEl.textContent = `Category: ${state.activeCategory === 'all' ? 'All' : state.activeCategory}${state.searchQuery ? ' • Search: "' + state.searchQuery + '"' : ''}`;

        if (filtered.length === 0) {
          grid.innerHTML = `
            <div class="col-span-full bg-[#181818] border border-[#2a2a2a] rounded-lg p-10 text-center space-y-3">
              <p class="text-base font-bold text-white">No videos matched your active filter or search query.</p>
              <p class="text-xs text-gray-400">Try clearing the filter or upload a new video in the Admin Studio.</p>
              <button type="button" id="emptyResetBtn" class="bg-[#ff9000] text-black font-extrabold text-xs px-4 py-2 rounded">
                Show All Videos
              </button>
            </div>
          `;
          const btn = document.getElementById('emptyResetBtn');
          if (btn) {
            btn.addEventListener('click', () => {
              state.activeCategory = 'all';
              state.searchQuery = '';
              state.activeSort = 'recommended';
              document.getElementById('searchInput').value = '';
              renderAll();
            });
          }
        } else {
          grid.innerHTML = filtered.map(renderVideoCardHtml).join('');
        }

        // Home Photo Preview Strip
        const homePhotos = document.getElementById('homePhotoPreviewGrid');
        homePhotos.innerHTML = state.photos.slice(0, 6).map(p => {
          const src = buildPhotoSvg(p);
          return `
            <div data-open-photo="${escapeHtml(p.id)}" class="bg-[#181818] border border-[#282828] hover:border-[#ff9000] rounded overflow-hidden cursor-pointer group transition">
              <div class="aspect-video bg-black overflow-hidden">
                <img src="${src}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div class="p-2">
                <p class="text-xs font-bold text-gray-200 truncate group-hover:text-[#ff9000]">${escapeHtml(p.title)}</p>
                <span class="text-[10px] text-gray-400">${escapeHtml(p.category)} • ${escapeHtml(p.rating)}</span>
              </div>
            </div>
          `;
        }).join('');
      }

      function renderCategoriesView() {
        const container = document.getElementById('categoriesGridContainer');
        container.innerHTML = state.categories.map((cat, idx) => {
          const matchingVideos = state.videos.filter(v => v.category.toLowerCase() === cat.toLowerCase());
          const sampleVid = matchingVideos[0] || {
            category: cat,
            accent: idx % 2 === 0 ? '#ff9000' : '#38bdf8',
            codeSnippet: `// ${cat}\nSELECT * FROM streams\nWHERE category = '${cat}';`
          };
          const thumb = buildSvgThumbnail(sampleVid);
          return `
            <div data-select-category="${escapeHtml(cat)}" class="bg-[#181818] border border-[#2a2a2a] hover:border-[#ff9000] rounded-lg overflow-hidden cursor-pointer group transition">
              <div class="relative aspect-video bg-black overflow-hidden">
                <img src="${thumb}" alt="${escapeHtml(cat)}" class="w-full h-full object-cover group-hover:scale-105 transition" />
                <span class="absolute bottom-2 right-2 bg-[#ff9000] text-black text-[11px] font-black px-2 py-0.5 rounded">
                  ${matchingVideos.length} Videos
                </span>
              </div>
              <div class="p-3 flex items-center justify-between">
                <span class="font-extrabold text-sm text-white group-hover:text-[#ff9000]">${escapeHtml(cat)}</span>
                <span class="text-xs text-gray-400">Filter →</span>
              </div>
            </div>
          `;
        }).join('');
      }

      function renderPhotosView() {
        const filterVal = document.getElementById('photoCategoryFilter').value || 'all';
        const list = filterVal === 'all'
          ? state.photos
          : state.photos.filter(p => p.category.toLowerCase() === filterVal.toLowerCase());

        const container = document.getElementById('photosGridContainer');
        container.innerHTML = list.map(p => {
          const src = buildPhotoSvg(p);
          return `
            <div data-open-photo="${escapeHtml(p.id)}" class="bg-[#181818] border border-[#2a2a2a] hover:border-[#ff9000] rounded-lg overflow-hidden cursor-pointer group transition">
              <div class="aspect-video bg-black overflow-hidden relative">
                <img src="${src}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover group-hover:scale-105 transition" />
                <span class="absolute top-2 right-2 bg-black/80 text-[#ff9000] text-[10px] font-extrabold px-2 py-0.5 rounded">FULL HD</span>
              </div>
              <div class="p-3 space-y-1">
                <h3 class="text-sm font-bold text-white group-hover:text-[#ff9000] line-clamp-2">${escapeHtml(p.title)}</h3>
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <span>by ${escapeHtml(p.creator)}</span>
                  <span class="text-emerald-400 font-bold">👍 ${escapeHtml(p.rating)}</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }

      function renderChannelsView() {
        const creatorsMap = {};
        state.videos.forEach(v => {
          if (!creatorsMap[v.creator]) {
            creatorsMap[v.creator] = { name: v.creator, count: 0, views: 0, categories: new Set() };
          }
          creatorsMap[v.creator].count += 1;
          creatorsMap[v.creator].views += Number(v.views) || 0;
          creatorsMap[v.creator].categories.add(v.category);
        });

        const creators = Object.values(creatorsMap);
        const container = document.getElementById('channelsGridContainer');
        container.innerHTML = creators.map(c => {
          const initials = c.name.slice(0, 2).toUpperCase();
          const cats = Array.from(c.categories).join(', ');
          return `
            <div data-filter-creator="${escapeHtml(c.name)}" class="bg-[#181818] border border-[#2a2a2a] hover:border-[#ff9000] rounded-lg p-4 flex items-center justify-between cursor-pointer group transition">
              <div class="flex items-center space-x-3.5">
                <div class="w-12 h-12 rounded-full bg-[#ff9000] text-black font-black text-base flex items-center justify-center shrink-0">
                  ${escapeHtml(initials)}
                </div>
                <div>
                  <h3 class="text-sm sm:text-base font-extrabold text-white group-hover:text-[#ff9000] flex items-center space-x-1">
                    <span>${escapeHtml(c.name)}</span>
                    <span class="text-[#ff9000] text-xs">✔</span>
                  </h3>
                  <p class="text-xs text-gray-400">${c.count} Videos • ${formatViews(c.views)}</p>
                  <p class="text-[11px] text-gray-500 truncate max-w-[200px]">${escapeHtml(cats)}</p>
                </div>
              </div>
              <span class="bg-[#242424] group-hover:bg-[#ff9000] group-hover:text-black text-gray-300 text-xs font-bold px-3 py-1.5 rounded transition">
                View Feed
              </span>
            </div>
          `;
        }).join('');
      }

      function updateAdminLivePreview() {
        const previewBox = document.getElementById('adminLivePreviewCard');
        if (!previewBox) return;
        const sample = {
          id: 'preview',
          title: document.getElementById('vidTitleInput').value || 'Your Custom Video Title Appears Here',
          creator: document.getElementById('vidCreatorInput').value || 'CreatorName',
          category: document.getElementById('vidCategoryInput').value || 'Full-Stack',
          duration: document.getElementById('vidDurationInput').value || '18:45',
          quality: document.getElementById('vidQualityInput').value || '4K',
          rating: document.getElementById('vidRatingInput').value || 98,
          views: 12500,
          sourceType: document.getElementById('videoSourceType').value,
          sourceSite: document.getElementById('vidSourceSiteInput').value || 'External Site',
          thumbUrl: document.getElementById('vidThumbUrlInput').value || '',
          accent: '#ff9000',
          codeSnippet: '// Ready for visitor feed\nconst live = true;'
        };
        previewBox.innerHTML = renderVideoCardHtml(sample);
      }

      function renderAdminManagePanel() {
        const catList = document.getElementById('adminCategoryManagerList');
        catList.innerHTML = state.categories.map(cat => `
          <span class="bg-[#242424] border border-[#383838] text-gray-200 text-xs font-semibold px-3 py-1.5 rounded flex items-center space-x-2">
            <span>${escapeHtml(cat)}</span>
            <button type="button" data-delete-cat="${escapeHtml(cat)}" class="text-gray-400 hover:text-red-400 font-bold" title="Remove category">✕</button>
          </span>
        `).join('');

        document.getElementById('adminTableCount').textContent = state.videos.length;
        const tbody = document.getElementById('adminVideoTableBody');
        tbody.innerHTML = state.videos.map(v => `
          <tr class="hover:bg-[#202020]">
            <td class="py-2.5 px-2 font-semibold text-white max-w-xs truncate">${escapeHtml(v.title)}</td>
            <td class="py-2.5 px-2 text-[#ff9000]">${escapeHtml(v.category)}</td>
            <td class="py-2.5 px-2">
              ${v.sourceType === 'external'
                ? `<span class="bg-[#ff9000]/20 text-[#ff9000] border border-[#ff9000]/40 px-2 py-0.5 rounded text-[11px]">External (${escapeHtml(v.sourceSite)})</span>`
                : `<span class="bg-[#262626] text-gray-300 px-2 py-0.5 rounded text-[11px]">Local Upload</span>`}
            </td>
            <td class="py-2.5 px-2 text-gray-300">${formatViews(v.views)}</td>
            <td class="py-2.5 px-2 text-emerald-400 font-bold">${escapeHtml(v.rating)}%</td>
            <td class="py-2.5 px-2 text-right space-x-2 whitespace-nowrap">
              <button type="button" data-play-video="${escapeHtml(v.id)}" class="text-xs text-[#ff9000] hover:underline font-semibold">Play</button>
              <button type="button" data-delete-video="${escapeHtml(v.id)}" class="text-xs text-red-400 hover:underline font-semibold">Delete</button>
            </td>
          </tr>
        `).join('');
      }

      // Navigation Switching
      function switchView(viewName) {
        state.activeView = viewName;
        const views = ['home', 'categories', 'photos', 'channels', 'admin', 'contact'];
        views.forEach(v => {
          const el = document.getElementById('view-' + v);
          if (el) el.classList.toggle('hidden', v !== viewName);
        });

        document.querySelectorAll('.nav-tab').forEach(btn => {
          const target = btn.getAttribute('data-nav');
          btn.classList.toggle('nav-tab-active', target === viewName);
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Video Modal & Canvas Animation
      let activeModalVideoId = null;
      let simAnimId = null;
      let simPlaying = true;
      let simTick = 0;

      function startSimCanvas(video) {
        cancelAnimationFrame(simAnimId);
        const canvas = document.getElementById('modalSimCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        simPlaying = true;
        document.getElementById('simPlayPauseBtn').textContent = '❚❚ Pause';

        function draw() {
          if (simPlaying) simTick += 1;
          ctx.fillStyle = '#0a0a0a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Top IDE Bar
          ctx.fillStyle = '#181818';
          ctx.fillRect(0, 0, canvas.width, 46);
          ctx.fillStyle = '#ff9000';
          ctx.font = 'bold 16px Inter, sans-serif';
          ctx.fillText(`▶ LIVE STREAM: ${video.title.slice(0, 58)}`, 24, 29);

          // Animated code lines
          const lines = (video.codeSnippet || 'fn stream() {}').split('\n');
          ctx.font = '600 22px monospace';
          lines.forEach((line, i) => {
            ctx.fillStyle = i === 0 ? '#ff9000' : '#e5e7eb';
            const revealChars = Math.min(line.length, Math.floor((simTick / 2) % (line.length + 20)));
            ctx.fillText(line.slice(0, revealChars), 48, 130 + i * 44);
          });

          // Animated waveform / throughput bars at bottom
          for (let i = 0; i < 36; i++) {
            const h = 18 + Math.abs(Math.sin((simTick * 0.06) + i * 0.45)) * 95;
            ctx.fillStyle = i % 3 === 0 ? '#ff9000' : '#2e2e2e';
            ctx.fillRect(48 + i * 24, 460 - h, 16, h);
          }

          simAnimId = requestAnimationFrame(draw);
        }
        draw();
      }

      function openVideoModal(videoId) {
        const video = state.videos.find(v => v.id === videoId);
        if (!video) return;
        activeModalVideoId = video.id;
        video.views = (Number(video.views) || 0) + 1;
        saveState();

        document.getElementById('modalQualityBadge').textContent = video.quality || '4K';
        document.getElementById('modalVideoTitle').textContent = video.title;
        document.getElementById('modalCreatorAvatar').textContent = video.creator.slice(0, 2).toUpperCase();
        document.getElementById('modalCreatorName').textContent = video.creator;
        document.getElementById('modalViewsText').textContent = `${formatViews(video.views)} • ${video.dateLabel || 'Just now'}`;
        document.getElementById('modalLikePct').textContent = `${video.rating}%`;
        document.getElementById('modalDescription').textContent = video.description || '';

        const extBtn = document.getElementById('modalExternalLinkBtn');
        const srcBadge = document.getElementById('modalSourceBadge');
        if (video.sourceType === 'external' && video.externalUrl) {
          extBtn.href = video.externalUrl;
          extBtn.classList.remove('hidden');
          srcBadge.textContent = `External Source: ${video.sourceSite || 'Partner Website'}`;
        } else {
          extBtn.classList.add('hidden');
          srcBadge.textContent = 'Direct CodeHub Stream';
        }

        // Check if real video file / direct video stream
        const html5Vid = document.getElementById('modalHtml5Video');
        const simCanvas = document.getElementById('modalSimCanvas');
        const simControls = document.getElementById('modalSimControls');

        const directUrl = video.videoDataUrl || (video.externalUrl && /\.(mp4|webm|ogg)(\?.*)?$/i.test(video.externalUrl) ? video.externalUrl : '');
        if (directUrl) {
          cancelAnimationFrame(simAnimId);
          simCanvas.classList.add('hidden');
          simControls.classList.add('hidden');
          html5Vid.classList.remove('hidden');
          html5Vid.src = directUrl;
          html5Vid.play().catch(() => {});
        } else {
          html5Vid.pause();
          html5Vid.classList.add('hidden');
          simCanvas.classList.remove('hidden');
          simControls.classList.remove('hidden');
          startSimCanvas(video);
        }

        // Tags
        const tagBox = document.getElementById('modalTagContainer');
        tagBox.innerHTML = (video.tags || []).map(t =>
          `<span class="bg-[#242424] text-[#ff9000] text-xs font-semibold px-2.5 py-1 rounded">#${escapeHtml(t)}</span>`
        ).join('');

        renderModalComments(video.id);

        // Related videos
        const related = state.videos.filter(v => v.id !== video.id).slice(0, 4);
        document.getElementById('modalRelatedList').innerHTML = related.map(r => `
          <div data-play-video="${escapeHtml(r.id)}" class="flex items-center justify-between p-2 rounded bg-[#1c1c1c] hover:bg-[#282828] cursor-pointer">
            <div class="truncate pr-2">
              <p class="text-xs font-bold text-white truncate">${escapeHtml(r.title)}</p>
              <span class="text-[10px] text-gray-400">${escapeHtml(r.creator)} • ${escapeHtml(r.duration)}</span>
            </div>
            <span class="text-[#ff9000] text-xs font-black shrink-0">▶</span>
          </div>
        `).join('');

        document.getElementById('videoModal').classList.remove('hidden');
        renderHomeFeed();
      }

      function renderModalComments(videoId) {
        const list = state.comments[videoId] || [
          { user: 'DevViewer99', text: 'Clean 4K stream and super helpful code breakdown.', time: '2h ago' }
        ];
        document.getElementById('modalCommentsList').innerHTML = list.map(c => `
          <div class="bg-[#1c1c1c] border border-[#2a2a2a] rounded p-2.5">
            <div class="flex items-center justify-between text-[11px] mb-1">
              <span class="font-bold text-[#ff9000]">${escapeHtml(c.user)}</span>
              <span class="text-gray-500">${escapeHtml(c.time)}</span>
            </div>
            <p class="text-gray-200">${escapeHtml(c.text)}</p>
          </div>
        `).join('');
      }

      function closeVideoModal() {
        cancelAnimationFrame(simAnimId);
        const html5Vid = document.getElementById('modalHtml5Video');
        if (html5Vid) html5Vid.pause();
        document.getElementById('videoModal').classList.add('hidden');
      }

      function renderAll() {
        renderBrandingAndCounts();
        renderCategoryControls();
        renderHomeFeed();
        renderCategoriesView();
        renderPhotosView();
        renderChannelsView();
        renderAdminManagePanel();
        updateAdminLivePreview();
      }

      // EVENT DELEGATION & LISTENERS
      document.addEventListener('click', (e) => {
        const navBtn = e.target.closest('[data-nav]');
        if (navBtn) {
          closeMobileSidebar();
          switchView(navBtn.getAttribute('data-nav'));
          return;
        }

        const openAdminBtn = e.target.closest('[data-open-admin]');
        if (openAdminBtn) {
          const tab = openAdminBtn.getAttribute('data-open-admin');
          switchView('admin');
          switchAdminSubTab(tab);
          return;
        }

        const catPill = e.target.closest('[data-cat-pill]');
        if (catPill) {
          state.activeCategory = catPill.getAttribute('data-cat-pill');
          closeMobileSidebar();
          switchView('home');
          renderAll();
          return;
        }

        const selectCatCard = e.target.closest('[data-select-category]');
        if (selectCatCard) {
          state.activeCategory = selectCatCard.getAttribute('data-select-category');
          switchView('home');
          renderAll();
          showToast(`Filtered feed by category: ${state.activeCategory}`);
          return;
        }

        const filterCreator = e.target.closest('[data-filter-creator]');
        if (filterCreator) {
          state.searchQuery = filterCreator.getAttribute('data-filter-creator');
          document.getElementById('searchInput').value = state.searchQuery;
          switchView('home');
          renderAll();
          showToast(`Showing videos from creator: ${state.searchQuery}`);
          return;
        }

        const sortBtn = e.target.closest('[data-sort-btn]');
        if (sortBtn) {
          state.activeSort = sortBtn.getAttribute('data-sort-btn');
          document.getElementById('feedSortSelect').value = state.activeSort;
          closeMobileSidebar();
          switchView('home');
          renderAll();
          return;
        }

        const playCard = e.target.closest('[data-play-video]');
        if (playCard && !e.target.closest('[data-delete-video]')) {
          const vidId = playCard.getAttribute('data-play-video');
          if (vidId && vidId !== 'preview') openVideoModal(vidId);
          return;
        }

        const openPhoto = e.target.closest('[data-open-photo]');
        if (openPhoto) {
          const pId = openPhoto.getAttribute('data-open-photo');
          const photo = state.photos.find(p => p.id === pId);
          if (photo) {
            document.getElementById('photoModalTitle').textContent = photo.title;
            document.getElementById('photoModalMeta').textContent = `Uploaded by ${photo.creator} • Category: ${photo.category} • Rating: ${photo.rating}`;
            document.getElementById('photoModalBody').innerHTML = `<img src="${buildPhotoSvg(photo)}" alt="${escapeHtml(photo.title)}" class="max-h-[65vh] w-auto object-contain rounded" />`;
            document.getElementById('photoModal').classList.remove('hidden');
          }
          return;
        }

        const delVideo = e.target.closest('[data-delete-video]');
        if (delVideo) {
          const id = delVideo.getAttribute('data-delete-video');
          state.videos = state.videos.filter(v => v.id !== id);
          saveState();
          renderAll();
          showToast('Video removed from visitor feed.');
          return;
        }

        const delCat = e.target.closest('[data-delete-cat]');
        if (delCat) {
          const cName = delCat.getAttribute('data-delete-cat');
          state.categories = state.categories.filter(c => c !== cName);
          if (state.activeCategory === cName) state.activeCategory = 'all';
          saveState();
          renderAll();
          showToast(`Removed category: ${cName}`);
          return;
        }

        const adminSub = e.target.closest('[data-admin-tab]');
        if (adminSub) {
          switchAdminSubTab(adminSub.getAttribute('data-admin-tab'));
          return;
        }
      });

      function switchAdminSubTab(tabName) {
        ['video', 'photo', 'manage', 'branding'].forEach(t => {
          const panel = document.getElementById('admin-panel-' + t);
          if (panel) panel.classList.toggle('hidden', t !== tabName);
        });
        document.querySelectorAll('.admin-subtab').forEach(btn => {
          const active = btn.getAttribute('data-admin-tab') === tabName;
          btn.className = active
            ? 'admin-subtab bg-[#ff9000] text-black font-extrabold text-xs sm:text-sm px-4 py-2 rounded transition'
            : 'admin-subtab bg-[#222] text-gray-300 hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded transition';
        });
      }

      if (sb.classList.contains('hidden')) {
          openMobileSidebar();
        } else {
          closeMobileSidebar();
        }
      document.getElementById('mobileSidebarBtn').addEventListener('click', () => {
        const sb = document.getElementById('leftSidebar');
        if (sb.classList.contains('hidden')) {
          openMobileSidebar();
        } else {
          closeMobileSidebar();
        }
      });
      
      const closeSbBtn = document.getElementById('closeMobileSidebarBtn');
      if (closeSbBtn) closeSbBtn.addEventListener('click', closeMobileSidebar);

      const sbBackdrop = document.getElementById('mobileSidebarBackdrop');
      if (sbBackdrop) sbBackdrop.addEventListener('click', closeMobileSidebar);

      // Search Input & Form
      const searchInput = document.getElementById('searchInput');
      const clearSearchBtn = document.getElementById('clearSearchBtn');
      searchInput.addEventListener('input', () => {
        state.searchQuery = searchInput.value;
        clearSearchBtn.classList.toggle('hidden', !state.searchQuery);
        if (state.activeView !== 'home') switchView('home');
        renderHomeFeed();
      });

      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderHomeFeed();
      });

      document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        state.searchQuery = searchInput.value;
        state.activeCategory = document.getElementById('headerCategorySelect').value;
        switchView('home');
        renderAll();
      });

      document.getElementById('headerCategorySelect').addEventListener('change', (e) => {
        state.activeCategory = e.target.value;
        switchView('home');
        renderAll();
      });

      document.getElementById('feedSortSelect').addEventListener('change', (e) => {
        state.activeSort = e.target.value;
        renderHomeFeed();
      });

      document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        state.activeCategory = 'all';
        state.activeSort = 'recommended';
        state.searchQuery = '';
        searchInput.value = '';
        document.getElementById('feedSortSelect').value = 'recommended';
        renderAll();
        showToast('All feed filters reset.');
      });

      document.getElementById('photoCategoryFilter').addEventListener('change', () => {
        renderPhotosView();
      });

      // Quick Add Category Form
      document.getElementById('quickAddCategoryForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('quickCategoryInput');
        const val = input.value.trim();
        if (val && !state.categories.includes(val)) {
          state.categories.push(val);
          saveState();
          renderAll();
          input.value = '';
          showToast(`Added new category: ${val}`);
        }
      });

      // Admin Source Type Switcher (External Link vs Local File)
      const extBtn = document.getElementById('sourceTypeExternalBtn');
      const locBtn = document.getElementById('sourceTypeLocalBtn');
      extBtn.addEventListener('click', () => {
        document.getElementById('videoSourceType').value = 'external';
        document.getElementById('externalUrlFieldGroup').classList.remove('hidden');
        document.getElementById('localFileFieldGroup').classList.add('hidden');
        extBtn.className = 'bg-[#ff9000] text-black text-xs font-extrabold px-3 py-1 rounded';
        locBtn.className = 'text-gray-300 hover:text-white text-xs font-bold px-3 py-1 rounded';
        updateAdminLivePreview();
      });

      locBtn.addEventListener('click', () => {
        document.getElementById('videoSourceType').value = 'local';
        document.getElementById('externalUrlFieldGroup').classList.add('hidden');
        document.getElementById('localFileFieldGroup').classList.remove('hidden');
        locBtn.className = 'bg-[#ff9000] text-black text-xs font-extrabold px-3 py-1 rounded';
        extBtn.className = 'text-gray-300 hover:text-white text-xs font-bold px-3 py-1 rounded';
        updateAdminLivePreview();
      });

      // Live Preview Updates on Admin Input
      ['vidTitleInput', 'vidCreatorInput', 'vidCategoryInput', 'vidDurationInput', 'vidQualityInput', 'vidRatingInput', 'vidSourceSiteInput', 'vidThumbUrlInput'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateAdminLivePreview);
      });

      // Custom Thumbnail File Reader
      let uploadedThumbDataUrl = '';
      document.getElementById('vidThumbFileInput').addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          uploadedThumbDataUrl = reader.result;
          document.getElementById('vidThumbUrlInput').value = uploadedThumbDataUrl;
          updateAdminLivePreview();
        };
        reader.readAsDataURL(file);
      });

      // Local Video File Object URL
      let uploadedVideoObjectUrl = '';
      document.getElementById('vidLocalFileInput').addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        uploadedVideoObjectUrl = URL.createObjectURL(file);
        showToast(`Loaded video file: ${file.name}`);
      });

      // Submit New Video / External Link Form
      document.getElementById('adminVideoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const sourceType = document.getElementById('videoSourceType').value;
        const title = document.getElementById('vidTitleInput').value.trim();
        const creator = document.getElementById('vidCreatorInput').value.trim() || 'AdminCreator';
        const category = document.getElementById('vidCategoryInput').value;
        const duration = document.getElementById('vidDurationInput').value.trim() || '15:00';
        const quality = document.getElementById('vidQualityInput').value;
        const rating = Number(document.getElementById('vidRatingInput').value) || 98;
        const externalUrl = document.getElementById('vidExternalUrlInput').value.trim();
        const sourceSite = document.getElementById('vidSourceSiteInput').value.trim() || 'External Link';
        const thumbUrl = document.getElementById('vidThumbUrlInput').value.trim() || uploadedThumbDataUrl;
        const tags = document.getElementById('vidTagsInput').value.split(',').map(t => t.trim()).filter(Boolean);
        const description = document.getElementById('vidDescInput').value.trim();

        const newVideo = {
          id: 'vid-' + Date.now(),
          title,
          creator,
          category,
          duration,
          quality,
          views: 1,
          rating,
          dateLabel: 'Just now',
          sourceType,
          sourceSite: sourceType === 'external' ? sourceSite : 'Direct Upload',
          externalUrl: sourceType === 'external' ? (externalUrl || 'https://example.com') : '',
          videoDataUrl: sourceType === 'local' ? uploadedVideoObjectUrl : '',
          thumbUrl,
          accent: '#ff9000',
          codeSnippet: `// ${title.slice(0, 34)}\nStream::connect("${sourceSite}");`,
          tags,
          description
        };

        state.videos.unshift(newVideo);
        uploadedThumbDataUrl = '';
        document.getElementById('vidTitleInput').value = '';
        document.getElementById('vidExternalUrlInput').value = '';
        document.getElementById('vidThumbUrlInput').value = '';
        saveState();
        renderAll();
        switchView('home');
        showToast('Published new video to the visitor feed!');
      });

      // Photo File Upload & Submit
      let uploadedPhotoDataUrl = '';
      document.getElementById('photoFileInput').addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          uploadedPhotoDataUrl = reader.result;
          showToast(`Loaded image: ${file.name}`);
        };
        reader.readAsDataURL(file);
      });

      document.getElementById('adminPhotoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('photoTitleInput').value.trim();
        const category = document.getElementById('photoCategoryInput').value;
        const creator = document.getElementById('photoCreatorInput').value.trim() || 'Admin';
        const urlInput = document.getElementById('photoUrlInput').value.trim();

        const newPhoto = {
          id: 'pho-' + Date.now(),
          title,
          creator,
          category,
          views: '1 view',
          rating: '100%',
          imageUrl: uploadedPhotoDataUrl || urlInput,
          accent: '#ff9000',
          diagramText: title.slice(0, 36)
        };

        state.photos.unshift(newPhoto);
        uploadedPhotoDataUrl = '';
        document.getElementById('photoTitleInput').value = '';
        document.getElementById('photoUrlInput').value = '';
        saveState();
        renderAll();
        switchView('photos');
        showToast('Photo uploaded to gallery!');
      });

      // Branding Form
      document.getElementById('brandingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        state.brandPrefix = document.getElementById('brandPrefixInput').value.trim() || 'Code';
        state.brandSuffix = document.getElementById('brandSuffixInput').value.trim() || 'Hub';
        saveState();
        renderBrandingAndCounts();
        showToast(`Updated site logo to ${state.brandPrefix}${state.brandSuffix}!`);
      });

      // Export & Reset Buttons
      document.getElementById('exportDataBtn').addEventListener('click', () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = 'codehub_feed_backup.json';
        a.click();
        showToast('Exported feed database as JSON!');
      });

      document.getElementById('resetDemoDataBtn').addEventListener('click', () => {
        state.categories = [...DEFAULT_CATEGORIES];
        state.videos = [...DEFAULT_VIDEOS];
        state.photos = [...DEFAULT_PHOTOS];
        state.brandPrefix = 'Code';
        state.brandSuffix = 'Hub';
        saveState();
        renderAll();
        showToast('Restored default demo videos and categories.');
      });

      // Modal Controls
      document.getElementById('closeVideoModalBtn').addEventListener('click', closeVideoModal);
      document.getElementById('closePhotoModalBtn').addEventListener('click', () => {
        document.getElementById('photoModal').classList.add('hidden');
      });

      document.getElementById('simPlayPauseBtn').addEventListener('click', () => {
        simPlaying = !simPlaying;
        document.getElementById('simPlayPauseBtn').textContent = simPlaying ? '❚❚ Pause' : '▶ Play';
      });

      document.getElementById('modalLikeBtn').addEventListener('click', () => {
        const vid = state.videos.find(v => v.id === activeModalVideoId);
        if (vid) {
          vid.rating = Math.min(100, Number(vid.rating) + 1);
          document.getElementById('modalLikePct').textContent = `${vid.rating}%`;
          saveState();
          renderHomeFeed();
          showToast('Upvoted video!');
        }
      });

      document.getElementById('modalCopyLinkBtn').addEventListener('click', () => {
        const vid = state.videos.find(v => v.id === activeModalVideoId);
        const linkToCopy = (vid && vid.externalUrl) ? vid.externalUrl : window.location.href;
        try {
          const temp = document.createElement('input');
          temp.value = linkToCopy;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        } catch (err) {}
        showToast('Video stream link copied to clipboard!');
      });

      document.getElementById('modalCommentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!activeModalVideoId) return;
        const input = document.getElementById('modalCommentInput');
        const text = input.value.trim();
        if (!text) return;
        if (!state.comments[activeModalVideoId]) state.comments[activeModalVideoId] = [];
        state.comments[activeModalVideoId].unshift({
          user: 'Visitor_Dev',
          text,
          time: 'Just now'
        });
        input.value = '';
        saveState();
        renderModalComments(activeModalVideoId);
        showToast('Comment posted!');
      });

      // Contact Form
      document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const dept = document.getElementById('contactDept').value;
        const msg = document.getElementById('contactMessage').value.trim();
        state.tickets.unshift({
          id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
          name,
          dept,
          msg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        document.getElementById('contactForm').reset();
        const listEl = document.getElementById('submittedTicketsList');
        listEl.innerHTML = state.tickets.map(t => `
          <div class="bg-[#121212] border border-[#2a2a2a] rounded p-2.5">
            <div class="flex items-center justify-between text-[#ff9000] font-bold">
              <span>${escapeHtml(t.id)} • ${escapeHtml(t.dept)}</span>
              <span class="text-gray-500">${escapeHtml(t.time)}</span>
            </div>
            <p class="text-gray-300 mt-1">${escapeHtml(t.msg)}</p>
          </div>
        `).join('');
        showToast('Support ticket submitted!');
      });

      // Initialize App
      loadState();
      renderAll();
    })();
