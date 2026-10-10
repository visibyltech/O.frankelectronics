"""Generates simple brand-blue product illustrations into public/products/*.svg.

Original artwork (no third-party images). Run: python scripts/make-product-art.py
Replace any of them with real photos from the admin panel when you have them.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "products"
OUT.mkdir(parents=True, exist_ok=True)

DARK, BRAND, LIGHT, INK, TINT = "#0B3B8F", "#1473E6", "#5AAEFF", "#0F1B33", "#EAF3FF"

HEAD = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F9FF"/><stop offset="1" stop-color="#CFE3FF"/></linearGradient>
<linearGradient id="scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{LIGHT}"/><stop offset="1" stop-color="{DARK}"/></linearGradient>
<linearGradient id="body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DCE8F7"/></linearGradient>
</defs>
<rect width="800" height="600" fill="url(#bg)"/>
<ellipse cx="400" cy="520" rx="230" ry="22" fill="{DARK}" opacity=".15"/>
"""
TAIL = "</svg>\n"


def save(name: str, body: str) -> None:
    (OUT / f"{name}.svg").write_text(HEAD + body + TAIL, encoding="utf-8")


def tv(badge: str = "") -> str:
    b = (
        f'<rect x="215" y="145" width="64" height="30" rx="6" fill="#fff"/>'
        f'<text x="247" y="167" font-family="Arial" font-weight="800" font-size="20" text-anchor="middle" fill="{DARK}">{badge}</text>'
        if badge
        else ""
    )
    return f"""
<rect x="150" y="110" width="500" height="320" rx="14" fill="{INK}"/>
<rect x="166" y="126" width="468" height="288" rx="6" fill="url(#scr)"/>
<path d="M166 360 L300 250 L380 320 L470 230 L634 380 L634 414 L166 414Z" fill="#fff" opacity=".25"/>
<circle cx="560" cy="190" r="30" fill="#fff" opacity=".35"/>
{b}
<path d="M330 430 H470 L490 490 H310Z" fill="{DARK}"/>
<rect x="260" y="490" width="280" height="14" rx="7" fill="{INK}"/>"""


def laptop() -> str:
    return f"""
<rect x="190" y="120" width="420" height="290" rx="16" fill="{INK}"/>
<rect x="205" y="135" width="390" height="260" rx="6" fill="url(#scr)"/>
<path d="M205 340 L330 240 L410 310 L500 230 L595 320 L595 395 L205 395Z" fill="#fff" opacity=".25"/>
<path d="M120 420 H680 L650 478 Q645 490 632 490 H168 Q155 490 150 478Z" fill="url(#body)" stroke="#B9CCE8" stroke-width="3"/>
<rect x="330" y="432" width="140" height="14" rx="7" fill="#B9CCE8"/>"""


def phone() -> str:
    return f"""
<rect x="290" y="50" width="220" height="440" rx="36" fill="{INK}"/>
<rect x="304" y="66" width="192" height="408" rx="26" fill="url(#scr)"/>
<rect x="372" y="76" width="56" height="10" rx="5" fill="{INK}"/>
<circle cx="400" cy="250" r="54" fill="#fff" opacity=".3"/>
<rect x="326" y="360" width="148" height="14" rx="7" fill="#fff" opacity=".5"/>
<rect x="346" y="388" width="108" height="14" rx="7" fill="#fff" opacity=".35"/>"""


def powerbank() -> str:
    leds = "".join(f'<circle cx="{330 + i * 30}" cy="290" r="8" fill="{LIGHT}"/>' for i in range(4))
    return f"""
<g transform="rotate(-8 400 300)">
<rect x="255" y="140" width="290" height="320" rx="34" fill="{BRAND}"/>
<rect x="255" y="140" width="290" height="320" rx="34" fill="url(#body)" opacity=".15"/>
<rect x="290" y="180" width="220" height="70" rx="14" fill="{DARK}"/>
{leds}
<path d="M410 330 L380 380 H405 L395 425 L430 365 H405Z" fill="#fff"/>
<rect x="335" y="140" width="40" height="14" rx="4" fill="{INK}"/>
<rect x="425" y="140" width="40" height="14" rx="4" fill="{INK}"/>
</g>"""


def fridge() -> str:
    return f"""
<rect x="290" y="50" width="220" height="460" rx="18" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<line x1="290" y1="205" x2="510" y2="205" stroke="#B9CCE8" stroke-width="4"/>
<rect x="318" y="100" width="12" height="70" rx="6" fill="{BRAND}"/>
<rect x="318" y="235" width="12" height="130" rx="6" fill="{BRAND}"/>
<rect x="440" y="80" width="40" height="14" rx="7" fill="{LIGHT}"/>
<rect x="320" y="500" width="30" height="14" fill="{INK}"/><rect x="450" y="500" width="30" height="14" fill="{INK}"/>"""


def ac() -> str:
    slats = "".join(
        f'<line x1="{215 + i * 40}" y1="232" x2="{200 + i * 40}" y2="252" stroke="#B9CCE8" stroke-width="4" stroke-linecap="round"/>'
        for i in range(0, 11)
    )
    air = "".join(
        f'<path d="M{250 + i * 100} 290 q10 60 -20 110" stroke="{LIGHT}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>'
        for i in range(0, 5)
    )
    return f"""
<rect x="130" y="130" width="540" height="150" rx="30" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<rect x="170" y="215" width="460" height="46" rx="14" fill="#E6EFFB"/>
{slats}
<circle cx="610" cy="170" r="8" fill="{BRAND}"/><rect x="170" y="165" width="90" height="12" rx="6" fill="{BRAND}" opacity=".5"/>
{air}"""


def washer() -> str:
    return f"""
<rect x="240" y="50" width="320" height="450" rx="22" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<rect x="240" y="50" width="320" height="86" rx="22" fill="#E6EFFB"/>
<circle cx="300" cy="94" r="20" fill="{BRAND}"/><rect x="350" y="82" width="120" height="14" rx="7" fill="{DARK}" opacity=".6"/><circle cx="515" cy="94" r="8" fill="{LIGHT}"/>
<circle cx="400" cy="315" r="122" fill="{INK}"/>
<circle cx="400" cy="315" r="98" fill="url(#scr)"/>
<path d="M310 330 q45 -50 90 0 t90 0" stroke="#fff" stroke-width="8" fill="none" opacity=".5"/>
<ellipse cx="365" cy="270" rx="26" ry="14" fill="#fff" opacity=".35" transform="rotate(-30 365 270)"/>"""


def microwave() -> str:
    btns = "".join(f'<circle cx="565" cy="{250 + i * 38}" r="12" fill="{BRAND}"/>' for i in range(4))
    return f"""
<rect x="140" y="160" width="520" height="300" rx="22" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<rect x="175" y="195" width="300" height="230" rx="14" fill="{INK}"/>
<rect x="190" y="210" width="270" height="200" rx="8" fill="url(#scr)" opacity=".85"/>
<path d="M190 380 L300 290 L460 410 L190 410Z" fill="#fff" opacity=".2"/>
<rect x="510" y="195" width="110" height="46" rx="8" fill="{DARK}"/>
{btns}
<rect x="170" y="460" width="40" height="12" fill="{INK}"/><rect x="590" y="460" width="40" height="12" fill="{INK}"/>"""


def kettle() -> str:
    return f"""
<rect x="270" y="470" width="260" height="34" rx="14" fill="{INK}"/>
<path d="M290 470 L305 190 Q310 140 360 130 H440 Q490 140 495 190 L510 470Z" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<path d="M310 300 H490" stroke="{BRAND}" stroke-width="10" opacity=".5"/>
<rect x="355" y="100" width="90" height="34" rx="14" fill="{DARK}"/>
<path d="M495 200 Q600 190 590 300 Q585 380 505 400" stroke="{INK}" stroke-width="22" fill="none" stroke-linecap="round"/>
<path d="M305 215 L225 150 L250 130 L322 190Z" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<circle cx="400" cy="440" r="12" fill="{LIGHT}"/>"""


def blender() -> str:
    return f"""
<rect x="290" y="400" width="220" height="110" rx="22" fill="{DARK}"/>
<circle cx="400" cy="455" r="22" fill="{LIGHT}"/>
<path d="M300 400 L320 130 H480 L500 400Z" fill="#fff" opacity=".7" stroke="#B9CCE8" stroke-width="4"/>
<path d="M316 300 H484 L496 400 H304Z" fill="{BRAND}" opacity=".45"/>
<rect x="305" y="100" width="190" height="34" rx="12" fill="{INK}"/>
<path d="M500 160 Q570 170 560 250 Q555 290 505 300" stroke="{INK}" stroke-width="16" fill="none" stroke-linecap="round"/>
<path d="M360 395 l40 -30 l40 30" stroke="#fff" stroke-width="8" fill="none" opacity=".8"/>"""


def earbuds() -> str:
    return f"""
<rect x="230" y="270" width="340" height="190" rx="70" fill="url(#body)" stroke="#B9CCE8" stroke-width="4"/>
<path d="M230 360 H570" stroke="#B9CCE8" stroke-width="4"/>
<circle cx="400" cy="320" r="10" fill="{LIGHT}"/>
<g transform="rotate(-18 320 190)"><rect x="285" y="90" width="64" height="150" rx="30" fill="{INK}"/><circle cx="317" cy="105" r="34" fill="{BRAND}"/></g>
<g transform="rotate(18 480 190)"><rect x="451" y="90" width="64" height="150" rx="30" fill="{INK}"/><circle cx="483" cy="105" r="34" fill="{BRAND}"/></g>"""


def speaker() -> str:
    dots = "".join(
        f'<circle cx="{240 + c * 32}" cy="{250 + r * 32}" r="6" fill="{LIGHT}" opacity=".7"/>'
        for r in range(0, 4)
        for c in range(0, 11)
    )
    return f"""
<rect x="190" y="200" width="420" height="230" rx="60" fill="{INK}"/>
<rect x="215" y="225" width="370" height="180" rx="40" fill="{DARK}"/>
{dots}
<circle cx="400" cy="430" r="0" fill="none"/>
<rect x="330" y="395" width="140" height="10" rx="5" fill="{BRAND}"/>
<path d="M190 330 q-45 -5 -50 -50 M610 330 q45 -5 50 -50" stroke="{LIGHT}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"/>"""


def watch() -> str:
    return f"""
<rect x="330" y="30" width="140" height="150" rx="30" fill="{DARK}"/>
<rect x="330" y="420" width="140" height="150" rx="30" fill="{DARK}"/>
<rect x="260" y="150" width="280" height="300" rx="70" fill="{INK}"/>
<rect x="278" y="168" width="244" height="264" rx="54" fill="url(#scr)"/>
<text x="400" y="320" font-family="Arial" font-weight="800" font-size="64" text-anchor="middle" fill="#fff">10:09</text>
<path d="M330 370 q18 -26 36 0 t36 0 t36 0" stroke="#fff" stroke-width="7" fill="none" opacity=".7"/>
<rect x="540" y="270" width="16" height="50" rx="8" fill="{BRAND}"/>"""


ART = {
    "tv": tv(),
    "tv-4k": tv("4K"),
    "laptop": laptop(),
    "phone": phone(),
    "powerbank": powerbank(),
    "fridge": fridge(),
    "ac": ac(),
    "washer": washer(),
    "microwave": microwave(),
    "kettle": kettle(),
    "blender": blender(),
    "earbuds": earbuds(),
    "speaker": speaker(),
    "watch": watch(),
}

for name, body in ART.items():
    save(name, body)
print(f"Wrote {len(ART)} illustrations to {OUT}")
