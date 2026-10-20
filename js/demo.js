/* ════════════════════════════════════════════════════════════════════
   成长计划 · 静态复刻版（外观与交互对齐原版）
   设计依据来自原项目源码：
     :root{ --bg:#f7f2ea; --surface:#fffcf7; --primary:#7d9b76; --ink:#3f4a3c;
            --muted:#7e8778; --note-a:#f3e6c8; --note-b:#edd8d4; --note-c:#d7e4de;
            --sprout:#8fbc7a; --line:rgba(63,74,60,.08) }
     外壳 #EFE8DC / 390px / 36px 圆角 / shadow 0 24px 64px rgba(63,74,60,.12)
     小树苗、品牌图标、底部导航图标均为原项目 SVG 原样搬运
   数据存 localStorage；建议规则与原版同构（负荷 / 完成率 / 阻碍）
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__gpClone) return;
  window.__gpClone = 1;

  var KEY = 'gp-clone-v1';
  var D = document.documentElement;

  var SPROUT = '<svg viewBox="0 0 160 180" width="100%" height="100%">' +
    '<ellipse cx="80" cy="168" rx="36" ry="8" fill="rgba(63,74,60,0.08)"/>' +
    '<path d="M80 155 V78" stroke="#6B8865" stroke-width="6" stroke-linecap="round"/>' +
    '<ellipse cx="58" cy="70" rx="26" ry="34" fill="#8FBC7A" transform="rotate(-32 58 70)"/>' +
    '<path d="M58 92 Q52 70 62 48" stroke="#6B8865" stroke-width="1.5" opacity="0.35" fill="none"/>' +
    '<ellipse cx="102" cy="64" rx="24" ry="32" fill="#A3C98F" transform="rotate(30 102 64)"/>' +
    '<path d="M102 86 Q108 66 98 46" stroke="#6B8865" stroke-width="1.5" opacity="0.3" fill="none"/>' +
    '<circle cx="80" cy="100" r="22" fill="#F5F0E4"/>' +
    '<circle cx="80" cy="100" r="22" fill="none" stroke="#E5DFD0" stroke-width="1"/>' +
    '<circle cx="73" cy="98" r="2.2" fill="#4A5C45"/><circle cx="87" cy="98" r="2.2" fill="#4A5C45"/>' +
    '<path d="M74 106c3.5 3.2 8.5 3.2 12 0" stroke="#4A5C45" stroke-width="2" stroke-linecap="round" fill="none"/>' +
    '<ellipse cx="68" cy="104" rx="3.5" ry="2" fill="#E8C4B8" opacity="0.35"/>' +
    '<ellipse cx="92" cy="104" rx="3.5" ry="2" fill="#E8C4B8" opacity="0.35"/>' +
    '<rect x="98" y="118" width="18" height="14" rx="2" fill="#D7E4DE" stroke="#7D9B76" stroke-width="1.2"/>' +
    '<line x1="101" y1="122" x2="113" y2="122" stroke="#7D9B76" stroke-width="1" opacity="0.5"/>' +
    '<line x1="101" y1="126" x2="111" y2="126" stroke="#7D9B76" stroke-width="1" opacity="0.4"/>' +
    '</svg>';

  var MARK = '<svg viewBox="0 0 64 64" width="100%" height="100%">' +
    '<circle cx="32" cy="32" r="30" fill="#E8F0E4"/>' +
    '<path d="M32 46V28" stroke="#6B8865" stroke-width="3" stroke-linecap="round"/>' +
    '<ellipse cx="26" cy="24" rx="9" ry="12" fill="#8FBC7A" transform="rotate(-25 26 24)"/>' +
    '<ellipse cx="38" cy="22" rx="8" ry="11" fill="#A3C98F" transform="rotate(28 38 22)"/>' +
    '<circle cx="29" cy="36" r="1.4" fill="#4A5C45"/><circle cx="35" cy="36" r="1.4" fill="#4A5C45"/>' +
    '<path d="M29.5 40c1.5 1.4 3.5 1.4 5 0" stroke="#4A5C45" stroke-width="1.3" stroke-linecap="round" fill="none"/>' +
    '</svg>';

  var ICON = {
    goal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
    road: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 4h3l2 7 2-7h3l-4 16h-2L7 4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 11v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    cal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16" stroke="currentColor" stroke-width="1.7"/><path d="M8 3.5v3M16 3.5v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    today: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4l2.5 1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  var STAGES = [
    { name: '第一轮基础', months: '现在 – 6 月', focus: '英语词汇与阅读框架；建筑学核心概念过一遍；数学 / 专业课补齐基础章节。', goal: '建立可坚持的每日节奏，完成第一轮知识地图。' },
    { name: '强化', months: '7 – 8 月', focus: '按科目刷题，整理错题本；英语进入长难句与真题精读。', goal: '每天稳定完成计划量，错题能复述。' },
    { name: '真题', months: '9 – 10 月', focus: '整套真题计时训练，每周一次全真模拟。', goal: '真题正确率过线，时间分配稳定。' },
    { name: '冲刺', months: '11 – 12 月', focus: '回看错题 + 模考 + 背记，压缩到高频考点。', goal: '把会做的都做对。' }
  ];

  var DEFAULT = {
    screen: 'landing',
    school: '同济大学', major: '建筑学', year: '2026', hours: 10,
    generated: false, blocker: '',
    tasks: [
      { id: 't1', name: '英语阅读 / 词汇', hours: 4, priority: 1, done: false },
      { id: 't2', name: '建筑学 · 基础阶段重点', hours: 5, priority: 2, done: false },
      { id: 't3', name: '数学 / 专业课补漏', hours: 3, priority: 3, done: false }
    ]
  };

  var st, el, stylesReady = false;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function sum(a, f) { return a.reduce(function (x, y) { return x + f(y); }, 0); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULT);
      var o = JSON.parse(raw);
      return Object.assign(clone(DEFAULT), o, { tasks: o.tasks || DEFAULT.tasks });
    } catch (e) { return clone(DEFAULT); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  /* ── 规则引擎（与原版同构：先看阻碍，再看负荷与完成率） ── */
  function calc() {
    var load = sum(st.tasks, function (t) { return t.hours; });
    var done = st.tasks.filter(function (t) { return t.done; });
    var doneH = sum(done, function (t) { return t.hours; });
    var low = st.tasks.slice().sort(function (a, b) { return b.priority - a.priority; })[0];
    return { load: load, done: done, doneH: doneH, avail: Number(st.hours) || 0,
             rate: load ? doneH / load : 0, low: low };
  }
  function advice() {
    var c = calc(), b = st.blocker;
    if (b === '学不会') return { tone: 'warn', title: 'AI 今日建议',
      what: '你选了「学不会」——这不是时间问题，是任务难度对不上。',
      why: '同一个知识点连着两天做不动，说明当前资料高于你现在的水平，硬啃只会继续卡住。',
      how: '今天换成更基础的版本（先看讲解，再做 10 道基础题），明天回到原计划；不补量。',
      act: { label: '采纳：今天换成基础资料', run: function () { st.blocker = ''; st.screen = 'today'; } } };
    if (b === '没时间') return { tone: 'warn', title: 'AI 今日建议',
      what: '今天的可用时间被挤掉了，任务还是按满量排的。',
      why: '计划没跟着现实走，缺口会一天天累积到后期，越到后面越补不动。',
      how: '把剩下的任务按 30 分钟拆开，先做最短的一项，拿回一点进度就够。',
      act: { label: '采纳：把剩余任务拆成 30 分钟一段', run: function () {
        st.tasks.forEach(function (t) { if (!t.done && t.hours > 1) t.hours = Math.max(1, Math.round(t.hours / 2)); });
        st.blocker = ''; st.screen = 'today'; } } };
    if (b === '没动力') return { tone: 'warn', title: 'AI 今日建议',
      what: '你选了「没动力」——这通常是连续没完成的结果，不是原因。',
      why: '任务太大、看不到完成感，人就会一直往后拖。',
      how: '今天只要求完成最小的一项（英语词汇 1 小时），先拿到一次「完成」。',
      act: { label: '采纳：今天只保留最小的一项', run: function () {
        st.tasks = [{ id: 't-mini', name: '英语词汇 · 最小单元', hours: 1, priority: 1, done: false }];
        st.blocker = ''; st.screen = 'today'; } } };
    if (b === '临时有事' || b === '身体状态不好') return { tone: 'warn', title: 'AI 今日建议',
      what: '今天不适合按满量推进（' + b + '）。',
      why: '硬补昨天的量只会让明天继续崩；今天把状态记录下来，本身就是有价值的信息。',
      how: '降级为复盘 + 轻量复习，不补量；明天按原计划的 80% 恢复。',
      act: { label: '采纳：今天降级为轻量复习', run: function () {
        st.tasks.forEach(function (t) { if (!t.done) t.hours = Math.min(t.hours, 1); });
        st.blocker = ''; st.screen = 'today'; } } };

    if (c.load > c.avail) return { tone: 'warn', title: 'AI 今日建议',
      what: '今天排了 ' + c.load + ' 小时，你的可用时间是 ' + c.avail + ' 小时。',
      why: '按这张表算，完成率上限只有 ' + Math.round(c.avail / c.load * 100) + '%，没做完的部分会滚到明天，越滚越多。',
      how: '砍掉优先级最低的「' + (c.low ? c.low.name : '') + '」（' + (c.low ? c.low.hours : 0) + ' 小时），或者把它拆到明后两天。',
      act: c.low ? { label: '采纳：移除这 ' + c.low.hours + ' 小时', run: function () {
        var id = c.low.id;
        st.tasks = st.tasks.filter(function (t) { return t.id !== id; }); } } : null };
    if (!c.done.length) return { tone: 'calm', title: 'AI 今日建议',
      what: '今天的任务还没开始记。',
      why: 'AI 的建议来自执行记录；没有记录，只能给你通用建议——这一条是故意的。',
      how: '先勾掉一项最小的任务，我再根据真实完成情况给判断。', act: null };
    if (c.rate < 0.6) {
      var next = Math.max(1, Math.round(c.doneH * 1.5));
      return { tone: 'warn', title: 'AI 今日建议',
        what: '完成了 ' + c.done.length + '/' + st.tasks.length + ' 项，实际 ' + c.doneH + ' 小时（' + Math.round(c.rate * 100) + '%）。',
        why: '低于一半，说明今天的排法本身有问题，不是毅力问题。',
        how: '把明天总量下调到 ' + next + ' 小时，稳定三天后再加回去。',
        act: { label: '采纳：明天按 ' + next + ' 小时排', run: function () { st.hours = next; } } };
    }
    return { tone: 'ok', title: 'AI 今日建议',
      what: '今天 ' + c.done.length + '/' + st.tasks.length + ' 项，' + c.doneH + ' 小时（' + Math.round(c.rate * 100) + '%）。',
      why: '负荷没超、完成率过半，说明这个排法是能长期跑的。',
      how: '保持同样的量再走三天，之后再加一档；现在不需要改。', act: null };
  }

  /* ── 样式：对齐原版 token ── */
  function styles() {
    if (stylesReady) return;
    stylesReady = true;
    var s = document.createElement('style');
    s.id = 'gp-clone-style';
    s.textContent = [
      '#gpc{--bg:#f7f2ea;--surface:#fffcf7;--primary:#7d9b76;--primary-hover:#6b8865;--ink:#3f4a3c;--muted:#7e8778;--note-a:#f9f1df;--note-b:#f6eae5;--note-c:#ebf0ea;--sprout:#8fbc7a;--line:rgba(63,74,60,.08);',
      'position:fixed;inset:0;z-index:70;background:#efe8dc;display:flex;justify-content:center;overflow:hidden;',
      'font-family:Nunito,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}',
      '#gpc *{box-sizing:border-box}',
      '#gpc .phone{position:relative;display:flex;flex-direction:column;width:100%;max-width:390px;height:100%;max-height:100%;background:var(--bg);overflow:hidden}',
      '#gpc .notch{display:none;height:44px;flex:0 0 auto;align-items:flex-end;justify-content:center;padding-bottom:8px}',
      '#gpc .notch i{width:112px;height:5px;border-radius:999px;background:rgba(63,74,60,.15)}',
      '#gpc .main{position:relative;display:flex;min-height:0;flex:1;flex-direction:column;overflow:hidden;padding:12px 20px 0}',
      '#gpc .scroll{min-height:0;flex:1;overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain;padding-bottom:16px}',
      '#gpc .scroll::-webkit-scrollbar{width:6px}#gpc .scroll::-webkit-scrollbar-thumb{background:#e8dfd0;border-radius:999px}',
      '@media(min-width:768px){#gpc{padding:24px 16px}#gpc .phone{height:min(844px,100%);border-radius:36px;border:1px solid var(--line);box-shadow:0 24px 64px rgba(63,74,60,.12)}#gpc .notch{display:flex}}',
      '#gpc .hd{display:flex;align-items:center;gap:8px;margin-bottom:14px}',
      '#gpc .hd .mk{width:32px;height:32px;flex:0 0 auto}',
      '#gpc .hd b{display:block;font-size:14.5px;font-weight:700;letter-spacing:.02em}',
      '#gpc .hd i{display:block;font-style:normal;font-size:10.5px;color:var(--muted);margin-top:1px}',
      '#gpc .hd .rt{margin-left:auto;display:flex;gap:12px}',
      '#gpc .hd .rt a{font-size:12px;font-weight:600;color:var(--primary);text-decoration:none;cursor:pointer}',
      '#gpc .hero{display:flex;flex-direction:column;align-items:center;text-align:center;margin:0 0 25px;padding:6px 0 0}',
      '#gpc .hero .sprout{width:108px;height:120px;margin-bottom:12px;animation:sprout 4.5s ease-in-out infinite}',
      '@keyframes sprout{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}',
      '#gpc .hero h1{margin:0 0 12px;font-size:26px;font-weight:700;line-height:1.35;letter-spacing:.02em}',
      '#gpc .hero p{margin:0 0 22px;font-size:14.5px;font-weight:500;line-height:1.7;color:var(--muted)}',
      '#gpc .btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;padding:0 20px;border:0;border-radius:16px;background:var(--primary);color:#fff;font-family:inherit;font-size:15px;font-weight:700;letter-spacing:.02em;cursor:pointer;transition:background .18s}',
      '#gpc .btn:hover{background:var(--primary-hover)}',
      '#gpc .btn--ghost{background:transparent;color:var(--primary);border:1.5px solid rgba(125,155,118,.45);font-weight:700}',
      '#gpc .btn--ghost:hover{background:rgba(125,155,118,.1)}',
      '#gpc .btn--sm{min-height:40px;font-size:13px;border-radius:12px;padding:0 14px;width:auto}',
      '#gpc .notes{display:grid;gap:12px}',
      '#gpc .note{display:flex;gap:9px;align-items:flex-start;padding:9px 12px;border-radius:16px;background:var(--note-a)}',
      '#gpc .note:nth-child(2){background:var(--note-b)}#gpc .note:nth-child(3){background:var(--note-c)}',
      '#gpc .note i{width:22px;height:22px;flex:0 0 auto;display:grid;place-items:center;border-radius:8px;background:rgba(255,255,255,.7);font-style:normal;font-size:12px}',
      '#gpc .note b{display:block;font-size:13px;font-weight:700;margin-bottom:2px}',
      '#gpc .note span{font-size:11.5px;line-height:1.6;color:#6b7367}',
      '#gpc .foot{margin:18px 0 6px;padding:0;border:0;text-align:center;font-size:11px;color:var(--muted)}',
      '#gpc .sec-h{font-size:16px;font-weight:700;margin:0 0 4px}',
      '#gpc .sec-s{font-size:12px;color:var(--muted);margin:0 0 14px;line-height:1.7}',
      '#gpc .card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:10px}',
      '#gpc .card h3{margin:0 0 10px;font-size:12px;font-weight:700;color:var(--ink)}',
      '#gpc .kv{display:flex;justify-content:space-between;gap:12px;padding:5px 0;font-size:13px}',
      '#gpc .kv span{color:var(--muted)}#gpc .kv b{font-weight:700}',
      '#gpc .field{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 0;font-size:13px}',
      '#gpc .field>span{color:var(--muted)}',
      '#gpc .field input{width:118px;padding:7px 10px;border:1px solid rgba(63,74,60,.16);border-radius:10px;background:#fff;font-family:inherit;font-size:13px;font-weight:600;color:var(--ink);text-align:right}',
      '#gpc .field input:focus{outline:2px solid rgba(125,155,118,.5);outline-offset:1px}',
      '#gpc .ai{border-radius:16px;border:1px solid rgba(125,155,118,.2);background:rgba(125,155,118,.08);padding:16px;margin:14px 0}',
      '#gpc .ai.warn{border-color:rgba(125,155,118,.34);background:rgba(125,155,118,.12)}',
      '#gpc .ai .t{margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--primary)}',
      '#gpc .ai .blk{margin-bottom:12px}#gpc .ai .blk:last-child{margin-bottom:0}',
      '#gpc .ai .lbl{margin:0 0 4px;font-size:12px;font-weight:600;color:var(--muted)}',
      '#gpc .ai .txt{margin:0;font-size:13px;font-weight:500;line-height:1.62;color:var(--ink)}',
      '#gpc .ai .act{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid rgba(125,155,118,.2)}',
      '#gpc .ai .hint{font-size:10.5px;color:var(--muted)}',
      '#gpc .task{display:flex;align-items:center;gap:12px;padding:13px 14px;background:var(--surface);border:1px solid var(--line);border-radius:16px;margin-bottom:8px}',
      '#gpc .task .ck{width:22px;height:22px;flex:0 0 auto;border-radius:7px;border:1.5px solid rgba(63,74,60,.22);background:#fff;display:grid;place-items:center;color:#fff;font-size:12px;cursor:pointer;transition:all .16s;padding:0}',
      '#gpc .task.done .ck{background:var(--primary);border-color:var(--primary)}',
      '#gpc .task .nm{display:block;font-size:13.5px;font-weight:600;line-height:1.45}',
      '#gpc .task.done .nm{color:var(--muted);text-decoration:line-through}',
      '#gpc .task .mt{display:block;font-size:11px;color:var(--muted);margin-top:2px}',
      '#gpc .pill{display:inline-block;padding:2px 8px;border-radius:999px;background:rgba(125,155,118,.14);color:var(--primary);font-size:10px;font-weight:700}',
      '#gpc .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}',
      '#gpc .stat{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:10px 8px;text-align:center}',
      '#gpc .stat b{display:block;font-size:17px;font-weight:700;line-height:1.2}',
      '#gpc .stat span{font-size:10.5px;color:var(--muted)}',
      '#gpc .stage{display:flex;gap:12px;padding:13px 14px;background:var(--surface);border:1px solid var(--line);border-radius:16px;margin-bottom:9px}',
      '#gpc .stage .no{width:24px;height:24px;flex:0 0 auto;border-radius:999px;background:rgba(125,155,118,.16);color:var(--primary);display:grid;place-items:center;font-size:12px;font-weight:700}',
      '#gpc .stage h4{margin:0;font-size:13.5px;font-weight:700}',
      '#gpc .stage .mth{font-size:11px;color:var(--muted);margin-left:6px;font-weight:600}',
      '#gpc .stage p{margin:6px 0 0;font-size:12px;line-height:1.65;color:#5d675a}',
      '#gpc .stage p b{color:var(--muted);font-weight:700;margin-right:6px}',
      '#gpc .wk{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin:6px 0 14px}',
      '#gpc .wd{text-align:center;border-radius:12px;padding:8px 0 7px;background:var(--surface);border:1px solid var(--line)}',
      '#gpc .wd.on{background:rgba(125,155,118,.14);border-color:rgba(125,155,118,.3)}',
      '#gpc .wd i{display:block;font-style:normal;font-size:10px;color:var(--muted)}',
      '#gpc .wd b{display:block;font-size:13px;margin-top:2px}',
      '#gpc .wd u{display:block;width:4px;height:4px;border-radius:999px;background:var(--primary);margin:4px auto 0;text-decoration:none;opacity:.8}',
      '#gpc .chips{display:flex;flex-wrap:wrap;gap:8px}',
      '#gpc .chip{padding:9px 14px;border-radius:12px;border:1px solid rgba(63,74,60,.14);background:#fff;font-family:inherit;font-size:12.5px;font-weight:600;color:#5d675a;cursor:pointer;transition:all .16s}',
      '#gpc .chip:hover{border-color:rgba(125,155,118,.5)}',
      '#gpc .chip.on{background:var(--primary);border-color:var(--primary);color:#fff}',
      '#gpc .card,#gpc .chip{transform:none;box-shadow:none}',
      '#gpc .card:hover,#gpc .chip:hover{transform:none;box-shadow:none}',
      '#gpc .nav{display:block;flex:0 0 auto;border-top:1px solid rgba(63,74,60,.08);padding:6px 0 max(8px,env(safe-area-inset-bottom))}',
      '#gpc .nav ul{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:0;padding:0;list-style:none}',
      '#gpc .nav a{display:flex;flex-direction:column;align-items:center;gap:2px;border-radius:12px;padding:6px 4px;color:var(--muted);text-decoration:none;cursor:pointer;transition:color .16s}',
      '#gpc .nav a.on{color:var(--primary)}',
      '#gpc .nav em{font-style:normal;font-size:11px;font-weight:700}',
      '#gpc .close{position:absolute;right:18px;top:16px;z-index:3;min-height:34px;padding:6px 13px;border-radius:999px;border:1px solid rgba(63,74,60,.16);background:rgba(255,252,247,.92);font-family:inherit;font-size:11.5px;font-weight:600;color:#6b7367;cursor:pointer}',
      '#gpc .close:hover{background:#fff;color:var(--ink)}',
      '@media(prefers-reduced-motion:reduce){#gpc .hero .sprout{animation:none}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function screenLanding() {
    var IC1 = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="3.5" width="16" height="17" rx="2.5" stroke="#6b7367" stroke-width="1.6"/><path d="M8 8.5h8M8 12h8M8 15.5h5" stroke="#6b7367" stroke-width="1.6" stroke-linecap="round"/></svg>';
    var IC2 = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3.5l2.1 4.9 5.4.5-4 3.6 1.1 5.3L12 15l-4.6 2.8 1.1-5.3-4-3.6 5.4-.5L12 3.5Z" stroke="#6b7367" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    var IC3 = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18.5h6M10 21h4" stroke="#6b7367" stroke-width="1.6" stroke-linecap="round"/><path d="M12 3.5a5.5 5.5 0 0 0-3.2 9.9c.5.4.7.9.7 1.5v.6h5v-.6c0-.6.2-1.1.7-1.5A5.5 5.5 0 0 0 12 3.5Z" stroke="#6b7367" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    return '<div class="hero"><div class="sprout">' + SPROUT + '</div>' +
        '<h1>你来定计划，<br>AI 陪你一起优化。</h1>' +
        '<p>根据真实学习情况，帮你制定、优化并持续调整备考安排。不是一键生成计划表，而是一位会分析、给建议的学习规划顾问。</p>' +
        '<button class="btn" data-go="goal">开始创建我的学习目标</button></div>' +
      '<div class="notes">' +
        '<div class="note"><i>' + IC1 + '</i><div><b>你来定计划</b><span>目标与安排由你做主，随时在日历里增删改。</span></div></div>' +
        '<div class="note"><i>' + IC2 + '</i><div><b>AI 给建议不接管</b><span>分析是否合理、是否过载，采纳与否由你决定。</span></div></div>' +
        '<div class="note"><i>' + IC3 + '</i><div><b>说清为什么</b><span>建议都带原因：发生了什么、为何改、怎么改。</span></div></div>' +
      '</div>' +
      '<p class="foot">不是替你学习，而是陪你一步一步走到考试那天。</p>';
  }

  function screenGoal() {
    return '<h2 class="sec-h">目标与规划依据</h2>' +
      '<p class="sec-s">考试信息、院校专业、阶段目标与学习条件。路线图请看「路线」，任务请看「日历」。</p>' +
      '<div class="card"><h3>考试信息</h3>' +
        '<div class="kv"><span>考试</span><b>考研</b></div>' +
        '<div class="field"><span>年份</span><input data-f="year" value="' + esc(st.year) + '"></div></div>' +
      '<div class="card"><h3>院校与专业</h3>' +
        '<div class="field"><span>院校</span><input data-f="school" value="' + esc(st.school) + '"></div>' +
        '<div class="field"><span>专业</span><input data-f="major" value="' + esc(st.major) + '"></div></div>' +
      '<div class="card"><h3>备考目标</h3>' +
        '<div class="kv"><span>阶段</span><b>第一轮基础</b></div>' +
        '<div class="kv"><span>说明</span><b style="font-weight:500">表达阶段重点，全年拆解见「路线」</b></div></div>' +
      '<div class="card"><h3>学习时间</h3>' +
        '<div class="field"><span>每日可用（小时）</span><input data-f="hours" type="number" value="' + esc(st.hours) + '"></div></div>' +
      '<button class="btn" data-go="roadmap" style="margin-top:6px">' + (st.generated ? '查看学习路线' : '生成学习路线') + '</button>';
  }

  function screenRoadmap() {
    return '<h2 class="sec-h">你的学习路线</h2>' +
      '<p class="sec-s">看懂一年怎么走。路线可以改；日历里再安排每天具体学什么。</p>' +
      '<div class="ai"><p class="t">AI 说明 · 为什么这样安排整条路线</p>' +
        '<div class="blk"><p class="lbl">发生了什么</p><p class="txt">已为 ' + esc(st.year) + ' 考研 · ' + esc(st.school) + '「' + esc(st.major) + '」生成第一版学习路线（从「第一轮基础」衔接后续阶段）。</p></div>' +
        '<div class="blk"><p class="lbl">为什么这样安排</p><p class="txt">结合你填写的「执行力不足」等困难，建议每日约 ' + esc(st.hours) + ' 小时，整体节奏偏紧凑。路线按基础 → 强化 → 真题 → 冲刺拆开，是为了先建立可坚持的节奏，再逐步加压。</p></div>' +
        '<div class="blk"><p class="lbl">建议你怎么用</p><p class="txt">你可以到「目标」里调整阶段时间、重点与目标，也可增删阶段。确认后进入「日历」，把路线落实到每周每天。</p></div></div>' +
      STAGES.map(function (s, i) {
        return '<div class="stage"><div class="no">' + (i + 1) + '</div><div>' +
          '<h4>' + esc(s.name) + '<span class="mth">' + esc(s.months) + '</span></h4>' +
          '<p><b>重点</b>' + esc(s.focus) + '</p><p><b>目标</b>' + esc(s.goal) + '</p></div></div>';
      }).join('');
  }

  function screenCal() {
    var days = ['一', '二', '三', '四', '五', '六', '日'];
    var todayIdx = 4;
    return '<h2 class="sec-h">学习日历</h2>' +
      '<p class="sec-s">2026 年 10 月 12 日 – 18 日。路线按周落地，任务可以增删改。</p>' +
      '<div class="wk">' + days.map(function (d, i) {
        return '<div class="wd' + (i === todayIdx ? ' on' : '') + '"><i>' + d + '</i><b>' + (12 + i) + '</b>' +
          (i <= todayIdx ? '<u></u>' : '') + '</div>';
      }).join('') + '</div>' +
      '<div class="card"><h3>本周目标</h3>' +
        '<p style="margin:0;font-size:12.5px;line-height:1.7;color:#5d675a">2026-10-12 · 本周要能指出 2 个已闭环的英语阅读结果 + 1 个专业课可复述知识点。</p></div>' +
      '<div class="card"><h3>10 / 17 周五（今天）</h3>' +
        st.tasks.map(function (t) {
          return '<div class="kv"><span>' + esc(t.name) + '</span><b>' + t.hours + 'h</b></div>';
        }).join('') + '</div>' +
      '<button class="btn btn--ghost btn--sm" data-go="today" style="margin-top:4px">去今日执行 →</button>';
  }

  function screenToday() {
    var a = advice(), c = calc();
    return '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:2px">' +
        '<h2 class="sec-h" style="margin:0">今日安排</h2><span class="pill">2026-10-17</span></div>' +
      '<p class="sec-s">每日执行入口 · 改未来安排请到「日历」</p>' +
      '<div class="stats"><div class="stat"><b>' + c.done.length + '/' + st.tasks.length + '</b><span>已完成</span></div>' +
        '<div class="stat"><b>' + c.load + 'h</b><span>计划</span></div>' +
        '<div class="stat"><b>' + c.avail + 'h</b><span>可用</span></div></div>' +
      aiCard(a) +
      '<h3 style="font-size:12px;font-weight:700;color:var(--muted);margin:16px 0 8px">今日执行</h3>' +
      st.tasks.map(function (t) {
        return '<div class="task' + (t.done ? ' done' : '') + '"><button class="ck" data-ck="' + esc(t.id) + '">' + (t.done ? '✓' : '') + '</button>' +
          '<div><span class="nm">' + esc(t.name) + '</span><span class="mt">优先 ' + t.priority + ' · ' + t.hours + ' 小时</span></div></div>';
      }).join('') +
      '<button class="btn btn--ghost btn--sm" data-go="review" style="margin-top:10px">去复盘 →</button>';
  }

  function screenReview() {
    var a = advice(), c = calc();
    var bs = ['没时间', '学不会', '没动力', '临时有事', '身体状态不好'];
    return '<h2 class="sec-h">今日复盘</h2>' +
      '<p class="sec-s">回看今天实际做了什么，再决定要不要调整后续安排。</p>' +
      '<div class="stats"><div class="stat"><b>' + st.tasks.length + '</b><span>计划任务</span></div>' +
        '<div class="stat"><b>' + c.done.length + '</b><span>已完成</span></div>' +
        '<div class="stat"><b>' + c.doneH + 'h</b><span>实际</span></div></div>' +
      '<h3 style="font-size:12px;font-weight:700;color:var(--muted);margin:14px 0 8px">今天最大的阻碍</h3>' +
      '<div class="chips" style="margin-bottom:4px">' + bs.map(function (b) {
        return '<button class="chip' + (st.blocker === b ? ' on' : '') + '" data-blk="' + esc(b) + '">' + esc(b) + '</button>';
      }).join('') + '</div>' +
      aiCard(a);
  }

  function aiCard(a) {
    return '<section class="ai' + (a.tone === 'warn' ? ' warn' : '') + '">' +
      '<p class="t">' + esc(a.title) + '</p>' +
      '<div class="blk"><p class="lbl">发生了什么</p><p class="txt">' + esc(a.what) + '</p></div>' +
      '<div class="blk"><p class="lbl">为什么这样安排</p><p class="txt">' + esc(a.why) + '</p></div>' +
      '<div class="blk"><p class="lbl">建议你怎么用</p><p class="txt">' + esc(a.how) + '</p></div>' +
      (a.act ? '<div class="act"><button class="btn btn--sm" data-adopt="1">' + esc(a.act.label) + '</button>' +
        '<span class="hint">AI 不自动改计划，你点了才生效</span></div>' : '') +
      '</section>';
  }

  function nav() {
    var items = [
      { k: 'goal', label: '目标', icon: ICON.goal },
      { k: 'roadmap', label: '路线', icon: ICON.road },
      { k: 'cal', label: '日历', icon: ICON.cal },
      { k: 'today', label: '今日', icon: ICON.today }
    ];
    var active = st.screen === 'review' ? 'today' : st.screen;
    return '<nav class="nav"><ul>' + items.map(function (it) {
      return '<li><a class="' + (active === it.k ? 'on' : '') + '" data-go="' + it.k + '">' + it.icon +
        '<em>' + it.label + '</em></a></li>';
    }).join('') + '</ul></nav>';
  }

  function head() {
    var right = st.screen === 'landing' ? '' :
      '<span class="rt"><a data-go="' + (st.screen === 'today' || st.screen === 'review' ? 'cal' : 'today') + '">' +
      (st.screen === 'today' || st.screen === 'review' ? '去日历规划' : '去今日') + '</a></span>';
    return '<div class="hd"><span class="mk">' + MARK + '</span>' +
      '<div><b>成长计划</b><i>AI辅助考研学习规划</i></div>' + right + '</div>';
  }

  function render() {
    if (!el) return;
    var body;
    if (st.screen === 'landing') body = screenLanding();
    else if (st.screen === 'goal') body = screenGoal();
    else if (st.screen === 'roadmap') body = screenRoadmap();
    else if (st.screen === 'cal') body = screenCal();
    else if (st.screen === 'today') body = screenToday();
    else body = screenReview();

    el.querySelector('.scroll').innerHTML = head() + body;
    el.querySelector('.nav-host').innerHTML = st.screen === 'landing' ? '' : nav();
  }

  function handle(e) {
    if (e.target === el) { close(); return; }   /* 点手机外面的帘幕也能关 */
    var t = e.target.closest('[data-go],[data-ck],[data-blk],[data-adopt],[data-close]');
    if (!t) return;
    if (t.hasAttribute('data-close')) { close(); return; }
    if (t.dataset.go) {
      if (t.dataset.go === 'roadmap' && !st.generated) st.generated = true;
      st.screen = t.dataset.go;
    } else if (t.dataset.ck) {
      var id = t.dataset.ck;
      st.tasks.forEach(function (x) { if (x.id === id) x.done = !x.done; });
    } else if (t.dataset.blk) {
      st.blocker = st.blocker === t.dataset.blk ? '' : t.dataset.blk;
    } else if (t.dataset.adopt) {
      var a = advice();
      if (a.act && a.act.run) a.act.run();
    }
    save();
    render();
  }

  function handleInput(e) {
    var f = e.target.closest('[data-f]');
    if (!f) return;
    st[f.dataset.f] = f.type === 'number' ? Number(f.value) : f.value;
    save();
  }

  function open(screen) {
    if (!el) {
      styles();
      el = document.createElement('div');
      el.id = 'gpc';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      el.setAttribute('aria-label', '成长计划 复刻版');
      el.innerHTML = '<div class="phone"><div class="notch"><i></i></div>' +
        '<div class="main"><div class="scroll"></div><div class="nav-host"></div></div></div>' +
        '<button class="close" data-close>关闭 ✕</button>';
      el.addEventListener('click', handle);
      el.addEventListener('input', handleInput);
      document.body.appendChild(el);
    }
    if (screen) st.screen = screen;
    el.hidden = false;
    window.__gpOpen = true;
    D.style.overflow = 'hidden';
    render();
    el.querySelector('.scroll').scrollTop = 0;
  }
  function close() {
    if (!el) return;
    el.hidden = true;
    window.__gpOpen = false;
    D.style.overflow = '';
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && el && !el.hidden) {
      close(); e.stopPropagation(); e.stopImmediatePropagation();
    }
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.js-gp-demo')) { e.preventDefault(); open('landing'); }
  });

  st = load();
  window.GPClone = { open: open, close: close };

  if (location.hash.indexOf('#demo') === 0) {
    var sc = location.hash.slice(5).replace(/^-/, '') || 'landing';
    var go = function () { setTimeout(function () { open(sc); }, 300); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
    else go();
  }
})();
