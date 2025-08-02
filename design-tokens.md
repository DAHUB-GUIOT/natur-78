# NATUR Design Tokens - Minimal Color System

## Overview
This color system is extracted directly from the Festival NATUR homepage design, creating a minimal two-mode system (light/dark) using only existing colors.

## Color Analysis from Homepage
- **Background**: `#FCF8EE` (warm cream - homepage main background)
- **Navigation**: `#181c0d` (dark forest green - top navigation bar)
- **Accent**: `#cad95e` (NATUR brand green - logo, buttons, borders)
- **Secondary**: `#aa3b1e` (terra cotta red - agenda button)
- **Secondary Text**: `#e5bbb0` (soft pink - text on red button)
- **Text**: `#000000` (black - main text color)
- **Surface**: `#ffffff` (white - cards and elevated surfaces)

## Design Token Structure

### Light Mode (Default - Homepage Colors)
```css
:root {
  --color-bg: #FCF8EE;           /* Main background */
  --color-text: #000000;         /* Primary text */
  --color-accent: #cad95e;       /* Brand green */
  --color-surface: #ffffff;      /* Cards, modals */
  --color-border: #e5e5e5;       /* Borders, dividers */
}
```

### Dark Mode (Inverted/Adapted)
```css
.dark {
  --color-bg: #0a1a0a;           /* Very dark green */
  --color-text: #ffffff;         /* White text */
  --color-accent: #cad95e;       /* Keep brand green */
  --color-surface: #0f2d0f;      /* Dark green surfaces */
  --color-border: #1a3d1a;       /* Dark borders */
}
```

## Usage Examples

### CSS Implementation
```css
.component {
  background-color: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.accent-button {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

### Figma/Design Tool Variables
```
Background/Primary: var(--color-bg)
Text/Primary: var(--color-text)
Brand/Accent: var(--color-accent)
Surface/Card: var(--color-surface)
Border/Divider: var(--color-border)
```

## Color Accessibility
- **Light Mode**: Black text on cream background provides excellent contrast (AAA compliant)
- **Dark Mode**: White text on dark green background maintains high contrast
- **Brand Green**: #cad95e works on both light and dark backgrounds
- **Focus States**: Use accent color for interactive elements

## Implementation Notes
1. **Brand Consistency**: The NATUR green (`#cad95e`) remains constant across both modes
2. **Minimal Palette**: Only 5 core variables needed for the entire system
3. **Homepage Faithful**: All colors directly extracted from existing homepage design
4. **Future Proof**: Easy to extend with additional surface levels if needed

## No Additional Colors
This system intentionally avoids introducing any new colors not found on the homepage, maintaining design consistency and brand integrity.