import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
    fullName: yup.string().required('Please input your full name.'),
    username: yup.string().required('Please input your username.'),
    email: yup
        .string()
        .email('Email format is not valid.')
        .required('Please input your email.'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Please input your password.'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Password confirmation must match password')
        .required('Please input the password confirmation.'),
});

const useRegister = () => {
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const {setToaster} = useContext(ToasterContext);

    const handleVisiblePassword = (key: 'password' | 'confirmPassword') => {
        setVisiblePassword({
            ...visiblePassword,
            [key]: !visiblePassword[key],
        })
    };

    const { control, handleSubmit, formState: {errors}, reset, setError } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    }

    const {mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
        mutationFn: registerService,
        onError: (error) => {
            setToaster({type: 'error', message: error.message});
        },
        onSuccess: () => {
            reset();
            setToaster({type: 'success', message: 'Registration Complete'});
            router.push('/auth/register/success');
        }
    });

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors,
    };
}

export default useRegister;