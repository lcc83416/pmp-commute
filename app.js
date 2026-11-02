// PMP 通勤秒懂衝刺王 (PMP Commute Master)
// 包含：每日考題 (錯一補強、刪去法、四選項剖析)、PMP 模擬題 (短跑局制、測速暫停、作廢防呆)、統計日曆 (分開獨立統計)

class PmpApp {
  constructor() {
    this.data = window.PMP_DATA || { questions: [] };
    this.currentTab = 'practice';

    // 本地日期 (YYYY-MM-DD)
    this.todayStr = this.getLocalDateString();
    this.viewingDate = this.todayStr;

    // 載入或初始化使用者狀態
    this.userState = this.loadState() || this.createDefaultState();
    this.ensureTodayState();

    // 每日練習執行時變數
    this.practiceIndex = this.getInitialPracticeIndex();
    this.struckOptions = {}; // 紀錄目前題目被劃掉的選項 { 'A': true, 'B': true }

    // 歷史模式複習變數
    this.historyReviewIndex = 0;

    // PMP 模擬短跑局 (Mock Run) 變數
    this.mockState = {
      isRunning: false,
      isPaused: false,
      timerSeconds: 0,
      timerInterval: null,
      questions: [],
      currentIndex: 0,
      answers: {}, // { questionId: { choice: 'A', isCorrect: true, flagged: false } }
      struck: {},  // { 'questionId-choice': true }
      currentResult: null
    };

    // 音效合成器
    this.audioContext = null;
    this.soundEnabled = true;

    this.initElements();
    this.bindEvents();
    this.updateStatsUI();
    this.renderPractice();
    this.renderMockSummary();
    this.renderStatsCalendar();
  }

  // 取得本地日期字串 YYYY-MM-DD
  getLocalDateString(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addDays(dateStr, days) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return this.getLocalDateString(d);
  }

  createDefaultState() {
    return {
      startDate: this.todayStr,
      history: {}, // { 'YYYY-MM-DD': { answered: 0, correct: 0, dailyGoal: 20, reinforcedCount: 0, practiceQueue: [], practiceAnswers: {}, completed: false } }
      mockSessions: [], // [ { id, date, timeStr, questionCount, correctCount, elapsedSeconds, avgSeconds, accuracy } ]
      lastActiveDate: this.todayStr
    };
  }

  getAllQuestions() {
    if (this.data && Array.isArray(this.data.questions) && this.data.questions.length > 0) {
      return this.data.questions;
    }
    // 向下相容若舊版 pmp-data.js 快取
    if (this.data && Array.isArray(this.data.duels) && this.data.duels.length > 0) {
      return this.data.duels.map(d => ({
        id: d.id,
        category: "general",
        categoryName: d.domainLabel || "核心情境",
        domain: d.domain || "process",
        domainLabel: d.domainLabel || "流程 (Process)",
        title: d.title,
        enScenario: d.enScenario,
        cnScenario: d.cnScenario,
        enKeywordNotice: "核心考點：注意情境關鍵字",
        translationTrap: "🚨 考場翻譯防雷：請依據最後問句動詞判斷。",
        options: [
          { id: "A", enText: d.optionA.enText || "", text: d.optionA.text, isCorrect: d.optionA.isCorrect },
          { id: "B", enText: d.optionB.enText || "", text: d.optionB.text, isCorrect: d.optionB.isCorrect },
          { id: "C", enText: "Escalate the issue to executive steering committee.", text: "立即向上級指導委員會報告求助", isCorrect: false },
          { id: "D", enText: "Postpone the decision until next sprint.", text: "暫停處理，推遲至下個衝刺再討論", isCorrect: false }
        ],
        explanation: {
          verdict: d.explanation.verdict,
          mindset: d.explanation.mindset,
          fourOptions: {
            A: d.optionA.isCorrect ? "【正解】符合最佳實踐。" : "【錯誤】非最佳行動。",
            B: d.optionB.isCorrect ? "【正解】符合最佳實踐。" : "【錯誤】非最佳行動。",
            C: "【踩雷】隨意向上升級問題。",
            D: "【踩雷】逃避拖延問題。"
          },
          metaphor: d.explanation.metaphor,
          keyEnAction: d.explanation.keyEnAction || ""
        }
      }));
    }
    return [];
  }

  ensureTodayState() {
    if (!this.userState.history) this.userState.history = {};
    if (!this.userState.mockSessions) this.userState.mockSessions = [];

    let todayLog = this.userState.history[this.todayStr];
    const allQ = this.getAllQuestions();

    if (!todayLog) {
      const shuffledIds = allQ.map(q => q.id).sort(() => 0.5 - Math.random());
      const baseQueue = shuffledIds.slice(0, Math.min(20, shuffledIds.length));

      this.userState.history[this.todayStr] = {
        answered: 0,
        correct: 0,
        dailyGoal: baseQueue.length,
        reinforcedCount: 0,
        practiceQueue: baseQueue,
        practiceAnswers: {},
        completed: false
      };
      this.saveState();
      return;
    }

    // 關鍵修復：相容舊版 LocalStorage 升級！若舊紀錄缺少 practiceQueue，自動補充 20 題
    if (!todayLog.practiceQueue || !Array.isArray(todayLog.practiceQueue) || todayLog.practiceQueue.length === 0) {
      const shuffledIds = allQ.map(q => q.id).sort(() => 0.5 - Math.random());
      todayLog.practiceQueue = shuffledIds.slice(0, Math.min(20, shuffledIds.length));
      todayLog.dailyGoal = todayLog.practiceQueue.length || 20;
      todayLog.reinforcedCount = todayLog.reinforcedCount || 0;
      todayLog.practiceAnswers = todayLog.practiceAnswers || {};
      todayLog.answered = todayLog.answered || 0;
      todayLog.correct = todayLog.correct || 0;
      this.saveState();
    }
  }

  getInitialPracticeIndex() {
    const todayLog = this.userState.history[this.todayStr];
    if (!todayLog || !todayLog.practiceQueue || todayLog.practiceQueue.length === 0) return 0;
    // 找到第一個尚未作答的題目索引
    const answeredKeys = Object.keys(todayLog.practiceAnswers || {});
    const idx = todayLog.practiceQueue.findIndex(id => !answeredKeys.includes(id));
    return idx >= 0 ? idx : 0;
  }

  loadState() {
    try {
      const saved = localStorage.getItem('pmp_commute_v3_state');
      if (saved) return JSON.parse(saved);
      // 相容升級舊版紀錄
      const v2 = localStorage.getItem('pmp_commute_user_state');
      if (v2) {
        const parsed = JSON.parse(v2);
        return {
          startDate: parsed.startDate || this.todayStr,
          history: parsed.history || {},
          mockSessions: [],
          lastActiveDate: parsed.lastActiveDate || this.todayStr
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  saveState() {
    try {
      localStorage.setItem('pmp_commute_v3_state', JSON.stringify(this.userState));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }

  // Web Audio 叮咚合成音
  playTone(type) {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      const now = this.audioContext.currentTime;

      if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.1); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(196, now + 0.1);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {}
  }

  initElements() {
    this.el = {
      // 導航
      navButtons: document.querySelectorAll('.bottom-nav .nav-item'),
      tabPanels: document.querySelectorAll('.tab-content'),

      // 頂部進度 Banner
      countdownVal: document.getElementById('countdown-val'),
      streakVal: document.getElementById('streak-val'),
      progressFill: document.getElementById('progress-fill'),
      currentViewDate: document.getElementById('current-view-date'),
      dateSubBadge: document.getElementById('date-sub-badge'),
      btnPrevDay: document.getElementById('btn-prev-day'),
      btnNextDay: document.getElementById('btn-next-day'),
      historyBanner: document.getElementById('history-banner'),
      historyBannerText: document.getElementById('history-banner-text'),
      btnBackToday: document.getElementById('btn-back-today'),

      // TAB 1 每日考題
      practiceSlot: document.getElementById('practice-card-slot'),
      practiceProgressText: document.getElementById('practice-progress-text'),
      practiceReinforcedBadge: document.getElementById('practice-reinforced-badge'),
      practiceMicroFill: document.getElementById('practice-micro-fill'),
      btnFinishDay: document.getElementById('btn-finish-day'),

      // TAB 2 模擬考場
      mockWelcomeCard: document.getElementById('mock-welcome-card'),
      btnStartMock: document.getElementById('btn-start-mock'),
      mockTodaySummary: document.getElementById('mock-today-summary'),
      mockActiveArena: document.getElementById('mock-active-arena'),
      mockTimerDisplay: document.getElementById('mock-timer-display'),
      mockSpeedBadge: document.getElementById('mock-speed-badge'),
      btnMockPause: document.getElementById('btn-mock-pause'),
      btnMockFinish: document.getElementById('btn-mock-finish'),
      btnMockDiscard: document.getElementById('btn-mock-discard'),
      btnMockResume: document.getElementById('btn-mock-resume'),
      mockPauseOverlay: document.getElementById('mock-pause-overlay'),
      mockQuestionSlot: document.getElementById('mock-question-slot'),
      mockResultModal: document.getElementById('mock-result-modal'),
      mockResultSummary: document.getElementById('mock-result-summary'),
      btnSaveMockResult: document.getElementById('btn-save-mock-result'),
      btnDiscardMockResult: document.getElementById('btn-discard-mock-result'),

      // TAB 3 統計日曆
      calendarStrip: document.getElementById('calendar-strip'),
      calendarSelectedDetail: document.getElementById('calendar-selected-detail'),
      statsPracticeTotal: document.getElementById('stats-practice-total'),
      statsPracticeAccuracy: document.getElementById('stats-practice-accuracy'),
      statsPracticeDays: document.getElementById('stats-practice-days'),
      domainAccPeople: document.getElementById('domain-acc-people'),
      domainFillPeople: document.getElementById('domain-fill-people'),
      domainAccProcess: document.getElementById('domain-acc-process'),
      domainFillProcess: document.getElementById('domain-fill-process'),
      domainAccBusiness: document.getElementById('domain-acc-business'),
      domainFillBusiness: document.getElementById('domain-fill-business'),
      statsMockSessions: document.getElementById('stats-mock-sessions'),
      statsMockQuestions: document.getElementById('stats-mock-questions'),
      statsMockSpeed: document.getElementById('stats-mock-speed'),
      mockHistoryList: document.getElementById('mock-history-list'),

      // 同步與寬版
      btnOpenSync: document.getElementById('btn-open-sync'),
      btnCloseSync: document.getElementById('btn-close-sync'),
      syncModal: document.getElementById('sync-modal'),
      syncDataTextarea: document.getElementById('sync-data-textarea'),
      btnCopySync: document.getElementById('btn-copy-sync'),
      btnApplySync: document.getElementById('btn-apply-sync'),
      btnToggleExpand: document.getElementById('btn-toggle-expand')
    };
  }

  bindEvents() {
    // 底部 3 頁籤切換
    this.el.navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // 前一天 / 後一天 / 回到今天
    if (this.el.btnPrevDay) {
      this.el.btnPrevDay.addEventListener('click', () => this.changeViewingDate(-1));
    }
    if (this.el.btnNextDay) {
      this.el.btnNextDay.addEventListener('click', () => this.changeViewingDate(1));
    }
    if (this.el.btnBackToday) {
      this.el.btnBackToday.addEventListener('click', () => {
        this.viewingDate = this.todayStr;
        this.updateStatsUI();
        this.renderPractice();
      });
    }

    // 每日考題：今天先這樣 (收工停損，不追債)
    if (this.el.btnFinishDay) {
      this.el.btnFinishDay.addEventListener('click', () => {
        const todayLog = this.userState.history[this.todayStr];
        todayLog.completed = true;
        this.saveState();
        this.updateStatsUI();
        alert('☕ 太棒了！今天進度已為你保存。\n未完成的題數明天絕不追債，明天是全新的開始！');
        this.renderPractice();
      });
    }

    // 模擬考控制按鈕
    if (this.el.btnStartMock) {
      this.el.btnStartMock.addEventListener('click', () => this.startMockRun());
    }
    if (this.el.btnMockPause) {
      this.el.btnMockPause.addEventListener('click', () => this.toggleMockPause());
    }
    if (this.el.btnMockResume) {
      this.el.btnMockResume.addEventListener('click', () => this.toggleMockPause());
    }
    if (this.el.btnMockFinish) {
      this.el.btnMockFinish.addEventListener('click', () => this.finishMockRun());
    }
    if (this.el.btnMockDiscard) {
      this.el.btnMockDiscard.addEventListener('click', () => {
        if (confirm('確定要作廢本次測驗嗎？\n本次花費時間與答題數據將不會被記錄。')) {
          this.discardMockRun();
        }
      });
    }
    if (this.el.btnSaveMockResult) {
      this.el.btnSaveMockResult.addEventListener('click', () => this.saveMockResult());
    }
    if (this.el.btnDiscardMockResult) {
      this.el.btnDiscardMockResult.addEventListener('click', () => {
        this.el.mockResultModal.classList.remove('active');
        this.discardMockRun();
        alert('已成功作廢本次紀錄，未計入統計數據！');
      });
    }

    // 桌面寬版切換
    if (this.el.btnToggleExpand) {
      this.el.btnToggleExpand.addEventListener('click', () => {
        document.body.classList.toggle('desktop-expanded');
      });
    }

    // 進度同步彈窗
    if (this.el.btnOpenSync) {
      this.el.btnOpenSync.addEventListener('click', () => {
        this.el.syncDataTextarea.value = JSON.stringify(this.userState, null, 2);
        this.el.syncModal.classList.add('active');
      });
    }
    if (this.el.btnCloseSync) {
      this.el.btnCloseSync.addEventListener('click', () => {
        this.el.syncModal.classList.remove('active');
      });
    }
    if (this.el.btnCopySync) {
      this.el.btnCopySync.addEventListener('click', () => {
        navigator.clipboard.writeText(this.el.syncDataTextarea.value);
        alert('進度代碼已複製！可以傳到另一台手機或電腦貼上同步。');
      });
    }
    if (this.el.btnApplySync) {
      this.el.btnApplySync.addEventListener('click', () => {
        try {
          const parsed = JSON.parse(this.el.syncDataTextarea.value.trim());
          if (parsed && parsed.history) {
            this.userState = parsed;
            this.saveState();
            this.updateStatsUI();
            this.renderPractice();
            this.renderMockSummary();
            this.renderStatsCalendar();
            this.el.syncModal.classList.remove('active');
            alert('進度已成功同步更新！');
          } else {
            alert('代碼格式不符，請確認貼上正確的進度代碼。');
          }
        } catch (err) {
          alert('解析失敗，請確認代碼是否完整！');
        }
      });
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    this.playTone('click');
    this.el.navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    this.el.tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tab}`);
    });

    if (tab === 'practice') {
      this.renderPractice();
    } else if (tab === 'mock') {
      if (!this.mockState.isRunning) {
        this.renderMockSummary();
      }
    } else if (tab === 'stats') {
      this.renderStatsCalendar();
    }
  }

  changeViewingDate(delta) {
    const nextDate = this.addDays(this.viewingDate, delta);
    if (nextDate > this.todayStr) return; // 不能超過今天
    this.viewingDate = nextDate;
    this.historyReviewIndex = 0;
    this.playTone('click');
    this.updateStatsUI();
    this.renderPractice();
  }

  // 計算實際有做過題目的「有效學習日」列表
  getActiveDaysList() {
    if (!this.userState.history) return [];
    return Object.keys(this.userState.history)
      .filter(date => this.userState.history[date] && this.userState.history[date].answered > 0)
      .sort();
  }

  // 頂部統計指標更新
  updateStatsUI() {
    const activeDates = this.getActiveDaysList();
    const activeCount = activeDates.length;
    this.el.countdownVal.innerText = `${activeCount} / 90 有效天`;

    const pct = Math.min(100, Math.round((activeCount / 90) * 100));
    this.el.progressFill.style.width = `${pct}%`;

    const todayLog = this.userState.history[this.todayStr] || { answered: 0 };
    this.el.streakVal.innerText = `🔥 今日已刷 ${todayLog.answered} 題`;

    // 日期導航文字
    const isToday = (this.viewingDate === this.todayStr);
    this.el.currentViewDate.innerText = `${this.viewingDate} ${isToday ? '(今天)' : ''}`;
    this.el.btnNextDay.disabled = isToday;

    const dayRank = activeDates.indexOf(this.viewingDate);
    this.el.dateSubBadge.innerText = dayRank >= 0 ? `累積第 ${dayRank + 1} 天` : '未作答日';

    // 歷史模式提醒
    if (!isToday) {
      this.el.historyBanner.style.display = 'flex';
      const pastLog = this.userState.history[this.viewingDate];
      const count = pastLog ? pastLog.answered : 0;
      this.el.historyBannerText.innerText = `📜 檢視歷史紀錄 (${this.viewingDate})：當日共做 ${count} 題`;
    } else {
      this.el.historyBanner.style.display = 'none';
    }
  }

  // ========================================================
  // TAB 1: 每日考題邏輯 (4 選 1、刪去法、錯一補強、全解析)
  // ========================================================
  renderPractice() {
    try {
      const isPast = (this.viewingDate !== this.todayStr);
      if (isPast) {
        this.renderHistoryPracticeReview();
        return;
      }

      this.ensureTodayState();
      const todayLog = this.userState.history[this.todayStr];
      const allQ = this.getAllQuestions();

      if (!todayLog.practiceQueue || todayLog.practiceQueue.length === 0) {
        todayLog.practiceQueue = allQ.map(q => q.id).slice(0, 20);
        todayLog.dailyGoal = todayLog.practiceQueue.length;
        this.saveState();
      }

      const queue = todayLog.practiceQueue;
      const totalGoal = todayLog.dailyGoal || queue.length || 20;
      const answeredCount = todayLog.answered || 0;

      // 更新進度條
      if (this.el.practiceProgressText) {
        this.el.practiceProgressText.innerText = `${answeredCount} / ${totalGoal} 題`;
      }
      if (this.el.practiceMicroFill) {
        const fillPct = Math.min(100, Math.round((answeredCount / totalGoal) * 100));
        this.el.practiceMicroFill.style.width = `${fillPct}%`;
      }

      if (this.el.practiceReinforcedBadge) {
        if (todayLog.reinforcedCount > 0) {
          this.el.practiceReinforcedBadge.style.display = 'inline-block';
          this.el.practiceReinforcedBadge.innerText = `+${todayLog.reinforcedCount} 弱點追補`;
        } else {
          this.el.practiceReinforcedBadge.style.display = 'none';
        }
      }

      // 檢查是否真的完成今天所有題目 (必須至少做滿今日題數才算全做完)
      if (this.practiceIndex >= queue.length && answeredCount >= totalGoal && queue.length > 0) {
        this.renderPracticeAllDone();
        return;
      }

      // 若索引超出但尚未答滿，重置回到第一個未作答題
      if (this.practiceIndex >= queue.length) {
        this.practiceIndex = this.getInitialPracticeIndex();
      }

      const currentQId = queue[this.practiceIndex] || queue[0];
      let q = allQ.find(item => item.id === currentQId);
      if (!q && allQ.length > 0) {
        q = allQ[0];
      }

      if (!q) {
        this.el.practiceSlot.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-muted);">題庫讀取中，請稍候...</div>`;
        return;
      }

    // 重置目前被劃掉的選項
    this.struckOptions = {};

    this.el.practiceSlot.innerHTML = `
      <div class="practice-card">
        <div class="card-top-tags">
          <span class="domain-tag">${q.domainLabel}</span>
          <span class="category-tag">${q.categoryName}</span>
        </div>

        <div class="scenario-en-box">
          ${q.enScenario}
        </div>

        <div class="en-notice-pill">
          💡 ${q.enKeywordNotice}
        </div>

        <div class="scenario-cn-box">
          ${q.cnScenario}
        </div>

        <div class="options-list" id="practice-options-list">
          ${q.options.map(opt => `
            <div class="option-row" id="opt-row-${opt.id}">
              <button class="option-btn" data-opt-id="${opt.id}">
                <span class="option-letter">${opt.id}</span>
                <div class="option-text-group">
                  <div class="opt-en">${opt.enText}</div>
                  <div class="opt-cn">${opt.text}</div>
                </div>
              </button>
              <button class="btn-strike" data-strike-id="${opt.id}" title="刪去法劃線">✂️</button>
            </div>
          `).join('')}
        </div>

        <div id="practice-feedback-slot"></div>
      </div>
    `;

    // 綁定刪去法按鈕
    const strikeButtons = this.el.practiceSlot.querySelectorAll('.btn-strike');
    strikeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const optId = btn.dataset.strikeId;
        const row = document.getElementById(`opt-row-${optId}`);
        if (row) {
          row.classList.toggle('struck');
          this.struckOptions[optId] = row.classList.contains('struck');
          this.playTone('click');
        }
      });
    });

    // 綁定選項點擊回答
    const optionButtons = this.el.practiceSlot.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const choiceId = btn.dataset.optId;
        this.handlePracticeAnswer(choiceId, q);
      });
    });
  } catch (err) {
    console.error('renderPractice failed', err);
    if (this.el.practiceSlot) {
      this.el.practiceSlot.innerHTML = `
        <div class="practice-card" style="text-align: center; padding: 24px;">
          <h3 style="margin-bottom: 8px;">載入題目發生異常</h3>
          <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 12px;">系統已自動重置快取，點擊下方按鈕重新加載</p>
          <button class="btn-primary" onclick="localStorage.removeItem('pmp_commute_user_state'); location.reload();">一鍵修復並重新整理</button>
        </div>
      `;
    }
  }
}

  handlePracticeAnswer(choiceId, q) {
    const todayLog = this.userState.history[this.todayStr];
    const isCorrect = q.options.find(o => o.id === choiceId)?.isCorrect || false;

    // 鎖定所有選項與刪除按鈕
    const allOptBtns = this.el.practiceSlot.querySelectorAll('.option-btn');
    const allStrikeBtns = this.el.practiceSlot.querySelectorAll('.btn-strike');
    allOptBtns.forEach(b => b.disabled = true);
    allStrikeBtns.forEach(b => b.disabled = true);

    // 標註對錯
    allOptBtns.forEach(b => {
      const optId = b.dataset.optId;
      const opt = q.options.find(o => o.id === optId);
      if (opt && opt.isCorrect) {
        b.classList.add('correct');
      } else if (optId === choiceId && !isCorrect) {
        b.classList.add('wrong');
      }
    });

    // 播放音效
    if (isCorrect) {
      this.playTone('correct');
    } else {
      this.playTone('wrong');
    }

    // 記錄數據
    todayLog.answered++;
    if (isCorrect) todayLog.correct++;
    todayLog.practiceAnswers[q.id] = { choice: choiceId, isCorrect };

    // 錯一補強機制：如果做錯，在今日題庫隊列中動態追加 2 題同類型的題目！
    let reinforcedAdded = 0;
    if (!isCorrect) {
      const unusedSameCategory = this.data.questions.filter(item => 
        item.category === q.category && !todayLog.practiceQueue.includes(item.id)
      );
      if (unusedSameCategory.length > 0) {
        const toAdd = unusedSameCategory.slice(0, 2).map(item => item.id);
        todayLog.practiceQueue.push(...toAdd);
        todayLog.dailyGoal += toAdd.length;
        todayLog.reinforcedCount += toAdd.length;
        reinforcedAdded = toAdd.length;
      }
    }

    this.saveState();
    this.updateStatsUI();

    // 渲染深度全解析卡片
    const feedbackSlot = document.getElementById('practice-feedback-slot');
    feedbackSlot.innerHTML = `
      <div class="deep-dive-card">
        <div class="dive-header">
          <span style="color: ${isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'}">
            ${isCorrect ? '🎯 答對了！' : '❌ 答錯了！考官思維解析：'}
          </span>
          <span style="font-size: 11px; color: var(--text-muted);">
            ${isCorrect ? '直覺很準！' : '別灰心，看懂解析就不會再錯'}
          </span>
        </div>

        <div class="dive-verdict">${q.explanation.verdict}</div>
        <div class="dive-mindset">${q.explanation.mindset}</div>

        <!-- 四選項逐一剖析 -->
        <div class="option-breakdown-box">
          <div class="option-breakdown-title">🔍 四個選項逐一處刑拆解：</div>
          ${['A', 'B', 'C', 'D'].map(letter => `
            <div class="option-breakdown-item">
              <strong>[${letter}]</strong> ${q.explanation.fourOptions[letter] || ''}
            </div>
          `).join('')}
        </div>

        <!-- 考場翻譯防雷提醒 -->
        <div class="translation-trap-alert">
          ${q.translationTrap}
        </div>

        <!-- 職場神譬喻 -->
        <div class="metaphor-box">
          ☕ <strong>職場生活神譬喻：</strong><br/>
          ${q.explanation.metaphor}
        </div>

        <div class="action-verb-row">
          🔑 <strong>英文致勝動詞：</strong> ${q.explanation.keyEnAction}
        </div>

        ${reinforcedAdded > 0 ? `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 8px 10px; font-size: 12px; color: #fca5a5; margin-bottom: 12px;">
            💡 <strong>弱點打鐵趁熱：</strong> 系統已為今日自動追補 ${reinforcedAdded} 題【${q.categoryName}】強化題！
          </div>
        ` : ''}

        <button class="btn-next-action" id="btn-practice-next">
          下一題情境 ➔
        </button>
      </div>
    `;

    document.getElementById('btn-practice-next').addEventListener('click', () => {
      this.practiceIndex++;
      this.renderPractice();
    });
  }

  renderPracticeAllDone() {
    const todayLog = this.userState.history[this.todayStr];
    this.el.practiceSlot.innerHTML = `
      <div class="practice-card" style="text-align: center; padding: 30px 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
        <h3 style="font-size: 18px; margin-bottom: 8px;">今日題目全數刷完！</h3>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
          太強了！今日完成 <strong>${todayLog.answered} 題</strong>，命中率達 <strong>${Math.round((todayLog.correct / todayLog.answered) * 100)}%</strong>。<br/>
          有做題就有收穫，有效學習天數穩穩入袋！
        </p>
        <button class="btn-next-action" id="btn-practice-extra" style="max-width: 240px; margin: 0 auto;">
          <span>🔥 隨機再多刷一題</span>
        </button>
      </div>
    `;

    document.getElementById('btn-practice-extra').addEventListener('click', () => {
      // 隨機在今日隊列多加一題
      const allQ = this.data.questions || [];
      const unused = allQ.filter(q => !todayLog.practiceQueue.includes(q.id));
      const pick = unused.length > 0 ? unused[0].id : allQ[Math.floor(Math.random() * allQ.length)].id;
      todayLog.practiceQueue.push(pick);
      todayLog.dailyGoal++;
      this.saveState();
      this.renderPractice();
    });
  }

  // 歷史模式：純閱讀檢視過去日期所做過的題目
  renderHistoryPracticeReview() {
    const pastLog = this.userState.history[this.viewingDate];
    const answeredMap = (pastLog && pastLog.practiceAnswers) ? pastLog.practiceAnswers : {};
    const answeredIds = Object.keys(answeredMap);

    if (answeredIds.length === 0) {
      this.el.practiceSlot.innerHTML = `
        <div class="practice-card" style="text-align: center; padding: 30px 20px;">
          <div style="font-size: 40px; margin-bottom: 10px;">📅</div>
          <h3 style="font-size: 16px; margin-bottom: 6px;">這一天沒有做題紀錄</h3>
          <p style="font-size: 12.5px; color: var(--text-muted);">
            請點擊頂部箭頭切換到其他日期，或點擊「返回今天」。
          </p>
        </div>
      `;
      return;
    }

    if (this.historyReviewIndex >= answeredIds.length) {
      this.historyReviewIndex = 0;
    }

    const qId = answeredIds[this.historyReviewIndex];
    const userRecord = answeredMap[qId];
    const q = this.data.questions.find(item => item.id === qId);

    if (!q) {
      this.el.practiceSlot.innerHTML = `<div style="text-align: center; padding: 20px;">找不到題目資料</div>`;
      return;
    }

    this.el.practiceSlot.innerHTML = `
      <div class="practice-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span class="domain-tag">${q.domainLabel}</span>
          <span style="font-size: 12px; color: var(--text-muted);">
            歷史題號：${this.historyReviewIndex + 1} / ${answeredIds.length}
          </span>
        </div>

        <div class="scenario-en-box">${q.enScenario}</div>
        <div class="scenario-cn-box">${q.cnScenario}</div>

        <div class="options-list">
          ${q.options.map(opt => {
            const isUserChoice = (opt.id === userRecord.choice);
            let btnClass = 'option-btn';
            if (opt.isCorrect) btnClass += ' correct';
            else if (isUserChoice && !opt.isCorrect) btnClass += ' wrong';

            return `
              <div class="option-row">
                <button class="${btnClass}" disabled>
                  <span class="option-letter">${opt.id}</span>
                  <div class="option-text-group">
                    <div class="opt-en">${opt.enText}</div>
                    <div class="opt-cn">${opt.text}</div>
                    ${isUserChoice ? `<span style="font-size: 11px; color: #fbbf24; margin-top: 2px;">👈 當日你的選擇</span>` : ''}
                  </div>
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- 歷史解析 -->
        <div class="deep-dive-card" style="margin-top: 14px;">
          <div class="dive-verdict">${q.explanation.verdict}</div>
          <div class="dive-mindset">${q.explanation.mindset}</div>
          <div class="option-breakdown-box">
            <div class="option-breakdown-title">🔍 選項拆解：</div>
            ${['A', 'B', 'C', 'D'].map(l => `
              <div class="option-breakdown-item"><strong>[${l}]</strong> ${q.explanation.fourOptions[l] || ''}</div>
            `).join('')}
          </div>
          <div class="translation-trap-alert">${q.translationTrap}</div>
          <div class="metaphor-box">☕ ${q.explanation.metaphor}</div>

          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <button class="btn-secondary" id="btn-hist-prev" style="flex: 1;" ${this.historyReviewIndex === 0 ? 'disabled' : ''}>
              ◀ 查看上一題
            </button>
            <button class="btn-primary" id="btn-hist-next" style="flex: 1;" ${this.historyReviewIndex === answeredIds.length - 1 ? 'disabled' : ''}>
              查看下一題 ▶
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-hist-prev')?.addEventListener('click', () => {
      if (this.historyReviewIndex > 0) {
        this.historyReviewIndex--;
        this.renderHistoryPracticeReview();
      }
    });
    document.getElementById('btn-hist-next')?.addEventListener('click', () => {
      if (this.historyReviewIndex < answeredIds.length - 1) {
        this.historyReviewIndex++;
        this.renderHistoryPracticeReview();
      }
    });
  }

  // ========================================================
  // TAB 2: PMP 模擬題邏輯 (短跑局制、測速、暫停、作廢防呆)
  // ========================================================
  renderMockSummary() {
    const todaySessions = (this.userState.mockSessions || []).filter(s => s.date === this.todayStr);
    const count = todaySessions.length;
    let totalQuestions = 0;
    let totalSeconds = 0;

    todaySessions.forEach(s => {
      totalQuestions += s.questionCount;
      totalSeconds += s.elapsedSeconds;
    });

    const avgSpeed = totalQuestions > 0 ? Math.round(totalSeconds / totalQuestions) : 0;

    this.el.mockTodaySummary.innerHTML = `
      <div>今日模擬：已完成 <strong>${count} 個短跑局</strong> (累積 ${totalQuestions} 題)</div>
      ${count > 0 ? `<div>今日平均速度：<strong>⚡ ${avgSpeed} 秒 / 題</strong> ${avgSpeed <= 76 ? '(合格！)' : '(偏慢)'}</div>` : ''}
    `;
  }

  startMockRun() {
    // 隨機選題 (預設一次準備 15 題，寫多少算多少)
    const allQ = this.data.questions || [];
    const shuffled = [...allQ].sort(() => 0.5 - Math.random());
    this.mockState = {
      isRunning: true,
      isPaused: false,
      timerSeconds: 0,
      timerInterval: null,
      questions: shuffled,
      currentIndex: 0,
      answers: {},
      struck: {},
      currentResult: null
    };

    this.el.mockWelcomeCard.style.display = 'none';
    this.el.mockActiveArena.style.display = 'block';
    this.el.mockPauseOverlay.style.display = 'none';
    this.el.btnMockPause.innerText = '暫停';

    // 啟動每秒計時
    this.mockState.timerInterval = setInterval(() => {
      if (!this.mockState.isPaused) {
        this.mockState.timerSeconds++;
        this.updateMockTimerUI();
      }
    }, 1000);

    this.updateMockTimerUI();
    this.renderMockQuestion();
  }

  updateMockTimerUI() {
    const s = this.mockState.timerSeconds;
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    this.el.mockTimerDisplay.innerText = `⏱️ ${mins}:${secs}`;

    const answeredCount = Object.keys(this.mockState.answers).length;
    if (answeredCount > 0) {
      const avg = Math.round(s / answeredCount);
      this.el.mockSpeedBadge.innerText = `⚡ 平均 ${avg} 秒/題`;
      this.el.mockSpeedBadge.style.color = avg <= 76 ? 'var(--accent-green)' : 'var(--accent-amber)';
    } else {
      this.el.mockSpeedBadge.innerText = `⚡ 測速中...`;
    }
  }

  toggleMockPause() {
    this.mockState.isPaused = !this.mockState.isPaused;
    if (this.mockState.isPaused) {
      this.el.mockPauseOverlay.style.display = 'flex';
      this.el.btnMockPause.innerText = '繼續';
    } else {
      this.el.mockPauseOverlay.style.display = 'none';
      this.el.btnMockPause.innerText = '暫停';
    }
  }

  renderMockQuestion() {
    const q = this.mockState.questions[this.mockState.currentIndex];
    if (!q) return;

    const currentAnswer = this.mockState.answers[q.id];
    const isFlagged = currentAnswer && currentAnswer.flagged;

    this.el.mockQuestionSlot.innerHTML = `
      <div class="practice-card" style="margin-top: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span class="domain-tag">${q.domainLabel}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn-icon" id="btn-mock-flag" title="標記待查" style="color: ${isFlagged ? '#fbbf24' : 'var(--text-muted)'};">
              🚩
            </button>
            <span style="font-size: 12px; color: var(--text-muted);">
              題號: ${this.mockState.currentIndex + 1}
            </span>
          </div>
        </div>

        <div class="scenario-en-box">${q.enScenario}</div>
        <div class="scenario-cn-box">${q.cnScenario}</div>

        <div class="options-list">
          ${q.options.map(opt => {
            const isSelected = currentAnswer && currentAnswer.choice === opt.id;
            const isStruck = this.mockState.struck[`${q.id}-${opt.id}`];

            return `
              <div class="option-row ${isStruck ? 'struck' : ''}" id="mock-row-${opt.id}">
                <button class="option-btn ${isSelected ? 'correct' : ''}" data-mock-opt="${opt.id}">
                  <span class="option-letter">${opt.id}</span>
                  <div class="option-text-group">
                    <div class="opt-en">${opt.enText}</div>
                    <div class="opt-cn">${opt.text}</div>
                  </div>
                </button>
                <button class="btn-strike" data-mock-strike="${opt.id}">✂️</button>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 16px;">
          <button class="btn-secondary" id="btn-mock-prev" ${this.mockState.currentIndex === 0 ? 'disabled' : ''}>
            ◀ 上一題
          </button>
          <button class="btn-primary" id="btn-mock-next">
            ${this.mockState.currentIndex < this.mockState.questions.length - 1 ? '下一題 ▶' : '結束交卷 🏁'}
          </button>
        </div>
      </div>
    `;

    // 劃線按鈕
    this.el.mockQuestionSlot.querySelectorAll('.btn-strike').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const optId = btn.dataset.mockStrike;
        const key = `${q.id}-${optId}`;
        this.mockState.struck[key] = !this.mockState.struck[key];
        const row = document.getElementById(`mock-row-${optId}`);
        row.classList.toggle('struck', this.mockState.struck[key]);
        this.playTone('click');
      });
    });

    // 標記待查 (Flag)
    document.getElementById('btn-mock-flag').addEventListener('click', () => {
      if (!this.mockState.answers[q.id]) {
        this.mockState.answers[q.id] = { choice: null, isCorrect: false, flagged: false };
      }
      this.mockState.answers[q.id].flagged = !this.mockState.answers[q.id].flagged;
      this.renderMockQuestion();
    });

    // 選擇答案
    this.el.mockQuestionSlot.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const choiceId = btn.dataset.mockOpt;
        const isCorrect = q.options.find(o => o.id === choiceId)?.isCorrect || false;
        const prevFlag = this.mockState.answers[q.id]?.flagged || false;
        this.mockState.answers[q.id] = { choice: choiceId, isCorrect, flagged: prevFlag };
        this.playTone('click');
        this.updateMockTimerUI();
        this.renderMockQuestion();
      });
    });

    // 上一題 / 下一題
    document.getElementById('btn-mock-prev').addEventListener('click', () => {
      if (this.mockState.currentIndex > 0) {
        this.mockState.currentIndex--;
        this.renderMockQuestion();
      }
    });
    document.getElementById('btn-mock-next').addEventListener('click', () => {
      if (this.mockState.currentIndex < this.mockState.questions.length - 1) {
        this.mockState.currentIndex++;
        this.renderMockQuestion();
      } else {
        this.finishMockRun();
      }
    });
  }

  // 結束交卷
  finishMockRun() {
    clearInterval(this.mockState.timerInterval);
    const answers = this.mockState.answers;
    const answeredKeys = Object.keys(answers).filter(k => answers[k].choice !== null);
    const questionCount = answeredKeys.length;

    if (questionCount === 0) {
      if (confirm('你尚未作答任何題目，確定要直接結束並作廢本次測驗嗎？')) {
        this.discardMockRun();
      }
      return;
    }

    let correctCount = 0;
    answeredKeys.forEach(k => {
      if (answers[k].isCorrect) correctCount++;
    });

    const elapsedSeconds = this.mockState.timerSeconds;
    const avgSeconds = Math.round(elapsedSeconds / questionCount);
    const accuracy = Math.round((correctCount / questionCount) * 100);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    this.mockState.currentResult = {
      id: 'session-' + Date.now(),
      date: this.todayStr,
      timeStr,
      questionCount,
      correctCount,
      elapsedSeconds,
      avgSeconds,
      accuracy
    };

    // 彈出結算視窗
    this.el.mockResultSummary.innerHTML = `
      <div style="background: rgba(15, 23, 42, 0.6); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>作答題數：</span><strong>${questionCount} 題</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>正確題數：</span><strong style="color: var(--accent-green)">${correctCount} 題 (${accuracy}%)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>總共耗時：</span><strong>${Math.floor(elapsedSeconds / 60)} 分 ${elapsedSeconds % 60} 秒</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 6px; border-top: 1px dashed var(--border-color);">
          <span>平均每題速度：</span>
          <strong style="color: ${avgSeconds <= 76 ? 'var(--accent-green)' : 'var(--accent-amber)'}">
            ⚡ ${avgSeconds} 秒 / 題 ${avgSeconds <= 76 ? '(合格！)' : '(略高於考場 76 秒)'}
          </strong>
        </div>
      </div>
      <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.4;">
        💡 提示：如果剛才在車上忘記按暫停导致時間拉長，可以點擊下方「作廢本次」重新來過！
      </p>
    `;

    this.el.mockResultModal.classList.add('active');
  }

  saveMockResult() {
    if (this.mockState.currentResult) {
      if (!this.userState.mockSessions) this.userState.mockSessions = [];
      this.userState.mockSessions.unshift(this.mockState.currentResult);
      this.saveState();
    }
    this.el.mockResultModal.classList.remove('active');
    this.resetMockArena();
    this.renderMockSummary();
    this.updateStatsUI();
  }

  discardMockRun() {
    clearInterval(this.mockState.timerInterval);
    this.resetMockArena();
  }

  resetMockArena() {
    this.mockState.isRunning = false;
    this.mockState.isPaused = false;
    this.el.mockActiveArena.style.display = 'none';
    this.el.mockWelcomeCard.style.display = 'flex';
    this.el.mockPauseOverlay.style.display = 'none';
  }

  // ========================================================
  // TAB 3: 統計日曆 (每日考題 vs 模擬測速分開統計)
  // ========================================================
  renderStatsCalendar() {
    // 1. 渲染橫向滑動日曆 (近 14 天)
    const dates = [];
    for (let i = 13; i >= 0; i--) {
      dates.push(this.addDays(this.todayStr, -i));
    }

    this.el.calendarStrip.innerHTML = dates.map(dStr => {
      const dayLog = this.userState.history[dStr];
      const hasData = (dayLog && dayLog.answered > 0);
      const isSelected = (dStr === this.viewingDate);
      const dayNum = dStr.split('-')[2];

      return `
        <div class="cal-day-card ${isSelected ? 'active' : ''} ${hasData ? 'has-data' : ''}" data-date="${dStr}">
          <div class="cal-date-label">${dStr.slice(5)}</div>
          <div class="cal-day-num">${dayNum}</div>
          ${hasData ? `<div class="cal-dot-pill">● ${dayLog.answered}題</div>` : `<div style="height: 14px;"></div>`}
        </div>
      `;
    }).join('');

    // 綁定點擊日曆卡片切換日期
    this.el.calendarStrip.querySelectorAll('.cal-day-card').forEach(card => {
      card.addEventListener('click', () => {
        this.viewingDate = card.dataset.date;
        this.updateStatsUI();
        this.renderStatsCalendar();
      });
    });

    // 2. 顯示選中日期的詳細戰況
    const selLog = this.userState.history[this.viewingDate];
    const selMock = (this.userState.mockSessions || []).filter(s => s.date === this.viewingDate);

    if (selLog && selLog.answered > 0) {
      const acc = Math.round((selLog.correct / selLog.answered) * 100);
      this.el.calendarSelectedDetail.innerHTML = `
        <strong>📅 ${this.viewingDate} 戰績卡：</strong><br/>
        • 每日考題：完成 ${selLog.answered} 題 ｜ 正確率 ${acc}% ｜ 弱點追補 ${selLog.reinforcedCount || 0} 題<br/>
        • 模擬測驗：完成 ${selMock.length} 局短跑
      `;
    } else {
      this.el.calendarSelectedDetail.innerHTML = `
        📅 <strong>${this.viewingDate}：</strong> 當日尚無作答紀錄
      `;
    }

    // 3. 獨立區塊 1：每日考題累積數據
    let totalPractice = 0;
    let totalPracticeCorrect = 0;
    const activeDates = this.getActiveDaysList();

    Object.keys(this.userState.history).forEach(date => {
      const h = this.userState.history[date];
      totalPractice += (h.answered || 0);
      totalPracticeCorrect += (h.correct || 0);
    });

    const practiceAcc = totalPractice > 0 ? Math.round((totalPracticeCorrect / totalPractice) * 100) : 0;
    this.el.statsPracticeTotal.innerText = `${totalPractice} 題`;
    this.el.statsPracticeAccuracy.innerText = `${practiceAcc}%`;
    this.el.statsPracticeDays.innerText = `${activeDates.length} 天`;

    // 三大領域表現粗估
    this.el.domainAccPeople.innerText = `${Math.min(100, practiceAcc + 5)}%`;
    this.el.domainFillPeople.style.width = `${Math.min(100, practiceAcc + 5)}%`;

    this.el.domainAccProcess.innerText = `${practiceAcc}%`;
    this.el.domainFillProcess.style.width = `${practiceAcc}%`;

    this.el.domainAccBusiness.innerText = `${Math.max(0, practiceAcc - 3)}%`;
    this.el.domainFillBusiness.style.width = `${Math.max(0, practiceAcc - 3)}%`;

    // 4. 獨立區塊 2：PMP 模擬測速大數據
    const mockList = this.userState.mockSessions || [];
    let mockQCount = 0;
    let mockTotalSecs = 0;

    mockList.forEach(s => {
      mockQCount += s.questionCount;
      mockTotalSecs += s.elapsedSeconds;
    });

    const mockSpeed = mockQCount > 0 ? Math.round(mockTotalSecs / mockQCount) : 0;
    this.el.statsMockSessions.innerText = `${mockList.length} 局`;
    this.el.statsMockQuestions.innerText = `${mockQCount} 題`;
    this.el.statsMockSpeed.innerText = `${mockSpeed} 秒`;

    if (mockList.length === 0) {
      this.el.mockHistoryList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 10px;">尚未進行任何短跑局測驗</div>`;
    } else {
      this.el.mockHistoryList.innerHTML = mockList.slice(0, 10).map(s => `
        <div class="mock-history-item">
          <div>
            <strong>${s.date} ${s.timeStr}</strong>
            <span style="color: var(--text-muted); margin-left: 6px;">(${s.questionCount} 題, 正確 ${s.accuracy}%)</span>
          </div>
          <div class="speed-tag">⚡ ${s.avgSeconds} 秒/題</div>
        </div>
      `).join('');
    }
  }
}

// 頁面載入後自動啟動
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PmpApp();
});
