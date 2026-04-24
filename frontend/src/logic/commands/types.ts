export interface Command<T = unknown> {
  id: string;
  execute: (args: T) => void | Promise<void>;
  undo?: () => void | Promise<void>;
}
