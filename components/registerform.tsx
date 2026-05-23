"use client";

import {Button} from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/schema/auth";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {useAuthStore} from "@/store/authstore";

export default function RegisterForm() {
    const {register: registerAction} = useAuthStore();
    const router = useRouter();
    const form = useForm({
        resolver : zodResolver(registerSchema),
        defaultValues :{
            name : "",
            email : "",
            password : "",
        }
    })

    const onsubmit = async (data: any) =>{
        console.log('onsubmit called with:', data);
        await registerAction(data);
        router.push('/login');
    }

    const handleFormSubmit = form.handleSubmit(onsubmit);

    return (
        <div className="w-full md:w-[450px] mx-auto mt-10">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className=" flex text-2xl font-bold item-center justify-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(e); }} className="w-full space-y-6" >
                        <FieldGroup className="space-y-4">
                            <Controller name="name" control={form.control} render={({field,fieldState})=>(
                                <Field className="space-y-1">
                                    <FieldLabel className="text-xl font-bold text-primary">NAME</FieldLabel>
                                    <Input className="space-y-1 p-4" placeholder="enter name" {...field}/>
                                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                                </Field>
                            )}/>
                            <Controller name="email" control={form.control} render={({field,fieldState})=>(
                                <Field className="space-y-1">
                                    <FieldLabel className="text-xl font-bold text-primary">EMAIL</FieldLabel>
                                    <Input className="space-y-1 p-4" placeholder="enter email" {...field} type="email"/>
                                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                                </Field>
                            )}/>
                            <Controller name="password" control={form.control} render={({field,fieldState})=>(
                                <Field className="space-y-1">
                                    <FieldLabel className="text-xl font-bold text-primary">PASSWORD</FieldLabel>
                                    <Input className="space-y-1 p-4" placeholder="enter password" {...field} type="password"/>
                                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                                </Field>
                            )}/>
                            <Button variant="ghost" type="submit" className="hover:bg-primary/80">
                                register
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}