$path = "./main.tex"
$lastContent = Get-Content -Path $path -Raw

while ($true) {
    $currentContent = Get-Content -Path $path -Raw
    if ($currentContent -ne $lastContent) {
        "$(Get-Date), Changed"
        lualatex -interaction=nonstopmode $path
        $lastContent = $currentContent
    }
    Start-Sleep -Milliseconds 100
}