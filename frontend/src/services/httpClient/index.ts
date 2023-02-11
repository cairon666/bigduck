import ky, { HTTPError } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

export class Beda extends Error {
  public error: string;
  public details: number[];
  public code: number;

  constructor(error: string, details: number[], code: number) {
    super(error);

    this.error = error;
    this.details = details;
    this.code = code;
  }
}

export interface loginResp {
  id: string; // TODO сейчас тут только id, нужно отправлять юзерв
}

class HttpClient {
  private url = 'http://localhost:3000/api/v1/';
  private ky: KyInstance;

  public constructor() {
    this.ky = ky.create({
      prefixUrl: this.url,
      timeout: 5000,
      headers: {
        'X-Requested-With': 'ky',
      },
    });
  }

  public async login(login: string, password: string): Promise<loginResp> {
    try {
      const res = await this.ky.post('auth/login', {
        json: {
          login: login,
          password: password,
        },
      });

      return res.json<loginResp>();
    } catch (e) {
      if (e instanceof HTTPError) {
        const err: any = await e.response.json();
        throw new Beda(err.error, err.details, err.code);
      }

      return undefined as any; // TODO fix
    }
  }

  public async register(
    login: string,
    password: string,
    username: string,
    first_name: string,
    second_name: string,
    email: string,
  ): Promise<void> {
    try {
      const res = await this.ky.post('auth/register', {
        json: {
          login: login,
          password: password,
          username: username,
          first_name: first_name,
          second_name: second_name,
          email: email,
        },
      });
    } catch (e) {
      if (e instanceof HTTPError) {
        const err: any = await e.response.json();
        throw new Beda(err.error, err.details, err.code);
      }
    }
  }
}

const httpClient = new HttpClient();

export default httpClient;
