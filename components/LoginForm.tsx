"use client";

import {Button} from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema,LoginType } from "@/app/schema/loginschema";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {useAuthStore} from "@/store/authstore";
import { Spinner } from "./ui/spinner";


export default function LoginForm() {

    const {loading} = useAuthStore();
    const loginuser = useAuthStore((state) => state.login);
    const router = useRouter();
    const {register, handleSubmit, formState: { errors }} = useForm<LoginType>({
        resolver : zodResolver(loginSchema),
        defaultValues :{
            email: "",
            password: "",
        }
    });

    type LoginResponse = { _id: string; name: string; email: string; role: "client" | "freelancer"; };

    const onsubmit = async (data: any) =>{
        console.log('login called with:', data);
        const loginResult : LoginResponse | null = await loginuser(data);
        console.log('login result:', loginResult);
        if (loginResult?.role === "client") {
            router.push('/client/dashboard');
        }
        else if (loginResult?.role === "freelancer") {
            router.push('/freelancer/dashboard');
        }
        router.push('/login');
    }

    return (
        <div className="w-full md:w-[450px] mx-auto mt-10">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className=" flex text-2xl font-bold item-center justify-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onsubmit)} className="w-full space-y-6" >
                        <FieldGroup className="space-y-4">
                           <Field className="space-y-1">
                                <FieldLabel className="text-xl font-bold text-primary">EMAIL</FieldLabel>
                                <Input className="space-y-1 p-4" placeholder="enter email" type="email" {...register("email")} />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {
                                            errors.email
                                                .message
                                        }
                                    </p>
                                )}
                            </Field>
                            <Field className="space-y-1">
                                <FieldLabel className="text-xl font-bold text-primary">PASSWORD</FieldLabel>
                                <Input className="space-y-1 p-4" placeholder="enter password" type="password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {
                                            errors.password
                                                .message
                                        }
                                    </p>
                                )}
                            </Field>
                            {loading ? (
                                <Button disabled className="w-full" >
                                    <Spinner/>
                                </Button>
                            ) : (
                                <Button variant="ghost" type="submit" className="w-full hover:bg-primary/80">
                                    Login
                                </Button>
                            )}
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}