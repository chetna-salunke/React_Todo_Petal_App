import { useForm } from "react-hook-form";

function TaskForm({ addTask }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addTask(data.task);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Enter task"
        {...register("task", {
          required:
            "Task is required",

          minLength: {
            value: 3,
            message:
              "Minimum 3 characters",
          },
        })}
      />

      {errors.task && (
        <p>
          {errors.task.message}
        </p>
      )}

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;