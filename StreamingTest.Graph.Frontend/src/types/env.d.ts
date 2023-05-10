interface ImportMetaEnv {
    readonly VITE_API_URI: string
    readonly MODE: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }