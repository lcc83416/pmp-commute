// PMP 實戰情境題庫與關鍵字數據庫 (依據 PMI-ECO 最新大綱設計)
// 包含：職場神譬喻、考官思維、必抓英文關鍵字

window.PMP_DATA = {
  // 1. 二選一決鬥題 (通勤微測驗)
  duels: [
    {
      id: "duel-1",
      domain: "people",
      domainLabel: "人 (People)",
      title: "敏捷晨會火藥味",
      enScenario: "During a daily standup, the senior developer and QA lead start arguing aggressively over defect ownership. What should the project manager do FIRST?",
      enScenarioHighlighted: "During a <span class='en-kw-highlight'>daily standup</span>, the developer and QA lead start arguing over <span class='en-kw-highlight'>defect ownership</span>. What should the project manager do <span class='en-kw-highlight'>FIRST</span>?",
      cnScenario: "每日站立晨會上，資深工程師跟測試主管因為 Bug 責任歸屬當場激烈爭吵，衝刺進度嚴重受阻。身為專案經理，你第一步該做什麼？",
      keywords: ["Daily Standup (站立晨會)", "Defect Ownership (責任歸屬)", "FIRST (第一步)"],
      optionA: {
        enText: "End the standup and meet with both individually to understand root cause",
        text: "終止晨會，私下分別找兩人個別了解爭端核心原因",
        isCorrect: true,
      },
      optionB: {
        enText: "Immediately report to functional managers for disciplinary action",
        text: "立刻向雙方部門主管報告，要求主管介入懲處與協調",
        isCorrect: false,
      },
      explanation: {
        verdict: "PMP 考官永遠痛恨「隨便告狀與越級呈報」！",
        mindset: "PMP 衝突解決黃金法則：面對衝突，PM 必須秉持【僕人式領導 (Servant Leadership)】，先冷靜控場並『合作面對問題 (Collaborate / Problem Solve)』。私下了解真正阻礙才是第一步。",
        metaphor: "就像家裡兩個小孩吵架，你不會馬上打電話叫警察或鄰居來評評理，而是先分開兩個人，坐下來問『到底在氣什麼？』",
        keyEnAction: "Private Discussion & Root Cause Analysis (私下溝通與找根本原因)"
      }
    },
    {
      id: "duel-2",
      domain: "process",
      domainLabel: "流程 (Process)",
      title: "客戶私下熱情『凹功能』",
      enScenario: "An important client directly messages you to add a small feature that takes 10 minutes. How should the PM respond?",
      enScenarioHighlighted: "An important client asks to add an <span class='en-kw-highlight'>unplanned feature</span>. To avoid <span class='en-kw-highlight'>Scope Creep</span>, how should the PM respond?",
      cnScenario: "重要大客戶私下發訊息給你：『能不能順便幫我們加這個小按鈕？只要10分鐘而已啦！』身為專案經理，你該如何回應？",
      keywords: ["Scope Creep (範疇蔓延)", "Change Request (變更申請)", "Assess Impact (評估影響)"],
      optionA: {
        enText: "Verbally agree to maintain good customer relationship",
        text: "反正只要10分鐘，為了維持客戶良好關係先私下答應",
        isCorrect: false,
      },
      optionB: {
        enText: "Explain the Change Control procedure and assess impact first",
        text: "向客戶說明需走正式變更程序，並先評估對專案時程與成本的影響",
        isCorrect: true,
      },
      explanation: {
        verdict: "這是最經典的考題陷阱：範疇蔓延 (Scope Creep)！",
        mindset: "專案經理絕不能私下口頭答應任何未經審查的需求變更。所有新需求都必須進入【變更控制流程 (Change Control Process)】，先『評估影響 (Assess Impact)』再送審。",
        metaphor: "就像你幫同事買午餐乾麵，他半路傳訊說順便加滷蛋貢丸加奶茶。如果你每次都私下說好，最後專案一定延遲爆預算還倒貼錢！",
        keyEnAction: "Follow Change Control & Assess Impact (遵循變更控制並評估影響)"
      }
    },
    {
      id: "duel-3",
      domain: "process",
      domainLabel: "流程 (Process)",
      title: "突發伺服器崩潰事件",
      enScenario: "A production database unexpectedly crashed this morning, halting testing. What document should the PM update FIRST?",
      enScenarioHighlighted: "A database <span class='en-kw-highlight'>unexpectedly crashed</span> (already happened). What document should the PM update <span class='en-kw-highlight'>FIRST</span>?",
      cnScenario: "今早生產環境資料庫突然毫無預警崩潰，所有測試工作被迫全面中斷。專案經理第一時間應該先更新哪份文件？",
      keywords: ["Already Happened (已經發生)", "Issue Log (問題日誌)", "Risk Register (風險登記冊)"],
      optionA: {
        enText: "Update the Issue Log and assign an owner",
        text: "更新 Issue Log（議題/問題日誌）並指派處理負責人",
        isCorrect: true,
      },
      optionB: {
        enText: "Update the Risk Register and plan mitigation",
        text: "更新 Risk Register（風險登記冊）並擬定減緩預防對策",
        isCorrect: false,
      },
      explanation: {
        verdict: "已發生的叫 Issue，未發生的才叫 Risk！",
        mindset: "PMP 絕對送分題：事情『已經發生』對專案造成衝擊，一律記錄在【Issue Log】！只有『未來可能發生的不確定性』才記在【Risk Register】。",
        metaphor: "出門看天空烏雲密布，帶雨傘叫預防 Risk；你現在人已經全身淋成落湯雞了，趕快拿毛巾擦乾叫處理 Issue！別在淋雨當下還在寫預報日記。",
        keyEnAction: "Update Issue Log & Assign Owner (記錄問題並指派負責人)"
      }
    },
    {
      id: "duel-4",
      domain: "people",
      domainLabel: "人 (People & Agile)",
      title: "資深成員遇到技術瓶頸",
      enScenario: "In an Agile sprint, a developer is blocked by a third-party API. As a Servant Leader, what is the PM's role?",
      enScenarioHighlighted: "A developer is <span class='en-kw-highlight'>blocked by third-party API</span>. As a <span class='en-kw-highlight'>Servant Leader</span>, what should the PM do?",
      cnScenario: "在敏捷衝刺中，核心開發者被第三方 API 權限卡住無法前進，導致團隊速率下降。身為僕人式領導的 PM，你的角色應該是？",
      keywords: ["Impediment / Blocker (障礙物)", "Servant Leadership (僕人式領導)", "Velocity (團隊速率)"],
      optionA: {
        enText: "Collaborate across departments to Remove Impediments",
        text: "主動介入幫忙跨部門溝通，全力替團隊掃除阻礙 (Remove Impediment)",
        isCorrect: true,
      },
      optionB: {
        enText: "Tell developer to work overtime or write the code yourself",
        text: "要求工程師加班趕工，或者自己親自接手寫 Code 把功能做完",
        isCorrect: false,
      },
      explanation: {
        verdict: "僕人式領導的最高天職：掃雷！",
        mindset: "在敏捷框架中，PM / Scrum Master 不是監工，也不是技術救援隊。你的核心任務是【掃除外部阻礙 (Remove Impediments)】，保護團隊免受外界干擾。",
        metaphor: "你不是跑在賽道上的賽車手，你是進站維修保養團隊，賽車輪胎卡了石頭，你趕快把石頭搬開讓車手全速衝刺！",
        keyEnAction: "Remove Impediments / Shield the Team (掃除阻礙保護團隊)"
      }
    },
    {
      id: "duel-5",
      domain: "business",
      domainLabel: "商業環境 (Business)",
      title: "法規突發重大修改",
      enScenario: "A new privacy law will take effect next month affecting authentication. What should the PM do FIRST?",
      enScenarioHighlighted: "A <span class='en-kw-highlight'>new regulation</span> takes effect next month. What should the PM do <span class='en-kw-highlight'>FIRST</span>?",
      cnScenario: "政府上週通過新的個人資料保護法規，下個月生效，可能導致目前專案的會員驗證模組違法。PM 第一步應該做什麼？",
      keywords: ["Regulatory Compliance (法規遵循)", "FIRST (第一步)", "Assess Impact (評估影響)"],
      optionA: {
        enText: "Assess the impact on project scope, cost, and schedule",
        text: "先分析新法規對現有專案範疇、交付成果與時程的具體影響 (Assess Impact)",
        isCorrect: true,
      },
      optionB: {
        enText: "Immediately halt all work and await executive emergency meeting",
        text: "立即暫停所有專案工作，等待管理階層召開緊急大會指示",
        isCorrect: false,
      },
      explanation: {
        verdict: "任何風吹草動，PM 的起手式永遠是『先評估影響』！",
        mindset: "遇到法規變更、外部風險或利害關係人提出質疑，千萬不要盲目慌亂停工或立刻盲幹。考官黃金直覺：【先評估影響 (Analyze / Assess Impact)】永远排在任何行動的第一步！",
        metaphor: "聽到家門外有怪聲，先從貓眼看清楚是外送員還是小偷（評估影響），而不是馬上按全棟火警警報器叫大家逃生。",
        keyEnAction: "Assess Impact on Project Scope & Deliverables (評估對專案的影響)"
      }
    }
  ],

  // 2. 雷區判斷 (Tinder 滑卡)
  radars: [
    {
      id: "radar-1",
      domain: "敏捷心法",
      text: "客戶突然帶著新點子找團隊，PM 直接要求團隊在當前 Sprint 馬上插單趕出來。",
      isSafe: false,
      tag: "🚨 踩大雷 (Anti-Pattern)",
      verdict: "嚴重大雷！Sprint 進行中應保持目標穩定 (Sprint Goal)。新點子應該先放入 Product Backlog 由 Product Owner 排序，不能隨便破壞當前衝刺節奏。"
    },
    {
      id: "radar-2",
      domain: "溝通心法",
      text: "利害關係人抱怨不知道專案進度，PM 第一時間檢視並更新【溝通管理計畫 (Communications Management Plan)】。",
      isSafe: true,
      tag: "💡 考官最愛 (PMP Golden Rule)",
      verdict: "完美回答！有人抱怨沒收到消息或資訊不對稱，就是溝通計畫出了盲點，先查計畫是標準解題 SOP。"
    },
    {
      id: "radar-3",
      domain: "衝突處理",
      text: "團隊兩位資深工程師理念不合爭吵，PM 為了不傷感情，選擇裝作沒看見讓時間慢慢化解。",
      isSafe: false,
      tag: "🚨 踩大雷 (Avoid / Withdraw)",
      verdict: "大忌！逃避或拖延 (Withdraw / Avoid) 在 PMP 考題裡 95% 是錯誤選項。PM 必須正面解決問題 (Collaborate / Confront)。"
    },
    {
      id: "radar-4",
      domain: "敏捷團隊",
      text: "團隊在衝刺檢討會 (Sprint Retrospective) 上開誠布公檢討上一輪的失誤，並提出改善行動項。",
      isSafe: true,
      tag: "💡 考官最愛 (Continuous Improvement)",
      verdict: "考官極度推崇！回顧會議 (Retrospective) 是敏捷的核心灵魂，目的就是持續改進 (Kaizen)，對事不對人。"
    },
    {
      id: "radar-5",
      domain: "變更管理",
      text: "贊助人 (Sponsor) 口頭指示壓縮兩週工期，PM 沒評估就直接叫團隊全體無條件加班。",
      isSafe: false,
      tag: "🚨 踩大雷 (Blind Execution)",
      verdict: "標準扣分選項！哪怕是出資大老闆，PM 也要先用數據分析壓時程的代價（需要加預算？還是刪減功能？），提供方案供決策。"
    },
    {
      id: "radar-6",
      domain: "僕人式領導",
      text: "PM 每天關注看板 (Kanban)，主動觀察哪一欄堆積了太多在製品 (WIP)，並協助排解塞車瓶頸。",
      isSafe: true,
      tag: "💡 考官最愛 (WIP Limit & Flow)",
      verdict: "極佳實踐！限制在製品 (WIP Limit) 能保持流暢度，PM 盯瓶頸而不是盯著人逼進度。"
    }
  ],

  // 3. 同事說的英文高頻關鍵字雷達 (雙語白話對照)
  keywords: [
    {
      en: "Servant Leadership",
      cn: "僕人式領導",
      category: "people",
      categoryName: "團隊與人際",
      freq: "★★★★★",
      trigger: "看到團隊有阻礙、士氣低落、敏捷導入時",
      metaphor: "啦啦隊長＋後勤兵。不發號施令，專門問大家『需要我幫你搬開什麼障礙？』",
      examAction: "選『賦能團隊 (Empower)』、『掃除障礙 (Remove impediments)』的選項。"
    },
    {
      en: "Issue Log vs. Risk Register",
      cn: "問題日誌 vs. 風險登記冊",
      category: "process",
      categoryName: "專案流程",
      freq: "★★★★★",
      trigger: "題目問某個狀況發生了，PM 該更新哪份文件",
      metaphor: "天氣預報說會下雨＝Risk（還沒發生）；全身被淋成落湯雞＝Issue（已經發生了）。",
      examAction: "已經發生的事故選 Issue Log；潛在威脅選 Risk Register。"
    },
    {
      en: "Scope Creep",
      cn: "範疇蔓延 / 範疇潛移",
      category: "process",
      categoryName: "專案流程",
      freq: "★★★★★",
      trigger: "客戶或主管私下要加小功能、口頭要求未經審核",
      metaphor: "幫買便當順便被凹買手搖飲跟雞排，最後自己倒貼工時與金錢。",
      examAction: "千萬不能私下同意！一律走【正式變更請求 (Change Request)】。"
    },
    {
      en: "Assess Impact FIRST",
      cn: "先評估影響 (萬用起手式)",
      category: "mindset",
      categoryName: "解題心法",
      freq: "★★★★★",
      trigger: "題目問 What should the PM do FIRST / NEXT?",
      metaphor: "聽到奇怪聲響先看一眼，別一秒衝動跳腳報警或宣布棄船。",
      examAction: "選項有 Analyze, Evaluate, Assess 的通常是高機率正確答案！"
    },
    {
      en: "Sprint Retrospective",
      cn: "衝刺回顧會議",
      category: "agile",
      categoryName: "敏捷模式",
      freq: "★★★★☆",
      trigger: "敏捷衝刺結束，團隊想改善協作流程或品質問題",
      metaphor: "球隊賽後在更衣室看錄影帶檢討戰術，找出下場如何打得更順。",
      examAction: "專注於『流程改進 (Process Improvement)』，對事不對人。"
    },
    {
      en: "Stakeholder Engagement",
      cn: "利害關係人參與",
      category: "people",
      categoryName: "團隊與人際",
      freq: "★★★★☆",
      trigger: "有高層長官、協力廠商反對或抱怨不清楚現況",
      metaphor: "婚姻經營：不能等到吵翻才溝通，平時就要定期主動對齊期待。",
      examAction: "主動溝通、了解顧慮、引導參與，而不是冷處理或拿合約壓對方。"
    },
    {
      en: "Daily Standup",
      cn: "每日站立晨會 (15分鐘)",
      category: "agile",
      categoryName: "敏捷模式",
      freq: "★★★★☆",
      trigger: "敏捷日常節奏、同步進度、暴露障礙",
      metaphor: "球賽中場 15 秒暫停擊掌，只講三件事：昨天做了什麼、今天要做什麼、被誰卡住。",
      examAction: "站立會不能變成落落長的大型問題討論會；深入技術問題散會後單獨聊。"
    },
    {
      en: "Change Control Board (CCB)",
      cn: "變更控制委員會",
      category: "process",
      categoryName: "專案流程",
      freq: "★★★★☆",
      trigger: "重大合約變更、基準 (Baseline) 調整",
      metaphor: "立法院法案審查會。PM 先整理影響分析，由 CCB 拍板批准或駁回。",
      examAction: "PM 負責評估並提交，PM 通常沒有單獨權力批准影響基準的重大變更。"
    }
  ],

  // 4. 考官思維十大黃金戒律 (Cheat Sheet)
  goldenRules: [
    { no: 1, title: "絕不輕易越級呈報", desc: "遇到團隊摩擦，PM 永遠先主動介入私下了解，不隨便找主管打小報告。" },
    { no: 2, title: "遇事起手式：先評估", desc: "看到變更或突發事件，先做 Impact Analysis（評估影響），再採取行動。" },
    { no: 3, title: "已發生的叫 Issue，未發生的叫 Risk", desc: "已經中槍了去更新 Issue Log；怕被雷劈去登記 Risk Register。" },
    { no: 4, title: "永遠不私下接客製需求", desc: "所有加功能、改需求都必須走變更控制流程，防止範疇蔓延 (Scope Creep)。" },
    { no: 5, title: "僕人式領導是敏捷灵魂", desc: "敏捷 PM 不命令成員，而是全力掃除團隊阻礙 (Remove Impediments)。" },
    { no: 6, title: "絕不直接停工或取消專案", desc: "遇到危機不要第一步就放棄停工，PM 要先探索替代方案並維護專案價值。" },
    { no: 7, title: "溝通不良？先翻溝通管理計畫", desc: "利害關係人抱怨沒通知，第一步永遠是檢討與更新溝通管理計畫。" },
    { no: 8, title: "衝突管理：合作解決永遠第一優先", desc: "面對分歧，Collaborate / Confront 永遠是黃金解，Avoid（逃避）通常必錯。" },
    { no: 9, title: "回顧會議 (Retrospective) 不抓戰犯", desc: "檢討會議是為了流程改善與團隊成長，對事不對人。" },
    { no: 10, title: "英文關鍵字看動詞與名詞", desc: "記住 Assess, Empower, Collaborate, Impediment, Issue，命中率翻倍！" }
  ]
};
