import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	safelist: [
		'focus:border-[1.5px]',
        'focus:border-blue-600',
        'valid:border-blue-600',
        'focus:border-red-600',
        'valid:border-red-600',
        'valid:outline-none',
        'focus:outline-none'
    ],
	plugins: [typography, forms, containerQueries]
} satisfies Config;
