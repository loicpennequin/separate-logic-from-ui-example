import type { LoginDto, Nullable } from '@daria/shared';
import { httpService } from './httpService';
import type { TrpcClient } from './trpcClient';
import jwtDecode from 'jwt-decode';

type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};

const REFRESH_ENDPOINT = '/api/auth.refreshJwt';
const AUTH_HEADER = 'authorization';

export type AuthService = ReturnType<typeof createAuthService>;
export const createAuthService = (trpcClient: TrpcClient) => {
  let token: Nullable<string> = null;
  const getBearer = () => (token ? `Bearer ${token}` : '');

  const addHeaders = () => {
    httpService.onRequest(config => {
      if (!token) return;

      if (!config.options.headers) {
        config.options.headers = new Headers();
      }

      if (config.options.headers instanceof Headers) {
        config.options.headers.set(AUTH_HEADER, getBearer());
      } else if (Array.isArray(config.options.headers)) {
        config.options.headers.push([AUTH_HEADER, getBearer()]);
      } else {
        config.options.headers[AUTH_HEADER] = getBearer();
      }
    });
  };

  const checkJwtExpiration = (jwt: string) => {
    const { exp } = jwtDecode<JwtPayload>(jwt);
    const now = new Date();
    const expirationDate = new Date(exp * 1000); // exp is in seconds

    return now.getTime() > expirationDate.getTime();
  };

  const handleRefreshToken = () => {
    // keeping track of the refresh promise for deduping
    // we want to dedupe the refresh token call to ensure it's only called once when needed
    let ongoingRefreshPromise: Nullable<Promise<void>>;

    const refreshJwtIfNeeded = async () => {
      if (!token) return;

      const isExpired = checkJwtExpiration(token);
      if (!isExpired) return;
      token = null;

      const { accessToken } = await trpcClient.auth.refreshJwt.mutate();
      token = accessToken;
    };

    httpService.onRequest(async config => {
      if (config.request.toString().includes(REFRESH_ENDPOINT)) return;

      if (!ongoingRefreshPromise) {
        ongoingRefreshPromise = refreshJwtIfNeeded();
      }

      await ongoingRefreshPromise;
      ongoingRefreshPromise = null;
    });
  };

  const authService = {
    init() {
      handleRefreshToken();
      addHeaders();
      return authService.refreshJwt();
    },

    set token(val: Nullable<string>) {
      token = val;
    },

    get token() {
      return token;
    },

    async login(data: LoginDto) {
      const { accessToken } = await trpcClient.auth.login.mutate(data);
      token = accessToken;
      return accessToken;
    },

    async logout() {
      const result = await trpcClient.auth.logout.mutate();
      token = null;
      return result;
    },

    async refreshJwt() {
      const { accessToken } = await trpcClient.auth.refreshJwt.mutate();
      token = accessToken;
      return accessToken;
    },

    getSession() {
      if (!token) return Promise.resolve(null);
      return trpcClient.auth.session.query();
    }
  };

  return authService;
};
