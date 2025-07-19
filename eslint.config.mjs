// eslint.config.mjs
import eslintPlugin from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslintPlugin.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['src/generated/client/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];