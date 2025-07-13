import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
    const {visiblePassword, handleVisiblePassword} = useRegister();

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
                        <Link href='/login' className='font-semibold text-danger-400'>
                            Login here
                        </Link>
                    </p>
                    <form className='flex flex-col gap-4 w-80'>
                        <Input type='text' label='Full Name' variant='bordered' autoComplete='false' />
                        <Input type='text' label='Username' variant='bordered' autoComplete='false' />
                        <Input type='email' label='Email' variant='bordered' autoComplete='false' />
                        <Input
                            type={visiblePassword.password ? 'text' : 'password'}
                            label='Password'
                            variant='bordered'
                            autoComplete='false'
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
                        <Input
                            type={visiblePassword.passwordConfirmation ? 'text' : 'password'}
                            label='Confirm Password'
                            variant='bordered'
                            autoComplete='false'
                            endContent={
                                <button className='focus:outline-none' type='button' onClick={() => handleVisiblePassword('passwordConfirmation')}>
                                    {visiblePassword.passwordConfirmation ? (
                                        <FaEye className='text-xl text-default-400 pointer-events-none' />
                                    ) : (
                                        <FaEyeSlash className='text-xl text-default-400 pointer-events-none' />
                                    )}
                                </button>
                            }
                        />
                        <Button color='danger' size='lg' type='submit'>
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Register;