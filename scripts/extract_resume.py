from pathlib import Path
import sys

pdf_path = Path('public/Rodney_Charles_O_Austria_Resume_2026.pdf')
if not pdf_path.exists():
    print(f"Error: {pdf_path} not found")
    sys.exit(2)

try:
    from pypdf import PdfReader
except Exception as e:
    print('pypdf not installed. Run: pip install pypdf')
    sys.exit(3)

reader = PdfReader(str(pdf_path))
text = []
for page in reader.pages:
    text.append(page.extract_text() or '')

out = '\n\n'.join(text)
print(out)
with open('tmp_resume_text.txt','w',encoding='utf-8') as f:
    f.write(out)
print('\nSaved extracted text to tmp_resume_text.txt')
