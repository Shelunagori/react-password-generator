# react-password-generator

This project is a simple password generator built using React.js. It allows users to generate random passwords with customizable options for length, inclusion of numbers, and special characters.

# Features
   - Generate random passwords with specified length.
   - Option to include numbers and special characters in the generated password.
   - Copy generated password to clipboard with a single click.

# How it Works
The password generation logic is implemented using a combination of React hooks and JavaScript.

   - The `useState` hook is used to manage the state of variables such as password length, inclusion of numbers, and inclusion of special characters.
   - The `useRef` hook is used to create a reference to the password input field, allowing for easy copying to the clipboard.
   - The `useCallback` hook is utilized to memoize the password generation function, ensuring it only re-renders when necessary dependencies change.
   - The `useEffect` hook triggers the password generation function whenever any relevant inputs/methods change.
