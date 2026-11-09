import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'src/routeTree.gen.ts',
      '.output',
      '.wrangler',
      'node_modules',
      'worker-configuration.d.ts',
    ],
  },
  js.configs.recommended,
  {
    // Scripts que rodam no Node (fora do Worker)
    files: ['scripts/**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Nunca usar dangerouslySetInnerHTML com dados do usuário (ver docs/04-seguranca.md)
      'no-restricted-syntax': [
        'warn',
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: 'Evite dangerouslySetInnerHTML.',
        },
      ],
    },
  },
)
