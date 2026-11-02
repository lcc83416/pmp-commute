// PMP 全真實戰情境題庫與知識體系 (依據 PMI-ECO 最新大綱設計)
// 包含：4 選 1 標準考題、4 選項逐一深度剖析、考場翻譯避坑提示、職場生活神譬喻、關鍵動詞

window.PMP_DATA = {
  // 標準題庫 (每題包含分類 category，支援「錯一追補同類題」)
  questions: [
    {
      id: "q-1",
      category: "conflict",
      categoryName: "衝突處理 (Conflict)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "敏捷晨會火藥味",
      enScenario: "During a daily standup meeting, the senior backend developer and the QA lead begin arguing aggressively about defect ownership, halting the meeting. What should the project manager do FIRST?",
      cnScenario: "在每日站立晨會上，資深後端工程師與測試主管因為 Bug 責任歸屬當場激烈爭吵，導致會議被迫中斷。專案經理第一步應該做什麼？",
      enKeywordNotice: "注意最後關鍵字：FIRST（第一步該做什麼？）",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『standup』直譯成『站立』，把『defect ownership』翻成『缺陷所有權』。不要被名詞嚇到，核心就是兩人吵架誰該負責，PM 的第一步是控場並私下溝通。",
      options: [
        {
          id: "A",
          enText: "Pause the standup and meet with both individuals privately to understand the root cause.",
          text: "暫停晨會，私下分別找兩人個別面談以釐清爭端根本原因 (Root Cause)",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Immediately report the conflict to functional department heads for disciplinary action.",
          text: "立即向雙方部門主管報告，要求主管介入懲處與協調",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Let the team continue arguing so they can self-organize and reach consensus.",
          text: "讓兩人繼續在晨會上辯論，相信敏捷團隊能自組織解決爭端",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Make an executive technical decision on defect ownership immediately.",
          text: "由 PM 當場強行指定誰該負責修復該 Bug，強制晨會繼續",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "面對衝突，考官痛恨隨便告狀與公開羞辱，提倡私下合作解決！",
        mindset: "PMP 衝突處理黃金原則：面對公開激烈爭執，PM 應先中止公開鬧劇以保護團隊（Shield the team），接著私下與雙方分別會談（Private discussion），找出衝突根因（Root Cause Analysis）。",
        fourOptions: {
          A: "【正解】私下會談能維護成員自尊，探詢根本原因才能徹底化解矛盾。",
          B: "【踩雷：越級呈報 (Escalate)】PMP 考官極度討厭把問題往上丟給長官，這是推卸責任的表現。",
          C: "【踩雷：放任不管】晨會只有 15 分鐘，放任爭吵只會浪費全員時間並破壞士氣。",
          D: "【踩雷：專制裁決 (Forcing)】PM 在敏捷中不是技術法官，強壓命令會埋下日後更大的對立。"
        },
        metaphor: "就像家裡兩個小孩吵架，你不會馬上打電話叫警察（部門主管）來抓人，也不會讓他們在飯桌上繼續互丟盤子，而是先拉開兩人，坐下來問『到底在氣什麼？』",
        keyEnAction: "Collaborate / Problem Solve & Private Root Cause Analysis"
      }
    },
    {
      id: "q-2",
      category: "scope_creep",
      categoryName: "變更管理 (Scope Creep)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "重要客戶私下『凹功能』",
      enScenario: "A key client executive directly contacts the lead developer to request an additional reporting filter, promising it takes only ten minutes. How should the project manager handle this situation?",
      cnScenario: "專案的大客戶高層私下聯絡主工程師，希望能額外加上一個報表篩選按鈕，並保證『只要10分鐘就能搞定』。專案經理得知後應該如何處理？",
      enKeywordNotice: "核心考點：未經審核的變更（Scope Creep）如何處置？",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『Scope Creep』翻成『範圍蔓延』或『範圍蠕動』。只要看到客戶私下追加小需求，100% 走變更控制，絕不可口頭私下答應！",
      options: [
        {
          id: "A",
          enText: "Instruct developer to follow Change Control Process and assess impact first.",
          text: "要求工程師暫緩，告知客戶需遵循正式變更控制流程，並先評估對時程與成本的衝擊",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Approve the quick request immediately to maintain a strong client relationship.",
          text: "為了維護與客戶高層的良好信任關係，口頭答應並讓工程師順手做完",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Strictly reject the request citing that the project scope baseline is locked.",
          text: "嚴詞拒絕客戶，告訴對方專案範疇基準已經鎖定，絕對不准再提新需求",
          isCorrect: false
        },
        {
          id: "D",
          enText: "File a formal grievance against the client to the Project Sponsor.",
          text: "立即向專案贊助人 (Sponsor) 投訴客戶越權干涉技術團隊",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "範疇蔓延 (Scope Creep) 是專案毒藥，萬變不離變更流程！",
        mindset: "任何未經正式審查的新需求，不管對方官階多大、耗時多短，都必須導入【整合變更控制 (Integrated Change Control)】。先評估影響 (Assess Impact)，再送交審查 (CCB/Sponsor)。",
        fourOptions: {
          A: "【正解】引導客戶走正規流程，並主動評估影響，既專業又合規。",
          B: "【踩雷：私下加料】這是最經典的失分選項！10分鐘的小改動積少成多，最後就是專案延遲爆預算。",
          C: "【踩雷：僵化拒絕】PMP 強調客戶價值，不能無情拒絕，而是要透過變更流程讓變更透明化。",
          D: "【踩雷：過度反應】客戶提需求很正常，告知流程即可，不需要上升到告狀階層。"
        },
        metaphor: "幫同事買午餐乾麵，他半路傳訊說順便加滷蛋貢丸加奶茶。如果你每次都私下說好，最後專案一定延遲爆預算還自己倒貼！",
        keyEnAction: "Follow Change Control Procedure & Assess Impact FIRST"
      }
    },
    {
      id: "q-3",
      category: "risk_issue",
      categoryName: "風險與問題 (Risk vs Issue)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "伺服器無預警崩潰停擺",
      enScenario: "This morning, the central database server unexpectedly crashed due to power failure, halting all deployment activities. What document should the project manager update FIRST?",
      cnScenario: "今天早上，核心資料庫伺服器因電力故障突然毫無預警崩潰，導致所有部署工作被迫全面停擺。專案經理第一時間應該先更新哪份文件？",
      enKeywordNotice: "盯住英文：unexpectedly crashed（已經發生）＋ FIRST（第一步）",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把 Risk 和 Issue 都籠統翻成『問題』。請牢記：英文看清楚！未發生的叫 Risk，已發生對專案造成衝擊的叫 Issue！",
      options: [
        {
          id: "A",
          enText: "Issue Log",
          text: "議題 / 問題日誌 (Issue Log)，記錄現況並指派負責人",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Risk Register",
          text: "風險登記冊 (Risk Register)，擬定預防減緩措施",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Project Charter",
          text: "專案章程 (Project Charter)，重新申請專案授權",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Lessons Learned Register",
          text: "經驗學習登記冊 (Lessons Learned)，等結案時檢討",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "已經發生的叫 Issue，還沒發生的才叫 Risk！",
        mindset: "PMP 絕對送分題：事情『已經發生』對專案造成衝擊，一律記錄在【Issue Log】！只有『未來可能發生的不確定性』才記在【Risk Register】。",
        fourOptions: {
          A: "【正解】事故已成事實，第一步就是登記到 Issue Log 並指派 Owner 追蹤搶修。",
          B: "【踩雷：混淆時態】伺服器都已經燒了，現在才在 Risk Register 寫預防計畫已經太遲了。",
          C: "【踩雷：搞錯層級】Project Charter 是專案啟動時大老闆簽署的高階授權書，不會因為當機去改它。",
          D: "【踩雷：順序太慢】Lessons Learned 是事後檢討，當前燃眉之急是記錄並解決 Issue。"
        },
        metaphor: "出門看天空烏雲密布，帶雨傘叫預防 Risk；你現在人已經全身淋成落湯雞了，趕快拿毛巾擦乾叫處理 Issue！別在淋雨當下還在寫預報日記。",
        keyEnAction: "Update Issue Log & Assign an Owner"
      }
    },
    {
      id: "q-4",
      category: "servant_leadership",
      categoryName: "僕人式領導 (Servant Leadership)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "核心工程師被第三方 API 卡死",
      enScenario: "During an Agile sprint, a critical developer is blocked because a vendor has not provided API documentation. As a Servant Leader, what should the project manager do?",
      cnScenario: "在敏捷衝刺中，核心開發工程師被卡住了，因為第三方廠商遲遲不提供 API 規格文件，導致衝刺進度落後。身為僕人式領導者，PM 應該採取什麼行動？",
      enKeywordNotice: "核心字眼：blocked（受到阻礙）+ Servant Leader（僕人領導）",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『Servant Leader』翻成『僕人式領導』或『僕從領導』。考官心中的僕人不是端茶倒水，而是『替團隊搬開外部障礙的推土機』！",
      options: [
        {
          id: "A",
          enText: "Take ownership to contact the vendor and remove the impediment for the team.",
          text: "主動介入接洽該外部廠商，全力替工程師掃除外部阻礙 (Remove Impediment)",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Mandate the developer to work weekend overtime to find alternative workarounds.",
          text: "要求該工程師週末無條件加班，自己想辦法繞過 API 完成任務",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Take over the developer's workstation and write the backend code yourself.",
          text: "PM 親自跳下去接管工程師的電腦，自己動手把程式碼寫完",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Cancel the sprint immediately due to external dependency failure.",
          text: "因外部依賴失敗，立即宣布取消當前的整個衝刺",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "敏捷 PM 不是監工，天職是為團隊『掃除障礙 (Remove Impediments)』！",
        mindset: "僕人式領導的核心精神：保護團隊免受外界干擾（Shielding the team），主動清除外部障礙（Remove impediments），讓自組織團隊專注於價值交付。",
        fourOptions: {
          A: "【正解】PM 負責對外協調、搬開阻礙，讓技術團隊全心開發，這是僕人領導標準答案。",
          B: "【踩雷：血汗監工】敏捷推崇可持續步伐 (Sustainable Pace)，逼人加班違反敏捷精神。",
          C: "【踩雷：角色錯位】PM 不是打手或代班工程師，跳下去寫 Code 會失去全局協調能力。",
          D: "【踩雷：過度反應】只有在 Sprint 目標徹底失去價值時 PO 才能取消衝刺，遇到 API 延遲不應盲目取消。"
        },
        metaphor: "你不是跑在賽道上的賽車手，你是進站維修保養團隊，賽車輪胎卡了石頭，你趕快把石頭搬開讓車手全速衝刺！",
        keyEnAction: "Remove Impediments & Shield the Team from External Noise"
      }
    },
    {
      id: "q-5",
      category: "regulatory_compliance",
      categoryName: "法規與商業環境 (Compliance)",
      domain: "business",
      domainLabel: "商業環境 (Business 8%)",
      title: "政府新版個資法規突發通過",
      enScenario: "A newly passed data protection regulation will take effect in four weeks, which may impact your project's user authentication module. What should the project manager do FIRST?",
      cnScenario: "政府主管機關剛通過一項新的個人資料保護法規，預計在四週後正式生效，這可能導致你目前專案的會員驗證模組違規。專案經理第一步應該做什麼？",
      enKeywordNotice: "關鍵問句：What should the PM do FIRST?（第一步）",
      translationTrap: "🚨 考場翻譯防雷：遇到新法規或外部重大變更，考官萬用起手式永遠是『Assess / Analyze Impact（評估影響）』。千萬不要選立刻停工或直接改規格！",
      options: [
        {
          id: "A",
          enText: "Assess the impact of the new regulation on project scope, timeline, and deliverables.",
          text: "先全面評估新法規對現有專案範疇、驗收標準與時程預算的具體衝擊 (Assess Impact)",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Immediately halt all project development until the legal department provides guidance.",
          text: "立即暫停專案所有開發工作，等待公司法務部門發布正式指導方針",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Submit a budget increase request to senior executives right away.",
          text: "立即向高層管理團隊申請追加應急預算，以備不時之需",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Ignore the regulation for now since the project was initiated under old laws.",
          text: "暫時忽略該法規，因為專案啟動時舊法依然有效，等驗收後再說",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "風吹草動萬用起手式：永遠是先『評估影響 (Assess Impact)』！",
        mindset: "PMP 考官直覺定律：遇到法規變動、利害關係人質疑或環境變化，第一步永遠是分析評估 (Analyze / Assess Impact)。沒有評估數據就做動作，都是盲動！",
        fourOptions: {
          A: "【正解】搞清楚法規到底影響哪些模組、需要改動多少工期，才有事實依據提後續對策。",
          B: "【踩雷：恐慌停工】還沒弄清楚影響範圍就全面停工，會造成無謂的成本浪費。",
          C: "【踩雷：順序錯亂】連要改多少東西都不知道，就伸手跟主管要錢，絕對會被退回。",
          D: "【踩雷：違法忽視】合規性 (Compliance) 具有法律強制力，專案交付違法產物是零分做法。"
        },
        metaphor: "聽到家門外有怪聲，先從貓眼看清楚是外送員還是小偷（評估影響），而不是馬上按全棟火警警報器叫大家逃難。",
        keyEnAction: "Assess Impact on Scope, Schedule, and Budget"
      }
    },
    {
      id: "q-6",
      category: "conflict",
      categoryName: "衝突處理 (Conflict)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "兩派資深人員架構方案僵持不下",
      enScenario: "Two senior architects disagree on whether to use microservices or monolithic architecture. The debate has delayed project planning by two days. How should the PM address this conflict?",
      cnScenario: "兩位資深架構師對要採用微服務架構還是單體架構意見嚴重分歧，爭論已導致專案規劃進度延遲了兩天。專案經理應該如何解決這個衝突？",
      enKeywordNotice: "衝突已造成延遲，哪種解決手法考官最推崇？",
      translationTrap: "🚨 考場翻譯防雷：衝突處理 5 大手法中，『Collaborate / Problem Solve（合作/解決問題）』永遠是第一順位！『Avoid / Withdraw（逃避/撤退）』永遠是送命選項！",
      options: [
        {
          id: "A",
          enText: "Facilitate a collaborative session with both architects using objective evaluation criteria.",
          text: "組織協作會議 (Collaborate)，建立客觀評估標準，引導雙方聚焦於專案目標共同決策",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Postpone the architectural decision until the end of the sprint to preserve harmony.",
          text: "為了保持團隊表面和氣，暫時擱置架構決策 (Avoid)，先做其他邊緣功能",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Flip a coin or vote to make a quick decision and keep momentum.",
          text: "透過擲銅板或少數服從多數投票，快速隨機決定一種方案以追趕進度",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Ask the Sponsor to pick the preferred architecture for the team.",
          text: "請專案贊助人 (Sponsor) 出面替技術團隊拍板決定該用哪種架構",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "正面協作解決 (Collaborate / Problem Solve) 是唯一的雙贏正解！",
        mindset: "PMP 考題中，合作/面對 (Collaborating / Confronting) 代表直面根因、客觀對事，是考官最認可的衝突解法。逃避 (Avoid) 或推給出資人 (Escalate) 都代表 PM 失職。",
        fourOptions: {
          A: "【正解】引導雙方拿出數據客觀評估，雙方共同探討最優解，產生真正的承諾感。",
          B: "【踩雷：逃避拖延 (Avoid)】鴕鳥心態，核心架構不決定，後面所有開發工作全都會踩雷重做。",
          C: "【踩雷：兒戲妥協】技術架構攸關系統效能，不能靠隨機賭博或草率投票決定。",
          D: "【踩雷：越級推卸】贊助人出錢不負責技術架構細節，把專業衝突丟給老闆是不專業的表現。"
        },
        metaphor: "合夥開餐廳兩個廚師爭論招牌菜要偏甜還是偏辣，不是假裝沒事拖著不開店，而是做盲測找數據（客觀標準）決定最適合客人的口味！",
        keyEnAction: "Collaborate / Confront with Objective Evaluation Criteria"
      }
    },
    {
      id: "q-7",
      category: "scope_creep",
      categoryName: "變更管理 (Scope Creep)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "贊助人要求壓縮兩週工期",
      enScenario: "The project sponsor verbally demands that the release date be moved forward by two weeks to beat a competitor. What is the PM's best course of action?",
      cnScenario: "專案贊助人（大老闆）口頭要求將產品發布日期提前兩週，以搶在競爭對手前上市。專案經理最佳的應對做法是什麼？",
      enKeywordNotice: "老闆要壓縮時間，PM 能直接答應加班嗎？",
      translationTrap: "🚨 考場翻譯防雷：官方考題中，贊助人施壓是最常見的陷阱。PM 絕不是順從的應聲蟲！必須用數據評估選項（需要加預算趕工？還是砍非核心功能？），再呈報決策。",
      options: [
        {
          id: "A",
          enText: "Analyze compression options (crashing or fast-tracking) and present trade-offs to the sponsor.",
          text: "評估時程壓縮方案（如快速跟進並行或趕工加資源），並向贊助人分析代價與風險方案",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Unconditionally order the entire engineering team to work paid overtime immediately.",
          text: "無條件服從贊助人指示，立即命令全體工程團隊開始平日與假日加班",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Tell the sponsor that the schedule baseline is final and cannot be altered.",
          text: "直接告訴贊助人時程基準已經核准鎖定，任何提前的要求都免談",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Secretly cut quality testing cycles to hit the new deadline without telling anyone.",
          text: "為了趕上限期，暗中縮減品質驗證與安全測試環節以節省時間",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "面對高層施壓，專業 PM 提供數據分析與選項，而不是盲目承諾！",
        mindset: "時程要壓縮，根據專案三角約束（時間、成本、範疇），縮短時間必定要增加成本（Crashing 趕工）或承擔重工風險（Fast-tracking 並行），甚至需刪減次要功能。PM 的職責是分析各方案利弊供出資者選擇。",
        fourOptions: {
          A: "【正解】專業呈現趕工與並行的成本與風險，讓老闆做有數據依據的商業決策。",
          B: "【踩雷：盲目屈從】不評估就硬逼大家加班，會導致團隊士氣崩盤並引發嚴重離職潮。",
          C: "【踩雷：僵硬對立】出資人有權利調整商業目標，PM 應配合分析方案而非直接拒絕對話。",
          D: "【踩雷：偷工減料】暗中犧牲品質 (Quality) 在 PMP 考題是犯罪級的踩雷選項！"
        },
        metaphor: "裝潢房子屋主要提早交屋，你不是逼工班不睡覺連續幹三天，而是告訴屋主：『提早交屋可以，需要多請三組水電工（加預算），或者二樓木地板等搬進去再做（砍範疇）。』",
        keyEnAction: "Analyze Schedule Compression Options (Crashing / Fast-tracking)"
      }
    },
    {
      id: "q-8",
      category: "risk_issue",
      categoryName: "風險與問題 (Risk vs Issue)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "已識別的原物料漲價風險發生了",
      enScenario: "During project execution, an identified risk occurred: key hardware prices increased by 15%. A planned contingency plan exists in the risk register. What should the PM do?",
      cnScenario: "在專案執行期間，原本就已經在風險清單中的狀況真的發生了：核心硬體元件價格大漲 15%。當時風險登記冊中已針對此狀況備妥了應變對策。PM 此時應該做什麼？",
      enKeywordNotice: "注意：An identified risk OCCURRED + planned contingency EXISTS",
      translationTrap: "🚨 考場翻譯防雷：既然當初已經做過風險分析並有預備方案（Planned Contingency），當它發生時，直接【執行預定的應變措施 (Execute Contingency Plan)】即可！不要重新開大會慌亂重想！",
      options: [
        {
          id: "A",
          enText: "Execute the planned risk response and utilize the contingency reserve.",
          text: "立即啟動預先核准的風險應變對策，並動用預留的應急儲備金 (Contingency Reserve)",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Call an emergency project board meeting to brainstorm brand new solutions.",
          text: "召開董事會緊急會議，重新集思廣益構思全新的解決辦法",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Remove the hardware from the project scope to avoid any cost overrun.",
          text: "直接將該硬體從專案範疇中刪除，以避免產生任何成本超支",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Ask the procurement vendor to absorb the 15% loss without compensation.",
          text: "要求供應商自行承擔這 15% 的損失，拒絕支付任何額外費用",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "既然當初已經未雨綢繆，事情發生就照計畫果斷執行！",
        mindset: "這是風險管理考題的標準套路：已識別風險 (Identified Risk) 發生時，如果有預擬的應對策略 (Contingency Plan)，直接啟動並動用應急儲備 (Contingency Reserve)。",
        fourOptions: {
          A: "【正解】這就是當初做風險管理的目的：狀況來了立刻照表操課，有條不紊。",
          B: "【踩雷：重新瞎忙】明明抽屜裡有應急劇本，卻要大家重新坐下來大眼瞪小眼發想，浪費時間。",
          C: "【踩雷：因噎廢食】核心元件刪掉專案根本無法運作，不能隨意犧牲專案目標。",
          D: "【踩雷：無理耍賴】如果合約不是固定總價全包，強壓廠商只會導致廠商違約停擺。"
        },
        metaphor: "出門前看氣象預報會下雨所以包包放了雨傘（預擬對策）。真的下雨時，把傘拿出來撐開就好，不需要停在路邊開家庭會議討論『下雨了怎麼辦』！",
        keyEnAction: "Implement Planned Risk Response & Utilize Contingency Reserve"
      }
    },
    {
      id: "q-9",
      category: "servant_leadership",
      categoryName: "僕人式領導 (Servant Leadership)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "敏捷團隊自組織挑選任務",
      enScenario: "In sprint planning, the PM notices that team members are unsure which user stories to prioritize for the sprint backlog. What should the PM do?",
      cnScenario: "在衝刺規劃會議中，PM 發現團隊成員不確定該將哪些使用者故事優先放入衝刺待辦清單 (Sprint Backlog)。PM 應該怎麼做？",
      enKeywordNotice: "敏捷角色分工：誰決定優先級 (Prioritization)？誰決定怎麼做？",
      translationTrap: "🚨 考場翻譯防雷：請牢記敏捷鐵律！決定『做什麼、優先級』的是 Product Owner (PO)；決定『怎麼做、做多少』的是 Developers 團隊！PM 絕不能越俎代庖自己去排優先級！",
      options: [
        {
          id: "A",
          enText: "Facilitate communication and have the Product Owner clarify priority based on business value.",
          text: "協調會議溝通，請產品負責人 (Product Owner) 依據商業價值向團隊釐清優先順序",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Directly assign the user stories to team members based on your personal judgment.",
          text: "由 PM 憑自己的專案管理經驗，直接指定分派使用者故事給各個成員",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Tell the team to pick only the easiest stories first to maximize velocity.",
          text: "叫團隊先挑最簡單的故事來做，以衝高團隊速率 (Velocity) 的數字表現",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Cancel the planning session and reschedule it for next week.",
          text: "直接中止會議，要求大家下週做好準備再來開會",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "各司其職：PO 定商業價值與優先級，團隊估點自組織！",
        mindset: "僕人式領導的職責是促進協調 (Facilitate)。敏捷中優先順序的唯一權威是 Product Owner (PO)。PM 應促成團隊與 PO 的對話，而不是自己變成發號施令的主管。",
        fourOptions: {
          A: "【正解】找 PO 說清楚業務價值與優先級，這是敏捷框架的標準運作方式。",
          B: "【踩雷：命令與控制 (Command & Control)】破壞團隊自組織，敏捷大忌。",
          C: "【踩雷：粉飾數據】盲目挑簡單的做只為了好看的 Velocity 報表，無法交付真正的客戶價值。",
          D: "【踩雷：推遲會議】遇到溝通問題當場找 PO 協調即可，延後會議只會浪費衝刺時間。"
        },
        metaphor: "餐廳開菜單，客人（PO）決定先上牛排還是先上甜點；主廚團隊（開發者）決定怎麼煎牛排。外場經理（PM）是把客人找來跟廚房講清楚，而不是自己拿鍋鏟亂炒！",
        keyEnAction: "Facilitate Dialogue with Product Owner for Value Prioritization"
      }
    },
    {
      id: "q-10",
      category: "communication",
      categoryName: "溝通與利害關係人 (Communication)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "關鍵部門經理抱怨沒收到進度報告",
      enScenario: "A key operational stakeholder complains furiously to executives that they have not been informed about major system deployment schedules. What should the PM do FIRST?",
      cnScenario: "一位關鍵的營運部門經理非常憤怒地向公司高層抱怨，表示自己完全沒有收到關於新系統重大部署時程的任何通知。專案經理第一步應該做什麼？",
      enKeywordNotice: "有人抱怨沒收到消息 ➔ 檢視溝通管理計畫！",
      translationTrap: "🚨 考場翻譯防雷：只要題目有人抱怨『沒收到進度、資訊不透明、被矇在鼓裡』，考官 90% 的解題標準 SOP 就是先查【溝通管理計畫 (Communications Management Plan)】！",
      options: [
        {
          id: "A",
          enText: "Review the Communications Management Plan to verify the stakeholder's needs and update it.",
          text: "檢視【溝通管理計畫】，確認該利害關係人的資訊需求是否有遺漏，並隨之更新",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Blame your project assistant publicly for forgetting to send the email.",
          text: "當眾斥責專案助理粗心大意，把責任推給助理漏發信件",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Add this stakeholder to all daily engineering standup meeting invites.",
          text: "直接把這位經理加入每天 15 分鐘的工程晨會行事曆中",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Explain to executives that this operational manager is not important to deployment.",
          text: "向高層解釋該營運經理並非技術核心，不需要接收時程通知",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "有人抱怨資訊不通，根源就是溝通計畫有盲點！",
        mindset: "利害關係人資訊脫節，第一步永遠是回頭檢查溝通管理計畫 (Communications Management Plan) 與利害關係人參與計畫 (Stakeholder Engagement Plan)。確認對象、頻率、傳遞方式是否符合需求。",
        fourOptions: {
          A: "【正解】有憑有據查計畫，找出當初是漏列了該經理，還是寄錯格式，及時補救更新。",
          B: "【踩雷：卸責推拖】專業 PM 承擔全局責任，絕不在公眾場合找戰犯甩鍋。",
          C: "【踩雷：資訊轟炸】營運高層要的是高階發布里程碑，不是每天聽工程師報 Bug 細節，亂拉進晨會只會浪費大家時間。",
          D: "【踩雷：忽視利害關係人】營運團隊負責上線後的系統維運，得罪營運經理只會導致日後交付被卡關。"
        },
        metaphor: "客戶抱怨訂報紙都沒收到，送報經理第一步是查配送名冊（溝通計畫），看是地址寫錯還是漏劃路線，而不是直接跟總公司罵送報生！",
        keyEnAction: "Review & Update Communications Management Plan"
      }
    },
    {
      id: "q-11",
      category: "conflict",
      categoryName: "衝突處理 (Conflict)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "跨文化團隊因工作習慣產生嫌隙",
      enScenario: "A global project team experiences friction due to different cultural norms around working hours and meeting etiquette. What tool should the PM use FIRST to establish shared expectations?",
      cnScenario: "一個跨國分散式專案團隊因為不同地區的文化差異、工作時差與會議禮儀產生摩擦，成員在合作時互有抱怨。專案經理第一步應該利用什麼工具來建立共識？",
      enKeywordNotice: "團隊內部規則與工作公約 ➔ 團隊章程 (Team Charter)！",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『Team Charter』翻成『團隊章程』或『團隊協約』。只要是團隊成員之間的工作規範、溝通禮儀、價值觀約定，首選 Team Charter！",
      options: [
        {
          id: "A",
          enText: "Collaborate with the team to develop or update a Team Charter.",
          text: "與團隊共同制定或更新【團隊章程 (Team Charter)】，確立行為規範與溝通公約",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Impose strict headquarter cultural rules and demand full compliance.",
          text: "由 PM 強制推行總部公司的文化規則，要求所有人一律無條件服從",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Replace non-compliant overseas team members with local staff.",
          text: "向人資申請更換無法適應的海外成員，全部換成本地工程師",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Discontinue all virtual meetings and rely solely on written documentation.",
          text: "取消所有視訊會議，全面改成純文字郵件往來以避免摩擦",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "團隊內部要有規矩，必須由全員共同制定 Team Charter！",
        mindset: "團隊章程 (Team Charter) 是團隊共同建立的工作守則，涵蓋價值觀、溝通準則、決策流程與衝突化解機制。由團隊共同產出才能帶來真正的自我約束力。",
        fourOptions: {
          A: "【正解】團隊章程由成員共創，解決文化差異與行為規範的最佳工具。",
          B: "【踩雷：專制傲慢】忽視文化多樣性 (Diversity)，只會引發更嚴重的內部反彈。",
          C: "【踩雷：逃避問題】動輒換人成本極高，也缺乏身為 PM 的包容與領導力。",
          D: "【踩雷：阻斷溝通】文字往來缺乏語氣表情，跨文化下更容易產生誤會。"
        },
        metaphor: "跟室友合租公寓，大家生活習慣不同，最好的方式是一起坐下來寫一張『生活公約（洗澡順序、丟垃圾輪值）』，而不是房東直接下命令罰錢！",
        keyEnAction: "Develop / Update Team Charter Collaboratively"
      }
    },
    {
      id: "q-12",
      category: "scope_creep",
      categoryName: "變更管理 (Scope Creep)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "工程師主動『自願鍍金加料』",
      enScenario: "During testing, the PM discovers that a senior engineer added complex 3D animation effects that were not in the approved requirements, causing performance lag. What is this practice called, and what should the PM do?",
      cnScenario: "在驗收測試期間，PM 發現一位資深工程師為了炫耀技術，私自加入未在核准需求中的複雜 3D 動畫特效，導致系統在低階手機上嚴重卡頓。這種行為稱為什麼？PM 該如何處理？",
      enKeywordNotice: "私自加料未經核准 ➔ 鍍金 (Gold Plating) 大忌！",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『Gold Plating』翻成『鍍金』。記住：考官永遠禁止鍍金！專案只做『約定好的範圍』，私自加料浪費資源還帶來效能缺陷，必須移除！",
      options: [
        {
          id: "A",
          enText: "This is Gold Plating; the PM should instruct the engineer to align strictly with the approved scope baseline.",
          text: "這是【鍍金 (Gold Plating)】；PM 應要求工程師嚴格依據已核准的範疇基準執行，並移除未核准功能",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Reward the engineer for technical innovation and exceeding stakeholder expectations.",
          text: "公開表揚並獎勵該工程師勇於技術創新、超越利害關係人的期望",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Keep the animation and demand that the client pay extra budget for it.",
          text: "保留該 3D 動畫，並要求客戶為這項驚喜功能追加專案預算",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Submit an after-the-fact change request without testing the performance impact.",
          text: "直接補送變更申請，要求直接把 3D 特效強行納入驗收標準",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "PMP 考官嚴格禁止【鍍金 (Gold Plating)】，只做講好的事！",
        mindset: "鍍金指未經正式變更程序，私自加入客戶沒要求的額外功能。這不僅浪費專案資源與工時，更可能引入未知的 Bug 或效能瓶頸。PM 必須依循已核准的範疇基準 (Scope Baseline) 交付。",
        fourOptions: {
          A: "【正解】確認符合範疇基準，杜絕私自加料，保證交付品質與穩定度。",
          B: "【踩雷：鼓勵歪風】在 PMP 考試中，超額贈送未授權功能是嚴重錯誤。",
          C: "【踩雷：強迫中獎】客戶沒要求你私自做，還回頭跟客戶要錢，嚴重損害商譽。",
          D: "【踩雷：倒果為因】效能已經卡頓，未經測試就補流程等於草菅人命。"
        },
        metaphor: "你去修車廠只想換機油，修車師傅自作主張幫你改了喧鬧的排氣管還說送你的，結果上路吵死人還被警察開單！這就叫鍍金。",
        keyEnAction: "Prevent Gold Plating & Align with Scope Baseline"
      }
    },
    {
      id: "q-13",
      category: "risk_issue",
      categoryName: "風險與問題 (Risk vs Issue)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "關鍵技術骨幹突然提出離職",
      enScenario: "The sole cloud security specialist unexpectedly resigns during peak migration. Project progress is at immediate risk. What should the PM do FIRST?",
      cnScenario: "專案中唯一的雲端資安專家在系統遷移高峰期突然無預警提出離職，專案時程面臨嚴重威脅。專案經理第一步應該做什麼？",
      enKeywordNotice: "核心人員離職 ➔ 檢視風險登記冊與影響評估 (Assess Impact)！",
      translationTrap: "🚨 考場翻譯防雷：人走了是突發狀況，第一步千萬不要立刻威脅或強留，也不要盲目停工。第一步是【評估影響 (Assess Impact)】並查看風險登記冊中是否有替代人選預案！",
      options: [
        {
          id: "A",
          enText: "Assess the impact on deliverables and review the Risk Register for contingency staffing plans.",
          text: "評估其未完成工作對專案的衝擊，並查閱風險登記冊中的人員替補應變方案 (Assess Impact)",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Force the specialist to stay until project completion by withholding final payment.",
          text: "扣留該專家的最後薪酬，強迫對方必須留任到專案結案為止",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Immediately pause all cloud migration work indefinitely.",
          text: "立即無限期暫停所有雲端遷移工作，等待找到同等專家為止",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Demand that the remaining junior developers divide the security workload without training.",
          text: "直接把資安專家的複雜工作分攤給初階工程師，不提供任何交接培訓",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "人員異動第一步：冷靜評估衝擊，啟動交接與備案！",
        mindset: "面對關鍵人才流失（單一故障點風險），PM 需先盤點其在手工作、評估時程衝擊，並尋求風險登記冊中的應變資源（如廠商外包、內部調度），同時做好知識轉移 (Knowledge Transfer)。",
        fourOptions: {
          A: "【正解】理性評估影響並啟用預備方案，確保業務持續性。",
          B: "【踩雷：違法強留】扣留薪水違反勞動法規，不是職業 PM 的行為。",
          C: "【踩雷：過度恐慌】不能隨意讓專案陷入無限期停工。",
          D: "【踩雷：草率冒險】讓毫無資安背景的初階人員盲幹，會導致災難性安全破洞。"
        },
        metaphor: "球隊主力前鋒突然受傷退場，教練第一步是看戰術板（評估情勢）換上替補球員，而不是直接宣布棄賽，更不是逼守門員去踢前鋒！",
        keyEnAction: "Assess Impact & Execute Resource Contingency Plan"
      }
    },
    {
      id: "q-14",
      category: "servant_leadership",
      categoryName: "僕人式領導 (Servant Leadership)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "新人工程師對敏捷工具感到焦慮迷茫",
      enScenario: "A newly joined team member is struggling with Jira and feels overwhelmed by rapid sprint iterations. How should the servant leader PM support this member?",
      cnScenario: "一位剛加入團隊的初階工程師不熟悉敏捷管理工具 (Jira)，並對快速的衝刺節奏感到壓力沉重、無所適從。身為僕人式領導者的 PM，應該如何協助他？",
      enKeywordNotice: "成員能力不足 ➔ 教練輔導 (Coaching) 與導師制度 (Mentoring)！",
      translationTrap: "🚨 考場翻譯防雷：考官非常看重【賦能與輔導 (Empowerment & Coaching)】。當成員技能不足或適應不良時，答案通常是『提供培訓 (Training)』或『指派資深導師 (Mentoring)』，絕不是懲處或淘汰！",
      options: [
        {
          id: "A",
          enText: "Provide coaching, arrange peer mentoring, and offer training on agile practices and tools.",
          text: "親自提供教練輔導 (Coaching)，安排資深同儕導師 (Mentoring)，並提供敏捷工具培訓",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Issue a formal performance warning to push the member to adapt faster.",
          text: "向該成員發出績效警告信，逼迫其在最短時間內自己跟上節奏",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Reassign all critical tasks away and give the member only trivial administrative chores.",
          text: "把所有重要任務全部抽走，只派給該成員無關緊要的影印打雜工作",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Suggest the member transfer to another traditional predictive project immediately.",
          text: "直接建議該成員轉調到其他傳統瀑布式專案部門",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "僕人領導重在『賦能 (Empower) 與輔導 (Coach)』！",
        mindset: "PMP 人才管理核心：團隊成員的能力差距，是專案經理需要投資培育的機會。透過 Training、Coaching 與 Mentoring 幫助成員成長，建立心理安全感 (Psychological Safety)。",
        fourOptions: {
          A: "【正解】輔導加導師機制，最能幫助新人建立信心並融入自組織團隊。",
          B: "【踩雷：威權壓迫】只會加劇成員焦慮，導致離職或擺爛。",
          C: "【踩雷：邊緣化成員】浪費人力資源，破壞團隊凝聚力。",
          D: "【踩雷：推卸培育責任】未經輔導就直接放棄成員，缺乏領導担当。"
        },
        metaphor: "菜鳥籃球員剛進職籃不習慣快節奏，老教練會安排特訓與資深前輩帶他，而不是第一天就把他踢出球隊叫他改打排球！",
        keyEnAction: "Provide Training, Coaching & Pair Mentoring"
      }
    },
    {
      id: "q-15",
      category: "communication",
      categoryName: "溝通與利害關係人 (Communication)",
      domain: "people",
      domainLabel: "人 (People 42%)",
      title: "反對新系統的頑固利害關係人",
      enScenario: "A senior factory director openly opposes the new ERP project, fearing loss of operational autonomy. What should the PM do to improve their engagement level?",
      cnScenario: "一位資深的工廠廠長強烈公開反對新 ERP 專案的導入，擔心新系統會削弱工廠原有的營運自主權。專案經理應該怎麼做以改善這位利害關係人的參與度？",
      enKeywordNotice: "抗拒型利害關係人 (Resistant Stakeholder) 該如何轉化？",
      translationTrap: "🚨 考場翻譯防雷：遇到抗拒者 (Resistant)，考官絕不允許『排擠他』或『找大老闆壓他』！正解永遠是：『一對一深入溝通、傾聽顧慮、將其納入規劃』，化阻力為助力！",
      options: [
        {
          id: "A",
          enText: "Schedule a one-on-one session to listen to concerns and involve them in defining local workflows.",
          text: "安排一對一面談，耐心傾聽其核心顧慮，並邀請該廠長參與定義在地工作流程以賦予話語權",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Bypass the factory director and communicate only with frontline machine operators.",
          text: "繞過該廠長，私下只直接跟第一線機台操作員溝通",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Request the CEO to issue an executive order commanding the director to comply.",
          text: "請執行長 (CEO) 發布行政命令，直接強壓該廠長必須服從專案決策",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Exclude the factory from the first two release phases without their knowledge.",
          text: "暗中把該工廠從前兩期的上線名單中剔除，等最後一期再說",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "化阻力為助力：傾聽顧慮 (Listen to Concerns) 並賦予參與權！",
        mindset: "利害關係人參與管理 (Stakeholder Engagement) 的精髓：抗拒往往來自於未知與失控感。PM 應展現同理心，了解利益訴求，並透過邀請對方參與設計 (Involvement)，讓其從「抗拒者 (Resistant)」轉化為「支持者 (Supportive)」。",
        fourOptions: {
          A: "【正解】傾聽顧慮、讓對方參與決策，化被動接受為主動參與，這是頂級 PM 的手腕。",
          B: "【踩雷：密室搞分裂】繞過主管直接找基層，只會讓該廠長更憤怒並在背後全面抵制。",
          C: "【踩雷：強權壓迫】大老闆不可能天天幫你壓人，強壓之下必有陽奉陰違。",
          D: "【踩雷：鴕鳥拖延】問題不會自己消失，偷偷剔除最後只會爆發更大衝突。"
        },
        metaphor: "社區要蓋新電梯，一樓住戶最反對因為用不到還怕吵。管委會不是找里長去罵他，而是找他泡茶問他在意什麼，並承諾給予一樓景觀補償或免費門面整修，大家就握手言和了！",
        keyEnAction: "Engage One-on-One, Understand Concerns & Involve in Planning"
      }
    },
    {
      id: "q-16",
      category: "regulatory_compliance",
      categoryName: "法規與商業環境 (Compliance)",
      domain: "business",
      domainLabel: "商業環境 (Business 8%)",
      title: "內部品質稽核發現資安漏洞",
      enScenario: "An internal quality audit reveals that the payment gateway does not comply with international financial encryption standards. What should the PM do FIRST?",
      cnScenario: "公司內部品質稽核報告顯示，目前正在開發的支付閘道模組未符合國際金融加密法規標準。專案經理第一步應該做什麼？",
      enKeywordNotice: "稽核不合格 (Audit Finding) ➔ 第一步記錄與評估根本原因！",
      translationTrap: "🚨 考場翻譯防雷：稽核 (Audit) 發現不合格項，第一步是記錄於 Issue Log 並執行根本原因分析 (Root Cause Analysis)，評估對產品交付的衝擊，絕不可掩蓋報告！",
      options: [
        {
          id: "A",
          enText: "Log the finding in the Issue Log and conduct a root cause analysis to determine correction scope.",
          text: "將該稽核缺失登錄至 Issue Log，並召集專家進行根本原因分析以釐清修復範疇與衝擊",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Conceal the audit finding from the sponsor to ensure on-time release.",
          text: "向贊助人隱瞞該稽核缺失，確保專案能按原定時程準時上線",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Blame the internal auditors for conducting inspections during active development.",
          text: "質疑稽核團隊不該在開發衝刺中進行檢查，要求撤銷報告",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Immediately purchase a third-party gateway without evaluating compatibility.",
          text: "在未評估相容性與預算的情況下，立即刷卡買下昂貴的現成第三方閘道",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "發現法規與品質缺失：如實登錄 (Log) 並追查根因 (RCA)！",
        mindset: "PMP 職業道德與法規遵循鐵律：安全與合規不可妥協。發現稽核缺失 (Audit finding)，標準流程是：登記到 Issue Log ➔ 根本原因分析 (RCA) ➔ 提出矯正措施 (Corrective Action) 走變更流程。",
        fourOptions: {
          A: "【正解】依法登錄、追查根因、評估修復範圍，這是專業標準處置作業。",
          B: "【踩雷：道德欺詐】隱瞞合規風險在 PMP 考試直接淘汰出局，且現實中面臨刑責。",
          C: "【踩雷：質疑稽核】稽核是為了及早發現未爆彈，對抗稽核是完全錯誤的觀念。",
          D: "【踩雷：衝動採購】未做衝擊分析就盲目買新產品，只會衍生更多架構災難。"
        },
        metaphor: "新車出廠前安全檢查發現煞車油壓不足，車廠不是把報告藏起來直接交車給客人，而是立刻記案並拆開管路查出是哪顆螺絲沒鎖緊！",
        keyEnAction: "Log Finding in Issue Log & Perform Root Cause Analysis"
      }
    },
    {
      id: "q-17",
      category: "agile_delivery",
      categoryName: "敏捷交付 (Agile Delivery)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "工程師認為程式寫完就算 Done",
      enScenario: "A developer claims a user story is complete because the code is written, but automated testing and documentation have not been done. How should the PM/Scrum Master resolve this?",
      cnScenario: "一位工程師堅稱某個使用者故事已經全部做完了，因為程式碼已經寫好；但自動化測試與使用者手冊文件完全還沒開始動。PM / 敏捷教練應該如何處理？",
      enKeywordNotice: "什麼叫真正做完？ ➔ 完成的定義 (Definition of Done, DoD)！",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『Definition of Done』翻成『完成的定義』或『完成準則』。敏捷中只有 100% 符合 DoD 的工作才能算完成，不能打折算部分完成！",
      options: [
        {
          id: "A",
          enText: "Review the agreed Definition of Done (DoD) with the developer and explain that unverified code cannot be accepted.",
          text: "與該工程師對齊團隊共同制定的【完成定義 (Definition of Done, DoD)】，說明未完成測試與文件者不能算完成",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Accept the story as 80% done and credit the velocity points for this sprint.",
          text: "通融算該故事完成 80%，並按比例將團隊速率點數算入本輪衝刺中",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Ask the Product Owner to relax the quality standards just for this sprint.",
          text: "拜託 Product Owner 破例放水降低本輪驗收標準，讓團隊能準時交差",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Tell the QA team to work unpaid overtime tonight to finish the missing tests.",
          text: "命令測試團隊今晚無條件留下來加班，替該工程師補齊測試與文件",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "敏捷嚴格執行【完成定義 (DoD)】，沒有所謂的『完成了80%』！",
        mindset: "在敏捷中，完成定義 (Definition of Done) 是確保潛在可交付增量 (Potentially Shippable Increment) 品質的底線。只有同時滿足寫 code、測試、文件等多維度標準，故事才能標記為 Done，絕不能按百分比灌水。",
        fourOptions: {
          A: "【正解】依據團隊簽署的 DoD 客觀檢視，堅持敏捷品質原則。",
          B: "【踩雷：灌水速率】敏捷禁止把未完成的故事算部分點數，這會造成虛假的進度幻覺。",
          C: "【踩雷：犧牲品質】降低驗收標準只會累積巨大的技術債務 (Technical Debt)。",
          D: "【踩雷：推給他人】誰寫 code 誰維護品質，不能把後續雜事甩鍋給測試人員加班。"
        },
        metaphor: "你去餐廳點煎牛排，廚師把生牛肉切好丟在盤子上說『我肉切完了算做好了80%』，你絕對不可能吞下去！必須煎熟、擺盤、附上醬汁（符合 DoD）才能端給客人！",
        keyEnAction: "Enforce Definition of Done (DoD) & Maintain Quality Standards"
      }
    },
    {
      id: "q-18",
      category: "schedule_crashing_fasttracking",
      categoryName: "時程縮減 (Compression)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "專案進度落後：該平行並行還是加班砸錢？",
      enScenario: "A project is two weeks behind schedule. The activities on the critical path have dependencies that can overlap with high risk of rework, but no extra budget is available. Which technique should the PM choose?",
      cnScenario: "專案目前落後進度兩週。關鍵路徑上的任務具有可重疊執行的潛力，但可能帶來重工風險；同時專案完全沒有任何追加預算。專案經理應該選擇哪種時程壓縮技術？",
      enKeywordNotice: "沒錢加預算 (No extra budget) + 任務可重疊 ➔ 快速跟進 (Fast Tracking)！",
      translationTrap: "🚨 考場翻譯防雷：必背對比！【Fast Tracking (快速跟進)】＝把前後任務改成並行，不花錢但增加重工風險；【Crashing (趕工)】＝砸錢加人加資源，花錢但重工風險小。題目說『沒錢 (No budget)』，只能選 Fast Tracking！",
      options: [
        {
          id: "A",
          enText: "Fast Tracking (performing activities in parallel to compress schedule without extra cost).",
          text: "採用【快速跟進 (Fast Tracking)】，將原先依序進行的任務改為平行並行，在不增加預算下追趕進度",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Crashing (adding extra costly resources to the critical path).",
          text: "採用【趕工 (Crashing)】，對關鍵路徑投入大量高薪外包與加班費",
          isCorrect: false
        },
        {
          id: "C",
          enText: "De-scope core features without consulting the client.",
          text: "不經過客戶同意，擅自砍掉專案的核心功能以縮短工時",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Falsify the Gantt chart to show the project is on track.",
          text: "在甘特圖進度報表上造假，向高層回報專案一切正常",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "沒錢就並行 (Fast Tracking)，有錢才砸資源 (Crashing)！",
        mindset: "時程壓縮兩大核心武器：1. Fast Tracking (快速跟進/並行)：不增成本、增加風險。2. Crashing (趕工)：增加成本、換取時間。題目明確限制『沒有額外預算』，唯一符合條件的就是 Fast Tracking。",
        fourOptions: {
          A: "【正解】在預算為零的前提下，平行施工是唯一能縮短時間的合規技術。",
          B: "【踩雷：違反題意】題目白紙黑字寫了無追加預算，Crashing 需要花大錢。",
          C: "【踩雷：擅自砍範疇】範疇變更需走正式變更審查，不能私自刪減。",
          D: "【踩雷：作弊造假】違反 PMI 道德守則，現實中會被吊銷證照。"
        },
        metaphor: "籌辦婚禮時間不夠又沒錢請婚顧幫忙，你一邊試穿婚紗的同時一邊用手機挑喜餅喜帖（兩件事平行做＝Fast Tracking）。雖然手忙腳亂有點風險，但不用多花一毛錢！",
        keyEnAction: "Apply Fast Tracking Technique for Schedule Compression"
      }
    },
    {
      id: "q-19",
      category: "agile_delivery",
      categoryName: "敏捷交付 (Agile Delivery)",
      domain: "business",
      domainLabel: "商業環境 (Business 8%)",
      title: "預算遭大砍，如何保證商業價值？",
      enScenario: "Due to company-wide cutbacks, the project budget is reduced by 40%. The executive sponsor still wants the product launched. What strategy should the PM propose?",
      cnScenario: "由於公司整體預算緊縮，你負責的專案預算被大幅削減了 40%。但執行贊助人依然希望產品能如期推向市場。專案經理應該向贊助人提出什麼策略？",
      enKeywordNotice: "預算大減但必須上市 ➔ 最小可行產品 (MVP)！",
      translationTrap: "🚨 考場翻譯防雷：官方中文常把『Minimum Viable Product (MVP)』翻成『最小可行產品』。只要題目提到預算減縮、搶先佔領市場、驗證商業價值，優先交付 MVP 是標準打法！",
      options: [
        {
          id: "A",
          enText: "Collaborate with the Product Owner to prioritize and deliver a Minimum Viable Product (MVP).",
          text: "與產品負責人 (PO) 合作重新梳理 Backlog，聚焦交付【最小可行產品 (MVP)】以滿足核心商業價值",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Force all team members to take a 40% pay cut to continue building all planned features.",
          text: "要求所有團隊成員減薪 40%，以維持原本所有規劃功能的完整開發",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Deliver all features but without running any QA tests to save testing budget.",
          text: "把所有功能做完，但完全不做任何測試驗證以省下測試預算",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Resign from the project immediately to avoid failure on your resume.",
          text: "立即請辭離開專案，以避免在個人履歷留下失敗紀錄",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "資源受限時，優先交付核心價值：最小可行產品 (MVP)！",
        mindset: "敏捷價值導向交付：80% 的用戶價值往往集中在 20% 的核心功能上（二八法則）。面對預算縮水，最佳對策是聚焦於 MVP（Minimum Viable Product），先讓最關鍵功能上線驗證市場，後續再迭代演進。",
        fourOptions: {
          A: "【正解】用最精準的預算上線最核心的價值，這是現代敏捷商業管理典範。",
          B: "【踩雷：荒謬剝削】成員只會集體辭職，專案直接瞬間暴斃。",
          C: "【踩雷：豆腐渣工程】不測試的系統上線只會造成嚴重災難與品牌公關危機。",
          D: "【踩雷：逃避責任】身為 PM 應展現專業解決商業困境，而非臨陣脫逃。"
        },
        metaphor: "原本想開一間豪華五星級咖啡廳但預算被砍，你先買一台最好的義式咖啡機開一台文青外帶咖啡車（MVP），先把咖啡賣給客人賺錢，日後有錢再擴大店面！",
        keyEnAction: "Prioritize Core Value & Deliver Minimum Viable Product (MVP)"
      }
    },
    {
      id: "q-20",
      category: "lessons_learned",
      categoryName: "收尾與經驗傳承 (Closing)",
      domain: "process",
      domainLabel: "流程 (Process 50%)",
      title: "專案圓滿交付，PM 最後一步做什麼？",
      enScenario: "The project deliverables have been formally accepted by the customer. The team is eager to disperse to new assignments. What must the PM complete before formally closing the project?",
      cnScenario: "專案交付成果已經獲得客戶正式簽字驗收。團隊成員迫不及待想解散去投入新專案。在正式宣告專案結案之前，PM 必須完成什麼關鍵工作？",
      enKeywordNotice: "結案前不可省略的動作 ➔ 更新經驗學習與組織過程資產 (OPA)！",
      translationTrap: "🚨 考場翻譯防雷：PMP 考題非常討厭『虎頭蛇尾』！驗收過後，PM 絕不能直接放大家走人。必須【召開總結經驗學習 (Lessons Learned)】並【歸檔專案文件與釋放資源】，這叫終身受用的組織資產！",
      options: [
        {
          id: "A",
          enText: "Conduct final lessons learned session, update organizational process assets (OPA), and archive project records.",
          text: "召開最終【經驗學習檢討會】，更新組織過程資產 (OPA)，歸檔專案文件並正式釋放團隊資源",
          isCorrect: true
        },
        {
          id: "B",
          enText: "Immediately disband the team without documentation to save administrative overhead.",
          text: "為了省去行政文書麻煩，跳過結案文件直接就地解散全體團隊",
          isCorrect: false
        },
        {
          id: "C",
          enText: "Delete all project issue logs and defect records to ensure a clean public audit trail.",
          text: "刪除所有的問題日誌與缺陷紀錄，確保未來的外部稽核看起來完美無瑕",
          isCorrect: false
        },
        {
          id: "D",
          enText: "Host a celebration dinner and declare the project closed without financial reconciliation.",
          text: "只辦一場慶功宴吃大餐，不進行任何合約與財務結算就宣布結案",
          isCorrect: false
        }
      ],
      explanation: {
        verdict: "完美的專案句點：總結 Lessons Learned，沉澱 OPA 資產！",
        mindset: "收尾流程組 (Closing Process Group) 的黃金步驟：1. 正式驗收 ➔ 2. 總結經驗學習 (Lessons Learned) ➔ 3. 歸檔文件與更新 OPA ➔ 4. 財務/合約結算 ➔ 5. 釋放資源 (Release Resources)。",
        fourOptions: {
          A: "【正解】標準結案 SOP，將專案智慧沉澱為公司組織資產，並正式釋放人員。",
          B: "【踩雷：虎頭蛇尾】不歸檔不總結，下一次別的專案團隊還會重複踩同樣的坑。",
          C: "【踩雷：銷毀證據】刪除歷史紀錄是嚴重的誠信缺失與稽核違規。",
          D: "【踩雷：未做財務結算】未完成合約與帳務結算，專案在法律與財務上不算真正結束。"
        },
        metaphor: "打贏一場仗，不是大家把槍丟在地上就跑去喝酒，而是要把戰利品入庫、統計彈藥消耗、寫下作戰報告（經驗學習），最後正式頒發退伍令讓弟兄回家！",
        keyEnAction: "Document Lessons Learned, Update OPAs & Archive Project Records"
      }
    }
  ]
};

