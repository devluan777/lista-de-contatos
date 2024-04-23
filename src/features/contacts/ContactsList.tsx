import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteContact, selectContacts } from './ContactsSlice'
import EditContactForm from './EditContactForm'
import styled from 'styled-components'

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Button = styled.button`
  background-color: #f44336;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`

const EditButton = styled(Button)`
  background-color: #ffeb3b;
`

const ButtonContainer = styled.div`
  position: sticky; // Fixa a posição dos botões
  right: 0; // Alinha os botões à direita
`

const ContactsList: React.FC = () => {
  const contacts = useSelector(selectContacts)
  const dispatch = useDispatch()
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleEdit = (id: number) => {
    setEditingId(id) // Define o ID do contato que está sendo editado
  }

  const handleSaveChanges = () => {
    setEditingId(null) // Reseta o ID de edição para sair do modo de edição
  }

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id)) // Ação para deletar o contato
  }

  return (
    <List>
      {contacts.map((contact) => (
        <ListItem key={contact.id}>
          {editingId === contact.id ? (
            <EditContactForm
              id={contact.id}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
              onSaveChanges={handleSaveChanges}
              isEditing={editingId !== null} // Passa a propriedade isEditing para o formulário de edição
            />
          ) : (
            <>
              <div>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
              <ButtonContainer>
                <EditButton onClick={() => handleEdit(contact.id)}>
                  Editar
                </EditButton>
              </ButtonContainer>
            </>
          )}
          <ButtonContainer>
            <Button onClick={() => handleDelete(contact.id)}>Deletar</Button>
          </ButtonContainer>
        </ListItem>
      ))}
    </List>
  )
}

export default ContactsList
