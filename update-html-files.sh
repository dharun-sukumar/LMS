#!/bin/bash

# Script to update all HTML files with correct CSS and JS references

# List of HTML files to update
files=(
  "404.html"
  "courses.html" 
  "index2.html"
  "coming-soon.html"
  "contact.html"
  "user-dashboard.html"
  "register.html"
  "login.html"
  "admin-dashboard.html"
  "pricing.html"
)

# Update each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    
    # Replace the old script reference with new ones
    sed -i 's|<script src="js/rtl-toggle.js" defer></script>|  <link rel="stylesheet" href="css/components/navbar.css">\
  <link rel="stylesheet" href="css/components/footer.css">\
  <link rel="stylesheet" href="css/responsive.css">\
  <script src="js/main.js" defer></script>\
  <script src="js/components/rtl-toggle.js" defer></script>|g' "$file"
    
    echo "Updated $file"
  else
    echo "File $file not found, skipping..."
  fi
done

echo "All HTML files updated successfully!"
