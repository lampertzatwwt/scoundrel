# Scoundrel - Achievements System

## Overview
A comprehensive achievement system has been added to track player progress and accomplishments.

## Features
- **14 unique achievements** to unlock
- **Persistent storage** using localStorage
- **Visual notifications** when achievements are unlocked
- **Achievement panel** accessible via star button (★) in the top-right
- **Progress tracking** for cumulative stats

## Achievement List

### Victory Achievements
- **👑 Dungeon Conqueror** - Win your first game
- **🍀 Lucky** - Win 5 games
- **🎖️ Veteran Scoundrel** - Win 10 games
- **⭐ Legend** - Win 25 games

### Challenge Achievements
- **💚 Unscathed** - Win with 20 HP (perfect health)
- **☠️ Near Death** - Win with 3 HP or less
- **✊ Fists of Fury** - Win without ever equipping a weapon
- **🚫 No Magic** - Win without drinking any potions

### Combat Achievements
- **⚔️ Monster Slayer** - Defeat 30 monsters in a single game
- **🛡️ Survivor** - Survive taking 50+ total damage in a single game
- **🐉 Giant Slayer** - Defeat an Ace (14) with a weapon

### Playstyle Achievements
- **🏃 Tactical Retreat** - Flee from 5 rooms in a single game
- **🗡️ Weapon Master** - Equip 10 different weapons in a single game
- **🧪 Potion Addict** - Drink 15 potions in a single game

## Technical Details

### Statistics Tracked
Each game tracks:
- Monsters killed
- Total damage taken
- Weapons equipped
- Potions drunk
- Rooms fled
- Whether an Ace was killed with a weapon

### Global Progress
The system maintains:
- Total wins
- Total games played
- Set of unlocked achievements

### UI Components
1. **Achievement Button** - Star icon (★) in top-right corner
   - Pulses when new achievements are unlocked
   
2. **Achievement Notification** - Slides in from the right when an achievement is unlocked
   - Shows achievement icon, name, and description
   - Auto-dismisses after 4 seconds
   
3. **Achievements Modal** - Full panel showing all achievements
   - Displays unlock progress (X/14 unlocked)
   - Shows locked/unlocked status for each achievement
   - Unlocked achievements are highlighted in gold

### Local Storage
Achievements are persisted to `localStorage` under key `scoundrel_achievements` with format:
```json
{
  "unlocked": ["first_victory", "perfect_health", ...],
  "progress": {
    "win_count": 5,
    "games_played": 12
  }
}
```

## Implementation Notes
- Achievements are checked at key moments: after winning, after fleeing, and continuously during gameplay
- The system is non-intrusive and doesn't affect core gameplay
- All achievements are client-side and stored locally
- Achievement unlocks are animated and celebrated with notifications
