import {
    Font,
    Head,
    Heading,
    Html,
    Preview,
    Row,
    Section,
    Text
} from '@react-email/components';

export default function VerificationEmail({ name, otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {name},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text> 
        </Row>
        <Row>
          <Text>
            This OTP will be expired in 3 minutes
          </Text>
        </Row>
      </Section>
    </Html>
  );
}