import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@nextui-org/react";

interface PropTypes {
    children: ReactNode;
    description?: string;
    title?: string;
    type: 'admin' | 'member';
}

const DashboardLayout = (props: PropTypes) => {
    const [isOpen, setIsOpen] = useState(false);

    const {children, description, title, type = 'member'} = props;

    return (
        <Fragment>
            <PageHead title={title} />
            <div className='flex max-w-screen-3xl 3xl:container'>
                <DashboardLayoutSidebar
                    sidebarItems={type === 'admin' ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
                    isOpen={isOpen}
                />
                <div className='h-screen w-full overflow-y-auto p-8'>
                    <Navbar className='flex justify-between bg-transparent px-0' classNames={{ wrapper: 'p-0' }} isBlurred={false} position='static'>
                        <h1 className='text-3xl font-bold'>{title}</h1>
                        <NavbarMenuToggle
                            className='lg:hidden'
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                        />
                    </Navbar>
                    <p className='mb-4 text-small'>{description}</p>
                    {children}
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardLayout;