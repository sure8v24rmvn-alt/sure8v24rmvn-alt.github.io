/* ════════════════════════════════════════════════════════════════════
   个人主页 · app.js —— 逻辑层
   一般不需要改这个文件。所有内容都在 js/data.js 里。
   功能一览：
     · 从 data.js 渲染全部章节
     · 中英文切换（右上角 EN / 中）
     · 亮 / 暗主题切换（记忆选择）
     · 导航滚动高亮 + 顶部阅读进度条 + 移动端抽屉菜单
     · 作品按类型筛选、点击打开详情浮层（支持 Esc / ← → 键）
     · 没有配图时自动生成一张"图纸"占位图，不会出现破图
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var D = window.SITE_DATA || {};
  var root = document.documentElement;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* 当前状态：语言 / 主题 / 作品筛选 / 经历筛选 / 浮层里正在看的作品序号 */
  var state = {
    lang: (D.defaultLang === 'en' ? 'en' : 'zh'),
    theme: 'light',
    kind: 'all',
    expType: 'all',
    view: 'grid',
    openIndex: -1
  };

  var prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────── 一、通用小工具 ─────────────── */

  /* 转义，防止内容里的特殊符号破坏页面 */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* 取文字：支持 '字符串' 或 {zh:'',en:''} 两种写法；当前语言没有就用另一种，绝不空白 */
  function t(v) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (Array.isArray(v)) return v.map(t).join(' ');
    var other = state.lang === 'zh' ? 'en' : 'zh';
    return String(v[state.lang] || v[other] || '');
  }
  /* 是否真的有当前语言的版本（用于决定要不要显示副标题行） */
  function hasLang(v) {
    return v && typeof v === 'object' && !Array.isArray(v) && (v.zh || v.en);
  }
  function otherLang(v) {
    if (!hasLang(v)) return '';
    var other = state.lang === 'zh' ? 'en' : 'zh';
    return v[other] || '';
  }

  function el(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = String(html).trim();
    return tpl.content.firstElementChild;
  }
  function attr(url) { return esc(url == null ? '' : url); }

  /* ─────────────── 二、生成式"图纸"占位图 ───────────────
     没有配图的作品，会根据 id 算出一张固定的抽象平面图。
     同一个 id 每次画出来都一样，所以看起来像是刻意设计的，而不是随机噪点。 */

  function makeRng(str) {
    var a = 2166136261 >>> 0;
    str = String(str || 'x');
    for (var i = 0; i < str.length; i++) { a ^= str.charCodeAt(i); a = Math.imul(a, 16777619) >>> 0; }
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var x = a;
      x = Math.imul(x ^ (x >>> 15), 1 | x);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }
  var MONO = 'ui-monospace,Consolas,monospace';

  function genDrawing(seed, label, VW, VH) {
    var R = makeRng(seed);
    var W = VW || 400, H = VH || 300, M = 20;
    var snap = function (v, s) { return Math.round(v / (s || 6)) * (s || 6); };

    /* 1. 底纹网格（像坐标纸） */
    var grid = '';
    for (var x = M; x <= W - M + 0.5; x += 20) grid += '<line x1="' + x + '" y1="' + M + '" x2="' + x + '" y2="' + (H - M) + '"/>';
    for (var y = M; y <= H - M + 0.5; y += 20) grid += '<line x1="' + M + '" y1="' + y + '" x2="' + (W - M) + '" y2="' + y + '"/>';

    /* 2. 用递归切分做出"房间"，看起来像平面图 */
    var rooms = [];
    (function split(rect, depth) {
      var small = rect.w < 92 || rect.h < 78;
      if (depth <= 0 || small) { rooms.push(rect); return; }
      var vertical = rect.w > rect.h * 1.15 ? true : (rect.h > rect.w * 1.15 ? false : R() > 0.5);
      var ratio = 0.36 + R() * 0.28;
      if (vertical) {
        var cx = snap(rect.x + rect.w * ratio);
        if (cx - rect.x > 44 && rect.x + rect.w - cx > 44) {
          split({ x: rect.x, y: rect.y, w: cx - rect.x, h: rect.h }, depth - 1);
          split({ x: cx, y: rect.y, w: rect.x + rect.w - cx, h: rect.h }, depth - 1);
          return;
        }
      } else {
        var cy = snap(rect.y + rect.h * ratio);
        if (cy - rect.y > 40 && rect.y + rect.h - cy > 40) {
          split({ x: rect.x, y: rect.y, w: rect.w, h: cy - rect.y }, depth - 1);
          split({ x: rect.x, y: cy, w: rect.w, h: rect.y + rect.h - cy }, depth - 1);
          return;
        }
      }
      rooms.push(rect);
    })({ x: M + 12, y: M + 12, w: W - (M + 12) * 2, h: H - (M + 12) * 2 }, 2 + Math.floor(R() * 2));

    var roomSvg = '', fills = '', cols = '';
    rooms.forEach(function (r, i) {
      roomSvg += '<rect class="room" x="' + r.x.toFixed(1) + '" y="' + r.y.toFixed(1) + '" width="' + r.w.toFixed(1) + '" height="' + r.h.toFixed(1) + '"/>';
      /* 挑一两个房间铺主色，作为视觉重点 */
      if (i === Math.floor(R() * rooms.length) && r.w > 50 && r.h > 44) {
        fills += '<rect x="' + (r.x + 3).toFixed(1) + '" y="' + (r.y + 3).toFixed(1) +
                 '" width="' + (r.w - 6).toFixed(1) + '" height="' + (r.h - 6).toFixed(1) + '"/>';
      }
      /* 房间角落点几根"柱子" */
      if (r.w > 70 && r.h > 70 && R() > 0.45) {
        var px = snap(r.x + 10 + R() * (r.w - 26)), py = snap(r.y + 10 + R() * (r.h - 26));
        cols += '<circle cx="' + px + '" cy="' + py + '" r="3.4"/>';
      }
    });

    /* 3. 一条斜穿的"路径" + 两个圆，打破方盒子的呆板 */
    var path = '<path d="M' + M + ' ' + snap(H * (0.62 + R() * 0.2)) +
      ' Q ' + (W * 0.34).toFixed(0) + ' ' + snap(H * (0.3 + R() * 0.5)) +
      ' ' + (W - M) + ' ' + snap(H * (0.3 + R() * 0.45)) + '"/>' +
      '<circle cx="' + snap(W * (0.3 + R() * 0.4)) + '" cy="' + snap(H * (0.3 + R() * 0.4)) + '" r="' + snap(16 + R() * 22) + '"/>';

    /* 4. 底部标注栏：尺寸线 + 图号，模仿图纸的图签 */
    var baseY = H - M - 12;
    var ticks = '';
    for (var tx = M + 12; tx <= W - M - 12; tx += 34) {
      ticks += '<line x1="' + tx + '" y1="' + (baseY - 5) + '" x2="' + tx + '" y2="' + (baseY + 3) + '"/>';
    }
    var text = '<text x="' + (M + 12) + '" y="' + (H - M + 4) + '" font-family="' + MONO +
      '" font-size="9" letter-spacing="1.6">' + esc(String(label || 'PLAN').toUpperCase()) + '</text>' +
      '<text x="' + (W - M - 12) + '" y="' + (H - M + 4) + '" text-anchor="end" font-family="' + MONO +
      '" font-size="9" letter-spacing="1.6">SCALE 1:100</text>';

    return '<svg class="draw" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="占位图纸">' +
      '<g class="grid" stroke="currentColor" stroke-width="1" opacity="0.13">' + grid + '</g>' +
      '<g class="fill" style="fill:var(--accent)" opacity="0.16">' + fills + '</g>' +
      '<g class="rooms" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">' + roomSvg + '</g>' +
      '<g class="deco" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.62">' + path + '</g>' +
      '<g class="dots" style="fill:var(--accent)" opacity="0.85">' + cols + '</g>' +
      '<g class="dim" stroke="currentColor" stroke-width="1" opacity="0.45">' +
        '<line x1="' + (M + 12) + '" y1="' + baseY + '" x2="' + (W - M - 12) + '" y2="' + baseY + '"/>' + ticks +
      '</g>' +
      '<g class="label" fill="currentColor" opacity="0.5">' + text + '</g>' +
      '</svg>';
  }

  /* 取一张图：有配图就用配图，加载失败或没配图 → 生成图纸。
     这样你就算是路径写错了，页面也不会出现破图，只会回到占位图。 */
  function mediaEl(seed, label, src, alt, w, h) {
    if (!src) return el(genDrawing(seed, label, w, h));
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', function () {
      var d = el(genDrawing(seed, label, w, h));
      if (img.parentNode) img.parentNode.replaceChild(d, img);
    });
    return img;
  }
  /* 把容器里所有 data-seed 的占位符换成真正的图 */
  function fillMedia(scope) {
    $$('[data-seed]', scope).forEach(function (box) {
      if (box.dataset.done) return;
      box.dataset.done = '1';
      var node = mediaEl(box.dataset.seed, box.dataset.label, box.dataset.src, box.dataset.alt,
        parseInt(box.dataset.w, 10) || undefined, parseInt(box.dataset.h, 10) || undefined);
      /* 精选作品的大图不要懒加载，否则滚到时会有一下空白 */
      if (box.dataset.eager && node.tagName === 'IMG') node.loading = 'eager';
      box.appendChild(node);
      /* 头像这类不放图纸的框：图挂了就退回虚线提示框，而不是画一张平面图 */
      if (box.dataset.fallback === 'blank' && node.tagName === 'IMG') {
        node.addEventListener('error', function () {
          box.innerHTML = '<span>' + esc(box.dataset.label || 'PORTRAIT') + '<br>' +
            esc(state.lang === 'zh' ? '把照片放进 assets/images/' : 'drop a photo in assets/images/') + '</span>';
        }, { once: true });
      }
    });
  }

  /* ─────────────── 三、主题 & 语言 ─────────────── */
  function readStore(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function writeStore(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function applyTheme(mode) {
    var dark = mode === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    state.theme = dark ? 'dark' : 'light';
    var btn = $('#themeToggle');
    if (btn) {
      btn.textContent = dark ? '☀' : '◐';
      btn.title = dark ? t({ zh: '切换到日间模式', en: 'Switch to light mode' })
                       : t({ zh: '切换到夜间模式', en: 'Switch to dark mode' });
      btn.setAttribute('aria-label', btn.title);
    }
  }
  function initTheme() {
    var saved = readStore('yi-theme');
    var mode = saved || D.defaultTheme || 'auto';
    if (mode === 'auto') {
      mode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    applyTheme(mode);
  }

  function applyLang(lang, rerender) {
    state.lang = lang === 'en' ? 'en' : 'zh';
    root.dataset.lang = state.lang;
    root.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    writeStore('yi-lang', state.lang);
    var btn = $('#langToggle');
    if (btn) {
      btn.textContent = state.lang === 'zh' ? 'EN' : '中';
      btn.title = state.lang === 'zh' ? 'Switch to English' : '切换到中文';
    }
    if (rerender) renderAll();
  }

  /* ─────────────── 四、各章节渲染 ─────────────── */

  function renderChrome() {
    var p = D.profile || {};
    var mark = $('#brandMark'), name = $('#brandName');
    if (mark) mark.textContent = p.initials || (t(p.name) || '').slice(0, 2) || '—';
    if (name) name.textContent = t(p.name);
    document.title = [t(p.name), t(p.title)].filter(Boolean).join(' · ') || '个人主页';

    var fl = $('#footLeft'), fr = $('#footRight');
    if (fl) fl.textContent = '© ' + new Date().getFullYear() + ' ' + t(p.name);
    if (fr) fr.textContent = [t(D.footer && D.footer.note), t(p.updated)].filter(Boolean).join(' · ');
    var ft = $('#footTop');
    if (ft) ft.textContent = t({ zh: '回到顶部 ↑', en: 'Back to top ↑' });

    var dl = $('#cvDownload');
    if (dl) {
      dl.href = attr(p.cv);
      dl.setAttribute('download', p.cvName || '');
      dl.firstChild.textContent = '';
      dl.innerHTML = t({ zh: '下载简历 PDF', en: 'Download CV' }) + ' <i>↓</i>';
    }

    /* 静态按钮上的文字也要跟着语言走 */
    var cl = $('#ovClose');
    if (cl) {
      cl.innerHTML = esc(t({ zh: '关闭', en: 'Close' })) + ' <em>ESC</em>';
      cl.setAttribute('aria-label', t({ zh: '关闭', en: 'Close' }));
    }
    var pv = $('#ovPrev');
    if (pv) pv.innerHTML = '← <em>' + esc(t({ zh: '上一个', en: 'Prev' })) + '</em>';
    var nx = $('#ovNext');
    if (nx) nx.innerHTML = '<em>' + esc(t({ zh: '下一个', en: 'Next' })) + '</em> →';
    var sk = document.querySelector('.skip');
    if (sk) sk.textContent = t({ zh: '跳到主内容', en: 'Skip to content' });
    var sh = document.querySelector('.scroll-hint');
    if (sh) sh.innerHTML = esc(t({ zh: '向下滚动', en: 'Scroll' })) + ' <i>SCROLL</i> ↓';
    var th = $('#themeToggle');
    if (th) th.title = state.theme === 'dark' ? t({ zh: '切换到日间模式', en: 'Switch to light mode' })
                                              : t({ zh: '切换到夜间模式', en: 'Switch to dark mode' });
    var mn = $('#menuToggle');
    if (mn) mn.setAttribute('aria-label', t({ zh: '菜单', en: 'Menu' }));

    /* 导航文字 + 章节大标题：中文时中文大字、英文做小注；切到 EN 后互换 */
    var side = state.lang === 'zh' ? 'en' : 'zh';
    ((D.ui && D.ui.sections) || []).forEach(function (s) {
      var a = document.querySelector('.nav a[data-nav="' + s.id + '"]');
      if (a) {
        var sp = a.querySelector('span'), it = a.querySelector('i');
        if (sp && s.nav) sp.textContent = s.nav[state.lang] || s.nav[side] || '';
        if (it && s.nav) it.textContent = s.nav[side] || '';
      }
      var sec = document.getElementById(s.id);
      if (sec && s.title) {
        var big = sec.querySelector('.sec-head__zh'), small = sec.querySelector('.sec-head__en');
        if (big) big.textContent = s.title[state.lang] || s.title[side] || '';
        if (small) small.textContent = s.title[side] || '';
      }
    });
  }

  function renderHero() {
    var p = D.profile || {}, h = D.hero || {};
    var eb = $('#heroEyebrow'), nm = $('#heroName'), tg = $('#heroTagline');
    if (eb) eb.textContent = t(h.eyebrow) || t(p.title);
    if (nm) {
      var alt = otherLang(p.name);
      nm.innerHTML = esc(t(p.name)) + (alt ? '<span class="latin">' + esc(alt) + '</span>' : '');
    }
    if (tg) tg.textContent = t(p.tagline);

    var ml = $('#heroMeta');
    if (ml) {
      ml.innerHTML = (h.meta || []).map(function (m) {
        return '<div><dt>' + esc(t(m.k)) + '</dt><dd>' + esc(t(m.v)) + '</dd></div>';
      }).join('');
    }

    var cta = $('#heroCta');
    if (cta) {
      cta.innerHTML = (h.cta || []).map(function (c) {
        return '<a class="btn-line' + (c.solid ? ' btn-line--solid' : '') + '" href="' + attr(c.href) + '"' +
          (c.download ? ' download' : '') + '>' + esc(t(c.label)) + '</a>';
      }).join('');
    }

    var up = $('#heroUpdated');
    if (up) up.textContent = t(p.updated);

    /* 首屏右侧图纸框：真实图纸 + 可开关的底图栅格 + 图签 */
    var sheet = $('#heroSheet');
    if (sheet) {
      var s = h.sheet || {};
      var art = s.image
        ? '<div class="sheet__media"><img class="sheet__img" src="' + attr(s.image) + '" alt="' +
          esc(t(s.alt) || t(s.note)) + '" loading="eager"><span class="sheet__grid" aria-hidden="true"></span></div>'
        : el(genDrawing((p.initials || 'XXY') + '-hero', s.no || 'A-001')).outerHTML;
      sheet.innerHTML =
        art +
        '<span class="sheet__corner sheet__corner--tl"></span><span class="sheet__corner sheet__corner--br"></span>' +
        '<figcaption class="sheet__block">' +
          '<span>DWG <b>' + esc(s.no || 'A-001') + '</b></span>' +
          '<span>SCALE <b>' + esc(s.scale || '1:100') + '</b></span>' +
          '<span>' + esc(t(s.note)) + '</span>' +
          '<button type="button" class="sheet__toggle" id="sheetGrid" aria-pressed="true" title="显示 / 隐藏底图栅格">GRID</button>' +
        '</figcaption>';
      /* 栅格开关：像 CAD 里那样把底图网格关掉 */
      var tg = sheet.querySelector('#sheetGrid');
      if (tg) tg.addEventListener('click', function () {
        var off = sheet.classList.toggle('is-nogrid');
        tg.setAttribute('aria-pressed', off ? 'false' : 'true');
        tg.textContent = off ? 'GRID OFF' : 'GRID';
      });
    }
  }

  function renderAbout() {
    var a = (D.about) || {}, body = $('#aboutBody');
    if (!body) return;
    body.innerHTML = '';

    /* 左：照片（有就放）或档案卡（没有照片也不空着） */
    var p = D.profile || {}, pt = a.portrait || {};
    var left = document.createElement('div');
    if (p.avatar) {
      left.innerHTML = '<figure class="portrait">' +
        '<div class="portrait__box" data-seed="avatar" data-eager="1" data-fallback="blank" data-src="' + attr(p.avatar) + '" data-label="PORTRAIT" data-alt="' + esc(t(p.name)) + '"></div>' +
        '<figcaption class="portrait__dim"><span>' + esc(pt.ratio || '3 : 4') + '</span><span>' + esc(t(p.name)) + '</span></figcaption></figure>';
    } else {
      var idRows = (a.idcard || []).map(function (r) {
        return '<div><dt>' + esc(t(r.k)) + '</dt><dd>' + esc(t(r.v)) + '</dd></div>';
      }).join('');
      left.innerHTML = '<figure class="idcard">' +
        '<div class="idcard__head">' +
          '<span class="idcard__mark">' + esc(p.initials || 'XXY') + '</span>' +
          '<span class="idcard__tag">PROFILE</span>' +
        '</div>' +
        '<dl class="idcard__rows">' + idRows + '</dl>' +
        '<figcaption class="idcard__foot"><span>' + esc(t(p.name)) + '</span><span>' +
          esc(t({ zh: '2026.10', en: '2026.10' })) + '</span></figcaption></figure>';
    }

    /* 右：正文 + 事实表 */
    var right = document.createElement('div');
    var paras = (a.paragraphs || []).map(function (x) { return '<p>' + esc(t(x)) + '</p>'; }).join('');
    var facts = (a.facts || []).map(function (f) {
      return '<div><dt>' + esc(t(f.k)) + '</dt><dd>' + esc(t(f.v)) + '</dd></div>';
    }).join('');
    right.innerHTML = '<div class="about__paras">' + paras + '</div>' +
      (facts ? '<dl class="facts">' + facts + '</dl>' : '');

    body.appendChild(left);
    body.appendChild(right);
    fillMedia(body);
  }

  function renderSkills() {
    var box = $('#skillsBody');
    if (!box) return;
    var groups = D.skills || [];
    var tabs = groups.map(function (g, i) {
      return '<button type="button" class="tab' + (i === 0 ? ' is-on' : '') + '" data-skill="' + i + '" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '">' +
        esc(t(g.group)) + ' <b>' + (g.items || []).length + '</b></button>';
    }).join('');

    var rows = groups.map(function (g, i) {
      var hasLogo = (g.items || []).some(function (it) { return it.logo || it.mono; });
      var items = (g.items || []).map(function (it) {
        var mark = '';
        if (hasLogo) {
          if (it.logo) mark = '<img class="skill-logo" src="' + attr(it.logo) + '" alt="" width="24" height="24" decoding="async">';
          else if (it.mono) mark = '<i class="skill-logo skill-logo--mono">' + esc(it.mono) + '</i>';
          else mark = '<i class="skill-logo skill-logo--none"></i>';
        }
        return '<div class="skill-item' + (hasLogo ? ' has-logo' : '') + '">' + mark +
          '<span class="skill-item__name">' + esc(it.name && typeof it.name === 'object' ? t(it.name) : it.name) + '</span>' +
          (t(it.note) ? '<span class="skill-item__note">' + esc(t(it.note)) + '</span>' : '') +
          '</div>';
      }).join('');
      return '<div class="skill-row" data-skill-row="' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
        '<div class="skill-row__head"><h3>' + esc(t(g.group)) + '</h3>' +
        (t(g.note) ? '<p>' + esc(t(g.note)) + '</p>' : '') + '</div>' +
        '<div class="skill-items">' + items + '</div></div>';
    }).join('');

    box.innerHTML = '<div class="skills__tabs">' + tabs + '</div><div class="skills__rows">' + rows + '</div>';

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-skill]');
      if (!b) return;
      $$('.tab', box).forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-selected', 'false'); });
      b.classList.add('is-on');
      b.setAttribute('aria-selected', 'true');
      $$('[data-skill-row]', box).forEach(function (r) {
        if (r.dataset.skillRow === b.dataset.skill) r.removeAttribute('hidden');
        else r.setAttribute('hidden', '');
      });
    });
  }

  /* ── 作品集：筛选 + 卡片 ── */
  function visibleProjects() {
    return (D.projects || []).filter(function (p) {
      return state.kind === 'all' || p.kindKey === state.kind;
    });
  }

  function renderWorksFilters() {
    var box = $('#worksFilters');
    if (!box) return;
    var all = D.projects || [];
    /* 只保留真正有作品的分类；只剩"全部 + 一类"时整排隐藏，两颗重复的按钮没有信息量 */
    var kinds = (D.kinds || []).filter(function (k) {
      return k.key === 'all' || all.some(function (p) { return p.kindKey === k.key; });
    });
    box.hidden = kinds.length <= 2;
    box.innerHTML = kinds.map(function (k) {
      var n = k.key === 'all' ? all.length : all.filter(function (p) { return p.kindKey === k.key; }).length;
      return '<button type="button" class="chip' + (state.kind === k.key ? ' is-on' : '') + '" data-kind="' + esc(k.key) + '">' +
        esc(t(k.label)) + ' <b>' + n + '</b></button>';
    }).join('');
  }

  function projectCardHTML(p, i) {
    var tags = (p.tags || []).slice(0, 3).map(function (x) { return '<span class="tag">' + esc(t(x)) + '</span>'; }).join('');
    return '<article class="card reveal" data-open="' + i + '" tabindex="0" role="button" aria-label="' + esc(t({ zh: '查看作品：', en: 'View project: ' })) + esc(t(p.title)) + '">' +
      '<div class="card__media">' +
        '<span class="card__no">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="card__kind">' + esc(t(p.kindLabel)) + '</span>' +
        '<div data-seed="' + esc(p.id || ('p' + i)) + '" data-label="' + esc(p.id || '') + '" data-src="' + attr(p.cover) + '" data-alt="' + esc(t(p.title)) + '" style="width:100%;height:100%"></div>' +
      '</div>' +
      '<div class="card__body">' +
        '<h3 class="card__title">' + esc(t(p.title)) + '</h3>' +
        (t(p.subtitle) ? '<p class="card__sub">' + esc(t(p.subtitle)) + '</p>' : '') +
        (tags ? '<div class="card__tags">' + tags + '</div>' : '') +
        '<div class="card__foot"><span>' + esc(p.year || '') + '</span><span>' + esc(t(p.role)) + '</span></div>' +
      '</div></article>';
  }

  /* 精选作品：整幅排在最前面（数据里 featured:true 决定是谁，可以有多条）
     flip = 图放右边，让连续两条精选有节奏，不至于像复制粘贴 */
  function featureHTML(p, i, no, flip) {
    return '<article class="feature' + (flip ? ' is-flip' : '') + ' reveal" data-open="' + i + '" tabindex="0" role="button" aria-label="' + esc(t({ zh: '查看作品：', en: 'View project: ' })) + esc(t(p.title)) + '">' +
      '<div class="feature__media"><div data-seed="' + esc(p.id || ('f' + i)) + '" data-label="' + esc(p.id || '') +
        '" data-w="480" data-h="300" data-eager="1" data-src="' + attr(p.cover) + '" data-alt="' + esc(t(p.title)) +
        '" style="width:100%;height:100%"></div></div>' +
      '<div class="feature__body">' +
        '<p class="feature__kicker">' + esc(t({ zh: '精选作品', en: 'Selected' })) +
          (no ? ' ' + String(no).padStart(2, '0') : '') + ' · ' + esc(p.year || '') + '</p>' +
        '<h3 class="feature__title">' + esc(t(p.title)) + '</h3>' +
        (t(p.subtitle) ? '<p class="feature__sub">' + esc(t(p.subtitle)) + '</p>' : '') +
        ((p.results || []).length ? '<ul class="results">' + (p.results || []).map(function (r) {
          return '<li>' + esc(t(r)) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="feature__meta">' +
          (t(p.role) ? '<span>' + esc(t({ zh: '角色', en: 'Role' })) + ' <b>' + esc(t(p.role)) + '</b></span>' : '') +
          (t(p.kindLabel) ? '<span>' + esc(t({ zh: '类型', en: 'Type' })) + ' <b>' + esc(t(p.kindLabel)) + '</b></span>' : '') +
          (t(p.status) ? '<span>' + esc(t({ zh: '状态', en: 'Status' })) + ' <b>' + esc(t(p.status)) + '</b></span>' : '') +
        '</div>' +
        ((p.tags || []).length ? '<div class="card__tags feature__tags">' +
          (p.tags || []).slice(0, 4).map(function (x) { return '<span class="tag">' + esc(t(x)) + '</span>'; }).join('') + '</div>' : '') +
        '<span class="feature__more">' + esc(t({ zh: '查看详情', en: 'View project' })) + ' →</span>' +
      '</div></article>';
  }

  /* 索引视图：一张能一眼扫完的表 */
  function indexTableHTML(pairs) {
    var cols = [
      ['No.', 'No.', ''],
      [t({ zh: '作品', en: 'Work' }), '', 't-title'],
      [t({ zh: '年份', en: 'Year' }), '', 't-mono'],
      [t({ zh: '类型', en: 'Type' }), '', 't-mono'],
      [t({ zh: '角色', en: 'Role' }), '', 't-mono t-role'],
      [t({ zh: '关键词', en: 'Tags' }), '', 't-tags']
    ];
    var head = '<thead><tr>' + cols.map(function (c, i) {
      return '<th' + (i === 4 ? ' class="t-role"' : (i === 5 ? ' class="t-tags"' : '')) + '>' + esc(c[0]) + '</th>';
    }).join('') + '</tr></thead>';
    var rows = pairs.map(function (x) {
      var p = x.p;
      return '<tr data-open="' + x.i + '" tabindex="0">' +
        '<td class="t-no">' + String(x.i + 1).padStart(2, '0') + '</td>' +
        '<td class="t-title">' + esc(t(p.title)) + '</td>' +
        '<td class="t-mono">' + esc(p.year || '') + '</td>' +
        '<td class="t-mono">' + esc(t(p.kindLabel)) + '</td>' +
        '<td class="t-mono t-role">' + esc(t(p.role)) + '</td>' +
        '<td class="t-tags">' + esc((p.tags || []).slice(0, 4).map(t).join(' / ')) + '</td></tr>';
    }).join('');
    return '<table class="works-index">' + head + '<tbody>' + rows + '</tbody></table>';
  }

  function renderWorks() {
    var grid = $('#worksGrid'), empty = $('#worksEmpty'), cnt = $('#worksCount');
    if (!grid) return;
    var list = visibleProjects();
    var total = (D.projects || []).length;
    /* 只有一两个作品时，索引视图和切换按钮都没有意义，直接收掉 */
    if (total <= 2) state.view = 'grid';
    var pairs = list.map(function (p, i) { return { p: p, i: i }; });
    var feats = [];

    /* 精选只在"全部 + 网格视图"时整幅展示，避免筛选后结构跳来跳去。
       有几条 featured 就排几整幅——只剩两个作品时，这样比"一大一小"更稳。 */
    if (state.view !== 'index' && state.kind === 'all') {
      feats = pairs.filter(function (x) { return x.p.featured; });
      pairs = pairs.filter(function (x) { return !x.p.featured; });
    }

    if (state.view === 'index') {
      grid.className = 'works-index-wrap';
      grid.innerHTML = indexTableHTML(pairs);
    } else {
      grid.className = 'works-grid';
      grid.innerHTML = feats.map(function (x, j) { return featureHTML(x.p, x.i, j + 1, j % 2 === 1); }).join('') +
        pairs.map(function (x) { return projectCardHTML(x.p, x.i); }).join('');
      fillMedia(grid);
    }

    if (empty) empty.hidden = list.length > 0;
    var vt = $('#worksView');
    if (vt) vt.hidden = total <= 2;
    /* 作品少的时候，把数量和章节标题放同一行，收掉空着的一条工具条 */
    if (total <= 2) {
      var barEl = document.querySelector('.works-bar');
      var headEl = document.querySelector('#works .sec-head');
      if (barEl && headEl && cnt && cnt.parentNode !== headEl) {
        cnt.classList.add('works-count--head');
        headEl.appendChild(cnt);
        barEl.hidden = true;
      }
    }
    if (cnt) {
      cnt.textContent = state.lang === 'zh'
        ? (state.kind === 'all' ? '共 ' + total + ' 个作品' : '共 ' + total + ' 个作品 · 当前 ' + list.length + ' 个')
        : (state.kind === 'all' ? total + (total > 1 ? ' projects' : ' project')
                                : total + ' projects · showing ' + list.length);
    }
    $$('#worksView [data-view]').forEach(function (b) {
      var on = b.dataset.view === state.view;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    observeReveal(grid);
  }

  /* 在线试玩面板：file:// 直接打开时浏览器会拦 iframe，给说明而不是一个白框 */
  function mountEmbeds(scope) {
    $$('.embed', scope).forEach(function (box) {
      if (box.dataset.done) return;
      box.dataset.done = '1';
      var src = box.dataset.src;
      if (location.protocol === 'file:') {
        box.innerHTML = '<div class="embed__note"><span>' +
          esc(t({ zh: '本地双击打开时，浏览器不允许嵌入本地页面。<br>把这个网站部署到线上后，这里就是可以直接点的应用。',
                  en: 'Browsers block local iframes. Deploy the site and this becomes a live app.' })
              .replace('<br>', '\n')) +
          '</span></div>';
        var fig = box.closest('figure');
        var link = fig && fig.querySelector('.panel__cap a');
        if (link) link.remove();
        return;
      }
      var f = document.createElement('iframe');
      f.src = src;
      f.title = box.dataset.title || '在线试玩';
      f.loading = 'lazy';
      f.setAttribute('allow', 'fullscreen');
      box.appendChild(f);
    });
  }

  /* ── 展板重排版：把一张 A1 展板拆成网页面板 ── */
  function boardHTML(p) {
    var b = p.board || {};
    var head =
      '<header class="board__head">' +
        (b.no ? '<p class="board__no">' + esc(t(b.no)) + '</p>' : '') +
        '<h2 class="board__title" id="ovTitle">' + esc(t(p.title)) + '</h2>' +
        (b.en && state.lang === 'zh' ? '<p class="board__en">' + esc(t(b.en)) + '</p>' : '') +
        ((p.results || []).length ? '<ul class="results board__results">' + (p.results || []).map(function (r) {
          return '<li>' + esc(t(r)) + '</li>'; }).join('') + '</ul>' : '') +
        ((b.meta || []).length ? '<dl class="board__meta">' + b.meta.map(function (m) {
          return '<div><dt>' + esc(t(m.k)) + '</dt><dd>' + esc(t(m.v)) + '</dd></div>';
        }).join('') + '</dl>' : '') +
        ((p.demo || (p.links || []).length) ? '<div class="board__links">' +
          (p.demo ? '<button type="button" class="btn-line js-gp-demo">' +
            esc(t({ zh: '打开演示', en: 'Open demo' })) + ' →</button>' : '') +
          (p.links || []).map(function (l) {
            return '<a class="btn-line" href="' + attr(l.url) + '" target="_blank" rel="noopener">' +
              esc(t(l.label)) + ' ↗</a>';
          }).join('') + '</div>' : '') +
      '</header>';

    var panels = (b.panels || []).map(function (pn, i) {
      var w = Math.max(1, Math.min(12, parseInt(pn.w, 10) || 12));
      var style = ' style="grid-column:span ' + w + '"';
      var no = String(i + 1).padStart(2, '0');

      if (pn.t === 'figure') {
        return '<figure class="panel panel--figure"' + style + '>' +
          '<div data-seed="' + esc((p.id || 'b') + '-' + i) + '" data-label="' + esc(t(pn.cap) || '') +
            '" data-src="' + attr(pn.src) + '" data-alt="' + esc(t(pn.cap)) + '"></div>' +
          '<figcaption class="panel__cap"><span><b>' + no + '</b> ' + esc(t(pn.cap)) + '</span>' +
          (pn.note ? '<span>' + esc(t(pn.note)) + '</span>' : '') + '</figcaption></figure>';
      }

      if (pn.t === 'embed') {
        return '<figure class="panel panel--figure panel--embed"' + style + '>' +
          '<div class="embed" data-src="' + attr(pn.src) + '" data-title="' + esc(t(pn.title) || '在线试玩') + '"></div>' +
          '<figcaption class="panel__cap"><span><b>' + no + '</b> ' + esc(t(pn.cap)) + '</span>' +
          '<a href="' + attr(pn.src) + '" target="_blank" rel="noopener">' +
            esc(t({ zh: '新窗口打开', en: 'Open' })) + ' ↗</a></figcaption></figure>';
      }

      if (pn.t === 'list') {
        return '<div class="panel panel--list"' + style + '>' + (pn.groups || []).map(function (g) {
          return '<div class="panel__group"><h4>' + esc(t(g.title)) + '</h4><ul>' +
            (g.items || []).map(function (it) {
              var cn = Array.isArray(it) ? it[0] : it;
              var en = Array.isArray(it) ? it[1] : '';
              return '<li><span>' + esc(t(cn)) + '</span>' + (en ? '<i>' + esc(en) + '</i>' : '') + '</li>';
            }).join('') + '</ul></div>';
        }).join('') + '</div>';
      }

      return '<div class="panel panel--text"' + (pn.anchor ? ' data-anchor="1"' : '') + style + '>' +
        (pn.kicker ? '<p class="panel__kicker">' + esc(t(pn.kicker)) + '</p>' : '') +
        (pn.h ? '<h3 class="panel__h">' + esc(t(pn.h)) + '</h3>' : '') +
        (pn.body || []).map(function (x) { return '<p>' + esc(t(x)) + '</p>'; }).join('') +
        ((pn.items || []).length ? '<ul>' + pn.items.map(function (x) {
          return '<li>' + esc(t(x)) + '</li>'; }).join('') + '</ul>' : '') +
        (function () {
          var other = (pn.body || []).map(otherLang).filter(Boolean);
          if (!other.length) return '';
          return '<details class="panel__en"><summary>' + esc(state.lang === 'zh' ? 'EN' : '中文') + '</summary>' +
            other.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</details>';
        })() +
        '</div>';
    }).join('');

    var foot = '<div class="board__foot">' +
      '<p>' + esc(t(b.foot || { zh: 'A1 展板 · 网页面板重排', en: 'A1 board · re-laid out for web' })) + '</p>' +
      (b.original ? '<a class="board__orig" href="' + attr(b.original) + '" target="_blank" rel="noopener">' +
        esc(t({ zh: '查看原始展板', en: 'View original board' })) + ' ↗</a>' : '') +
      '</div>';

    return '<div class="board">' + head + '<div class="board__grid">' + panels + '</div>' + foot + '</div>';
  }

  /* ── 作品详情浮层 ── */
  function openProject(index) {
    var list = visibleProjects();
    var p = list[index];
    if (!p) return;
    var wasClosed = state.openIndex < 0;
    state.openIndex = index;
    if (wasClosed) state.lastFocus = document.activeElement;
    /* 深链：地址栏带上 #p=<id>，刷新和转发都能定位到这个案例 */
    try { history.replaceState(null, '', '#p=' + encodeURIComponent(p.id || '')); } catch (e) {}
    var body = $('#ovBody'), ov = $('#overlay');
    if (!body || !ov) return;

    /* 带展板数据的作品：走重排版，不用普通图文详情 */
    if (p.board && (p.board.panels || []).length) {
      body.innerHTML = boardHTML(p);
      fillMedia(body);
      mountEmbeds(body);
      ov.hidden = false;
      root.style.overflow = 'hidden';
      var scb = $('#ovScroll');
      if (scb) scb.scrollTop = 0;
      var cb = $('#ovClose');
      if (cb) cb.focus();
      return;
    }

    var metaRows = [
      { k: { zh: '年份', en: 'Year' },   v: p.year },
      { k: { zh: '类型', en: 'Type' },   v: t(p.kindLabel) },
      { k: { zh: '角色', en: 'Role' },   v: t(p.role) },
      { k: { zh: '场地', en: 'Site' },   v: t(p.site) },
      { k: { zh: '协作', en: 'Team' },   v: t(p.team) },
      { k: { zh: '状态', en: 'Status' }, v: t(p.status) }
    ].filter(function (r) { return t(r.v) && t(r.v) !== '—'; });

    var imgs = (p.images || []).filter(function (x) { return x && (x.src || x.caption); });
    var gallery = imgs.length
      ? imgs.map(function (im, k) {
          return '<figure class="ov-fig"><div data-seed="' + esc((p.id || 'p') + '-' + k) + '" data-label="' +
            esc((p.id || '') + '-' + (k + 1)) + '" data-src="' + attr(im.src) + '" data-alt="' + esc(t(im.caption)) + '"></div>' +
            (t(im.caption) ? '<figcaption>' + esc(t(im.caption)) + '</figcaption>' : '') + '</figure>';
        }).join('')
      : '<figure class="ov-fig"><div data-seed="' + esc(p.id || 'p') + '" data-label="' + esc(p.id || '') +
        '" data-src="' + attr(p.cover) + '" data-alt="' + esc(t(p.title)) + '"></div></figure>';

    var hint = '';
    if (!imgs.length && D.showEditHints !== false) {
      hint = '<p class="ov-hint">这个作品还没有配图，现在显示的是自动生成的占位图纸。<br>' +
        '放图方法：把图片放进 <code>assets/images/projects/' + esc(p.id || '') + '/</code>，' +
        '然后在 <code>js/data.js</code> 里把 <code>cover</code> 写成文件路径。</p>';
    }

    body.innerHTML =
      '<header class="ov-head">' +
        '<p class="ov-kicker">' + esc(t(p.kindLabel)) + ' · ' + esc(p.year || '') + '</p>' +
        '<h2 id="ovTitle">' + esc(t(p.title)) + '</h2>' +
        (t(p.subtitle) ? '<p class="ov-sub">' + esc(t(p.subtitle)) + '</p>' : '') +
      '</header>' +
      '<div class="ov-body">' +
        '<div class="ov-gallery">' + gallery + '</div>' +
        '<aside class="ov-side">' +
          '<dl class="ov-table">' + metaRows.map(function (r) {
            return '<div><dt>' + esc(t(r.k)) + '</dt><dd>' + esc(t(r.v)) + '</dd></div>';
          }).join('') + '</dl>' +
          ((p.desc || []).length ? '<div class="ov-desc"><h3>' + esc(t({ zh: '项目说明', en: 'Description' })) + '</h3>' +
            (p.desc || []).map(function (x) { return '<p>' + esc(t(x)) + '</p>'; }).join('') + '</div>' : '') +
          ((p.drawings || []).length ? '<div class="ov-drawings"><h3>' + esc(t({ zh: '图纸清单', en: 'Drawings' })) + '</h3><ul>' +
            (p.drawings || []).map(function (d) {
              return '<li><span style="font-family:inherit;font-size:.9rem;text-transform:none;letter-spacing:0;color:inherit">' +
                esc(t(d.name)) + '</span><span>' + esc(d.type || '') + '</span></li>';
            }).join('') + '</ul></div>' : '') +
          ((p.links || []).length ? '<div class="ov-links"><h3>' + esc(t({ zh: '相关链接', en: 'Links' })) + '</h3>' +
            (p.links || []).map(function (l) {
              return '<a href="' + attr(l.url) + '" target="_blank" rel="noopener">' + esc(t(l.label)) + '<span>↗</span></a>';
            }).join('') + '</div>' : '') +
          ((p.tags || []).length ? '<div class="ov-tags">' + (p.tags || []).map(function (x) {
            return '<span class="tag">' + esc(x) + '</span>'; }).join('') + '</div>' : '') +
          hint +
        '</aside>' +
      '</div>';

    fillMedia(body);
    ov.hidden = false;
    root.style.overflow = 'hidden';
    var sc = $('#ovScroll');
    if (sc) sc.scrollTop = 0;
    var close = $('#ovClose');
    if (close) close.focus();
  }

  /* 把 Tab 锁在当前浮层里，键盘用户不会 tab 到背后的页面 */
  function trapWithin(scope, e) {
    var f = $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', scope)
      .filter(function (el) { return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length); });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!scope.contains(document.activeElement)) { e.preventDefault(); first.focus(); return; }
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function closeProject() {
    var ov = $('#overlay');
    if (!ov || ov.hidden) return;
    closeLightbox();
    ov.hidden = true;
    root.style.overflow = '';
    state.openIndex = -1;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    var back = state.lastFocus;
    state.lastFocus = null;
    if (back && document.contains(back)) back.focus({ preventScroll: true });
  }
  function stepProject(dir) {
    var list = visibleProjects();
    if (!list.length) return;
    var next = state.openIndex + dir;
    if (next < 0) next = list.length - 1;
    if (next >= list.length) next = 0;
    openProject(next);
  }

  /* ── 图片灯箱：点详情页里的图，全屏看 ── */
  var lbEl = null, lbItems = [], lbIndex = 0;

  function ensureLightbox() {
    if (lbEl) return lbEl;
    lbEl = document.createElement('div');
    lbEl.className = 'lightbox';
    lbEl.hidden = true;
    lbEl.innerHTML = '<div class="lightbox__bar"><span id="lbCount"></span>' +
      '<button type="button" class="ghost-btn" data-lb-close>关闭 <em>ESC</em></button></div>' +
      '<img class="lightbox__img" alt=""><p class="lightbox__cap"></p>';
    document.body.appendChild(lbEl);
    lbEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-lb-close]') || e.target === lbEl) closeLightbox();
    });
    return lbEl;
  }
  function openLightbox(items, idx) {
    ensureLightbox();
    lbItems = items || [];
    if (!lbItems.length) return;
    lbIndex = Math.max(0, Math.min(idx || 0, lbItems.length - 1));
    var it = lbItems[lbIndex];
    var img = lbEl.querySelector('.lightbox__img');
    if (img) { img.src = it.src; img.alt = it.alt || ''; }
    var cap = lbEl.querySelector('.lightbox__cap');
    if (cap) cap.textContent = it.caption || '';
    var c = lbEl.querySelector('#lbCount');
    if (c) c.textContent = (lbIndex + 1) + ' / ' + lbItems.length;
    lbEl.hidden = false;
    root.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lbEl || lbEl.hidden) return;
    lbEl.hidden = true;
    var ov = $('#overlay');
    if (!ov || ov.hidden) root.style.overflow = '';
  }
  function stepLightbox(d) {
    if (!lbItems.length) return;
    openLightbox(lbItems, (lbIndex + d + lbItems.length) % lbItems.length);
  }
  function initLightbox() {
    var body = $('#ovBody');
    if (!body) return;
    body.addEventListener('click', function (e) {
      /* 普通详情页的图廊，和展板重排版里的每一块图，都可以点开放大 */
      var img = e.target.closest('.ov-fig img, .panel--figure img');
      if (!img) return;
      var isPanel = !!img.closest('.panel--figure');
      var scope = isPanel ? (img.closest('.board') || body) : body;
      var imgs = $$(isPanel ? '.panel--figure img' : '.ov-fig img', scope);
      var items = imgs.map(function (im) {
        var fig = im.closest('figure');
        var cap = fig && (fig.querySelector('figcaption') || fig.querySelector('.panel__cap'));
        return { src: im.getAttribute('src'), alt: im.alt,
                 caption: cap ? String(cap.textContent).replace(/\s+/g, ' ').trim() : '' };
      });
      var i = imgs.indexOf(img);
      openLightbox(items, i < 0 ? 0 : i);
    });
  }

  /* ── 经历时间线 ── */
  function renderExperience() {
    var box = $('#timeline'), fbox = $('#expFilters');
    if (!box) return;
    var all = D.experience || [];

    if (fbox) {
      fbox.innerHTML = (D.expTypes || []).map(function (k) {
        var n = k.key === 'all' ? all.length : all.filter(function (x) { return x.type === k.key; }).length;
        if (n === 0 && k.key !== 'all') return '';
        return '<button type="button" class="chip' + (state.expType === k.key ? ' is-on' : '') + '" data-exp="' + esc(k.key) + '">' +
          esc(t(k.label)) + ' <b>' + n + '</b></button>';
      }).join('');
    }

    var list = all.filter(function (x) { return state.expType === 'all' || x.type === state.expType; });
    var typeLabel = {};
    (D.expTypes || []).forEach(function (k) { typeLabel[k.key] = t(k.label); });

    box.innerHTML = list.map(function (x) {
      var hl = (x.highlights || []).map(function (h) { return '<li>' + esc(t(h)) + '</li>'; }).join('');
      return '<li class="tl-item reveal' + (x.now ? ' tl-item--now' : '') + '">' +
        '<div class="tl-item__top">' +
          '<span class="tl-item__period">' + esc(x.period || '') + '</span>' +
          '<span class="tl-item__kind">' + esc(typeLabel[x.type] || x.type || '') + '</span>' +
        '</div>' +
        '<h3 class="tl-item__title">' + esc(t(x.title)) + '</h3>' +
        (t(x.org) ? '<p class="tl-item__org">' + esc(t(x.org)) + '</p>' : '') +
        (t(x.detail) ? '<p class="tl-item__detail">' + esc(t(x.detail)) + '</p>' : '') +
        (hl ? '<ul>' + hl + '</ul>' : '') +
        '</li>';
    }).join('');
    observeReveal(box);
  }

  /* ── 联系 ── */
  function renderContact() {
    var box = $('#contactBody');
    if (!box) return;
    var p = D.profile || {}, c = D.contact || {};
    var copyLabel = t({ zh: '复制邮箱', en: 'Copy email' });

    var rows = [];
    if (p.phone && p.showPhone !== false) rows.push({ k: { zh: '电话', en: 'Phone' }, v: p.phone, copy: true });
    if (p.wechat) rows.push({ k: { zh: '微信', en: 'WeChat' }, v: p.wechat, copy: true });
    if (p.location) rows.push({ k: { zh: '所在地', en: 'Location' }, v: t(p.location) });
    (p.links || []).forEach(function (l) { rows.push({ k: l.label, v: l.url, href: l.url }); });

    box.innerHTML =
      '<p class="contact__lead">' + (c.lead && (c.lead.zh || c.lead.en) ? t(c.lead) : '') + '</p>' +
      (p.email ? '<a class="contact__mail" href="mailto:' + esc(p.email) + '">' + esc(p.email) + '</a>' +
        '<div><button type="button" class="copy-btn" data-copy="' + esc(p.email) + '">' + esc(copyLabel) + '</button></div>' : '') +
      (t(c.note) ? '<p class="muted" style="margin-top:14px;font-size:.9rem">' + esc(t(c.note)) + '</p>' : '') +
      '<div class="contact__rows">' + rows.map(function (r) {
        var inner = '<span>' + esc(t(r.k)) + '</span><strong>' + esc(t(r.v)) + '</strong>' +
          (r.copy ? '<button type="button" class="copy-btn" data-copy="' + esc(t(r.v)) + '">' + esc(copyLabel) + '</button>' : '');
        return r.href ? '<a href="' + attr(r.href) + '" target="_blank" rel="noopener">' + inner + '</a>'
                      : '<div>' + inner + '</div>';
      }).join('') + '</div>';
  }

  function renderAll() {
    renderChrome();
    renderHero();
    renderAbout();
    renderSkills();
    renderWorksFilters();
    renderWorks();
    renderExperience();
    renderContact();
  }

  /* ─────────────── 五、交互：导航 / 进场 / 复制 等 ─────────────── */

  /* 滚动进场动画 */
  var revealIO = null;
  function observeReveal(scope) {
    var nodes = $$('.reveal', scope || document).filter(function (n) { return !n.dataset.observed; });
    nodes.forEach(function (n) { n.dataset.observed = '1'; });
    if (prefersReduce || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('in'); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    nodes.forEach(function (n) { revealIO.observe(n); });
  }

  /* 导航高亮 + 阅读进度条 */
  function initScrollUI() {
    var sections = ['about', 'skills', 'works', 'experience', 'contact']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    var links = {};
    $$('.nav a[data-nav]').forEach(function (a) { links[a.dataset.nav] = a; });

    function setActive(id) {
      Object.keys(links).forEach(function (k) {
        var on = k === id;
        links[k].classList.toggle('is-active', on);
        if (on) links[k].setAttribute('aria-current', 'location');
        else links[k].removeAttribute('aria-current');
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) setActive(en.target.id);
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }

    var bar = $('#progress'), head = $('#siteHead');
    function onScroll() {
      if (bar) {
        var max = root.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? Math.min(100, (window.pageYOffset / max) * 100) : 0) + '%';
      }
      if (head) head.classList.toggle('is-stuck', window.pageYOffset > 8);
      /* 回到顶部时清掉导航高亮，别停在上一次看到的那一节 */
      if (window.pageYOffset < 80) setActive('');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 移动端抽屉 */
  function initMenu() {
    var btn = $('#menuToggle'), nav = $('#nav');
    if (!btn || !nav) return;
    var back = document.createElement('div');
    back.className = 'nav-backdrop';
    back.setAttribute('aria-hidden', 'true');
    document.body.appendChild(back);

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      back.classList.toggle('is-on', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '×' : '≡';
      root.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    /* 点遮罩或按 Esc 关闭：手机上不再需要去找那个小按钮 */
    back.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
  }

  /* 复制到剪贴板 */
  function initCopy() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-copy]');
      if (!b) return;
      e.preventDefault();
      var text = b.dataset.copy;
      var done = function () { toast(t({ zh: '已复制：', en: 'Copied: ' }) + text); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(); });
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (err) { toast(text); }
        document.body.removeChild(ta);
      }
    });
  }

  var toastTimer = null;
  function toast(msg) {
    var box = $('#toast');
    if (!box) return;
    box.textContent = msg;
    box.hidden = false;
    requestAnimationFrame(function () { box.classList.add('is-on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      box.classList.remove('is-on');
      setTimeout(function () { box.hidden = true; }, 260);
    }, 1800);
  }

  /* 作品筛选 & 打开详情 */
  function initWorks() {
    var fbox = $('#worksFilters'), grid = $('#worksGrid');
    if (fbox) {
      fbox.addEventListener('click', function (e) {
        var b = e.target.closest('[data-kind]');
        if (!b) return;
        state.kind = b.dataset.kind;
        renderWorksFilters();
        renderWorks();
      });
    }
    var vt = $('#worksView');
    if (vt) {
      vt.addEventListener('click', function (e) {
        var b = e.target.closest('[data-view]');
        if (!b) return;
        state.view = b.dataset.view === 'index' ? 'index' : 'grid';
        writeStore('yi-view', state.view);
        renderWorks();
      });
    }
    if (grid) {
      grid.addEventListener('click', function (e) {
        var c = e.target.closest('[data-open]');
        if (c) openProject(parseInt(c.dataset.open, 10));
      });
      grid.addEventListener('keydown', function (e) {
        var c = e.target.closest('[data-open]');
        if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openProject(parseInt(c.dataset.open, 10)); }
      });
    }

    var ov = $('#overlay');
    if (ov) {
      ov.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) closeProject();
      });
      var c = $('#ovClose'); if (c) c.addEventListener('click', closeProject);
      var pv = $('#ovPrev'); if (pv) pv.addEventListener('click', function () { stepProject(-1); });
      var nx = $('#ovNext'); if (nx) nx.addEventListener('click', function () { stepProject(1); });
    }
    document.addEventListener('keydown', function (e) {
      /* 演示浮层打开时，键盘归它管，别把作品详情也关掉 */
      if (window.__gpOpen) return;
      /* 灯箱优先于作品浮层 */
      if (lbEl && !lbEl.hidden) {
        if (e.key === 'Tab') { trapWithin(lbEl, e); return; }
        if (e.key === 'Escape') { closeLightbox(); return; }
        if (e.key === 'ArrowLeft') { stepLightbox(-1); return; }
        if (e.key === 'ArrowRight') { stepLightbox(1); return; }
      }
      if (!ov || ov.hidden) return;
      if (e.key === 'Tab') { trapWithin(ov, e); return; }
      if (e.key === 'Escape') { closeProject(); }
      else if (e.key === 'ArrowLeft') { stepProject(-1); }
      else if (e.key === 'ArrowRight') { stepProject(1); }
    });
  }

  /* 深链：#p=<作品id> 直接打开某个作品，方便单独发给别人 */
  function openFromHash() {
    var m = /[#&]p=([\w-]+)/.exec(location.hash || '');
    if (!m) return;
    var all = D.projects || [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === m[1]) {
        state.kind = 'all';
        renderWorksFilters();
        renderWorks();
        openProject(i);
        return;
      }
    }
  }

  function initExpFilters() {
    var fbox = $('#expFilters');
    if (!fbox) return;
    fbox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-exp]');
      if (!b) return;
      state.expType = b.dataset.exp;
      renderExperience();
    });
  }

  function initToggles() {
    var th = $('#themeToggle');
    if (th) th.addEventListener('click', function () {
      var next = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      writeStore('yi-theme', next);
    });
    var lg = $('#langToggle');
    if (lg) lg.addEventListener('click', function () {
      applyLang(state.lang === 'zh' ? 'en' : 'zh', true);
    });
  }

  /* ─────────────── 六、启动 ─────────────── */
  function init() {
    /* 全局开关 */
    root.dataset.hints = (D.showEditHints === false) ? 'off' : 'on';
    root.dataset.yiMotion = prefersReduce ? 'off' : 'on';

    initTheme();
    state.view = readStore('yi-view') === 'index' ? 'index' : 'grid';
    applyLang(readStore('yi-lang') || state.lang, false);

    renderAll();
    observeReveal(document);
    initScrollUI();
    initMenu();
    initCopy();
    initWorks();
    initLightbox();
    initExpFilters();
    initToggles();
    openFromHash();

    /* 数据里万一有错，页面上给个提示，而不是整页空白 */
    if (!D.projects || !D.projects.length) {
      var g = $('#worksGrid');
      if (g) g.innerHTML = '<p class="empty-note">data.js 里还没有 projects 数据。</p>';
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
