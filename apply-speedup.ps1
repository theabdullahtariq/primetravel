# Run from the project folder (the one containing "src"). Safe to run twice.
$ErrorActionPreference = "Stop"
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Patch($file, $pairs) {
  if (-not (Test-Path $file)) { Write-Host "MISSING: $file" -ForegroundColor Red; return }
  $path = (Resolve-Path $file).Path
  $t = [System.IO.File]::ReadAllText($path, $utf8)
  $n = 0
  foreach ($p in $pairs) {
    if ($t.Contains($p[0])) { $t = $t.Replace($p[0], $p[1]); $n++ }
    else { Write-Host "  skipped (not found or already done): $($p[0])" -ForegroundColor Yellow }
  }
  [System.IO.File]::WriteAllText($path, $t, $utf8)
  Write-Host "$file : $n change(s)" -ForegroundColor Green
}

# 1. Faster page changes: preload pages on hover/touch
$r = "src\router.tsx"
if ((Test-Path $r) -and -not ([System.IO.File]::ReadAllText((Resolve-Path $r).Path, $utf8)).Contains('defaultPreload: "intent"')) {
  Patch $r @(, @('defaultPreloadStaleTime: 0,', 'defaultPreloadStaleTime: 0, defaultPreload: "intent", defaultPreloadDelay: 0,'))
} else { Write-Host "router.tsx : already done or missing" -ForegroundColor Yellow }

# 2. Shorter animations
Patch "src\styles.css" @(
  @('hero-zoom 2.8s', 'hero-zoom 1.6s'),
  @('animation: rise 1s', 'animation: rise .6s'),
  @('.reveal { opacity: 0; transform: translateY(24px); transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1); }', '.reveal { opacity: 0; transform: translateY(16px); transition: opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1); }'),
  @('word-up 1s', 'word-up .6s')
)

# 3. Shorter hero and page-header delays
Patch "src\components\site\Hero.tsx" @(
  @('"200ms" }}>Visa', '"50ms" }}>Visa'),
  @('${350 + i * 90}ms', '${80 + i * 50}ms'),
  @('animationDelay: "900ms"', 'animationDelay: "450ms"'),
  @('animationDelay: "600ms"', 'animationDelay: "300ms"')
)
Patch "src\components\site\Layout.tsx" @(
  @('animationDelay: "120ms"', 'animationDelay: "40ms"'),
  @('animationDelay: "240ms"', 'animationDelay: "80ms"')
)

# 4. Sample reviews (file sits next to this script)
if (Test-Path ".\Testimonials.tsx") {
  Copy-Item ".\Testimonials.tsx" "src\components\site\Testimonials.tsx" -Force
  Remove-Item ".\Testimonials.tsx"
  Write-Host "Testimonials.tsx : updated" -ForegroundColor Green
}

Write-Host "`nDone. Now run: git add . ; git commit -m 'Speed up and sample reviews' ; git push" -ForegroundColor Cyan
