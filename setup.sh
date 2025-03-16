#!/bin/bash

echo "Cleaning up node_modules..."
rm -rf node_modules
rm -f package-lock.json

echo "Installing dependencies..."
npm install

echo "Installing missing type definitions..."
npm install --save-dev @types/babel__core @types/babel__generator @types/babel__template @types/babel__traverse @types/estree @types/json-schema @types/node

echo "Verifying Tailwind CSS installation..."
npx tailwindcss --help

echo "Verifying Vite installation..."
npx vite --version

echo "Setup complete! Run 'npm run dev' to start the development server."
