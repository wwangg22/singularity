import Link from 'next/link'

function HomePage() {
  return (
    <div>
      <h1>Welcome to our e-commerce website!</h1>
      <Link legacyBehavior href="/products">
        <a>View our products</a>
      </Link>
    </div>
  )
}

export default HomePage