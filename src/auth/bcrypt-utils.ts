import Bcrypt from 'bcrypt';
const salt = 10;

export class BcryptUtil {
  private bcrypt: typeof Bcrypt;
  private constructor(bcrypt: typeof Bcrypt, private salt: number) {
    this.bcrypt = Bcrypt;
    this.salt = salt;
  }

  public static init(): BcryptUtil {
    return new BcryptUtil(Bcrypt, salt);
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return this.bcrypt.compareSync(password, encrypted);
  }

  async encriptPassword(password: string): Promise<string> {
    return this.bcrypt.hashSync(password, this.salt);
  }
}
