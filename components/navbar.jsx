'use client';
import React from 'react'
import Link from 'next/link'
import i from '../assets/images/logo.svg';
import Image from 'next/image'
// import img from "./logo.svg"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation';
function Navbar() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null)
    const [toggledropdown, settoggledropdown] = useState(false)
    const router = useRouter();
    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProvider();
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src={i}
                    alt='logo'
                    width={50}
                    height={50}
                    className='object-contain'
                />
                <p className='logo_text'>IdeaGarage</p>
            </Link>
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-prompt'
                            className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href="/Profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full cursor-pointer'
                                alt='profile'
                                onClick={() => settoggledropdown((prev) => !prev)}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) =>
                            (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() =>
                                settoggledropdown((prev) => !prev)
                            }
                        />
                        {toggledropdown && (
                            <div className='dropdown'>
                                <Link href="/Profile"
                                    className='dropdown_link'
                                    onClick={() => settoggledropdown(false)}>
                                    My profile
                                </Link>
                                <Link href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => settoggledropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        settoggledropdown(false)
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign-Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) =>
                            (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>
        </nav >
    )
}
export default Navbar