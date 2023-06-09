export const apiPort = 8081
export const clientPort = 9000
export const mongoPort = 27017
// Lo siguiente debería ser cambiado en producción
export const clientHost = `https://localhost:${clientPort}`
export const apiHost = `https://localhost:${apiPort}`
export const clientServerKeyPath = 'server.key'
export const clientServerCertPath = 'server.crt'
export const apiServerKeyPath = 'server.key'
export const apiServerCertPath = 'server.crt'
export const mongoHost = 'localhost'
export const fakeCryptoSalt = 'fakeCryptoSalt'
// Cosas de JWT
export const jwtProps = {
    issuer: 'UMS',
    audience: 'UMS Audience',
    expiresIn: '14d',
    algorithm: 'SHA256',
}
