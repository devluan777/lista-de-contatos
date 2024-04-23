import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../rotas/store'
import ContactsList from '../features/contacts/ContactsList'
import AddContactForm from '../features/contacts/AddContactForm'
import { GlobalStyles } from '../styles/GlobalStyles'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <div className="App">
        <h1>Contact List</h1>
        <AddContactForm />
        <ContactsList />
      </div>
    </Provider>
  )
}

export default App
