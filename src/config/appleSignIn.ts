import AppleSignIn from 'apple-sign-in-rest'
import path from 'path'

const appleSignIn = new AppleSignIn({
  clientId: `${process.env.APPLE_CLIENTID}`,
  teamId: `${process.env.APPLE_TEAMID}`,
  keyIdentifier: `${process.env.APPLE_KEYIDENTIFIER}`,
  privateKeyPath: path.resolve(__dirname, '../env/SiWA.p8'),
})

export default appleSignIn
