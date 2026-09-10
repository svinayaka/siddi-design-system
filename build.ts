import StyleDictionary from 'style-dictionary';
import fs from 'node:fs';
import type { TransformedToken } from 'style-dictionary/types';

// Configurable Prefix (can be changed to anything, e.g., "ds", "ui", "siddi", "ksv-ds")
const PREFIX = 'ksv-ds';
const THEME_ATTR = `data-${PREFIX}-theme`;
const THEME_DATASET_KEY = `${PREFIX}-theme`.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());

console.log(`🚀 Building Siddi Design System Tokens with prefix: "--${PREFIX}-"...`);

// Ensure src directory exists
if (!fs.existsSync('./src')) {
  fs.mkdirSync('./src', { recursive: true });
}

// 1. Build Base Colors
const sdColors = new StyleDictionary({
  source: ['tokens/color/primitive.json', 'tokens/color/base.json'],
  platforms: {
    css: {
      prefix: PREFIX,
      transformGroup: 'css',
      buildPath: 'src/',
      files: [
        {
          destination: 'colors.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

// 2. Build Spacing & Sizing
const sdSpacing = new StyleDictionary({
  source: [
    'tokens/size/spacing.json',
    'tokens/size/radius.json',
    'tokens/size/shadow.json',
    'tokens/motion/transition.json',
    'tokens/layout/z-index.json',
  ],
  platforms: {
    css: {
      prefix: PREFIX,
      transformGroup: 'css',
      buildPath: 'src/',
      files: [
        {
          destination: 'spacing.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: true,
          },
        },
      ],
    },
  },
});

// 3. Build Typography
const sdTypography = new StyleDictionary({
  source: ['tokens/typography/*.json'],
  platforms: {
    css: {
      prefix: PREFIX,
      transformGroup: 'css',
      buildPath: 'src/',
      files: [
        {
          destination: 'typography.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: true,
          },
        },
      ],
    },
  },
});

// 4. Build Breakpoints
const sdBreakpoints = new StyleDictionary({
  source: ['tokens/size/spacing.json', 'tokens/layout/breakpoint.json'],
  platforms: {
    css: {
      prefix: PREFIX,
      transformGroup: 'css',
      buildPath: 'src/',
      files: [
        {
          destination: 'breakpoints.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: true,
          },
          filter: (token: TransformedToken) =>
            token.path[0] === 'breakpoint' ||
            token.path[0] === 'container' ||
            token.path[0] === 'gutter',
        },
      ],
    },
  },
});

// Custom formatter for Theme Files (handling dual selectors + media query for dark)
StyleDictionary.registerFormat({
  name: 'css/theme-format',
  format: function ({ dictionary, options }) {
    const selector = options.selector || ':root';
    const lines = dictionary.allTokens
      .filter((token: TransformedToken) => !options.filter || options.filter(token))
      .map((token: TransformedToken) => `  --${token.name}: ${(token as any).$value ?? token.value};`)
      .join('\n');

    let output = `/**
 * Siddi Design System - Generated Theme (${options.themeName || 'Theme'})
 * Generated automatically by Style Dictionary. Do not edit directly.
 */

${selector} {
  color-scheme: ${options.colorScheme || 'light'};

${lines}
}
`;

    if (options.mediaQuery) {
      output += `\n${options.mediaQuery} {
  ${options.mediaQuerySelector || ':root'} {
    color-scheme: ${options.colorScheme || 'dark'};

${lines}
  }
}
`;
    }

    return output;
  },
});

// 5. Build Light Theme
const sdLight = new StyleDictionary({
  source: ['tokens/color/primitive.json', 'tokens/color/base.json', 'tokens/color/light.json'],
  platforms: {
    css: {
      prefix: PREFIX,
      transformGroup: 'css',
      buildPath: 'src/',
      files: [
        {
          destination: 'light.css',
          format: 'css/theme-format',
          options: {
            themeName: 'Light Theme',
            colorScheme: 'light',
            selector: `:root,\n[${THEME_ATTR}="light"],\n[data-theme="light"]`,
            filter: (token: TransformedToken) => token.path[0] !== 'color', // only semantic tokens
          },
        },
      ],
    },
  },
});

// 6. Build Dark Theme
const sdDark = new StyleDictionary({
  source: ['tokens/color/primitive.json', 'tokens/color/base.json', 'tokens/color/dark.json'],
  platforms: {
    css: {
      prefix: PREFIX,
      transformGroup: 'css',
      buildPath: 'src/',
      files: [
        {
          destination: 'dark.css',
          format: 'css/theme-format',
          options: {
            themeName: 'Dark Theme',
            colorScheme: 'dark',
            selector: `[${THEME_ATTR}="dark"],\n[data-theme="dark"]`,
            mediaQuery: '@media (prefers-color-scheme: dark)',
            mediaQuerySelector: `:root:not([${THEME_ATTR}="light"]):not([data-theme="light"])`,
            filter: (token: TransformedToken) => token.path[0] !== 'color', // only semantic tokens
          },
        },
      ],
    },
  },
});

// 7. Build JS/TS Tokens for JS consumers
const sdJS = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'src/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
});

// Execute all builds
try {
  await sdColors.buildAllPlatforms();
  await sdSpacing.buildAllPlatforms();
  await sdTypography.buildAllPlatforms();
  await sdBreakpoints.buildAllPlatforms();
  await sdLight.buildAllPlatforms();
  await sdDark.buildAllPlatforms();
  await sdJS.buildAllPlatforms();

  // Create src/index.css
  const indexCss = `/**
 * Siddi Design System - Main Entrypoint
 * Generated via Style Dictionary token pipeline.
 */

@import "./colors.css";
@import "./spacing.css";
@import "./typography.css";
@import "./breakpoints.css";
@import "./light.css";
@import "./dark.css";

/* Base Resets & Global Defaults */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: var(--${PREFIX}-font-sans);
  font-size: 16px;
  line-height: var(--${PREFIX}-leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--${PREFIX}-bg-canvas);
  color: var(--${PREFIX}-text-primary);
  font-family: inherit;
  transition: background-color var(--${PREFIX}-duration-normal) var(--${PREFIX}-ease-default),
              color var(--${PREFIX}-duration-normal) var(--${PREFIX}-ease-default);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--${PREFIX}-font-display);
  color: var(--${PREFIX}-text-primary);
  margin-top: 0;
  font-weight: var(--${PREFIX}-font-weight-bold);
  line-height: var(--${PREFIX}-leading-tight);
}

/* Links */
a {
  color: var(--${PREFIX}-text-link);
  text-decoration: none;
  transition: color var(--${PREFIX}-duration-fast) var(--${PREFIX}-ease-default);
}

a:hover {
  color: var(--${PREFIX}-text-link-hover);
}

/* Accessible focus ring */
:focus-visible {
  outline: none;
  box-shadow: var(--${PREFIX}-focus-ring);
}
`;

  fs.writeFileSync('./src/index.css', indexCss);

  // Generate interactive test.html with active prefix & theme attribute
  const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Siddi Design System - Token Test (${PREFIX})</title>
  <link rel="stylesheet" href="./src/index.css" />
  <style>
    .container {
      max-width: var(--${PREFIX}-container-lg, 1024px);
      margin: 0 auto;
      padding: var(--${PREFIX}-space-8, 32px) var(--${PREFIX}-space-4, 16px);
    }
    .header {
      margin-bottom: var(--${PREFIX}-space-8, 32px);
      padding-bottom: var(--${PREFIX}-space-4, 16px);
      border-bottom: 1px solid var(--${PREFIX}-border-subtle);
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: var(--${PREFIX}-text-xs, 12px);
      font-weight: var(--${PREFIX}-font-weight-semibold, 600);
      border-radius: var(--${PREFIX}-radius-full, 9999px);
      background-color: var(--${PREFIX}-interactive-primary);
      color: var(--${PREFIX}-interactive-primary-text);
      margin-bottom: var(--${PREFIX}-space-2, 8px);
    }
    .theme-controls {
      display: flex;
      gap: var(--${PREFIX}-space-3, 12px);
      margin: var(--${PREFIX}-space-4, 16px) 0;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: var(--${PREFIX}-space-2, 8px) var(--${PREFIX}-space-4, 16px);
      font-family: inherit;
      font-size: var(--${PREFIX}-text-sm, 14px);
      font-weight: var(--${PREFIX}-font-weight-medium, 500);
      border-radius: var(--${PREFIX}-radius-lg, 8px);
      border: 1px solid var(--${PREFIX}-border-default);
      background: var(--${PREFIX}-bg-surface);
      color: var(--${PREFIX}-text-primary);
      cursor: pointer;
      transition: all var(--${PREFIX}-duration-fast, 150ms) ease;
    }
    .btn:hover {
      background: var(--${PREFIX}-bg-subtle);
      border-color: var(--${PREFIX}-border-strong);
    }
    .btn-primary {
      background: var(--${PREFIX}-interactive-primary);
      color: var(--${PREFIX}-interactive-primary-text);
      border-color: transparent;
    }
    .btn-primary:hover {
      background: var(--${PREFIX}-interactive-primary-hover);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: var(--${PREFIX}-space-4, 16px);
      margin-top: var(--${PREFIX}-space-6, 24px);
    }
    .card {
      background: var(--${PREFIX}-bg-surface);
      border: 1px solid var(--${PREFIX}-border-subtle);
      border-radius: var(--${PREFIX}-radius-xl, 12px);
      padding: var(--${PREFIX}-space-5, 20px);
      box-shadow: var(--${PREFIX}-shadow-sm);
      transition: transform var(--${PREFIX}-duration-fast, 150ms) ease, box-shadow var(--${PREFIX}-duration-fast, 150ms) ease;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--${PREFIX}-shadow-md);
      border-color: var(--${PREFIX}-border-default);
    }
    .swatch {
      height: 60px;
      border-radius: var(--${PREFIX}-radius-md, 6px);
      margin-bottom: var(--${PREFIX}-space-3, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--${PREFIX}-text-xs, 12px);
      font-weight: var(--${PREFIX}-font-weight-medium, 500);
      border: 1px solid var(--${PREFIX}-border-subtle);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Prefix: --${PREFIX}- | Theme Attr: ${THEME_ATTR}</div>
      <h1>Token Verification & Theme Tester</h1>
      <p style="color: var(--${PREFIX}-text-secondary); margin: 0;">
        Toggle themes below to verify token synchronization in real time.
      </p>

      <div class="theme-controls">
        <button class="btn btn-primary" onclick="setTheme('light')">☀️ Light Mode</button>
        <button class="btn" onclick="setTheme('dark')">🌙 Dark Mode</button>
        <button class="btn" onclick="setTheme('auto')">⚡ System Auto</button>
      </div>
      <p style="font-size: var(--${PREFIX}-text-xs, 12px); color: var(--${PREFIX}-text-muted);">
        Active Attribute: <code id="active-theme-label">&lt;html ${THEME_ATTR}="light"&gt;</code>
      </p>
    </div>

    <h2>Semantic Tokens Preview</h2>
    <div class="grid">
      <div class="card">
        <div class="swatch" style="background: var(--${PREFIX}-bg-canvas); color: var(--${PREFIX}-text-primary);">Canvas</div>
        <strong>bg-canvas</strong>
        <p style="color: var(--${PREFIX}-text-secondary); font-size: var(--${PREFIX}-text-xs, 12px); margin: 4px 0 0 0;">Page background</p>
      </div>

      <div class="card">
        <div class="swatch" style="background: var(--${PREFIX}-bg-surface-elevated); color: var(--${PREFIX}-text-primary);">Elevated</div>
        <strong>bg-surface-elevated</strong>
        <p style="color: var(--${PREFIX}-text-secondary); font-size: var(--${PREFIX}-text-xs, 12px); margin: 4px 0 0 0;">Card & modal surface</p>
      </div>

      <div class="card">
        <div class="swatch" style="background: var(--${PREFIX}-interactive-primary); color: var(--${PREFIX}-interactive-primary-text);">Primary</div>
        <strong>interactive-primary</strong>
        <p style="color: var(--${PREFIX}-text-secondary); font-size: var(--${PREFIX}-text-xs, 12px); margin: 4px 0 0 0;">Call-to-action color</p>
      </div>

      <div class="card">
        <div class="swatch" style="background: var(--${PREFIX}-status-success-bg); color: var(--${PREFIX}-status-success-text); border-color: var(--${PREFIX}-status-success-border);">Success</div>
        <strong>status-success</strong>
        <p style="color: var(--${PREFIX}-text-secondary); font-size: var(--${PREFIX}-text-xs, 12px); margin: 4px 0 0 0;">Success banner / alert</p>
      </div>
    </div>
  </div>

  <script>
    function updateLabel() {
      const current = document.documentElement.dataset.${THEME_DATASET_KEY};
      const label = document.getElementById('active-theme-label');
      if (current) {
        label.textContent = '<html ${THEME_ATTR}="' + current + '">';
      } else {
        label.textContent = '<html (no attribute - prefers-color-scheme active)>';
      }
    }

    function setTheme(theme) {
      if (theme === 'auto') {
        delete document.documentElement.dataset.${THEME_DATASET_KEY};
      } else {
        document.documentElement.dataset.${THEME_DATASET_KEY} = theme;
      }
      updateLabel();
    }

    updateLabel();
  </script>
</body>
</html>`;

  fs.writeFileSync('./test.html', testHtml);
  console.log('✅ All tokens and stylesheets built successfully!');
} catch (err) {
  console.error('❌ Build failed:', err);
  process.exit(1);
}
