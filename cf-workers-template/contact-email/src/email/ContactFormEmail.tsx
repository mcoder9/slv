import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Tailwind,
  Img,
  Hr,
} from '@react-email/components'
import { ContactRequestBody } from '@/route/contact/index'
import Header from '@/email/utils/Header'
import { logoUrl, orgName } from '@/config'

interface Props {
  contactRequestBody: ContactRequestBody
}

export default function ContactFormEmail({ contactRequestBody }: Props) {
  const { name, email, message, locale } = contactRequestBody
  const isJa = locale === 'ja'

  const texts = {
    greeting: isJa
      ? `${name}様、お問い合わせありがとうございます。`
      : `Thank you for contacting us, ${name}.`,
    received: isJa
      ? '以下の内容を受け取りました。'
      : 'We have received your message:',
    nameLabel: isJa ? 'お名前' : 'Name',
    emailLabel: isJa ? 'メールアドレス' : 'Email',
    messageLabel: isJa ? 'メッセージ' : 'Message',
    footer: isJa
      ? '後ほど担当者よりご連絡いたします。'
      : 'Our team will reach out to you shortly.',
  }

  return (
    <Tailwind>
      <Html lang={isJa ? 'ja' : 'en'}>
        <Header lang={isJa ? 'ja' : 'en'} />
        <Body className="font-sans bg-zinc-950">
          <Container className="max-w-lg mx-auto px-4 py-6">
            <Section className="pt-20 pb-8">
              <Img src={logoUrl} className="w-28" />
            </Section>
            <Section className="">
              <Text className={`text-2xl font-bold text-white tracking-tight`}>
                {texts.received}
              </Text>
            </Section>

            <Text className="text-zinc-100 pb-3">{texts.greeting}</Text>

            <Hr className="border-zinc-500 color-zinc-500" />

            <Section className="">
              <Text className="text-zinc-300">
                <strong className="text-zinc-100">{texts.nameLabel}:</strong> {name}
              </Text>
              <Text className="text-zinc-300">
                <strong className="text-zinc-100">{texts.emailLabel}:</strong> {email}
              </Text>
              <Text className="text-zinc-300">
                <strong className="text-zinc-100">{texts.messageLabel}:</strong>
                <br />
                {message}
              </Text>
            </Section>

            <Hr className="border-zinc-500 color-zinc-500" />

            <Text className="text-zinc-100 pt-3">{texts.footer}</Text>
            <Text className="text-xs text-zinc-300 pt-3">※ This mail is for test purpose.</Text>


            <Text className="text-sm text-zinc-400 py-12">
              © {new Date().getFullYear()} {orgName}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
