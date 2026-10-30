const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatarPreco(centavos: number): string {
  return moeda.format(centavos / 100)
}

/** Aceita somente dígitos e devolve o CEP no formato 00000-000 (parcial enquanto digita). */
export function mascararCep(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 8)
  return digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos
}

export function cepValido(valor: string): boolean {
  return /^\d{5}-?\d{3}$/.test(valor.trim())
}

export function formatarData(iso: string): string {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : iso
}
