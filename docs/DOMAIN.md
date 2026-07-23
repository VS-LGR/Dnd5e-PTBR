# Migração de domínio — dnd-br.com.br

Domínio canônico: **https://dnd-br.com.br**  
`www.dnd-br.com.br` redireciona para o apex (ver `vercel.json`).

## 1. Vercel (domínio no projeto)

1. Abra o projeto no [Vercel Dashboard](https://vercel.com/dashboard) → **Settings → Domains**.
2. Adicione:
   - `dnd-br.com.br`
   - `www.dnd-br.com.br` (opcional; o redirect já aponta para o apex)
3. A Vercel mostra os registros DNS (A / CNAME). Anote-os.

### DNS no registrador (.com.br)

No painel do domínio (Registro.br ou onde comprou), configure o que a Vercel indicar. Em geral:

| Tipo | Nome | Valor (exemplo Vercel) |
|------|------|-------------------------|
| **A** | `@` | `76.76.21.21` (confirme no painel) |
| **CNAME** | `www` | `cname.vercel-dns.com` (confirme no painel) |

Aguarde a propagação (minutos a algumas horas). O status na Vercel deve ficar **Valid**.

4. Marque `dnd-br.com.br` como domínio **primário** (Primary).
5. Mantenha o `*.vercel.app` antigo se quiser; pode redirecionar o domínio antigo da Vercel para o novo depois.

## 2. Deploy

Faça push / redeploy após merge destas mudanças (metadataBase + redirect www).

Confirme:

- https://dnd-br.com.br
- https://dnd-br.com.br/ads.txt
- https://www.dnd-br.com.br → redireciona para https://dnd-br.com.br

## 3. Google AdSense

1. No AdSense → **Sites**, adicione **dnd-br.com.br** (e remova/atualize o host antigo, se houver).
2. Confirme que https://dnd-br.com.br/ads.txt responde com:

```
google.com, pub-2183854536970513, DIRECT, f08c47fec0942fa0
```

3. Aguarde a verificação do site no novo domínio.

## 4. Supabase (se usar Auth)

Em **Authentication → URL Configuration**:

- **Site URL:** `https://dnd-br.com.br`
- **Redirect URLs:** `https://dnd-br.com.br/**` (e o `vercel.app` antigo só se ainda precisar)

## 5. Env (opcional)

Na Vercel → **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://dnd-br.com.br
```

Não é obrigatório: o default em `src/config/site.ts` já é esse host.

## Checklist rápido

- [ ] Domínios adicionados e Valid na Vercel
- [ ] DNS A + CNAME corretos
- [ ] Primary = `dnd-br.com.br`
- [ ] `/ads.txt` OK no domínio novo
- [ ] Site novo no AdSense
- [ ] Site URL / redirects no Supabase (se aplicável)
- [ ] Redeploy em produção
