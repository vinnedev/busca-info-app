"use client"

import { Layout } from '@/components/layout'
import InputMask from 'react-input-mask';
import { ChangeEvent, useRef, useState } from 'react'
import { validateCNPJ } from '@/utils/cnpj-formater';
import { api } from '@/utils/api';


interface CnaeSecundario {
    codigo: number;
    descricao: string;
}

interface Qsa {
    identificador_de_socio: number;
    nome_socio: string;
    cnpj_cpf_do_socio: string;
    codigo_qualificacao_socio: number;
    percentual_capital_social: number;
    data_entrada_sociedade: string;
    cpf_representante_legal: string | null;
    nome_representante_legal: string | null;
    codigo_qualificacao_representante_legal: number | null;
}

export interface Empresa {
    cnpj: string;
    identificador_matriz_filial: number;
    descricao_matriz_filial: string;
    razao_social: string;
    nome_fantasia: string;
    situacao_cadastral: number;
    descricao_situacao_cadastral: string;
    data_situacao_cadastral: string;
    motivo_situacao_cadastral: number;
    nome_cidade_exterior: string | null;
    codigo_natureza_juridica: number;
    data_inicio_atividade: string;
    cnae_fiscal: number;
    cnae_fiscal_descricao: string;
    descricao_tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: number;
    uf: string;
    codigo_municipio: number;
    municipio: string;
    ddd_telefone_1: string;
    ddd_telefone_2: string | null;
    ddd_fax: string | null;
    qualificacao_do_responsavel: number;
    capital_social: number;
    porte: number;
    descricao_porte: string;
    opcao_pelo_simples: boolean;
    data_opcao_pelo_simples: string | null;
    data_exclusao_do_simples: string | null;
    opcao_pelo_mei: boolean;
    situacao_especial: string | null;
    data_situacao_especial: string | null;
    cnaes_secundarios: CnaeSecundario[];
    qsa: Qsa[];
}


export default function BuscarCNPJ() {
    const [cnpj, setCnpj] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [CNPJData, setCNPJData] = useState<Empresa | null>(null)

    const inputMaskRef = useRef(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        return setCnpj(rawValue);
    };

    const handleSearch = async () => {
        setIsLoading(true)
        const req = await api.get(`/cnpj/v1/${cnpj}`).finally(() => setIsLoading(false))

        if (req.status !== 200) {
            console.log(`Error on fetching data: ${req.data.message}`)
        }

        console.log(req.data)
        setCNPJData(req.data)
    }

    return (
        <>
            <Layout>

                <div className='flex flex-col max-w-40 gap-2'>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Digite o CNPJ:</label>
                    <InputMask
                        ref={inputMaskRef}
                        className={`w-auto bg-gray-50 border ${!validateCNPJ(cnpj) && cnpj.length === 14 ? 'border-red-600' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 hover:border-violet-600`}
                        mask="99.999.999/9999-99"
                        maskChar="_"
                        value={cnpj}
                        onChange={handleInputChange}
                        id="cnpj"
                        placeholder="__.___.___/____-__"
                    />
                    {!validateCNPJ(cnpj) && cnpj.length === 14 && (<span className="block mt-1 ml-1 text-sm font-medium text-red-600">CNPJ está incorreto.</span>)}


                    <button type="button" className="bg-gray-500 rounded text-white text-sm h-8 disabled:bg-gray-300 disabled:text-gray-500" onClick={handleSearch} disabled={!Boolean(validateCNPJ(cnpj) && cnpj.length === 14)}>
                        {isLoading ? <>
                            Processando...
                        </> : 'Buscar'}
                    </button>
                </div>

                <div>
                    <div className='mt-8'>
                        {CNPJData && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold mb-4">Informações da Empresa</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Dados Gerais</h3>
                                        <p><span className="font-semibold">CNPJ:</span> {CNPJData.cnpj}</p>
                                        <p><span className="font-semibold">Razão Social:</span> {CNPJData.razao_social}</p>
                                        <p><span className="font-semibold">Nome Fantasia:</span> {CNPJData.nome_fantasia}</p>
                                        <p><span className="font-semibold">Situação Cadastral:</span> {CNPJData.descricao_situacao_cadastral}</p>
                                        {/* Adicione mais informações gerais conforme necessário */}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Endereço</h3>
                                        <p><span className="font-semibold">Logradouro:</span> {CNPJData.logradouro}, {CNPJData.numero}</p>
                                        <p><span className="font-semibold">Bairro:</span> {CNPJData.bairro}</p>
                                        <p><span className="font-semibold">CEP:</span> {CNPJData.cep}</p>
                                        <p><span className="font-semibold">Cidade/UF:</span> {CNPJData.municipio}/{CNPJData.uf}</p>
                                        {/* Adicione mais informações de endereço conforme necessário */}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-700 mb-2">CNAEs</h3>
                                    <ul>
                                        {CNPJData.cnaes_secundarios.map((cnae, index) => (
                                            <li key={index}>{cnae.descricao}</li>
                                        ))}
                                    </ul>
                                </div>
                                {CNPJData.qsa.length > 0 && (
                                    <>
                                        <div className="mt-4">
                                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Quadro de Sócios</h3>
                                            <ul>
                                                {CNPJData.qsa.map((socio, index) => (
                                                    <li key={index}>
                                                        <p><span className="font-semibold">Nome do Sócio:</span> {socio.nome_socio}</p>
                                                        <p><span className="font-semibold">CPF/CNPJ do Sócio:</span> {socio.cnpj_cpf_do_socio}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </Layout>
        </>
    )
}