@liquibase/lh-cli
=================

A CLI tool for managing your experience with Liquibase-Hub

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@liquibase/lh-cli.svg)](https://npmjs.org/package/@liquibase/lh-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@liquibase/lh-cli.svg)](https://npmjs.org/package/@liquibase/lh-cli)
[![License](https://img.shields.io/npm/l/@liquibase/lh-cli.svg)](https://github.com/tabuckner/liquibase-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @liquibase/lh-cli
$ lh COMMAND
running command...
$ lh (-v|--version|version)
@liquibase/lh-cli/0.0.0 darwin-x64 node-v12.14.1
$ lh --help [COMMAND]
USAGE
  $ lh COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lh api-key [FILE]`](#lh-api-key-file)
* [`lh auth`](#lh-auth)
* [`lh auth:login`](#lh-authlogin)
* [`lh auth:logout`](#lh-authlogout)
* [`lh auth:status`](#lh-authstatus)
* [`lh connection [FILE]`](#lh-connection-file)
* [`lh help [COMMAND]`](#lh-help-command)
* [`lh invitation [FILE]`](#lh-invitation-file)
* [`lh organization [FILE]`](#lh-organization-file)
* [`lh organization:create`](#lh-organizationcreate)
* [`lh pipeline [FILE]`](#lh-pipeline-file)
* [`lh project`](#lh-project)
* [`lh project:create [NAME] [DESCRIPTION]`](#lh-projectcreate-name-description)
* [`lh project:delete [PROJECTID]`](#lh-projectdelete-projectid)
* [`lh project:list`](#lh-projectlist)
* [`lh project:view [PROJECTID]`](#lh-projectview-projectid)
* [`lh report [FILE]`](#lh-report-file)

## `lh api-key [FILE]`

describe the command here

```
USAGE
  $ lh api-key [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/api-key.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/api-key.ts)_

## `lh auth`

Topic for authentication related commands. Can be used as an Alias for auth:status

```
USAGE
  $ lh auth

OPTIONS
  -h, --help     show CLI help
  -s, --showKey  Enable to show the contents of the API Key.
```

_See code: [src/commands/auth/index.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/auth/index.ts)_

## `lh auth:login`

Authenticate the CLI with an API Key generated in Liquibase Hub.

```
USAGE
  $ lh auth:login

OPTIONS
  -h, --help    show CLI help
  -n, --noOpen  Disables the automatic opening of the API Keys Dashboard page in Liquibase Hub.
```

_See code: [src/commands/auth/login.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/auth/login.ts)_

## `lh auth:logout`

Remove all stored credentials used in Authentication.

```
USAGE
  $ lh auth:logout

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/auth/logout.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/auth/logout.ts)_

## `lh auth:status`

Check the current Authentication Status.

```
USAGE
  $ lh auth:status

OPTIONS
  -h, --help     show CLI help
  -s, --showKey  Enable to show the contents of the API Key.
```

_See code: [src/commands/auth/status.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/auth/status.ts)_

## `lh connection [FILE]`

describe the command here

```
USAGE
  $ lh connection [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/connection.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/connection.ts)_

## `lh help [COMMAND]`

display help for lh

```
USAGE
  $ lh help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `lh invitation [FILE]`

describe the command here

```
USAGE
  $ lh invitation [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/invitation.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/invitation.ts)_

## `lh organization [FILE]`

[WIP]

```
USAGE
  $ lh organization [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/organization/index.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/organization/index.ts)_

## `lh organization:create`

Creates an Organization.

```
USAGE
  $ lh organization:create

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/organization/create.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/organization/create.ts)_

## `lh pipeline [FILE]`

describe the command here

```
USAGE
  $ lh pipeline [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/pipeline.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/pipeline.ts)_

## `lh project`

Topic for Project related commands.

```
USAGE
  $ lh project

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/project/index.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/project/index.ts)_

## `lh project:create [NAME] [DESCRIPTION]`

Create a new Project for the current Organization. All arguments and flags are optional, the CLI will prompt you for what it needs if it is not provided.

```
USAGE
  $ lh project:create [NAME] [DESCRIPTION]

OPTIONS
  -d, --description=description  Description of the New Project
  -h, --help                     show CLI help
  -n, --name=name                Name of the New Project
```

_See code: [src/commands/project/create.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/project/create.ts)_

## `lh project:delete [PROJECTID]`

Delete a Project for the current Organization.

```
USAGE
  $ lh project:delete [PROJECTID]

ARGUMENTS
  PROJECTID  The ID of the Project you wish to delete.

OPTIONS
  -h, --help   show CLI help
  -i, --id=id  The ID of the Project you wish to delete.
```

_See code: [src/commands/project/delete.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/project/delete.ts)_

## `lh project:list`

Lists Projects available for current Organization.

```
USAGE
  $ lh project:list

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/project/list.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/project/list.ts)_

## `lh project:view [PROJECTID]`

Open a given Project in your preferred web browser.

```
USAGE
  $ lh project:view [PROJECTID]

ARGUMENTS
  PROJECTID  The ID of the Project you wish to view.

OPTIONS
  -h, --help   show CLI help
  -i, --id=id  The ID of the Project you wish to view.
```

_See code: [src/commands/project/view.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/project/view.ts)_

## `lh report [FILE]`

describe the command here

```
USAGE
  $ lh report [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/report.ts](https://github.com/tabuckner/liquibase-cli/blob/v0.0.0/src/commands/report.ts)_
<!-- commandsstop -->
