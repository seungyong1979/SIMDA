import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// Cloudflare R2 — S3 호환 API 사용
// 사진 파일은 여기(R2)에 저장하고, 사이트 코드는 그대로 Render에 유지합니다.
const ACCOUNT_ID  = process.env.R2_ACCOUNT_ID ?? ''
const ACCESS_KEY  = process.env.R2_ACCESS_KEY_ID ?? ''
const SECRET_KEY  = process.env.R2_SECRET_ACCESS_KEY ?? ''
const BUCKET_NAME = process.env.R2_BUCKET_NAME ?? ''
const PUBLIC_URL  = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '')

export const isR2Configured = Boolean(ACCOUNT_ID && ACCESS_KEY && SECRET_KEY && BUCKET_NAME && PUBLIC_URL)

const r2Client = isR2Configured
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
      },
    })
  : null

/**
 * 파일을 R2 버킷에 업로드하고 공개 URL을 반환합니다.
 */
export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  if (!r2Client) {
    throw new Error('R2가 설정되지 않았습니다. 환경변수를 확인해주세요.')
  }

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  )

  return `${PUBLIC_URL}/${filename}`
}
