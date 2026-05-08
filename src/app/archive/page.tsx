import { getSettings } from '@/lib/settings'
import { getPhotos, getSoundAlbums } from '@/lib/notion'
import ArchiveClient from './ArchiveClient'

export const revalidate = 60

export default async function ArchivePage() {
  const settings = getSettings()
  const t = settings.texts

  const [photos, soundAlbums] = await Promise.all([
    getPhotos(),
    getSoundAlbums(),
  ])

  return (
    <ArchiveClient
      heading={t.archiveHeading || '일상 아카이브'}
      subtext={t.archiveSubtext || '사진과 소리로 지역의 시간을 기록합니다.\n사라지기 전에, 잊히기 전에.'}
      photos={photos}
      soundAlbums={soundAlbums}
    />
  )
}
