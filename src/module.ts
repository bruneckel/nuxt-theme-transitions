import {
	addImportsDir,
	addTemplate,
	createResolver,
	defineNuxtModule,
} from '@nuxt/kit';

import {
	buildThemeTransitionCss,
	resolveThemeTransitionEffects,
} from './runtime/effects';
import type { ThemeTransitionModuleOptions } from './types';

export type {
	ThemeEffect,
	ThemeTransitionModuleOptions as ModuleOptions,
} from './types';

export default defineNuxtModule<ThemeTransitionModuleOptions>({
	meta: {
		name: 'nuxt-theme-transition',
		configKey: 'themeTransition',
	},
	defaults: {
		variant: 'fade',
	},
	setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);
		const variant = options.variant ?? 'fade';
		const effects = resolveThemeTransitionEffects({ ...options, variant });

		nuxt.options.runtimeConfig.public.themeTransition = {
			variant,
			effects,
		};

		addTemplate({
			filename: 'theme-transition.css',
			getContents: () => buildThemeTransitionCss(effects),
		});

		nuxt.options.css.push('#build/theme-transition.css');

		addImportsDir(resolver.resolve('./runtime/composables'));
		addImportsDir(resolver.resolve('./runtime/utils'));

		nuxt.hook('prepare:types', ({ references }) => {
			references.push({ path: resolver.resolve('./types.ts') });
		});
	},
});
