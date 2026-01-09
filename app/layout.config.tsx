import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import BannerMeta from '@/public/img/meta/meta-docs-banner.jpg';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
     <>
       <Image src={Logo} alt="einfra logo" width="50" height="19"/>
       Documentation
     </>
    ),
  },
  links: [
    {
      type: 'menu',
      text: 'MetaCentrum Grid',
      url: 'https://docs.metacentrum.cz',
      items: [
        {
          menu: {
            banner: (
               <div className="-mx-3 -mt-3">
                <Image
                  src={BannerMeta}
                  alt="Meta"
                  width="1200"
                  height="710"
                  className="rounded-t-lg object-cover"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom,white 60%,transparent)',
                  }}
                />
               </div>
            ),
            className: 'md:row-span-2',
          },
          text: 'Getting Started',
          description: 'Learn how to start to use MetaCentrum Grid Computing services',
          url: 'https://docs.metacentrum.cz/en/docs/computing/run-basic-job',
        },
        {
          // eslint-disable-next-line @next/next/no-img-element
	  icon: <img src="/img/meta/menu-logos/ondemand-logo-1.png" alt="ondemand logo" className="h-10 p-0.5"/>,
          text: 'OnDemand',
          description: 'Web-based interface providing easy access to high-performance computing (HPC) resources.',
          url: 'https://docs.metacentrum.cz/en/docs/ondemand',
          menu: {
            className: 'lg:col-start-3 lg:row-start-2',
          },
        },
      ], 
    },
  ],
  disableThemeSwitch: true,
  themeSwitch: { enabled: false },
};
