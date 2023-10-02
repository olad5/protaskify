import { TaskDTO, UserDTO } from '@protaskify/shared/dto';

function taskAssignedTemplate(task: TaskDTO, user: UserDTO) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Task Assigned</title>
</head>
<body>
    <h1>Task Assigned</h1>
    <p>Hello ${user.firstName},</p>
    <p>A new task has been assigned to you. Here are the details:</p>

    <ul>
        <li><strong>Task Title:</strong> ${task.title}</li>
        <li><strong>Task Description:</strong> ${task.description}</li>
        <li><strong>Due Date:</strong> ${task.dueDate}</li>
    </ul>

    <p>Please log in to our platform to view more details and manage the task.</p>

    <p>Thank you for using our service!</p>
</body>
</html>

    `;
}

function taskPassDueDateTemplate(task: TaskDTO, user: UserDTO) {
  return `
<!DOCTYPE html>
<html>
<head>
      <title>Task Due Reminder</title>
</head>
<body>
    <h1>Task Due Reminder</h1>
    <p>Hello ${user.firstName},</p>
    <p>This is a friendly reminder that the following task is due soon:</p>


    <ul>
        <li><strong>Task Title:</strong> ${task.title}</li>
        <li><strong>Task Description:</strong> ${task.description}</li>
    </ul>

    <p>Please log in to our platform to view more details and manage the task.</p>

    <p>Thank you for using our service!</p>
</body>
</html>


    `;
}

export { taskPassDueDateTemplate, taskAssignedTemplate };
