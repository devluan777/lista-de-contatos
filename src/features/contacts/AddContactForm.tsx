import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact, selectContacts } from './ContactsSlice'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`

const ErrorMessage = styled.p`
  color: red;
`

const AddContactForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const contacts = useSelector(selectContacts)
  const dispatch = useDispatch()

  const applyMask = (value: string) => {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1)$2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    if (value.length > 14) {
      value = value.slice(0, 14) // Garante que o telefone não tenha mais de 14 caracteres
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    // Verifica se o valor é um número ou um caractere permitido na máscara
    if (/^\d|\(|\)|-|\s$/.test(value)) {
      value = applyMask(value)
      setPhone(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailExists = contacts.find((contact) => contact.email === email)
    const phoneExists = contacts.find((contact) => contact.phone === phone)

    if (emailExists) {
      setError('Este e-mail já existe.')
      return
    }

    if (phoneExists) {
      setError('Este número de telefone já existe.')
      return
    }

    // Verifica se o telefone está no formato correto
    const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      setError('O número de telefone deve estar no formato (00)00000-0000.')
      return
    }

    dispatch(
      addContact({
        id: Date.now(),
        name,
        email,
        phone
      })
    )

    setName('')
    setEmail('')
    setPhone('')
    setError('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Telefone"
        required
      />
      <Button type="submit">Adicionar Contato</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  )
}

export default AddContactForm
