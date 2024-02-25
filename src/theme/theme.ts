import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';
import {extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import Color from 'color';

const primaryColor = 'primaryColor' in window ? String(window.primaryColor) : '#2B284D';
const secondaryColor = 'secondaryColor' in window ? String(window.secondaryColor) : '#FF0080';

const theme = extendTheme({
  fonts: {
    heading: 'DM Sans',
    body: 'Inter',
  },
  components: {
    Code: {
      baseStyle: {
        px: 2,
        py: 1,
        borderRadius: 'lg',
      },
    },
  },
  styles: {
    global: (props: Record<string, unknown>) => ({
      body: {
        bg: 'white',
        color: 'gray.900',
        '.chat-mention': {
          color: 'white',
          bgColor: 'blue.700',
          borderRadius: 'lg',
          fontSize: 'sm',
          padding: '2px 4px',
        },
        '.ProseMirror:focus': {
          outline: 'none',
        },
        '.ProseMirror': {
          maxH: '260px',
          overflow: 'scroll',
        },
        '.ProseMirror, .MessageBubble': {
          // @see https://github.com/jesster2k10/guava-cards/blob/5d5c283eb720bf503258f4e17bce3865d35fd8d3/packages/website/src/bundles/editor/ContentEditor.tsx#L86
          'p.is-editor-empty:first-child::before': {
            content: 'attr(data-placeholder)',
            color: 'gray.500',
            float: 'left',
            pointerEvents: 'none',
            height: 0,
          },
          '&:focus': {
            outline: 'none',
          },
          h1: {
            fontSize: '1.25rem',
          },
          h2: {
            fontSize: '1.15rem',
          },
          h3: {
            fontSize: '1rem',
          },
          'h1, h2, h3, h4,  h5, h6 ': {
            lineHeight: '1.1',
            fontWeight: '700',
          },
          'ul, ol': {
            padding: '0 1.2rem',
            margin: '1em',
          },
          code: {
            bg: 'rgba(#616161, 0.1)',
            color: '#616161',
          },
          pre: {
            fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
            background: mode('gray.900', 'blue.200')(props),
            color: mode('white', 'gray.900')(props),
            padding: '0.75rem 1rem',
            rounded: 'lg',
            whiteSpace: 'pre-wrap',
            code: {
              color: 'inherit',
              p: 0,
              background: 'none',
              fontSize: '0.8rem',
            },

            '.hljs-comment, .hljs-quote': {
              color: '#616161',
            },

            '.hljs-variable, .hljs-template-variable,  .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class':
              {
                color: '#F98181',
              },

            '.hljs-number,  .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal,  .hljs-type, .hljs-params':
              {
                color: '#FBBC88',
              },

            '.hljs-string, .hljs-symbol, .hljs-bullet': {
              color: '#B9F18D',
            },

            '.hljs-title, .hljs-section': {
              color: '#FAF594',
            },

            '.hljs-keyword, .hljs-selector-tag': {
              color: '#70CFF8',
            },

            '.hljs-emphasis': {
              fontStyle: 'italic',
            },

            '.hljs-strong': {
              fontWeight: 700,
            },
          },
          blockquote: {
            pl: 4,
            borderLeft: '2px solid rgba(13, 13, 13, 0.1)',
            borderLeftColor: mode(undefined, 'whiteAlpha.500')(props),
          },
          'span[data-spoiler]': {
            bg: mode('gray.900', 'gray.100')(props),
            _hover: {
              bg: 'transparent',
            },
            // @apply dark:bg-gray-100 bg-gray-900 dark:hover:bg-transparent hover:bg-transparent;
          },
          img: {
            maxW: 'full',
            h: 'auto',
          },
          mark: {
            bg: '#FAF594',
          },
          hr: {
            border: 'none',
            borderTop: '2px solid rgba(13,13,13,.1)',
            margin: '2rem 0',
          },
        },
      },
    }),
  },
  colors: {
    primary: {
      50: Color(primaryColor).lighten(1.2).hex(),
      100: Color(primaryColor).lighten(0.8).hex(),
      200: Color(primaryColor).lighten(0.6).hex(),
      300: Color(primaryColor).lighten(0.4).hex(),
      400: Color(primaryColor).lighten(0.2).hex(),
      500: primaryColor,
      600: Color(primaryColor).darken(0.1).hex(),
      700: Color(primaryColor).darken(0.2).hex(),
      800: Color(primaryColor).darken(0.3).hex(),
      900: Color(primaryColor).darken(0.4).hex(),
    },
    secondary: {
      50: Color(secondaryColor).lighten(1.2).hex(),
      100: Color(secondaryColor).lighten(0.8).hex(),
      200: Color(secondaryColor).lighten(0.6).hex(),
      300: Color(secondaryColor).lighten(0.4).hex(),
      400: Color(secondaryColor).lighten(0.2).hex(),
      500: secondaryColor,
      600: Color(secondaryColor).darken(0.1).hex(),
      700: Color(secondaryColor).darken(0.2).hex(),
      800: Color(secondaryColor).darken(0.3).hex(),
      900: Color(secondaryColor).darken(0.4).hex(),
    },
    moon: {
      50: Color('#F8F7FF').lighten(1.2).hex(),
      100: Color('#F8F7FF').lighten(0.8).hex(),
      200: Color('#F8F7FF').lighten(0.6).hex(),
      300: Color('#F8F7FF').lighten(0.4).hex(),
      400: Color('#F8F7FF').lighten(0.2).hex(),
      500: '#F8F7FF',
      600: Color('#F8F7FF').darken(0.1).hex(),
      700: Color('#F8F7FF').darken(0.2).hex(),
      800: Color('#F8F7FF').darken(0.3).hex(),
      900: Color('#F8F7FF').darken(0.4).hex(),
    },
    gray: {
      '50': '#F9F9FD',
      '100': '#F0F0F5',
      '200': '#D6D5E2',
      '300': '#BCBACF',
      '400': '#8783A9',
      '500': '#6C6897',
      '600': '#575379',
      '700': '#413F5A',
      '800': '#2B2A3C',
      '900': '#16151E',
    },
    yellow: {
      '50': '#FFF8E5',
      '100': '#FFEBB8',
      '200': '#FFDE8A',
      '300': '#FFD15C',
      '400': '#FFC42E',
      '500': '#FFB700',
      '600': '#CC9200',
      '700': '#996E00',
      '800': '#664900',
      '900': '#332500',
    },
    orange: {
      '50': '#FFEFE5',
      '100': '#FFD3B8',
      '200': '#FFB68A',
      '300': '#FF9A5C',
      '400': '#FF7E2E',
      '500': '#FF6100',
      '600': '#CC4E00',
      '700': '#993A00',
      '800': '#662700',
      '900': '#331300',
    },
    pink: {
      '50': '#FFE5F2',
      '100': '#FFB8DB',
      '200': '#FF8AC4',
      '300': '#FF5CAD',
      '400': '#FF2E96',
      '500': '#FF0080',
      '600': '#CC0066',
      '700': '#99004D',
      '800': '#660033',
      '900': '#33001A',
    },
    red: {
      '50': '#FEE6EE',
      '100': '#FDBACE',
      '200': '#FB8EAF',
      '300': '#FA618F',
      '400': '#F83570',
      '500': '#F60950',
      '600': '#C50740',
      '700': '#940530',
      '800': '#630320',
      '900': '#310210',
    },
    cyan: {
      '50': '#E7FBFD',
      '100': '#BCF4FB',
      '200': '#91EDF8',
      '300': '#66E6F5',
      '400': '#3BDFF2',
      '500': '#0FD8F0',
      '600': '#0CADC0',
      '700': '#098290',
      '800': '#065660',
      '900': '#032B30',
    },
    brand: {
      50: Color('#2B284D').lighten(1.2).hex(),
      100: Color('#2B284D').lighten(0.8).hex(),
      200: Color('#2B284D').lighten(0.6).hex(),
      300: Color('#2B284D').lighten(0.4).hex(),
      400: Color('#2B284D').lighten(0.2).hex(),
      500: '#2B284D',
      600: Color('#2B284D').darken(0.1).hex(),
      700: Color('#2B284D').darken(0.2).hex(),
      800: Color('#2B284D').darken(0.3).hex(),
      900: Color('#2B284D').darken(0.4).hex(),
    },
  },
  semanticTokens: {
    colors: {
      text: {
        default: 'brand.700',
        _dark: 'brand.50',
      },
    },
  },
});

export default theme;
