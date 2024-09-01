import { Button, Editor } from "@/shared";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { problemSchema, problemSchemaType } from "../types/problemSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProblemForm: FC = () => {
  const form = useForm<problemSchemaType>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(problemSchema),
  });

  const sumbitHandler: SubmitHandler<problemSchemaType> = async ({ code }) => {
    console.log(code);
    await new Promise((res) => setTimeout(res, 1000, 11));
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
        render={({ field: { onChange } }) => <Editor onChange={onChange} />}
      />
      <div className="flex items-center gap-8 justify-end">
        <Button disabled={isSubmitting || !isValid} type="submit">
          {(isSubmitting && "Проверяем...") || "Отправить"}
        </Button>
      </div>
    </form>
  );
};
