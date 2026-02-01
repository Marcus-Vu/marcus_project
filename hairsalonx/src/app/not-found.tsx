export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4">
          Pagina niet gevonden
        </h2>
        <p className="text-neutral-600 mb-8">
          Sorry, de pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <a 
          href="/" 
          className="btn-primary"
          aria-label="Terug naar de homepagina"
        >
          Terug naar home
        </a>
      </div>
    </div>
  )
}
