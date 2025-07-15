import { classname } from "@/utils/classname";
import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useLogin from "./useLogin";

const Login = () => {
    const {
        isPasswordVisible,
        togglePasswordVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    } = useLogin();

    return (
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-full items-center justify-center">
            <div className='flex flex-col w-full lg:w-1/3 items-center justify-center gap-10'>
                <Image src='/images/general/logo.svg' alt='logo' width={180} height={180} />
                <Image src='/images/illustrations/login.svg' alt='login' className='w-2/3 lg:w-full' width={1024} height={1024} />
            </div>
            <Card>
                <CardBody className='p-8'>
                    <h2 className='text-2xl font-bold text-danger-500'>Login</h2>
                    <p className='text-small mt-2 mb-4'>
                        {`Don't have an account`}?&nbsp;
                        <Link href='/auth/register' className='font-semibold text-danger-400'>
                            Register here
                        </Link>
                    </p>
                    {errors.root && (
                        <p className='mb-2 font-medium text-danger'>
                            {errors?.root?.message}
                        </p>
                    )}
                    <form className={classname('flex flex-col w-80', Object.keys(errors).length > 0 ? 'gap-2' : 'gap-4')} onSubmit={handleSubmit(handleLogin)}>
                        <Controller name='identifier' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type='text'
                                label='Email / Username'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.identifier !== undefined}
                                errorMessage={errors.identifier?.message}
                            />
                        )} />
                        <Controller name='password' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type={isPasswordVisible ? 'text' : 'password'}
                                label='Password'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.password !== undefined}
                                errorMessage={errors.password?.message}
                                endContent={
                                    <button className='focus:outline-none' type='button' onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? (
                                            <FaEye className='text-xl text-default-400 pointer-events-none' />
                                        ) : (
                                            <FaEyeSlash className='text-xl text-default-400 pointer-events-none' />
                                        )}
                                    </button>
                                }
                            />
                        )} />
                        <Button color='danger' size='lg' type='submit'>
                            {isPendingLogin ? <Spinner color='white' size='sm' /> : 'Login'}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;