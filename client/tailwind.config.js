/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                govBlue: '#0c2340',
                govOrange: '#f4a261',
                govGray: '#f8f9fa',
                success: '#2a9d8f'
            },
        },
    },
    plugins: [],
}
