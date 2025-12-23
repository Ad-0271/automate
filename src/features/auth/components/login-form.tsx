"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
})

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: '/',
            }, {
                onSuccess: () => {
                    toast.success("Logged in successfully");
                    router.push("/");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            })
            console.log('data', data);
        } catch (error) {
            toast.error("Invalid email or password");
        }
    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Login to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant={"outline"} className="w-full" type="button" disabled={isPending}>
                                        <Image src="/logos/google.svg" alt="Google" width={20} height={20} />
                                        Continue with Google
                                    </Button>
                                    <Button variant={"outline"} className="w-full" type="button" disabled={isPending}>
                                        <Image src="/logos/github.svg" alt="GitHub" width={20} height={20} />
                                        Continue with GitHub
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="email" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" placeholder="email@example.com"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="password" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="********"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? 'Loging in...': "Login"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don't have an account? {" "}
                                    <Link href="/signup" className="text-primary underline-offset-4 underline">Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}