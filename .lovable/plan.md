## Goal
Switch the entire app — public site **and** admin panel — to use the Railway API at `https://omni-dx-api-production.up.railway.app`. Stop using Lovable Cloud (Supabase) for data.

## What I confirmed by probing the API

| Path | Status | Notes |
|---|---|---|
| `GET /api/courses` | 200 | `{ data: [{ id, title, imageUrl, level, price, salePrice, currency, duration, type, certificate, ... }] }` |
| `GET /api/teachers` | 200 | `[{ id, name, lastName, email, bio, imageUrl, phoneNumber, description, createdAt }]` |
| `GET /api/partners` | 200 | `{ count, data: [{ id, name, logoUrl, url, createdAt }] }` |
| `GET /api/faq` | 200 | (empty body in probe — likely list) |
| `GET /api/support-requests` | 401 | Needs auth |
| `GET /api/subscribers` | 401 | Needs auth |

`imageUrl` looks like a Cloudinary public ID (`omni-dx/...`) → resolved as `https://res.cloudinary.com/<cloud>/image/upload/<id>`.

## Blocker I need from you
I couldn't find the **login endpoint** (tried `/api/auth/login`, `/api/auth/sign-in`, `/api/admin/login` — all 404). Please paste a working curl example, e.g.:
```
curl -X POST https://omni-dx-api-production.up.railway.app/api/<path> \
  -H "content-type: application/json" \
  -d '{"email":"...","password":"..."}'
```
Also tell me:
- Token type returned (`{ token }`, `{ accessToken }`, cookie?)
- How protected endpoints expect it (`Authorization: Bearer <token>` assumed)
- Cloudinary cloud name for `imageUrl` (or full image-URL helper if different)

## Plan (once auth details are in)

### 1. API client layer (`src/lib/api.ts`)
- `API_BASE = "https://omni-dx-api-production.up.railway.app"`
- `apiFetch(path, opts)` — adds `Authorization: Bearer <token>` from `localStorage`, throws on non-2xx, returns JSON.
- `imageUrl(publicId)` — builds Cloudinary URL.

### 2. Auth (`src/hooks/useAuth.tsx` rewrite)
- Replace Supabase auth with a token-based context: `{ token, user, login(email,password), logout() }`.
- Token persisted in `localStorage`. `isAdmin` = token presence (or role from token payload if API returns one).
- Remove Supabase `onAuthStateChange` and `has_role` RPC.

### 3. Public site → real data
- `CoursesSection` → `GET /api/courses`
- `TeamSection` → `GET /api/teachers`
- `PartnersSection` → `GET /api/partners`
- `FAQSection` → `GET /api/faq`
- Add a contact section that `POST`s to support endpoint (path TBD from you).

### 4. Admin panel → API
- `AdminLogin` calls API login.
- `AdminCourses` / `AdminTeachers`: `GET/POST/PUT/DELETE /api/courses`, `/api/teachers` (assume REST; will adjust to actual paths once you confirm or I can probe with a token).
- `AdminSupport` → `GET/PATCH/DELETE /api/support-requests`.
- `AdminUsers` → `GET /api/subscribers` (rename to "Subscribers").
- `AdminDashboard` → counts from list endpoints.

### 5. Cleanup
- Remove `src/integrations/supabase/*` imports from app code (keep the auto-generated files; just stop importing).
- Drop `useAuth`'s Supabase dependency.
- Keep Lovable Cloud enabled (no-op) — disabling isn't supported.

## Technical notes
- React Query keeps caching/invalidation patterns; only the `queryFn` changes.
- Image upload in admin forms: if the API doesn't accept multipart, I'll keep "Image URL" inputs and let you paste Cloudinary IDs. Tell me if there's an upload endpoint.
- CORS: the API needs to allow your Lovable preview origin. If the browser blocks requests, I'll proxy through a Lovable Cloud edge function as a fallback.

**Reply with the auth curl example (and Cloudinary cloud name) and I'll implement.**
