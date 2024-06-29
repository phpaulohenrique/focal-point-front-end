import { render } from '@testing-library/react'

import { Header } from './header'

describe('Header', () => {
    it('Should be able to render the username', () => {
        localStorage.setItem('userName', 'John')
        const wrapper = render(<Header />)

        const welcomeMessage = wrapper.getByText('Bem-vindo de volta, John')

        // wrapper.debug()
        expect(welcomeMessage).toBeInTheDocument()
    })
})
