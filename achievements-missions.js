// ─── ACHIEVEMENTS & MISSIONS SYSTEM ───

// Achievement definitions
const ACHIEVEMENTS = {
  // Combat Achievements
  first_blood: {
    id: 'first_blood',
    name: 'First Blood',
    desc: 'Defeat your first monster',
    icon: '⚔️',
    category: 'combat',
    condition: (stats) => stats.monstersDefeated >= 1,
  },
  monster_slayer: {
    id: 'monster_slayer',
    name: 'Monster Slayer',
    desc: 'Defeat 10 monsters',
    icon: '🗡️',
    category: 'combat',
    condition: (stats) => stats.monstersDefeated >= 10,
  },
  demon_hunter: {
    id: 'demon_hunter',
    name: 'Demon Hunter',
    desc: 'Defeat 25 monsters',
    icon: '👹',
    category: 'combat',
    condition: (stats) => stats.monstersDefeated >= 25,
  },
  weapon_master: {
    id: 'weapon_master',
    name: 'Weapon Master',
    desc: 'Use weapons 15 times',
    icon: '🏹',
    category: 'combat',
    condition: (stats) => stats.weaponsUsed >= 15,
  },
  bare_knuckle: {
    id: 'bare_knuckle',
    name: 'Bare Knuckle',
    desc: 'Defeat 5 monsters barehanded',
    icon: '👊',
    category: 'combat',
    condition: (stats) => stats.barehandedWins >= 5,
  },

  // Healing Achievements
  first_aid: {
    id: 'first_aid',
    name: 'First Aid',
    desc: 'Use your first potion',
    icon: '🧪',
    category: 'healing',
    condition: (stats) => stats.potionsUsed >= 1,
  },
  alchemist: {
    id: 'alchemist',
    name: 'Alchemist',
    desc: 'Use 10 potions',
    icon: '⚗️',
    category: 'healing',
    condition: (stats) => stats.potionsUsed >= 10,
  },
  full_recovery: {
    id: 'full_recovery',
    name: 'Full Recovery',
    desc: 'Reach full health',
    icon: '💚',
    category: 'healing',
    condition: (stats) => stats.reachedFullHealth >= 1,
  },
  survivor: {
    id: 'survivor',
    name: 'Survivor',
    desc: 'Survive with 1 HP remaining',
    icon: '🩹',
    category: 'healing',
    condition: (stats) => stats.survivedWithLowHealth >= 1,
  },

  // Progression Achievements
  room_clearer: {
    id: 'room_clearer',
    name: 'Room Clearer',
    desc: 'Complete 5 rooms',
    icon: '🚪',
    category: 'progression',
    condition: (stats) => stats.roomsCompleted >= 5,
  },
  dungeon_explorer: {
    id: 'dungeon_explorer',
    name: 'Dungeon Explorer',
    desc: 'Complete 15 rooms',
    icon: '🗺️',
    category: 'progression',
    condition: (stats) => stats.roomsCompleted >= 15,
  },
  escape_artist: {
    id: 'escape_artist',
    name: 'Escape Artist',
    desc: 'Win a game',
    icon: '🎉',
    category: 'progression',
    condition: (stats) => stats.gamesWon >= 1,
  },
  legend: {
    id: 'legend',
    name: 'Legend',
    desc: 'Win 5 games',
    icon: '👑',
    category: 'progression',
    condition: (stats) => stats.gamesWon >= 5,
  },

  // Skill Achievements
  dragon_slayer: {
    id: 'dragon_slayer',
    name: 'Dragon Slayer',
    desc: 'Defeat an Ace (14)',
    icon: '🐉',
    category: 'skill',
    condition: (stats) => stats.defeatedAce >= 1,
  },
  king_killer: {
    id: 'king_killer',
    name: 'King Killer',
    desc: 'Defeat a King (13)',
    icon: '♚',
    category: 'skill',
    condition: (stats) => stats.defeatedKing >= 1,
  },
  perfect_dodge: {
    id: 'perfect_dodge',
    name: 'Perfect Dodge',
    desc: 'Defeat a monster with 0 damage taken',
    icon: '🛡️',
    category: 'skill',
    condition: (stats) => stats.perfectDodges >= 1,
  },

  // Unique Achievements
  lucky_escape: {
    id: 'lucky_escape',
    name: 'Lucky Escape',
    desc: 'Flee 3 rooms in one game',
    icon: '🏃',
    category: 'unique',
    condition: (stats) => stats.fleeCount >= 3,
  },
  iron_will: {
    id: 'iron_will',
    name: 'Iron Will',
    desc: 'Win with 5 HP or less',
    icon: '⚡',
    category: 'unique',
    condition: (stats) => stats.lowHealthVictory >= 1,
  },
};

// Mission definitions
const MISSIONS = [
  {
    id: 'combat_1',
    name: 'Monster Hunter',
    desc: 'Defeat 3 monsters',
    icon: '⚔️',
    category: 'combat',
    target: 3,
    stat: 'monstersDefeated',
    reward: 10,
  },
  {
    id: 'combat_2',
    name: 'Weapon Training',
    desc: 'Use weapons 5 times',
    icon: '🏹',
    category: 'combat',
    target: 5,
    stat: 'weaponsUsed',
    reward: 15,
  },
  {
    id: 'healing_1',
    name: 'Potion Master',
    desc: 'Use 3 potions',
    icon: '🧪',
    category: 'healing',
    target: 3,
    stat: 'potionsUsed',
    reward: 12,
  },
  {
    id: 'healing_2',
    name: 'Survival Instinct',
    desc: 'Reach full health once',
    icon: '💚',
    category: 'healing',
    target: 1,
    stat: 'reachedFullHealth',
    reward: 20,
  },
  {
    id: 'progress_1',
    name: 'Room Clearer',
    desc: 'Complete 3 rooms',
    icon: '🚪',
    category: 'progress',
    target: 3,
    stat: 'roomsCompleted',
    reward: 15,
  },
  {
    id: 'progress_2',
    name: 'Escape the Dungeon',
    desc: 'Win a game',
    icon: '🎉',
    category: 'progress',
    target: 1,
    stat: 'gamesWon',
    reward: 50,
  },
];

class AchievementsMissionsSystem {
  constructor() {
    this.stats = this.loadStats();
    this.unlockedAchievements = new Set(this.loadUnlockedAchievements());
    this.completedMissions = new Set(this.loadCompletedMissions());
    this.notificationQueue = [];
  }

  loadStats() {
    const saved = localStorage.getItem('scoundrel_stats');
    return saved ? JSON.parse(saved) : this.getDefaultStats();
  }

  getDefaultStats() {
    return {
      monstersDefeated: 0,
      weaponsUsed: 0,
      barehandedWins: 0,
      potionsUsed: 0,
      reachedFullHealth: 0,
      survivedWithLowHealth: 0,
      roomsCompleted: 0,
      gamesWon: 0,
      defeatedAce: 0,
      defeatedKing: 0,
      perfectDodges: 0,
      fleeCount: 0,
      lowHealthVictory: 0,
    };
  }

  loadUnlockedAchievements() {
    const saved = localStorage.getItem('scoundrel_achievements');
    return saved ? JSON.parse(saved) : [];
  }

  loadCompletedMissions() {
    const saved = localStorage.getItem('scoundrel_missions');
    return saved ? JSON.parse(saved) : [];
  }

  saveProgress() {
    localStorage.setItem('scoundrel_stats', JSON.stringify(this.stats));
    localStorage.setItem('scoundrel_achievements', JSON.stringify(Array.from(this.unlockedAchievements)));
    localStorage.setItem('scoundrel_missions', JSON.stringify(Array.from(this.completedMissions)));
  }

  trackMonsterDefeated(rank, usedWeapon, damageDealt) {
    this.stats.monstersDefeated++;
    if (!usedWeapon) this.stats.barehandedWins++;
    if (damageDealt === 0) this.stats.perfectDodges++;
    if (rank === 14) this.stats.defeatedAce++;
    if (rank === 13) this.stats.defeatedKing++;
    this.checkAchievements();
    this.checkMissions();
  }

  trackWeaponUsed() {
    this.stats.weaponsUsed++;
    this.checkAchievements();
    this.checkMissions();
  }

  trackPotionUsed() {
    this.stats.potionsUsed++;
    this.checkAchievements();
    this.checkMissions();
  }

  trackHealthFull() {
    this.stats.reachedFullHealth++;
    this.checkAchievements();
    this.checkMissions();
  }

  trackLowHealthSurvival() {
    this.stats.survivedWithLowHealth++;
    this.checkAchievements();
  }

  trackRoomCompleted() {
    this.stats.roomsCompleted++;
    this.checkAchievements();
    this.checkMissions();
  }

  trackGameWon(finalHealth) {
    this.stats.gamesWon++;
    if (finalHealth <= 5) this.stats.lowHealthVictory++;
    this.checkAchievements();
    this.checkMissions();
  }

  trackFlee() {
    this.stats.fleeCount++;
    this.checkAchievements();
  }

  checkAchievements() {
    for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
      if (!this.unlockedAchievements.has(id) && achievement.condition(this.stats)) {
        this.unlockAchievement(id);
      }
    }
  }

  checkMissions() {
    for (const mission of MISSIONS) {
      if (!this.completedMissions.has(mission.id)) {
        const progress = this.stats[mission.stat] || 0;
        if (progress >= mission.target) {
          this.completeMission(mission.id);
        }
      }
    }
  }

  unlockAchievement(id) {
    this.unlockedAchievements.add(id);
    const achievement = ACHIEVEMENTS[id];
    this.notificationQueue.push({
      type: 'achievement',
      achievement,
    });
    this.saveProgress();
  }

  completeMission(id) {
    this.completedMissions.add(id);
    const mission = MISSIONS.find(m => m.id === id);
    this.notificationQueue.push({
      type: 'mission',
      mission,
    });
    this.saveProgress();
  }

  getNotification() {
    return this.notificationQueue.shift();
  }

  getStats() {
    return {
      totalAchievements: Object.keys(ACHIEVEMENTS).length,
      unlockedCount: this.unlockedAchievements.size,
      completionPercent: Math.round((this.unlockedAchievements.size / Object.keys(ACHIEVEMENTS).length) * 100),
      totalMissions: MISSIONS.length,
      completedMissionsCount: this.completedMissions.size,
    };
  }

  getAchievementsList() {
    return Object.entries(ACHIEVEMENTS).map(([id, ach]) => ({
      ...ach,
      unlocked: this.unlockedAchievements.has(id),
    }));
  }

  getMissionsList() {
    return MISSIONS.map(mission => ({
      ...mission,
      completed: this.completedMissions.has(mission.id),
      progress: this.stats[mission.stat] || 0,
      progressPercent: Math.min(100, Math.round(((this.stats[mission.stat] || 0) / mission.target) * 100)),
    }));
  }

  resetSession() {
    this.stats.fleeCount = 0;
  }
}

// Export for use in main script
window.AchievementsMissionsSystem = AchievementsMissionsSystem;
window.ACHIEVEMENTS = ACHIEVEMENTS;
window.MISSIONS = MISSIONS;
