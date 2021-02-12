import { Command } from '@oclif/command';
import AuthStatus, { AUTH_STATUS_FLAGS } from './status';

export default class Auth extends Command {
  static description = 'Topic for authentication related commands. Can be used as an Alias for auth:status'

  static flags = AUTH_STATUS_FLAGS;

  async run() {
    return AuthStatus.run([]);
  }
}
