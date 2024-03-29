const env = process.env.NODE_ENV || 'production'
const BASE_URL = '/api'

const envConfigs = {
  development: {
    baseApi: BASE_URL,
    mockApi: ''
  },
  test: {
    baseApi: BASE_URL,
    mockApi: ''
  },
  production: {
    baseApi: BASE_URL,
    mockApi: ''
  }
}

const config = {
  env,
  mock: false,
  namespace: 'system-storage',
  ...envConfigs[env]
}

export default config
