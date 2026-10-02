"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";

const ForgotpasswordPage = () => {
    const handleforgotPassword = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userdata = Object.fromEntries(formData.entries());
        console.log('User data', userdata)
        const resData=await requestPasswordReset({
            email:userdata.email,
            redirectTo:'/resetpassword'
        })
        toast.success('Password reset email sent. Please check your inbox.')
        console.log('After request password reset', resData)

    }
    return (
        <div>
            <h2>Forgot Password</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={handleforgotPassword}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
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

export default ForgotpasswordPage;