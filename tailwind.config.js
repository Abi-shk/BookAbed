/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {    backgroundImage: {
      'custom-background': "url('https://img.freepik.com/free-vector/travel-concept-with-landmarks_1057-4873.jpg?t=st=1718699134~exp=1718702734~hmac=23588318609b7eacddad417b83d143b87436d439d85e9ec175e74c9af7331049&w=826')",
    },},
  },
  plugins: [],
}