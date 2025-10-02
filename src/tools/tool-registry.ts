import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ToolHandler, ToolInput } from './tool-handler.js';

/**
 * Central registry for managing MCP tool handlers, providing registration,
 * discovery, and execution of Tyler Forge documentation tools.
 *
 * The registry maintains a mapping of tool names to their handlers and provides
 * unified access for the MCP protocol to discover and execute available tools.
 */
export class ToolRegistry {
  private readonly _handlers = new Map<string, ToolHandler>();

  /**
   * Register a tool handler in the registry.
   *
   * @param handler - The tool handler to register
   * @throws Error if a tool with the same name is already registered
   */
  public register<TInput extends ToolInput>(
    handler: ToolHandler<TInput>,
  ): void {
    const tool = handler.getTool();
    this._handlers.set(tool.name, handler);
  }

  /**
   * Get all registered tools formatted for MCP protocol discovery.
   *
   * @returns Array of Tool definitions for MCP client consumption
   */
  public getTools(): Tool[] {
    return Array.from(this._handlers.values()).map(handler =>
      handler.getTool(),
    );
  }

  /**
   * Execute a registered tool by name with the provided arguments.
   *
   * @param name - The name of the tool to execute
   * @param args - The arguments to pass to the tool (optional)
   * @returns Promise resolving to the tool execution result
   * @throws Error if the tool name is not found in the registry
   */
  public async execute(
    name: string,
    args: ToolInput | undefined,
  ): Promise<CallToolResult> {
    const handler = this._handlers.get(name);
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    return await handler.execute(args || {});
  }
}
