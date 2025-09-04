import Toaster from "@/components/ui/Toaster";
import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";
import { classname } from "@/utils/classname";
import { Inter } from "next/font/google";
import { ReactNode, useContext, useEffect } from "react";

interface PropTypes {
    children: ReactNode;
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const AppShell = (props: PropTypes) => {
    const {children} = props;
    const {toaster, setToaster} = useContext(ToasterContext);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setToaster(defaultToaster);
        }, 4000);

        return () => clearTimeout(timeout);
    }, [toaster]);

    return (
        <main className={classname(inter.className)}>
            {children}
            {toaster.type !== '' && <Toaster type={toaster.type} message={toaster.message} />}
        </main>
    );
}

export default AppShell;