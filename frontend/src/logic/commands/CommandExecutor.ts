import { commandRegistry } from './CommandRegistry'

class CommandExecutor {
  private history: string[] = []

  async execute(id: string, args?: unknown) {
    const command = commandRegistry.getCommand(id)
    if (!command) {
      throw new Error(`Command ${id} not found`)
    }

    try {
      await command.execute(args)
      this.history.push(id)
      console.log(`Executed command: ${id}`, args)
    } catch (error) {
      console.error(`Failed to execute command: ${id}`, error)
      throw error
    }
  }

  getHistory() {
    return [...this.history]
  }
}

export const commandExecutor = new CommandExecutor()
