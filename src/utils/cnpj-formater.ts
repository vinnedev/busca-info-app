import { cnpj } from 'cpf-cnpj-validator';

export const formatCNPJ = (value: string) => {
    return cnpj.format(value)
}

export const validateCNPJ = (value: string) => {
    return cnpj.isValid(value)
}

export const cnpjMask = (value: string) => {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}