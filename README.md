# 🎮 Scoundrel - Browser-Based Roguelike Card Game

A stunning browser-based implementation of the Scoundrel card game with 3D graphics, featuring real-time combat, strategic card selection, and immersive visual effects.

## 📋 Project Overview

**Scoundrel** is a single-file web application (HTML/CSS/JavaScript) that brings the classic roguelike card game to life with:
- **3D Card Rendering** using Three.js
- **Dynamic Textures** generated on-the-fly for each card
- **Smooth Animations** powered by GSAP
- **Elegant UI** with glassmorphism effects and color-coded feedback
- **Responsive Design** that works on desktop browsers

## 🎯 Game Mechanics

### Objective
Defeat all rooms and survive with health remaining to win the game.

### Starting Conditions
- **Health**: 20 HP
- **Deck**: Standard 52-card deck (shuffled)
- **Weapon**: Unarmed (0 damage)

### Card Types
| Card Type | Determined By | Effect |
|-----------|---------------|--------|
| **Monster** | Rank 2-9 | Deal damage equal to card rank |
| **Weapon** | Rank 10-K | Equip weapon (damage = rank - 9) |
| **Potion** | Rank A | Restore 5 health |

### Game Flow
1. **Room Presented**: 3 cards are dealt from the deck
2. **Player Chooses**: Click a card to select it
3. **Card Resolves**: Effect is applied based on card type
4. **Continue**: Repeat until room is cleared or player flees
5. **Win/Lose**: Clear all rooms to win; reach 0 health to lose

### Actions
- **Fight**: Attack current monster with equipped weapon
- **Weapon**: Switch to a selected weapon card
- **Heal**: Use a potion to restore health
- **Flee**: Escape current room (only if no cards played yet)

## 🏗️ Project Structure

### Key Components

**Game State** (JavaScript)
```javascript
state = {
  health: 20,           // Current HP
  maxHealth: 20,        // Max HP
  weapon: 0,            // Current weapon damage
  deck: [],             // Remaining cards
  room: [],             // Current room cards
  cardsPlayedThisRoom: 0,
  selectedIndex: null,
  gameOver: false,
  won: false,
  lastRanAway: false
}
```

**3D Rendering** (Three.js)
- Perspective camera with dynamic lighting
- 3D card meshes with canvas-generated textures
- Particle effects for atmosphere
- GSAP-powered smooth animations

**UI/HUD System**
- **Health Wheel**: Circular progress indicator (color-coded)
- **Combat Log**: Real-time battle messages
- **Action Buttons**: Context-aware controls
- **Help Modal**: Game rules and card descriptions
- **Damage Flash**: Visual feedback on taking damage

## 🎨 Visual Design

### Color Scheme
- **Gold** (#c9a84c): Primary accent, health indicator
- **Red** (#c44040): Damage, danger states
- **Green** (#4a9e5a): Healing, positive effects
- **Blue** (#4a7ec4): Weapons, equipment
- **Dark Background** (#0a0a0c): Premium feel

### Typography
- **Cinzel**: Headlines and UI labels (elegant serif)
- **Crimson Text**: Body text (readable serif)

### Effects
- Glassmorphism (backdrop blur)
- Smooth transitions and animations
- Pulsing health indicator at critical levels
- Screen flash on damage

## 🛠️ Technologies Used

- **Three.js**: 3D graphics and scene management
- **GSAP**: Animation library for smooth transitions
- **Canvas API**: Dynamic texture generation for cards
- **Vanilla JavaScript**: Game logic and state management
- **CSS3**: Modern styling with animations and effects
- **Google Fonts**: Premium typography

## 🚀 How to Play

1. Open `index.html` in a modern web browser
2. The game initializes automatically
3. Click on cards to play them
4. Use action buttons to fight, switch weapons, or heal
5. Click "Flee" to escape the current room (if possible)
6. Click "?" for help and game rules
7. Defeat all rooms to win!

## 📱 Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with WebGL support

## 🎓 Game Tips

- **Plan Ahead**: Think about which card to play next
- **Manage Health**: Use potions strategically
- **Upgrade Weapons**: Higher-ranked weapons deal more damage
- **Flee Wisely**: Escape rooms if the cards are unfavorable
- **Monitor Deck**: Keep track of remaining cards

## 📝 File Structure

```
scoundrel/
├── index.html          # Main application (1409 lines)
├── Scoundrel.pdf       # Game rulebook reference
├── README.md           # This file
└── .gitignore          # Git configuration
```

## 🔧 Development Notes

The entire application is contained in a single HTML file for easy deployment and portability. The structure includes:

1. **HTML Head**: Meta tags, fonts, libraries
2. **CSS Styles**: Complete styling (lines ~10-800)
3. **HTML Body**: Canvas and HUD elements
4. **JavaScript**: Game logic and 3D rendering (lines ~800-1409)

### Key Functions
- `initGame()`: Initialize game state
- `dealRoom()`: Deal 3 cards to current room
- `playCard(index)`: Process selected card
- `updateHUD()`: Refresh UI elements
- `render()`: 3D rendering loop
- `checkWinLose()`: Check game end conditions

## 🐛 Known Limitations

- Single-file structure makes it harder to maintain (future refactor opportunity)
- No save/load functionality
- No difficulty settings
- No multiplayer support

## 🚀 Future Enhancements

- [ ] Split into modular components (HTML/CSS/JS files)
- [ ] Add difficulty levels and game modes
- [ ] Implement save/load game state
- [ ] Add sound effects and background music
- [ ] Create mobile-optimized version
- [ ] Add leaderboard/high scores
- [ ] Implement procedural card generation
- [ ] Add visual effects for critical moments

## 📄 License

See Scoundrel.pdf for original game rules and licensing information.

---

**Version**: 1.0  
**Last Updated**: 2024  
**Enjoy the game!** 🎲
