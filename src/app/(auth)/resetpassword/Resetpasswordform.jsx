"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import { resetPassword } from '@/lib/auth-client';

const Resetpasswordform = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const Userdata = Object.fromEntries(formData.entries());
        const resdata=await resetPassword({
            newPassword:Userdata.password,
            token
        });
        console.log('After reset password', resdata)
        toast.success('Password reset successful. You can now log in with your new password.');
    };

    return (
        <div>
            <h2>Create a New Password</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Resetpasswordform;