import { getSettings } from '@/lib/settings'
import ArchiveClient from './ArchiveClient'

export const dynamic = 'force-dynamic'

export default function ArchivePage() {
  const settings = getSettings()
  const t = settings.texts
  return (
    <ArchiveClient
      heading={t.archiveHeading || '일상 아카이브'}
      subtext={t.archiveSubtext || '사진과 소리로 지역의 시간을 기록합니다.\n사라지기 전에, 잊히기 전에.'}
    />
  )
}
