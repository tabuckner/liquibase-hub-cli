import {expect, test} from '@oclif/test'

describe('pipeline', () => {
  test
  .stdout()
  .command(['pipeline'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['pipeline', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
