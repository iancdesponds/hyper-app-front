/// <reference types="vite/client" />

// Declare aqui todas as VITE_* que você usa
interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // ex:
    // readonly VITE_OTHER_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }