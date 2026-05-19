import type { Metadata } from 'next'

type Props = {
  searchParams: Promise<{ game?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { game } = await searchParams

  const isGame = game === '1'

  const title = isGame
    ? 'テストページ ゲーム開催中！'
    : 'テストページ ゲームはお休み中'

  const description = isGame
    ? 'スペシャルゲームを体験しよう'
    : '記念キャンペーン開催中'

  // Vercel公式のOG画像生成サービスを利用（外部画像ホスティング不要）
  const ogImage = isGame
    ? 'https://og-image.vercel.app/event/og-test/test1.png'
    : 'https://og-image.vercel.app/event/og-test/test2.png'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Page({ searchParams }: Props) {
  const { game } = await searchParams
  const isGame = game === '1'

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>{isGame ? 'ゲーム版LP' : 'ノーマル版LP'}</h1>
      <p>現在のパラメータ: game={game ?? '(なし)'}</p>
      <p>このページのOG画像を変えてXに表示されるか確認してください。</p>
    </main>
  )
}
