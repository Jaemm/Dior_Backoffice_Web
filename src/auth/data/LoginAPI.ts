import { useAPI } from '../../api/API';
import {
  LoginDTO,
  UserStateDTO,
  userStateSchema,
  SwitchAppDTO,
  switchAppSchema,
} from './LoginDTO';

export function useLoginAPI() {
  const { requestJSON } = useAPI();

  return {
    login: (values: LoginDTO) =>
      requestJSON<LoginDTO, UserStateDTO>(
        'POST',
        '/api/partnerdb/consultants/login',
        {
          data: values,
        }
      ).then((data) => userStateSchema.cast(data)),
  };
}

export function useSwitchAppAPI() {
  const { requestJSON } = useAPI();

  return {
    switchApp: (values: SwitchAppDTO) =>
      requestJSON<SwitchAppDTO, UserStateDTO>(
        'POST',
        '/api/partnerdb/consultants/switch_app',
        {
          data: values,
        }
      ).then((data) => userStateSchema.cast(data.data)),
  };
}
