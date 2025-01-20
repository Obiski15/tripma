"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { array, object, ObjectSchema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface IForm {
  emails: {
    email: string;
  }[];
}

function ShareItinerary() {
  const schema: ObjectSchema<IForm> = object({
    emails: array()
      .of(
        object({
          email: string().email().required("Email address is required"),
        })
      )
      .required("At least one email address is required"),
  });

  const form = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const { fields, append } = useFieldArray({
    name: "emails",
    control: form.control,
  });

  useEffect(() => {
    form.reset({
      emails: [
        {
          email: "obiski15@gmail.com",
        },
      ],
    });
  }, [form]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-start gap-4 min-[880px]:w-[70%]"
      >
        <h3 className="text-2xl font-bold">Share your travel itinerary</h3>
        <p>
          You can email your itinerary to anyone by entering their email address
          here.
        </p>

        <div className="w-full flex flex-col justify-between items-start gap-3 min-[800px]:w-[50%]">
          {fields.map((field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`emails.${index}.email`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage>
                    {form.formState.errors.emails?.[index]?.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex justify-start items-center gap-4">
          <Button type="submit">Email itinerary</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (fields.length === 5)
                return toast({
                  description: "Maximum number of fields reached",
                  variant: "destructive",
                });
              append({
                email: "",
              });
            }}
          >
            Add another
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ShareItinerary;
