import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
    title?: string;
}

const AuthLayout = (props: PropTypes) => {
    const { children, title } = props
    return (
        <div className='flex flex-col gap-10 min-h-screen min-w-full items-center justify-center py-10 lg:py-0'>
            <PageHead title={title} />
            <section className='max-w-screen-3xl 3xl:container p-6'>
                {children}
            </section>
        </div>
    );
}

export default AuthLayout;