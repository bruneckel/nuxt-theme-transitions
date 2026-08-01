import { onMounted, onUnmounted, useRuntimeConfig, useState } from '#imports';
import type { ThemeMode, ThemeTransitionOptions } from '../../types';
import { getEffectOrThrow } from '../effects';
import {
	applyThemeClass,
	readStoredPreference,
	resolveTheme,
	writeStoredPreference,
} from '../utils/colorMode';
import { runThemeTransition } from '../utils/runThemeTransition';

export type { ThemeOrigin, ThemeTransitionOptions } from '../../types';

export const useThemeTransition = () => {
	const theme = useState<'light' | 'dark'>('theme-transition-color', () =>
		resolveTheme(readStoredPreference()),
	);
	const isAnimating = useState('theme-transition-animating', () => false);
	const themeTransitionConfig = useRuntimeConfig().public.themeTransition;
	const { variant: configVariant, effects } = themeTransitionConfig;

	onMounted(() => {
		theme.value = resolveTheme(readStoredPreference());

		if (typeof matchMedia === 'undefined') {
			return;
		}

		const media = matchMedia('(prefers-color-scheme: dark)');

		const handleSystemChange = () => {
			if (readStoredPreference() !== 'system') {
				return;
			}

			const resolved = resolveTheme('system');
			applyThemeClass(resolved);
			theme.value = resolved;
		};

		media.addEventListener('change', handleSystemChange);

		onUnmounted(() => {
			media.removeEventListener('change', handleSystemChange);
		});
	});

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
				const resolved = resolveTheme(nextMode);
				writeStoredPreference(nextMode);
				applyThemeClass(resolved);
				theme.value = resolved;
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

		const nextMode = theme.value === 'dark' ? 'light' : 'dark';
		await applyTheme(nextMode, options);
	};

	const setTheme = async (
		mode: ThemeMode,
		options: ThemeTransitionOptions = {},
	) => {
		if (isAnimating.value) {
			return;
		}

		if (mode !== 'system' && theme.value === mode) {
			return;
		}

		await applyTheme(mode, options);
	};

	return {
		theme,
		isAnimating,
		toggleTheme,
		setTheme,
	};
};
