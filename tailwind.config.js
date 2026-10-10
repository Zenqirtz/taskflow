import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#eeefff',
                    100: '#dad7ff',
                    200: '#c3c0ff',
                    300: '#a8a4ff',
                    400: '#9993ff',
                    500: '#7e77ff',
                    600: '#6b5eff',
                    700: '#4f46e5',
                    800: '#3730a3',
                    900: '#2d1f99',
                },
                surface: {
                    50: '#ffffff',
                    100: '#f0f3ff',
                    200: '#e7eeff',
                    300: '#dee8ff',
                    400: '#d8e3fb',
                    500: '#cfdaf2',
                    600: '#c7c4d8',
                },
                slate: {
                    0: '#f9f9ff',
                    50: '#f0f3ff',
                    100: '#e7eeff',
                    200: '#d8e3fb',
                    300: '#c7c4d8',
                    400: '#777587',
                    500: '#64748b',
                    600: '#464555',
                    700: '#1e293b',
                    800: '#111c2d',
                },
            },
            borderRadius: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '0.75rem',
                lg: '1rem',
                xl: '1.5rem',
            },
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '0.75rem',
                lg: '1rem',
                xl: '1.5rem',
                '2xl': '2rem',
            },
        },
    },

    plugins: [forms],
};
