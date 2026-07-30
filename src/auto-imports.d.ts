// Ambient declarations for composables the runtime code relies on as Nuxt
// auto-imports (`#imports`). They have no ambient types outside a real Nuxt
// project, so this package's standalone tsconfig can't resolve them otherwise.
// useState/useRuntimeConfig types are the real ones from `nuxt/app` (type-only,
// erased at build time). useColorMode's shape is replicated from
// `@nuxtjs/color-mode`, which doesn't publicly export it.

import type { useRuntimeConfig as _useRuntimeConfig, useState as _useState } from 'nuxt/app';

declare global {
	const useState: typeof _useState;
	const useRuntimeConfig: typeof _useRuntimeConfig;

	function useColorMode(): {
		preference: string;
		readonly value: string;
		unknown: boolean;
		forced: boolean;
	};
}

export {};
