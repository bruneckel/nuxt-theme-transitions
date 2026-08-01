# nuxt-theme-transitions

Animated dark/light theme toggle for Nuxt.

## Install

```bash
npm install @bruneckel/nuxt-theme-transitions
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bruneckel/nuxt-theme-transitions'],
})
```

## Usage

```vue
<script setup lang="ts">
const { theme, isAnimating, toggleTheme } = useThemeTransition()
</script>

<template>
  <button
    :disabled="isAnimating"
    @click="toggleTheme({ origin: originFromEvent($event) })"
  >
    Toggle theme
  </button>
</template>
```

Use `originFromElement(buttonRef)` to animate from the center of an element instead of the click position.

Disable the button with `:disabled="isAnimating"` to avoid double-clicks while the animation runs.

## Configuration (optional)

| Option | Default | Description |
|--------|---------|-------------|
| `variant` | `'fade'` | `'spread'` (circle from click) or `'fade'` (crossfade) |
| `duration` | `'1s'` / `'400ms'` | How long the animation lasts (e.g. `'2s'`) |
| `easing` | per variant | Animation easing |
| `radius` | `'150vmax'` | Spread circle size (spread only) |

```ts
themeTransition: {
  variant: 'spread',
  duration: '1s',
}
```

Restart the dev server after changing `themeTransition`.

## Theme management

This package owns theme detection and persistence itself — no `@nuxtjs/color-mode` or other external dependency is needed.

- **`dark`/`light` class on `<html>`** — the resolved theme is applied as a class on `document.documentElement` (`dark` or `light`, one added, the other removed). This is what makes Tailwind's `darkMode: 'class'` strategy work out of the box.
- **`localStorage['theme']`** — the user's preference (`'light'`, `'dark'`, or `'system'`) is persisted under the `theme` key.
- **Inline `<head>` script** — the module injects a small anti-flash script into `<head>` that applies the correct class before the page paints, so there's no flash of the wrong theme on load.

**Migrating from `@nuxtjs/color-mode`?** Remove it entirely — delete it from the `modules` array in `nuxt.config.ts` (and uninstall the package). Both modules manage the same `<html>` class, and having both installed doesn't throw or warn — they just silently fight over the class, which is confusing to debug.

## Variants

**spread** — circle expands from the click. Pass an origin:

```ts
toggleTheme({ origin: originFromEvent($event) })
toggleTheme({ origin: originFromElement(buttonRef.value) })
```

**fade** — smooth crossfade, no origin needed:

```ts
toggleTheme({ variant: 'fade' })
setTheme('dark', { variant: 'fade' })
```

## API

| | |
|---|---|
| `toggleTheme(options?)` | Switch between light and dark |
| `setTheme(mode, options?)` | Set `light`, `dark`, or `system` |
| `theme` | Current resolved theme: `'light'` or `'dark'` |
| `isAnimating` | `true` while a transition is running |
| `originFromEvent(event)` | Click position for spread |
| `originFromElement(el)` | Element center for spread |

## Browser support

| Browser | Animation |
|---------|-----------|
| Chrome, Edge, Safari 18+ | Yes |
| Firefox | Instant switch |
| Reduced motion | Instant switch |

## License

[MIT](LICENSE) © Bruno Neckel
