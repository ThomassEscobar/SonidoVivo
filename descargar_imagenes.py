import os
import urllib.request

# 1. Carpeta de destino
folder = os.path.join("assets", "img", "productos")
os.makedirs(folder, exist_ok=True)

# 2. Diccionario de imágenes (URL de GE005 actualizada)
imagenes = {
    # Guitarras Acústicas
    "GA001": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop",
    "GA002": "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=600&auto=format&fit=crop",
    "GA003": "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=600&auto=format&fit=crop",
    "GA004": "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&auto=format&fit=crop",
    "GA005": "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop",

    # Guitarras Eléctricas
    "GE001": "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&auto=format&fit=crop",
    "GE002": "https://images.unsplash.com/photo-1558098329-a11cff621064?w=600&auto=format&fit=crop",
    "GE003": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&auto=format&fit=crop",
    "GE004": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop",
    "GE005": "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&auto=format&fit=crop", # URL Corregida

    # Bajos Eléctricos
    "BA001": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop",
    "BA002": "https://images.unsplash.com/photo-1462965326201-d02e4f455804?w=600&auto=format&fit=crop",
    "BA003": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop",

    # Baterías
    "BT001": "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&auto=format&fit=crop",
    "BT002": "https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?w=600&auto=format&fit=crop",
    "BT003": "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&auto=format&fit=crop",
    "BT004": "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=600&auto=format&fit=crop",
    "BT005": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop",

    # Teclados y Pianos
    "TC001": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop",
    "TC002": "https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&auto=format&fit=crop",
    "TC003": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop",
    "TC004": "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=600&auto=format&fit=crop",

    # Amplificadores
    "AM001": "https://images.unsplash.com/photo-1558098329-a11cff621064?w=600&auto=format&fit=crop",
    "AM002": "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=600&auto=format&fit=crop",
    "AM003": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    "AM004": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop",

    # Micrófonos
    "MI001": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop",
    "MI002": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop",
    "MI003": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop",
    "MI004": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop",

    # Pedales
    "PE001": "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&auto=format&fit=crop",
    "PE002": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop",
    "PE003": "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=600&auto=format&fit=crop",
    "PE004": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&auto=format&fit=crop",
    "PE005": "https://images.unsplash.com/photo-1558098329-a11cff621064?w=600&auto=format&fit=crop",
    "PE006": "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=600&auto=format&fit=crop",

    # Accesorios
    "AC001": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop",
    "AC002": "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=600&auto=format&fit=crop",
    "AC003": "https://images.unsplash.com/photo-1462965326201-d02e4f455804?w=600&auto=format&fit=crop",
    "AC004": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop",
    "AC005": "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&auto=format&fit=crop",
    "AC006": "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop",
    "AC007": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop",
    "AC008": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop",
    "AC009": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop",
    "AC010": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop",

    # Estudio y Grabación
    "ES001": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop",
    "ES002": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop",
    "ES003": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
    "ES004": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    "ES005": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print("Comprobando archivos faltantes...")
descargadas = 0

for codigo, url in imagenes.items():
    filepath = os.path.join(folder, f"{codigo}.jpg")

    # Si ya existe y pesa más de 0 bytes, saltar descarga
    if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        continue

    print(f"Descargando {codigo}.jpg...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"-> ¡{codigo}.jpg descargado exitosamente!")
        descargadas += 1
    except Exception as e:
        print(f"-> Error descargando {codigo}: {e}")

if descargadas == 0:
    print("\n¡Todas las 51 imágenes ya se encuentran descargadas correctamente!")
else:
    print(f"\n¡Listo! Se descargaron {descargadas} imagen(es) pendiente(s).")