# TaskFlow Design System

## Color Palette

### Primary Colors
- **Navy Blue**: `#2D3E7A` (dark blue for headers, buttons, accents)
- **Hot Pink**: `#E94B6F` (accent color for highlights, active states)
- **Coral Red**: `#D84458` (secondary accent, category tags)
- **Cream/Off-white**: `#FFF9F0` (main background, cards)
- **Soft Pink**: `#FFE6F0` (light background, subtle accents)

### Neutral Colors
- **Dark Text**: `#1A1A1A` (primary text)
- **Gray Text**: `#999999` (secondary text, labels)
- **Light Gray**: `#F5F5F5` (subtle backgrounds)
- **White**: `#FFFFFF` (card backgrounds, overlays)

## Typography

- **Font Family**: System stack (SF Pro Display, Segoe UI, sans-serif)
- **Headings**: Bold, Navy Blue
- **Body Text**: Regular, Dark Text
- **Labels**: Medium weight, Gray Text

## Components

### Task Cards
- Rounded corners (16px)
- Shadow: subtle drop shadow
- Background: Cream or White
- Category tags: Hot Pink or Coral Red with rounded pills
- Time display: Gray text, smaller font

### Calendar Widget
- Navy Blue and Hot Pink gradient background
- Selected date highlighted with white circle
- Weekday indicators: S M T W T F S
- Date grid: 7 columns

### Create Task Modal
- Full-width form
- Input fields with light gray background
- Date picker integration
- Category selector with multiple options
- Reminder toggle switch (Hot Pink when enabled)
- Create button: Navy Blue, full width

### Data Report
- Card grid (2 columns on desktop)
- Circular progress indicators (Hot Pink ring)
- Bar chart with Navy Blue bars
- Activity trend graph with gradient fill
- Tab selector for time periods (Weekly, Monthly, etc.)

### Navigation
- Bottom navigation bar (mobile) or sidebar (desktop)
- Icons: Dashboard, Timer, Create (+ button), Notes, Profile
- Active state: Hot Pink highlight

## Layout

### Mobile (Reference)
- Single column layout
- Bottom navigation bar
- Full-width cards
- Top padding/margin for status bar

### Desktop (Target)
- Sidebar navigation (left)
- Main content area (center/right)
- Dashboard view by default
- Multi-column grid layouts for tasks and reports
- Responsive grid (1 col mobile → 2-3 col desktop)

## Spacing

- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px

## Border Radius

- Small: 8px
- Medium: 12px
- Large: 16px
- Extra Large: 24px (cards)

## Interactions

- Hover: Subtle opacity change or slight scale
- Active: Hot Pink highlight/background
- Disabled: Gray text, opacity 0.5
- Transitions: Smooth 200ms animations

## Dark Mode

- Background: `#1A1A2E` (dark navy)
- Cards: `#2D3E7A` (slightly lighter)
- Text: `#FFFFFF`
- Accents: Hot Pink and Coral Red remain the same
