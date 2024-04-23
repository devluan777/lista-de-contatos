// src/features/contacts/ContactsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../rotas/store'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
}

const initialState: Contact[] = []

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload)
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      return state.filter((contact) => contact.id !== action.payload)
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      )
      if (index !== -1) {
        state[index] = action.payload
      }
    }
  }
})

export const { addContact, deleteContact, editContact } = contactsSlice.actions

export default contactsSlice.reducer

export const selectContacts = (state: RootState) => state.contacts
