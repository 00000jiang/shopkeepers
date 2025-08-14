const env = 'dev'

export default {
  active: env,
  location: env === 'dev' ? 'http://localhost:8081' : 'xxxx'
}
