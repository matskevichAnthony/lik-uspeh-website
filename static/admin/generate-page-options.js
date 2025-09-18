// Auto-generate page options from Hugo content
function generatePageOptions() {
  const fs = require('fs');
  const path = require('path');

  const contentDir = path.join(__dirname, '../../content');
  const pageOptions = [];

  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Scan subdirectories
        scanDirectory(fullPath, path.join(basePath, item));
      } else if (item.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');

          // Simple front matter parsing
          const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
          if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1];
            const titleMatch = frontMatter.match(/^title:\s*(.+)$/m);
            const urlMatch = frontMatter.match(/^url:\s*(.+)$/m);

            const title = titleMatch ? titleMatch[1].trim().replace(/['"]/g, '') : item.replace('.md', '');
            const url = urlMatch ? urlMatch[1].trim().replace(/['"]/g, '') : null;

            if (url) {
              // Extract clean URL path for value
              const urlPath = url.replace(/^\/+|\/+$/g, '');

              pageOptions.push({
                label: title,
                value: urlPath || path.basename(item, '.md')
              });
            }
          }
        } catch (error) {
          console.warn(`Error processing ${fullPath}:`, error.message);
        }
      }
    });
  }

  scanDirectory(contentDir);

  // Write to data file
  const outputPath = path.join(__dirname, '../../data/cms/page-options.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(pageOptions, null, 2));

  console.log(`Generated ${pageOptions.length} page options`);
}

if (require.main === module) {
  generatePageOptions();
}

module.exports = generatePageOptions;