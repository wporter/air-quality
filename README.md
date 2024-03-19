# Air Quality

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
<br/>
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

## Design

[Air Quality Figma Design File](https://www.figma.com/file/krRtbkjPXTZjalhCi53bcJ/Airbenders-wireframing?type=design&node-id=0%3A1&mode=design&t=C0Y4LccFQPBDNsHN-1)

![landing](https://github.com/UCR-Senior-Design/air-quality/assets/43308867/ff85ad13-4ad7-4009-913a-a574a75d753c)
![landingp2](https://github.com/UCR-Senior-Design/air-quality/assets/43308867/012607cf-b51c-4976-b344-4d20fb1b33de)

![dashboard](https://github.com/UCR-Senior-Design/air-quality/assets/43308867/2582171e-7b94-4658-9ea8-dcb834c8323f)
![details](https://github.com/UCR-Senior-Design/air-quality/assets/43308867/8e8da9db-1890-43e2-9210-29c6ee5a7181)

## Node.js

Air Quality runs on Node.js Version 16.17.0 and higher. Please ensure you have Node.js installed via the [official website](https://nodejs.org/en).

## Next.js

This project is built using [Next.js](https://nextjs.org), a React framework. Next.js is automatically installed when you install all dependencies for this project.

## Environment Variables

The following environment variables are required and must be stored in an `.env` file. For the `QUANTAQ_API_KEY` variable, please make an account on the [QuantAQ website](https://quant-aq.com/).

From there, head over to the menu and go through Organization and then to Developer. Make sure to generate a new key, give it a token name, and paste the key into the `QUANTAQ_API_KEY` variable for your `.env` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=1:
NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
QUANTAQ_API_KEY=
```

## Commands

### Dependencies

```bash
# Install dependencies
npm i

# Add dependency
npm i <dependency>

# Remove dependency
npm un <dependency>
```

### Running the Website Locally

```bash
# Open a browser at localhost:3000
npm run dev
```

### Formatting Code via Prettier

```bash
# Rewrite code recursively with proper formatting
npm run format

# Show formatting differences recursively
npm run check
```

### Linting Code via Eslint

```bash
npm run eslint
```

### Build the Website

```bash
npm run build
```
