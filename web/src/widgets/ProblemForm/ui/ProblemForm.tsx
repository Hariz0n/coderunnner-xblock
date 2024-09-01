import { Button, Editor } from "@/shared";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { problemSchema, problemSchemaType } from "../types/problemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProblem, useSubmitProblem } from "@/entities/Problem";

export const ProblemForm: FC = () => {
  const { data } = useProblem();
  const { mutateAsync } = useSubmitProblem();
  const form = useForm<problemSchemaType>({
    values: {
      code: data?.code || "",
    },
    resolver: zodResolver(problemSchema),
  });

  const sumbitHandler: SubmitHandler<problemSchemaType> = async (body) => {
    await mutateAsync(body)
  };

  const {
    formState: { isValid, isSubmitting },
  } = form;

  return (
    <form
      onSubmit={form.handleSubmit(sumbitHandler)}
      className="flex flex-col gap-4"
    >
      <Controller
        control={form.control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <Editor onChange={onChange} value={value} />
        )}
      />
      <div className="flex items-center gap-8 justify-end">
        <Button disabled={isSubmitting || !isValid} type="submit">
          {(isSubmitting && "Проверяем...") || "Отправить"}
        </Button>
      </div>
    </form>
  );
};
