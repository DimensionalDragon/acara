import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { classname } from "@/utils/classname";

const Register = () => {
    const {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors,
    } = useRegister();

    return (
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-full items-center justify-center">
            <div className='flex flex-col w-full lg:w-1/3 items-center justify-center gap-10'>
                <Image src='/images/general/logo.svg' alt='logo' width={180} height={180} />
                <Image src='/images/illustrations/login.svg' alt='login' className='w-2/3 lg:w-full' width={1024} height={1024} />
            </div>
            <Card>
                <CardBody className='p-8'>
                    <h2 className='text-xl font-bold text-danger-500'>Create Account</h2>
                    <p className='text-small mb-4'>
                        Have an account?&nbsp;
                        <Link href='/auth/login' className='font-semibold text-danger-400'>
                            Login here
                        </Link>
                    </p>
                    {errors.root && (
                        <p className='mb-2 font-medium text-danger'>
                            {errors?.root?.message}
                        </p>
                    )}
                    <form className={classname('flex flex-col w-80', Object.keys(errors).length > 0 ? 'gap-2' : 'gap-4')} onSubmit={handleSubmit(handleRegister)}>
                        <Controller name='fullName' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type='text'
                                label='Full Name'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.fullName !== undefined}
                                errorMessage={errors.fullName?.message}
                            />
                        )} />
                        <Controller name='username' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type='text'
                                label='Username'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.username !== undefined}
                                errorMessage={errors.username?.message}
                            />
                        )} />
                        <Controller name='email' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type='email'
                                label='Email'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.email !== undefined}
                                errorMessage={errors.email?.message}
                            />
                        )} />
                        <Controller name='password' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type={visiblePassword.password ? 'text' : 'password'}
                                label='Password'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.password !== undefined}
                                errorMessage={errors.password?.message}
                                endContent={
                                    <button className='focus:outline-none' type='button' onClick={() => handleVisiblePassword('password')}>
                                        {visiblePassword.password ? (
                                            <FaEye className='text-xl text-default-400 pointer-events-none' />
                                        ) : (
                                            <FaEyeSlash className='text-xl text-default-400 pointer-events-none' />
                                        )}
                                    </button>
                                }
                            />
                        )} />
                        <Controller name='confirmPassword' control={control} render={({field}) => (
                            <Input
                                {...field}
                                type={visiblePassword.confirmPassword ? 'text' : 'password'}
                                label='Confirm Password'
                                variant='bordered'
                                autoComplete='false'
                                isInvalid={errors.confirmPassword !== undefined}
                                errorMessage={errors.confirmPassword?.message}
                                endContent={
                                    <button className='focus:outline-none' type='button' onClick={() => handleVisiblePassword('confirmPassword')}>
                                        {visiblePassword.confirmPassword ? (
                                            <FaEye className='text-xl text-default-400 pointer-events-none' />
                                        ) : (
                                            <FaEyeSlash className='text-xl text-default-400 pointer-events-none' />
                                        )}
                                    </button>
                                }
                            />
                        )} />
                        <Button color='danger' size='lg' type='submit'>
                            {isPendingRegister ? <Spinner color='white' size='sm' /> : 'Register'}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Register;