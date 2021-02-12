import { Command, flags } from '@oclif/command';

export default class Project extends Command {
  static description = 'Topic for Project related commands.'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
  }

  async run() {
    this.parse(Project);
  }
}
