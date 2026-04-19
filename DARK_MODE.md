# Dark Mode Implementation Notes

## Plan
Add a toggle button in the header to switch between light and dark themes.

## Implementation
- Store theme preference in `localStorage`
- Use CSS custom properties for all colors
- Toggle a `data-theme` attribute on `<body>`

## CSS Variables
```css
:root {
  --bg: #0f172a;
  --card: #1e293b;
  --text: #f8fafc;
}
[data-theme="light"] {
  --bg: #f8fafc;
  --card: #ffffff;
  --text: #0f172a;
}
```
