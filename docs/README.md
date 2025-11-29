# NUDGE Documentation Structure

This directory contains detailed technical documentation for the NUDGE habit tracker project.

---

## 📁 Documentation Files

### [`architecture.md`](architecture.md)
**Purpose**: Deep dive into system architecture and design decisions

**Contents** (~200-250 lines):
- Component hierarchy and data flow
- State management patterns
- localStorage schema and persistence strategy
- CSS architecture (dark theme, glassmorphism, animations)
- Mobile-first responsive design approach
- Performance optimizations (requestAnimationFrame, lazy rendering)
- Security considerations (XSS prevention, API key storage)

**When to read**: Understanding how the app is structured and why certain architectural choices were made.

---

### [`coach-nudge-behaviour.md`](coach-nudge-behaviour.md)
**Purpose**: Complete guide to Coach Nudge AI personality and behavior

**Contents** (~250-300 lines):
- Full system prompt template with examples
- Personality guidelines and tone rules
- Response templates for common questions
- Guardrails and topic boundaries
- Local vs AI decision logic
- Error handling and fallback strategies
- OpenRouter API configuration details
- Example conversations with expected outputs

**When to read**: Modifying Coach Nudge's personality, adding new quick actions, or debugging AI responses.

---

### [`emoji-mapping-guide.md`](emoji-mapping-guide.md)
**Purpose**: Documentation for the smart emoji assignment system

**Contents** (~150-200 lines):
- Complete keyword → emoji mapping table (30+ categories)
- Algorithm explanation (keyword matching logic)
- How to add new emoji mappings
- Edge cases and fallback behavior
- Examples of habit names and their assigned emojis
- Testing strategies for emoji assignment

**When to read**: Adding new emoji categories or understanding why certain habits get specific emojis.

---

### [`feature-workflows.md`](feature-workflows.md)
**Purpose**: Step-by-step workflows for all major features

**Contents** (~200-250 lines):
- Adding a habit (validation → creation → emoji assignment → storage)
- Marking habit done (streak calculation → state update → celebration check)
- Unhealthy habit guard (keyword detection → alert → input retention)
- 100% celebration trigger (completion check → modal display → response logging)
- API key configuration (settings modal → localStorage save → validation)
- Quotes carousel (auto-rotation → manual navigation → animation)

**When to read**: Debugging feature behavior or implementing similar workflows.

---

### [`future-ideas.md`](future-ideas.md)
**Purpose**: Roadmap and feature ideas for future development

**Contents** (~150-200 lines):
- **Near-term** (1-2 weeks):
  - Habit templates (Morning Routine, Fitness, Productivity)
  - Export/import habits (JSON download)
  - Dark/light theme toggle
  
- **Medium-term** (1-2 months):
  - Weekly summary emails with Coach Nudge insights
  - Photo proof for habit completion
  - Calendar heatmap view
  - Habit notes/journaling
  
- **Long-term** (3+ months):
  - Backend sync (multi-device support)
  - Social features (share progress, friend challenges)
  - Advanced analytics (Recharts integration)
  - Voice input for Coach Nudge
  
- **Technical debt**:
  - Split App.css into component-specific files
  - Add unit tests for core logic
  - Implement error boundaries
  - Add TypeScript types

**When to read**: Planning next features or prioritizing development work.

---

### [`deployment-guide.md`](deployment-guide.md)
**Purpose**: Production deployment instructions

**Contents** (~100-150 lines):
- Build process (`npm run build`)
- Environment variables setup
- Deployment to Vercel (recommended)
- Deployment to Netlify
- Deployment to GitHub Pages
- Custom domain configuration
- Analytics setup (Simple Analytics)
- Performance optimization checklist
- SEO best practices

**When to read**: Deploying NUDGE to production or setting up a demo instance.

---

## 📊 Quick Reference

| File | Lines | Primary Audience | Update Frequency |
|------|-------|------------------|------------------|
| `architecture.md` | ~200-250 | Developers | Low (stable architecture) |
| `coach-nudge-behaviour.md` | ~250-300 | AI/Product team | Medium (personality tweaks) |
| `emoji-mapping-guide.md` | ~150-200 | Developers | Medium (new categories) |
| `feature-workflows.md` | ~200-250 | Developers | Low (stable features) |
| `future-ideas.md` | ~150-200 | Product/Planning | High (ongoing roadmap) |
| `deployment-guide.md` | ~100-150 | DevOps/Deployment | Low (stable process) |

---

## 🎯 How to Use This Documentation

### For New Developers
1. Start with main [`README.md`](../README.md) for overview
2. Read `architecture.md` to understand system design
3. Review `feature-workflows.md` for implementation details
4. Reference `coach-nudge-behaviour.md` when working on AI features

### For Product/Design
1. Read main [`README.md`](../README.md) for feature list
2. Check `future-ideas.md` for roadmap
3. Review `coach-nudge-behaviour.md` for AI personality

### For Recruiters/Portfolio Reviewers
1. Main [`README.md`](../README.md) has everything you need
2. Optionally browse `architecture.md` for technical depth
3. Check `future-ideas.md` to see product thinking

---

## 📝 Documentation Standards

When creating or updating docs in this directory:

- **Keep it concise**: Target 150-300 lines per file
- **Use examples**: Show, don't just tell
- **Include diagrams**: Mermaid flowcharts for complex flows
- **Link to code**: Reference actual files with line numbers
- **Update dates**: Add "Last updated" at bottom of each file
- **Test accuracy**: Verify all code examples actually work

---

## 🔗 Related Documentation

- [`../PROJECT_DOCUMENTATION.md`](../PROJECT_DOCUMENTATION.md) — Comprehensive reference (internal use)
- [`../SYSTEM_WORKFLOW.md`](../SYSTEM_WORKFLOW.md) — Detailed technical workflows (internal use)
- [`../README.md`](../README.md) — Main project README (public-facing)

---

**Last Updated**: November 29, 2025
