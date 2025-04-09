import Image from 'next/image';
import Banner from '@/public/img/logos/einfra_meta-zapati.svg';

export function Footer() {
   return (
     <footer className="mt-auto border-t py-12 text-fd-secondary-foreground ">
     <div className="container flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between --color-fd-background relative z-20">
        <Image src={Banner} alt="publicity banner"/>
     </div>
     </footer>
   );
}
