import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // Ensure you have this plugin for resolving TS paths

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: 'src/index.ts', // Ensure this is the correct path to your entry file
      name: 'Decal',
      formats: ['es', 'cjs'], // Specify the formats you want to generate
      fileName: (format) => `decal.${format}.js`,
    },
    rollupOptions: {
      input: './src/index.ts',
      external: ['react', 'react-dom', '@chakra-ui/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@chakra-ui/react': 'ChakraUI',
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
