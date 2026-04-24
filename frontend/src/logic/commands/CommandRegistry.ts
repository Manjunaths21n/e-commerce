import type { Command } from './types'

class CommandRegistry {
  private commands: Map<string, Command> = new Map()

  register(command: Command) {
    this.commands.set(command.id, command)
  }

  getCommand(id: string): Command | undefined {
    return this.commands.get(id)
  }
}

export const commandRegistry = new CommandRegistry()
