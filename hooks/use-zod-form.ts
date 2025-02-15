/**
 * @description: A hook to create a form with zod validation and react-hook-form.
 * @see: https://react-hook-form.com/
 * @see: https://zod.dev/
 * @see: https://github.com/react-hook-form/resolvers
 * @see: https://tanstack.com/
 */

import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutateFunction } from "@tanstack/react-query";

/**
 * Hook to create a form instance with Zod validation.
 *
 * This hook wraps react-hook-form's `useForm` and integrates Zod schema-based validation
 * via the `zodResolver`. It provides an `onFormSubmit` handler that automatically validates
 * the form and invokes the provided mutation function with the validated data.
 *
 * @param schema - A Zod schema used for form validation.
 * @param mutationFn - A function (from React Query or data fetching function) that
 *                     processes the validated form data.
 * @param defaultValues - Optional default values to prepopulate the form.
 *
 * @returns An object containing all the methods and properties returned by `useForm`, augmented
 *          with an `onFormSubmit` function that handles form submission.
 *
 * @example
 * // Define your Zod schema.
 * const userSchema = z.object({
 *   name: z.string().min(1, "Name is required"),
 *   email: z.string().email("Invalid email"),
 * });
 *
 * // Example mutation function that might call an API.
 * const mutationFn = useMutation({
 *   mutationFn: async (data: z.infer<typeof userSchema>) => {
 *     // Your implementation here.
 *     await sendDataToAPI(data);
 *   },
 * });
 *
 * // Initialize the form using the hook.
 * const { register, onFormSubmit } = useZodForm(userSchema, mutationFn, { name: "Default Name" });
 *
 * return (
 *   <form onSubmit={onFormSubmit}>
 *     <input {...register("name")} placeholder="Name" />
 *     <input {...register("email")} placeholder="Email" />
 *     <button type="submit">Submit</button>
 *   </form>
 * );
 */

export const useZodForm = <TSchema extends ZodSchema>(
  schema: TSchema,
  mutationFn: UseMutateFunction<
    z.infer<TSchema>,
    unknown,
    z.infer<TSchema>,
    unknown
  >,
  defaultValues?: z.infer<TSchema>
) => {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onFormSubmit = form.handleSubmit((data) => mutationFn(data));

  return { ...form, onFormSubmit };
};
