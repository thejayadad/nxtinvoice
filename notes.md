

### SETUP ###
 - package.json
 - global.css | page.tsx
 - Test it out

### PRISMA & DB SETUP ###
- npm i -D prisma
- npm i @prisma/client
- npx prisma init
- vercel
- lib folder
- primsa.ts function


### BETTER AUTH ###
 - better auth docs
 - prisma better auth nextjs:
     - https://www.prisma.io/docs/guides/betterauth-nextjs
 - follow the docs

```


import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  }
})




```

