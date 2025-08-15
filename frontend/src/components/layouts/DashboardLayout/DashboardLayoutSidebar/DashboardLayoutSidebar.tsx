import { classname } from "@/utils/classname";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
}

interface PropTypes {
    sidebarItems: SidebarItem[];
    isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
    const router = useRouter();

    const {sidebarItems, isOpen} = props;
    
    return (
        <div className={
                classname(
                    'flex flex-col justify-between fixed lg:relative z-50 h-screen w-full max-w-[300px] -translate-x-full lg:translate-x-0 border-r-1 border-default-200 bg-white px-4 py-6 transition-all',
                    {'translate-x-0' : isOpen}
                )}>
            <div>
                <div className='flex justify-center'>
                    <Image
                        src='/images/general/logo.svg'
                        alt='logo'
                        width={180}
                        height={60}
                        className='mb-6 w-32'
                        onClick={() => router.push('/')}
                    />
                </div>
                <Listbox items={sidebarItems} variant='solid' aria-label='Dashboard Menu'>
                    {(item) => (
                        <ListboxItem
                            key={item.key}
                            className={
                                classname('my-1 h-12 text-2xl', router.pathname.startsWith(item.href) ? 'bg-danger-500 text-white' : '')
                            }
                            as={Link}
                            href={item.href}
                            startContent={item.icon}
                            textValue={item.label}
                            aria-labelledby={item.label}
                            aria-describedby={item.label}
                        >
                            <p className='text-small'>{item.label}</p>
                        </ListboxItem>
                    )}
                </Listbox>
            </div>
            <div className='flex items-center p-1'>
                <Button color='danger' size='lg' fullWidth variant='light' className='flex justify-start rounded-lg px-2 py-1.5' onPress={() => signOut()}>
                    <CiLogout />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default DashboardLayoutSidebar;