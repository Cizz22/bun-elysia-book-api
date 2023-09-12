FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb . 

RUN bun install --production --frozen-lockfile

COPY src src

COPY tsconfig.json .

CMD ["bun", "src/index.ts"]

EXPOSE 3000