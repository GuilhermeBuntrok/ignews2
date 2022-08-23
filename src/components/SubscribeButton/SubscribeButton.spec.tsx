import { render, screen, fireEvent } from "@testing-library/react"
import { SubscribeButton } from "./index"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



jest.mock('next-auth/react')
jest.mock('next/router')


describe('SubscribeButton component', () => {

  it('renders correctly', () => {

    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(<SubscribeButton />)

    expect(screen.getByText('subscribe now')).toBeInTheDocument()
  })


  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)

    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SubscribeButton />)

    const subscriptionButton = screen.getByText('subscribe now')

    fireEvent.click(subscriptionButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {

    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)
    const pushMock = jest.fn();

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

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('subscribe now')

    fireEvent.click(subscribeButton)

    expect(useRouterMocked).toHaveBeenCalledWith()
  })
})