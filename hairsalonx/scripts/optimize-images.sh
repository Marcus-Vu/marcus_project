#!/bin/bash
# Optimize images for web
# Requires: cwebp, imagemagick

echo "Optimizing images..."

cd /home/ec2-user/clawd/marcus_project/hairsalonx/public/images

# Create webp versions and optimize
for img in *.jpg *.png; do
  if [ -f "$img" ]; then
    base=$(basename "$img" | cut -d. -f1)
    
    # Skip if already optimized
    if [[ "$img" == *"-optimized"* ]]; then
      continue
    fi
    
    echo "Processing: $img"
    
    # Convert to webp with quality 85
    if command -v cwebp &> /dev/null; then
      cwebp -q 85 "$img" -o "${base}.webp" 2>/dev/null
      echo "  Created: ${base}.webp"
    fi
    
    # Resize large images to max 1200px width
    if command -v convert &> /dev/null; then
      convert "$img" -resize 1200x1200\> -quality 85 "${base}-optimized.jpg" 2>/dev/null
      echo "  Created: ${base}-optimized.jpg"
    fi
  fi
done

echo "Done!"
