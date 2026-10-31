// PMP 通勤秒懂衝刺王 (PMP Commute Master)
// 專為通勤設計的手機優先邏輯與跨裝置同步控制

class PmpApp {
  constructor() {
    this.data = window.PMP_DATA;
    this.currentTab = 'duel';
    this.duelIndex = 0;
    this.radarIndex = 0;
    this.englishFirst = true; // 預設開啟「英文關鍵字優先模式」
    this.chineseRevealed = false;
    
    // 預設使用者數據
    this.userState = this.loadState() || {
      streakDays: 1,
      todayAnswered: 0,
      totalCorrect: 0,
      duelProgress: {},
      radarProgress: {},
      targetDate: this.calculateTargetDate(90),
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    this.audioContext = null;
    this.soundEnabled = true;

    this.initElements();
    this.bindEvents();
    this.updateStatsUI();
    this.renderDuel();
    this.renderRadar();
    this.renderKeywords();
    this.renderCheatSheet();
  }

  // 計算 90 天衝刺目標日
  calculateTargetDate(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }

  // 讀取進度
  loadState() {
    try {
      const saved = localStorage.getItem('pmp_commute_user_state');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  // 儲存進度 (LocalStorage)
  saveState() {
    try {
      localStorage.setItem('pmp_commute_user_state', JSON.stringify(this.userState));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }

  // 輕量 Web Audio API 音效合成器 (完全無需網路或外部音檔)
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
        // 清脆愉悅的雙音叮咚 (Reward chime)
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.1); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'wrong') {
        // 柔和的低音反饋 (Gentle buzz, not harsh)
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(196, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'swipe') {
        // 短促翻頁聲
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // Audio not permitted yet
    }
  }

  initElements() {
    this.el = {
      countdownVal: document.getElementById('countdown-val'),
      streakVal: document.getElementById('streak-val'),
      progressFill: document.getElementById('progress-fill'),
      navButtons: document.querySelectorAll('.nav-item'),
      tabPanels: document.querySelectorAll('.tab-content'),
      
      // Duel Elements
      duelContainer: document.getElementById('duel-panel-card'),
      
      // Radar Elements
      radarContainer: document.getElementById('radar-card-container'),
      radarFeedback: document.getElementById('radar-feedback'),
      
      // Keywords Elements
      keywordList: document.getElementById('keyword-list'),
      keywordSearch: document.getElementById('keyword-search-input'),
      
      // Cheat Sheet Elements
      cheatSheetList: document.getElementById('cheat-sheet-list'),

      // Modal
      syncModal: document.getElementById('sync-modal'),
      btnOpenSync: document.getElementById('btn-open-sync'),
      btnCloseSync: document.getElementById('btn-close-sync'),
      syncDataTextarea: document.getElementById('sync-data-textarea'),
      btnCopySync: document.getElementById('btn-copy-sync'),
      btnApplySync: document.getElementById('btn-apply-sync'),

      // Desktop Expand Toggle
      btnToggleExpand: document.getElementById('btn-toggle-expand'),
    };
  }

  bindEvents() {
    // 底部 Tab 切換
    this.el.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // 關鍵字搜尋
    if (this.el.keywordSearch) {
      this.el.keywordSearch.addEventListener('input', (e) => {
        this.renderKeywords(e.target.value.toLowerCase());
      });
    }

    // 桌面寬版切換
    if (this.el.btnToggleExpand) {
      this.el.btnToggleExpand.addEventListener('click', () => {
        document.body.classList.toggle('desktop-expanded');
        const isExp = document.body.classList.contains('desktop-expanded');
        this.el.btnToggleExpand.innerHTML = isExp 
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M4 10h6m0 0V4m0 6L3 3m17 7h-6m0 0V4m0 6l7-7"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
      });
    }

    // 同步彈窗
    if (this.el.btnOpenSync) {
      this.el.btnOpenSync.addEventListener('click', () => {
        this.openSyncModal();
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
        alert('進度代碼已複製！可以傳到手機或電腦貼上同步。');
      });
    }
    if (this.el.btnApplySync) {
      this.el.btnApplySync.addEventListener('click', () => {
        try {
          const parsed = JSON.parse(this.el.syncDataTextarea.value.trim());
          if (parsed && parsed.targetDate) {
            this.userState = parsed;
            this.saveState();
            this.updateStatsUI();
            this.el.syncModal.classList.remove('active');
            alert('進度已成功同步更新！');
            this.renderDuel();
          } else {
            alert('格式不符，請確認貼上正確的進度代碼。');
          }
        } catch (err) {
          alert('解析失敗，請確認代碼是否完整！');
        }
      });
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    this.playTone('swipe');

    this.el.navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    this.el.tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tab}`);
    });
  }

  updateStatsUI() {
    const today = new Date();
    const target = new Date(this.userState.targetDate);
    const diffTime = target - today;
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    if (this.el.countdownVal) this.el.countdownVal.innerText = `${diffDays} 天`;
    if (this.el.streakVal) this.el.streakVal.innerText = `🔥 今日已刷 ${this.userState.todayAnswered} 題`;

    // 進度條比例 (以 100 題為里程碑計算)
    const progressPct = Math.min(100, Math.max(10, Math.round((this.userState.totalCorrect / 50) * 100)));
    if (this.el.progressFill) this.el.progressFill.style.width = `${progressPct}%`;
  }

  // 1. 渲染二選一決鬥題 (Duel)
  renderDuel() {
    const duel = this.data.duels[this.duelIndex];
    if (!duel) return;

    this.chineseRevealed = !this.englishFirst;

    const keywordsHtml = duel.keywords.map(kw => `<span class="keyword-chip">🔑 ${kw}</span>`).join('');
    const enText = duel.enScenarioHighlighted || duel.enScenario;

    this.el.duelContainer.innerHTML = `
      <div class="duel-badge-row">
        <span class="domain-tag">${duel.domainLabel}</span>
        <button class="lang-mode-toggle ${this.englishFirst ? 'active' : ''}" id="btn-toggle-lang-mode">
          ${this.englishFirst ? '🔤 英文抓關鍵字模式 (開)' : '🌏 中英同步模式'}
        </button>
      </div>

      <div class="scenario-box">
        <div class="scenario-header-row">
          <h3 class="scenario-title">${duel.title}</h3>
          <span style="font-size: 11px; color: var(--text-muted);">${this.duelIndex + 1} / ${this.data.duels.length}</span>
        </div>

        <!-- 1. 英文優先大字題幹 (高亮核心關鍵字) -->
        <div class="scenario-en-box">
          ${enText}
        </div>

        <!-- 2. 中文翻譯 (可遮蔽 / 點擊展開) -->
        <div>
          <button class="btn-reveal-cn" id="btn-toggle-cn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span id="label-toggle-cn">${this.chineseRevealed ? '隱藏中文翻譯' : '點此偷看中文翻譯 (先看英文5秒)'}</span>
          </button>
          <div class="scenario-cn-box ${this.chineseRevealed ? '' : 'blurred'}" id="scenario-cn-box">
            ${duel.cnScenario}
          </div>
        </div>
      </div>

      <!-- 關鍵字提示標籤 -->
      <div class="keyword-chips">
        ${keywordsHtml}
      </div>

      <!-- 選項按鈕 (中英對照，英文在上) -->
      <div class="choices-container" id="choices-box">
        <button class="choice-btn" data-choice="A">
          <span class="choice-letter">A</span>
          <div>
            <div style="color: var(--accent-blue); font-size: 13.5px; font-weight: 600; margin-bottom: 2px;">
              ${duel.optionA.enText || ''}
            </div>
            <div style="color: var(--text-muted); font-size: 12.5px;">
              ${duel.optionA.text}
            </div>
          </div>
        </button>
        <button class="choice-btn" data-choice="B">
          <span class="choice-letter">B</span>
          <div>
            <div style="color: var(--accent-blue); font-size: 13.5px; font-weight: 600; margin-bottom: 2px;">
              ${duel.optionB.enText || ''}
            </div>
            <div style="color: var(--text-muted); font-size: 12.5px;">
              ${duel.optionB.text}
            </div>
          </div>
        </button>
      </div>

      <div id="duel-feedback-slot"></div>
    `;

    // 模式切換按鈕事件
    document.getElementById('btn-toggle-lang-mode').addEventListener('click', () => {
      this.englishFirst = !this.englishFirst;
      this.renderDuel();
    });

    // 偷看中文按鈕事件
    const btnToggleCn = document.getElementById('btn-toggle-cn');
    const cnBox = document.getElementById('scenario-cn-box');
    const labelToggleCn = document.getElementById('label-toggle-cn');

    const toggleCnAction = () => {
      this.chineseRevealed = !this.chineseRevealed;
      cnBox.classList.toggle('blurred', !this.chineseRevealed);
      labelToggleCn.innerText = this.chineseRevealed ? '隱藏中文翻譯' : '點此偷看中文翻譯 (先看英文5秒)';
    };

    btnToggleCn.addEventListener('click', toggleCnAction);
    cnBox.addEventListener('click', () => {
      if (!this.chineseRevealed) toggleCnAction();
    });

    // 綁定選項點擊
    const choiceButtons = this.el.duelContainer.querySelectorAll('.choice-btn');
    choiceButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleDuelAnswer(btn.dataset.choice, duel);
      });
    });
  }

  handleDuelAnswer(choice, duel) {
    const choiceBtns = this.el.duelContainer.querySelectorAll('.choice-btn');
    choiceBtns.forEach(b => b.disabled = true);

    const isCorrect = (choice === 'A' && duel.optionA.isCorrect) || (choice === 'B' && duel.optionB.isCorrect);

    choiceBtns.forEach(b => {
      const c = b.dataset.choice;
      const optCorrect = (c === 'A' && duel.optionA.isCorrect) || (c === 'B' && duel.optionB.isCorrect);
      if (optCorrect) {
        b.classList.add('correct');
      } else if (c === choice && !isCorrect) {
        b.classList.add('wrong');
      }
    });

    // 播放音效與震動
    if (isCorrect) {
      this.playTone('correct');
      if (navigator.vibrate) navigator.vibrate([40]);
      this.userState.totalCorrect++;
    } else {
      this.playTone('wrong');
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }

    this.userState.todayAnswered++;
    this.userState.duelProgress[duel.id] = isCorrect;
    this.saveState();
    this.updateStatsUI();

    // 顯示神譬喻與考官思維
    const feedbackSlot = document.getElementById('duel-feedback-slot');
    feedbackSlot.innerHTML = `
      <div class="explanation-card">
        <div class="explanation-header">
          <span>${isCorrect ? '🎯 答對了！' : '💡 哎呀！這題考官的思維是：'}</span>
        </div>
        <div style="font-weight: 700; color: #f8fafc; font-size: 13.5px; margin-bottom: 6px;">
          ${duel.explanation.verdict}
        </div>
        <div class="explanation-mindset">
          ${duel.explanation.mindset}
        </div>
        <div class="explanation-metaphor">
          <strong>☕ 職場生活神譬喻：</strong><br/>
          ${duel.explanation.metaphor}
        </div>
        <div style="font-size: 11.5px; color: var(--accent-blue); margin-bottom: 8px;">
          🔑 <strong>英文致勝動詞</strong>: ${duel.explanation.keyEnAction}
        </div>
        <button class="btn-next-action" id="btn-next-duel">
          ${this.duelIndex < this.data.duels.length - 1 ? '下一題情境 ➔' : '重新循環挑戰 ↺'}
        </button>
      </div>
    `;

    document.getElementById('btn-next-duel').addEventListener('click', () => {
      this.duelIndex = (this.duelIndex + 1) % this.data.duels.length;
      this.renderDuel();
    });
  }

  // 2. 渲染雷區判斷 (Tinder Swipe Radar)
  renderRadar() {
    const item = this.data.radars[this.radarIndex];
    if (!item) return;

    this.el.radarContainer.innerHTML = `
      <div class="radar-domain-badge">${item.domain}</div>
      <div class="radar-statement">${item.text}</div>
      <div class="radar-hint">請在手機或電腦判斷：這在 PMP 世界是【踩大雷】還是【考官最愛】？</div>
      <div class="radar-buttons-row">
        <button class="btn-radar btn-radar-red" id="btn-radar-red">
          <span style="font-size: 22px;">💣</span>
          <span>踩大雷 (左滑)</span>
        </button>
        <button class="btn-radar btn-radar-green" id="btn-radar-green">
          <span style="font-size: 22px;">💎</span>
          <span>考官最愛 (右滑)</span>
        </button>
      </div>
    `;

    document.getElementById('btn-radar-red').addEventListener('click', () => this.handleRadarAnswer(false, item));
    document.getElementById('btn-radar-green').addEventListener('click', () => this.handleRadarAnswer(true, item));
  }

  handleRadarAnswer(userSaysSafe, item) {
    const isCorrect = (userSaysSafe === item.isSafe);

    if (isCorrect) {
      this.playTone('correct');
      if (navigator.vibrate) navigator.vibrate([30]);
    } else {
      this.playTone('wrong');
      if (navigator.vibrate) navigator.vibrate([80]);
    }

    this.el.radarFeedback.style.display = 'block';
    this.el.radarFeedback.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-weight: 700; color: ${item.isSafe ? 'var(--accent-green)' : 'var(--accent-red)'}">
          ${item.tag}
        </span>
        <span style="font-size: 12px; color: var(--text-muted);">${isCorrect ? '✅ 你的直覺很準！' : '❌ 差一點點！'}</span>
      </div>
      <p style="font-size: 13px; line-height: 1.5; color: #cbd5e1; margin-bottom: 10px;">
        ${item.verdict}
      </p>
      <button class="btn-next-action" id="btn-next-radar" style="padding: 9px;">
        滑下一張 ➔
      </button>
    `;

    document.getElementById('btn-next-radar').addEventListener('click', () => {
      this.el.radarFeedback.style.display = 'none';
      this.radarIndex = (this.radarIndex + 1) % this.data.radars.length;
      this.renderRadar();
    });
  }

  // 3. 渲染高頻英文關鍵字庫
  renderKeywords(searchQuery = '') {
    const list = this.data.keywords.filter(k => {
      if (!searchQuery) return true;
      return k.en.toLowerCase().includes(searchQuery) || 
             k.cn.toLowerCase().includes(searchQuery) ||
             k.metaphor.toLowerCase().includes(searchQuery);
    });

    if (list.length === 0) {
      this.el.keywordList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">找不到符合的關鍵字，試試搜 servant 或 範疇</div>`;
      return;
    }

    this.el.keywordList.innerHTML = list.map(item => `
      <div class="keyword-card">
        <div class="keyword-header">
          <div>
            <div class="keyword-en-title">${item.en}</div>
            <div class="keyword-cn-title">${item.cn}</div>
          </div>
          <span class="keyword-stars">${item.freq}</span>
        </div>
        <div class="keyword-trigger-tag">🎯 看到考題情境：${item.trigger}</div>
        <div class="keyword-meta">
          <strong>生活神譬喻：</strong> ${item.metaphor}
        </div>
        <div style="font-size: 12px; color: var(--accent-green); margin-top: 6px;">
          ⚡ <strong>秒選動作：</strong> ${item.examAction}
        </div>
      </div>
    `).join('');
  }

  // 4. 渲染考官十大黃金戒律
  renderCheatSheet() {
    this.el.cheatSheetList.innerHTML = this.data.goldenRules.map(rule => `
      <div class="rule-item">
        <div class="rule-number">${rule.no}</div>
        <div class="rule-content">
          <h4>${rule.title}</h4>
          <p>${rule.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 開啟同步彈窗
  openSyncModal() {
    this.el.syncDataTextarea.value = JSON.stringify(this.userState, null, 2);
    this.el.syncModal.classList.add('active');
  }
}

// 頁面載入後自動啟動
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PmpApp();
});
