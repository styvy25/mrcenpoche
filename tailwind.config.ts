
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				mrc: {
					blue: '#005BAA',
					red: '#E30016',
					green: '#009A44',
					yellow: '#FCD116',
					white: '#FFFFFF',
					dark: '#222222',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New color palette based on the provided image
				palette: {
					royalblue: {
						50: '#F7FBFD',
						100: '#E7F8FD',
						200: '#C2E8FB',
						300: '#9AD1FB',
						400: '#62A6FB',
						500: '#3178FA',
						600: '#2054F4',
						700: '#1C42DE',
						800: '#1733AB',
						900: '#132983',
					},
					purple: {
						50: '#F6F5FA',
						100: '#F1E7FA',
						200: '#E5C8F8',
						300: '#D9A7F7',
						400: '#D279F6',
						500: '#CB4DF6',
						600: '#B231F0',
						700: '#8A27DB',
						800: '#6A22B1',
						900: '#541E8C',
					},
					pink: {
						50: '#FDFDF9',
						100: '#FDEEF5',
						200: '#FBCEEA',
						300: '#FAAA49',
						400: '#FB6ABC',
						500: '#FC49B',
						600: '#F62573',
						700: '#DB1D5A',
						800: '#AE1844',
						900: '#891535',
					},
					red: {
						50: '#FCF8F6',
						100: '#FCEFED',
						200: '#FAD6D8',
						300: '#F9B3B4',
						400: '#F97F7D',
						500: '#F74434',
						600: '#F23434',
						700: '#D42730',
						800: '#A9202C',
						900: '#861B25',
					},
					orange: {
						50: '#FAF6EC',
						100: '#FBEED3',
						200: '#F8DFA4',
						300: '#F5C763',
						400: '#F2A229',
						500: '#F17B12',
						600: '#E4560C',
						700: '#C34010',
						800: '#9E3316',
						900: '#802A17',
					},
					gold: {
						50: '#FAF7ED',
						100: '#FAF3CE',
						200: '#F6E992',
						300: '#F0D64C',
						400: '#E6B81A',
						500: '#DC9609',
						600: '#C57106',
						700: '#9E5509',
						800: '#544A0C',
						900: '#41370E',
					},
					green: {
						50: '#F1F9F7',
						100: '#F9F8D8',
						200: '#F3F099',
						300: '#EAE151',
						400: '#D5C51A',
						500: '#15BC5A',
						600: '#119F40',
						700: '#167E39',
						800: '#186334',
						900: '#164F2D',
					},
					teal: {
						50: '#E2F8EF',
						100: '#DAFF9',
						200: '#BFF2D8',
						300: '#8AE7BA',
						400: '#3AD58A',
						500: '#15BC5A',
						600: '#119F40',
						700: '#168139',
						800: '#186334',
						900: '#164F2D',
					},
					cyan: {
						50: '#F0F9FB',
						100: '#DAFF79',
						200: '#ACEEF2',
						300: '#74E1EC',
						400: '#2FC8E3',
						500: '#11ABD6',
						600: '#0D87BF',
						700: '#126C9A',
						800: '#135372',
						900: '#114359',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-mrc': 'linear-gradient(90deg, #005BAA 0%, #E30016 100%)',
				'gradient-cameroon': 'linear-gradient(90deg, #009A44 0%, #FCD116 50%, #E30016 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
