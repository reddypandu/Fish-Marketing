document.getElementById('auditForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var websiteUrl = document.getElementById('websiteUrl').value;
    runAudit(websiteUrl);
});

function runAudit(websiteUrl) {
    // Perform SEO audit logic here

    // Initialize audit results object
    var auditResults = {
        titleTag: true,
        metaDescription: true,
        metaKeywords: true,
        headingStructure: true
    };

    // Fetch website content using AJAX
    fetch(websiteUrl)
        .then(response => response.text())
        .then(html => {
            // Create a temporary div to hold the HTML content
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Check for title tag
            var titleTag = tempDiv.querySelector('title');
            if (titleTag) {
                auditResults.titleTag = true;
            }

            // Check for meta description tag
            var metaDescription = tempDiv.querySelector('meta[name="description"]');
            if (metaDescription && metaDescription.getAttribute('content')) {
                auditResults.metaDescription = true;
            }

            // Check for meta keywords tag
            var metaKeywords = tempDiv.querySelector('meta[name="keywords"]');
            if (metaKeywords && metaKeywords.getAttribute('content')) {
                auditResults.metaKeywords = true;
            }

            // Check heading structure
            var headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings.length > 0) {
                auditResults.headingStructure = true;
            }

            // Display audit results
            displayAuditResults(auditResults);
        })
        .catch(error => {
            console.error('Error fetching website content:', error);
        });
}

function displayAuditResults(results) {
    var auditReport = '<h2>Audit Report</h2>';
    auditReport += '<ul>';
    auditReport += '<li>Title Tag: ' + (results.titleTag ? 'Found' : 'Not found') + '</li>';
    auditReport += '<li>Meta Description: ' + (results.metaDescription ? 'Found' : 'Not found') + '</li>';
    auditReport += '<li>Meta Keywords: ' + (results.metaKeywords ? 'Found' : 'Not found') + '</li>';
    auditReport += '<li>Heading Structure: ' + (results.headingStructure ? 'Found' : 'Not found') + '</li>';
    auditReport += '</ul>';

    document.getElementById('auditResults').innerHTML = auditReport;
}

