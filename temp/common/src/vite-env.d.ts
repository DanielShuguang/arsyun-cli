/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  [key: string]: string | boolean | undefined
  BASE_URL: string
  MODE: 'development' | 'production'
  DEV: boolean
  PROD: boolean
}
