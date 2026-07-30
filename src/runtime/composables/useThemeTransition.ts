import type { ThemeMode, ThemeTransitionOptions } from '../../types';
import { getEffectOrThrow } from '../effects';
import { runThemeTransition } from '../utils/runThemeTransition';

export type { ThemeOrigin, ThemeTransitionOptions } from '../../types';

export const useThemeTransition = () => {
	const colorMode = useColorMode();
	const isAnimating = useState('theme-transition-animating', () => false);
	const { variant: configVariant, effects }
		= useRuntimeConfig().public.themeTransition;

	const applyTheme = async (
		nextMode: ThemeMode,
		options: ThemeTransitionOptions = {},
	) => {
		const variant = options.variant ?? configVariant;
		const definition = getEffectOrThrow(variant);
		const origin = options.origin ?? null;

		if (definition.requiresOrigin && !origin) {
			throw new Error(`Theme variant "${variant}" requires an origin point`);
		}

		await runThemeTransition(
			definition,
			origin,
			effects[variant],
			() => {
				colorMode.preference = nextMode;
			},
			(value) => {
				isAnimating.value = value;
			},
		);
	};

	const toggleTheme = async (options: ThemeTransitionOptions = {}) => {
		if (isAnimating.value) {
			return;
		}

		const nextMode = colorMode.value === 'dark' ? 'light' : 'dark';
		await applyTheme(nextMode, options);
	};

	const setTheme = async (
		mode: ThemeMode,
		options: ThemeTransitionOptions = {},
	) => {
		if (isAnimating.value) {
			return;
		}

		if (mode !== 'system' && colorMode.value === mode) {
			return;
		}

		await applyTheme(mode, options);
	};

	return {
		isAnimating,
		toggleTheme,
		setTheme,
	};
};
