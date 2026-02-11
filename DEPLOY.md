# 🚀 Deploy do Frontend Scopsy (Next.js)

## Deploy no Vercel

### 1. Instalar Vercel CLI (opcional)

```bash
npm i -g vercel
```

### 2. Deploy via CLI

```bash
cd projeto.scopsy3/scopsy-dashboard

# Login no Vercel
vercel login

# Deploy de produção
vercel --prod
```

### 3. Deploy via Dashboard

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte seu repositório Git
3. Configure:
   - **Framework:** Next.js
   - **Root Directory:** `projeto.scopsy3/scopsy-dashboard`
   - **Build Command:** `npm run build`
   - **Environment Variables:**
     ```
     NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com
     ```

## Configurações Importantes

### basePath `/lab`

O frontend está configurado para rodar em **www.scopsy.com.br/lab**

```typescript
// next.config.ts
basePath: '/lab',
assetPrefix: '/lab',
```

**Importante:** Todas as rotas internas devem usar o basePath:
```tsx
// ✅ Correto
<Link href="/dashboard">Dashboard</Link>  // Vira /lab/dashboard

// ❌ Errado
<Link href="/lab/dashboard">Dashboard</Link>  // Vira /lab/lab/dashboard
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` (não commitado):

```bash
NEXT_PUBLIC_API_URL=https://scopsy-backend.onrender.com
```

**Desenvolvimento:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Domínio Personalizado

### Adicionar no Vercel

1. Dashboard → Settings → Domains
2. Add Domain: `www.scopsy.com.br/lab`
3. Configure DNS:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Build Local

Teste o build antes de fazer deploy:

```bash
npm run build
npm start
```

Acesse: http://localhost:3000/lab

## Troubleshooting

### Erro: "Cannot find module"

```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Erro: Assets 404

Verifique se `assetPrefix` está configurado corretamente:
```typescript
// next.config.ts
assetPrefix: '/lab',
```

### Erro: API não conecta

1. Verifique `NEXT_PUBLIC_API_URL` no Vercel
2. Verifique CORS no backend
3. Teste API diretamente: `curl https://seu-backend.onrender.com/health`
