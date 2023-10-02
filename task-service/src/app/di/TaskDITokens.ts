export class TaskDITokens {
  // Use-cases

  public static readonly CreateTaskUseCase: unique symbol =
    Symbol('CreateTaskUseCase');

  public static readonly GetTaskByTaskIdUseCase: unique symbol = Symbol(
    'GetTaskByTaskIdUseCase'
  );

  public static readonly GetTasksAssignedToUserUseCase: unique symbol = Symbol(
    'GetTasksAssignedToUserUseCase'
  );

  public static readonly GetTasksByProjectIdUseCase: unique symbol = Symbol(
    'GetTasksByProjectIdUseCase'
  );

  public static readonly AssignTaskUseCase: unique symbol =
    Symbol('AssignTaskUseCase');

  public static readonly CreateProjectUseCase: unique symbol = Symbol(
    'CreateProjectUseCase'
  );

  public static readonly GetProjectByProjectIdUseCase: unique symbol = Symbol(
    'GetProjectByProjectIdUseCase'
  );

  public static readonly NotifyUserTaskIsDueUseCase: unique symbol = Symbol(
    'NotifyUserTaskIsDueUseCase'
  );

  // Repositories

  public static readonly TaskRepository: unique symbol =
    Symbol('TaskRepository');

  public static readonly ProjectRepository: unique symbol =
    Symbol('ProjectRepository');
}
