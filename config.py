# ============================================================
#  EDIT THIS FILE, then run:  python3 build.py
#  Every personal detail on the site comes from here.
#  Leave a value as "" and the site simply hides that item.
# ============================================================

# Your domain, no trailing slash. Must be correct before launch:
# it is written into canonical links, hreflang tags and the sitemap.
SITE_URL = "https://drabdulelah.netlify.app"

# Keep False until the real domain and contact details are in.
# False = search engines are told not to index the site yet.
INDEXABLE = False

NAME_AR = "د. عبدالإله مسفر القحطاني"
NAME_AR_SHORT = "د. عبدالإله القحطاني"
NAME_EN = "Dr. Abdulelah Mesfer Alqahtani"
NAME_EN_SHORT = "Dr. Abdulelah Alqahtani"

TITLE_AR = "استشاري الأنف والأذن والحنجرة وجراحة الرأس والرقبة وجراحة تجميل الوجه"
TITLE_EN = "Consultant ENT, Head & Neck and Facial Plastic Surgeon"

# Contact.
# WHATSAPP_LINK: the coordinator's WhatsApp Business link (from the Instagram bio).
# WHATSAPP: optional plain number, digits only with country code (e.g. 9665XXXXXXXX).
#   When set, the booking form can pre-fill the patient's details into the chat.
WHATSAPP_LINK = "https://wa.me/message/KRAY63CJ3ZQPE1"
WHATSAPP = ""
PHONE = ""          # shown as written, e.g. "+966 5X XXX XXXX"
EMAIL = ""

# SCFHS professional registration number (shown in the footer)
SCFHS_NO = ""

# Where patients can see you. Add "maps" with a Google Maps link when ready.
LOCATIONS = [
    {"ar": "مركز إيف للتجميل", "en": "Eve Aesthetic Center",
     "city_ar": "الرياض", "city_en": "Riyadh", "maps": ""},
]

# Board certifications, fellowships, memberships. One entry per line, both languages.
# Leave empty and the credentials block is hidden.
CREDENTIALS = [
    # {"ar": "البورد السعودي في الأنف والأذن والحنجرة", "en": "Saudi Board in Otolaryngology – Head & Neck Surgery"},
]

# Social profiles (full URLs). These also go into Google's structured data.
SOCIAL = {
    "instagram": "https://www.instagram.com/drabdulelah.q/",
    "x": "",
    "snapchat": "",
    "tiktok": "",
    "linkedin": "",
}

# Professional portrait: put the file in assets/ and set its name, e.g. "portrait.jpg"
PORTRAIT = ""
