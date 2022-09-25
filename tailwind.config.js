/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './src/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: ['Open Sans', 'sans-serif'],
            body: ['Open Sans', 'sans-serif'],
        },
        extend: {
            fontSize: {
                14: '14px',
            },
            backgroundColor: {
                'main-bg': '#0A226B',
                'main-dark-bg': '#20232A',
                'secondary-dark-bg': '#33373E',
                'light-gray': '#F7F7F7',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
            },
            borderWidth: {
                1: '1px',
            },
            borderColor: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            width: {
                400: '400px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
                1200: '1200px',
                1400: '1400px',
            },
            height: {
                80: '80px',
            },
            minHeight: {
                590: '590px',
            },
            backgroundImage: {
            },
            dropShadow: {
                'login': [
                    '20px 20px 20px #0C2983',
                    '-20px -20px 20px #081B53'
                ],
                'login-button': [
                    '6px 6px 4px #0C2983',
                    '-6px -6px 7px #081B53'
                ],
                'login-blob': [
                    '6px 10px 7px #1f48bf',
                    '4px -6px 8px #081B53'
                ]
            }
        },
    },
    plugins: [
    ],
}