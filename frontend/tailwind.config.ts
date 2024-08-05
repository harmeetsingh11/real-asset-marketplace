import flowbitePlugin from 'flowbite/plugin'
import type { Config } from "tailwindcss";

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
	theme: {
		extend: {
      colors: {
        primary:{
          50:  '#dbf5ec',
		      100:  '#cff1e6',
		      200:  '#c3eee0',
		      300:  '#9fe3cd',
		      400:  '#57cfa7',
		      500:  '#0FBA81',
		      600:  '#0ea774',
		      700:  '#0b8c61',
		      800:  '#09704d',
		      900:  '#075b3f',
        }
      }
    }
	},

	plugins: [flowbitePlugin]
} as Config;
