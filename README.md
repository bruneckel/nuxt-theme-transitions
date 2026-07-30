# nuxt-theme-transition

Animated dark/light theme toggle for Nuxt. Requires [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org/).

## Install

```bash
npm install nuxt-theme-transition @nuxtjs/color-mode
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode', 'nuxt-theme-transition'],
})
```

Local module (monorepo):

```ts
modules: ['@nuxtjs/color-mode', './modules/nuxt-theme-transition'],
```

## Usage

```vue
<script setup lang="ts">
const { isAnimating, toggleTheme } = useThemeTransition()
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
