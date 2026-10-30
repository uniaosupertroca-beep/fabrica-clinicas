/**
 * Consulta de CEP DEMONSTRATIVA. Não consulta serviços externos nem confirma
 * taxa, prazo ou área de entrega. Esses dados dependem da loja.
 */
import { cepValido } from './formato'

export type ResultadoCep =
  | { status: 'invalido'; mensagem: string }
  | { status: 'demonstracao'; mensagem: string }

export function consultarCepDemo(valor: string): ResultadoCep {
  if (!cepValido(valor)) {
    return { status: 'invalido', mensagem: 'Informe um CEP com 8 números, por exemplo 88330-670.' }
  }
  return {
    status: 'demonstracao',
    mensagem:
      'Esta é uma demonstração. A disponibilidade, a taxa e o prazo de entrega são confirmados pela loja antes de qualquer pedido.',
  }
}
