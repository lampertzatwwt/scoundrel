# Scoundrel Achievements & Missions System

A comprehensive achievement and mission tracking system for the Scoundrel card game, featuring 18 achievements across 5 categories and 6 daily missions.

## Overview

The system tracks player accomplishments throughout gameplay and displays them in an intuitive UI. All progress is automatically saved to localStorage, persisting across sessions.

### Key Features

- **18 Achievements** across 5 thematic categories
- **6 Daily Missions** with progress tracking
- **Real-time Notifications** when achievements unlock or missions complete
- **Persistent Storage** using localStorage
- **Beautiful UI** matching the dark fantasy aesthetic
- **Progress Tracking** with completion percentages

## Achievements

### Combat Achievements (5)

| Achievement | Icon | Condition | Description |
|---|---|---|---|
| **First Blood** | ⚔️ | Defeat 1 monster | Get your first kill |
| **Monster Slayer** | 🗡️ | Defeat 10 monsters | Become a seasoned fighter |
| **Demon Hunter** | 👹 | Defeat 25 monsters | Master of combat |
| **Weapon Master** | 🏹 | Use weapons 15 times | Proficient with arms |
| **Bare Knuckle** | 👊 | Defeat 5 monsters barehanded | Fight without weapons |

### Healing Achievements (4)

| Achievement | Icon | Condition | Description |
|---|---|---|---|
| **First Aid** | 🧪 | Use 1 potion | Discover healing |
| **Alchemist** | ⚗️ | Use 10 potions | Master of potions |
| **Full Recovery** | 💚 | Reach full health | Complete restoration |
| **Survivor** | 🩹 | Survive with low health | Barely made it |

### Progression Achievements (4)

| Achievement | Icon | Condition | Description |
|---|---|---|---|
| **Room Clearer** | 🚪 | Complete 5 rooms | Clear multiple chambers |
| **Dungeon Explorer** | 🗺️ | Complete 15 rooms | Explore the depths |
| **Escape Artist** | 🎉 | Win 1 game | Escape the dungeon |
| **Legend** | 👑 | Win 5 games | Legendary status |

### Skill Achievements (3)

| Achievement | Icon | Condition | Description |
|---|---|---|---|
| **Dragon Slayer** | 🐉 | Defeat an Ace (14) | Slay the mightiest |
| **King Killer** | ♚ | Defeat a King (13) | Defeat royalty |
| **Perfect Dodge** | 🛡️ | Defeat monster with 0 damage | Flawless victory |

### Unique Achievements (2)

| Achievement | Icon | Condition | Description |
|---|---|---|---|
| **Lucky Escape** | 🏃 | Flee 3 rooms in one game | Master of evasion |
| **Iron Will** | ⚡ | Win with 5 HP or less | Victory against odds |

## Missions

### Mission Types

#### Combat Missions
- **Monster Hunter**: Defeat 3 monsters (Reward: 10 XP)
- **Weapon Training**: Use weapons 5 times (Reward: 15 XP)

#### Healing Missions
- **Potion Master**: Use 3 potions (Reward: 12 XP)
- **Survival Instinct**: Reach full health once (Reward: 20 XP)

#### Progress Missions
- **Room Clearer**: Complete 3 rooms (Reward: 15 XP)
- **Escape the Dungeon**: Win a game (Reward: 50 XP)

## UI Components

### Achievements Panel
- Accessible via the 🏆 button in the top-right HUD
- Displays all achievements in a grid layout
- Shows stats: Unlocked count, total achievements, completion percentage
- Locked achievements appear dimmed with hidden descriptions
- Unlocked achievements show a checkmark badge

### Missions Tracker
- Accessible via the 📋 button in the top-right HUD
- Shows all active missions with progress bars
- Displays current progress vs. target
- Completed missions highlighted in green
- Shows reward value for each mission

### Notifications
- Slide in from the right when achievements unlock
- Slide in from the right when missions complete
- Auto-dismiss after 4 seconds
- Display icon, title, and description
- Thematic styling with gold borders

## Technical Implementation

### Files

1. **achievements-missions.js** - Core system logic
   - `AchievementsMissionsSystem` class
   - Achievement and mission definitions
   - Progress tracking and checking
   - localStorage integration

2. **achievements-integration.js** - UI integration
   - Panel rendering and management
   - Notification system
   - Event listeners and handlers
   - Global API functions

3. **index.html** - Integration points
   - CSS styles for all components
   - HTML buttons and containers
   - Script imports
   - Tracking calls in game logic

### Tracking Integration

The system integrates with game events:

```javascript
// Monster defeated
achievementSystem.trackMonsterDefeated(rank, usedWeapon, damageDealt);

// Weapon used
achievementSystem.trackWeaponUsed();

// Potion used
achievementSystem.trackPotionUsed();

// Health fully restored
achievementSystem.trackHealthFull();

// Room completed
achievementSystem.trackRoomCompleted();

// Game won
achievementSystem.trackGameWon(finalHealth);

// Room fled
achievementSystem.trackFlee();

// Session reset
achievementSystem.resetSession();
```

### Data Structure

#### Stats Object
```javascript
{
  monstersDefeated: number,
  weaponsUsed: number,
  barehandedWins: number,
  potionsUsed: number,
  reachedFullHealth: number,
  survivedWithLowHealth: number,
  roomsCompleted: number,
  gamesWon: number,
  defeatedAce: number,
  defeatedKing: number,
  perfectDodges: number,
  fleeCount: number,
  lowHealthVictory: number,
}
```

#### localStorage Keys
- `scoundrel_stats` - Player statistics
- `scoundrel_achievements` - Unlocked achievement IDs
- `scoundrel_missions` - Completed mission IDs

## Styling

All components use the game's existing color scheme:

- **Gold** (#c9a84c) - Primary accent, unlocked items
- **Green** (#4a9e5a) - Completed missions
- **Red** (#c44040) - Danger/damage
- **Blue** (#4a7ec4) - Weapons
- **Dark surfaces** - Semi-transparent overlays with blur

### Responsive Design

- Achievements grid adapts to screen size
- Missions list scrollable on small screens
- Buttons repositioned on mobile
- Touch-friendly sizing

## Usage

### For Players

1. **View Achievements**: Click the 🏆 button to see all achievements
2. **Track Missions**: Click the 📋 button to see active missions
3. **Get Notifications**: Watch for achievement/mission notifications
4. **Check Progress**: See completion percentage in achievements panel
5. **Progress Persists**: All progress saves automatically

### For Developers

#### Initialize System
```javascript
achievementSystem = new AchievementsMissionsSystem();
```

#### Track Events
```javascript
// In game logic
achievementSystem.trackMonsterDefeated(card.rank, usedWeapon, damageDealt);
```

#### Get Data
```javascript
const stats = achievementSystem.getStats();
const achievements = achievementSystem.getAchievementsList();
const missions = achievementSystem.getMissionsList();
```

#### Process Notifications
```javascript
const notification = achievementSystem.getNotification();
if (notification) {
  // Display notification
}
```

## Future Enhancements

Potential additions:

- **Seasonal Achievements** - Limited-time challenges
- **Leaderboards** - Compare stats with other players
- **Achievement Tiers** - Bronze, Silver, Gold, Platinum
- **Custom Missions** - Player-created challenges
- **Rewards System** - Unlock cosmetics or game modes
- **Statistics Dashboard** - Detailed gameplay analytics
- **Social Sharing** - Share achievements on social media
- **Difficulty Modifiers** - Harder achievements for expert mode

## Design Philosophy

The achievements and missions system is designed to:

1. **Enhance Replayability** - Give players goals beyond winning
2. **Reward Playstyle Variety** - Encourage different strategies
3. **Celebrate Accomplishments** - Make achievements feel meaningful
4. **Maintain Immersion** - Thematic icons and descriptions
5. **Respect Player Time** - Reasonable targets, not grindy
6. **Preserve Aesthetics** - Integrate seamlessly with game design

## Testing

To test the system:

1. Open browser DevTools console
2. Access the system: `window.achievementSystem`
3. Manually trigger events: `achievementSystem.trackMonsterDefeated(14, true, 0)`
4. Check localStorage: `localStorage.getItem('scoundrel_stats')`
5. Clear progress: `localStorage.clear()`

## Credits

Achievements and Missions System built for Scoundrel, a card game by Zach Gage & Kurt Bieg.

Designed to complement the dark fantasy dungeon aesthetic and enhance the roguelike experience.
