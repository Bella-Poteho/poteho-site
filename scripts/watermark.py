#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Poteho 产品图统一处理：正方形裁切 + 1000x1000 + 右下角 Poteho 词标水印。

规范（来自 poteho-product-image-watermark skill）：
- 输出 1000x1000 正方形 JPEG（卡片 CSS 用 aspect-ratio:1/1 + object-fit:cover）
- 水印取 LOGO 的词标（裁掉 "your pet's best friend" 标语）
- 位置右下角；宽度 = 图宽 20%；边距 = 图宽 3.8%
- 按水印区域平均亮度切换配色：>=150 用品牌原色（0.62），<150 用纯白（0.95）
- 叠一层很淡的投影（黑 30% + 高斯模糊 3.2px）

用法：
  python watermark.py                 # 跑脚本内 MAP
  python watermark.py <src> <out>     # 单张
"""
import os
import sys
from PIL import Image, ImageFilter, ImageStat

REPO = r"E:\workbuddy\poteho\poteho-site"
LOGO = r"E:\workbuddy\poteho\poteho-assets\LOGO\poteho-logo-terracotta.png"
OUT_DIR = os.path.join(REPO, "assets", "products")

SIZE = 1000
WM_RATIO = 0.20        # 水印宽度占图宽比例
MARGIN_RATIO = 0.038   # 边距占图宽比例
LIGHT_THRESHOLD = 150

# 目标文件名 -> 源图 (新增的 Bed 三款)
MAP = {
    "bed-bear.jpg":   r"E:\workbuddy\poteho\poteho-assets\窝\熊头窝\pet bed.jpg",
    "bed-mat.jpg":    r"E:\workbuddy\poteho\poteho-assets\窝\猫垫\pet mat.jpg",
    "bed-rattan.jpg": r"E:\workbuddy\poteho\poteho-assets\窝\藤编猫窝\pet bed.jpg",
}


def load_wordmark():
    """取 LOGO 词标部分（去掉下方标语），并裁掉四周透明留白。"""
    logo = Image.open(LOGO).convert("RGBA")
    w, h = logo.size
    # 词标位于图片上中部；标语在 ~60% 高度以下，这里裁到 55% 高度以内
    cut = int(h * 0.55)
    word = logo.crop((0, 0, w, cut))
    bbox = word.getbbox()
    if bbox:
        word = word.crop(bbox)
    return word


def cover_square(img, size=SIZE):
    """等比放大到覆盖 size x size，再居中裁切，保证不变形、无白边。"""
    w, h = img.size
    scale = max(size / w, size / h)
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    img = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - size) // 2
    top = (nh - size) // 2
    return img.crop((left, top, left + size, top + size))


def white_version(img):
    """保留 alpha，把颜色全部换成纯白。"""
    out = Image.new("RGBA", img.size, (255, 255, 255, 0))
    out.putalpha(img.getchannel("A"))
    return out


def with_opacity(img, opacity):
    a = img.getchannel("A").point(lambda v: int(v * opacity))
    out = img.copy()
    out.putalpha(a)
    return out


def process(src, dst):
    base = Image.open(src).convert("RGB")
    base = cover_square(base, SIZE).convert("RGBA")

    word = load_wordmark()
    wm_w = int(SIZE * WM_RATIO)
    wm_h = max(1, round(word.size[1] * wm_w / word.size[0]))
    word = word.resize((wm_w, wm_h), Image.LANCZOS)

    margin = int(SIZE * MARGIN_RATIO)
    x = SIZE - margin - wm_w
    y = SIZE - margin - wm_h

    # 采样水印区域亮度，决定配色
    patch = base.crop((x, y, x + wm_w, y + wm_h)).convert("L")
    lum = ImageStat.Stat(patch).mean[0]

    if lum >= LIGHT_THRESHOLD:
        wm = with_opacity(word, 0.62)          # 浅底：品牌原色
        shadow_alpha = 0.30
    else:
        wm = with_opacity(white_version(word), 0.95)  # 深底：纯白
        shadow_alpha = 0.45

    # 投影
    shadow = Image.new("RGBA", word.size, (0, 0, 0, 0))
    shadow.putalpha(word.getchannel("A").point(lambda v: int(v * shadow_alpha)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(3.2))

    base.alpha_composite(shadow, (x + 3, y + 3))
    base.alpha_composite(wm, (x, y))

    base.convert("RGB").save(dst, "JPEG", quality=92, optimize=True, subsampling=1)
    print(f"OK  {os.path.basename(dst)}  <- {os.path.basename(src)}  (lum={lum:.0f}, {'brand' if lum >= LIGHT_THRESHOLD else 'white'})")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    if len(sys.argv) == 3:
        process(sys.argv[1], sys.argv[2])
        return
    for name, src in MAP.items():
        if not os.path.exists(src):
            print("MISSING:", src)
            continue
        process(src, os.path.join(OUT_DIR, name))


if __name__ == "__main__":
    main()
