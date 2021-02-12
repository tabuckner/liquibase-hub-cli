import { Command, flags } from '@oclif/command';

export default class Report extends Command {
  static description = '[WIP] - Topic for Report related commands.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(Report);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from /Users/taylor/Dev/Open-Source/liquibase-hub-cli/src/commands/report.ts`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
