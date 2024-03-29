import { render, screen } from "@testing-library/react"
import { SignInButton } from "./index"
import { useSession } from 'next-auth/react'


jest.mock('next-auth/react')

describe('SignInButton component', () => {

  it('renders correctly when user is not authenticated', () => {

    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })
    render(<SignInButton />)
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })


  it('renders correctly when user is authenticated', () => {

    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        expires: 'fake-expires'
      },
      status: "authenticated"
    })
    render(<SignInButton />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

})

