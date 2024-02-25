import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Decal',
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
});
