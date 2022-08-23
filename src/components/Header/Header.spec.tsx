import { render, screen } from "@testing-library/react"
import { Header } from "./index"


jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('ActiveLink componets', () => {

  it('renders correctly', () => {
    render(
      <Header />
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })

})

