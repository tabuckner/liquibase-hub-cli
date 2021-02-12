import { Command, flags } from '@oclif/command';
import { CreateAPIKeyDTO } from '../../models/create-api-key.dto';
import cli from 'cli-ux';

export default class ApiKeyCreate extends Command {
  static description = 'Create an API Key for a given Organization.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: 'n', description: 'name to print' }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
  }

  // static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(ApiKeyCreate);

    const nextAPIKey = await this.getNextAPIKey();

    this.log(JSON.stringify(nextAPIKey));
    this.log('Command not yet supported.');
  }

  private async getNextAPIKey() {
    const name = await cli.prompt('API Key Name');
    const organizationId = await cli.prompt('Organization ID');

    const nextAPIKey: CreateAPIKeyDTO = {
      name,
      organizationId,
    };

    return nextAPIKey;
  }
}
