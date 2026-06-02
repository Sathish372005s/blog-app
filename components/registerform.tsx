"use client";

import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema,RegisterType } from "@/app/validation/auth";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {useAuthStore} from "@/store/authstore";



export default function RegisterForm() {
    const { loading} = useAuthStore();
    const registeruser = useAuthStore((state) => state.register);
    const router = useRouter();

    const {register, handleSubmit, formState: { errors }} = useForm<RegisterType>({
        resolver : zodResolver(registerSchema),
        defaultValues :{
            name: "",
            email: "",
            password: "",
            role: "client"
        }
    });

    const onsubmit = async (data : RegisterType) =>{
        console.log('onsubmit called with:', data);
        await registeruser(data);
        router.push('/login');
    }

    return (
        <div className="w-full md:w-[450px] mx-auto mt-10">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className=" flex text-2xl font-bold item-center justify-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onsubmit)} className="w-full space-y-6" >
                        <FieldGroup className="space-y-4">
                            <Field className="space-y-1">
                                <FieldLabel className="text-xl font-bold text-primary">NAME</FieldLabel>
                                <Input className="space-y-1 p-4" placeholder="enter name" {...register("name")} />
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {
                                            errors.name
                                                .message
                                        }
                                    </p>
                                )}
                            </Field>
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
                            <Field className="space-y-1">
                                <FieldLabel className="text-xl font-bold text-primary">ROLE</FieldLabel>
                                <select className="w-full p-4 border rounded" {...register("role")}>
                                    <option value="client" className="text-black">Client</option>
                                    <option value="freelancer" className="text-black">Freelancer</option>
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-500">
                                        {
                                            errors.role
                                                .message
                                        }
                                    </p>
                                )}
                            </Field>
                            {
                                loading ? (
                                    <Button variant="ghost" disabled className="w-full">
                                        <Spinner />
                                    </Button>
                                ) : (
                                    <Button variant="ghost" type="submit" className="w-full hover:bg-primary/80">
                                        Register
                                    </Button>
                                )
                            }
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}