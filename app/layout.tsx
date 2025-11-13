import './globals.css'

export const metadata = {
  title: 'Ni AI',
  description: 'Ni AI - Crie sites e apps com IA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}