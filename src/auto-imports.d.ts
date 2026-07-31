// `#imports` is a virtual alias Nuxt generates for every real project's build
// directory (re-exporting all active auto-imports), so it only exists at
// runtime inside a real Nuxt app. This package's standalone tsconfig has no
// such project, so `tsconfig.json` maps the specifier to this file instead.
// useState/useRuntimeConfig types are the real ones from `nuxt/app`
// (type-only, erased at build time). useColorMode's shape is replicated from
// `@nuxtjs/color-mode`, which doesn't publicly export it.

import type { useRuntimeConfig as _useRuntimeConfig, useState as _useState } from 'nuxt/app';

export declare const useState: typeof _useState;
export declare const useRuntimeConfig: typeof _useRuntimeConfig;

export declare function useColorMode(): {
	preference: string;
	readonly value: string;
	unknown: boolean;
	forced: boolean;
};
