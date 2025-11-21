# MusePath Design System

## Overview
Το MusePath Design System είναι σχεδιασμένο για desktop εφαρμογές με έμφαση στη σύγχρονη αισθητική, την ευκολία χρήσης και την συνέπεια σε όλη την εφαρμογή. Τα χρώματα είναι εμπνευσμένα από το λογότυπο MusePath με λαχανί, σκούρο μπλε και μπεζ αποχρώσεις.

## Color Palette

### Primary Colors (Λαχανί/Πράσινο)
- **Primary**: `#8FB569` - Κύριο χρώμα για buttons, links και highlights (από το λογότυπο)
- **Primary Dark**: `#7A9B56` - Για hover states
- **Primary Light**: `#A5C582` - Για lighter accents

### Secondary Colors (Σκούρο Μπλε/Navy)
- **Secondary**: `#2F3E4F` - Για headers και σημαντικά στοιχεία (από το pin του λογότυπου)
- **Secondary Dark**: `#1F2A36` - Για darker backgrounds
- **Secondary Light**: `#3F5266` - Για hover states

### Neutral Colors (Μπεζ/Κρεμ)
- **Background**: `#F5F3ED` - Main page background (από τον χάρτη του λογότυπου)
- **Surface**: `#FFFFFF` - Card backgrounds
- **Surface Dark**: `#EBE9E0` - Subtle backgrounds

### Text Colors
- **Text Primary**: `#2F3E4F` - Main text (ίδιο με secondary)
- **Text Secondary**: `#6B7680` - Secondary text
- **Text Light**: `#A0A8B0` - Placeholder text
- **Text Inverse**: `#FFFFFF` - Text on dark backgrounds

### Semantic Colors
- **Success**: `#28A745` - Success states
- **Warning**: `#FFC107` - Warning states
- **Error**: `#DC3545` - Error states
- **Info**: `#17A2B8` - Informational states

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes
- **xs**: `0.75rem` (12px)
- **sm**: `0.875rem` (14px)
- **base**: `1rem` (16px)
- **lg**: `1.125rem` (18px)
- **xl**: `1.25rem` (20px)
- **2xl**: `1.5rem` (24px)
- **3xl**: `1.875rem` (30px)
- **4xl**: `2.25rem` (36px)

### Font Weights
- **Normal**: `400`
- **Medium**: `500`
- **Semibold**: `600`
- **Bold**: `700`

## Spacing System

Χρησιμοποιούμε ένα consistent spacing scale:
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

## Border Radius

- **sm**: `0.25rem` (4px)
- **md**: `0.5rem` (8px)
- **lg**: `0.75rem` (12px)
- **xl**: `1rem` (16px)
- **2xl**: `1.5rem` (24px)
- **full**: `9999px` (Rounded)

## Shadows

- **sm**: Subtle shadow για hover states
- **md**: Standard shadow για cards
- **lg**: Prominent shadow για modals
- **xl**: Deep shadow για elevated elements

## Components

### Buttons

#### Variants
- **Primary**: Κύριο action button (πορτοκαλί)
- **Secondary**: Δευτερεύον button (σκούρο)
- **Outline**: Transparent με border
- **Ghost**: Minimal styling
- **Danger**: Για destructive actions (κόκκινο)

#### Sizes
- **Small**: Compact buttons
- **Default**: Standard size
- **Large**: Prominent buttons

#### Usage
```jsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary btn-sm">Small Secondary</button>
<button className="btn btn-outline btn-lg">Large Outline</button>
```

### Cards

Cards είναι το κύριο container component με:
- Rounded corners (`radius-xl`)
- Box shadow
- Hover effects (lift animation)
- Flexible layout (header, body, footer)

#### Variants
- **Default**: Standard white card
- **Outline**: With border, no shadow
- **Flat**: No shadow, gray background
- **Primary**: Colored background

### Forms

- 2px borders για καλύτερη ορατότητα
- Focus states με primary color και subtle shadow
- Clear labels με uppercase styling
- Consistent spacing

### Navigation

- Sticky header
- Clear active states
- Smooth transitions
- Responsive με mobile menu

## Animations & Transitions

### Timing
- **Fast**: `150ms` - Quick interactions
- **Base**: `200ms` - Standard transitions
- **Slow**: `300ms` - Complex animations

### Common Animations
- **Hover lift**: `translateY(-2px)` με shadow increase
- **Modal slide in**: Fade + slide από πάνω
- **Loading spin**: Rotating spinner
- **Button press**: Scale transform

## Responsive Breakpoints

- **Mobile**: `max-width: 768px`
- **Tablet**: `769px - 1024px`
- **Desktop**: `min-width: 1025px`

## Best Practices

### Do's ✅
- Χρησιμοποιείτε CSS variables για consistency
- Προσθέτετε transitions για smooth UX
- Ακολουθείτε το spacing system
- Χρησιμοποιείτε semantic colors
- Προσθέτετε hover/focus states

### Don'ts ❌
- Μην χρησιμοποιείτε hardcoded colors
- Μην αγνοείτε accessibility (contrast, focus states)
- Μην χρησιμοποιείτε inconsistent spacing
- Μην ξεχνάτε responsive design

## Accessibility

- Minimum contrast ratio: 4.5:1 για text
- Focus indicators σε όλα τα interactive elements
- Semantic HTML
- ARIA labels όπου χρειάζεται
- Keyboard navigation support

## File Structure

```
src/
├── index.css              # Global styles & design tokens
├── components/
│   ├── Button.css         # Button component styles
│   ├── Card.css          # Card component styles
│   ├── Header.css        # Header/Navigation styles
│   ├── Modal.css         # Modal component styles
│   ├── SearchBar.css     # SearchBar component styles
│   ├── Loading.css       # Loading states
│   └── ErrorMessage.css  # Error handling UI
└── pages/
    └── [Page].css        # Page-specific styles
```

## Usage Examples

### Creating a Card Layout
```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
  </div>
  <div className="card-body">
    <p className="card-text">Card content goes here...</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-primary">Action</button>
  </div>
</div>
```

### Grid Layout
```jsx
<div className="grid grid-cols-3 gap-lg">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
  <div className="card">Item 3</div>
</div>
```

### Form with Validation
```jsx
<div className="input-group">
  <label>Email Address</label>
  <input type="email" placeholder="Enter your email" />
  <span className="error-message">Invalid email format</span>
</div>
```

## Maintenance

Για να προσθέσετε νέα χρώματα ή να τροποποιήσετε υπάρχοντα:
1. Ενημερώστε το `:root` section στο `index.css`
2. Ακολουθήστε την naming convention (`--color-name`)
3. Τεστάρετε σε όλα τα components
4. Ενημερώστε αυτό το documentation

## Future Enhancements

- [ ] Dark mode support
- [ ] Animation library expansion
- [ ] More component variants
- [ ] Enhanced accessibility features
- [ ] Icon system integration
