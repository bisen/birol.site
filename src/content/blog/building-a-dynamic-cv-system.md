---
title: 'Building a Dynamic CV System with JSON and Handlebars'
description: 'How I built a flexible CV rendering system that transforms structured JSON data into beautiful HTML using Handlebars templates, enabling easy updates and consistent formatting.'
pubDate: 2025-01-17
---

# Building a Dynamic CV System with JSON and Handlebars

Managing a CV can be tedious - every time you want to update your experience or skills, you need to edit HTML, worry about formatting consistency, and potentially break styling. I decided to solve this by building a dynamic CV system that separates content from presentation, making updates as simple as editing a JSON file.

## The Problem

Traditional CV management approaches have several pain points:

- **Content mixed with presentation**: HTML templates with hardcoded content
- **Inconsistent formatting**: Manual styling leads to inconsistencies
- **Multiple format maintenance**: Need separate files for different CV versions
- **Update friction**: Simple content changes require template modifications

## The Solution: Data-Driven CV Generation

I built a system that uses structured JSON data and Handlebars templates to generate professional-looking CVs. Here's how it works:

### Architecture Overview

```
cv-data.json → render.js → template.html → dist/index.html
     ↓             ↓            ↓              ↓
  Structured   Transform   Template     Final CV
    Data        & Render   Engine
```

### 1. Structured Data Layer

The foundation is a comprehensive JSON structure that captures all CV information:

```json
{
  "name": "Birol Senturk",
  "title": "Software Engineer",
  "summary": "Versatile Software Engineer with 8+ years of experience...",
  "contact": {
    "email": "birolsenturk@outlook.com",
    "phone": "+1 (647) 774-5949",
    "linkedin": "https://www.linkedin.com/in/birolsenturk/",
    "website": "https://birol.site",
    "location": "Toronto, ON"
  },
  "experience": [
    {
      "company": "4XDigital",
      "position": "Software Engineer",
      "startDate": "09/2024",
      "endDate": "Present",
      "location": "Toronto, ON",
      "responsibilities": [
        "Architected and implemented an AI-based campaign management system..."
      ],
      "teams": [
        {
          "name": "Amazon Ads",
          "responsibilities": [
            "Designed and implemented production bidding algorithms..."
          ]
        }
      ]
    }
  ],
  "skills": [
    {
      "category": "Languages",
      "items": "Python, Java, C#, Golang, JavaScript, TypeScript, SQL"
    }
  ]
}
```

This structure supports:
- **Nested team structures** for complex roles (like Amazon with multiple teams)
- **Flexible skill categorization** with custom groupings
- **Rich experience details** with multiple responsibilities per role
- **Personal projects** with technology stacks and links

### 2. Data Transformation Engine

The `render.js` script handles the transformation pipeline:

```javascript
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

async function buildCV() {
  // 1. Read and parse JSON data
  const jsonString = fs.readFileSync('cv-data.json', 'utf8');
  const rawJsonData = JSON.parse(jsonString);
  
  // 2. Transform data for template consumption
  const resumeData = transformData(rawJsonData);
  
  // 3. Compile and render template
  const templateSource = fs.readFileSync('template.html', 'utf8');
  const template = Handlebars.compile(templateSource);
  const finalHtml = template({ resume: resumeData });
  
  // 4. Output final CV
  fs.writeFileSync('dist/index.html', finalHtml);
}
```

The transformation layer normalizes data and adds computed fields:

```javascript
function transformData(rawJson) {
  return {
    name: rawJson.name || '',
    title: rawJson.title || '',
    summary: rawJson.summary || '',
    experience: rawJson.experience?.map(job => ({
      position: job.position || '',
      company: job.company || '',
      duration: `${job.startDate} - ${job.endDate}`, // Computed field
      location: job.location || '',
      responsibilities: job.responsibilities || [],
      teams: job.teams || null // Support for nested team structure
    })) || []
    // ... more transformations
  };
}
```

### 3. Template System with Handlebars

The Handlebars template provides the presentation layer with conditional rendering and loops:

```handlebars
{{#if resume.summary}}
<div class="section">
    <div class="summary">
        <p>{{resume.summary}}</p>
    </div>
</div>
{{/if}}

{{#if resume.experience}}
<div class="section">
    <h2>EXPERIENCE</h2>
    {{#each resume.experience}}
    <div class="experience-item">
        <div class="experience-meta">
            <div class="duration-location">{{this.duration}}</div>
            <div class="company">{{this.company}}</div>
        </div>
        <div class="job-content">
            <div class="job-title">{{this.position}}</div>
            <div class="job-description">
                {{#if this.teams}}
                    {{#each this.teams}}
                    <div class="team-section">
                        <div class="team-name">{{this.name}}</div>
                        {{#each this.responsibilities}}
                        <p>{{this}}</p>
                        {{/each}}
                    </div>
                    {{/each}}
                {{else}}
                    {{#each this.responsibilities}}
                    <p>{{this}}</p>
                    {{/each}}
                {{/if}}
            </div>
        </div>
    </div>
    {{/each}}
</div>
{{/if}}
```

This approach enables:
- **Conditional sections**: Only render sections that have data
- **Dynamic team structures**: Handle both simple and complex role organizations
- **Flexible content**: Easy to add/remove sections without template changes

### 4. Advanced Features

#### Team Structure Support
For complex roles like my Amazon position, the system supports nested team structures:

```json
{
  "company": "Amazon",
  "teams": [
    {
      "name": "Amazon Ads",
      "responsibilities": ["Built bidding algorithms..."]
    },
    {
      "name": "Alexa", 
      "responsibilities": ["Engineered multi-modal experiences..."]
    }
  ]
}
```

#### Personal Projects with Tech Stacks
Projects include structured technology information:

```json
{
  "personal_projects": [
    {
      "projectName": "Agentic Ad Campaign Generator",
      "description": "An autonomous system that analyzes storefronts...",
      "technologies": ["Python", "LangChain", "FastAPI", "Docker"],
      "url": "https://github.com/birolsenturk/ad-agent-project"
    }
  ]
}
```

The template renders these as styled technology tags with hover effects.

## Benefits of This Approach

### 1. **Separation of Concerns**
- Content lives in structured JSON
- Presentation handled by CSS and HTML template
- Logic contained in transformation layer

### 2. **Easy Updates**
- Change job details? Edit JSON and regenerate
- New role? Add to experience array
- Skill updates? Modify skills object

### 3. **Consistency**
- All formatting handled by template
- No manual styling inconsistencies
- Predictable output structure

### 4. **Extensibility**
- Add new sections by extending JSON schema
- Modify presentation without touching data
- Support multiple output formats (future: PDF, Word)

### 5. **Version Control Friendly**
- JSON changes show clear diffs
- Template changes separate from content changes
- Easy to track what actually changed

## Implementation Details

### CSS Architecture
The system uses CSS custom properties for theming:

```css
:root {
    --black: #0a0a0a;
    --accent: #ff6b35;
    --text-primary: #fafafa;
    --text-secondary: #b0b0b0;
}
```

This enables easy theme switching and consistent color usage throughout.

### Build Process
The build is triggered with a simple command:

```bash
node render.js
```

Output:
```
Starting CV build process...
Successfully parsed JSON data.
Transformed data for Handlebars.
Rendered final HTML.
✅ Success! Your CV has been built to dist/index.html
```

## Future Enhancements

Several improvements are planned:

1. **Multiple Output Formats**: PDF generation using Puppeteer
2. **Theme System**: Multiple visual themes selectable via config
3. **Validation Layer**: JSON schema validation for data integrity
4. **Watch Mode**: Auto-regeneration on file changes
5. **Deployment Integration**: Auto-deploy to hosting on updates

## Conclusion

This dynamic CV system transformed my resume management workflow. What used to be tedious HTML editing is now simple JSON updates. The separation of content and presentation makes maintenance effortless while ensuring professional, consistent output.

The system demonstrates how thoughtful architecture can solve real-world problems - in this case, turning CV maintenance from a chore into a streamlined process.

---

*Want to build something similar? The code is available in my [CV repository](https://github.com/birolsenturk/cv), and I'm always happy to discuss technical implementation details.*