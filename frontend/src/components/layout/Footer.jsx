export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm">
        © {new Date().getFullYear()} Pet Shop · Todos los derechos reservados
      </div>
    </footer>
  );
}
