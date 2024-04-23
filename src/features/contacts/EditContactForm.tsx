import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editContact } from './ContactsSlice'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
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

interface Props {
  id: number
  name: string
  email: string
  phone: string
  onSaveChanges: () => void
  isEditing: boolean
}

const EditContactForm: React.FC<Props> = ({
  id,
  name: initialName,
  email: initialEmail,
  phone: initialPhone,
  onSaveChanges,
  isEditing
}) => {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [error, setError] = useState('') // Adicione um estado para o erro
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
    value = applyMask(value)
    setPhone(value)

    // Verifica se o telefone está no formato correto
    const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/
    if (!phoneRegex.test(value)) {
      setError('Formato de número incorreto.')
    } else {
      setError('') // Limpa o erro se o formato estiver correto
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Verifica se o telefone está no formato correto
    const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      setError('Formato de número incorreto.')
      return
    }

    dispatch(
      editContact({
        id,
        name,
        email,
        phone
      })
    )

    onSaveChanges()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Telefone"
        required
      />
      {error && <p>{error}</p>} {/* Exibe a mensagem de erro se houver */}
      <Button type="submit">
        {isEditing ? 'Salvar alterações' : 'Salvar contato'}
      </Button>
    </Form>
  )
}

export default EditContactForm
