// ─── ACHIEVEMENTS & MISSIONS INTEGRATION ───

let achievementSystem = null;
let showAchievementsPanel = false;
let showMissionsPanel = false;

// Initialize the system after page load
function initAchievementsSystem() {
  achievementSystem = new window.AchievementsMissionsSystem();
  setupAchievementsUI();
  processNotifications();
}

function setupAchievementsUI() {
  const achievementsBtn = document.getElementById('achievements-btn');
  const missionsBtn = document.getElementById('missions-btn');
  
  if (achievementsBtn) {
    achievementsBtn.addEventListener('click', toggleAchievementsPanel);
  }
  if (missionsBtn) {
    missionsBtn.addEventListener('click', toggleMissionsPanel);
  }
}

function toggleAchievementsPanel() {
  showAchievementsPanel = !showAchievementsPanel;
  if (showAchievementsPanel) {
    showAchievements();
  } else {
    closeAchievements();
  }
}

function toggleMissionsPanel() {
  showMissionsPanel = !showMissionsPanel;
  if (showMissionsPanel) {
    showMissions();
  } else {
    closeMissions();
  }
}

function showAchievements() {
  const overlayContainer = document.getElementById('overlay-container');
  const stats = achievementSystem.getStats();
  const achievements = achievementSystem.getAchievementsList();
  
  const categoryGroups = {};
  achievements.forEach(ach => {
    if (!categoryGroups[ach.category]) {
      categoryGroups[ach.category] = [];
    }
    categoryGroups[ach.category].push(ach);
  });
  
  let achievementsHtml = '';
  for (const [category, achs] of Object.entries(categoryGroups)) {
    achs.forEach(ach => {
      achievementsHtml += `
        <div class="achievement-item ${ach.unlocked ? '' : 'locked'}">
          <div class="achievement-icon">${ach.icon}</div>
          <div class="achievement-name">${ach.name}</div>
          <div class="achievement-desc">${ach.desc}</div>
          <div class="unlock-badge">✓</div>
        </div>
      `;
    });
  }
  
  overlayContainer.innerHTML = `
    <div class="achievements-overlay" onclick="window._closeAchievements()">
      <div class="achievements-modal" onclick="event.stopPropagation()">
        <h2>Achievements</h2>
        <div class="achievements-stats">
          <div class="stat-item">
            <div class="stat-value">${stats.unlockedCount}</div>
            <div class="stat-label">Unlocked</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.totalAchievements}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.completionPercent}%</div>
            <div class="stat-label">Complete</div>
          </div>
        </div>
        <div class="achievements-grid">
          ${achievementsHtml}
        </div>
        <button class="achievements-close-btn" onclick="window._closeAchievements()">Close</button>
      </div>
    </div>
  `;
}

function closeAchievements() {
  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.innerHTML = '';
}

function showMissions() {
  const overlayContainer = document.getElementById('overlay-container');
  const missions = achievementSystem.getMissionsList();
  
  let missionsHtml = '';
  missions.forEach(mission => {
    const progressPercent = mission.progressPercent;
    missionsHtml += `
      <div class="mission-item ${mission.completed ? 'completed' : ''}">
        <div class="mission-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">${mission.icon}</span>
            <div class="mission-title">${mission.name}</div>
          </div>
          <div class="mission-reward">+${mission.reward} XP</div>
        </div>
        <div class="mission-desc">${mission.desc}</div>
        <div class="mission-progress">
          <div class="mission-progress-bar" style="width: ${progressPercent}%"></div>
        </div>
        <div class="mission-progress-text">${mission.progress} / ${mission.target}</div>
      </div>
    `;
  });
  
  overlayContainer.innerHTML = `
    <div class="missions-overlay" onclick="window._closeMissions()">
      <div class="missions-modal" onclick="event.stopPropagation()">
        <h2>Active Missions</h2>
        ${missionsHtml}
        <button class="missions-close-btn" onclick="window._closeMissions()">Close</button>
      </div>
    </div>
  `;
}

function closeMissions() {
  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.innerHTML = '';
}

function processNotifications() {
  const notification = achievementSystem.getNotification();
  if (!notification) return;
  
  const container = document.getElementById('hud');
  const notifEl = document.createElement('div');
  notifEl.className = 'achievement-notification';
  
  if (notification.type === 'achievement') {
    const ach = notification.achievement;
    notifEl.innerHTML = `
      <span class="icon">${ach.icon}</span>
      <span class="text">
        <span class="title">Achievement Unlocked!</span>
        <span class="desc">${ach.name}</span>
      </span>
    `;
  } else if (notification.type === 'mission') {
    const mission = notification.mission;
    notifEl.innerHTML = `
      <span class="icon">${mission.icon}</span>
      <span class="text">
        <span class="title">Mission Complete!</span>
        <span class="desc">${mission.name}</span>
      </span>
    `;
  }
  
  container.appendChild(notifEl);
  setTimeout(() => {
    notifEl.remove();
    processNotifications();
  }, 4000);
}

// Global functions for onclick handlers
window._closeAchievements = function() {
  showAchievementsPanel = false;
  closeAchievements();
};

window._closeMissions = function() {
  showMissionsPanel = false;
  closeMissions();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAchievementsSystem);
} else {
  initAchievementsSystem();
}
