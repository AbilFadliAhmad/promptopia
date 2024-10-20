'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const ProvidersFetching = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    ProvidersFetching();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image src={'/assets/images/logo.svg'} alt="logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create Prompt
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user.image} alt="logo" width={37} height={37} className="rounded-full object-contain" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="logo"
              width={37}
              height={37}
              className="rounded-full object-contain"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link className="dropdown_link" href={'/profile'} onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link className="" href="/create-prompt" onClick={()=>setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={()=>{
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
