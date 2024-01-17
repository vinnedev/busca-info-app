"use client"

import { useRouter, usePathname } from 'next/navigation'
import { RiSearchLine, RiMapPinLine, RiBankLine, RiPhoneLine, RiTableLine } from 'react-icons/ri';
import { MdScreenSearchDesktop } from "react-icons/md";
import React from 'react';

interface PageProps {
    children: React.ReactNode;
}

const Layout: React.FC<PageProps> = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()

    const menuItems = [
        { label: 'Buscar CNPJ', path: 'cnpj', icon: <RiSearchLine size={20} /> },
        { label: 'Buscar CEP', path: 'cep', icon: <RiMapPinLine size={20} /> },
        { label: 'Buscar Bancos', path: 'banks', icon: <RiBankLine size={20} /> },
        { label: 'Buscar DDD', path: 'ddd', icon: <RiPhoneLine size={20} /> },
        { label: 'Tabela FIPE', path: 'tabela-fipe', icon: <RiTableLine size={20} /> },
    ];

    return (
        <>
            <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
                <aside className="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
                    <div className="my-4 w-full border-b-4 border-indigo-100 text-center">
                        <span className="font-mono text-xl font-bold tracking-widest flex items-center justify-center">
                            <span className="text-indigo-600">Busca-</span> Info
                            <MdScreenSearchDesktop size={25} className="ml-2" />
                        </span>
                        {/* Menu Items */}
                        <nav className="mt-8">
                            <ul>
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer py-2 ${pathname === `/${item.path.toLowerCase()}`
                                            ? 'text-indigo-600 font-bold'
                                            : 'text-gray-800'
                                            }`}
                                        onClick={() => router.push(`/${item.path.toLowerCase()}`, { scroll: false })}
                                    >
                                        <span className="flex items-center">
                                            {item.icon}
                                            <span className="ml-2">{item.label}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="my-4"></div>
                </aside>
                <main className="main -ml-48 mb-16 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
                    <div className="flex h-full bg-white shadow-md p-8">
                        {children}
                    </div>
                </main>
            </div>
            <footer className="fixed bottom-0 w-full bg-gray-800 text-white text-center py-4">
                Desenvolvido com ❤️ por: <a href="https://github.com/vinnedev" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-opacity duration-300 hover:opacity-80">
                    Vinicius Abreu
                </a>
            </footer>
        </>
    );
};

export { Layout };
