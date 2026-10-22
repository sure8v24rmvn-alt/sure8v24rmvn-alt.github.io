/* ═══════════════════════════════════════════════════════════════════════════
   徐鑫悦 · 个人主页  ——  内容文件
   页面长什么样由 css/ 决定，页面有什么内容全部由这里决定。
   改完存盘 → 浏览器 Ctrl+F5 刷新即可。

   规则：
   1. 引号、逗号、括号必须成对。
   2. 文字可以写成 '一句话'，也可以写成 { zh:'中文', en:'English' }。
      写成双语后，右上角点 EN 会切换；没写 en 的地方会自动显示中文。
   3. 想临时删掉一条，就从它所在的行首加 // 注释到行尾（注意别破坏逗号）。
   ═══════════════════════════════════════════════════════════════════════════ */

window.SITE_DATA = {

  /* ─────────────── 0. 全局开关 ─────────────── */
  showEditHints: false,    // 页面上是否显示"这里怎么改"的虚线提示
  defaultTheme: 'auto',    // 'auto' 跟随系统 / 'light' / 'dark'
  defaultLang: 'zh',


  /* ─────────────── 1. 基本信息 ─────────────── */
  profile: {
    name:      { zh: '徐鑫悦', en: 'Xinyue Xu' },
    initials:  'XXY',
    title:     { zh: 'AI 产品 · 用户研究', en: 'AI Product · User Research' },
    tagline: {
      zh: '把模糊的需求拆成可迭代的产品流程。200 人内测、160+ 份问卷、满意度 60%→95%；在安邦用 AI 重构招聘链路，简历获取率 10%→30%。',
      en: 'I turn vague needs into product loops: a 200-person beta with 160+ questionnaires and satisfaction from 60% to 95%; an AI-rebuilt recruiting pipeline that lifted résumé yield from 10% to 30%.'
    },
    location:  { zh: '上海', en: 'Shanghai' },
    email:     '1345341356@qq.com',
    phone:     '15809626115',
    wechat:    '',
    avatar:    'assets/images/avatar.webp',  // 3:4 证件照；留空则显示档案卡
    links: [
      // { label: 'GitHub', url: 'https://github.com/...' },
    ],
    cv: 'assets/cv.pdf',                  // 已放入她的简历 PDF
    cvName: '徐鑫悦-简历-AI产品.pdf',      // 下载时显示的文件名
    showPhone: true,                      // 手机号是否公开展示（false 则只留邮箱）
    updated: { zh: '最后更新 2026.10', en: 'Updated 2026.10' },
  },


  /* ─────────────── 2. 首屏 ─────────────── */
  hero: {
    eyebrow: { zh: 'AI 产品 · 2027 届校招', en: 'AI Product · Class of 2027' },
    meta: [
      { k: { zh: '求职方向', en: 'Focus' }, v: { zh: 'AI 产品 / AI 内容生产 / 用户研究', en: 'AI product / content / user research' } },
      { k: { zh: '状态', en: 'Status' },    v: { zh: '2027 届秋招 · 求职 AI 产品岗', en: 'Class of 2027 · seeking AI product roles' } },
      { k: { zh: '所在地', en: 'Based' },   v: { zh: '上海', en: 'Shanghai' } },
      { k: { zh: '院校', en: 'School' },    v: { zh: '同济大学 · 建筑与城市规划学院', en: 'Tongji University, CAUP' } },
    ],
    cta: [
      { label: { zh: '看作品集', en: 'View works' }, href: '#works', solid: true },
      { label: { zh: '下载简历', en: 'Download CV' }, href: 'assets/cv.pdf', download: true },
      { label: { zh: '写邮件给我', en: 'Email me' }, href: 'mailto:1345341356@qq.com' },
    ],
    sheet: {
      no:    'P-001',
      scale: 'MVP',
      note:  { zh: '成长计划 · 产品界面', en: 'Growth Plan · product screens' },
      image: 'assets/images/projects/ai-kaoyan/hero.webp',
      alt:   { zh: '成长计划的学习日历、今日安排与复盘界面', en: 'Growth Plan: calendar, today and review screens' },
    },
  },


  /* ─────────────── 2.5 章节名（导航 + 大标题） ─────────────── */
  ui: {
    sections: [
      { id: 'about',      nav: { zh: '关于', en: 'About' },   title: { zh: '关于我',    en: 'About me' } },
      { id: 'skills',     nav: { zh: '技能', en: 'Skills' },  title: { zh: '技能与工具', en: 'Skills & Tools' } },
      { id: 'works',      nav: { zh: '作品', en: 'Works' },   title: { zh: '作品集',    en: 'Selected Works' } },
      { id: 'experience', nav: { zh: '经历', en: 'CV' },      title: { zh: '经历 / 简历', en: 'Experience & CV' } },
      { id: 'contact',    nav: { zh: '联系', en: 'Contact' }, title: { zh: '联系',      en: 'Get in touch' } },
    ],
  },


  /* ─────────────── 3. 关于我 ─────────────── */
  about: {
    paragraphs: [
      { zh: '我做 AI 产品：先把「谁在用、在什么场景、卡在哪一步」问清楚，再谈功能和形式。建筑学给我的是一套空间和流程的训练，现在把它用在产品上。',
        en: 'I build AI products. I start with who uses it, in what situation, and where it breaks — before talking about features. Architecture trained me in spaces and flows; I now apply that to products.' },
      { zh: '在特赞做 AI 产品运营：把医学大会视频的脚本处理拆成 20 条基础规则 + 7 类专项规则，做成可迭代的规则库（半月一轮，已跑 3 轮）；在迪士尼数字资产管理项目里做 PRD 需求核对，划分标准功能与新增需求。再之前在安邦，用 AI 把 JD、话术、复盘、面试反馈整条招聘链路重做了一遍，简历获取率从 10% 提到 30%。',
        en: 'At Tezign I worked on AI product operations: I broke the script handling for medical congress videos into 20 base rules plus 7 specialised rule sets, and turned them into a rule library that ships every two weeks (3 rounds so far); on Disney\'s digital asset management project I checked PRD requirements and separated standard features from new requests. Before that, an HR internship at Anbang, where I rebuilt the whole recruiting chain — JD, outreach scripts, reviews, interview feedback — with AI, lifting the résumé yield from 10% to 30%.' },
      { zh: '自己也从 0 做产品：AI 考研助手从 Demo 做到 200 人内测、回收 160+ 份问卷，满意度从 60% 提到 95%。另一条线是共栖椅——一把人和猫共用的藤编椅子，用参数化生成形态、真做出来坐过；还给这个项目做了一套让用户自己调参数的生成工具。',
        en: 'I have also built a product from zero: the AI exam-prep assistant went from demo to a 200-person beta, with 160+ questionnaires returned and satisfaction rising from 60% to 95%. The other thread is Coexistence Chair — a rattan chair shared by a person and a cat, parametrically generated and actually built; I also made a web tool that lets users tune the parameters themselves.' },
    ],
    idcard: [
      { k: { zh: '姓名', en: 'Name' },    v: { zh: '徐鑫悦', en: 'Xinyue Xu' } },
      { k: { zh: '方向', en: 'Focus' },   v: { zh: 'AI 产品 / 用户研究', en: 'AI product / user research' } },
      { k: { zh: '院校', en: 'School' },  v: { zh: '同济大学 · 2022–2027', en: 'Tongji University · 2022–2027' } },
      { k: { zh: '所在地', en: 'Based' }, v: { zh: '上海', en: 'Shanghai' } },
      { k: { zh: '状态', en: 'Status' },  v: { zh: '2027 届秋招', en: 'Class of 2027' } },
      { k: { zh: '关注', en: 'Interests' }, v: { zh: '人宠共居 / 学习效率 / AI 工作流', en: 'Pet–human living / learning / AI workflows' } },
    ],
    facts: [
      { k: { zh: '专业', en: 'Major' },   v: { zh: '建筑学 · 同济大学（2022–2027）', en: 'B.Arch, Tongji' } },
      { k: { zh: '方向', en: 'Focus' },   v: { zh: 'AI 产品 / 内容生产 / 用户研究', en: 'AI Product' } },
      { k: { zh: '工具', en: 'Tools' },   v: { zh: 'Figma · Cursor · Claude Code · Python（基础）', en: 'Figma · Cursor · Python' } },
      { k: { zh: '关注', en: 'Interest' },v: { zh: '人宠共居 · 学习效率 · AI 工作流', en: 'Pet-human living · Learning · Workflow' } },
    ],
    portrait: { ratio: '3 : 4', note: { zh: '个人照片', en: 'Portrait' } },
  },


  /* ─────────────── 4. 技能（能力 + 一句证据） ─────────────── */
  skills: [
    {
      group: { zh: '产品能力', en: 'Product' },
      note:  { zh: '从用户需求到 PRD 的完整链路', en: 'From user needs to a PRD, end to end' },
      items: [
        { name: { zh: '用户研究', en: 'User research' }, note: { zh: '考研群 160+ 份问卷；共栖椅的人猫行为观察', en: '160+ questionnaires in the exam-prep group; human and cat behaviour studies for the chair' } },
        { name: { zh: '需求分析', en: 'Requirement analysis' }, note: { zh: '迪士尼 PRD 核对：划分标准功能与新增需求', en: 'Disney PRD review: separating standard features from new requests' } },
        { name: { zh: '功能拆解', en: 'Scoping' }, note: { zh: '成长计划拆成目标 / 路线 / 日历 / 今日 / 复盘五个入口', en: 'Growth Plan split into five entry points: goal / route / calendar / today / review' } },
        { name: { zh: '竞品与材料', en: 'Benchmark' }, note: { zh: '共栖椅按功能 / 成本 / 材料三维度对比现有产品', en: 'Coexistence Chair benchmarked on function, cost and material' } },
      ],
    },
    {
      group: { zh: '产品工具', en: 'Tools' },
      note:  { zh: '原型、流程与文档', en: 'Prototypes, flows and docs' },
      items: [
        { name: 'Figma', logo: 'assets/icons/figma.svg', note: { zh: '界面原型与协作交付', en: 'UI prototypes and hand-off' } },
        { name: 'Axure', logo: 'assets/icons/axure.png', note: { zh: '带交互的高保真原型', en: 'Interactive hi-fi prototypes' } },
        { name: { zh: '墨刀', en: 'Modao' }, logo: 'assets/icons/modao.png', note: { zh: '快速原型与演示', en: 'Quick prototypes and demos' } },
        { name: 'Xmind', logo: 'assets/icons/xmind.png', note: { zh: '需求树、功能结构梳理', en: 'Requirement trees and feature maps' } },
        { name: { zh: 'PRD 文档', en: 'PRD writing' }, logo: 'assets/icons/doc.svg', note: { zh: '功能核对、需求范围与开发重点', en: 'Feature checks, scope and build priorities' } },
      ],
    },
    {
      group: { zh: 'AI 能力', en: 'AI' },
      note:  { zh: '不只是会用，而是用 AI 把流程重做一遍', en: 'Not just using AI - rebuilding the process with it' },
      items: [
        { name: 'Cursor', logo: 'assets/icons/cursor.svg', note: { zh: '用 AI Coding 做出成长计划可跑的 Demo', en: 'Shipped the working Growth Plan demo with AI coding' } },
        { name: 'Claude Code', logo: 'assets/icons/claude.svg', note: { zh: '特赞 3 场大会、6 套视频模板与流程脚本', en: 'Six video templates for three congresses at Tezign' } },
        { name: 'Codex', logo: 'assets/icons/openai.svg', note: { zh: '批量内容处理与工具搭建', en: 'Batch content processing and small tools' } },
        { name: { zh: 'Prompt 设计', en: 'Prompt design' }, logo: 'assets/icons/prompt.svg', note: { zh: '招聘三类话术 A/B；脚本规则库 prompt 化', en: 'Three outreach-script variants in A/B tests; rule library as prompts' } },
        { name: { zh: 'AI Workflow', en: 'AI workflow' }, logo: 'assets/icons/loop.svg', note: { zh: '目标 → 计划 → 执行 → 复盘 → 建议的闭环', en: 'Goal, plan, execution, review and advice as one loop' } },
      ],
    },
    {
      group: { zh: '数据能力', en: 'Data' },
      note:  { zh: '让结论有数字支撑', en: 'Numbers behind every conclusion' },
      items: [
        { name: 'Excel', logo: 'assets/icons/excel.svg', note: { zh: '招聘漏斗数据整理与复盘报表', en: 'Recruiting funnel data and review reports' } },
        { name: 'Python', logo: 'assets/icons/python.svg', note: { zh: '数据处理与脚本自动化', en: 'Data processing and script automation' } },
        { name: 'SQL', logo: 'assets/icons/mysql.svg', note: { zh: '基础查询', en: 'Basic queries' } },
      ],
    },
    {
      group: { zh: '设计工具', en: 'Design' },
      note:  { zh: '建筑学留下的底子', en: 'What architecture left behind' },
      items: [
        { name: 'Photoshop', logo: 'assets/icons/photoshop.svg', note: { zh: '共栖椅展板排版与图像处理', en: 'The chair board layout and image work' } },
        { name: { zh: '可画', en: 'Canva' }, logo: 'assets/icons/canva.svg', note: { zh: '共青团 10+ 件宣传物料', en: 'Ten-plus campaign pieces for the Youth League' } },
        { name: { zh: '剪映', en: 'CapCut' }, logo: 'assets/icons/capcut.svg', note: { zh: '特赞 15+ 条裂变视频剪辑', en: '15+ derivative videos edited at Tezign' } },
        { name: { zh: 'Rhino / Grasshopper', en: 'Rhino / Grasshopper' }, logo: 'assets/icons/rhino.svg', note: { zh: '共栖椅形态生成与 1:1 加工图', en: 'Chair form-finding and 1:1 fabrication drawings' } },
        { name: 'CAD', logo: 'assets/icons/autocad.svg', note: { zh: '加工图与放样', en: 'Fabrication drawings and setting out' } },
      ],
    },
  ],


  /* ─────────────── 5. 作品集 ─────────────── */
  /*
    字段说明：
      id       短英文名，同时是图片文件夹名
      featured 设成 true 就成为"精选"，整幅排在最前面（可以设多个，会依次排开、图文左右交替）
      cover    封面图路径；留空会自动画一张生成式图纸占位
      board    如果这个作品有"展板"，就写 board —— 详情页会按展板重排成网页版
  */

  kinds: [
    { key: 'all',       label: { zh: '全部', en: 'All' } },
    { key: 'product',   label: { zh: '产品设计', en: 'Product' } },
    { key: 'operation', label: { zh: 'AI 内容 / 运营', en: 'AI Content' } },
    { key: 'visual',    label: { zh: '视觉 / 活动', en: 'Visual' } },
    { key: 'spatial',   label: { zh: '空间 / 建筑', en: 'Spatial' } },
  ],

  projects: [
    /* ── 1. 共栖椅（带展板重排） ── */
    {
      id: 'ai-kaoyan',
      featured: true,                   // 两个作品都整幅展示，避免单张卡片孤零零挂在网格里
      title:    { zh: '成长计划 · AI 考研规划系统', en: 'Growth Plan' },
      subtitle: { zh: 'AI 增强的考研规划与学习执行系统：目标拆解 → 日历执行 → 执行反馈 → AI 分析 → 建议优化。',
                  en: 'An AI-assisted exam planning system: goal breakdown, daily execution, feedback, then advice.' },
      kindKey: 'product',
      kindLabel: { zh: '产品设计', en: 'Product' },
      year: '2026',
      role:  { zh: '产品负责人 · 设计与开发', en: 'Product lead · Design & build' },
      site:  { zh: '个人项目 · 移动端 Web App', en: 'Personal project' },
      team:  { zh: '独立完成', en: 'Solo' },
      status:{ zh: '闭环可跑通 · MVP', en: 'Working MVP' },
      demo: true,                       // 在案例页标题下显示"试试核心闭环"按钮（js/demo.js）
      cover: 'assets/images/projects/ai-kaoyan/cover-v2.webp',
      images: [],
      tags: [
        { zh: 'AI 产品', en: 'AI product' },
        { zh: '教育', en: 'Education' },
        { zh: '闭环设计', en: 'Closed-loop design' },
        'Next.js',
      ],
      results: [
        { zh: '200 人内测', en: '200-person beta' },
        { zh: '160+ 份问卷', en: '160+ questionnaires' },
        { zh: '满意度 60→95%（内测反馈）', en: 'Satisfaction 60→95% (beta feedback)' },
      ],
      desc: [
        { zh: '备考的人不缺计划模板，缺的是"计划跑不动的时候有人帮你改"。这个产品不做又一个日历，而是做动态调整：目标输入 → AI 生成路线 → 每日任务 → 执行记录 → 复盘 → 建议。', en: 'People preparing for exams do not lack plan templates; they lack someone who can revise the plan when it stops working. This product is not another calendar but a dynamic loop: goal input → AI-generated route → daily tasks → execution record → review → advice.' },
        { zh: '最核心的设计判断是"AI 不接管"：AI 只给建议和原因，用户点「采纳」才会改动日计划。技术上用 Next.js + React + Tailwind，数据在 localStorage，AI 先用本地启发式把闭环跑通。', en: 'The core design judgement is that AI does not take over: it only offers advice and reasons, and the daily plan changes only when the user clicks accept. Stack: Next.js + React + Tailwind, data in localStorage; the loop runs on local heuristics first.' },
      ],
      drawings: [],
      links: [
        { label: { zh: 'GitHub 仓库', en: 'GitHub repo' }, url: 'https://github.com/sure8v24rmvn-alt/growth-plan' },
      ],

      board: {
        no: { zh: 'CASE-02 · 产品案例', en: 'CASE-02 · PRODUCT CASE' },
        en: 'Growth Plan',
        meta: [
          { k: { zh: '角色', en: 'Role' },   v: { zh: '产品负责人 · 设计与开发', en: 'Product lead' } },
          { k: { zh: '时间', en: 'Year' },   v: '2026' },
          { k: { zh: '形态', en: 'Form' },   v: { zh: '移动端 Web App · MVP', en: 'Mobile web app' } },
          { k: { zh: '技术', en: 'Stack' },  v: 'Next.js 16 · React 19 · Tailwind 4' },
          { k: { zh: '状态', en: 'Status' }, v: { zh: '闭环可跑通 · 尚未接真实模型', en: 'Loop works · mock AI' } },
        ],
        panels: [
          { t: 'text', w: 12, kicker: { zh: '01 / 背景与问题', en: '01 / Context' }, h: { zh: '备考的人不缺计划模板，缺的是「计划跑不动的时候能改」', en: 'Exam candidates don\'t lack templates — they lack a plan that adapts when it stops working' },
            body: [
              { zh: '考研备考的典型困境不是没有计划，而是计划做出来之后没人跟着改：进度落后、状态波动、某一科迟迟不动，一张固定计划表很快就失效了。', en: 'The typical exam-prep problem is not the absence of a plan; it is that once the plan exists nobody revises it. Progress slips, energy fluctuates, one subject stalls — and a fixed timetable stops working within weeks.' },
              { zh: '成长计划是一个 AI 增强的考研规划与学习执行系统：把院校、专业和备考阶段，拆成每天能做完的任务，再根据真实执行情况做反馈和调整。', en: 'Growth Plan is an AI-assisted planning and execution system: it breaks school, major and stage into tasks you can finish each day, then uses what actually happened to adjust.' },
            ],
            items: [
              { zh: '用户负责：设定目标、安排计划、完成执行', en: 'The user sets goals, arranges the plan and does the work' },
              { zh: 'AI 负责：分析学习状态、给出建议、辅助优化', en: 'AI reads the study state, offers advice and helps optimise' },
              { zh: '不做一键生成：AI 只出建议，用户点「采纳」才改动日计划', en: 'No one-click generation: AI only advises; the daily plan changes when the user accepts' },
              { zh: '建议必须带原因：发生了什么 / 为什么 / 建议怎么做', en: 'Every suggestion carries its reasons: what happened / why / what to do' },
            ] },

          { t: 'figure', w: 4, src: 'assets/images/projects/ai-kaoyan/goals.webp', cap: { zh: '目标与规划依据', en: 'Goals and planning basis' } },
          { t: 'figure', w: 4, src: 'assets/images/projects/ai-kaoyan/roadmap.webp',
            cap: { zh: '学习路线：把一年拆成阶段', en: 'Study route: a year broken into stages' }, note: { zh: '基础 → 强化 → 真题 → 冲刺', en: 'Foundation → practice → past papers → sprint' } },
          { t: 'figure', w: 4, src: 'assets/images/projects/ai-kaoyan/planner.webp', cap: { zh: '学习日历：季度 / 月 / 周 / 日', en: 'Study calendar: quarter / month / week / day' }, note: { zh: '问卷反馈后新增', en: 'Added after feedback' } },

          { t: 'figure', w: 4, src: 'assets/images/projects/ai-kaoyan/feedback.webp',
            cap: { zh: '今日复盘：完成事实 + 最大阻碍', en: 'Daily review: what got done + the biggest obstacle' } },
          { t: 'figure', w: 4, src: 'assets/images/projects/ai-kaoyan/today.webp',
            cap: { zh: '今日执行：任务、计划来源与 AI 建议', en: 'Today: tasks, where they came from, AI advice' }, note: { zh: '勾选即写入执行记录', en: 'Checking a task writes the record' } },
          { t: 'text', w: 4, kicker: { zh: '07 / 关键机制', en: '07 / How it works' }, h: { zh: 'AI 只出建议，不接管计划', en: 'AI advises; it never takes over the plan' },
            body: [
              { zh: '建议不是模型胡猜：它吃三样东西——计划负荷（今天排了多少小时）、执行记录（实际完成了什么）、复盘时选的困难（没时间 / 学不会 / 没动力 / 临时有事 / 身体状态不好）。', en: 'Advice is not guesswork: it takes three inputs — planned load (hours scheduled today), execution records (what was actually done), and the obstacle picked in review (no time / can\'t understand / no motivation / something came up / not feeling well).' },
            ],
            items: [
              { zh: '输出固定成三段：发生了什么 / 为什么 / 建议怎么做', en: 'Always three parts: what happened / why / what to do' },
              { zh: '用户能判断建议靠不靠谱，而不是被动接受一个结论', en: 'The user can judge whether the advice holds up instead of accepting a verdict' },
              { zh: '只给建议，不改计划；点「采纳」才允许调整日任务', en: 'Advice only, no silent edits; accepting is what changes the day' },
              { zh: '学习资源按科目 / 知识点匹配，选「学不会」时降级到更基础的讲解', en: 'Resources match subject and topic; choosing “can\'t understand” drops to a more basic explanation' },
            ] },

          { t: 'text', w: 12, kicker: { zh: '08 / 产品决策', en: '08 / Product decisions' }, h: { zh: '先不接大模型：先用规则验证产品的价值假设', en: 'No model yet: validate the value hypothesis with rules first' },
            body: [
              { zh: '这个版本没有接大模型和搜索 API——不是做不到，而是刻意先把「目标 → 计划 → 执行 → 复盘 → 建议 → 采纳」这条闭环用规则跑通：如果规则版就能让用户完成一次完整的学习循环，并且接受「AI 只出建议、用户点采纳才生效」的交互，再决定接哪家模型、把模型放在哪一步。这样先验证的是产品逻辑，而不是模型效果。', en: 'This version ships without a live model or search API — not because it was out of reach, but because I wanted the loop (goal, plan, execution, review, advice, accept) validated with rules first: if the rule-based version can carry a user through one complete study cycle, and they accept that AI advises while they decide, then it is worth choosing a model and deciding where it sits. That validates the product logic before the model.' },
            ],
            items: [
              { zh: '决策：先验证闭环和交互节奏，再投入模型成本', en: 'Decision: prove the loop and its rhythm before paying for a model' },
              { zh: '门槛：不填 key 也能跑完整个流程，测试成本低', en: 'Constraint: the whole flow runs without a key, so testing is cheap' },
              { zh: '可控：建议固定输出「发生了什么 / 为什么 / 建议怎么做」', en: 'Guardrail: advice always says what happened, why, and what to do' },
              { zh: '下一步：把真实模型接成默认能力，先对比模型建议与规则版差异', en: 'Next: make a real model the default, starting by comparing its advice with the rule-based version' },
            ] },

          { t: 'text', w: 12, kicker: { zh: '09 / 验证与反馈', en: '09 / Validation' }, h: { zh: '发到考研群里，让备考的人自己跑一遍', en: 'Sent to an exam-prep group and run by the candidates themselves' },
            body: [
              { zh: 'Demo 做完没有只拿来自演示：把链接发到考研群，让群里真的在备考的人自己从「目标输入」一路走到「复盘」。他们不是看，是拿自己的院校、科目和作息填一遍——问题也就在他们身上暴露出来。', en: 'The demo was not just for show: I posted the link in an exam-prep group and let people preparing for the exam run it themselves, from goal input all the way to review. They did not watch — they filled in their own school, subjects and schedule, and that is where the problems surfaced.' },
              { zh: '160+ 份问卷收回来，最集中的一个诉求是「希望有日历规划」，50 多人提到——这条后来就落成了产品里的学习日历，季度 / 月 / 周 / 日四层。其余按流程断点、看不懂的文案、不像人给的建议分类，改完再发回群里跑第二轮。', en: '160+ questionnaires came back. The most concentrated request was a calendar view — 50+ people asked for it, and it became the study calendar in the product, with quarter / month / week / day layers. Everything else was sorted into flow breaks, unclear copy and advice that did not feel human, fixed, then tested again in a second round.' },
              { zh: '群里有人想看看真实模型的效果，我把接入 DeepSeek 的配置方法整理出来教他们配，再对比模型生成的建议和本地启发式差在哪。', en: 'Some people wanted to see a real model, so I wrote up how to plug in a DeepSeek key and walked them through it, then compared its suggestions with the local heuristics.' },
            ],
            items: [
              { zh: '测试方式：发到考研群，用户用自己的备考目标独立跑完整闭环', en: 'Method: posted to an exam-prep group; users ran the full loop on their own goals' },
              { zh: '问卷回收：160+ 份；50+ 人提出希望新增日历规划，是反馈里最集中的一个功能需求', en: 'Questionnaires: 160+ returned; 50+ asked for calendar planning, the most concentrated request' },
              { zh: '需求落地：这条反馈直接变成了产品里的学习日历（季度 / 月 / 周 / 日）', en: 'Shipped: that request became the study calendar (quarter / month / week / day)' },
              { zh: '反馈回收：按流程断点 / 文案 / 建议质量分类记录，改完再测一轮', en: 'Feedback: logged by flow break, copy and advice quality, fixed, then retested' },
              { zh: '真实模型：教测试用户接入 DeepSeek，对比模型建议与本地启发式的差别', en: 'Real model: taught testers to connect DeepSeek and compared its advice with the heuristics' },
              { zh: '结果：不配 key 也能跑完闭环；满意度从 60% 提升到 95%', en: 'Result: the loop runs without a key; satisfaction rose from 60% to 95%' },
            ] },
        ],
        original: '',
        foot: { zh: '产品案例 · 截图取自本地运行的实际界面', en: 'Product case · screens from the running app' },
      },
    },
    {
      id: 'coexistence-chair',
      featured: true,
      title:    { zh: '共栖椅', en: 'Coexistence Chair' },
      subtitle: { zh: '一个让用户按自己的身高和猫的行为生成椅子的参数化工具，加一把 1:1 做出来的实物：从参数到加工图，再到工厂打样。',
                  en: 'A parametric tool that generates a chair from your body and your cat, plus a 1:1 prototype: parameters, fabrication drawings, factory sampling.' },
      kindKey: 'product',
      kindLabel: { zh: '产品设计', en: 'Product design' },
      year: '2026',
      role:  { zh: '设计 / 参数化 / 制作', en: 'Design · Parametric · Fabrication' },
      site:  { zh: '同济大学 建筑与城市规划学院 · 四年级专题设计', en: 'CAUP, Tongji University' },
      team:  { zh: '课程作业（AI 空间智能建构）', en: 'Studio project' },
      status:{ zh: '已完成 · 1:1 实物 · 参展', en: 'Completed · 1:1 prototype · exhibited' },
      cover: 'assets/images/projects/coexistence-chair/hero1.webp',
      images: [],
      tags: [
        { zh: '人宠共居', en: 'Pet–human living' },
        { zh: '生成工具', en: 'Generative tool' },
        { zh: '参数化', en: 'Parametric' },
        { zh: '藤编', en: 'Rattan' },
        { zh: '家具', en: 'Furniture' },
      ],
      results: [
        { zh: '参数化生成工具', en: 'Parametric web tool' },
        { zh: '1:1 实物', en: '1:1 prototype' },
        { zh: '参展 2 个月', en: 'Exhibited · 2 months' },
      ],
      desc: [
        { zh: '从室内宠物猫的行为与心理需求出发，结合用户调研与人体尺度研究，探索人猫共享的家具形式。', en: 'Starting from the behaviour and psychological needs of indoor cats, and combining user research with human-scale studies, the project explores a furniture form shared by people and cats.' },
        { zh: '设计以人和猫为双重使用对象，通过参数化生成可调节的空间关系，并以弯曲藤条框架为原型，让椅子从单一坐具变成共栖的微空间。', en: 'The design treats people and cats as two users at once, generating adjustable spatial relationships parametrically, and uses a bent-rattan frame as the prototype so the chair becomes a small shared space rather than a single seat.' },
      ],
      drawings: [],

      /* 部署在 NoCode 上的参数化设计工具 */
      links: [
        { label: { zh: '打开设计工具', en: 'Open design tool' }, url: 'https://parametric-cat-chair.nocode.host' },
      ],
      board: {
        no: { zh: 'A-01 · 展板重排', en: 'A-01 · RE-LAID OUT BOARD' },
        en: 'Coexistence Chair',
        meta: [
          { k: { zh: '课程', en: 'Studio' }, v: { zh: 'AI 空间智能建构 · 四年级专题设计', en: 'AI-driven spatial tectonics' } },
          { k: { zh: '院校', en: 'School' }, v: { zh: '同济大学 建筑与城市规划学院', en: 'CAUP, Tongji University' } },
          { k: { zh: '年份', en: 'Year' },   v: '2026' },
          { k: { zh: '学号', en: 'ID' },     v: '2251035' },
          { k: { zh: '角色', en: 'Role' },   v: { zh: '设计 / 参数化 / 制作', en: 'Design · Parametric · Making' } },
          { k: { zh: '状态', en: 'Status' }, v: { zh: '已完成 · 1:1 实物', en: 'Completed · 1:1 prototype' } },
          { k: { zh: '展览', en: 'Exhibition' }, v: { zh: '同济大学四平路校区 B 楼展厅 · 为期两个月', en: 'Tongji Siping campus, Bldg B · two months' } },
        ],
        panels: [
          /* 01 设计说明（含材料与工艺） */
          { t: 'text', w: 6, anchor: true, kicker: { zh: '01 / 设计说明', en: '01 / Design statement' }, h: { zh: '一把椅子，两个使用者', en: 'One chair, two users' },
            body: [
              { zh: '本设计以室内宠物猫的行为与心理需求为出发点，结合用户调研与人体尺度研究，探索人猫共享的家具形式。', en: 'This design starts from the behaviour and psychological needs of indoor cats, and combines user research with human-scale studies to explore a furniture form shared by people and cats.' },
              { zh: '设计以人和猫为双重使用对象，通过参数化方法生成可调节空间关系，并以弯曲藤条构成的框架结构为原型，形成可穿行、可停留的互动界面，使椅子从单一坐具转化为共栖的微型空间。', en: 'The chair treats people and cats as two simultaneous users: parametric methods generate adjustable spatial relationships, and a frame of bent rattan becomes the prototype for an interface that can be passed through or paused on — turning a single seat into a small shared space.' },
            ],
            items: [
              { zh: '弯曲藤条：热弯成型，构成主体受力与围合', en: 'Bent rattan: heat-formed, carrying the main loads and enclosing the body' },
              { zh: '藤编网面：座面与高位平台，人猫共用', en: 'Woven rattan surfaces: seat and raised platform, shared by person and cat' },
              { zh: '洞口与猫道：按猫的穿行尺度开洞，形成"停留—穿行"两类节点', en: 'Openings and cat routes: holes sized to a cat\'s body, making two kinds of node — pause and pass-through' },
              { zh: '参数化工具：Rhino + Grasshopper 生成形态并输出加工图', en: 'Parametric tools: Rhino + Grasshopper generate the form and output fabrication drawings' },
              { zh: '落地：联系工厂打样、试材料，完成 1:1 实物并参加展览', en: 'Making: factory sampling and material trials, then a 1:1 prototype, exhibited' },
            ] },

          /* 02 主图 */
          { t: 'figure', w: 6, src: 'assets/images/projects/coexistence-chair/hero1.webp',
            cap: { zh: '藤条框架与共用座面', en: 'Rattan frame and shared seat' }, note: { zh: '1:1 实物', en: '1:1 prototype' } },

          /* 03–04 行为研究 */
          { t: 'figure', w: 6, src: 'assets/images/projects/coexistence-chair/behavior.webp',
            cap: { zh: '人猫行为与空间特征分析', en: 'Human and cat behaviour, spatial traits' } },
          { t: 'list', w: 6, groups: [
              { title: '人类空间特点 / Human', items: [
                ['稳定的支撑', 'Stable support'],
                ['水平坐姿', 'Horizontal sitting posture'],
                ['中心低、移动空间小', 'Control sitting position'],
                ['动作幅度较小', 'Low movement range'],
              ] },
              { title: '猫活动空间特点 / Cat', items: [
                ['垂直区域', 'Vertical territory'],
                ['高处观察点', 'High observation points'],
                ['隐藏空间', 'Hidden spaces'],
                ['攀爬路径', 'Climbing paths'],
              ] },
            ] },

          /* 05 参数化生成流程 */
          { t: 'figure', w: 12, src: 'assets/images/projects/coexistence-chair/process.webp',
            cap: { zh: '参数化生成四步：确定使用面 → 体块生成 → 去除多余面 → 生成轴线', en: 'Parametric form-finding in four steps: define use surfaces → generate volumes → remove redundant faces → generate axes' }, note: { zh: 'Rhino + Grasshopper 参数化', en: 'Rhino + Grasshopper' } },

          /* 06–07 三视图 / 程序 */
          { t: 'figure', w: 6, src: 'assets/images/projects/coexistence-chair/threeview.webp', cap: { zh: '三视图', en: 'Three orthographic views' } },
          { t: 'figure', w: 6, src: 'assets/images/projects/coexistence-chair/program.webp',
            cap: { zh: '人猫互动椅参数化设计工具：四阶段参数面板与实时三维预览', en: 'Parametric chair tool: four-stage parameter panels and a live 3D preview' }, note: { zh: 'Cursor / Claude Code 独立开发 · 网页端', en: 'Built solo with Cursor / Claude Code' } },

          /* 08 生成系统 */
          { t: 'text', w: 12, kicker: { zh: '08 / 生成工具', en: '08 / Generative tool' }, h: { zh: '把一次性的方案，做成用户自己能调的网页工具', en: 'Turning a one-off scheme into a tool users can adjust themselves' },
            body: [
              { zh: '除了实物，我还独立开发了一个网页端的参数化设计工具（用 Cursor / Claude Code 完成）：用户输入自己的尺度参数（座深、座宽、座高、靠背高度与倾角）和宠物的行为需求，工具按「功能 → 形态 → 结构 → 构造」四个阶段生成一把适合他的椅子——不是看我的那一把，是做他自己的。', en: 'Beyond the physical chair, I built a web-based parametric design tool myself with Cursor / Claude Code: users enter their own dimensions (seat depth, width and height, back height and tilt) plus their pet\'s behavioural needs, and the tool generates a chair for them through four stages — function, form, structure, construction. Not my chair: theirs.' },
              { zh: '四个阶段各自可调：功能阶段定人体工学尺寸与宠物需求，形态阶段生成体块与使用面，结构阶段调曲线节点与圆角，构造阶段给出连接件与拆装方式。每次调参都实时回到三维模型，同时给出行为适配与建造成本的反馈，让用户在「好看」和「做得出来」之间自己找平衡。', en: 'Each stage is adjustable: function sets ergonomic dimensions and pet needs; form generates volumes and use surfaces; structure tunes curve nodes and fillets; construction proposes connections and how the chair comes apart. Every change updates the 3D model and feeds back behaviour fit and construction cost, so users balance “looks right” against “can be built”.' },
            ],
            items: [
              { zh: '使用对象：想给人猫做一件共用家具的人，不需要会建模', en: 'Who it is for: anyone who wants a shared piece for themselves and their cat — no modelling skills needed' },
              { zh: '四阶段：功能（人体工学 / 宠物行为）→ 形态（体块与使用面）→ 结构（曲线与节点）→ 构造（连接件）', en: 'Four stages: function (ergonomics / pet behaviour) → form (volumes and surfaces) → structure (curves and nodes) → construction (connections)' },
              { zh: '实时反馈：几何模型、行为适配、建造成本三项同时更新', en: 'Live feedback: geometry, behaviour fit and construction cost update together' },
              { zh: '实现：用 Cursor / Claude Code 独立开发的网页工具，参数面板 + 三维预览', en: 'Built solo with Cursor / Claude Code: parameter panels plus a 3D preview' },
            ] },

          /* 09 加工图纸 */
          { t: 'figure', w: 12, src: 'assets/images/projects/coexistence-chair/drawings.webp',
            cap: { zh: '加工图纸：按曲线拆解成可放样的藤条段', en: 'Fabrication drawings: each curve broken into rattan segments that can be set out' }, note: { zh: '1:1 放样', en: '1:1 setting out' } },

          /* 09–10 参考库 / 模型 */
          { t: 'figure', w: 7, src: 'assets/images/projects/coexistence-chair/concepts.webp',
            cap: { zh: '概念图像库 / 构建原型库', en: 'Reference image library / prototype library' } },
          { t: 'figure', w: 5, src: 'assets/images/projects/coexistence-chair/model.webp',
            cap: { zh: '1:5 实物模型 · 三种变体', en: '1:5 physical model · three variants' } },

          /* 11–13 使用 / 建造 */
          { t: 'figure', w: 4, src: 'assets/images/projects/coexistence-chair/hero2.webp', cap: { zh: '猫经洞口穿行', en: 'A cat passing through the opening' } },
          { t: 'figure', w: 4, src: 'assets/images/projects/coexistence-chair/hero3.webp', cap: { zh: '人与猫同时停留', en: 'Person and cat resting together' } },
          { t: 'figure', w: 4, src: 'assets/images/projects/coexistence-chair/build.webp', cap: { zh: '建造过程：弯曲藤条与模板', en: 'Building: bent rattan and formwork' } },
        ],
        original: 'assets/images/projects/coexistence-chair/board.webp',
        foot: { zh: 'A1 展板 · 按网页阅读重排；原板见右上', en: 'A1 board · re-laid out for the web' },
      },
    },

    /* ── 2. 成长计划（AI 考研规划） ── */
    {
      id: 'social-practice',
      featured: true,
      title:    { zh: '马上“惠”家 · 学子归巢大会', en: 'Home for the New Year' },
      subtitle: { zh: '2026 年寒假返家乡社会实践：给一场“学子归巢”大学生发展大会做视觉宣传，从主海报、邀请函、消费券到现场执行。',
                  en: 'A winter homecoming placement: visual identity and on-site delivery for a gathering of returning students in Huinong, Ningxia.' },
      kindKey: 'visual',
      kindLabel: { zh: '视觉 / 活动', en: 'Visual · Event' },
      year: '2026',
      role:  { zh: '视觉宣传 / 现场执行', en: 'Visual design · On-site' },
      site:  { zh: '共青团惠农区委员会 · 第五期“黄河计划”', en: 'Huinong Youth League · Yellow River Programme' },
      status: { zh: '已完成 · 150 小时实践', en: 'Completed · 150 hours' },
      cover: 'assets/images/fieldwork/cover.webp',
      results: [
        { zh: '150 小时实践', en: '150 hours' },
        { zh: '5 类宣传物料', en: '5 asset types' },
        { zh: '1 场大会 + 市集', en: '1 summit + market' },
      ],
      tags: [
        { zh: '海报设计', en: 'Poster design' },
        { zh: '活动视觉', en: 'Event identity' },
        { zh: '返乡实践', en: 'Fieldwork' },
      ],
      desc: [
        { zh: '寒假回到宁夏惠农，在团区委办公室实践 150 小时。围绕“学子归巢”大学生发展大会做了一套宣传物料：主海报、邀请函、消费券、公众号推文配图，以及“我的大学我来讲”环节的同济宣讲海报和传单。',
          en: 'Back in Huinong, Ningxia for the winter, I spent 150 hours at the district Youth League office. For the “returning students” gathering I produced the main poster, invitations, vouchers and article artwork, plus the Tongji talk poster and flyer for the “My University, My Story” segment.' },
        { zh: '也和团队一起把活动跑完：物资准备、嘉宾接待、秩序维护、流程协助；另外做过演讲比赛记分员、返乡大礼包组装、爱心托管班的摄影与视频。',
          en: 'I also helped run the event itself: materials, guest reception, crowd and flow support — plus scorekeeping for a speech contest, assembling homecoming gift packs, and photography and video for a community childcare class.' },
      ],
      images: [
        { src: 'assets/images/fieldwork/backdrop.webp', caption: { zh: '大会主视觉 / 舞台背景板', en: 'Main visual / stage backdrop' } },
        { src: 'assets/images/fieldwork/poster-event.webp', caption: { zh: '“马上‘惠’家”活动海报', en: 'Event poster' } },
        { src: 'assets/images/fieldwork/poster-tongji.webp', caption: { zh: '“我的大学我来讲”同济宣讲海报', en: 'Tongji talk poster' } },
      ],
      board: {
        no: { zh: 'EVENT-03 · 活动视觉', en: 'EVENT-03 · EVENT IDENTITY' },
        en: 'Home for the New Year',
        meta: [
          { k: { zh: '角色', en: 'Role' },   v: { zh: '视觉宣传 · 现场执行', en: 'Visual design · on-site' } },
          { k: { zh: '时间', en: 'When' },   v: { zh: '2026.02.04', en: '4 Feb 2026' } },
          { k: { zh: '地点', en: 'Where' },  v: { zh: '宁夏石嘴山 · 惠农区文化馆', en: 'Huinong, Shizuishan, Ningxia' } },
          { k: { zh: '形态', en: 'Form' },   v: { zh: '大会主视觉 + 市集海报 + 现场', en: 'Identity, posters, on-site' } },
          { k: { zh: '状态', en: 'Status' }, v: { zh: '已完成 · 150 小时实践', en: 'Completed · 150 hours' } },
        ],
        panels: [
          { t: 'text', w: 12, kicker: { zh: '01 / 背景', en: '01 / Context' },
            h: { zh: '寒假回家，给一场“学子归巢”的大会做视觉', en: 'A homecoming gathering for students — and the visual work behind it' },
            body: [
              { zh: '2026 年寒假，我参加第五期“黄河计划”返家乡社会实践，在共青团惠农区委员会办公室实践 150 小时。2 月 4 日，惠农区文化馆办了一场面向返乡大学生的大会，白天是发展大会，下午接“马上‘惠’家”新春市集。', en: 'In the winter of 2026 I joined the fifth Yellow River Programme homecoming placement, spending 150 hours at the Huinong District Youth League office. On 4 February the district cultural centre hosted a gathering for returning students: a development summit by day, followed by the “Home for the New Year” spring market.' },
              { zh: '我负责的是这场活动的视觉宣传：主海报、邀请函、消费券、公众号推文配图，以及“我的大学我来讲”环节的海报和传单。', en: 'I was responsible for the visual communication: main poster, invitations, vouchers, article artwork, and the posters and flyers for the “My University, My Story” segment.' },
            ] },

          { t: 'figure', w: 12, src: 'assets/images/fieldwork/backdrop.webp',
            cap: { zh: '大会主视觉 / 舞台背景板', en: 'Main visual / stage backdrop' },
            note: { zh: '2026.02.04 · 惠农区文化馆', en: '4 Feb 2026 · Huinong' } },

          { t: 'figure', w: 6, src: 'assets/images/fieldwork/poster-event.webp',
            cap: { zh: '“马上‘惠’家”活动海报', en: 'Event poster' },
            note: { zh: '13:30–16:30 · 市集与五个互动环节', en: '13:30–16:30 · market and five activities' } },
          { t: 'figure', w: 6, src: 'assets/images/fieldwork/poster-tongji.webp',
            cap: { zh: '“我的大学我来讲”同济宣讲海报', en: 'Tongji talk poster' },
            note: { zh: '面向返乡高中生 / 大学生', en: 'For returning students' } },

          { t: 'text', w: 12, kicker: { zh: '05 / 做了什么', en: '05 / What I did' },
            h: { zh: '从一张海报，跟到活动当天', en: 'From a poster to the day itself' },
            body: [
              { zh: '设计之外，我也在筹备和现场里：方案讨论时梳理流程和分工，物资阶段核对清单、分类整理，活动当天做嘉宾接待、秩序维护和流程协助。', en: 'Beyond design I was in the preparation and on the floor: sorting the run of show and roles in planning, checking and sorting materials, then handling guest reception, crowd control and flow on the day.' },
              { zh: '另外还做过“笃行担当 青春发声”演讲比赛的记分员、返乡大礼包的组装，以及社区爱心托管班的摄影和视频后期。', en: 'I also kept score at a speech contest, assembled homecoming gift packs, and shot and edited video for a community childcare class.' },
            ],
            items: [
              { zh: '主海报 / 邀请函 / 消费券 / 公众号推文配图', en: 'Main poster, invitations, vouchers, article artwork' },
              { zh: '“我的大学我来讲”同济宣讲海报与传单', en: 'Poster and flyer for the Tongji talk' },
              { zh: '现场：嘉宾接待、秩序维护、流程协助', en: 'On site: reception, crowd control, run of show' },
              { zh: '演讲比赛记分员 · 返乡大礼包组装 · 托管班摄影与视频', en: 'Scorekeeper, gift packs, childcare photography and video' },
            ] },

          { t: 'text', w: 12, kicker: { zh: '06 / 结果', en: '06 / Outcome' },
            h: { zh: '150 小时，一套能落地的物料', en: '150 hours, and a set of assets that shipped' },
            body: [
              { zh: '物料通过多平台推送，面向高校学生和返乡青年；活动当天按计划落地。这次实践让我第一次把设计放进一条真实的执行链路里：图要做对，也要在预算、时间和现场条件下做得出来。', en: 'The assets went out across several channels to university students and returning young people, and the event ran as planned. It was the first time I had to put design inside a real delivery chain: the work has to look right and still survive budget, time and site conditions.' },
            ],
            items: [
              { zh: '第五期“黄河计划”返家乡社会实践，累计 150 小时', en: 'Fifth Yellow River Programme placement, 150 hours' },
              { zh: '物料覆盖大会、市集与宣讲三个场景', en: 'Assets covered the summit, the market and the talk' },
              { zh: '从设计到现场，完整跟完一场区级青年活动', en: 'Saw a district-level youth event through from design to delivery' },
            ] },
        ],
        original: '',
        foot: { zh: '活动视觉 · 海报与背景板用于 2026.02.04 惠农区“学子归巢”大会', en: 'Event identity · used at the Huinong gathering, 4 Feb 2026' },
      },
    },
  ],


  /* ─────────────── 6. 经历 ─────────────── */
  expTypes: [
    { key: 'all',      label: { zh: '全部', en: 'All' } },
    { key: 'edu',      label: { zh: '教育', en: 'Education' } },
    { key: 'work',     label: { zh: '实践 / 实习', en: 'Practice' } },
    { key: 'award',    label: { zh: '获奖', en: 'Awards' } },
    { key: 'activity', label: { zh: '活动', en: 'Activities' } },
  ],

  experience: [
    {
      period: '2022.09 – 2027.06',
      type: 'edu',
      title: { zh: '建筑学 · 本科（五年制）', en: 'B.Arch' },
      org:   { zh: '同济大学 建筑与城市规划学院', en: 'Tongji University, CAUP' },
      detail:{ zh: '主修课程：AI 空间智能建造、Python 程序设计、计算机图形学、虚拟现实系统及其应用。', en: 'Coursework: AI-driven spatial construction, Python programming, computer graphics, virtual reality systems and applications.' },
      highlights: [],
    },
    {
      period: '2026.06 – 至今',
      type: 'work',
      title: { zh: 'AI 产品运营实习生', en: 'AI Product Operations Intern' },
      org:   { zh: '特赞（上海）信息科技有限公司', en: 'Tezign, Shanghai' },
      detail:{ zh: '在 AI 内容生产产品线上做规则设计与需求核对：把医学大会视频的脚本处理拆成可配置的规则库，做产品测试与问题定位，参与迪士尼数字资产项目的前期 PRD 核对。', en: 'On the AI content-production product line: rule design and requirement checks. Turned script handling for medical congress videos into a configurable rule library, tested the product, and checked PRD requirements on the Disney digital-asset project.' },
      highlights: [
        { zh: '规则产品化：20 条基础规则 + 7 类专项规则，做成可配置的规则库；半月一轮，已跑 3 轮、新增 4 条', en: 'Rules as a product: 20 base rules plus 7 specialised sets turned into a configurable library, shipped every two weeks — 3 rounds, 4 rules added.' },
        { zh: '产品测试：按真实业务场景测 AI 脚本流程，整理 5+ 项关键问题，协助产品经理定位并修复', en: 'Product testing: tested the AI script pipeline against real cases, logged 5+ key issues and helped the PM locate and fix them.' },
        { zh: '需求核对：迪士尼项目初期比对现有能力，划分标准功能与新增需求，维护交付进度与会议记录', en: 'Requirements: on Disney, compared existing capabilities, separated standard features from new requests, and kept the delivery schedule and notes.' },
        { zh: '内容交付：礼来项目 5 位专家大会视频，产出 15+ 条裂变视频', en: 'Delivery: handled congress videos for 5 Lilly experts and produced 15+ derivative videos.' },
        { zh: 'AI 工具：用 Claude Code / Codex / Cursor 搭 3 场大会、6 套视频模板，把流程沉淀成可复用模板', en: 'AI tooling: built 6 video templates for 3 congresses with Claude Code / Codex / Cursor, turning the pipeline into reusable templates.' },
      ],
      now: true,
    },
    {
      period: '2026.03 – 2026.05',
      type: 'work',
      title: { zh: 'HR 招聘实习生', en: 'HR Recruiting Intern' },
      org:   { zh: '上海安邦投资咨询有限公司', en: 'Anbang Investment Consulting' },
      detail:{ zh: '把招聘当成一条漏斗来做：JD、话术、面试反馈、复盘逐段用 AI 重做，最后沉淀成一套可复用的招聘 SOP。', en: 'Treated recruiting as a funnel: rebuilt JD, outreach, interview feedback and reviews with AI, then turned the result into a reusable SOP.' },
      highlights: [
        { zh: '漏斗诊断：投递 1000+ → 沟通 300+ → 邀面 70+ → 入职 12 人，按环节定位流失', en: 'Funnel diagnosis: 1,000+ applications → 300+ conversations → 70+ interviews → 12 hires; located drop-off stage by stage.' },
        { zh: 'JD 重写：分析历史成功简历的关键词，把 JD 从职责罗列改成「痛点 + 解决方案」', en: 'JD rewrite: analysed past successful résumés, then restructured the JD from duties into “pain point + solution”.' },
        { zh: '话术 A/B：AI 生成理性 / 情感 / 游戏化三类话术；情感类回复率高 22%，简历获取率 10% → 30%', en: 'Outreach A/B: rational / emotional / gamified variants; the emotional one replied 22% better, lifting résumé yield from 10% to 30%.' },
        { zh: '复盘自动化：每日漏斗数据自动识别异常并生成复盘；面试评价归类为优点 / 风险点，生成能力雷达', en: 'Review automation: daily funnel data flagged anomalies and produced the review; interview notes became strengths / risks plus a radar chart.' },
        { zh: '效率：单日简历处理效率提升约 25%', en: 'Efficiency: daily résumé throughput up about 25%.' },
      ],
    },
    {
      period: '2026.01 – 2026.03',
      type: 'work',
      title: { zh: '内容运营实习生', en: 'Content Operations Intern' },
      org:   { zh: '共青团惠农区委员会', en: 'Youth League, Huinong District' },
      detail:{ zh: '“学子归巢”大会的宣传与执行：按活动节点倒排交付，从物料设计一路做到现场。', en: 'Promotion and delivery for the “Students Return Home” conference: worked back from the event date, from collateral design to the day itself.' },
      highlights: [
        { zh: '物料：主海报、邀请函、消费券等 10+ 件，覆盖大会与市集两个场景', en: 'Collateral: 10+ pieces — key visual, invitations, vouchers — across the summit and the market.' },
        { zh: '公众号：5 篇推文，累计阅读 1000+、粉丝增长 500+', en: 'WeChat: 5 posts, 1,000+ reads and 500+ new followers.' },
        { zh: '现场：嘉宾接待、秩序维护、流程协助；演讲比赛记分员', en: 'On site: guest reception, crowd control, run of show; scorekeeper at the speech contest.' },
        { zh: '交付：300 份礼盒按时完成', en: 'Delivery: 300 gift boxes finished on time.' },
      ],
    },
  ],


  /* ─────────────── 7. 联系 & 页脚 ─────────────── */
  contact: {
    lead: {
      zh: '有产品岗校招机会、内容项目合作，或者只是想聊聊人宠共居与 AI 工作流，都欢迎<em>直接发邮件</em>给我。',
      en: 'For full-time product roles, collaborations, or a chat about AI workflows — <em>email me</em>.'
    },
    note: { zh: '一般当天回。', en: 'Usually same day.' },
  },

  footer: {
    note: { zh: '本站使用原生 HTML / CSS / JavaScript 手写，无框架无依赖。',
            en: 'Hand-written HTML / CSS / JS. No framework, no dependencies.' },
  },

};
