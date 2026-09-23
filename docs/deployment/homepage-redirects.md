# Homepage redirect deployment

The application proxy sends both production root URLs directly to
`https://www.recursive-solutions.com/en` with HTTP 301, preserving query strings.
Other paths and development/preview hosts retain their existing routing.

## Required hosting check

The reported crawl saw an apex-to-www redirect before the application's locale
redirect. Hosting/domain rules are not managed in this repository. Deploying the
proxy alone cannot override a redirect performed before the request reaches Next.js.

At the active hosting provider, change the exact apex-root redirect destination to
`https://www.recursive-solutions.com/en`, preserving the query string. Keep existing
non-root domain redirects intact. Alternatively, route the apex root to this app
so the proxy can perform the combined redirect. Avoid changing a domain-wide rule
to send every path to the homepage.

## Verify after deployment

Run these checks against production only with authorization:

```sh
curl -sS -o /dev/null -D - https://recursive-solutions.com/
curl -sS -o /dev/null -D - https://www.recursive-solutions.com/
curl -sS -o /dev/null -w '%{num_redirects} %{url_effective} %{http_code}\n' -L https://recursive-solutions.com/
curl -sS -o /dev/null -w '%{num_redirects} %{url_effective} %{http_code}\n' -L https://www.recursive-solutions.com/
```

Each root should return a permanent redirect directly to the canonical URL;
following it should report exactly one redirect and a final HTTP 200.
Repeat with `?utm_source=redirect-check` to verify query preservation.
Do not close the crawl warning until this production check passes.
