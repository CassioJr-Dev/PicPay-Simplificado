import axios from 'axios'

export type AuthorizationTransfer = {
  status: 'success' | 'fail'
  authorization: boolean
}

export class TransferAuthorizationService {
  static async authorize(): Promise<AuthorizationTransfer> {
    try {
      const response = await axios.get(
        'https://util.devi.tools/api/v2/authorize',
      )
      const message = response?.data?.message || ''
      const isAuthorized = message === 'Autorizado'

      return {
        status: 'success',
        authorization: isAuthorized,
      }
    } catch (error) {
      return {
        status: 'fail',
        authorization: false,
      }
    }
  }
}
