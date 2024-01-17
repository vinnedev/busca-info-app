"use client"

import { Layout } from '@/components/layout'
import InputMask from 'react-input-mask';
import { ChangeEvent, useState } from 'react'
import { validateCNPJ } from '@/utils/cnpj-formater';

export default function BuscarCNPJ() {
    const [cnpj, setCnpj] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        return setCnpj(rawValue);
    };

    return (
        <>
            <Layout>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digite o CNPJ:</label>
                    <InputMask
                        className={`bg-gray-50 border ${!validateCNPJ(cnpj) && cnpj.length === 14 ? 'border-red-600' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 hover:border-violet-600`}
                        mask="99.999.999/9999-99"
                        maskChar="_"
                        value={cnpj}
                        onChange={handleInputChange}
                        id="cnpj"
                        placeholder="__.___.___/____-__"
                    />
                    {!validateCNPJ(cnpj) && cnpj.length === 14 && (<span className="block mt-1 ml-1 text-sm font-medium text-red-600">CNPJ está incorreto.</span>)}
                </div>
            </Layout>
        </>
    )
}