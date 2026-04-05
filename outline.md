# MaplePrints Website Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Main landing page
├── package.html            # Package details and pricing
├── design.html             # Design options and upload
├── testimonials.html       # Customer reviews and stories
├── main.js                 # Core JavaScript functionality
├── resources/              # Assets folder
│   ├── hero-cards.jpg      # Hero section business cards image
│   ├── maple-logo.png      # Gold maple leaf logo
│   ├── card-textures/      # Business card texture images
│   ├── testimonials/       # Customer avatar images
│   └── blog-images/        # Blog post featured images
├── design.md               # Design system documentation
├── interaction.md          # Interaction design specs
└── outline.md              # This project outline
```

## Page Breakdown

### 1. index.html - Main Landing Page
**Purpose**: Convert visitors into leads through compelling hero section and clear value proposition

**Sections**:
- **Navigation Bar**: Logo, menu items, CTA button
- **Hero Section**: 
  - Background: Off-white cream with subtle textures
  - Hero Image: Premium business cards with velvet finish and foil details
  - Headline: "Your Premium Business Cards, Designed Hand-in-Hand"
  - Value Props: $250 package, free design support, 4 NFC keychains
  - Primary CTAs: "I Have a Design" / "I Need a Design"
- **Package Showcase**: Visual cards display with pricing
- **Quick Benefits**: Premium materials, designer support, fast delivery
- **Social Proof**: Customer logos or review snippets
- **Footer**: Contact info, social links

**Key Features**:
- WhatsApp integration for both CTA buttons
- Smooth scroll animations
- Mobile-optimized touch targets
- Loading animations for visual appeal

### 2. package.html - Package Details
**Purpose**: Detailed package information and comparison to help customers make informed decisions

**Sections**:
- **Package Header**: Current offer details
- **What's Included**: 
  - 1000 premium business cards
  - 500 GSM velvet matte paper
  - Foil & UV coating options
  - 4 FREE NFC keychains
  - Free delivery
- **Comparison Table**: vs standard options
- **Process Timeline**: 10-12 business days delivery
- **FAQ Section**: Common questions about the package
- **Order CTA**: Direct to design selection

**Interactive Elements**:
- Package feature tooltips
- Timeline visualization
- Expandable FAQ items
- Image gallery of finished products

### 3. design.html - Design Options
**Purpose**: Guide customers through design selection and file submission process

**Sections**:
- **Design Path Selection**: 
  - "I Have a Design" path with file upload
  - "I Need a Design" path with $20 consultation
- **File Upload Interface**: 
  - Drag-and-drop zone
  - File format requirements
  - Preview functionality
  - Quality guidelines
- **Design Service Information**:
  - $20 upfront (credited to final order)
  - Personal designer assignment
  - Revision process
  - Timeline expectations
- **Portfolio Showcase**: Previous design examples
- **Customer Details Form**: Contact information collection

**Interactive Features**:
- File validation and preview
- Progress indicators
- WhatsApp message generation
- Form validation with real-time feedback

### 4. testimonials.html - Customer Reviews
**Purpose**: Build trust and credibility through social proof and success stories

**Sections**:
- **Testimonials Header**: "Hear from Our Happy Clients"
- **Featured Reviews Carousel**: 
  - Customer photos and names
  - Business names and industries
  - Detailed reviews with star ratings
  - Before/after card images
- **Success Stories**: Longer-form case studies
- **Review Categories**: By industry or use case
- **Add Review CTA**: Encourage customer feedback

**Interactive Elements**:
- Auto-advancing carousel
- Manual navigation controls
- Filter by category
- Review expansion for full text

## Technical Implementation

### Core Libraries Integration
1. **Anime.js**: Button animations, page transitions
2. **Splide.js**: Testimonial carousel, image galleries
3. **ECharts.js**: Package comparison charts, delivery timeline
4. **p5.js**: Floating card effects, foil sparkle animations
5. **Pixi.js**: Hero background particle effects
6. **Matter.js**: Physics-based card interactions
7. **Shader-park**: Premium gradient backgrounds

### JavaScript Functionality (main.js)
- **WhatsApp Integration**: Message generation and routing
- **Form Handling**: Validation and submission
- **File Upload**: Drag-and-drop with preview
- **Animation Controllers**: Scroll-triggered animations
- **Mobile Optimizations**: Touch gesture handling
- **Performance Monitoring**: Lazy loading and optimization

### Responsive Design
- **Mobile First**: 320px minimum width
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Touch Targets**: Minimum 44px for all interactive elements
- **Typography Scaling**: Fluid typography with clamp()

### Performance Optimizations
- **Critical CSS**: Inline above-the-fold styles
- **Image Optimization**: WebP format with fallbacks
- **Font Loading**: Font-display: swap
- **JavaScript**: Deferred loading for non-critical scripts
- **Caching**: Service worker for offline functionality

## Content Strategy

### Visual Assets Needed
- **Hero Images**: Premium business cards with foil details
- **Product Shots**: Various card designs and finishes
- **Lifestyle Images**: Cards in business contexts
- **Customer Avatars**: Professional headshots for testimonials
- **Process Illustrations**: Design-to-delivery workflow
- **Background Textures**: Subtle patterns for premium feel

### Copy Requirements
- **Headlines**: Compelling, benefit-focused
- **Body Copy**: Clear, concise, mobile-friendly
- **CTAs**: Action-oriented, urgency-driven
- **Microcopy**: Helpful form labels and error messages
- **Social Proof**: Authentic customer testimonials
- **Technical Specs**: Detailed product information

## Quality Assurance

### Testing Checklist
- [ ] All navigation links functional
- [ ] WhatsApp integration working on all CTAs
- [ ] Form validation and submission
- [ ] File upload functionality
- [ ] Mobile responsiveness across devices
- [ ] Animation performance optimization
- [ ] Accessibility compliance (WCAG 2.1)
- [ ] Cross-browser compatibility
- [ ] Loading performance metrics
- [ ] SEO meta tags and structured data

### Success Metrics
- **Conversion Rate**: Visitors to WhatsApp inquiries
- **Mobile Usage**: Touch interaction success
- **Page Load Speed**: Under 3 seconds
- **User Engagement**: Time on page and scroll depth
- **Form Completion**: Contact form submission rate

This comprehensive outline ensures all requirements are met while delivering a premium, conversion-focused website that represents the MaplePrints brand effectively.