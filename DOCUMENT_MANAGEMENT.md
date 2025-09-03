# Document Management System for Hugo + Decap CMS

## Overview

This document management system provides a fast, efficient way to manage documents for a Hugo website. It allows content managers to upload documents via Decap CMS and display them on any page using a flexible shortcode system.

## Implementation Summary

✅ **Core Features:**
- Decap CMS collection for document management
- Hugo shortcode for flexible document display  
- Directory structure for organized document storage
- Support for document reuse across multiple pages

## Directory Structure

```
/
├── static/documents/           # All document files (PDFs, etc.)
├── data/documents/            # JSON metadata files from Decap CMS
└── layouts/shortcodes/
    └── documents.html         # Document display shortcode
```

## Usage Guide

### 1. Adding Documents via Decap CMS

1. Open Decap CMS → "Документы" → "New"
2. Fill in document details:
   - **Заголовок**: Document title
   - **Описание**: Optional description
   - **Файл**: Upload document file
   - **Страницы**: List of page names where document should appear
   - **Категория**: Optional category for grouping documents
   - **Дата**: Publication date
3. Save → Document appears on specified pages automatically

### 2. Using the Documents Shortcode

The `{{< documents >}}` shortcode provides flexible document display:

#### Show documents for specific page:
```markdown
{{< documents page="page-name" title="Page Documents" >}}
```

#### Show documents by category:
```markdown
{{< documents category="category-name" title="Category Documents" >}}
```

#### Show all documents:
```markdown
{{< documents title="All Documents" >}}
```

### 3. Content Page Examples

#### Example: Page with documents
```markdown
---
title: "My Page"
---

# My Page Content

Documents for this page:

{{< documents page="my-page" title="Related Documents" >}}
```

#### Example: Documents by category
```markdown
---
title: "Document Archive"
---

# Document Archive

{{< documents category="reports" title="Reports" >}}
{{< documents category="policies" title="Policies" >}}
```

## Document JSON Structure

Each document is stored as a JSON file in `data/documents/`:

```json
{
  "title": "Document Title",
  "description": "Optional description",
  "file": "/documents/document.pdf",
  "pages": ["page-name", "other-page"],
  "category": "category-name",
  "date": "2025-09-03T10:00:00Z",
  "file_size": "2.1 MB",
  "file_type": "PDF"
}
```

## Workflow Examples

### Adding Documents
1. Content manager opens Decap CMS → "Документы" → "New"
2. Uploads file, adds title and target pages
3. Document automatically appears on specified pages
4. **Time: 2-3 clicks, 1 minute**

### Reusing Documents
1. Edit existing document in "Документы"
2. Add new page name to "Страницы" field
3. Document appears on additional pages
4. **Time: 1 click, 15 seconds**

### Managing by Category
1. Set category when creating document
2. Use category filter in shortcode to display grouped documents
3. Easy organization and filtering
4. **Time: No additional effort**

## Benefits

✅ **Speed**: Fast document upload and management  
✅ **Reusability**: Add documents to multiple pages instantly  
✅ **Organization**: Category-based filtering and display  
✅ **Maintenance**: Update/delete documents in one place  
✅ **Flexibility**: Use shortcodes where needed, simple links elsewhere  
✅ **User-friendly**: Intuitive Decap CMS interface  

## For Simple Links

For pages that rarely have documents, continue using simple HTML links:

```html
<a href="/documents/some-file.pdf" download>Download PDF</a>
```

## Technical Notes

- Documents are served from `/static/documents/` directory
- Metadata stored in `/data/documents/` as JSON files
- Hugo shortcode uses `site.Data.documents` for fast access
- Compatible with Hugo v0.147+ (uses modern resource functions)
- Fully responsive document display with Tailwind CSS classes

## Maintenance

- Document files: Managed through Decap CMS file upload
- Metadata: Automatically generated JSON files in `data/documents/`
- No manual file system management required
- Backup: All documents stored in Git repository

---

**Implementation Status**: ✅ Complete and ready for use  
**Next steps**: Configure according to your specific needs and content structure